"use client";

import { signIn } from "@/lib/auth-client";

export default function LoginPage() {
  return (
    <div className="max-w-sm mx-auto p-6">
      <h1 className="text-xl text-center font-bold mb-6">ログイン</h1>
      <div className="flex flex-col gap-3">
        {/* <button
          onClick={() => signIn.social({ provider: "google", callbackURL: "/" })}
          className="border border-gray-300 rounded py-2 hover:bg-gray-50"
        >
          Googleでログイン
        </button> */}
        <button
          onClick={() => signIn.social({ provider: "github", callbackURL: "/" })}
          className="border border-gray-300 rounded py-2 px-4 hover:bg-gray-50 cursor-pointer"
        >
          GitHubでログイン
        </button>
      </div>
    </div>
  );
}