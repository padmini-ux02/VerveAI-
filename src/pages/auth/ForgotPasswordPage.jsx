import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import toast from 'react-hot-toast'
import { Mail, ArrowLeft, KeyRound } from 'lucide-react'

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!email) { toast.error('Please enter your email'); return }
    setLoading(true)
    await new Promise(r => setTimeout(r, 1200))
    setSent(true)
    toast.success('Reset link sent to your email!')
    setLoading(false)
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--bg-primary)', padding: 24 }}>
      <motion.div
        style={{ width: '100%', maxWidth: 420, background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 20, padding: 40 }}
        initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
      >
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{ width: 64, height: 64, background: 'rgba(139,92,246,0.15)', borderRadius: 16, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
            <KeyRound size={28} color="var(--primary-light)"/>
          </div>
          <h3 style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 700, fontSize: 24, marginBottom: 8 }}>
            {sent ? 'Check your email' : 'Forgot password?'}
          </h3>
          <p style={{ color: 'var(--text-muted)', fontSize: 14 }}>
            {sent
              ? `We sent a reset link to ${email}. Check your inbox.`
              : "No worries! Enter your email and we'll send you a reset link."}
          </p>
        </div>

        {!sent ? (
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            <div className="input-group">
              <label className="input-label">Email Address</label>
              <div style={{ position: 'relative' }}>
                <Mail size={16} style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }}/>
                <input id="forgot-email" type="email" className="input" style={{ paddingLeft: 42 }} placeholder="you@example.com"
                  value={email} onChange={e => setEmail(e.target.value)}/>
              </div>
            </div>
            <button id="forgot-submit" type="submit" className="btn btn-primary" style={{ width: '100%', padding: '13px' }} disabled={loading}>
              {loading ? 'Sending...' : 'Send Reset Link'}
            </button>
          </form>
        ) : (
          <button className="btn btn-primary" style={{ width: '100%', padding: '13px' }} onClick={() => { setSent(false); setEmail('') }}>
            Send again
          </button>
        )}

        <p style={{ textAlign: 'center', fontSize: 13, color: 'var(--text-muted)', marginTop: 24 }}>
          <Link to="/login" style={{ color: 'var(--primary-light)', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: 4 }}>
            <ArrowLeft size={14}/> Back to sign in
          </Link>
        </p>
      </motion.div>
    </div>
  )
}
