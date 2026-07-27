// components/AddToCartButton.tsx
"use client";

import { useState } from "react";

type Props = {
  productId: string;
  stock: number;
};

export function AddToCartButton({ productId, stock }: Props) {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const handleAdd = async () => {
    setLoading(true);
    setMessage(null);

    const res = await fetch("/api/cart", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ productId }),
    });

    const data = await res.json();
    setLoading(false);

    if (!res.ok) {
      setMessage(data.error ?? "エラーが発生しました");
      return;
    }

    setMessage("カートに追加しました");
  };

  return (
    <div>
      <button
        onClick={handleAdd}
        disabled={stock === 0 || loading}
        className="text-center bg-gray-300 py-[.5rem] px-[1rem]"
      >
        {stock === 0 ? "在庫切れ" : loading ? "追加中..." : "カートに追加"}
      </button>
      {message && <p style={{ fontSize: "0.85rem", marginTop: "0.25rem" }}>{message}</p>}
    </div>
  );
}

export default AddToCartButton;