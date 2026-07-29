// app/api/cart/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getOrCreateSessionId } from "@/lib/session";

// カートの中身を取得
export async function GET() {
  const sessionId = await getOrCreateSessionId();

  const cart = await prisma.cart.findUnique({
    where: { sessionId },
    include: {
      items: {
        include: { product: true },
      },
    },
  });

  if (!cart) {
    return NextResponse.json({ items: [] });
  }

  const items = cart.items.map((item) => ({
    id: item.id,
    productId: item.product.id,
    name: item.product.name,
    image: item.product.image,
    price: item.product.priceCents / 100,
    quantity: item.quantity,
    max: item.product.max,
    stock: item.product.stock,
  }));

  return NextResponse.json({ items });
}

// カートに商品を追加
export async function POST(request: Request) {
  const sessionId = await getOrCreateSessionId();
  const { productId } = await request.json();

  if (!productId) {
    return NextResponse.json(
      { error: "productId is required" },
      { status: 400 }
    );
  }

  const product = await prisma.product.findUnique({
    where: { id: productId },
  });

  if (!product) {
    return NextResponse.json({ error: "Product not found" }, { status: 404 });
  }

  if (product.stock <= 0) {
    return NextResponse.json({ error: "在庫切れです" }, { status: 400 });
  }

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
      existingItem.quantity + 1,
      product.max,
      product.stock
    );

    await prisma.cartItem.update({
      where: { id: existingItem.id },
      data: { quantity: newQuantity },
    });
  } else {
    // 新規追加
    await prisma.cartItem.create({
      data: {
        cartId: cart.id,
        productId,
        quantity: 1,
      },
    });
  }

  return NextResponse.json({ success: true });
}

// カートの中身を取得

// カートに商品を追加
// カートがなければ作成、あれば取得
// 既にカートに同じ商品があるか確認
  // 既にある場合は数量を+1(在庫・maxの上限まで)
  // 新規追加