import { cookies } from "next/headers";

const SESSION_COOKIE_NAME = "session_id";

export async function getSessionId(): Promise<string | null> {
  const cookieStore = await cookies();
  return cookieStore.get(SESSION_COOKIE_NAME)?.value ?? null;
}