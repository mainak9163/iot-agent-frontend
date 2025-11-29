"use client"

import { Card, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { CreateHomeResponse } from "../homes.types"


export default function HomeCard({ home }: { home: CreateHomeResponse }) {
  return (
    <Card className="p-4 flex justify-between items-center">
      <div>
        <CardTitle>{home.name}</CardTitle>
        <CardDescription>
          Created: {new Date(home.created_at).toLocaleDateString()}
        </CardDescription>
      </div>

      <Link href={`/homes/${home.id}`}>
        <Button variant="secondary">Manage</Button>
      </Link>
    </Card>
  )
}
