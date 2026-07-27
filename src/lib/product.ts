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

// slugから1件だけ取得
export async function getProductBySlug(slug: string) {
  const product = await prisma.product.findUnique({
    where: { slug },
  });

  if (!product) return null;

  return {
    id: product.id,
    name: product.name,
    slug: product.slug,
    image: product.image,
    price: product.priceCents / 100,
    stock: product.stock,
    max: product.max,
  };
}