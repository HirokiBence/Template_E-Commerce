import Image from "next/image";
import Link from "next/link";

export default function Home() {
  const product = [
    {
      id: crypto.randomUUID(),
      name: "key",
      image: "/vercel.svg",
      price: 1000,
      link: "key",
    },
    {
      id: crypto.randomUUID(),
      name: "desk",
      image: "/vercel.svg",
      price: 1000,
      link: "desk",
    },
    {
      id: crypto.randomUUID(),
      name: "mouse",
      image: "/vercel.svg",
      price: 1000,
      link: "mouse",
    },
    {
      id: crypto.randomUUID(),
      name: "keyboard",
      image: "/vercel.svg",
      price: 1000,
      link: "keyboard",
    },
    {
      id: crypto.randomUUID(),
      name: "chair",
      image: "/vercel.svg",
      price: 1000,
      link: "chair",
    },
    {
      id: crypto.randomUUID(),
      name: "bottle",
      image: "/vercel.svg",
      price: 1000,
      link: "bottle",
    },
    {
      id: crypto.randomUUID(),
      name: "battery",
      image: "/vercel.svg",
      price: 1000,
      link: "battery",
    },
    {
      id: crypto.randomUUID(),
      name: "headphone",
      image: "/vercel.svg",
      price: 1000,
      link: "headphone",
    },
  ];
  
  return (
    <main className="flex flex-1 w-full max-w-4xl mx-auto flex-col items-center justify-between py-[4rem] px-[2rem] bg-white dark:bg-black">
      <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-[2rem] justify-center">
        {product.map(item => (
        <li key={item.id} className="grid gap-y-[.5rem]">
          <Link className="text-center py-[.5rem] px-[1rem] shadow-md" href={item.link}>
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
