"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { createHome } from "../home.api"
import type { ListAllHomesResponse } from "../homes.types"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { HomeIcon, Plus } from "lucide-react"

export default function HomesClient({
  homes,
}: {
  homes: ListAllHomesResponse
}) {
  const router = useRouter()
  const [name, setName] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleCreate() {
    if (!name.trim()) return
    setLoading(true)
    setError(null)
    try {
      await createHome(name)
      setName("")
      router.refresh()
    } catch (err) {
      setError("Failed to create home")
    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-background">
      {/* HEADER SECTION */}
      <div className="border-b border-border">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <h1 className="text-4xl font-bold tracking-tight mb-2">My Smart Homes</h1>
          <p className="text-muted-foreground">Manage and organize your connected home devices</p>
        </div>
      </div>

      {/* CONTENT SECTION */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="mb-12">
          <div className="bg-card border border-border rounded-lg p-6 backdrop-blur">
            <p className="text-sm font-semibold text-muted-foreground mb-4">ADD NEW HOME</p>
            <div className="flex gap-3">
              <Input
                placeholder="Enter home name..."
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="flex-1"
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleCreate()
                }}
              />
              <Button onClick={handleCreate} disabled={loading} size="lg" className="gap-2">
                <Plus className="w-4 h-4" />
                Create
              </Button>
            </div>
            {error && <p className="text-sm text-destructive mt-3">{error}</p>}
          </div>
        </div>

        {homes.length === 0 ? (
          <div className="text-center py-16">
            <div className="mb-4 flex justify-center">
              <div className="p-3 rounded-lg bg-muted">
                <HomeIcon className="w-8 h-8 text-muted-foreground" />
              </div>
            </div>
            <p className="text-muted-foreground text-lg">
              No homes yet — a peaceful blank space waiting for its first name.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {homes.map((home) => {
              const created = new Date(home.created_at).toLocaleDateString()
              return (
                <Card
                  key={home.id}
                  className="group p-5 flex flex-col gap-4 cursor-pointer border border-border hover:border-primary/50 hover:shadow-lg transition-all duration-300 hover:bg-accent/50"
                  onClick={() => router.push(`/homes/${home.id}`)}
                >
                  {/* Icon Container */}
                  <div className="p-3 rounded-lg bg-muted w-fit group-hover:bg-primary/10 transition-colors">
                    <HomeIcon className="w-5 h-5 text-primary" />
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg text-foreground mb-1 line-clamp-2">{home.name}</h3>
                    <p className="text-xs text-muted-foreground">Created {created}</p>
                  </div>

                  {/* Footer */}
                  <div className="pt-3 border-t border-border text-xs font-medium text-muted-foreground group-hover:text-primary transition-colors">
                    View home →
                  </div>
                </Card>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
