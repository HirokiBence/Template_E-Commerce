import Image from "next/image";
import Link from "next/link";
import { getCart } from "@/lib/cart";
// import QuantitiySelector from "@/components/QuantitySelector";

const Page = async () => {

  const { items, totalYen } = await getCart();

  if( items.length === 0){
    return(
      <main className="flex flex-1 w-full max-w-4xl mx-auto flex-col items-center py-[4rem] px-[2rem] bg-white dark:bg-black">
        <p>no item</p>
        <Link className="text-center bg-gray-300 py-[.5rem] px-[1rem] mx-auto mt-[2rem]" href={`/`}>got top</Link>
      </main>
    )
  }

  return (
    <main className="flex flex-1 w-full max-w-4xl mx-auto flex-col items-center py-[4rem] px-[2rem] bg-white dark:bg-black">
      <ul className="grid gap-y-[1rem] w-fit">
        {items.map(item => (
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
              {/* <QuantitiySelector item={item}/> */}
              <p className="self-center">{item.quantity}</p>
            </div>
            <p className="col-span-2 justify-self-start">product description long version</p>
          </li>
        ))}
      </ul>
      <p style={{ marginTop: "1.5rem", fontSize: "1.25rem", fontWeight: "bold" }}>
        合計: ¥{totalYen.toLocaleString()}
      </p>
      <Link className="text-center bg-gray-300 py-[.5rem] px-[1rem] mx-auto mt-[2rem]" href={`/checkout/`}>checkout</Link>
    </main>
  );
}

export default Page;