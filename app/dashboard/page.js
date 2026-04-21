"use client"
import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { Suspense } from 'react'
import { AuthProvider, useAuth } from '../context/AuthContext'
import Header from '../components/Header'
import { 
  Settings, BarChart2, CreditCard, Video, Upload, TrendingUp, Target, 
  Check, AlertTriangle, ChevronRight, Calendar, Award, Zap, Flame,
  GitCompare, FileText, CheckCircle, Circle, Trash2, Plus, Download
} from 'lucide-react'

const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://goalie-ai-backend.onrender.com"

const PLANS = {
  free: { name: 'Free', price: '$0', analyses: '5 total' },
  starter: { name: 'Starter', price: '$9.99/mo', analyses: '10/week' },
  pro: { name: 'Pro', price: '$29.99/mo', analyses: '30/week' },
  elite: { name: 'Elite', price: '$79.99/mo', analyses: 'Unlimited' }
}

function DashboardContent() {
  const { user, loading } = useAuth()
  const searchParams = useSearchParams()
  const initialTab = searchParams.get('tab') || 'overview'
  
  const [activeTab, setActiveTab] = useState(initialTab)
  const [analyses, setAnalyses] = useState([])
  const [monthlyStats, setMonthlyStats] = useState(null)
  const [progressStats, setProgressStats] = useState(null)
  const [selectedAnalysis, setSelectedAnalysis] = useState(null)
  const [billingInfo, setBillingInfo] = useState(null)
  const [profile, setProfile] = useState(null)
  const [streak, setStreak] = useState(null)
  const [goals, setGoals] = useState([])
  const [drills, setDrills] = useState([])
  const [compareMode, setCompareMode] = useState(false)
  const [compareIds, setCompareIds] = useState([])
  const [compareResult, setCompareResult] = useState(null)
  const [noteText, setNoteText] = useState('')

  useEffect(() => {
    if (user) {
      fetchAllData()
    }
  }, [user])

  async function fetchAllData() {
    await Promise.all([
      fetchAnalyses(),
      fetchMonthlyStats(),
      fetchProgressStats(),
      fetchBillingInfo(),
      fetchProfile(),
      fetchStreak(),
      fetchGoals(),
      fetchDrills()
    ])
  }

  async function fetchAnalyses() {
    try {
      const res = await fetch(`${API_URL}/analyses`, { headers: { 'Authorization': `Bearer ${user.token}` } })
      const data = await res.json()
      setAnalyses(data.analyses || [])
    } catch (e) { console.error(e) }
  }

  async function fetchMonthlyStats() {
    try {
      const res = await fetch(`${API_URL}/analyses/stats/monthly`, { headers: { 'Authorization': `Bearer ${user.token}` } })
      const data = await res.json()
      setMonthlyStats(data)
    } catch (e) { console.error(e) }
  }

  async function fetchProgressStats() {
    try {
      const res = await fetch(`${API_URL}/analyses/stats/progress`, { headers: { 'Authorization': `Bearer ${user.token}` } })
      const data = await res.json()
      setProgressStats(data)
    } catch (e) { console.error(e) }
  }

  async function fetchBillingInfo() {
    try {
      const res = await fetch(`${API_URL}/billing/current`, { headers: { 'Authorization': `Bearer ${user.token}` } })
      const data = await res.json()
      setBillingInfo(data)
    } catch (e) { console.error(e) }
  }

  async function fetchProfile() {
    try {
      const res = await fetch(`${API_URL}/profile`, { headers: { 'Authorization': `Bearer ${user.token}` } })
      const data = await res.json()
      setProfile(data.profile)
    } catch (e) { console.error(e) }
  }

  async function fetchStreak() {
    try {
      const res = await fetch(`${API_URL}/streaks`, { headers: { 'Authorization': `Bearer ${user.token}` } })
      const data = await res.json()
      setStreak(data.streak)
    } catch (e) { console.error(e) }
  }

  async function fetchGoals() {
    try {
      const res = await fetch(`${API_URL}/goals`, { headers: { 'Authorization': `Bearer ${user.token}` } })
      const data = await res.json()
      setGoals(data.goals || [])
    } catch (e) { console.error(e) }
  }

  async function fetchDrills() {
    try {
      const res = await fetch(`${API_URL}/drills`, { headers: { 'Authorization': `Bearer ${user.token}` } })
      const data = await res.json()
      setDrills(data.drills || [])
    } catch (e) { console.error(e) }
  }

  async function loadAnalysisDetails(id) {
    try {
      const res = await fetch(`${API_URL}/analyses/${id}`, { headers: { 'Authorization': `Bearer ${user.token}` } })
      const data = await res.json()
      setSelectedAnalysis(data)
      setNoteText(data.notes || '')
    } catch (e) { console.error(e) }
  }

  async function saveNotes() {
    if (!selectedAnalysis) return
    await fetch(`${API_URL}/analyses/${selectedAnalysis.id}/notes`, {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${user.token}`, 'Content-Type': 'application/x-www-form-urlencoded' },
      body: `notes=${encodeURIComponent(noteText)}`
    })
    fetchAnalyses()
  }

  async function handleCompare() {
    if (compareIds.length !== 2) return
    try {
      const res = await fetch(`${API_URL}/analyses/compare?id1=${compareIds[0]}&id2=${compareIds[1]}`, 
        { headers: { 'Authorization': `Bearer ${user.token}` } })
      const data = await res.json()
      setCompareResult(data.analyses)
    } catch (e) { console.error(e) }
  }

  async function exportData() {
    try {
      const res = await fetch(`${API_URL}/export`, { headers: { 'Authorization': `Bearer ${user.token}` } })
      const data = await res.json()
      const blob = new Blob([data.csv], { type: 'text/csv' })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = data.filename
      a.click()
    } catch (e) { console.error(e) }
  }

  async function createGoal(targetScore, criteriaFocus) {
    await fetch(`${API_URL}/goals`, {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${user.token}`, 'Content-Type': 'application/x-www-form-urlencoded' },
      body: `target_score=${targetScore}&criteria_focus=${encodeURIComponent(criteriaFocus)}`
    })
    fetchGoals()
  }

  async function completeGoal(goalId) {
    await fetch(`${API_URL}/goals/${goalId}/complete`, { method: 'POST', headers: { 'Authorization': `Bearer ${user.token}` } })
    fetchGoals()
  }

  async function completeDrill(drillId) {
    await fetch(`${API_URL}/drills/${drillId}/complete`, { method: 'POST', headers: { 'Authorization': `Bearer ${user.token}` } })
    fetchDrills()
  }

  if (loading) return <div style={{ padding: '40px', textAlign: 'center' }}>Loading...</div>
  if (!user) return <div style={{ minHeight: '100vh' }}><Header /><div className="container" style={{ padding: '80px 0', textAlign: 'center' }}><h1>Dashboard</h1><p style={{ color: 'var(--slate-400)' }}>Please log in</p></div></div>

  const menuItems = [
    { id: 'overview', icon: BarChart2, label: 'Overview' },
    { id: 'results', icon: Video, label: 'Results' },
    { id: 'performance', icon: TrendingUp, label: 'Performance' },
    { id: 'drills', icon: Zap, label: 'Drill Library' },
    { id: 'goals', icon: Target, label: 'Goals' },
    { id: 'compare', icon: GitCompare, label: 'Compare' },
    { id: 'billing', icon: CreditCard, label: 'Billing' },
    { id: 'profile', icon: Settings, label: 'Profile' }
  ]

  return (
    <div style={{ minHeight: '100vh', display: 'flex' }}>
      <aside style={{ width: '240px', background: 'var(--slate-800)', borderRight: '1px solid var(--slate-700)', padding: '24px 0', position: 'fixed', height: '100vh', overflowY: 'auto' }}>
        <div style={{ padding: '0 24px', marginBottom: '32px' }}><h2 style={{ fontSize: '18px', fontWeight: '600' }}>Menu</h2></div>
        <nav style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          {menuItems.map(item => (
            <button key={item.id} onClick={() => { setActiveTab(item.id); setCompareMode(false); setCompareResult(null) }} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 24px', background: activeTab === item.id ? 'rgba(37, 99, 235, 0.1)' : 'transparent', border: 'none', borderLeft: activeTab === item.id ? '3px solid #2563eb' : '3px solid transparent', color: activeTab === item.id ? '#2563eb' : 'var(--slate-300)', cursor: 'pointer', width: '100%', textAlign: 'left', fontSize: '14px' }}>
              <item.icon size={18} />{item.label}
            </button>
          ))}
        </nav>
        <div style={{ padding: '24px' }}><a href="/analyze" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }}><Upload size={18} />New Analysis</a></div>
      </aside>

      <main style={{ flex: 1, marginLeft: '240px', padding: '32px' }}>
        <Header showMenu={false} />
        
        {activeTab === 'overview' && (
          <>
            <h1 style={{ fontSize: '32px', fontWeight: '700', marginBottom: '24px' }}>Dashboard Overview</h1>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '32px' }}>
              <div className="card" style={{ padding: '24px' }}><div style={{ fontSize: '14px', color: 'var(--slate-400)', marginBottom: '8px' }}>Total Analyses</div><div style={{ fontSize: '36px', fontWeight: '700', color: '#2563eb' }}>{analyses.length}</div></div>
              <div className="card" style={{ padding: '24px' }}><div style={{ fontSize: '14px', color: 'var(--slate-400)', marginBottom: '8px' }}>This Month</div><div style={{ fontSize: '36px', fontWeight: '700', color: '#22c55e' }}>{monthlyStats?.count || 0}</div></div>
              <div className="card" style={{ padding: '24px' }}><div style={{ fontSize: '14px', color: 'var(--slate-400)', marginBottom: '8px' }}>Avg Score</div><div style={{ fontSize: '36px', fontWeight: '700', color: '#f59e0b' }}>{monthlyStats?.average_score || 0}%</div></div>
              <div className="card" style={{ padding: '24px' }}><div style={{ fontSize: '14px', color: 'var(--slate-400)', marginBottom: '8px' }}>Day Streak 🔥</div><div style={{ fontSize: '36px', fontWeight: '700', color: '#ef4444' }}>{streak?.current_streak || 0}</div></div>
            </div>
            {monthlyStats?.top_priorities?.length > 0 && (
              <div className="card" style={{ padding: '24px', marginBottom: '32px' }}>
                <h2 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}><Target size={20} style={{ color: '#ef4444' }} />Top 5 Priorities</h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {monthlyStats.top_priorities.map((p, i) => (<div key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 16px', background: 'var(--slate-700)', borderRadius: '8px' }}><div style={{ width: '28px', height: '28px', background: '#ef4444', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px', fontWeight: '600' }}>{i + 1}</div><span style={{ fontWeight: '500' }}>{p}</span></div>))}
                </div>
              </div>
            )}
            {monthlyStats?.drills?.length > 0 && (
              <div className="card" style={{ padding: '24px' }}>
                <h2 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}><Zap size={20} style={{ color: '#f59e0b' }} />Recommended Drills</h2>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px' }}>
                  {monthlyStats.drills.map((d, i) => (<div key={i} style={{ padding: '16px', background: 'var(--slate-700)', borderRadius: '8px' }}><div style={{ fontWeight: '600', marginBottom: '8px' }}>{d.name}</div><div style={{ fontSize: '14px', color: 'var(--slate-400)' }}>{d.description}</div></div>))}
                </div>
              </div>
            )}
          </>
        )}

        {activeTab === 'results' && (
          <>
            <h1 style={{ fontSize: '32px', fontWeight: '700', marginBottom: '24px' }}>Past Analyses</h1>
            <div style={{ display: 'flex', gap: '24px' }}>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {analyses.map(a => (<button key={a.id} onClick={() => loadAnalysisDetails(a.id)} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '16px', background: selectedAnalysis?.id === a.id ? 'var(--slate-700)' : 'var(--slate-800)', border: '1px solid var(--slate-700)', borderRadius: '8px', cursor: 'pointer', width: '100%', textAlign: 'left', color: 'white' }}><div style={{ width: '48px', height: '48px', background: '#2563eb', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px', fontWeight: '700' }}>{a.score || 0}</div><div style={{ flex: 1 }}><div style={{ fontWeight: '600' }}>Analysis</div><div style={{ fontSize: '12px', color: 'var(--slate-400)' }}>{a.date}</div></div><ChevronRight size={18} style={{ color: 'var(--slate-400)' }} /></button>))}
                </div>
              </div>
              {selectedAnalysis && (
                <div className="card" style={{ flex: 1, padding: '24px' }}>
                  <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '16px' }}>Analysis from {selectedAnalysis.created_at}</h3>
                  <div style={{ fontSize: '48px', fontWeight: '700', color: '#2563eb', marginBottom: '24px', textAlign: 'center' }}>{selectedAnalysis.overall_score}%</div>
                  <div style={{ marginBottom: '16px' }}>
                    <label style={{ display: 'block', fontSize: '14px', marginBottom: '6px' }}>Notes</label>
                    <textarea value={noteText} onChange={e => setNoteText(e.target.value)} placeholder="Add your notes..." style={{ width: '100%', padding: '12px', background: 'var(--slate-700)', border: '1px solid var(--slate-600)', borderRadius: '8px', color: 'white', minHeight: '100px' }} />
                    <button onClick={saveNotes} className="btn btn-primary" style={{ marginTop: '8px' }}>Save Notes</button>
                  </div>
                </div>
              )}
            </div>
          </>
        )}

        {activeTab === 'performance' && (
          <>
            <h1 style={{ fontSize: '32px', fontWeight: '700', marginBottom: '24px' }}>Performance Tracker</h1>
            <div className="card" style={{ padding: '24px', marginBottom: '24px' }}>
              <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '16px' }}>Score Progress</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', maxHeight: '400px', overflowY: 'auto' }}>
                {progressStats?.progress?.map((p, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '16px', padding: '12px', background: 'var(--slate-700)', borderRadius: '8px' }}>
                    <span style={{ fontSize: '12px', color: 'var(--slate-400)', width: '80px' }}>{p.date}</span>
                    <div style={{ flex: 1, height: '8px', background: 'var(--slate-600)', borderRadius: '4px' }}><div style={{ width: `${p.score}%`, height: '100%', background: '#2563eb', borderRadius: '4px' }} /></div>
                    <span style={{ fontSize: '14px', fontWeight: '600', width: '40px' }}>{p.score}</span>
                    <span style={{ fontSize: '12px', color: '#22c55e', width: '60px' }}>Avg: {p.running_avg}</span>
                  </div>
                ))}
              </div>
            </div>
            <button onClick={exportData} className="btn btn-outline"><Download size={18} />Export CSV</button>
          </>
        )}

        {activeTab === 'drills' && (
          <>
            <h1 style={{ fontSize: '32px', fontWeight: '700', marginBottom: '24px' }}>Drill Library</h1>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px' }}>
              {drills.length === 0 && <div className="card" style={{ padding: '48px', gridColumn: '1/-1', textAlign: 'center' }}><p style={{ color: 'var(--slate-400)' }}>No saved drills yet. Complete an analysis to add recommended drills.</p></div>}
              {drills.map(d => (
                <div key={d.id} className="card" style={{ padding: '20px', display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
                  <button onClick={() => completeDrill(d.id)} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>{d.completed ? <CheckCircle size={24} style={{ color: '#22c55e' }} /> : <Circle size={24} style={{ color: 'var(--slate-500)' }} />}</button>
                  <div style={{ flex: 1 }}><div style={{ fontWeight: '600', marginBottom: '4px', textDecoration: d.completed ? 'line-through' : 'none' }}>{d.drill_name}</div><div style={{ fontSize: '14px', color: 'var(--slate-400)' }}>{d.drill_description}</div>{d.focus_points && <div style={{ fontSize: '12px', color: 'var(--slate-500)', marginTop: '8px' }}>Focus: {d.focus_points}</div>}</div>
                </div>
              ))}
            </div>
          </>
        )}

        {activeTab === 'goals' && (
          <>
            <h1 style={{ fontSize: '32px', fontWeight: '700', marginBottom: '24px' }}>Goals</h1>
            <div className="card" style={{ padding: '24px', marginBottom: '24px' }}>
              <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '16px' }}>Set New Goal</h3>
              <form onSubmit={e => { e.preventDefault(); createGoal(e.target.score.value, e.target.focus.value) }}>
                <div style={{ display: 'flex', gap: '12px' }}><input name="score" type="number" placeholder="Target score %" style={{ width: '150px' }} /><input name="focus" type="text" placeholder="Focus area" style={{ flex: 1 }} /><button type="submit" className="btn btn-primary"><Plus size={18} />Add Goal</button></div>
              </form>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {goals.length === 0 && <div className="card" style={{ padding: '24px', textAlign: 'center' }}><p style={{ color: 'var(--slate-400)' }}>No goals set yet.</p></div>}
              {goals.map(g => (
                <div key={g.id} className="card" style={{ padding: '20px', display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <button onClick={() => completeGoal(g.id)} disabled={g.achieved} className="btn btn-outline" style={{ padding: '8px' }}>{g.achieved ? <CheckCircle size={24} style={{ color: '#22c55e' }} /> : <Circle size={24} />}</button>
                  <div style={{ flex: 1 }}><div style={{ fontWeight: '600' }}>Target: {g.target_score}%</div>{g.criteria_focus && <div style={{ fontSize: '14px', color: 'var(--slate-400)' }}>Focus: {g.criteria_focus}</div>}</div>
                  {g.achieved && <span style={{ color: '#22c55e', fontSize: '14px' }}>Achieved!</span>}
                </div>
              ))}
            </div>
          </>
        )}

        {activeTab === 'compare' && (
          <>
            <h1 style={{ fontSize: '32px', fontWeight: '700', marginBottom: '24px' }}>Compare Analyses</h1>
            <div className="card" style={{ padding: '24px', marginBottom: '24px' }}>
              <p style={{ marginBottom: '16px', color: 'var(--slate-400)' }}>Select two analyses to compare side-by-side</p>
              <div style={{ display: 'flex', gap: '12px', marginBottom: '16px' }}>
                <select onChange={e => setCompareIds([e.target.value, compareIds[1] || ''])} style={{ flex: 1 }}><option value="">Select first analysis</option>{analyses.map(a => <option key={a.id} value={a.id}>{a.date} - Score: {a.score}</option>)}</select>
                <select onChange={e => setCompareIds([compareIds[0] || '', e.target.value])} style={{ flex: 1 }}><option value="">Select second analysis</option>{analyses.map(a => <option key={a.id} value={a.id}>{a.date} - Score: {a.score}</option>)}</select>
                <button onClick={handleCompare} disabled={compareIds.length !== 2} className="btn btn-primary">Compare</button>
              </div>
            </div>
            {compareResult && (
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
                {compareResult.map((a, i) => (
                  <div key={i} className="card" style={{ padding: '24px' }}>
                    <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '16px' }}>{a.created_at}</h3>
                    <div style={{ fontSize: '36px', fontWeight: '700', color: '#2563eb', marginBottom: '16px' }}>{a.overall_score}%</div>
                    <div style={{ fontSize: '14px', color: 'var(--slate-400)' }}>Criteria scores will appear here comparing both analyses.</div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}

        {activeTab === 'billing' && (
          <>
            <h1 style={{ fontSize: '32px', fontWeight: '700', marginBottom: '24px' }}>Billing</h1>
            <div className="card" style={{ padding: '24px', marginBottom: '24px' }}>
              <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '16px' }}>Current Plan</h3>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
                <div><div style={{ fontSize: '24px', fontWeight: '700', textTransform: 'capitalize' }}>{billingInfo?.name || user.plan}</div><div style={{ color: 'var(--slate-400)' }}>{billingInfo?.price || PLANS[user.plan]?.price}</div></div>
                <div style={{ textAlign: 'right' }}><div style={{ fontSize: '14px', color: 'var(--slate-400)' }}>Usage This Week</div><div style={{ fontSize: '24px', fontWeight: '600' }}>{billingInfo?.used_this_week || 0} / {billingInfo?.remaining === 'unlimited' ? '∞' : billingInfo?.remaining || 'N/A'}</div></div>
              </div>
            </div>
            <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '16px' }}>Available Plans</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }}>
              {Object.entries(PLANS).map(([key, plan]) => (<div key={key} className="card" style={{ padding: '24px', border: key === user.plan ? '2px solid #2563eb' : '1px solid var(--slate-700)', textAlign: 'center' }}><div style={{ fontSize: '18px', fontWeight: '700', marginBottom: '8px' }}>{plan.name}</div><div style={{ fontSize: '24px', fontWeight: '700', color: '#2563eb', marginBottom: '4px' }}>{plan.price}</div><div style={{ fontSize: '12px', color: 'var(--slate-400)', marginBottom: '16px' }}>{plan.analyses}</div>{key === user.plan ? <div style={{ padding: '8px', background: '#2563eb', borderRadius: '6px', fontSize: '14px' }}>Current</div> : <button className="btn btn-outline" style={{ width: '100%', fontSize: '14px' }}>{key === 'free' ? 'Downgrade' : 'Upgrade'}</button>}</div>))}
            </div>
          </>
        )}

        {activeTab === 'profile' && (
          <>
            <h1 style={{ fontSize: '32px', fontWeight: '700', marginBottom: '24px' }}>Profile Settings</h1>
            <div className="card" style={{ padding: '24px', maxWidth: '500px' }}>
              <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '16px' }}>Account Info</h3>
              <div style={{ marginBottom: '16px' }}><label style={{ display: 'block', fontSize: '14px', marginBottom: '6px' }}>Email</label><input type="email" value={user.email} disabled style={{ width: '100%', padding: '12px', background: 'var(--slate-700)', border: '1px solid var(--slate-600)', borderRadius: '8px', color: 'var(--slate-400)' }} /></div>
              <div style={{ marginBottom: '16px' }}><label style={{ display: 'block', fontSize: '14px', marginBottom: '6px' }}>Name</label><input type="text" defaultValue={profile?.name} placeholder="Your name" style={{ width: '100%', padding: '12px', background: 'var(--slate-700)', border: '1px solid var(--slate-600)', borderRadius: '8px', color: 'white' }} /></div>
              <div style={{ marginBottom: '16px' }}><label style={{ display: 'block', fontSize: '14px', marginBottom: '6px' }}>Hockey Position</label><select defaultValue={profile?.hockey_position} style={{ width: '100%', padding: '12px', background: 'var(--slate-700)', border: '1px solid var(--slate-600)', borderRadius: '8px', color: 'white' }}><option value="">Select position</option><option value="goalie">Goalie</option><option value="defense">Defense</option><option value="forward">Forward</option></select></div>
              <div style={{ marginBottom: '16px' }}><label style={{ display: 'block', fontSize: '14px', marginBottom: '6px' }}>Team Name</label><input type="text" defaultValue={profile?.team_name} placeholder="Your team" style={{ width: '100%', padding: '12px', background: 'var(--slate-700)', border: '1px solid var(--slate-600)', borderRadius: '8px', color: 'white' }} /></div>
              <div style={{ marginBottom: '16px' }}><label style={{ display: 'block', fontSize: '14px', marginBottom: '6px' }}>Years of Experience</label><input type="number" defaultValue={profile?.years_experience} placeholder="0" style={{ width: '100%', padding: '12px', background: 'var(--slate-700)', border: '1px solid var(--slate-600)', borderRadius: '8px', color: 'white' }} /></div>
              <button className="btn btn-primary">Save Profile</button>
            </div>
          </>
        )}
      </main>
    </div>
  )
}

export default function Dashboard() {
  return (
    <AuthProvider>
      <Suspense fallback={<div style={{ padding: "40px", textAlign: "center" }}>Loading...</div>}>
        <DashboardContent />
      </Suspense>
    </AuthProvider>
  )
}
