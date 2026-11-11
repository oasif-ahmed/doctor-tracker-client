const BASE_URL =
  process.env.BACKEND_API_URL ||
  process.env.NEXT_PUBLIC_BACKEND_API_URL ||
  "http://localhost:3001";

export const API_URL = `${BASE_URL}/api`;
