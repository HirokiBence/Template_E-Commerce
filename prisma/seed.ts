import { PrismaClient } from "../src/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

async function main() {
  const category = await prisma.category.create({
    data: { name: "文房具", slug: "stationery"},
  });

  await prisma.product.createMany({
    data:[
      {
        name: "pen",
        slug: "pen",
        image: "/vercel.svg",
        priceCents: 1000_00,
        stock: 3,
        max: 5,
        categoryId: category.id,
      },
      {
        name: "pen case",
        slug: "pen case",
        image: "/vercel.svg",
        priceCents: 800_00,
        stock: 0,
        max: 5,
        categoryId: category.id,
      },
      {
        name: "note",
        slug: "note",
        image: "/vercel.svg",
        priceCents: 2500_00,
        stock: 5,
        max: 5,
        categoryId: category.id,
      },
    ]
  });
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());