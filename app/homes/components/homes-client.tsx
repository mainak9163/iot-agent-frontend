"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
// Assuming createHome and deleteHome are exported from this API file
import { createHome, deleteHome } from "../home.api" 
import type { ListAllHomesResponse } from "../homes.types"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogFooter 
} from "@/components/ui/dialog" 
import { 
  AlertDialog, 
  AlertDialogAction, 
  AlertDialogCancel, 
  AlertDialogContent, 
  AlertDialogDescription, 
  AlertDialogFooter, 
  AlertDialogHeader, 
  AlertDialogTitle 
} from "@/components/ui/alert-dialog"
import { HomeIcon, Plus, Search } from "lucide-react"

export default function HomesClient({
  homes,
}: {
  homes: ListAllHomesResponse
}) {
  const router = useRouter()
  // States for New Home Creation
  const [newHomeName, setNewHomeName] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  
  // States for Searching
  const [searchTerm, setSearchTerm] = useState("")
    
  // *** DELETE STATES ***
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [homeToDelete, setHomeToDelete] = useState<string | null>(null) // Store home ID to delete

  const resetForm = () => {
    setNewHomeName("")
    setError(null)
    setLoading(false)
  }

  async function handleCreate() {
    if (!newHomeName.trim()) return
    setLoading(true)
    setError(null)
    
    try {
      await createHome(newHomeName)
      resetForm()
      setIsDialogOpen(false)
      router.refresh()
    } catch (err) {
      setError("Failed to create home. Please try again.")
    }
    setLoading(false)
  }
    
  async function handleDelete() {
    if (!homeToDelete) return

    setLoading(true)
    try {
        await deleteHome(homeToDelete) 
        
        setIsDeleteDialogOpen(false)
        setHomeToDelete(null)
        router.refresh()
    } catch (err) {
      setError("Failed to delete home.")
      // TODO: toast
    }
    setLoading(false)
  }

  const filteredHomes = homes.filter(home =>
    home.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const currentHomeName = homes.find(h => h.id === homeToDelete)?.name || "this home"

  return (
    <div className="min-h-screen bg-background">
      
      {/* 1. HEADER SECTION (Simplified: Title and Description only) */}
      <div className="border-b border-border shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-10">
          <h1 className="text-4xl font-extrabold tracking-tight mb-1">My Smart Homes</h1>
          <p className="text-muted-foreground">Manage and organize your connected home devices</p>
        </div>
      </div>

      {/* 2. CONTENT SECTION */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        
        {/* ACTION BAR: SEARCH & ADD BUTTON */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          {/* Search Input */}
          <div className="relative w-full sm:max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search homes by name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9"
            />
          </div>

          {/* Add New Home Button - Opens Dialog */}
          <Button 
            onClick={() => { setIsDialogOpen(true); resetForm(); }}
            variant="default" 
            size="lg" 
            className="w-full sm:w-auto gap-2 bg-primary-accent hover:bg-primary-accent/90 transition-colors"
          >
            <Plus className="w-5 h-5" />
            Add New Home
          </Button>
        </div>

        {/* 3. HOME LIST */}
        {filteredHomes.length === 0 ? (
            <div className="text-center py-16">
                <div className="mb-4 flex justify-center">
                    <div className="p-3 rounded-lg bg-primary-accent/10">
                        <HomeIcon className="w-8 h-8 text-primary-accent" />
                    </div>
                </div>
                <p className="text-muted-foreground text-lg">
                    {homes.length === 0 
                        ? "No homes yet — click \"Add New Home\" to get started!" 
                        : `No homes matched your search term: "${searchTerm}".`
                    }
                </p>
            </div>
        ) : (
          /* Cards Grid: Adjusted for better visual width */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredHomes.map((home) => {
              const created = new Date(home.created_at).toLocaleDateString()
              return (
                <Card
                  key={home.id}
                  className="group p-6 flex flex-col gap-4
                             border-2 border-border 
                             hover:border-primary-accent/70 
                             hover:bg-primary-accent/10 
                             hover:shadow-[0_0_15px_rgba(23,191,153,0.3)] 
                             transition-all duration-300"
                >
                  {/* Icon & Title Area */}
                  <div className="flex items-center justify-between">
                    <div className="p-3 rounded-lg bg-primary-accent/10 w-fit group-hover:bg-primary-accent/20 transition-colors">
                      <HomeIcon className="w-6 h-6 text-primary-accent" />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <h3 className="font-bold text-xl text-foreground mb-1 line-clamp-2">{home.name}</h3>
                    {/* Styled Creation Date as Key Status */}
                    <div className="text-sm space-y-1 mt-2">
                        <p className="flex items-center gap-2 text-primary-accent font-medium">
                            <span className="h-2 w-2 rounded-full bg-primary-accent" />
                            Created on {created}
                        </p>
                    </div>
                  </div>

                  {/* Footer / Call to Action - DELETE BUTTON */}
                  <div className="pt-4 border-t border-border/50 flex justify-end">
                    <Button 
                        variant="destructive"
                        size="sm"
                        // Stop propagation so clicking the button doesn't navigate to the home details page
                        onClick={(e) => {
                            e.stopPropagation() 
                            setHomeToDelete(home.id)
                            setIsDeleteDialogOpen(true)
                        }}
                        disabled={loading}
                    >
                        Delete Home
                    </Button>
                  </div>
                </Card>
              )
            })}
          </div>
        )}
      </div>

      {/* 4. ADD NEW HOME DIALOG (MODAL) */}
      <Dialog open={isDialogOpen} onOpenChange={(open) => { setIsDialogOpen(open); if (!open) resetForm(); }}>
        <DialogContent 
          className="sm:max-w-[425px] 
                     border-2 border-primary-accent/50 
                     shadow-2xl shadow-primary-accent/20 
                     bg-card/95" // Highlighted for better visibility
        >
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold">Add a New Smart Home 🏡</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <label htmlFor="homeName" className="text-sm font-semibold text-muted-foreground block mb-2">
              Home Name
            </label>
            <Input
              id="homeName"
              placeholder="e.g., Main House, Vacation Cabin, Office"
              value={newHomeName}
              onChange={(e) => setNewHomeName(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleCreate()
              }}
              className="col-span-3"
              disabled={loading}
            />
            {error && <p className="text-sm text-destructive mt-3">{error}</p>}
          </div>
          <DialogFooter>
            <Button 
              onClick={handleCreate} 
              disabled={loading || !newHomeName.trim()} 
              className="gap-2 bg-primary-accent hover:bg-primary-accent/90"
            >
              {loading ? "Creating..." : "Save Home"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
        
      {/* 5. DELETE HOME CONFIRMATION DIALOG (NEW) */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="text-2xl font-bold text-destructive">Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription className="text-base">
              This action cannot be undone. This will permanently remove **{currentHomeName}** and all associated devices.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={loading}>Cancel</AlertDialogCancel>
            <AlertDialogAction 
              onClick={handleDelete} 
              disabled={loading}
              className="bg-destructive hover:bg-destructive/90"
            >
              {loading ? "Deleting..." : "Delete Home"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}