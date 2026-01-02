"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Calendar, ImageIcon, Settings, Home } from "lucide-react"
import { usePathname } from "next/navigation"

export function AdminSidebar() {
  const pathname = usePathname()

  const navItems = [
    { name: "Events", href: "/admin", icon: Calendar },
    { name: "Media Library", href: "/admin/media", icon: ImageIcon },
    { name: "Settings", href: "/admin/settings", icon: Settings },
  ]

  return (
    <aside className="w-64 border-r border-border bg-card min-h-screen sticky top-0 flex flex-col">
      <div className="p-6">
        <h1 className="text-2xl font-serif font-bold text-primary">KhalidLifestyle</h1>
        <p className="text-sm text-muted-foreground mt-1">Admin Dashboard</p>
      </div>

      <nav className="px-4 space-y-2 flex-1">
        {navItems.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link key={item.href} href={item.href}>
              <Button variant={isActive ? "secondary" : "ghost"} className="w-full justify-start">
                <item.icon className="mr-2 h-4 w-4" />
                {item.name}
              </Button>
            </Link>
          )
        })}
      </nav>

      <div className="p-4 border-t border-border">
        <Link href="/">
          <Button variant="outline" className="w-full bg-transparent">
            <Home className="mr-2 h-4 w-4" />
            View Website
          </Button>
        </Link>
      </div>
    </aside>
  )
}
