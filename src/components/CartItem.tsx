"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

type Props = {
  id: string;
  name: string;
  image: string;
  slug: string;
  price: number;
  quantity: number;
  max: number;
  stock: number;
};

export default function CartItem({ id, name, image, slug, price, quantity, max, stock }: Props) {
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
          <span className="w-12 text-center select-none">{quantity}</span>
          <button
            onClick={() => updateQuantity(quantity - 1)}
            disabled={loading || quantity <= 1}
            className="w-7 h-7 flex items-center justify-center rounded border border-gray-300 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-100"
          >
            −
          </button>
          <button
            onClick={() => updateQuantity(quantity + 1)}
            disabled={loading || quantity >= upperLimit}
            className="w-7 h-7 flex items-center justify-center rounded border border-gray-300 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-100"
          >
            +
          </button>
          <button className="text-center bg-gray-300 py-[.5rem] px-[1rem] mx-auto" onClick={handleDelete} disabled={loading}>
            削除
          </button>
        </div>
      </div>
    </li>
  );
}