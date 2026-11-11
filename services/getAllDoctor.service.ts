import { cookies } from "next/headers";

const BACKEND_URL =
  process.env.BACKEND_API_URL ||
  process.env.NEXT_PUBLIC_BACKEND_API_URL ||
  "http://localhost:3001";

export const getAllDoctors = async (query: string = "") => {
  let cookieHeader = "";
  try {
    const cookieStore = await cookies();
    cookieHeader = cookieStore.toString();
  } catch {
    // If executed in an environment where cookies() is unavailable
  }

  const queryString = query ? `?${query}` : "";
  console.log('Fetching doctors from', `${BACKEND_URL}/api/getAllDoctors${queryString}`);
  const response = await fetch(`${BACKEND_URL}/api/getAllDoctors${queryString}`, {
    cache: "no-store",
    headers: {
      ...(cookieHeader ? { Cookie: cookieHeader } : {}),
    },
  });

  if (!response.ok) {
    let errorMessage = "Failed to fetch doctors";
    try {
      const err = await response.json();
      errorMessage = err.message || errorMessage;
    } catch {
      // Body was not JSON (e.g. HTML error page)
    }
    throw new Error(errorMessage);
  }

  const result = await response.json();
  return result;
};
