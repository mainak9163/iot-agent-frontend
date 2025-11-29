"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

import { useRouter } from "next/navigation"
import { createHome } from "../home.api"

export default function HomeActions() {
  const [name, setName] = useState("")
  const router = useRouter()

  async function handleCreate() {
    if (!name.trim()) return
    await createHome(name)
    setName("")
    router.refresh()
  }

  return (
    <div className="flex items-center gap-3">
      <Input
        placeholder="New home name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <Button onClick={handleCreate}>+ Create Home</Button>
    </div>
  )
}
