"use server";

import { revalidatePath } from "next/cache";

const BACKEND_URL =
  process.env.BACKEND_API_URL ||
  process.env.NEXT_PUBLIC_BACKEND_API_URL ||
  "http://localhost:3001";

export const createDoctor = async (prevState: unknown, formData: FormData) => {
  if (!formData) {
    return prevState;
  }

  const name = formData.get("name") as string;
  const specialization = formData.get("specialization") as string;
  const hospital = formData.get("hospital") as string;
  const phone = formData.get("phone") as string;
  const email = formData.get("email") as string;

  const response = await fetch(`${BACKEND_URL}/api/doctors`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, specialization, hospital, phone, email }),
  });

  if (!response.ok) {
    let errorMsg = "Failed to create doctor";
    try {
      const err = await response.json();
      errorMsg = err.message || errorMsg;
    } catch {
      // Body not JSON
    }
    throw new Error(errorMsg);
  }

  const result = await response.json();

  revalidatePath("/doctor");
  revalidatePath("/doctors");

  return result;
};

export interface CreateDoctorPayload {
  name: string;
  specialization: string;
  hospital: string;
  phone: string;
  email: string;
}
