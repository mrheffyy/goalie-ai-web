"use client"
import { useState, useRef } from 'react'
import { Upload, Video, Loader2, AlertCircle } from 'lucide-react'
import { AuthProvider, useAuth } from '../context/AuthContext'
import Header from '../components/Header'
import { useRouter } from 'next/navigation'

const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://goalie-ai-backend.onrender.com"

function AnalyzeContent() {
  const { user } = useAuth()
  const router = useRouter()
  const [video, setVideo] = useState(null)
  const [uploading, setUploading] = useState(false)
  const [progress, setProgress] = useState(0)
  const [error, setError] = useState(null)
  const videoRef = useRef(null)

  function handleVideoSelect(e) {
    const file = e.target.files[0]
    if (file) {
      setVideo(URL.createObjectURL(file))
      setError(null)
    }
  }

  async function handleAnalyze() {
    if (!video) return
    
    setUploading(true)
    setProgress(10)
    setError(null)

    const fileInput = document.getElementById('video-input')
    const file = fileInput.files[0]

    const formData = new FormData()
    formData.append('video', file)
    formData.append('client_id', user?.id || 'anonymous')

    try {
      setProgress(30)
      
      const res = await fetch(`${API_URL}/analyze`, {
        method: 'POST',
        body: formData,
        headers: user?.token ? { 'Authorization': `Bearer ${user.token}` } : {}
      })
      
      const data = await res.json()
      setProgress(80)

      if (!data.success) {
        if (data.upgrade_required) {
          setError(data.error + ' Please upgrade your plan.')
          setUploading(false)
          return
        }
        throw new Error(data.error || 'Analysis failed')
      }

      localStorage.setItem('goalieai_result', JSON.stringify(data))
      setProgress(100)
      
      setTimeout(() => {
        router.push('/results')
      }, 500)
      
    } catch (err) {
      setError(err.message)
      setUploading(false)
    }
  }

  return (
    <div style={{ minHeight: '100vh', padding: '40px 0' }}>
      <Header />
      
      <div className="container" style={{ maxWidth: '600px' }}>
        <h1 style={{ fontSize: '36px', fontWeight: '700', marginBottom: '8px', textAlign: 'center' }}>
          Analyze Your Clip
        </h1>
        <p style={{ color: 'var(--slate-400)', textAlign: 'center', marginBottom: '32px' }}>
          Upload a video up to 60 seconds and get instant AI feedback
        </p>

        {user && (
          <div style={{ 
            background: 'var(--slate-800)', borderRadius: '12px', padding: '16px', 
            marginBottom: '24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' 
          }}>
            <div>
              <div style={{ fontSize: '14px', color: 'var(--slate-400)' }}>Current Plan</div>
              <div style={{ fontSize: '18px', fontWeight: '600', textTransform: 'capitalize' }}>{user.plan}</div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: '14px', color: 'var(--slate-400)' }}>This Week</div>
              <div style={{ fontSize: '18px', fontWeight: '600' }}>{user.analyses_used_this_week || 0} / {user.plan === 'elite' ? '∞' : user.plan === 'free' ? 5 : user.plan === 'starter' ? 10 : 30}</div>
            </div>
          </div>
        )}

        <div className="card" style={{ padding: '48px', textAlign: 'center' }}>
          {video ? (
            <div style={{ marginBottom: '24px' }}>
              <video 
                ref={videoRef}
                src={video} 
                controls 
                style={{ width: '100%', maxHeight: '300px', borderRadius: '12px' }}
              />
            </div>
          ) : (
            <div style={{ 
              border: '2px dashed var(--slate-600)', borderRadius: '12px', padding: '48px',
              marginBottom: '24px', cursor: 'pointer'
            }} onClick={() => document.getElementById('video-input').click()}>
              <Upload size={48} style={{ color: 'var(--slate-400)', marginBottom: '16px' }} />
              <div style={{ fontSize: '18px', fontWeight: '600', marginBottom: '8px' }}>
                Drop your video here
              </div>
              <div style={{ color: 'var(--slate-400)', fontSize: '14px' }}>
                MP4, MOV, or WEBM up to 60 seconds
              </div>
            </div>
          )}

          <input 
            type="file" 
            id="video-input" 
            accept="video/*" 
            onChange={handleVideoSelect}
            style={{ display: 'none' }}
          />

          {error && (
            <div style={{ 
              background: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.3)',
              borderRadius: '8px', padding: '12px', marginBottom: '16px', color: '#ef4444',
              display: 'flex', alignItems: 'center', gap: '8px'
            }}>
              <AlertCircle size={18} />
              {error}
            </div>
          )}

          {uploading ? (
            <div style={{ marginBottom: '16px' }}>
              <div style={{ 
                height: '8px', background: 'var(--slate-700)', borderRadius: '4px', 
                overflow: 'hidden', marginBottom: '12px'
              }}>
                <div style={{ 
                  width: `${progress}%`, height: '100%', background: '#2563eb',
                  borderRadius: '4px', transition: 'width 0.3s'
                }} />
              </div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', color: 'var(--slate-400)' }}>
                <Loader2 size={18} className="spin" />
                Analyzing... {progress}%
              </div>
            </div>
          ) : (
            <button 
              onClick={handleAnalyze}
              disabled={!video}
              className="btn btn-primary"
              style={{ width: '100%', justifyContent: 'center', opacity: !video ? 0.5 : 1 }}
            >
              <Video size={18} />
              Analyze Video
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export default function Analyze() {
  return (
    <AuthProvider>
      <AnalyzeContent />
    </AuthProvider>
  )
}
