"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export function ProfileClient() {
  const [tab, setTab] = useState<"account" | "inventory">("account")
  const [displayName, setDisplayName] = useState("Student Explorer")
  const [email, setEmail] = useState("student@example.com")
  const [school, setSchool] = useState("Green Valley High")

  const captured = [
    { id: "smogling", name: "Smogling", type: "Air", count: 3 },
    { id: "littergeist", name: "Littergeist", type: "Waste", count: 2 },
    { id: "oilwyrm", name: "Oilwyrm", type: "Water", count: 1 },
  ]

  return (
    <section className="mx-auto mt-4 max-w-xl px-4">
      <div className="rounded-lg border border-gray-200 bg-white p-1">
        <div className="grid grid-cols-2 gap-1">
          <button
            className={`rounded-md px-3 py-2 text-sm font-medium ${
              tab === "account" ? "bg-emerald-600 text-white" : "text-gray-600 hover:bg-gray-50"
            }`}
            onClick={() => setTab("account")}
          >
            Account
          </button>
          <button
            className={`rounded-md px-3 py-2 text-sm font-medium ${
              tab === "inventory" ? "bg-emerald-600 text-white" : "text-gray-600 hover:bg-gray-50"
            }`}
            onClick={() => setTab("inventory")}
          >
            Inventory
          </button>
        </div>
      </div>

      {tab === "account" ? (
        <div className="mt-4 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Profile</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3">
                <Avatar className="h-10 w-10">
                  <AvatarImage src="/diverse-profile-avatars.png" alt="Profile avatar" />
                  <AvatarFallback>SE</AvatarFallback>
                </Avatar>
                <Button variant="outline">Change Avatar</Button>
              </div>

              <div>
                <label htmlFor="displayName" className="block text-xs font-medium text-gray-600">
                  Display Name
                </label>
                <input
                  id="displayName"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-900 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-xs font-medium text-gray-600">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-900 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                />
              </div>

              <div>
                <label htmlFor="school" className="block text-xs font-medium text-gray-600">
                  School
                </label>
                <input
                  id="school"
                  value={school}
                  onChange={(e) => setSchool(e.target.value)}
                  className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-900 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                />
              </div>

              <div className="flex items-center gap-3">
                <Button variant="outline">Cancel</Button>
                <Button className="bg-emerald-600 text-white hover:bg-emerald-700">Save Changes</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      ) : (
        <div className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Captured Monsters</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {captured.map((c) => (
                  <li key={c.id} className="rounded-md border border-gray-200 p-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-900">{c.name}</p>
                        <div className="mt-1 flex items-center gap-2">
                          <Badge variant="secondary" className="text-gray-700">
                            {c.type}
                          </Badge>
                          <span className="text-xs text-gray-500">Count: {c.count}</span>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        Details
                      </Button>
                    </div>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      )}
    </section>
  )
}
