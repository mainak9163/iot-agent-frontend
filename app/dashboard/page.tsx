"use client";

import { useEffect, useState } from "react";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useRouter } from "next/navigation";
import { fetchDevices, getToken } from "@/lib/api";

export default function Dashboard() {
  const router=useRouter(); 

  const [loading, setLoading] = useState(true);
  const [devices, setDevices] = useState([]);

  // Auth check not required since middleware handles it

  // ---------------------------
  // FETCH DEVICES
  // ---------------------------
  useEffect(() => {
    async function loadDevices() {
      try {
        const res = await fetchDevices();
        setDevices(Array.isArray(res) ? res : []);
      } catch (err) {
        console.error("Failed to load devices", err);
      }

      setLoading(false);
    }

    loadDevices();
  }, []);

  // ---------------------------
  // REDIRECT IF NO DEVICES
  // ---------------------------
  useEffect(() => {
    if (!loading && devices.length === 0) {
      navigate("/dashboard/onboarding");
    }
  }, [loading, devices]);

  // ---------------------------
  // LOADING STATE
  // ---------------------------
  if (loading) {
    return (
      <div className="p-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {[1, 2, 3].map((i) => (
          <Card key={i} className="p-4">
            <Skeleton className="h-6 w-1/2 mb-3" />
            <Skeleton className="h-4 w-3/4" />
          </Card>
        ))}
      </div>
    );
  }

  // ---------------------------
  // MAIN JSX
  // ---------------------------
  return (
    <div className="p-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
        <h2 className="text-2xl font-semibold">Your Devices</h2>

        <div className="flex gap-3">
          <Button onClick={() => navigate("/dashboard/onboarding")}>
            Add / Claim Device
          </Button>
          <Button variant="outline" onClick={() => navigate("/dashboard/homes")}>
            Manage Homes
          </Button>
        </div>
      </div>

      {/* DEVICES GRID */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {devices.map((device) => (
          <Card
            key={device.id}
            onClick={() => navigate(`/dashboard/device/${device.id}/dashboard`)}
            className="cursor-pointer hover:bg-muted/50 transition p-4"
          >
            <CardHeader className="p-0 mb-3">
              <CardTitle className="text-lg">{device.name}</CardTitle>
            </CardHeader>

            <CardContent className="p-0 text-sm text-muted-foreground">
              <div>Home: {device.home?.name || "Unknown"}</div>
              <div>Status: Online</div>
              {/* Optional: add more fields if available */}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
