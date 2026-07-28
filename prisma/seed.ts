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
        priceCents: 2400_00,
        stock: 3,
        max: 5,
        categoryId: category.id,
      },
      {
        name: "brush",
        slug: "brush",
        image: "/vercel.svg",
        priceCents: 2600_00,
        stock: 3,
        max: 5,
        categoryId: category.id,
      },
      {
        name: "pen case",
        slug: "pencase",
        image: "/vercel.svg",
        priceCents: 4200_00,
        stock: 0,
        max: 5,
        categoryId: category.id,
      },
      {
        name: "note",
        slug: "note",
        image: "/vercel.svg",
        priceCents: 1200_00,
        stock: 6,
        max: 5,
        categoryId: category.id,
      },
      {
        name: "bookmark",
        slug: "bookmark",
        image: "/vercel.svg",
        priceCents: 800_00,
        stock: 8,
        max: 5,
        categoryId: category.id,
      },
      {
        name: "wallet",
        slug: "wallet",
        image: "/vercel.svg",
        priceCents: 3800_00,
        stock: 3,
        max: 5,
        categoryId: category.id,
      },
      {
        name: "scissor",
        slug: "scissor",
        image: "/vercel.svg",
        priceCents: 1800_00,
        stock: 5,
        max: 5,
        categoryId: category.id,
      },
      {
        name: "ruler",
        slug: "ruler",
        image: "/vercel.svg",
        priceCents: 1500_00,
        stock: 3,
        max: 5,
        categoryId: category.id,
      },
    ]
  });
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());