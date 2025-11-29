// lib/api.ts
import api from "./axios"
import Cookies from "js-cookie"

/* ======================================================================
   TOKEN HANDLING (Client + Server Safe)
======================================================================== */

/**
 * Get token - Client-side only
 * Use this in client components and browser contexts
 */
export function getTokenClient(): string | null {
  if (typeof window === "undefined") {
    return null
  }
  return Cookies.get("token") || null
}

/**
 * Get token - Server-side (for App Router)
 * Import and use this separately in Server Components
 */
export async function getToken() {
  // Dynamic import to avoid bundling in client
  if (typeof window !== "undefined") {
    throw new Error("getToken can only be used in server components")
  }
  
  try {
    const { cookies } = await import("next/headers")
    const cookieStore = await cookies()
    return cookieStore.get("token")?.value || null
  } catch {
    return null
  }
}

/* ======================================================================
   AUTH - Client-side
======================================================================== */

export async function login(email: string, password: string) {
  const res = await api.post("/auth/login", { email, password })

  // Store token in cookie (client-side)
  if (typeof window !== "undefined") {
    Cookies.set("token", res.data.token, { 
      expires: 7,
      sameSite: 'strict'
    })
  }

  return res.data
}

export async function register(email: string, password: string) {
  const res = await api.post("/auth/register", { email, password })
  return res.data
}

export async function logout() {
  if (typeof window !== "undefined") {
    Cookies.remove("token")
  }
}