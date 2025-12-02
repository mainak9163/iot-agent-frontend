"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { deleteDevice } from "../device-management.api"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Trash2, Loader2, AlertTriangle } from "lucide-react"

export default function DeleteDeviceButton({
  deviceId,
  deviceName, // Added deviceName for better context in the modal
}: {
  deviceId: string
  deviceName: string // Pass the name of the device being deleted
}) {
  const router = useRouter()
  const [isDeleting, setIsDeleting] = useState(false)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  async function handleDelete() {
    setIsDeleting(true)
    try {
      await deleteDevice(deviceId)
      
      // Redirect to the main devices page after successful deletion
      router.push("/devices")
      router.refresh()
      
      // Close modal (though redirection handles this)
      setIsDialogOpen(false) 
    } catch (error) {
      console.error("Failed to delete device:", error)
      // Optionally show a toast error notification here
    } finally {
      setIsDeleting(false)
    }
  }

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        {/* The button visible on the settings page */}
        <Button variant="destructive" className="w-full justify-start md:w-auto">
          <Trash2 className="mr-2 h-4 w-4" /> Delete Device
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="flex items-center space-x-3 text-red-600">
            <AlertTriangle className="h-6 w-6" />
            <DialogTitle className="text-2xl">Confirm Deletion</DialogTitle>
          </div>
          <DialogDescription className="pt-2">
            Are you absolutely sure you want to delete **{deviceName}**?
          </DialogDescription>
        </DialogHeader>

        <div className="p-2 space-y-2 border-l-4 border-red-500 bg-red-50 text-sm text-red-700">
            <p className="font-medium">
                <Trash2 className="h-4 w-4 mr-1 inline" /> WARNING: This action is irreversible.
            </p>
            <p>
                All associated **historical data, logs, and sensor readings** will be permanently removed.
            </p>
        </div>

        <DialogFooter className="mt-4 flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2">
          
          {/* Cancel Button */}
          <Button 
            variant="secondary" 
            onClick={() => setIsDialogOpen(false)}
            disabled={isDeleting}
          >
            Cancel
          </Button>

          {/* Delete Button (Destructive) */}
          <Button 
            variant="destructive" 
            onClick={handleDelete} 
            disabled={isDeleting}
          >
            {isDeleting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Deleting...
              </>
            ) : (
              <>
                <Trash2 className="mr-2 h-4 w-4" />
                Yes, Permanently Delete
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}