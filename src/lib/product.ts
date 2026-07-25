import { prisma } from "@/lib/prisma";

export async function getProducts() {
  const products = await prisma.product.findMany({
    orderBy: {createdAt: "asc"},
  });

  return products.map((p) => ({
    id: p.id,
    name: p.name,
    slug: p.slug,
    image: p.image,
    price: p.priceCents / 100,
    stock: p.stock,
    max: p.max,
  }));
}