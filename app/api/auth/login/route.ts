import { NextResponse } from "next/server";
import { cookies } from "next/headers";

const BACKEND_URL =
  process.env.BACKEND_API_URL ||
  "https://doctor-tracker-server-zeta.vercel.app";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const backendRes = await fetch(`${BACKEND_URL}/api/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    const data = await backendRes.json().catch(() => ({}));

    if (!backendRes.ok) {
      return NextResponse.json(
        { message: data.message || "Login failed" },
        { status: backendRes.status }
      );
    }

    // Extract Set-Cookie headers from the backend response and set them
    // as same-origin cookies on the Next.js domain
    const cookieStore = await cookies();
    const setCookieHeaders = backendRes.headers.getSetCookie();

    for (const setCookie of setCookieHeaders) {
      const parsed = parseCookie(setCookie);
      if (parsed) {
        cookieStore.set({
          name: parsed.name,
          value: parsed.value,
          httpOnly: parsed.httpOnly,
          secure: parsed.secure,
          sameSite: parsed.sameSite as "lax" | "strict" | "none" | undefined,
          maxAge: parsed.maxAge,
          path: parsed.path || "/",
        });
      }
    }

    return NextResponse.json(data);
  } catch {
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}

/** Parse a raw Set-Cookie header string into its parts */
function parseCookie(raw: string) {
  const parts = raw.split(";").map((p) => p.trim());
  const [nameValue, ...attrs] = parts;
  if (!nameValue) return null;

  const eqIndex = nameValue.indexOf("=");
  if (eqIndex === -1) return null;

  const name = nameValue.slice(0, eqIndex);
  const value = nameValue.slice(eqIndex + 1);

  let httpOnly = false;
  let secure = false;
  let sameSite: string | undefined;
  let maxAge: number | undefined;
  let path: string | undefined;

  for (const attr of attrs) {
    const lower = attr.toLowerCase();
    if (lower === "httponly") httpOnly = true;
    else if (lower === "secure") secure = true;
    else if (lower.startsWith("samesite="))
      sameSite = attr.split("=")[1]?.toLowerCase();
    else if (lower.startsWith("max-age="))
      maxAge = parseInt(attr.split("=")[1] || "0", 10);
    else if (lower.startsWith("path=")) path = attr.split("=")[1];
  }

  return { name, value, httpOnly, secure, sameSite, maxAge, path };
}
