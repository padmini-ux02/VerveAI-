import { motion } from 'framer-motion'
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, RadarChart, PolarGrid, PolarAngleAxis, Radar, PieChart, Pie, Cell
} from 'recharts'
import { BarChart3, TrendingUp, Award, Target } from 'lucide-react'
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css'

const weeklyData = [
  { week: 'W1', interview: 65, coding: 70, resume: 80 },
  { week: 'W2', interview: 72, coding: 75, resume: 83 },
  { week: 'W3', interview: 78, coding: 68, resume: 85 },
  { week: 'W4', interview: 85, coding: 82, resume: 87 },
  { week: 'W5', interview: 82, coding: 88, resume: 90 },
  { week: 'W6', interview: 90, coding: 92, resume: 92 },
]

const skillData = [
  { skill: 'Java', level: 88 }, { skill: 'React', level: 75 },
  { skill: 'SQL', level: 82 }, { skill: 'System Design', level: 60 },
  { skill: 'DSA', level: 72 }, { skill: 'Spring Boot', level: 85 },
]

const radarData = [
  { skill: 'Technical', score: 85 }, { skill: 'Communication', score: 72 },
  { skill: 'Problem Solving', score: 90 }, { skill: 'Aptitude', score: 78 },
  { skill: 'Behavioral', score: 82 }, { skill: 'Coding', score: 88 },
]

const pieData = [
  { name: 'Technical', value: 35, color: '#8b5cf6' },
  { name: 'HR', value: 20, color: '#06b6d4' },
  { name: 'Coding', value: 30, color: '#10b981' },
  { name: 'Aptitude', value: 15, color: '#f59e0b' },
]

const heatmapData = Array.from({ length: 52 * 7 }, (_, i) => ({
  level: Math.random() > 0.6 ? Math.floor(Math.random() * 4) + 1 : 0
}))

