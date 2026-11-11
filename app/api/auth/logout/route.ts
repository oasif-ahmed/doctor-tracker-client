import { NextResponse } from "next/server";
import { cookies } from "next/headers";

const BACKEND_URL =
  process.env.BACKEND_API_URL ||
  "https://doctor-tracker-server-zeta.vercel.app";

export async function POST() {
  try {
    const cookieStore = await cookies();
    const cookieHeader = cookieStore.toString();

    const backendRes = await fetch(`${BACKEND_URL}/api/auth/logout`, {
      method: "POST",
      headers: {
        ...(cookieHeader ? { Cookie: cookieHeader } : {}),
      },
    });

    // Clear the cookies on the Next.js domain regardless of backend response
    cookieStore.delete("accessToken");
    cookieStore.delete("refreshToken");

    if (!backendRes.ok) {
      return NextResponse.json(
        { message: "Logout failed" },
        { status: backendRes.status }
      );
    }

    return NextResponse.json({ message: "Logged out" });
  } catch {
    // Still clear cookies even if the backend call fails
    const cookieStore = await cookies();
    cookieStore.delete("accessToken");
    cookieStore.delete("refreshToken");

    return NextResponse.json({ message: "Logged out" });
  }
}
