import Image from "next/image";
import Link from "next/link";

const Page = async ({
  params,
}: {
  params: Promise<{ slug: string }>
}) => {
  const product = (await params).slug

  return (
    <main className="flex flex-1 w-full max-w-4xl mx-auto flex-col items-center justify-between py-[4rem] px-[2rem] bg-white dark:bg-black">
      <div className="grid gap-y-[.5rem]">
        <Image
          className="dark:invert bg-gray-300 p-[2rem]"
          src="/vercel.svg"
          alt={product}
          width={400}
          height={300}
          priority
        />
        <div className="grid gap-y-[.5rem]">
          <h1>{product}</h1>
          <p>¥1,000</p>
          <select className="w-fit" name="quantity">
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
          </select>
          <p>description</p>
          <Link className="text-center bg-gray-300 py-[.5rem] px-[1rem]" href={`/chekout/`}>purchase</Link>
        </div>
      </div>
    </main>
  );
}

export default Page;