"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

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

export function CartItemRow({ id, name, image, slug, price, quantity, max, stock }: Props) {
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
    <li
      style={{
        display: "flex",
        alignItems: "center",
        gap: "1rem",
        border: "1px solid #ddd",
        padding: "0.75rem",
        borderRadius: "8px",
        opacity: loading ? 0.5 : 1,
      }}
    >
      <Image src={image} alt={name} width={50} height={50} />
      <div style={{ flex: 1 }}>
        <Link href={`/products/${slug}`} style={{ fontWeight: "bold" }}>
          {name}
        </Link>
        <p>¥{price.toLocaleString()}</p>

        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginTop: "0.25rem" }}>
          <button onClick={() => updateQuantity(quantity - 1)} disabled={loading || quantity <= 1}>
            −
          </button>
          <input
            type="number"
            min={1}
            max={upperLimit}
            value={quantity}
            onChange={(e) => updateQuantity(Number(e.target.value))}
            disabled={loading}
            style={{ width: "3rem", textAlign: "center" }}
          />
          <button onClick={() => updateQuantity(quantity + 1)} disabled={loading || quantity >= upperLimit}>
            +
          </button>
        </div>

        <p>小計: ¥{(price * quantity).toLocaleString()}</p>
      </div>

      <button onClick={handleDelete} disabled={loading}>
        削除
      </button>
    </li>
  );
}