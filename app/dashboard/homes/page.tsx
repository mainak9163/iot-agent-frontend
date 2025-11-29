import { fetchHomes } from "@/lib/api-homes"
import HomeActions from "./components/home-actions"
import { ListAllHomesResponse } from "./homes.types"
import HomeCard from "./components/home-card"


export default async function HomesPage() {
  const homes: ListAllHomesResponse = await fetchHomes()

  return (
    <div className="space-y-6 p-6">
      <h1 className="text-3xl font-semibold">Your Homes</h1>

      <HomeActions />

      <div className="grid gap-4 pt-4">
        {homes.length === 0 ? (
          <p className="text-muted-foreground">
            No homes yet — a perfectly empty canvas.  
            A room waiting for its first name. 🏡✨
          </p>
        ) : (
          homes.map((home) => <HomeCard key={home.id} home={home} />)
        )}
      </div>
    </div>
  )
}
