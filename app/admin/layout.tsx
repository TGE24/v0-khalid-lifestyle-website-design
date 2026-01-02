import type React from "react"
import Link from "next/link"
import { LayoutDashboard, Calendar, ImageIcon, Settings, LogOut, User } from "lucide-react"

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen bg-background text-foreground font-sans">
      {/* Sidebar */}
      <aside className="w-64 border-r border-border bg-card/50 backdrop-blur-md sticky top-0 h-screen hidden md:flex flex-col">
        <div className="p-6 border-b border-border">
          <Link href="/admin" className="text-xl font-serif tracking-tighter text-gold">
            KHALID<span className="text-foreground">LIFESTYLE</span>
          </Link>
          <p className="text-[10px] text-muted-foreground uppercase tracking-[0.2em] mt-1">Admin Portal</p>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          <Link
            href="/admin"
            className="flex items-center gap-3 px-4 py-3 rounded-sm hover:bg-white/5 transition-colors text-sm font-medium"
          >
            <LayoutDashboard className="w-4 h-4 text-gold" />
            Dashboard
          </Link>
          <Link
            href="/admin/events"
            className="flex items-center gap-3 px-4 py-3 rounded-sm hover:bg-white/5 transition-colors text-sm font-medium"
          >
            <Calendar className="w-4 h-4 text-gold" />
            Events
          </Link>
          <Link
            href="/admin/gallery"
            className="flex items-center gap-3 px-4 py-3 rounded-sm hover:bg-white/5 transition-colors text-sm font-medium"
          >
            <ImageIcon className="w-4 h-4 text-gold" />
            Gallery
          </Link>
          <Link
            href="/admin/settings"
            className="flex items-center gap-3 px-4 py-3 rounded-sm hover:bg-white/5 transition-colors text-sm font-medium"
          >
            <Settings className="w-4 h-4 text-gold" />
            Settings
          </Link>
        </nav>

        <div className="p-4 border-t border-border space-y-2">
          <div className="flex items-center gap-3 px-4 py-3 text-sm text-muted-foreground">
            <User className="w-4 h-4" />
            <span>Khalid Admin</span>
          </div>
          <Link
            href="/"
            className="flex items-center gap-3 px-4 py-3 rounded-sm hover:bg-destructive/10 hover:text-destructive transition-colors text-sm font-medium text-muted-foreground"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0">
        <header className="h-16 border-b border-border bg-background/80 backdrop-blur-md sticky top-0 z-10 flex items-center justify-between px-8">
          <h2 className="text-sm font-medium uppercase tracking-widest text-muted-foreground">System Overview</h2>
          <div className="flex items-center gap-4">
            <div className="w-8 h-8 rounded-full bg-gold/20 border border-gold/50 flex items-center justify-center text-gold text-[10px] font-bold">
              KA
            </div>
          </div>
        </header>
        <div className="p-8 max-w-7xl mx-auto w-full">{children}</div>
      </main>
    </div>
  )
}
