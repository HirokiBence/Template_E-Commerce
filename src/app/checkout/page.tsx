import Image from "next/image";
import Link from "next/link";

const Page = () => {

  const product = {
    name: "product name",
    quantity: "1",
  }

  return (
    <main className="flex flex-1 w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
      <div className="grid gap-y-[.5rem]">
        <ul>
          <li className="grid gap-y-[.5rem]">
            <Image
              className="dark:invert bg-gray-300 p-[2rem]"
              src="/vercel.svg"
              alt={product.name}
              width={400}
              height={300}
              priority
            />
            <h1>{product.name}</h1>
            <p>¥1,000</p>
            <p>{product.quantity}</p>
          </li>
        </ul>
        <Link className="text-center bg-gray-300 py-[.5rem] px-[1rem]" href={`/chekout/`}>purchase</Link>
      </div>
    </main>
  );
}

export default Page;