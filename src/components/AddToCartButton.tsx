"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { QuantitySelector } from "@/components/QuantitySelector";

type Props = {
  productId: string;
  stock: number;
  max: number;
};

export function AddToCartButton({ productId, stock, max }: Props) {
  const router = useRouter();
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const upperLimit = Math.min(max, stock);

  const handleAdd = async () => {
    setLoading(true);
    setMessage(null);

    const res = await fetch("/api/cart", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ productId, quantity }),
    });

    const data = await res.json();
    setLoading(false);

    if (!res.ok) {
      setMessage(data.error ?? "エラーが発生しました");
      return;
    }

    setMessage("カートに追加しました");
    router.refresh();
  };

  if(stock === 0 ){
    return (
      <button
        disabled
        className="text-center bg-gray-300 py-[.5rem] px-[1rem]"
      >
        在庫切れ
      </button>
    );
  }

  return (
    <>
      <QuantitySelector
        quantity={quantity}
        max={upperLimit}
        disabled={loading}
        onIncrement={() => setQuantity((q) => Math.min(upperLimit, q + 1))}
        onDecrement={() => setQuantity((q) => Math.max(1, q - 1))}
      />
      <button
        onClick={handleAdd}
        disabled={loading}
        className="text-center bg-gray-300 py-[.5rem] px-[1rem] cursor-pointer"
      >
        {loading ? "追加中..." : "カートに追加"}
      </button>
      {message && <p className="text-sm">{message}</p>}
    </>
  );
}

export default AddToCartButton;