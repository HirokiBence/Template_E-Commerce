import { cookies } from "next/headers";

const SESSION_COOKIE_NAME = "session_id";

export async function getOrCreateSessionId(): Promise<string> {
  const cookieStore = await cookies();
  const existing = cookieStore.get(SESSION_COOKIE_NAME)?.value;

  if(existing){
    return existing;
  }

  const newSessionID = crypto.randomUUID();
  cookieStore.set(SESSION_COOKIE_NAME, newSessionID, {
    httpOnly: true,
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 30,
    path: "/",
  });

  return newSessionID;
}


