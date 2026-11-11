// Server-side: use BACKEND_API_URL (no NEXT_PUBLIC_ prefix) to talk directly to the backend.
// Client-side: always fetch through local Next.js API routes (e.g. /api/auth/login).
const BASE_URL =
  process.env.BACKEND_API_URL ||
  "https://doctor-tracker-server-zeta.vercel.app";

export const API_URL = `${BASE_URL}/api`;
