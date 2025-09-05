"use client"

import { useEffect, useMemo, useState } from "react"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Camera, CameraOff, Flashlight, Repeat2, ShieldQuestion } from "lucide-react"
import { cn } from "@/lib/utils"

type Status = "idle" | "scanning" | "detected" | "capturing" | "captured"

export function HuntUI() {
  const [status, setStatus] = useState<Status>("idle")
  const [torch, setTorch] = useState(false)
  const [front, setFront] = useState(false)
  const [progress, setProgress] = useState(0)
  const [log, setLog] = useState<string[]>([])
  const [open, setOpen] = useState(false)

  const monster = useMemo(() => ({ id: "smogling", name: "Smogling", type: "Air", threat: "Low" }), [])

  function addLog(entry: string) {
    setLog((l) => [new Date().toLocaleTimeString() + " • " + entry, ...l].slice(0, 8))
  }

  function startScan() {
    if (status === "scanning") return
    setStatus("scanning")
    setProgress(0)
    addLog("Scan started")
  }

  function stopScan() {
    setStatus("idle")
    setProgress(0)
    addLog("Scan stopped")
  }

  function resetFlow() {
    setStatus("idle")
    setProgress(0)
    setOpen(false)
    addLog("Reset to idle")
  }

  function beginCapture() {
    setStatus("capturing")
    addLog(`Capturing ${monster.name}...`)
    // Simulate capture delay
    setTimeout(() => {
      setStatus("captured")
      addLog(`Capture complete: ${monster.name}`)
      setOpen(false)
    }, 1000)
  }

  useEffect(() => {
    if (status !== "scanning") return
    let tick = 0
    const id = setInterval(() => {
      tick += 1
      setProgress((p) => {
        const next = Math.min(p + 6, 100)
        if (next >= 40 && next < 46) addLog("Signal detected: elevated particulates (PM2.5)")
        if (next >= 70 && next < 76) addLog("Anomaly pattern matches Air-type signature")
        if (next >= 100) {
          clearInterval(id)
          setStatus("detected")
          setOpen(true)
          addLog(`Target found: ${monster.name}`)
        }
        return next
      })
    }, 250)
    return () => clearInterval(id)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status])

  return (
    <section className="mx-auto mt-4 max-w-xl px-4">
      {/* Camera preview placeholder */}
      <div className="relative aspect-video w-full overflow-hidden rounded-xl border border-gray-200 bg-gray-50">
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-sm text-gray-500">Camera preview placeholder</span>
        </div>
        {/* Reticle */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-6 rounded-lg border-2 border-dashed border-emerald-300"
        />
        {/* Bottom overlay controls */}
        <div className="absolute inset-x-0 bottom-0 p-3">
          <div className="mx-auto flex max-w-sm items-center justify-center gap-2">
            {status !== "scanning" ? (
              <Button onClick={startScan} className="bg-emerald-600 text-white hover:bg-emerald-700">
                <Camera className="mr-2 h-4 w-4" />
                Start Scan
              </Button>
            ) : (
              <Button onClick={stopScan} variant="destructive">
                <CameraOff className="mr-2 h-4 w-4" />
                Stop
              </Button>
            )}
            <Button
              variant="outline"
              aria-pressed={torch}
              onClick={() => {
                setTorch((t) => !t)
                addLog(`Torch ${!torch ? "enabled" : "disabled"}`)
              }}
            >
              <Flashlight className="mr-2 h-4 w-4" />
              Torch
            </Button>
            <Button
              variant="outline"
              onClick={() => {
                setFront((f) => !f)
                addLog(`Camera switched to ${!front ? "front" : "rear"}`)
              }}
            >
              <Repeat2 className="mr-2 h-4 w-4" />
              Switch
            </Button>
          </div>
        </div>
      </div>

      {/* Status and progress */}
      <div className="mt-4 space-y-2">
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-500">Status:</span>
          <span
            className={cn(
              "rounded-md px-2 py-0.5 text-xs font-medium",
              status === "idle" && "bg-gray-100 text-gray-700",
              status === "scanning" && "bg-emerald-100 text-emerald-700",
              status === "detected" && "bg-amber-100 text-amber-700",
              status === "capturing" && "bg-emerald-100 text-emerald-700",
              status === "captured" && "bg-emerald-200 text-emerald-900",
            )}
          >
            {status}
          </span>
          <div className="ml-auto">
            {(status === "detected" || status === "captured") && (
              <Button variant="outline" size="sm" onClick={resetFlow}>
                Reset
              </Button>
            )}
          </div>
        </div>
        <Progress value={status === "scanning" ? progress : status === "detected" ? 100 : 0} />
      </div>

      {/* Interaction log */}
      <div className="mt-4 rounded-md border border-gray-200 p-3">
        <div className="flex items-center gap-2">
          <ShieldQuestion className="h-4 w-4 text-gray-400" aria-hidden="true" />
          <p className="text-sm text-gray-500">Interaction log (detections, hints, capture prompts)</p>
        </div>
        <ul className="mt-2 space-y-1">
          {log.length === 0 ? (
            <li className="text-sm text-gray-400">No events yet.</li>
          ) : (
            log.map((l, i) => (
              <li key={i} className="text-sm text-gray-700">
                {l}
              </li>
            ))
          )}
        </ul>
      </div>

      {/* Detection dialog (capture flow mock) */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-gray-900">Monster detected</DialogTitle>
            <DialogDescription>
              {monster.name} detected nearby. Type: {monster.type}. Threat level: {monster.threat}.
            </DialogDescription>
          </DialogHeader>
          <div className="rounded-md border border-emerald-200 bg-emerald-50 p-3">
            <p className="text-sm text-gray-800">
              Align the reticle and begin capture to record environmental evidence.
            </p>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>
              Not now
            </Button>
            <Button className="bg-emerald-600 text-white hover:bg-emerald-700" onClick={beginCapture}>
              Begin Capture
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Captured summary */}
      {status === "captured" && (
        <div className="mt-4 rounded-lg border border-emerald-200 bg-emerald-50 p-3">
          <p className="text-sm text-gray-900">
            Capture saved: {monster.name}. Next: add notes, verify photo, or tag location.
          </p>
          <div className="mt-2 flex items-center gap-2">
            <Button variant="outline" size="sm">
              Add Notes
            </Button>
            <Button variant="outline" size="sm">
              Verify Photo
            </Button>
            <Button size="sm" className="bg-emerald-600 text-white hover:bg-emerald-700">
              Continue
            </Button>
          </div>
        </div>
      )}
    </section>
  )
}