export default function AnalyticsPage() {
  return (
    <div>
      <div className="page-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 6 }}>
          <div style={{ width: 40, height: 40, background: 'rgba(239,68,68,0.15)', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <BarChart3 size={20} color="#f87171"/>
          </div>
          <h1 className="page-title" style={{ margin: 0 }}>Analytics Dashboard</h1>
        </div>
        <p className="page-subtitle">Track your interview performance, skill progress, and learning trends over time</p>
      </div>

      {/* Score Summary */}
      <div className="grid-4" style={{ marginBottom: 28 }}>
        {[
          { label: 'Overall Score', value: 85, color: '#8b5cf6', trail: '#2a1a4e' },
          { label: 'Communication', value: 72, color: '#06b6d4', trail: '#0a2a35' },
          { label: 'Confidence', value: 78, color: '#10b981', trail: '#0a2a1a' },
          { label: 'Coding Score', value: 88, color: '#f59e0b', trail: '#2a1a00' },
        ].map((item, i) => (
          <motion.div key={i} className="card" style={{ textAlign: 'center' }}
            initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.1 }}>
            <div style={{ width: 90, height: 90, margin: '0 auto 14px' }}>
              <CircularProgressbar value={item.value} text={`${item.value}`}
                styles={buildStyles({ pathColor: item.color, textColor: 'var(--text-primary)', trailColor: item.trail, textSize: '22px' })}/>
            </div>
            <div style={{ fontWeight: 600, fontSize: 13 }}>{item.label}</div>
          </motion.div>
        ))}
      </div>

      {/* Weekly Trend */}
      <motion.div className="card" style={{ marginBottom: 24 }} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 20 }}>
          <h4>Performance Trends (6 Weeks)</h4>
          <div style={{ display: 'flex', gap: 16, fontSize: 12 }}>
            {[{ color: '#8b5cf6', label: 'Interview' }, { color: '#06b6d4', label: 'Coding' }, { color: '#10b981', label: 'Resume' }].map((l, i) => (
              <span key={i} style={{ display: 'flex', alignItems: 'center', gap: 6, color: 'var(--text-muted)' }}>
                <div style={{ width: 10, height: 3, background: l.color, borderRadius: 99 }}/>
                {l.label}
              </span>
            ))}
          </div>
        </div>
        <ResponsiveContainer width="100%" height={240}>
          <AreaChart data={weeklyData}>
            <defs>
              {[['interviewGrad','#8b5cf6'], ['codingGrad','#06b6d4'], ['resumeGrad','#10b981']].map(([id, color]) => (
                <linearGradient key={id} id={id} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={color} stopOpacity={0.3}/>
                  <stop offset="95%" stopColor={color} stopOpacity={0}/>
                </linearGradient>
              ))}
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)"/>
            <XAxis dataKey="week" tick={{ fill: 'var(--text-muted)', fontSize: 12 }} axisLine={false} tickLine={false}/>
            <YAxis domain={[50, 100]} tick={{ fill: 'var(--text-muted)', fontSize: 12 }} axisLine={false} tickLine={false}/>
            <Tooltip contentStyle={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 10, fontSize: 12 }}/>
            <Area type="monotone" dataKey="interview" stroke="#8b5cf6" strokeWidth={2} fill="url(#interviewGrad)"/>
            <Area type="monotone" dataKey="coding" stroke="#06b6d4" strokeWidth={2} fill="url(#codingGrad)"/>
            <Area type="monotone" dataKey="resume" stroke="#10b981" strokeWidth={2} fill="url(#resumeGrad)"/>
          </AreaChart>
        </ResponsiveContainer>
      </motion.div>

      {/* 3-column charts */}
      <div className="grid-3" style={{ marginBottom: 24 }}>
        {/* Skill Bars */}
        <motion.div className="card" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <h4 style={{ marginBottom: 20 }}>Skill Proficiency</h4>
          {skillData.map((s, i) => (
            <div key={i} style={{ marginBottom: 14 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6, fontSize: 13 }}>
                <span style={{ fontWeight: 500 }}>{s.skill}</span>
                <span style={{ color: s.level >= 80 ? 'var(--success)' : s.level >= 60 ? 'var(--warning)' : 'var(--danger)', fontWeight: 700 }}>{s.level}%</span>
              </div>
              <div className="progress-bar">
                <motion.div className="progress-fill" animate={{ width: `${s.level}%` }} transition={{ duration: 0.8, delay: i * 0.1 }}/>
              </div>
            </div>
          ))}
        </motion.div>

        {/* Radar */}
        <motion.div className="card" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <h4 style={{ marginBottom: 20 }}>Interview Balance</h4>
          <ResponsiveContainer width="100%" height={220}>
            <RadarChart data={radarData}>
              <PolarGrid stroke="rgba(255,255,255,0.08)"/>
              <PolarAngleAxis dataKey="skill" tick={{ fill: 'var(--text-muted)', fontSize: 10 }}/>
              <Radar name="Score" dataKey="score" stroke="#8b5cf6" fill="#8b5cf6" fillOpacity={0.2} strokeWidth={2}/>
            </RadarChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Pie */}
        <motion.div className="card" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
          <h4 style={{ marginBottom: 20 }}>Practice Distribution</h4>
          <ResponsiveContainer width="100%" height={160}>
            <PieChart>
              <Pie data={pieData} cx="50%" cy="50%" outerRadius={65} dataKey="value" paddingAngle={3}>
                {pieData.map((entry, i) => <Cell key={i} fill={entry.color}/>)}
              </Pie>
              <Tooltip contentStyle={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 10, fontSize: 12 }}/>
            </PieChart>
          </ResponsiveContainer>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginTop: 12 }}>
            {pieData.map((item, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12 }}>
                <div style={{ width: 10, height: 10, borderRadius: 3, background: item.color, flexShrink: 0 }}/>
                <span style={{ color: 'var(--text-muted)' }}>{item.name} {item.value}%</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Activity Heatmap */}
      <motion.div className="card" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 20 }}>
          <h4 style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <TrendingUp size={18} color="var(--primary-light)"/> Activity Heatmap
          </h4>
          <span className="badge badge-success">247 sessions this year</span>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(52, 1fr)', gap: 3, overflowX: 'auto' }}>
          {heatmapData.map((cell, i) => (
            <div key={i} style={{
              aspectRatio: '1', borderRadius: 2,
              background: cell.level === 0 ? 'var(--border)' :
                cell.level === 1 ? 'rgba(139,92,246,0.25)' :
                cell.level === 2 ? 'rgba(139,92,246,0.5)' :
                cell.level === 3 ? 'rgba(139,92,246,0.75)' : 'var(--primary)',
              minWidth: 10,
            }}/>
          ))}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 12, fontSize: 11, color: 'var(--text-muted)' }}>
          <span>Less</span>
          {[0,1,2,3,4].map(l => (
            <div key={l} style={{ width: 12, height: 12, borderRadius: 2, background: l === 0 ? 'var(--border)' : `rgba(139,92,246,${l * 0.25})` }}/>
          ))}
          <span>More</span>
        </div>
      </motion.div>
    </div>
  )
}
