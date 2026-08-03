import Image from "next/image";
import { notFound } from "next/navigation";
import { getProductBySlug } from "@/lib/product";
import { AddToCartButton } from "@/components/AddToCartButton";

type PageProps = {
  params: Promise<{ productName: string }>;
};

const Page = async ({ params }: PageProps) => {
  const slug = (await params).productName;
  const product = await getProductBySlug(slug);

  if(!product){
    notFound();
  }

  return (
    <main className="flex flex-1 w-full max-w-4xl mx-auto flex-col items-center justify-between py-[4rem] px-[2rem] bg-white dark:bg-black">
      <div className="grid gap-y-[.5rem]">
        <Image
          className="dark:invert bg-gray-300 p-[2rem]"
          src={product.image}
          alt={product.name}
          width={400}
          height={300}
          priority
        />
        <div className="grid gap-y-[.5rem]">
          <h1>{product.name}</h1>
          <p>description</p>
          <data value={product.price}>¥{product.price}</data>
          <AddToCartButton productId={product.id} stock={product.stock} max={product.max}/>
        </div>
      </div>
    </main>
  );
}

export default Page;