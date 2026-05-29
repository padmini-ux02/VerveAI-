import { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { useAuthStore } from '../../store/authStore'
import {
  LayoutDashboard, FileText, BrainCircuit, Video, Code2,
  BarChart3, Compass, Zap, Trophy, User, ChevronLeft,
  ChevronRight, LogOut, Settings, Bell, Sun, Moon, Search, Menu
} from 'lucide-react'
import AIWidget from '../ui/AIWidget'
import NotificationPanel from '../ui/NotificationPanel'

const navItems = [
  { section: 'Main', items: [
    { path: '/dashboard',    icon: <LayoutDashboard size={18}/>, label: 'Dashboard',       badge: null },
    { path: '/analytics',   icon: <BarChart3 size={18}/>,       label: 'Analytics',       badge: null },
  ]},
  { section: 'Preparation', items: [
    { path: '/resume',      icon: <FileText size={18}/>,        label: 'Resume AI',       badge: 'NEW' },
    { path: '/interview',   icon: <BrainCircuit size={18}/>,    label: 'Interview Gen',   badge: null },
    { path: '/mock-interview', icon: <Video size={18}/>,        label: 'Mock Interview',  badge: null },
    { path: '/coding',      icon: <Code2 size={18}/>,           label: 'Coding Lab',      badge: null },
  ]},
  { section: 'Career', items: [
    { path: '/skills',      icon: <Zap size={18}/>,             label: 'Skill Gap',       badge: null },
    { path: '/career',      icon: <Compass size={18}/>,         label: 'Career Path',     badge: null },
  ]},
  { section: 'Engage', items: [
    { path: '/gamification',icon: <Trophy size={18}/>,          label: 'Achievements',    badge: null },
    { path: '/profile',     icon: <User size={18}/>,            label: 'Profile',         badge: null },
  ]},
]

export default function AppLayout({ children }) {
  const [collapsed, setCollapsed] = useState(false)
  const [darkMode, setDarkMode] = useState(true)
  const [showNotif, setShowNotif] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const { user, logout } = useAuthStore()
  const navigate = useNavigate()

  const toggleTheme = () => {
    setDarkMode(!darkMode)
    document.documentElement.setAttribute('data-theme', darkMode ? 'light' : 'dark')
  }

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  const initials = user?.name?.split(' ').map(n => n[0]).join('').toUpperCase() || 'AJ'

  return (
    <div className="app-layout">
      {/* Mobile Overlay */}
      {mobileOpen && (
        <div
          style={{ position:'fixed', inset:0, background:'rgba(0,0,0,0.5)', zIndex:99, backdropFilter:'blur(4px)' }}
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`sidebar ${collapsed ? 'collapsed' : ''} ${mobileOpen ? 'mobile-open' : ''}`}>
        {/* Logo */}
        <div className="sidebar-logo">
          <div className="sidebar-logo-icon">✦</div>
          {!collapsed && <span className="sidebar-logo-text">VerveAI</span>}
        </div>

        {/* Navigation */}
        <nav className="sidebar-nav">
          {navItems.map((section) => (
            <div key={section.section}>
              {!collapsed && (
                <div className="sidebar-section-title">{section.section}</div>
              )}
              {section.items.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) => `sidebar-item ${isActive ? 'active' : ''}`}
                  onClick={() => setMobileOpen(false)}
                  title={collapsed ? item.label : ''}
                >
                  <span className="sidebar-icon">{item.icon}</span>
                  {!collapsed && (
                    <>
                      <span className="sidebar-label">{item.label}</span>
                      {item.badge && (
                        <span className="sidebar-badge">{item.badge}</span>
                      )}
                    </>
                  )}
                </NavLink>
              ))}
            </div>
          ))}
        </nav>

        {/* Sidebar Footer */}
        <div className="sidebar-footer">
          {!collapsed && user && (
            <div style={{ display:'flex', alignItems:'center', gap:10, padding:'12px 8px', borderBottom:'1px solid var(--border)', marginBottom:8 }}>
              <div className="avatar" style={{ width:36, height:36, fontSize:13 }}>{initials}</div>
              <div style={{ overflow:'hidden' }}>
                <div style={{ fontSize:13, fontWeight:600, color:'var(--text-primary)', whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis' }}>{user.name}</div>
                <div style={{ fontSize:11, color:'var(--text-muted)' }}>Level {user.level} · {user.xp} XP</div>
              </div>
            </div>
          )}
          <div
            className="sidebar-item"
            onClick={() => setCollapsed(!collapsed)}
            style={{ justifyContent: collapsed ? 'center' : 'flex-start' }}
          >
            <span className="sidebar-icon">
              {collapsed ? <ChevronRight size={18}/> : <ChevronLeft size={18}/>}
            </span>
            {!collapsed && <span className="sidebar-label">Collapse</span>}
          </div>
          <div className="sidebar-item" onClick={handleLogout} style={{ color:'var(--danger)', justifyContent: collapsed ? 'center' : 'flex-start' }}>
            <span className="sidebar-icon"><LogOut size={18}/></span>
            {!collapsed && <span className="sidebar-label">Logout</span>}
          </div>
        </div>
      </aside>

      {/* Topbar */}
      <header className={`topbar ${collapsed ? 'collapsed' : ''}`}>
        <div className="topbar-left">
          <button
            className="topbar-icon-btn"
            onClick={() => setMobileOpen(!mobileOpen)}
            style={{ display: 'none' }}
            id="mobile-menu-btn"
          >
            <Menu size={18}/>
          </button>
          <div className="topbar-search">
            <Search size={14} className="topbar-search-icon" style={{ position:'absolute', left:12, color:'var(--text-muted)' }}/>
            <input placeholder="Search anything..." />
          </div>
        </div>
        <div className="topbar-right">
          <button className="topbar-icon-btn tooltip" data-tooltip={darkMode ? 'Light Mode' : 'Dark Mode'} onClick={toggleTheme}>
            {darkMode ? <Sun size={16}/> : <Moon size={16}/>}
          </button>
          <div className="dropdown">
            <button className="topbar-icon-btn" onClick={() => setShowNotif(!showNotif)}>
              <Bell size={16}/>
              <span className="notif-dot"/>
            </button>
            {showNotif && <NotificationPanel onClose={() => setShowNotif(false)}/>}
          </div>
          <button className="topbar-icon-btn tooltip" data-tooltip="Settings" onClick={() => navigate('/profile')}>
            <Settings size={16}/>
          </button>
          <div
            className="topbar-avatar tooltip"
            data-tooltip={user?.name || 'Profile'}
            onClick={() => navigate('/profile')}
          >
            {initials}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className={`main-content ${collapsed ? 'collapsed' : ''}`}>
        <div className="page-content">
          {children}
        </div>
      </main>

      {/* AI Widget */}
      <AIWidget />

      {/* Mobile menu button CSS */}
      <style>{`
        @media (max-width: 768px) {
          #mobile-menu-btn { display: flex !important; }
        }
      `}</style>
    </div>
  )
}
