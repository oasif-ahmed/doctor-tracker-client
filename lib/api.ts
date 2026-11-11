const BASE_URL =
  process.env.BACKEND_API_URL ||
  process.env.NEXT_PUBLIC_BACKEND_API_URL ||
  "https://doctor-tracker-server-zeta.vercel.app";

export const API_URL = `${BASE_URL}/api`;