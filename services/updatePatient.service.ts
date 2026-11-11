import { API_URL } from "@/lib/api";

export async function updatePatient(id: string, patientData: Record<string, unknown>) {
  const response = await fetch(`${API_URL}/patient/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(patientData),
  });

  if (!response.ok) {
    throw new Error("Failed to update patient");
  }

  return response.json();
}
