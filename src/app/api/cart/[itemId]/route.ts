import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getOrCreateSessionId } from "@/lib/session";

type Params = {
  params: Promise<{ itemId: string }>;
};

// 数量を更新
export async function PATCH(request: Request, { params }: Params) {
  try {
    const { itemId } = await params;
    const sessionId = await getOrCreateSessionId();
    const { quantity } = await request.json();

    if (typeof quantity !== "number" || quantity < 1) {
      return NextResponse.json(
        { error: "quantity must be a positive number" },
        { status: 400 }
      );
    }

    // 自分のカートのアイテムかを確認(他人のカートを操作されないように)
    const item = await prisma.cartItem.findUnique({
      where: { id: itemId },
      include: { cart: true, product: true },
    });

    if (!item || item.cart.sessionId !== sessionId) {
      return NextResponse.json({ error: "Item not found" }, { status: 404 });
    }

    const clampedQuantity = Math.min(
      quantity,
      item.product.max,
      item.product.stock
    );

    const updated = await prisma.cartItem.update({
      where: { id: itemId },
      data: { quantity: clampedQuantity },
    });

    return NextResponse.json({ success: true, quantity: updated.quantity });
  } catch (error) {
    console.error("Cart PATCH error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

// アイテムを削除
export async function DELETE(request: Request, { params }: Params) {
  try {
    const { itemId } = await params;
    const sessionId = await getOrCreateSessionId();

    const item = await prisma.cartItem.findUnique({
      where: { id: itemId },
      include: { cart: true },
    });

    if (!item || item.cart.sessionId !== sessionId) {
      return NextResponse.json({ error: "Item not found" }, { status: 404 });
    }

    await prisma.cartItem.delete({ where: { id: itemId } });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Cart DELETE error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}