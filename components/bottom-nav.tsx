"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Home, Camera, BookOpen, User } from "lucide-react"

const items = [
  { href: "/", label: "Home", Icon: Home },
  { href: "/ar", label: "AR Hunt", Icon: Camera },
  { href: "/monsterdex", label: "MonsterDex", Icon: BookOpen },
  { href: "/profile", label: "Profile", Icon: User },
]

export function BottomNav() {
  const pathname = usePathname()

  return (
    <nav
      aria-label="Primary"
      className="fixed bottom-0 inset-x-0 z-50 border-t border-gray-200 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60"
    >
      <ul className="mx-auto grid max-w-lg grid-cols-4 gap-1 p-2">
        {items.map(({ href, label, Icon }) => {
          const active = pathname === href
          return (
            <li key={href} className="flex items-center justify-center">
              <Link
                href={href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "flex w-full flex-col items-center justify-center rounded-md px-2 py-1.5 text-xs font-medium transition-colors",
                  active ? "text-emerald-700" : "text-gray-500 hover:text-gray-900",
                )}
              >
                <Icon
                  aria-hidden="true"
                  className={cn("mb-0.5 h-5 w-5", active ? "text-emerald-600" : "text-gray-500")}
                />
                <span className="sr-only md:not-sr-only">{label}</span>
              </Link>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
