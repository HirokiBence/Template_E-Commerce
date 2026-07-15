import Image from "next/image";
import QuantitiySelector from "@/components/QuantitySelector";

const cart = [
  {
    id: crypto.randomUUID(),
    name: "key",
    image: "/vercel.svg",
    price: 1000,
    link: "key",
    quantity: 3,
    max: 20,
  },
  {
    id: crypto.randomUUID(),
    name: "desk",
    image: "/vercel.svg",
    price: 1000,
    link: "desk",
    quantity: 1,
    max: 5,
  },
  {
    id: crypto.randomUUID(),
    name: "mouse",
    image: "/vercel.svg",
    price: 1000,
    link: "mouse",
    quantity: 2,
    max: 10,
  },
];

const ProductList = async ({operatableQuantity}) => {

  return (
      <ul className="grid gap-y-[1rem] w-fit">
        {cart.map(item => (
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
              {operatableQuantity
              ? <QuantitiySelector/>
              : <p className="self-center">{item.quantity}</p>
              }
            </div>
            <p className="col-span-2 justify-self-start">product description long version</p>
          </li>
        ))}
      </ul>
  );
}

export default ProductList;