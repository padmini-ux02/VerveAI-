import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { useAuthStore } from '../../store/authStore'
import Modal from '../../components/ui/Modal'
import ExplainBox from '../../components/ui/ExplainBox'
import {
  RadarChart, PolarGrid, PolarAngleAxis, Radar,
  ResponsiveContainer, AreaChart, Area, XAxis, YAxis,
  Tooltip, CartesianGrid
} from 'recharts'
import {
  FileText, BrainCircuit, Video, Code2, Flame,
  Trophy, ArrowRight, TrendingUp, Clock, Star,
  Download, Share2, RefreshCw, Info
} from 'lucide-react'

const performanceData = [
  { week: 'Mon', score: 72, interviews: 2 },
  { week: 'Tue', score: 78, interviews: 3 },
  { week: 'Wed', score: 75, interviews: 1 },
  { week: 'Thu', score: 85, interviews: 4 },
  { week: 'Fri', score: 88, interviews: 3 },
  { week: 'Sat', score: 82, interviews: 2 },
  { week: 'Sun', score: 91, interviews: 5 },
]

const radarData = [
  { skill: 'Technical', score: 85 },
  { skill: 'Communication', score: 72 },
  { skill: 'Problem Solving', score: 90 },
  { skill: 'Aptitude', score: 78 },
  { skill: 'Behavioral', score: 82 },
  { skill: 'Coding', score: 88 },
]

const recentActivity = [
  { icon: '🎤', title: 'Mock Interview', subtitle: 'React Developer · Score: 88/100', time: '2h ago', badge: 'Technical', detail: 'You completed a 45-minute mock interview for the React Developer role. Your confidence score was 82%, communication 78%, and technical accuracy 88%. Main improvement area: System design questions.' },
  { icon: '📄', title: 'Resume Updated', subtitle: 'ATS Score improved to 92/100', time: '5h ago', badge: 'Resume', detail: 'Your resume ATS score improved from 85 to 92 after adding Docker and Kubernetes keywords. 3 new skills were detected and added to your profile automatically.' },
  { icon: '💻', title: 'Coding Challenge', subtitle: 'Two Sum · Easy · Solved in 8min', time: '1d ago', badge: 'Coding', detail: 'Solved "Two Sum" using a hash map approach in 8 minutes. Time complexity: O(n), Space complexity: O(n). This is better than 78% of all submissions. +50 XP earned.' },
  { icon: '🏆', title: 'Badge Earned', subtitle: '"Code Warrior" · +50 XP gained', time: '1d ago', badge: 'Achievement', detail: 'You unlocked the "Code Warrior" badge by solving 10 coding challenges. This is an Epic-tier badge worth 100 XP. You are now Level 12 with 3,450 total XP.' },
]

const quickActions = [
  { icon: <BrainCircuit size={20}/>, label: 'Start Interview', path: '/interview', color: '#8b5cf6', desc: 'Generate AI interview questions for your target role' },
  { icon: <Video size={20}/>, label: 'Mock Session', path: '/mock-interview', color: '#06b6d4', desc: 'Start a live camera-enabled mock interview' },
  { icon: <FileText size={20}/>, label: 'Analyze Resume', path: '/resume', color: '#10b981', desc: 'Upload and get AI-powered resume insights' },
  { icon: <Code2 size={20}/>, label: 'Code Challenge', path: '/coding', color: '#f59e0b', desc: 'Solve a coding problem and earn XP' },
]

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i = 0) => ({ opacity: 1, y: 0, transition: { delay: i * 0.08, duration: 0.5 } })
}

