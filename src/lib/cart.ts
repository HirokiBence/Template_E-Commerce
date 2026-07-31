import { prisma } from "@/lib/prisma";
import { getOrCreateSessionId } from "@/lib/session";

export async function getCart() {
  const sessionId = await getOrCreateSessionId();

  // データ取得
  const cart = await prisma.cart.findUnique({
    where: {sessionId},
    include: {
      items : {
        include: {product: true},
        orderBy: { id: "asc"} // 並び替え
      },
    },
  });

  // データがない時のreturn
  if (!cart) {
    return { items: [], totalYen: 0 };
  }

  const items = cart.items.map((item) => ({
    id: item.id,
    productId: item.product.id,
    name: item.product.name,
    image: item.product.image,
    slug: item.product.slug,
    price: item.product.priceCents / 100,
    quantity: item.quantity,
    max: item.product.max,
    stock: item.product.stock,
    subtotal: (item.product.priceCents * item.quantity) / 100,
  }));

  const totalYen = items.reduce((sum, item) => sum + item.subtotal, 0);

  // データがある時のreturn
  return { items, totalYen };
}