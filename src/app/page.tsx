import Image from "next/image";
import { getProducts } from "@/lib/product";
import Link from "next/link";

export default async function Home() {
  
  const products = await getProducts();
  return (
    <main className="flex flex-1 w-full max-w-4xl mx-auto flex-col items-center justify-between py-[4rem] px-[2rem] bg-white dark:bg-black">
      <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-[2rem] justify-center">
        {products.map(item => (
        <li key={item.id} className="grid gap-y-[.5rem]">
          <Link className="text-center py-[.5rem] px-[1rem] shadow-md" href={item.slug}>
            <Image
              className="dark:invert bg-gray-300 p-[2rem]"
              src={item.image}
              alt={item.name}
              width={100}
              height={75}
              priority
            />
            <div className="grid gap-y-[.5rem]">
                <h1>{item.name}</h1>
                <p>¥{item.price}</p>
            </div>
          </Link>
        </li>
        ))}
      </ul>
    </main>
  );
}
