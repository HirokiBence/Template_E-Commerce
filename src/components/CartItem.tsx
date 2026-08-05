"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { QuantitySelector } from "@/components/QuantitySelector";

type Props = {
  id: string;
  name: string;
  image: string;
  // slug: string;
  price: number;
  quantity: number;
  max: number;
  stock: number;
};

export default function CartItem({ id, name, image, /* slug, */ price, quantity, max, stock }: Props) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const upperLimit = Math.min(max, stock);

  const updateQuantity = async (newQuantity: number) => {
    if (newQuantity < 1 || newQuantity > upperLimit) return;

    setLoading(true);
    const res = await fetch(`/api/cart/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ quantity: newQuantity }),
    });
    setLoading(false);

    if (res.ok) {
      router.refresh(); // Server Componentのデータを再取得させる
    }
  };

  const handleDelete = async () => {
    setLoading(true);
    const res = await fetch(`/api/cart/${id}`, { method: "DELETE" });
    setLoading(false);

    if (res.ok) {
      router.refresh();
    }
  };

  return (
    <li key={id} className="grid grid-cols-[auto_1fr] gap-x-[.5rem] w-full">
      <Image
        className="dark:invert bg-gray-300 p-[2rem]"
        src={image}
        alt={name}
        width={100}
        height={75}
        priority
      />
      <div className="grid grid-cols-2 gap-[.5rem] w-fit">
        <h2 className="col-span-2">{name}</h2>
        <p className="col-span-2">¥{price.toLocaleString()}</p>
        <div className="flex items-center gap-2 mt-1">
          <QuantitySelector
            quantity={quantity}
            max={upperLimit}
            disabled={loading}
            onIncrement={() => updateQuantity(quantity + 1)}
            onDecrement={() => updateQuantity(quantity - 1)}
          />
        </div>
        <button className="text-center bg-gray-300 py-[.5rem] px-[1rem] mx-auto cursor-pointer" onClick={handleDelete} disabled={loading}>
          削除
        </button>
      </div>
    </li>
  );
}