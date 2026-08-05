import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getOrCreateSessionId } from "@/lib/session";

// カートに商品を追加
export async function POST(request: Request) {
  try{
    const sessionId = await getOrCreateSessionId();
    const { productId, quantity } = await request.json();

    // start validation
    if (!productId) {
      return NextResponse.json({ error: "productId is required" },{ status: 400 });
    }

    const requestedQuantity = 
      typeof quantity === "number" && quantity >= 1
      ? Math.floor(quantity)
      : 1;

    const product = await prisma.product.findUnique({
      where: { id: productId },
    });

    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    if (product.stock <= 0) {
      return NextResponse.json({ error: "在庫切れです" }, { status: 400 });
    }
    // end validation

    // カートがなければ作成、あれば取得
    const cart = await prisma.cart.upsert({
      where: { sessionId },
      create: { sessionId },
      update: {},
    });

    // 既にカートに同じ商品があるか確認
    const existingItem = await prisma.cartItem.findUnique({
      where: {
        cartId_productId: {
          cartId: cart.id,
          productId,
        },
      },
    });

    if (existingItem) {
      // 既にある場合は数量を+1(在庫・maxの上限まで)
      const newQuantity = Math.min(
        existingItem.quantity + requestedQuantity,
        product.max,
        product.stock
      );

      await prisma.cartItem.update({
        where: { id: existingItem.id },
        data: { quantity: newQuantity },
      });
    } else {
      // 新規追加
      const initialQuantity = Math.min(requestedQuantity, product.max, product.stock);

      await prisma.cartItem.create({
        data: {
          cartId: cart.id,
          productId,
          quantity: initialQuantity,
        },
      });
    }

    return NextResponse.json({ success: true });
  }catch(err){
    console.error("Cart POST error:", err);
    return NextResponse.json({ err: "Internal Server Error" }, { status: 500 });
  }
}

// カートの中身を取得

// カートに商品を追加
  // カートがなければ作成、あれば取得
  // 既にカートに同じ商品があるか確認
    // 既にある場合は数量を+1(在庫・maxの上限まで)
    // 無ければ新規追加