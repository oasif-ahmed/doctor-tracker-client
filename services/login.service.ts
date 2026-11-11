import { API_URL } from "@/lib/api";

export async function login(credentials: Record<string, unknown>) {
  const response = await fetch(`${process.env.BACKEND_API_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  });

  if (!response.ok) {
    throw new Error("Failed to login");
  }

  return response.json();
}
