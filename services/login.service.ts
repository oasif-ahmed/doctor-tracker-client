

export async function login(credentials: Record<string, unknown>) {
  const response = await fetch(`${process.env.BACKEND_API_URL}/auth/login`, {
    method: "POST",
    credentials: "include", // Ensure cookies are sent/received across origins
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
