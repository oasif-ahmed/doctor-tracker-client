import { API_URL } from "@/lib/api";

export async function createPatient(patientData: Record<string, unknown>) {
  const response = await fetch(`${API_URL}/patient`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(patientData),
  });

  if (!response.ok) {
    throw new Error("Failed to create patient");
  }

  return response.json();
}
