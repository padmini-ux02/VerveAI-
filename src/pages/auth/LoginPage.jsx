import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useAuthStore } from '../../store/authStore'
import toast from 'react-hot-toast'
import { Eye, EyeOff, Mail, Lock, ArrowRight, Sparkles } from 'lucide-react'

export default function LoginPage() {
  const [form, setForm] = useState({ email: '', password: '' })
  const [showPass, setShowPass] = useState(false)
  const [loading, setLoading] = useState(false)
  const { login, demoLogin } = useAuthStore()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.email || !form.password) { toast.error('Please fill all fields'); return }
    setLoading(true)
    await new Promise(r => setTimeout(r, 1200))
    login({ id: '001', name: 'Alex Johnson', email: form.email, role: 'STUDENT', level: 12, xp: 3450, xpNext: 4000, streak: 7, badges: [] }, 'jwt-token-xxx')
    toast.success('Welcome back! 🎉')
    navigate('/dashboard')
    setLoading(false)
  }

  const handleDemo = () => {
    demoLogin()
    toast.success('Demo mode activated! Explore freely 🚀')
    navigate('/dashboard')
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', background: 'var(--bg-primary)' }}>
      {/* Left Panel */}
      <motion.div
        style={{ flex: 1, background: 'linear-gradient(135deg, #1a0a3e, #0a1628)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 60, position: 'relative', overflow: 'hidden' }}
        initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}
      >
        <div style={{ position: 'absolute', top: -100, right: -100, width: 400, height: 400, background: 'var(--primary)', borderRadius: '50%', filter: 'blur(100px)', opacity: 0.15 }}/>
        <div style={{ position: 'absolute', bottom: -100, left: -100, width: 300, height: 300, background: 'var(--secondary)', borderRadius: '50%', filter: 'blur(80px)', opacity: 0.15 }}/>

        <div style={{ position: 'relative', textAlign: 'center', maxWidth: 400 }}>
          <div style={{ fontSize: 64, marginBottom: 24 }} className="animate-float">🎯</div>
          <h2 style={{ fontFamily: 'Outfit, sans-serif', marginBottom: 16 }}>Your Career Journey Starts Here</h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: 15, lineHeight: 1.7 }}>
            Join 50,000+ professionals who use VerveAI to prepare smarter, practice better, and land their dream jobs.
          </p>

          <div style={{ marginTop: 40, display: 'flex', flexDirection: 'column', gap: 16 }}>
            {['AI-powered interview preparation', 'Real-time performance analytics', 'Personalized career roadmaps'].map((item, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, background: 'rgba(255,255,255,0.05)', padding: '12px 16px', borderRadius: 10, border: '1px solid rgba(255,255,255,0.08)' }}>
                <div style={{ width: 24, height: 24, borderRadius: '50%', background: 'var(--gradient-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, flexShrink: 0 }}>✓</div>
                <span style={{ fontSize: 14, color: 'var(--text-secondary)' }}>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Right Panel - Form */}
      <motion.div
        style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 48 }}
        initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.1 }}
      >
        <div style={{ width: '100%', maxWidth: 420 }}>
          {/* Logo */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 40 }}>
            <div style={{ width: 40, height: 40, background: 'var(--gradient-primary)', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20 }}>✦</div>
            <span style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 800, fontSize: 22, background: 'var(--gradient-primary)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>VerveAI</span>
          </div>

          <h3 style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 700, fontSize: 26, marginBottom: 8 }}>Welcome back</h3>
          <p style={{ color: 'var(--text-muted)', fontSize: 14, marginBottom: 32 }}>Sign in to continue your preparation journey</p>

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            <div className="input-group">
              <label className="input-label">Email Address</label>
              <div style={{ position: 'relative' }}>
                <Mail size={16} style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }}/>
                <input
                  id="login-email"
                  type="email"
                  className="input"
                  style={{ paddingLeft: 42 }}
                  placeholder="you@example.com"
                  value={form.email}
                  onChange={e => setForm({ ...form, email: e.target.value })}
                />
              </div>
            </div>

            <div className="input-group">
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <label className="input-label">Password</label>
                <Link to="/forgot-password" style={{ fontSize: 12, color: 'var(--primary-light)', fontWeight: 500 }}>Forgot password?</Link>
              </div>
              <div style={{ position: 'relative' }}>
                <Lock size={16} style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }}/>
                <input
                  id="login-password"
                  type={showPass ? 'text' : 'password'}
                  className="input"
                  style={{ paddingLeft: 42, paddingRight: 42 }}
                  placeholder="Enter password"
                  value={form.password}
                  onChange={e => setForm({ ...form, password: e.target.value })}
                />
                <button type="button" onClick={() => setShowPass(!showPass)} style={{ position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)', background: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}>
                  {showPass ? <EyeOff size={16}/> : <Eye size={16}/>}
                </button>
              </div>
            </div>

            <button
              id="login-submit"
              type="submit"
              className="btn btn-primary"
              style={{ width: '100%', padding: '13px', fontSize: 15, marginTop: 8 }}
              disabled={loading}
            >
              {loading ? (
                <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <div style={{ width: 16, height: 16, border: '2px solid rgba(255,255,255,0.3)', borderTopColor: '#fff', borderRadius: '50%', animation: 'spin-slow 0.8s linear infinite' }}/>
                  Signing in...
                </span>
              ) : (
                <>Sign In <ArrowRight size={16}/></>
              )}
            </button>
          </form>

          <div style={{ display: 'flex', alignItems: 'center', gap: 12, margin: '24px 0' }}>
            <div style={{ flex: 1, height: 1, background: 'var(--border)' }}/>
            <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>or</span>
            <div style={{ flex: 1, height: 1, background: 'var(--border)' }}/>
          </div>

          {/* Google Login */}
          <button
            id="google-login"
            type="button"
            className="btn btn-secondary"
            style={{ width: '100%', padding: '13px', fontSize: 14, marginBottom: 12 }}
            onClick={() => toast.success('Google login coming soon!')}
          >
            <svg width="18" height="18" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            Continue with Google
          </button>

          {/* Demo Button */}
          <button
            id="demo-login"
            type="button"
            className="btn btn-secondary"
            style={{ width: '100%', padding: '13px', fontSize: 14, borderColor: 'rgba(139,92,246,0.4)', color: 'var(--primary-light)' }}
            onClick={handleDemo}
          >
            <Sparkles size={16}/> Try Demo — No Sign Up Required
          </button>

          <p style={{ textAlign: 'center', fontSize: 13, color: 'var(--text-muted)', marginTop: 24 }}>
            Don't have an account?{' '}
            <Link to="/register" style={{ color: 'var(--primary-light)', fontWeight: 600 }}>Create one free</Link>
          </p>
        </div>
      </motion.div>
    </div>
  )
}
