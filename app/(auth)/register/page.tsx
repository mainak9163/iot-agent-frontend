"use client"

import { useState } from "react"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { useRouter } from "next/navigation"
import { login, register } from "@/lib/api"

export default function RegisterPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function submit() {
    setError(null)

    if (!email || !password || !confirmPassword) {
      setError("All fields are required.")
      return
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match.")
      return
    }

    setLoading(true)

    try {
      // Register the user
      await register(email, password)

      // Immediately login the user
      await login(email, password)

      // Redirect to dashboard
      router.push("/dashboard")
    } catch (e: unknown) {
      if (e instanceof Error) {
        console.error(e)
        setError("Registration failed.")
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="w-full flex items-center justify-center min-h-screen p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Create an Account</CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">

          {/* EMAIL */}
          <div className="space-y-2">
            <Label>Email</Label>
            <Input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {/* PASSWORD */}
          <div className="space-y-2">
            <Label>Password</Label>
            <Input
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {/* CONFIRM PASSWORD */}
          <div className="space-y-2">
            <Label>Confirm Password</Label>
            <Input
              type="password"
              placeholder="Re-enter password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>

          {/* ERROR */}
          {error && (
            <p className="text-sm text-red-500">{error}</p>
          )}

          {/* SUBMIT BUTTON */}
          <Button className="w-full" onClick={submit} disabled={loading}>
            {loading ? "Creating account..." : "Sign Up"}
          </Button>

          {/* LINK TO LOGIN */}
          <p className="text-sm text-center text-muted-foreground pt-2">
            Already have an account?{" "}
            <a href="/login" className="underline text-primary">
              Login
            </a>
          </p>

        </CardContent>
      </Card>
    </div>
  )
}
