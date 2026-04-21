"use client"
import { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { useRouter } from 'next/navigation'
import { X, Mail, Lock, User, Calendar, Award } from 'lucide-react'

export default function AuthModal({ isOpen, onClose, initialMode = 'login' }) {
  const [mode, setMode] = useState(initialMode)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [age, setAge] = useState('')
  const [hockeyLevel, setHockeyLevel] = useState('')
  const [team, setTeam] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { login, signup } = useAuth()
  const router = useRouter()

  if (!isOpen) return null

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    setLoading(true)

    const result = mode === 'login' 
      ? await login(email, password)
      : await signup(email, password, { name, age, hockeyLevel, team })

    setLoading(false)

    if (result.success) {
      onClose()
      router.push('/dashboard')
    } else {
      setError(result.error)
    }
  }

  function switchMode() {
    setMode(mode === 'login' ? 'signup' : 'login')
    setError('')
    setName('')
    setAge('')
    setHockeyLevel('')
    setTeam('')
  }

  return (
    <div style={{
      position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.8)', zIndex: 1000,
      display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px'
    }} onClick={onClose}>
      <div style={{
        background: 'var(--slate-800)', borderRadius: '16px', padding: '32px',
        width: '100%', maxWidth: '450px', position: 'relative', maxHeight: '90vh', overflowY: 'auto'
      }} onClick={e => e.stopPropagation()}>
        
        <button onClick={onClose} style={{
          position: 'absolute', right: '16px', top: '16px', background: 'none',
          border: 'none', color: 'var(--slate-400)', cursor: 'pointer'
        }}>
          <X size={24} />
        </button>

        <h2 style={{ fontSize: '24px', fontWeight: '700', marginBottom: '8px' }}>
          {mode === 'login' ? 'Welcome Back' : 'Create Account'}
        </h2>
        <p style={{ color: 'var(--slate-400)', marginBottom: '24px', fontSize: '14px' }}>
          {mode === 'login' ? 'Sign in to access your dashboard' : 'Tell us about yourself to get started'}
        </p>

        {error && <div style={{
          background: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.3)',
          borderRadius: '8px', padding: '12px', marginBottom: '16px', color: '#ef4444',
          fontSize: '14px'
        }}>{error}</div>}

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', fontSize: '14px', marginBottom: '6px' }}>Email</label>
            <div style={{ position: 'relative' }}>
              <Mail size={18} style={{ position: 'absolute', left: '12px', top: '12px', color: 'var(--slate-400)' }} />
              <input type="email" value={email} onChange={e => setEmail(e.target.value)} required
                style={{ width: '100%', padding: '12px 12px 12px 40px', background: 'var(--slate-700)',
                  border: '1px solid var(--slate-600)', borderRadius: '8px', color: 'white' }} />
            </div>
          </div>

          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', fontSize: '14px', marginBottom: '6px' }}>Password</label>
            <div style={{ position: 'relative' }}>
              <Lock size={18} style={{ position: 'absolute', left: '12px', top: '12px', color: 'var(--slate-400)' }} />
              <input type="password" value={password} onChange={e => setPassword(e.target.value)} required
                style={{ width: '100%', padding: '12px 12px 12px 40px', background: 'var(--slate-700)',
                  border: '1px solid var(--slate-600)', borderRadius: '8px', color: 'white' }} />
            </div>
          </div>

          {mode === 'signup' && (
            <>
              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', fontSize: '14px', marginBottom: '6px' }}>Full Name</label>
                <div style={{ position: 'relative' }}>
                  <User size={18} style={{ position: 'absolute', left: '12px', top: '12px', color: 'var(--slate-400)' }} />
                  <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="John Smith"
                    style={{ width: '100%', padding: '12px 12px 12px 40px', background: 'var(--slate-700)',
                      border: '1px solid var(--slate-600)', borderRadius: '8px', color: 'white' }} />
                </div>
              </div>

              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', fontSize: '14px', marginBottom: '6px' }}>Age</label>
                <div style={{ position: 'relative' }}>
                  <Calendar size={18} style={{ position: 'absolute', left: '12px', top: '12px', color: 'var(--slate-400)' }} />
                  <input type="number" value={age} onChange={e => setAge(e.target.value)} placeholder="18"
                    style={{ width: '100%', padding: '12px 12px 12px 40px', background: 'var(--slate-700)',
                      border: '1px solid var(--slate-600)', borderRadius: '8px', color: 'white' }} />
                </div>
              </div>

              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', fontSize: '14px', marginBottom: '6px' }}>Hockey Level</label>
                <div style={{ position: 'relative' }}>
                  <Award size={18} style={{ position: 'absolute', left: '12px', top: '12px', color: 'var(--slate-400)' }} />
                  <select value={hockeyLevel} onChange={e => setHockeyLevel(e.target.value)}
                    style={{ width: '100%', padding: '12px 12px 12px 40px', background: 'var(--slate-700)',
                      border: '1px solid var(--slate-600)', borderRadius: '8px', color: 'white' }}>
                    <option value="">Select your level</option>
                    <option value="youth">Youth (U18 & under)</option>
                    <option value="junior">Junior</option>
                    <option value="college">College</option>
                    <option value="amateur">Amateur</option>
                    <option value="pro">Professional</option>
                    <option value="beer league">Beer League</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>

              <div style={{ marginBottom: '24px' }}>
                <label style={{ display: 'block', fontSize: '14px', marginBottom: '6px' }}>Current Team (Optional)</label>
                <div style={{ position: 'relative' }}>
                  <Award size={18} style={{ position: 'absolute', left: '12px', top: '12px', color: 'var(--slate-400)' }} />
                  <input type="text" value={team} onChange={e => setTeam(e.target.value)} placeholder="Your team name"
                    style={{ width: '100%', padding: '12px 12px 12px 40px', background: 'var(--slate-700)',
                      border: '1px solid var(--slate-600)', borderRadius: '8px', color: 'white' }} />
                </div>
              </div>
            </>
          )}

          <button type="submit" disabled={loading} className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
            {loading ? 'Loading...' : mode === 'login' ? 'Sign In' : 'Create Account'}
          </button>
        </form>

        <p style={{ textAlign: 'center', marginTop: '16px', fontSize: '14px', color: 'var(--slate-400)' }}>
          {mode === 'login' ? "Don't have an account? " : "Already have an account? "}
          <button onClick={switchMode} style={{
            background: 'none', border: 'none', color: '#2563eb', cursor: 'pointer', fontWeight: '500'
          }}>
            {mode === 'login' ? 'Sign Up' : 'Sign In'}
          </button>
        </p>
      </div>
    </div>
  )
}
