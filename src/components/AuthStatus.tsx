"use client";

import { useSession, signOut } from "@/lib/auth-client";
import Link from "next/link";

export function AuthStatus() {
  const { data: session, isPending } = useSession();

  if (isPending) return null;

  if (session) {
    return (
      <div className="flex items-center gap-2">
        <span>{session.user.name ?? session.user.email}</span>
        <button onClick={() => signOut()}>ログアウト</button>
      </div>
    );
  }

  return <Link href="/login">ログイン</Link>;
}