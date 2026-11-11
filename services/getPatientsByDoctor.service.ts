import { API_URL } from "@/lib/api";

export async function getPatientsByDoctor(doctorId: string, query: string = "") {
  const queryString = query ? `?${query}` : "";
  const response = await fetch(`${API_URL}/doctor/${doctorId}${queryString}`, {
    method: "GET",
    cache: "no-store",
  });

  if (!response.ok) {
    let errorMsg = "Failed to fetch patients for this doctor";
    try {
      const err = await response.json();
      errorMsg = err.message || errorMsg;
    } catch {
      // Body not JSON
    }
    throw new Error(errorMsg);
  }

  return response.json();
}
