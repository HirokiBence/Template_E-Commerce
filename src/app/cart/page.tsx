import Link from "next/link";
import { getCart } from "@/lib/cart";
import CartItem from "@/components/CartItem";
import { CheckoutButton } from "@/components/CheckoutButton";

const Page = async () => {

  const { items, totalYen } = await getCart();

  if(items.length === 0){
    return(
      <main className="flex flex-1 w-full max-w-4xl mx-auto flex-col items-center py-[4rem] px-[2rem] bg-white dark:bg-black">
        <p>No item</p>
        <Link className="text-center bg-gray-300 py-[.5rem] px-[1rem] mx-auto mt-[2rem] cursor-pointer" href={`/`}>Go Top</Link>
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
      <p className="mt-[1.5rem] text-[1.25rem] font-semibold">
        合計: ¥{totalYen.toLocaleString()}
      </p>
      <div className="mt-[1.5rem]">
        <CheckoutButton/>
      </div>
    </main>
  );
}

export default Page;