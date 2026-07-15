import Link from "next/link";
import ProductList from "@/components/ProductList";

const Page = async () => {

  return (
    <main className="flex flex-1 w-full max-w-4xl mx-auto flex-col items-center py-[4rem] px-[2rem] bg-white dark:bg-black">

      <ProductList/>
      <Link className="text-center bg-gray-300 py-[.5rem] px-[1rem] mx-auto mt-[2rem]" href={`/checkout/`}>checkout</Link>
    </main>
  );
}

export default Page;