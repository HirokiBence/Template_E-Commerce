"use client";

import Link from "next/link";

export function CheckoutButton(){
  return(
    <Link
      href="/chekcout/"
      className="inline-block px-4 py-2 bg-block text-white"
    >
      購入する
    </Link>
  );
}