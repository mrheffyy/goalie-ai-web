"use client"
import { createContext, useContext, useState, useEffect } from 'react'

const AuthContext = createContext()

const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://goalie-ai-backend.onrender.com"

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    checkAuth()
  }, [])

  async function checkAuth() {
    const token = localStorage.getItem('goalieai_token')
    if (!token) {
      setLoading(false)
      return
    }

    try {
      const res = await fetch(`${API_URL}/auth/me`, {
        headers: { 'Authorization': `Bearer ${token}` }
      })
      const data = await res.json()
      if (data.id) {
        setUser({ ...data, token })
      } else {
        localStorage.removeItem('goalieai_token')
      }
    } catch (e) {
      localStorage.removeItem('goalieai_token')
    }
    setLoading(false)
  }

  async function login(email, password) {
    const res = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: `email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`
    })
    const data = await res.json()
    
    if (data.success) {
      localStorage.setItem('goalieai_token', data.token)
      setUser({ ...data.user, token: data.token })
      return { success: true }
    }
    return { success: false, error: data.error }
  }

  async function signup(email, password, profile = {}) {
    const res = await fetch(`${API_URL}/auth/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: `email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}&name=${encodeURIComponent(profile.name || '')}&age=${encodeURIComponent(profile.age || '')}&hockey_level=${encodeURIComponent(profile.hockeyLevel || '')}&team=${encodeURIComponent(profile.team || '')}`
    })
    const data = await res.json()
    
    if (data.success) {
      localStorage.setItem('goalieai_token', data.token)
      setUser({ ...data.user, token: data.token })
      return { success: true }
    }
    return { success: false, error: data.error }
  }

  function logout() {
    localStorage.removeItem('goalieai_token')
    setUser(null)
  }

  async function refreshUser() {
    await checkAuth()
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, signup, logout, refreshUser }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}
