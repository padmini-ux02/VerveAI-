import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useAuthStore } from '../../store/authStore'
import toast from 'react-hot-toast'
import { Eye, EyeOff, Mail, Lock, User, ArrowRight, GraduationCap, Briefcase, Shield } from 'lucide-react'

const roles = [
  { id: 'STUDENT', icon: <GraduationCap size={18}/>, label: 'Student', desc: 'Preparing for interviews' },
  { id: 'RECRUITER', icon: <Briefcase size={18}/>, label: 'Recruiter', desc: 'Hiring talent' },
  { id: 'ADMIN', icon: <Shield size={18}/>, label: 'Admin', desc: 'Platform management' },
]

export default function RegisterPage() {
  const [step, setStep] = useState(1)
  const [form, setForm] = useState({ name: '', email: '', password: '', role: 'STUDENT' })
  const [showPass, setShowPass] = useState(false)
  const [loading, setLoading] = useState(false)
  const { login } = useAuthStore()
  const navigate = useNavigate()

  const handleNext = () => {
    if (step === 1 && (!form.name || !form.email)) { toast.error('Please fill all fields'); return }
    setStep(2)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.password) { toast.error('Please set a password'); return }
    setLoading(true)
    await new Promise(r => setTimeout(r, 1400))
    login({ id: '002', name: form.name, email: form.email, role: form.role, level: 1, xp: 0, xpNext: 500, streak: 0, badges: [] }, 'jwt-token-new')
    toast.success('Account created! Welcome to VerveAI 🎉')
    navigate('/dashboard')
    setLoading(false)
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--bg-primary)', padding: 24 }}>
      <div style={{ position: 'absolute', top: '20%', right: '10%', width: 400, height: 400, background: 'var(--primary)', borderRadius: '50%', filter: 'blur(120px)', opacity: 0.08 }}/>
      <div style={{ position: 'absolute', bottom: '10%', left: '5%', width: 300, height: 300, background: 'var(--secondary)', borderRadius: '50%', filter: 'blur(100px)', opacity: 0.08 }}/>

      <motion.div
        style={{ width: '100%', maxWidth: 480, background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 20, padding: 40, position: 'relative' }}
        initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
      >
        {/* Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 32 }}>
          <div style={{ width: 36, height: 36, background: 'var(--gradient-primary)', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18 }}>✦</div>
          <span style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 800, fontSize: 20, background: 'var(--gradient-primary)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>VerveAI</span>
        </div>

        {/* Step Indicator */}
        <div style={{ display: 'flex', gap: 8, marginBottom: 32 }}>
          {[1, 2].map(s => (
            <div key={s} style={{
              flex: 1, height: 4, borderRadius: 99,
              background: s <= step ? 'var(--gradient-primary)' : 'var(--border)',
              transition: 'background 0.3s'
            }}/>
          ))}
        </div>

        <h3 style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 700, fontSize: 24, marginBottom: 6 }}>
          {step === 1 ? 'Create your account' : 'Set up your profile'}
        </h3>
        <p style={{ color: 'var(--text-muted)', fontSize: 14, marginBottom: 28 }}>
          {step === 1 ? 'Start your journey to your dream job' : 'Choose your role and secure your account'}
        </p>

        <form onSubmit={handleSubmit}>
          {step === 1 ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
              <div className="input-group">
                <label className="input-label">Full Name</label>
                <div style={{ position: 'relative' }}>
                  <User size={16} style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }}/>
                  <input id="reg-name" type="text" className="input" style={{ paddingLeft: 42 }} placeholder="Alex Johnson"
                    value={form.name} onChange={e => setForm({ ...form, name: e.target.value })}/>
                </div>
              </div>
              <div className="input-group">
                <label className="input-label">Email Address</label>
                <div style={{ position: 'relative' }}>
                  <Mail size={16} style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }}/>
                  <input id="reg-email" type="email" className="input" style={{ paddingLeft: 42 }} placeholder="you@example.com"
                    value={form.email} onChange={e => setForm({ ...form, email: e.target.value })}/>
                </div>
              </div>
              <button id="reg-next" type="button" className="btn btn-primary" style={{ width: '100%', padding: '13px', marginTop: 8 }} onClick={handleNext}>
                Continue <ArrowRight size={16}/>
              </button>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
              {/* Role Selector */}
              <div>
                <label className="input-label" style={{ marginBottom: 10, display: 'block' }}>Select Your Role</label>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {roles.map(role => (
                    <div key={role.id}
                      onClick={() => setForm({ ...form, role: role.id })}
                      style={{
                        display: 'flex', alignItems: 'center', gap: 14, padding: '12px 16px',
                        border: `1px solid ${form.role === role.id ? 'var(--primary)' : 'var(--border)'}`,
                        borderRadius: 12, cursor: 'pointer',
                        background: form.role === role.id ? 'rgba(139,92,246,0.1)' : 'var(--bg-glass)',
                        transition: 'all 0.2s'
                      }}
                    >
                      <div style={{ color: form.role === role.id ? 'var(--primary-light)' : 'var(--text-muted)' }}>{role.icon}</div>
                      <div>
                        <div style={{ fontWeight: 600, fontSize: 14, color: form.role === role.id ? 'var(--text-primary)' : 'var(--text-secondary)' }}>{role.label}</div>
                        <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>{role.desc}</div>
                      </div>
                      <div style={{ marginLeft: 'auto', width: 18, height: 18, borderRadius: '50%', border: `2px solid ${form.role === role.id ? 'var(--primary)' : 'var(--border)'}`, background: form.role === role.id ? 'var(--primary)' : 'transparent', transition: 'all 0.2s' }}/>
                    </div>
                  ))}
                </div>
              </div>

              <div className="input-group">
                <label className="input-label">Password</label>
                <div style={{ position: 'relative' }}>
                  <Lock size={16} style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }}/>
                  <input id="reg-password" type={showPass ? 'text' : 'password'} className="input" style={{ paddingLeft: 42, paddingRight: 42 }} placeholder="Min 8 characters"
                    value={form.password} onChange={e => setForm({ ...form, password: e.target.value })}/>
                  <button type="button" onClick={() => setShowPass(!showPass)} style={{ position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)', background: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}>
                    {showPass ? <EyeOff size={16}/> : <Eye size={16}/>}
                  </button>
                </div>
              </div>

              <div style={{ display: 'flex', gap: 10, marginTop: 4 }}>
                <button type="button" className="btn btn-secondary" style={{ flex: 1, padding: '13px' }} onClick={() => setStep(1)}>
                  Back
                </button>
                <button id="reg-submit" type="submit" className="btn btn-primary" style={{ flex: 2, padding: '13px' }} disabled={loading}>
                  {loading ? 'Creating account...' : <> Create Account <ArrowRight size={16}/></>}
                </button>
              </div>
            </div>
          )}
        </form>

        <p style={{ textAlign: 'center', fontSize: 13, color: 'var(--text-muted)', marginTop: 24 }}>
          Already have an account?{' '}
          <Link to="/login" style={{ color: 'var(--primary-light)', fontWeight: 600 }}>Sign in</Link>
        </p>
      </motion.div>
    </div>
  )
}
