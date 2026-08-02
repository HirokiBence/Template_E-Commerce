"use client";

import Link from "next/link";

export function CheckoutButton(){
  return(
    <Link
      href="/checkout/"
      className="text-center bg-gray-300 py-[.5rem] px-[1rem]"
    >
      購入する
    </Link>
  );
}