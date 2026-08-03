import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { stripe } from "@/lib/stripe";
import { getOrCreateSessionId } from "@/lib/session"

export async function POST(){
  try {
    // カート検索用のidを取得
    const sessionId = await getOrCreateSessionId();

    // カートを取得
    const cart = await prisma.cart.findUnique({
      where: { sessionId },
      include: { items: { include: { product: true } } },
    });

    // カートの有無をチェック
    if (!cart || cart.items.length === 0) {
      return NextResponse.json({ error: "カートが空です" }, { status: 400 });
    }
    
    // 購入直前の在庫チェック
    for (const item of cart.items) {
      if (item.quantity > item.product.stock) {
        return NextResponse.json(
          { error: `${item.product.name}の在庫が不足しています` },
          { status: 400 }
        );
      }
    }

    const totalCents = cart.items.reduce(
      (sum, item) => sum + item.product.priceCents * item.quantity,
      0
    );

    // 注文をPENDING状態で先に作成
    const order = await prisma.order.create({
      data: {
        sessionId,
        status: "PENDING",
        totalCents,
        items: {
          create: cart.items.map((item) => ({
            productId: item.productId,
            quantity: item.quantity,
            priceCents: item.product.priceCents, // 購入時点の価格を保存
          })),
        },
      },
    });

    // Stripe Checkout Session(ホスト型)を作成
    const checkoutSession = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: cart.items.map((item) => ({
        price_data: {
          currency: "jpy",
          product_data: { name: item.product.name },
          unit_amount: item.product.priceCents / 100,
        },
        quantity: item.quantity,
      })),
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/cart`,
      metadata: {
        orderId: order.id, // Webhookでこの値を使ってOrderを特定する
      },
    });

    // 作成したStripe SessionのIDをOrderに保存
    await prisma.order.update({
      where: { id: order.id },
      data: { stripeCheckoutSessionId: checkoutSession.id },
    });

    return NextResponse.json({ url: checkoutSession.url });

  }catch(err){
    console.error("checkout error", err);
    return NextResponse.json({err: "Internal Server Eroor" }, { status: 500 });
  }
}