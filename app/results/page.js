"use client"
import { useState, useEffect } from 'react'
import { AuthProvider, useAuth } from '../context/AuthContext'
import Header from '../components/Header'
import Link from 'next/link'
import { Check, AlertTriangle, ChevronLeft, Share2, Download, Video, Target, Award, Zap } from 'lucide-react'

function ResultsContent() {
  const { user } = useAuth()
  const [result, setResult] = useState(null)

  useEffect(() => {
    const saved = localStorage.getItem('goalieai_result')
    if (saved) {
      setResult(JSON.parse(saved))
    }
  }, [])

  if (!result) {
    return (
      <div style={{ minHeight: '100vh' }}>
        <Header />
        <div className="container" style={{ padding: '80px 0', textAlign: 'center' }}>
          <h1 style={{ fontSize: '36px', fontWeight: '700', marginBottom: '16px' }}>No Results</h1>
          <p style={{ color: 'var(--slate-400)', marginBottom: '24px' }}>Please analyze a video first</p>
          <Link href="/analyze" className="btn btn-primary">Analyze Video</Link>
        </div>
      </div>
    )
  }

  const { result: data, video_url: videoUrl, mode } = result
  const score = data.overall_score || 0

  return (
    <div style={{ minHeight: '100vh' }}>
      <Header />
      
      <div className="container" style={{ padding: '40px 0' }}>
        <Link href="/analyze" style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--slate-400)', marginBottom: '24px' }}>
          <ChevronLeft size={18} />
          Back to Analyze
        </Link>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 350px', gap: '32px' }}>
          {/* Main Content */}
          <div>
            {/* Score Header */}
            <div className="card" style={{ padding: '32px', marginBottom: '24px', textAlign: 'center' }}>
              <div style={{ fontSize: '14px', color: 'var(--slate-400)', marginBottom: '8px' }}>Overall Score</div>
              <div style={{ 
                width: '140px', height: '140px', borderRadius: '50%', margin: '0 auto 16px',
                background: `conic-gradient(#2563eb ${score * 3.6}deg, var(--slate-700) 0deg)`,
                display: 'flex', alignItems: 'center', justifyContent: 'center'
              }}>
                <div style={{ 
                  width: '120px', height: '120px', borderRadius: '50%', background: 'var(--slate-800)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column'
                }}>
                  <span style={{ fontSize: '36px', fontWeight: '700', color: score >= 70 ? '#22c55e' : score >= 50 ? '#f59e0b' : '#ef4444' }}>{score}</span>
                  <span style={{ fontSize: '12px', color: 'var(--slate-400)' }}>/ 100</span>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '16px', justifyContent: 'center' }}>
                <button className="btn btn-outline" style={{ fontSize: '14px' }}>
                  <Share2 size={16} /> Share
                </button>
                <button className="btn btn-outline" style={{ fontSize: '14px' }}>
                  <Download size={16} /> Download
                </button>
              </div>
            </div>

            {/* Criteria Scores */}
            <div className="card" style={{ padding: '24px', marginBottom: '24px' }}>
              <h2 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '20px' }}>Score Breakdown</h2>
              <div style={{ display: 'grid', gap: '16px' }}>
                {data.criteria_scores?.map((item, i) => (
                  <div key={i}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                      <span style={{ fontSize: '14px' }}>{item.name}</span>
                      <span style={{ fontSize: '14px', fontWeight: '600', color: item.score >= 7 ? '#22c55e' : item.score >= 5 ? '#f59e0b' : '#ef4444' }}>{item.score}/10</span>
                    </div>
                    <div style={{ height: '6px', background: 'var(--slate-700)', borderRadius: '3px', overflow: 'hidden' }}>
                      <div style={{ width: `${item.score * 10}%`, height: '100%', background: item.score >= 7 ? '#22c55e' : item.score >= 5 ? '#f59e0b' : '#ef4444', borderRadius: '3px' }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Strengths & Improvements */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginBottom: '24px' }}>
              <div className="card" style={{ padding: '24px' }}>
                <h3 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Check size={18} style={{ color: '#22c55e' }} />
                  Strengths
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {data.strengths?.map((s, i) => (
                    <div key={i} style={{ fontSize: '14px', color: 'var(--slate-300)' }}>{s}</div>
                  ))}
                </div>
              </div>

              <div className="card" style={{ padding: '24px' }}>
                <h3 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <AlertTriangle size={18} style={{ color: '#f59e0b' }} />
                  Improvements
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {data.improvements?.map((imp, i) => (
                    <div key={i} style={{ fontSize: '14px', color: 'var(--slate-300)' }}>{imp}</div>
                  ))}
                </div>
              </div>
            </div>

            {/* Drill Recommendations */}
            {data.drill_recommendations?.length > 0 && (
              <div className="card" style={{ padding: '24px' }}>
                <h2 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Zap size={20} style={{ color: '#f59e0b' }} />
                  Recommended Drills
                </h2>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px' }}>
                  {data.drill_recommendations.map((drill, i) => (
                    <div key={i} style={{ padding: '20px', background: 'var(--slate-700)', borderRadius: '12px' }}>
                      <div style={{ fontWeight: '600', marginBottom: '8px' }}>{drill.name}</div>
                      <div style={{ fontSize: '14px', color: 'var(--slate-400)', marginBottom: '12px' }}>{drill.description}</div>
                      {drill.focus_points && (
                        <div style={{ fontSize: '12px', padding: '8px 12px', background: 'rgba(37, 99, 235, 0.1)', borderRadius: '6px' }}>
                          <span style={{ color: '#93c5fd' }}>Focus: </span>
                          <span style={{ color: 'var(--slate-300)' }}>{drill.focus_points}</span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div>
            {videoUrl && (
              <div className="card" style={{ padding: '16px', marginBottom: '24px' }}>
                <h3 style={{ fontSize: '14px', fontWeight: '600', marginBottom: '12px' }}>Your Video</h3>
                <video 
                  src={videoUrl} 
                  controls 
                  style={{ width: '100%', borderRadius: '8px' }}
                />
              </div>
            )}

            <div className="card" style={{ padding: '24px' }}>
              <h3 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '16px' }}>Next Steps</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <Link href="/analyze" className="btn btn-primary" style={{ width: '100%' }}>
                  <Video size={18} />
                  Analyze Another
                </Link>
                <Link href="/dashboard" className="btn btn-outline" style={{ width: '100%' }}>
                  <BarChart2 size={18} />
                  View Dashboard
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function Results() {
  return (
    <AuthProvider>
      <ResultsContent />
    </AuthProvider>
  )
}
