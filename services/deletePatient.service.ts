import { API_URL } from "@/lib/api";

export async function deletePatient(id: string) {
  const response = await fetch(`${API_URL}/patient/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Failed to delete patient");
  }

  return response.json();
}
