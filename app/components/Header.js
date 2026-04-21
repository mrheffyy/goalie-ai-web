"use client"
import { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import Link from 'next/link'
import AuthModal from './AuthModal'
import { User, LogOut, Settings, BarChart2, CreditCard, Video, Menu, X } from 'lucide-react'

export default function Header({ showMenu = true }) {
  const { user, logout } = useAuth()
  const [showAuthModal, setShowAuthModal] = useState(false)
  const [authMode, setAuthMode] = useState('login')
  const [menuOpen, setMenuOpen] = useState(false)
  const [userMenuOpen, setUserMenuOpen] = useState(false)

  function openLogin() {
    setAuthMode('login')
    setShowAuthModal(true)
  }

  function openSignup() {
    setAuthMode('signup')
    setShowAuthModal(true)
  }

  return (
    <>
      <header style={{ borderBottom: '1px solid var(--slate-800)', padding: '16px 0', position: 'sticky', top: 0, background: 'var(--slate-900)', zIndex: 100 }}>
        <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ width: '40px', height: '40px', background: 'linear-gradient(135deg, #dc2626 0%, #b91c1c 100%)', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ color: 'white', fontWeight: '800', fontSize: '20px' }}>G</span>
            </div>
            <span style={{ fontSize: '20px', fontWeight: '700' }}>Goalie<span style={{ color: '#2563eb' }}>AI</span></span>
          </Link>

          {showMenu && (
            <nav style={{ display: 'flex', gap: '32px', display: 'none' }}>
              <Link href="/analyze" style={{ color: 'var(--slate-300)', fontSize: '14px', fontWeight: '500' }}>Analyze</Link>
              {user && <Link href="/dashboard" style={{ color: 'var(--slate-300)', fontSize: '14px', fontWeight: '500' }}>Dashboard</Link>}
            </nav>
          )}

          <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
            {user ? (
              <div style={{ position: 'relative' }}>
                <button onClick={() => setUserMenuOpen(!userMenuOpen)} style={{
                  display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 16px',
                  background: 'var(--slate-800)', border: '1px solid var(--slate-700)', borderRadius: '8px',
                  cursor: 'pointer', color: 'white'
                }}>
                  <User size={18} />
                  <span style={{ fontSize: '14px' }}>{user.email.split('@')[0]}</span>
                  <span style={{ fontSize: '12px', padding: '2px 8px', background: user.plan === 'elite' ? '#8b5cf6' : '#2563eb', borderRadius: '4px' }}>{user.plan}</span>
                </button>

                {userMenuOpen && (
                  <div style={{
                    position: 'absolute', right: 0, top: '100%', marginTop: '8px',
                    background: 'var(--slate-800)', border: '1px solid var(--slate-700)',
                    borderRadius: '8px', padding: '8px', minWidth: '200px', boxShadow: '0 10px 40px rgba(0,0,0,0.5)'
                  }}>
                    <div style={{ padding: '12px', borderBottom: '1px solid var(--slate-700)', marginBottom: '8px' }}>
                      <div style={{ fontSize: '14px', fontWeight: '600' }}>{user.email}</div>
                      <div style={{ fontSize: '12px', color: 'var(--slate-400)' }}>{user.plan} plan</div>
                    </div>
                    <Link href="/dashboard" style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '10px 12px', color: 'var(--slate-300)', borderRadius: '6px' }} onClick={() => setUserMenuOpen(false)}>
                      <BarChart2 size={18} /> Dashboard
                    </Link>
                    <Link href="/dashboard?tab=results" style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '10px 12px', color: 'var(--slate-300)', borderRadius: '6px' }} onClick={() => setUserMenuOpen(false)}>
                      <Video size={18} /> Results
                    </Link>
                    <Link href="/dashboard?tab=billing" style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '10px 12px', color: 'var(--slate-300)', borderRadius: '6px' }} onClick={() => setUserMenuOpen(false)}>
                      <CreditCard size={18} /> Billing
                    </Link>
                    <Link href="/dashboard?tab=settings" style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '10px 12px', color: 'var(--slate-300)', borderRadius: '6px' }} onClick={() => setUserMenuOpen(false)}>
                      <Settings size={18} /> Settings
                    </Link>
                    <button onClick={() => { logout(); setUserMenuOpen(false) }} style={{
                      display: 'flex', alignItems: 'center', gap: '12px', padding: '10px 12px',
                      color: '#ef4444', borderRadius: '6px', width: '100%', background: 'none',
                      border: 'none', cursor: 'pointer', fontSize: '14px'
                    }}>
                      <LogOut size={18} /> Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <>
                <button onClick={openLogin} className="btn btn-outline" style={{ padding: '10px 20px' }}>Log In</button>
                <button onClick={openSignup} className="btn btn-primary" style={{ padding: '10px 20px' }}>Sign Up</button>
              </>
            )}
          </div>
        </div>
      </header>

      <AuthModal isOpen={showAuthModal} onClose={() => setShowAuthModal(false)} initialMode={authMode} />
    </>
  )
}
