"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { claimDevice } from "../devices.api"

// Shadcn UI Components
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog"
import { PlusCircle, Loader2 } from "lucide-react"

export default function DeviceActions() {
  const router = useRouter()
  
  // State for Claiming Logic
  const [deviceId, setDeviceId] = useState("")
  const [password, setPassword] = useState("")
  const [homeId, setHomeId] = useState("")
  const [isClaiming, setIsClaiming] = useState(false)
  const [isDialogOpen, setIsDialogOpen] = useState(false); // State to control dialog

  async function handleClaim() {
    if (!deviceId || !password || !homeId) return

    setIsClaiming(true)
    try {
      await claimDevice(deviceId, password, homeId)
      // On successful claim:
      setIsDialogOpen(false) // Close the dialog
      // Clear inputs (optional)
      setDeviceId("");
      setPassword("");
      setHomeId("");
      router.refresh() // Refresh the page to show the new device
    } catch (error) {
      // Handle error (e.g., show a toast/notification)
      console.error("Failed to claim device:", error)
    } finally {
      setIsClaiming(false)
    }
  }

  return (
    <div className="flex justify-end">
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger asChild>
          {/* Main button uses the primary-accent color */}
          <Button className="bg-primary-accent hover:bg-primary-accent/90"> 
            <PlusCircle className="mr-2 h-4 w-4" /> Claim New Device
          </Button>
        </DialogTrigger>
        
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>🔗 Claim a New Device</DialogTitle>
            <DialogDescription>
              Enter the credentials provided by your device to add it to your smart home system.
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-6 py-4">
            
            {/* Device ID Input Group */}
            <div className="grid gap-2">
              <Label htmlFor="deviceId">Device ID</Label>
              <Input
                id="deviceId"
                placeholder="Unique identifier from the device"
                value={deviceId}
                onChange={(e) => setDeviceId(e.target.value)}
              />
            </div>

            {/* Password Input Group */}
            <div className="grid gap-2">
              <Label htmlFor="password">Device Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Security password/key"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            
            {/* Home ID Input Group (Could be a Select component for better UX) */}
            <div className="grid gap-2">
              <Label htmlFor="homeId">Home ID</Label>
              <Input
                id="homeId"
                placeholder="e.g., 1234 (Where the device belongs)"
                value={homeId}
                onChange={(e) => setHomeId(e.target.value)}
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button 
              type="submit" 
              onClick={handleClaim} 
              disabled={isClaiming || !deviceId || !password || !homeId}
              // Button style uses the primary-accent color
              className="w-full bg-primary-accent hover:bg-primary-accent/90" 
            >
              {isClaiming ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Claiming...
                </>
              ) : (
                "Confirm Claim"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}