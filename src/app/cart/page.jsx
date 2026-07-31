import Link from "next/link";
import { getCart } from "@/lib/cart";
import CartItem from "@/components/CartItem";

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
          <CartItem 
            key={item.id}
            id={item.id}
            name={item.name}
            image={item.image}
            slug={item.slug}
            price={item.price}
            quantity={item.quantity}
            max={item.max}
            stock={item.stock}
          />
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