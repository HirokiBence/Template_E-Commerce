import Image from "next/image";
import Link from "next/link";

const Page = async () => {
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
  ];

  return (
    <main className="flex flex-1 w-full max-w-4xl mx-auto flex-col items-center py-[4rem] px-[2rem] bg-white dark:bg-black">
      <ul className="grid justify-center gap-y-[1rem] w-full">
        {product.map(item => (
          <li key={item.id} className="grid grid-cols-[auto_1fr] gap-x-[.5rem] w-full">
            <Image
              className="dark:invert bg-gray-300 p-[2rem]"
              src={item.image}
              alt={item.name}
              width={100}
              height={75}
              priority
            />
            <div className="grid grid-cols-2 gap-[.5rem] w-fit">
              <h1 className="col-span-2">{item.name}</h1>
              <p className="self-center">¥1,000</p>
              <select className="w-fit" name="quantity">
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
              </select>
            </div>
            <p className="col-span-2 justify-self-start">product description long version</p>
          </li>
        ))}
      </ul>
      <Link className="text-center bg-gray-300 py-[.5rem] px-[1rem] mx-auto mt-[2rem]" href={`/checkout/`}>checkout</Link>
    </main>
  );
}

export default Page;