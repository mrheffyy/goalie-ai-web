"use client"
import { Upload, TrendingUp, Target, Check, Play, BarChart2, Clock, Video } from 'lucide-react'
import { useState } from 'react'
import Link from 'next/link'
import { AuthProvider } from './context/AuthContext'
import Header from './components/Header'

function Hero() {
  return (
    <section style={{ padding: '80px 0', textAlign: 'center' }}>
      <div className="container">
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(37, 99, 235, 0.1)', border: '1px solid rgba(37, 99, 235, 0.3)', borderRadius: '100px', padding: '8px 16px', marginBottom: '24px' }}>
          <TrendingUp size={16} style={{ color: '#2563eb' }} />
          <span style={{ fontSize: '14px', color: '#93c5fd' }}>AI-Powered Goalie Analysis</span>
        </div>
        
        <h1 style={{ fontSize: '56px', fontWeight: '800', lineHeight: '1.1', marginBottom: '24px' }}>
          Your Goalie.<br/>
          <span style={{ background: 'linear-gradient(135deg, #dc2626 0%, #2563eb 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Analyzed.</span>
        </h1>
        
        <p style={{ fontSize: '18px', color: 'var(--slate-400)', maxWidth: '540px', margin: '0 auto 40px' }}>
          Upload a 60-second clip. AI tracks puck, players, and you. 
          Get instant feedback on stance, angles, and save selection.
        </p>
        
        <div style={{ display: 'flex', gap: '16px', justifyContent: 'center' }}>
          <Link href="/analyze" className="btn btn-primary" style={{ padding: '16px 32px', fontSize: '16px' }}>
            <Upload size={18} />
            Analyze Your Clip
          </Link>
          <Link href="/dashboard" className="btn btn-outline" style={{ padding: '16px 32px', fontSize: '16px' }}>
            View Demo
          </Link>
        </div>
      </div>
    </section>
  )
}

function Stats() {
  return (
    <section style={{ background: 'var(--slate-800)', padding: '60px 0' }}>
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px', textAlign: 'center' }}>
          <div style={{ padding: '24px' }}>
            <div style={{ fontSize: '48px', fontWeight: '800', color: '#dc2626' }}>10K+</div>
            <div style={{ color: 'var(--slate-400)', fontSize: '14px' }}>Clips Analyzed</div>
          </div>
          <div style={{ padding: '24px' }}>
            <div style={{ fontSize: '48px', fontWeight: '800', color: '#2563eb' }}>95%</div>
            <div style={{ color: 'var(--slate-400)', fontSize: '14px' }}>Accuracy</div>
          </div>
          <div style={{ padding: '24px' }}>
            <div style={{ fontSize: '48px', fontWeight: '800', color: '#dc2626' }}>2min</div>
            <div style={{ color: 'var(--slate-400)', fontSize: '14px' }}>Avg. Analysis Time</div>
          </div>
        </div>
      </div>
    </section>
  )
}

function HowItWorks() {
  const steps = [
    { icon: Upload, title: '1. Upload', desc: 'Drop in any clip up to 60 seconds. MP4, MOV, or WEBM.', color: '#dc2626' },
    { icon: TrendingUp, title: '2. AI Analyzes', desc: 'Our AI tracks puck movement, player positions, and your technique.', color: '#2563eb' },
    { icon: Target, title: '3. Get Results', desc: 'Get instant feedback with scores, drills, and areas to improve.', color: '#dc2626' }
  ]
  
  return (
    <section style={{ padding: '80px 0' }}>
      <div className="container">
        <h2 style={{ fontSize: '36px', fontWeight: '700', textAlign: 'center', marginBottom: '48px' }}>How It Works</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' }}>
          {steps.map((step, i) => (
            <div key={i} className="card" style={{ textAlign: 'center', padding: '32px' }}>
              <div style={{ width: '56px', height: '56px', background: `linear-gradient(135deg, ${step.color}20 0%, ${step.color}10 100%)`, borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
                <step.icon size={28} style={{ color: step.color }} />
              </div>
              <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '8px' }}>{step.title}</h3>
              <p style={{ color: 'var(--slate-400)', fontSize: '14px' }}>{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function SampleAnalysis() {
  return (
    <section style={{ background: 'var(--slate-800)', padding: '80px 0' }}>
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '48px', alignItems: 'center' }}>
          <div>
            <h2 style={{ fontSize: '36px', fontWeight: '700', marginBottom: '16px' }}>Detailed Analysis</h2>
            <p style={{ color: 'var(--slate-400)', fontSize: '16px', marginBottom: '24px' }}>
              Our AI breaks down every aspect of your game:
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {['Puck tracking & trajectory', 'Stance & ready position', 'Square to puck', 'Save quality assessment', 'Coverage & positioning', 'Drill recommendations'].map((item, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <Check size={18} style={{ color: '#22c55e' }} />
                  <span style={{ color: 'var(--slate-300)' }}>{item}</span>
                </div>
              ))}
            </div>
          </div>
          
          <div className="card" style={{ background: 'linear-gradient(135deg, var(--slate-800) 0%, var(--slate-700) 100%)' }}>
            <div style={{ marginBottom: '20px' }}>
              <div style={{ fontSize: '12px', color: 'var(--slate-400)', marginBottom: '4px' }}>Overall Score</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ flex: 1, height: '8px', background: 'var(--slate-700)', borderRadius: '4px', overflow: 'hidden' }}>
                  <div style={{ width: '78%', height: '100%', background: 'linear-gradient(90deg, #22c55e, #4ade80)', borderRadius: '4px' }} />
                </div>
                <span style={{ fontSize: '24px', fontWeight: '700', color: '#22c55e' }}>78%</span>
              </div>
            </div>
            
            <div style={{ marginBottom: '20px' }}>
              <div style={{ fontSize: '12px', color: 'var(--slate-400)', marginBottom: '4px' }}>Square to Puck</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ flex: 1, height: '8px', background: 'var(--slate-700)', borderRadius: '4px', overflow: 'hidden' }}>
                  <div style={{ width: '72%', height: '100%', background: 'linear-gradient(90deg, #22c55e, #4ade80)', borderRadius: '4px' }} />
                </div>
                <span style={{ fontSize: '24px', fontWeight: '700', color: '#22c55e' }}>72%</span>
              </div>
            </div>
            
            <div style={{ marginBottom: '20px' }}>
              <div style={{ fontSize: '12px', color: 'var(--slate-400)', marginBottom: '4px' }}>Ready Position</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ flex: 1, height: '8px', background: 'var(--slate-700)', borderRadius: '4px', overflow: 'hidden' }}>
                  <div style={{ width: '65%', height: '100%', background: 'linear-gradient(90deg, #eab308, #facc15)', borderRadius: '4px' }} />
                </div>
                <span style={{ fontSize: '24px', fontWeight: '700', color: '#eab308' }}>65%</span>
              </div>
            </div>
            
            <div style={{ paddingTop: '16px', borderTop: '1px solid var(--slate-700)' }}>
              <div style={{ fontSize: '14px', color: 'var(--slate-400)', marginBottom: '8px' }}>Key Strengths</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                <span style={{ padding: '4px 12px', background: 'rgba(34, 197, 94, 0.1)', border: '1px solid rgba(34, 197, 94, 0.3)', borderRadius: '100px', fontSize: '12px', color: '#22c55e' }}>Good butterfly technique</span>
                <span style={{ padding: '4px 12px', background: 'rgba(34, 197, 94, 0.1)', border: '1px solid rgba(34, 197, 94, 0.3)', borderRadius: '100px', fontSize: '12px', color: '#22c55e' }}>Tracks puck well</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function CTA() {
  return (
    <section style={{ padding: '80px 0', textAlign: 'center' }}>
      <div className="container">
        <h2 style={{ fontSize: '36px', fontWeight: '700', marginBottom: '16px' }}>Ready to Level Up?</h2>
        <p style={{ color: 'var(--slate-400)', fontSize: '18px', marginBottom: '32px' }}>
          Upload your first clip and get instant feedback on your game.
        </p>
        <Link href="/analyze" className="btn btn-primary" style={{ padding: '16px 40px', fontSize: '16px' }}>
          <Upload size={18} />
          Start Analyzing Free
        </Link>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer style={{ borderTop: '1px solid var(--slate-800)', padding: '40px 0' }}>
      <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{ width: '32px', height: '32px', background: 'linear-gradient(135deg, #dc2626 0%, #b91c1c 100%)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ color: 'white', fontWeight: '800', fontSize: '16px' }}>G</span>
          </div>
          <span style={{ fontSize: '14px', color: 'var(--slate-500)' }}>© 2026 GoalieAI. All rights reserved.</span>
        </div>
        <div style={{ display: 'flex', gap: '24px' }}>
          <span style={{ fontSize: '14px', color: 'var(--slate-500)' }}>Terms</span>
          <span style={{ fontSize: '14px', color: 'var(--slate-500)' }}>Privacy</span>
        </div>
      </div>
    </footer>
  )
}

export default function Home() {
  return (
    <AuthProvider>
      <div style={{ minHeight: '100vh' }}>
        <Header />
        <Hero />
        <Stats />
        <HowItWorks />
        <SampleAnalysis />
        <CTA />
        <Footer />
      </div>
    </AuthProvider>
  )
}
