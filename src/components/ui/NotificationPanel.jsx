import { useEffect, useRef } from 'react'
import { Bell, CheckCheck, Info, Zap, Trophy, BrainCircuit } from 'lucide-react'

const notifications = [
  { id:1, icon:<Zap size={16} color="#fbbf24"/>, title:'New Interview Ready', text:'Your React Developer interview has been generated.', time:'2 min ago', unread:true },
  { id:2, icon:<Trophy size={16} color="#8b5cf6"/>, title:'Badge Earned!', text:'You earned the "Code Warrior" badge. +50 XP!', time:'1 hr ago', unread:true },
  { id:3, icon:<BrainCircuit size={16} color="#22d3ee"/>, title:'Resume Analyzed', text:'Your resume scored 87/100. View suggestions.', time:'3 hr ago', unread:false },
  { id:4, icon:<Info size={16} color="#60a5fa"/>, title:'Weekly Report', text:'You practiced 5 days this week. Keep it up!', time:'1 day ago', unread:false },
]

export default function NotificationPanel({ onClose }) {
  const ref = useRef(null)

  useEffect(() => {
    const handleClick = (e) => {
      if (ref.current && !ref.current.contains(e.target)) onClose()
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [onClose])

  return (
    <div className="notif-panel" ref={ref}>
      <div className="notif-header">
        <div style={{ display:'flex', alignItems:'center', gap:8 }}>
          <Bell size={16} color="var(--primary-light)"/>
          <span style={{ fontWeight:600, fontSize:14 }}>Notifications</span>
          <span className="badge badge-primary">2</span>
        </div>
        <button
          style={{ fontSize:12, color:'var(--primary-light)', background:'none', cursor:'pointer', fontWeight:500 }}
        >
          <CheckCheck size={14} style={{ display:'inline', marginRight:4 }}/>
          Mark all read
        </button>
      </div>

      {notifications.map(n => (
        <div key={n.id} className={`notif-item ${n.unread ? 'unread' : ''}`}>
          <div style={{ width:32, height:32, borderRadius:'50%', background:'var(--bg-glass)', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
            {n.icon}
          </div>
          <div style={{ flex:1, minWidth:0 }}>
            <div style={{ fontSize:13, fontWeight:600, color:'var(--text-primary)', display:'flex', justifyContent:'space-between' }}>
              {n.title}
              {n.unread && <div className="notif-dot-indicator"/>}
            </div>
            <div style={{ fontSize:12, color:'var(--text-muted)', marginTop:2 }}>{n.text}</div>
            <div style={{ fontSize:11, color:'var(--text-muted)', marginTop:4 }}>{n.time}</div>
          </div>
        </div>
      ))}

      <div style={{ padding:'12px 16px', textAlign:'center' }}>
        <button style={{ fontSize:13, color:'var(--primary-light)', background:'none', cursor:'pointer', fontWeight:500 }}>
          View all notifications
        </button>
      </div>
    </div>
  )
}
