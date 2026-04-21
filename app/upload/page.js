"use client"
import { useState } from 'react'
import { Upload, Check, X, Play, Video, ArrowRight } from 'lucide-react'
import Link from 'next/link'

function Header() {
  return (
    <header style={{borderBottom: '1px solid var(--slate-800)', padding: '16px 0'}}>
      <div className="container" style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
        <Link href="/" style={{display: 'flex', alignItems: 'center', gap: '10px'}}>
          <div style={{width: '40px', height: '40px', background: 'linear-gradient(135deg, #dc2626 0%, #b91c1c 100%)', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
            <span style={{color: 'white', fontWeight: '800', fontSize: '20px'}}>G</span>
          </div>
          <span style={{fontSize: '20px', fontWeight: '700'}}>Goalie<span style={{color: '#2563eb'}}>AI</span></span>
        </Link>
        <div style={{display: 'flex', gap: '12px'}}>
          <Link href="/dashboard" className="btn btn-outline" style={{padding: '10px 20px'}}>Dashboard</Link>
        </div>
      </div>
    </header>
  )
}

export default function UploadPage() {
  const [file, setFile] = useState(null)
  const [uploading, setUploading] = useState(false)
  const [analyzing, setAnalyzing] = useState(false)
  const [progress, setProgress] = useState(0)
  const [complete, setComplete] = useState(false)
  
  const handleFileSelect = (e) => {
    const f = e.target.files[0]
    if (f) {
      setFile(f)
      simulateUpload()
    }
  }
  
  const simulateUpload = () => {
    setUploading(true)
    let p = 0
    const interval = setInterval(() => {
      p += 10
      setProgress(p)
      if (p >= 100) {
        clearInterval(interval)
        setUploading(false)
        simulateAnalysis()
      }
    }, 150)
  }
  
  const simulateAnalysis = () => {
    setAnalyzing(true)
    let p = 0
    const interval = setInterval(() => {
      p += 5
      setProgress(p)
      if (p >= 100) {
        clearInterval(interval)
        setAnalyzing(false)
        setComplete(true)
      }
    }, 200)
  }
  
  const reset = () => {
    setFile(null)
    setUploading(false)
    setAnalyzing(false)
    setComplete(false)
    setProgress(0)
  }
  
  return (
    <div style={{minHeight: '100vh'}}>
      <Header />
      
      <main style={{padding: '60px 0'}}>
        <div className="container" style={{maxWidth: '700px'}}>
          <h1 style={{fontSize: '36px', fontWeight: '700', textAlign: 'center', marginBottom: '8px'}}>
            Upload Your Clip
          </h1>
          <p style={{color: 'var(--slate-400)', textAlign: 'center', marginBottom: '40px'}}>
            Drop in your game footage. We will analyze it in minutes.
          </p>
          
          {!file && (
            <label className="card" style={{border: '2px dashed var(--slate-700)', textAlign: 'center', padding: '60px 40px', cursor: 'pointer'}}>
              <input type="file" accept="video/mp4,video/mov,video/avi,video/webm" onChange={handleFileSelect} style={{display: 'none'}} />
              <div style={{width: '64px', height: '64px', background: 'linear-gradient(135deg, #dc262620 0%, #2563eb20 100%)', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px'}}>
                <Upload size={32} style={{color: '#dc2626'}} />
              </div>
              <div style={{fontSize: '18px', fontWeight: '600', marginBottom: '8px'}}>Drop your clip here</div>
              <div style={{color: 'var(--slate-500)', fontSize: '14px'}}>or click to browse</div>
              <div style={{color: 'var(--slate-600)', fontSize: '12px', marginTop: '16px'}}>
                MP4, MOV, AVI, WEBM - Max 1 minute - 500MB
              </div>
            </label>
          )}
          
          {file && !complete && (
            <div className="card">
              <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px'}}>
                <div style={{display: 'flex', alignItems: 'center', gap: '16px'}}>
                  <div style={{width: '48px', height: '48px', background: 'linear-gradient(135deg, #dc262620 0%, #2563eb20 100%)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                    <Video size={24} style={{color: '#dc2626'}} />
                  </div>
                  <div>
                    <div style={{fontWeight: '600', marginBottom: '4px'}}>{file.name}</div>
                    <div style={{fontSize: '12px', color: 'var(--slate-500)'}}>{(file.size / 1024 / 1024).toFixed(1)} MB</div>
                  </div>
                </div>
                <button onClick={reset} style={{background: 'none', border: 'none', color: 'var(--slate-500)', cursor: 'pointer'}}>
                  <X size={20} />
                </button>
              </div>
              
              <div style={{marginBottom: '24px'}}>
                <div style={{height: '8px', background: 'var(--slate-700)', borderRadius: '4px', overflow: 'hidden'}}>
                  <div style={{width: progress + '%', height: '100%', background: 'linear-gradient(90deg, #dc2626, #2563eb)', borderRadius: '4px', transition: 'width 0.3s ease'}} />
                </div>
              </div>
              
              {uploading && (
                <div style={{textAlign: 'center', padding: '20px'}}>
                  <div style={{fontSize: '16px', fontWeight: '600'}}>Uploading...</div>
                  <div style={{fontSize: '14px', color: 'var(--slate-500)'}}>{progress}% complete</div>
                </div>
              )}
              
              {analyzing && (
                <div style={{textAlign: 'center', padding: '20px'}}>
                  <div style={{fontSize: '16px', fontWeight: '600'}}>Analyzing your clip...</div>
                  <div style={{fontSize: '14px', color: 'var(--slate-500)'}}>This usually takes 30-60 seconds</div>
                </div>
              )}
            </div>
          )}
          
          {complete && (
            <div className="card" style={{textAlign: 'center', padding: '60px 40px', border: '2px solid #22c55e'}}>
              <div style={{width: '64px', height: '64px', background: 'rgba(34, 197, 94, 0.1)', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px'}}>
                <Check size={32} style={{color: '#22c55e'}} />
              </div>
              <div style={{fontSize: '18px', fontWeight: '600', marginBottom: '8px'}}>Analysis Complete!</div>
              <div style={{color: 'var(--slate-500)', fontSize: '14px', marginBottom: '32px'}}>
                Your results are ready to view.
              </div>
              <div style={{display: 'flex', gap: '12px', justifyContent: 'center'}}>
                <Link href="/results" className="btn btn-primary">
                  View Full Results
                </Link>
                <button onClick={reset} className="btn btn-outline">
                  Analyze Another
                </button>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