export default function Dashboard() {
  const { user } = useAuthStore()
  const navigate = useNavigate()
  const [activityModal, setActivityModal] = useState(null)
  const [badgeModal, setBadgeModal] = useState(null)
  const [reportModal, setReportModal] = useState(false)
  const [shareModal, setShareModal] = useState(false)
  const [explainXP, setExplainXP] = useState(false)

  const hour = new Date().getHours()
  const greeting = hour < 12 ? 'Good morning' : hour < 18 ? 'Good afternoon' : 'Good evening'

  const badges = [
    { icon: '🎯', name: 'First Interview', color: '#8b5cf6', desc: 'Awarded for completing your very first mock interview session. Welcome to VerveAI!', xp: 50, rarity: 'Common', earned: true },
    { icon: '💻', name: 'Code Warrior', color: '#06b6d4', desc: 'Earned by solving 10 coding challenges. Your persistence is paying off!', xp: 100, rarity: 'Rare', earned: true },
    { icon: '📄', name: 'Resume Pro', color: '#10b981', desc: 'Your resume scored 90+ on ATS analysis. Recruiters will notice you!', xp: 75, rarity: 'Rare', earned: true },
    { icon: '🔥', name: '7-Day Streak', color: '#f59e0b', desc: 'Practiced 7 days in a row without missing a single day. Discipline wins!', xp: 150, rarity: 'Epic', earned: true },
    { icon: '⭐', name: 'Top Performer', color: '#ef4444', desc: 'Score 95+ on a mock interview to unlock this badge. Keep pushing!', xp: 200, rarity: 'Epic', earned: false },
    { icon: '🏆', name: 'Interview Ace', color: '#a78bfa', desc: 'Complete 25 mock interviews total. You are on your way!', xp: 300, rarity: 'Legendary', earned: false },
  ]

  return (
    <div>
      {/* Header */}
      <motion.div variants={fadeUp} initial="hidden" animate="visible" style={{ marginBottom: 32 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 16 }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
              <span style={{ fontSize: 28 }}>👋</span>
              <h1 style={{ fontSize: 26 }}>{greeting}, {user?.name?.split(' ')[0]}!</h1>
            </div>
            <p style={{ color: 'var(--text-muted)', fontSize: 14 }}>
              You're on a <strong style={{ color: 'var(--accent)' }}>🔥 {user?.streak || 7}-day streak</strong>! Keep it up to unlock new badges.
            </p>
          </div>

          {/* XP Progress with info button */}
          <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 14, padding: '14px 20px', minWidth: 220 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <Trophy size={16} color="var(--accent)"/>
                <span style={{ fontSize: 13, fontWeight: 600 }}>Level {user?.level || 12}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>{user?.xp || 3450} / {user?.xpNext || 4000} XP</span>
                <button onClick={() => setExplainXP(!explainXP)} style={{ background: 'none', color: 'var(--text-muted)', cursor: 'pointer', padding: 0 }}>
                  <Info size={13}/>
                </button>
              </div>
            </div>
            <div className="progress-bar">
              <div className="progress-fill" style={{ width: `${((user?.xp || 3450) / (user?.xpNext || 4000)) * 100}%` }}/>
            </div>
            {explainXP && (
              <div style={{ marginTop: 10, padding: '8px 10px', background: 'rgba(139,92,246,0.1)', borderRadius: 8, fontSize: 12, color: 'var(--text-muted)', lineHeight: 1.5 }}>
                💡 Earn XP by: completing interviews (+20 XP), solving problems (+10-50 XP), daily login (+5 XP), and earning badges (+50-300 XP). Level up at every 500 XP milestone.
              </div>
            )}
          </div>
        </div>
      </motion.div>

      {/* Stats Cards */}
      <div className="grid-4" style={{ marginBottom: 28 }}>
        {[
          { label: 'Resume Score', value: '87', suffix: '/100', color: 'purple', icon: <FileText size={20}/>, change: '+5', up: true, explain: 'Your resume was analyzed by our AI and scored 87/100. The remaining 13 points can be gained by adding Docker skills, improving your summary, and adding more quantifiable achievements.' },
          { label: 'Interviews Done', value: '23', suffix: '', color: 'cyan', icon: <BrainCircuit size={20}/>, change: '+3 this week', up: true, explain: 'You have completed 23 mock interview sessions total. This week you did 3 sessions — that is above average. Aim for at least 5 sessions per week for best results.' },
          { label: 'Coding Solved', value: '47', suffix: '', color: 'green', icon: <Code2 size={20}/>, change: '+8 this week', up: true, explain: 'You have solved 47 coding problems: 28 Easy, 15 Medium, 4 Hard. This week you solved 8 problems. Focus on more Medium and Hard problems to improve your score.' },
          { label: 'Day Streak', value: user?.streak || '7', suffix: ' 🔥', color: 'amber', icon: <Flame size={20}/>, change: 'Personal best!', up: true, explain: 'You have practiced every day for 7 consecutive days — your personal best! Missing even one day resets the streak. Log in daily to maintain momentum and earn bonus XP.' },
        ].map((stat, i) => (
          <motion.div key={i} className={`stat-card ${stat.color}`} variants={fadeUp} initial="hidden" animate="visible" custom={i}
            style={{ cursor: 'pointer' }} onClick={() => setActivityModal({ title: stat.label, detail: stat.explain, icon: stat.suffix || '' })}>
            <div className="stat-header">
              <div className={`stat-icon ${stat.color}`}>{stat.icon}</div>
              <span className={`stat-change ${stat.up ? 'up' : 'down'}`}>
                <TrendingUp size={12}/> {stat.change}
              </span>
            </div>
            <div>
              <div className="stat-value">{stat.value}<span style={{ fontSize: '1rem', color: 'var(--text-muted)' }}>{stat.suffix}</span></div>
              <div className="stat-label">{stat.label}</div>
            </div>
            <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 4 }}>Click for details →</div>
          </motion.div>
        ))}
      </div>

      {/* Quick Actions */}
      <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={4} style={{ marginBottom: 28 }}>
        <h3 style={{ fontFamily: 'Outfit, sans-serif', fontSize: 18, marginBottom: 16 }}>Quick Start</h3>
        <div className="grid-4">
          {quickActions.map((action, i) => (
            <motion.button key={i} onClick={() => navigate(action.path)}
              style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '16px 18px', background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 14, color: 'var(--text-primary)', cursor: 'pointer', transition: 'all 0.2s', textAlign: 'left', flexDirection: 'column', alignItems: 'flex-start' }}
              whileHover={{ y: -3, borderColor: action.color, boxShadow: `0 8px 24px ${action.color}30` }}
              whileTap={{ scale: 0.97 }}
            >
              <div style={{ width: 42, height: 42, borderRadius: 10, background: `${action.color}18`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: action.color }}>
                {action.icon}
              </div>
              <div>
                <div style={{ fontWeight: 600, fontSize: 14, marginBottom: 3 }}>{action.label}</div>
                <div style={{ fontSize: 11, color: 'var(--text-muted)', lineHeight: 1.4 }}>{action.desc}</div>
              </div>
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* Charts Row */}
      <div className="grid-2" style={{ marginBottom: 28 }}>
        <motion.div className="card" variants={fadeUp} initial="hidden" animate="visible" custom={5}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
            <h4>Weekly Performance</h4>
            <div style={{ display: 'flex', gap: 8 }}>
              <button className="btn btn-secondary btn-sm" onClick={() => setReportModal(true)}>
                <Download size={12}/> Export
              </button>
              <span className="badge badge-primary">This Week</span>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={performanceData}>
              <defs>
                <linearGradient id="scoreGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)"/>
              <XAxis dataKey="week" tick={{ fill: 'var(--text-muted)', fontSize: 12 }} axisLine={false} tickLine={false}/>
              <YAxis domain={[60, 100]} tick={{ fill: 'var(--text-muted)', fontSize: 12 }} axisLine={false} tickLine={false}/>
              <Tooltip contentStyle={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 10, fontSize: 12 }} labelStyle={{ color: 'var(--text-primary)' }}/>
              <Area type="monotone" dataKey="score" stroke="#8b5cf6" strokeWidth={2} fill="url(#scoreGrad)"/>
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>

        <motion.div className="card" variants={fadeUp} initial="hidden" animate="visible" custom={6}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
            <h4>Skill Breakdown</h4>
            <div style={{ display: 'flex', gap: 8 }}>
              <button className="btn btn-secondary btn-sm" onClick={() => navigate('/analytics')}>
                View Full Analytics
              </button>
              <span className="badge badge-cyan">AI Analysis</span>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <RadarChart data={radarData}>
              <PolarGrid stroke="rgba(255,255,255,0.08)"/>
              <PolarAngleAxis dataKey="skill" tick={{ fill: 'var(--text-muted)', fontSize: 11 }}/>
              <Radar name="Score" dataKey="score" stroke="#06b6d4" fill="#06b6d4" fillOpacity={0.2} strokeWidth={2}/>
            </RadarChart>
          </ResponsiveContainer>
        </motion.div>
      </div>

      {/* Badges + Activity */}
      <div className="grid-2">
        <motion.div className="card" variants={fadeUp} initial="hidden" animate="visible" custom={7}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 20 }}>
            <h4>Your Badges</h4>
            <button onClick={() => navigate('/gamification')} style={{ fontSize: 12, color: 'var(--primary-light)', background: 'none', cursor: 'pointer', fontWeight: 500 }}>
              View all <ArrowRight size={12} style={{ display: 'inline' }}/>
            </button>
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
            {badges.map((badge, i) => (
              <div key={i}
                onClick={() => setBadgeModal(badge)}
                style={{
                  display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6,
                  padding: '12px 14px', background: badge.earned ? `${badge.color}10` : 'var(--bg-glass)',
                  border: `1px solid ${badge.earned ? badge.color + '30' : 'var(--border)'}`,
                  borderRadius: 12, cursor: 'pointer', transition: 'all 0.2s', minWidth: 80,
                  opacity: badge.earned ? 1 : 0.5
                }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.opacity = '1' }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.opacity = badge.earned ? '1' : '0.5' }}
              >
                <span style={{ fontSize: 24, filter: badge.earned ? 'none' : 'grayscale(100%)' }}>{badge.icon}</span>
                <span style={{ fontSize: 10, fontWeight: 600, color: badge.earned ? badge.color : 'var(--text-muted)', textAlign: 'center', lineHeight: 1.3 }}>{badge.name}</span>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div className="card" variants={fadeUp} initial="hidden" animate="visible" custom={8}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 20 }}>
            <h4>Recent Activity</h4>
            <div style={{ display: 'flex', gap: 8 }}>
              <button className="btn btn-secondary btn-sm" onClick={() => setShareModal(true)}>
                <Share2 size={12}/> Share
              </button>
              <span className="badge badge-success">Live</span>
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {recentActivity.map((item, i) => (
              <div key={i}
                onClick={() => setActivityModal(item)}
                style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 12px', background: 'var(--bg-glass)', borderRadius: 10, border: '1px solid var(--border)', cursor: 'pointer', transition: 'all 0.2s' }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--border-primary)'; e.currentTarget.style.transform = 'translateX(3px)' }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.transform = 'translateX(0)' }}
              >
                <div style={{ width: 40, height: 40, borderRadius: 10, background: 'var(--bg-card)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, flexShrink: 0 }}>{item.icon}</div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontWeight: 600, fontSize: 13, marginBottom: 2 }}>{item.title}</div>
                  <div style={{ fontSize: 12, color: 'var(--text-muted)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{item.subtitle}</div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 4, flexShrink: 0 }}>
                  <span className="badge badge-primary" style={{ fontSize: 10 }}>{item.badge}</span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 11, color: 'var(--text-muted)' }}>
                    <Clock size={10}/>{item.time}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Activity Detail Modal */}
      <Modal open={!!activityModal} onClose={() => setActivityModal(null)} title={activityModal?.title} subtitle="Detailed breakdown" icon={activityModal?.icon || '📊'}>
        {activityModal && (
          <div>
            <ExplainBox type="info" title="What happened?">
              {activityModal.detail || activityModal.subtitle}
            </ExplainBox>
            <div style={{ display: 'flex', gap: 10, marginTop: 16 }}>
              <button className="btn btn-primary btn-sm" onClick={() => { setActivityModal(null); navigate('/analytics') }}>
                View in Analytics <ArrowRight size={12}/>
              </button>
              <button className="btn btn-secondary btn-sm" onClick={() => setActivityModal(null)}>Close</button>
            </div>
          </div>
        )}
      </Modal>

      {/* Badge Modal */}
      <Modal open={!!badgeModal} onClose={() => setBadgeModal(null)} title={badgeModal?.name} subtitle={`${badgeModal?.rarity} Badge · +${badgeModal?.xp} XP`} icon={badgeModal?.icon}>
        {badgeModal && (
          <div>
            <div style={{ textAlign: 'center', marginBottom: 20 }}>
              <div style={{ fontSize: 64, marginBottom: 12, filter: badgeModal.earned ? 'none' : 'grayscale(100%)' }}>{badgeModal.icon}</div>
              {badgeModal.earned
                ? <span className="badge badge-success" style={{ fontSize: 13 }}>✅ Earned</span>
                : <span className="badge badge-warning" style={{ fontSize: 13 }}>🔒 Not yet earned</span>}
            </div>
            <ExplainBox type={badgeModal.earned ? 'success' : 'tip'} title={badgeModal.earned ? 'You earned this badge!' : 'How to earn this badge'}>
              {badgeModal.desc}
            </ExplainBox>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 14px', background: 'var(--bg-glass)', borderRadius: 10, marginBottom: 16 }}>
              <span style={{ fontSize: 13, color: 'var(--text-muted)' }}>XP Reward</span>
              <span style={{ fontWeight: 700, color: 'var(--primary-light)' }}>+{badgeModal.xp} XP</span>
            </div>
            <button className="btn btn-primary" style={{ width: '100%' }} onClick={() => { setBadgeModal(null); navigate('/gamification') }}>
              View All Badges <Trophy size={14}/>
            </button>
          </div>
        )}
      </Modal>

      {/* Export Report Modal */}
      <Modal open={reportModal} onClose={() => setReportModal(false)} title="Export Performance Report" subtitle="Download your progress summary" icon="📊" maxWidth={480}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <ExplainBox type="info" title="What's included in the report?">
            The exported PDF includes your weekly performance chart, skill breakdown, interview scores, coding progress, badge history, and personalized improvement tips.
          </ExplainBox>
          {['PDF Report (Full Dashboard)', 'CSV Data Export', 'Interview Transcript', 'Coding Submission History'].map((format, i) => (
            <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 16px', background: 'var(--bg-glass)', border: '1px solid var(--border)', borderRadius: 10 }}>
              <span style={{ fontSize: 14 }}>📄 {format}</span>
              <button className="btn btn-primary btn-sm" onClick={() => { setReportModal(false); alert(`Downloading: ${format}... (Feature connects to backend API in production)`) }}>
                <Download size={12}/> Download
              </button>
            </div>
          ))}
        </div>
      </Modal>

      {/* Share Modal */}
      <Modal open={shareModal} onClose={() => setShareModal(false)} title="Share Your Progress" subtitle="Show off your achievements" icon="🎉" maxWidth={420}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <ExplainBox type="tip" title="Share your VerveAI journey!">
            Sharing your progress motivates others and showcases your dedication to growth. Your profile link is shareable with recruiters.
          </ExplainBox>
          {[
            { label: 'Copy Profile Link', icon: '🔗', action: () => { navigator.clipboard.writeText('https://verveai.app/profile/alexjohnson'); alert('Profile link copied!') } },
            { label: 'Share on LinkedIn', icon: '💼', action: () => window.open('https://linkedin.com', '_blank') },
            { label: 'Share on Twitter / X', icon: '🐦', action: () => window.open('https://twitter.com', '_blank') },
            { label: 'Download as Image', icon: '🖼️', action: () => alert('Generating shareable image card...') },
          ].map((item, i) => (
            <button key={i} onClick={() => { item.action(); setShareModal(false) }}
              style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '13px 16px', background: 'var(--bg-glass)', border: '1px solid var(--border)', borderRadius: 10, cursor: 'pointer', color: 'var(--text-primary)', fontSize: 14, fontWeight: 500, transition: 'all 0.2s' }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--primary)'; e.currentTarget.style.background = 'rgba(139,92,246,0.08)' }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.background = 'var(--bg-glass)' }}
            >
              <span style={{ fontSize: 20 }}>{item.icon}</span>{item.label}
            </button>
          ))}
        </div>
      </Modal>
    </div>
  )
}
