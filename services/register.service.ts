import { API_URL } from "@/lib/api";

export async function register(userData: Record<string, unknown>) {
  const response = await fetch(`${API_URL}/user/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });

  if (!response.ok) {
    throw new Error("Failed to register");
  }

  return response.json();
}
