import { useState } from 'react'
import { motion } from 'framer-motion'
import { useAuthStore } from '../../store/authStore'
import toast from 'react-hot-toast'
import { User, Mail, Lock, Bell, Shield, Camera, Edit3, Save, Globe, GraduationCap, Briefcase, Eye, EyeOff, CheckCircle } from 'lucide-react'
import Modal from '../../components/ui/Modal'
import ExplainBox from '../../components/ui/ExplainBox'

const Toggle = ({ enabled, onChange, label }) => (
  <div
    onClick={onChange}
    role="switch"
    aria-checked={enabled}
    aria-label={label}
    style={{ width: 48, height: 26, background: enabled ? 'var(--primary)' : 'var(--border)', borderRadius: 99, cursor: 'pointer', position: 'relative', transition: 'background 0.2s', flexShrink: 0 }}
  >
    <div style={{ width: 20, height: 20, background: '#fff', borderRadius: '50%', position: 'absolute', top: 3, left: enabled ? 25 : 3, transition: 'left 0.2s', boxShadow: '0 1px 4px rgba(0,0,0,0.3)' }}/>
  </div>
)

export default function ProfilePage() {
  const { user, updateUser, logout } = useAuthStore()
  const [activeTab, setActiveTab] = useState('profile')
  const [editing, setEditing] = useState(false)
  const [showCurrentPass, setShowCurrentPass] = useState(false)
  const [showNewPass, setShowNewPass] = useState(false)
  const [passwordForm, setPasswordForm] = useState({ current: '', newPass: '', confirm: '' })
  const [passwordError, setPasswordError] = useState('')
  const [logoutModal, setLogoutModal] = useState(false)
  const [photoModal, setPhotoModal] = useState(false)

  const [form, setForm] = useState({
    name: user?.name || 'Alex Johnson',
    email: user?.email || 'alex@verveai.com',
    phone: '+91 98765 43210',
    bio: 'Passionate software developer with 2+ years of experience. Looking for challenging backend engineering roles.',
    location: 'Bangalore, India',
    college: 'SRM Institute of Technology',
    degree: 'B.Tech Computer Science',
    targetRole: 'Backend Engineer',
    linkedIn: 'linkedin.com/in/alexjohnson',
    github: 'github.com/alexjohnson',
  })

  const [notifications, setNotifications] = useState({
    dailyReminder: true, interviewReady: true, badges: true,
    weeklyReport: false, newProblems: false, streakReminder: true,
  })

  const [prefs, setPrefs] = useState({
    darkMode: true, aiWidget: true, sounds: false, autoSave: true,
  })

  const [twoFA, setTwoFA] = useState(false)

  const handleSave = () => {
    if (!form.name.trim()) { toast.error('Name cannot be empty'); return }
    if (!form.email.includes('@')) { toast.error('Invalid email address'); return }
    updateUser({ name: form.name, email: form.email })
    setEditing(false)
    toast.success('Profile updated successfully! ✅')
  }

  const handlePasswordChange = () => {
    setPasswordError('')
    if (!passwordForm.current) { setPasswordError('Enter your current password'); return }
    if (passwordForm.newPass.length < 8) { setPasswordError('New password must be at least 8 characters'); return }
    if (passwordForm.newPass !== passwordForm.confirm) { setPasswordError('Passwords do not match'); return }
    toast.success('Password updated successfully! 🔒')
    setPasswordForm({ current: '', newPass: '', confirm: '' })
  }

  const toggleNotif = (key) => {
    setNotifications(prev => ({ ...prev, [key]: !prev[key] }))
    toast.success(`${notifications[key] ? 'Disabled' : 'Enabled'}: ${key.replace(/([A-Z])/g, ' $1')}`)
  }

  const togglePref = (key) => {
    setPrefs(prev => ({ ...prev, [key]: !prev[key] }))
    toast.success(`${prefs[key] ? 'Disabled' : 'Enabled'}: ${key.replace(/([A-Z])/g, ' $1')}`)
  }

  const initials = form.name.split(' ').map(n => n[0]).join('').toUpperCase()

  return (
    <div>
      <div className="page-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 6 }}>
          <div style={{ width: 40, height: 40, background: 'rgba(139,92,246,0.15)', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <User size={20} color="var(--primary-light)"/>
          </div>
          <h1 className="page-title" style={{ margin: 0 }}>Profile Settings</h1>
        </div>
        <p className="page-subtitle">Manage your personal information, preferences, and account security</p>
      </div>

      {/* Profile Header */}
      <motion.div style={{ padding: 28, marginBottom: 24, borderRadius: 20, background: 'linear-gradient(135deg, rgba(139,92,246,0.12), rgba(6,182,212,0.08))', border: '1px solid rgba(139,92,246,0.25)', display: 'flex', alignItems: 'center', gap: 24, flexWrap: 'wrap' }}
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <div style={{ position: 'relative' }}>
          <div style={{ width: 90, height: 90, borderRadius: '50%', background: 'var(--gradient-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 36, fontWeight: 700, color: '#fff', border: '3px solid rgba(139,92,246,0.4)' }}>
            {initials}
          </div>
          <div onClick={() => setPhotoModal(true)}
            style={{ position: 'absolute', bottom: 0, right: 0, width: 30, height: 30, background: 'var(--primary)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', border: '2px solid var(--bg-card)' }}>
            <Camera size={14} color="#fff"/>
          </div>
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ fontFamily: 'Outfit', fontWeight: 800, fontSize: 22, marginBottom: 4 }}>{form.name}</div>
          <div style={{ color: 'var(--text-muted)', fontSize: 14, marginBottom: 8 }}>{form.email} · {form.location}</div>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            <span className="badge badge-primary">Level {user?.level || 12}</span>
            <span className="badge badge-success">🔥 {user?.streak || 7} day streak</span>
            <span className="badge badge-cyan">{user?.role || 'Student'}</span>
            <span className="badge badge-warning">⭐ {user?.xp || 3450} XP</span>
          </div>
        </div>
        <div style={{ display: 'flex', gap: 10 }}>
          <button className="btn btn-primary" onClick={() => setEditing(!editing)}>
            <Edit3 size={16}/> {editing ? 'Cancel Editing' : 'Edit Profile'}
          </button>
          <button className="btn btn-secondary" onClick={() => setLogoutModal(true)} style={{ borderColor: 'rgba(239,68,68,0.4)', color: '#f87171' }}>
            Sign Out
          </button>
        </div>
      </motion.div>

      {/* Tabs */}
      <div className="tabs" style={{ marginBottom: 24 }}>
        {[{ key: 'profile', label: '👤 Profile' }, { key: 'security', label: '🔒 Security' }, { key: 'notifications', label: '🔔 Notifications' }, { key: 'preferences', label: '⚙️ Preferences' }].map(t => (
          <div key={t.key} className={`tab ${activeTab === t.key ? 'active' : ''}`} onClick={() => setActiveTab(t.key)}>{t.label}</div>
        ))}
      </div>

      {/* Profile Tab */}
      {activeTab === 'profile' && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
          {editing && <ExplainBox type="info" title="Editing Mode Active">Make your changes below and click "Save Changes" when done. Fields marked with * are required.</ExplainBox>}
          <div className="grid-2" style={{ gap: 24 }}>
            <div className="card">
              <h4 style={{ marginBottom: 20, display: 'flex', alignItems: 'center', gap: 8 }}><User size={16} color="var(--primary-light)"/> Personal Information</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                {[{ label: 'Full Name *', key: 'name', icon: <User size={14}/>, type: 'text' }, { label: 'Email Address *', key: 'email', icon: <Mail size={14}/>, type: 'email' }, { label: 'Phone Number', key: 'phone', icon: <Globe size={14}/>, type: 'text' }, { label: 'Location', key: 'location', icon: <Globe size={14}/>, type: 'text' }].map((field, i) => (
                  <div key={i} className="input-group">
                    <label className="input-label">{field.label}</label>
                    <div style={{ position: 'relative' }}>
                      <span style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }}>{field.icon}</span>
                      <input id={`profile-${field.key}`} type={field.type} className="input" style={{ paddingLeft: 38 }} value={form[field.key]} onChange={e => setForm({ ...form, [field.key]: e.target.value })} disabled={!editing}/>
                    </div>
                  </div>
                ))}
                <div className="input-group">
                  <label className="input-label">Bio</label>
                  <textarea className="input" rows={3} value={form.bio} onChange={e => setForm({ ...form, bio: e.target.value })} disabled={!editing} style={{ resize: 'vertical' }} placeholder="Tell recruiters about yourself..."/>
                </div>
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
              <div className="card">
                <h4 style={{ marginBottom: 20, display: 'flex', alignItems: 'center', gap: 8 }}><GraduationCap size={16} color="var(--secondary)"/> Academic Details</h4>
                {[{ label: 'College / University', key: 'college' }, { label: 'Degree & Branch', key: 'degree' }].map((f, i) => (
                  <div key={i} className="input-group" style={{ marginBottom: i === 0 ? 16 : 0 }}>
                    <label className="input-label">{f.label}</label>
                    <input className="input" value={form[f.key]} onChange={e => setForm({ ...form, [f.key]: e.target.value })} disabled={!editing}/>
                  </div>
                ))}
              </div>
              <div className="card">
                <h4 style={{ marginBottom: 20, display: 'flex', alignItems: 'center', gap: 8 }}><Briefcase size={16} color="var(--accent)"/> Career & Social</h4>
                {[{ label: 'Target Role', key: 'targetRole' }, { label: 'LinkedIn Profile', key: 'linkedIn' }, { label: 'GitHub Profile', key: 'github' }].map((f, i) => (
                  <div key={i} className="input-group" style={{ marginBottom: i < 2 ? 14 : 0 }}>
                    <label className="input-label">{f.label}</label>
                    <input className="input" value={form[f.key]} onChange={e => setForm({ ...form, [f.key]: e.target.value })} disabled={!editing}/>
                  </div>
                ))}
              </div>
              {editing && (
                <button id="save-profile" className="btn btn-primary" style={{ width: '100%', padding: 14 }} onClick={handleSave}>
                  <Save size={16}/> Save Changes
                </button>
              )}
            </div>
          </div>
        </motion.div>
      )}

      {/* Security Tab */}
      {activeTab === 'security' && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
          <div className="grid-2" style={{ gap: 24 }}>
            <div className="card">
              <h4 style={{ marginBottom: 20, display: 'flex', alignItems: 'center', gap: 8 }}><Shield size={16} color="var(--success)"/> Change Password</h4>
              <ExplainBox type="info">
                Use a strong password with at least 8 characters, including uppercase, numbers, and symbols.
              </ExplainBox>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                {[{ label: 'Current Password', key: 'current', show: showCurrentPass, setShow: setShowCurrentPass }, { label: 'New Password', key: 'newPass', show: showNewPass, setShow: setShowNewPass }, { label: 'Confirm New Password', key: 'confirm', show: showNewPass, setShow: setShowNewPass }].map((field, i) => (
                  <div key={i} className="input-group">
                    <label className="input-label">{field.label}</label>
                    <div style={{ position: 'relative' }}>
                      <Lock size={14} style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }}/>
                      <input type={field.show ? 'text' : 'password'} className="input" style={{ paddingLeft: 38, paddingRight: 40 }} placeholder="••••••••" value={passwordForm[field.key]} onChange={e => setPasswordForm({ ...passwordForm, [field.key]: e.target.value })}/>
                      <button type="button" onClick={() => field.setShow(!field.show)} style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', background: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}>
                        {field.show ? <EyeOff size={14}/> : <Eye size={14}/>}
                      </button>
                    </div>
                  </div>
                ))}
                {passwordError && <div style={{ padding: '10px 14px', background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)', borderRadius: 8, fontSize: 13, color: 'var(--danger)' }}>⚠️ {passwordError}</div>}
                <button className="btn btn-primary" style={{ width: '100%' }} onClick={handlePasswordChange}>
                  Update Password
                </button>
              </div>
            </div>

            <div className="card">
              <h4 style={{ marginBottom: 20 }}>🔐 Account Security</h4>
              {/* 2FA */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 0', borderBottom: '1px solid var(--border)', marginBottom: 16 }}>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 600 }}>Two-Factor Authentication</div>
                  <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 2 }}>Add an extra layer of security to your account</div>
                  {twoFA && <div style={{ fontSize: 12, color: 'var(--success)', marginTop: 4 }}>✅ 2FA is active — your account is more secure</div>}
                </div>
                <Toggle enabled={twoFA} label="Two-Factor Authentication" onChange={() => { setTwoFA(!twoFA); toast.success(twoFA ? '2FA disabled' : '2FA enabled! Your account is now more secure 🔒') }}/>
              </div>
              <ExplainBox type={twoFA ? 'success' : 'warning'} title={twoFA ? '2FA Enabled' : 'Recommendation'}>
                {twoFA ? 'Two-factor authentication is active. Every login will require a code from your authenticator app.' : 'Enable 2FA to protect your account. Even if your password is stolen, attackers cannot access your account without the second factor.'}
              </ExplainBox>
              <div style={{ marginTop: 16 }}>
                <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 10 }}>Recent Login Activity</div>
                {[{ device: 'Chrome on Windows', time: 'Today, 11:04 AM', location: 'Bangalore, India', current: true }, { device: 'Firefox on Android', time: 'Yesterday, 8:30 PM', location: 'Bangalore, India', current: false }].map((session, i) => (
                  <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 12px', background: 'var(--bg-glass)', borderRadius: 8, marginBottom: 8, border: session.current ? '1px solid rgba(16,185,129,0.3)' : '1px solid var(--border)' }}>
                    <div>
                      <div style={{ fontSize: 13, fontWeight: 500 }}>{session.device}</div>
                      <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>{session.location} · {session.time}</div>
                    </div>
                    {session.current ? <span className="badge badge-success">Current</span> : <button className="btn btn-secondary btn-sm" style={{ fontSize: 11, padding: '3px 8px' }} onClick={() => toast.success('Session revoked!')}>Revoke</button>}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Notifications Tab */}
      {activeTab === 'notifications' && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
          <div className="card" style={{ maxWidth: 600 }}>
            <h4 style={{ marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8 }}><Bell size={16} color="var(--primary-light)"/> Notification Preferences</h4>
            <ExplainBox type="info">
              All notifications are delivered via browser push notifications. Enable browser permissions to receive them even when the app is in the background.
            </ExplainBox>
            {[
              { key: 'dailyReminder', label: 'Daily Practice Reminders', desc: 'Get reminded to practice every day at 8:00 PM' },
              { key: 'interviewReady', label: 'Interview Session Ready', desc: 'Notify when your AI interview is prepared and ready' },
              { key: 'badges', label: 'Badge & Achievement Alerts', desc: 'Celebrate when you earn new badges and level up' },
              { key: 'weeklyReport', label: 'Weekly Progress Report', desc: 'Summary of your performance emailed every Monday' },
              { key: 'newProblems', label: 'New Problems Available', desc: 'Alert when new coding problems are added to the lab' },
              { key: 'streakReminder', label: 'Streak Protection Alerts', desc: 'Alert 2 hours before midnight if you haven\'t practiced today' },
            ].map((item, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 0', borderBottom: i < 5 ? '1px solid var(--border)' : 'none' }}>
                <div style={{ flex: 1, paddingRight: 20 }}>
                  <div style={{ fontSize: 14, fontWeight: 500 }}>{item.label}</div>
                  <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 2 }}>{item.desc}</div>
                </div>
                <Toggle enabled={notifications[item.key]} label={item.label} onChange={() => toggleNotif(item.key)}/>
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Preferences Tab */}
      {activeTab === 'preferences' && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
          <div className="card" style={{ maxWidth: 600 }}>
            <h4 style={{ marginBottom: 16 }}>⚙️ App Preferences</h4>
            {[
              { key: 'darkMode', label: 'Dark Mode', desc: 'Use the dark theme across the entire app (recommended)' },
              { key: 'aiWidget', label: 'AI Assistant Widget', desc: 'Show the floating AI assistant bubble on every page' },
              { key: 'sounds', label: 'Sound Effects', desc: 'Play celebration sounds when you earn badges or level up' },
              { key: 'autoSave', label: 'Auto-save Answers', desc: 'Automatically save your interview answers as you type' },
            ].map((item, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 0', borderBottom: i < 3 ? '1px solid var(--border)' : 'none' }}>
                <div style={{ flex: 1, paddingRight: 20 }}>
                  <div style={{ fontSize: 14, fontWeight: 500 }}>{item.label}</div>
                  <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 2 }}>{item.desc}</div>
                </div>
                <Toggle enabled={prefs[item.key]} label={item.label} onChange={() => togglePref(item.key)}/>
              </div>
            ))}
            <div style={{ marginTop: 20, padding: '14px 16px', background: 'rgba(239,68,68,0.06)', border: '1px solid rgba(239,68,68,0.2)', borderRadius: 12 }}>
              <div style={{ fontWeight: 600, fontSize: 14, color: 'var(--danger)', marginBottom: 8 }}>⚠️ Danger Zone</div>
              <div style={{ fontSize: 13, color: 'var(--text-muted)', marginBottom: 12 }}>These actions are permanent and cannot be undone.</div>
              <div style={{ display: 'flex', gap: 10 }}>
                <button className="btn btn-secondary btn-sm" style={{ borderColor: 'rgba(239,68,68,0.4)', color: 'var(--danger)' }} onClick={() => toast.error('Data export will be sent to your email within 24 hours.')}>
                  Export My Data
                </button>
                <button className="btn btn-secondary btn-sm" style={{ borderColor: 'rgba(239,68,68,0.4)', color: 'var(--danger)' }} onClick={() => toast.error('Account deletion requires email confirmation. Check your inbox.')}>
                  Delete Account
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Photo Upload Modal */}
      <Modal open={photoModal} onClose={() => setPhotoModal(false)} title="Update Profile Photo" subtitle="Upload a professional headshot" icon="📷" maxWidth={440}>
        <ExplainBox type="tip" title="Best practices for profile photo">
          Use a clear, professional headshot with good lighting and a neutral background. Recruiters are 14x more likely to respond to profiles with photos.
        </ExplainBox>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {[{ label: 'Upload from Computer', icon: '📁', action: () => { document.getElementById('photo-input')?.click() } }, { label: 'Take a Photo (Camera)', icon: '📸', action: () => toast.success('Camera access requested...') }, { label: 'Use Gravatar', icon: '🌐', action: () => toast.success('Opening Gravatar settings...') }].map((item, i) => (
            <button key={i} onClick={() => { item.action(); setPhotoModal(false) }}
              style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '14px 16px', background: 'var(--bg-glass)', border: '1px solid var(--border)', borderRadius: 12, cursor: 'pointer', color: 'var(--text-primary)', fontSize: 14, fontWeight: 500, transition: 'all 0.2s' }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--primary)'; e.currentTarget.style.background = 'rgba(139,92,246,0.08)' }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.background = 'var(--bg-glass)' }}>
              <span style={{ fontSize: 24 }}>{item.icon}</span>{item.label}
            </button>
          ))}
        </div>
        <input id="photo-input" type="file" accept="image/*" style={{ display: 'none' }} onChange={e => { if (e.target.files[0]) { toast.success(`Photo "${e.target.files[0].name}" uploaded!`); setPhotoModal(false) } }}/>
      </Modal>

      {/* Logout Confirmation Modal */}
      <Modal open={logoutModal} onClose={() => setLogoutModal(false)} title="Sign Out" subtitle="Are you sure you want to sign out?" icon="🚪" maxWidth={400}>
        <ExplainBox type="warning">
          Signing out will end your current session. Your progress and streak are saved — you can sign back in anytime.
        </ExplainBox>
        <div style={{ display: 'flex', gap: 10, marginTop: 16 }}>
          <button className="btn btn-secondary" style={{ flex: 1 }} onClick={() => setLogoutModal(false)}>Cancel</button>
          <button className="btn btn-primary" style={{ flex: 1, background: 'linear-gradient(135deg, #ef4444, #dc2626)', boxShadow: 'none' }} onClick={() => { logout(); setLogoutModal(false); toast.success('Signed out. See you soon! 👋') }}>
            Yes, Sign Out
          </button>
        </div>
      </Modal>
    </div>
  )
}
