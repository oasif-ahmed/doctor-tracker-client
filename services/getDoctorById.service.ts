import { API_URL } from "@/lib/api";
import { Doctor } from "@/types/doctor.types";

export async function getDoctorById(doctorId: string): Promise<Doctor | null> {
  try {
    const response = await fetch(`${API_URL}/getAllDoctors`, {
      cache: "no-store",
    });

    if (!response.ok) return null;

    const result = await response.json();
    const doctors: Doctor[] = result.data || [];
    return doctors.find((d) => d._id === doctorId) || null;
  } catch {
    return null;
  }
}
