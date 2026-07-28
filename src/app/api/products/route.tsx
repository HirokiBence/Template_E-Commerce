import { NextResponse } from "next/server";

const products = [
  {
    id: crypto.randomUUID(),
    name: "key",
    image: "/vercel.svg",
    price: 1000,
    link: "key",
    stock: 8,
    max: 20,
    quantity: 3,
  },
  {
    id: crypto.randomUUID(),
    name: "desk",
    image: "/vercel.svg",
    price: 1000,
    link: "desk",
    stock: 3,
    max: 5,
    quantity: 1,
  },
  {
    id: crypto.randomUUID(),
    name: "mouse",
    image: "/vercel.svg",
    price: 1000,
    link: "mouse",
    stock: 6,
    max: 10,
    quantity: 2,
  },
];

export async function GET(){
  return NextResponse.json(products);
}