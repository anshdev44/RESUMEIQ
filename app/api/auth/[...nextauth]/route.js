
import { handlers } from "@/auth";

// Re-export NextAuth v5 route handlers so that
// /api/auth/* endpoints work correctly with the
// configuration defined in auth.ts
export const { GET, POST } = handlers;