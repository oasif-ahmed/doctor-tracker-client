const BACKEND_URL =
  process.env.BACKEND_API_URL ||
  process.env.NEXT_PUBLIC_BACKEND_API_URL ||
  "http://localhost:3001";

export async function getAllPatients(query: string = "") {
  const queryString = query ? `?${query}` : "";
  const response = await fetch(`${BACKEND_URL}/api/patient${queryString}`, {
    method: "GET",
    cache: "no-store",
  });

  if (!response.ok) {
    let message = "Failed to fetch patients";
    try {
      const err = await response.json();
      message = err.message || message;
    } catch {
      // Body not JSON
    }
    throw new Error(message);
  }

  return response.json();
}
