import type React from "react"
import Link from "next/link"
import { cn } from "@/lib/utils"

export function SectionCard({
  title,
  description,
  href,
  icon,
  className,
}: {
  title: string
  description: string
  href: string
  icon?: React.ReactNode
  className?: string
}) {
  return (
    <Link
      href={href}
      className={cn(
        "group relative rounded-xl border border-gray-200 bg-white p-4 shadow-sm transition hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500",
        className,
      )}
    >
      <div className="flex items-start gap-3">
        {icon ? <div className="mt-0.5 text-emerald-600">{icon}</div> : null}
        <div className="flex-1">
          <h3 className="text-base font-semibold text-gray-900">{title}</h3>
          <p className="mt-1 text-sm leading-relaxed text-gray-500">{description}</p>
        </div>
      </div>
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-transparent transition group-hover:ring-emerald-200"
      />
    </Link>
  )
}
