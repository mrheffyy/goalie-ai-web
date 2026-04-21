"use client"
import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { 
  Home, Save, BarChart3, Crown, Menu, X,
  Upload, Settings, User
} from 'lucide-react'

const NAV_ITEMS = [
  { href: '/dashboard', label: 'Dashboard', icon: Home },
  { href: '/saves', label: 'History', icon: Save },
  { href: '/recap', label: 'Monthly', icon: BarChart3 },
]

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const pathname = usePathname()

  return (
    <>
      {/* Desktop Nav */}
      <nav className="fixed bottom-0 left-0 right-0 bg-slate-900/90 backdrop-blur-md border-t border-slate-800 z-50 md:top-0 md:bottom-auto md:bg-slate-900 md:border-b md:border-t-0">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center justify-between h-16 md:h-14">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-cyan-500 rounded-lg" />
              <span className="font-bold hidden md:block">GoalieAI</span>
            </Link>

            {/* Main Nav Links */}
            <div className="flex items-center gap-1">
              {NAV_ITEMS.map((item) => {
                const isActive = pathname === item.href
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                      isActive 
                        ? 'bg-blue-500/20 text-blue-400' 
                        : 'text-slate-400 hover:text-white hover:bg-slate-800'
                    }`}
                  >
                    <item.icon className="w-5 h-5" />
                    <span className="text-sm font-medium hidden md:inline">{item.label}</span>
                  </Link>
                )
              })}
            </div>

            {/* Right Side */}
            <div className="flex items-center gap-2">
              <Link href="/" className="p-2 rounded-lg hover:bg-slate-800 text-slate-400">
                <Upload className="w-5 h-5" />
              </Link>
              <Link href="/pricing" className="p-2 rounded-lg hover:bg-slate-800 text-slate-400">
                <Crown className="w-5 h-5" />
              </Link>
              <button className="p-2 rounded-lg hover:bg-slate-800 text-slate-400 md:hidden" onClick={() => setMobileOpen(!mobileOpen)}>
                <Menu className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Bottom Nav Spacer */}
      <div className="h-16 md:hidden" />

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="fixed inset-0 bg-slate-900 z-40 md:hidden">
          <div className="p-4">
            <button onClick={() => setMobileOpen(false)} className="p-2">
              <X className="w-6 h-6" />
            </button>
            <div className="mt-8 space-y-2">
              {NAV_ITEMS.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 rounded-lg text-lg"
                >
                  <item.icon className="w-6 h-6" />
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  )
}
