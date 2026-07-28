import Image from "next/image";
import { getProducts } from "@/lib/product";
import QuantitiySelector from "@/components/QuantitySelector";

// async function getProducts(){
//   const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/products`,{
//     cache: "no-store",
//   });

//   if(!res.ok){
//     throw new Error("商品の取得に失敗しました");
//   }

//   return res.json();
// }

const ProductList = async ({operatableQuantity}) => {
  const products = await getProducts();

  return (
      <ul className="grid gap-y-[1rem] w-fit">
        {products.map(item => (
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
              ? <QuantitiySelector item={item}/>
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