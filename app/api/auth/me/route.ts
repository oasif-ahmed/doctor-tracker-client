import { NextResponse } from "next/server";
import { cookies } from "next/headers";

const BACKEND_URL =
  process.env.BACKEND_API_URL ||
  "https://doctor-tracker-server-zeta.vercel.app";

export async function GET() {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;

  // Quick check: if no access token cookie exists, user is not authenticated
  if (!accessToken) {
    return NextResponse.json({ isAuthenticated: false });
  }

  // Verify the token with the backend
  try {
    const cookieHeader = cookieStore.toString();
    const backendRes = await fetch(`${BACKEND_URL}/api/auth/me`, {
      headers: {
        ...(cookieHeader ? { Cookie: cookieHeader } : {}),
      },
    });

    if (backendRes.ok) {
      const data = await backendRes.json();
      return NextResponse.json({ isAuthenticated: true, ...data });
    }

    return NextResponse.json({ isAuthenticated: false });
  } catch {
    // If backend is unreachable, fall back to cookie presence check
    return NextResponse.json({ isAuthenticated: Boolean(accessToken) });
  }
}
