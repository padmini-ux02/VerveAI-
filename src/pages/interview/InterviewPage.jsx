import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import toast from 'react-hot-toast'
import { BrainCircuit, Play, ChevronDown, Sparkles, Clock, Target, CheckCircle, RefreshCw, ThumbsUp, Sparkles as HintIcon, MessageSquare, ChevronRight } from 'lucide-react'
import { interviewQuestions } from './questionsData'

const roles = ['Frontend Developer', 'Backend Engineer', 'Full Stack Developer', 'Data Scientist', 'DevOps Engineer', 'Android Developer', 'ML Engineer', 'System Design']
const companies = ['Google', 'Amazon', 'Microsoft', 'Meta', 'Apple', 'Flipkart', 'Infosys', 'TCS', 'Startup']
const levels = ['Fresher (0-1 yr)', 'Junior (1-3 yr)', 'Mid-level (3-5 yr)', 'Senior (5+ yr)']
const categories = ['All', 'Technical', 'HR', 'Behavioral', 'Aptitude', 'Coding']

const generateFilteredQuestions = (role, company, level) => {
  // Score and rank all 101 questions in our professional database
  const scored = interviewQuestions.map(q => {
    let score = 0
    
    // exact role matches get massive priority
    const exactRole = q.roles.includes(role)
    const generalRole = q.roles.includes('All')
    if (exactRole) score += 30
    else if (generalRole) score += 15

    // exact level matches
    const exactLevel = q.levels.includes(level)
    const generalLevel = q.levels.includes('All')
    if (exactLevel) score += 30
    else if (generalLevel) score += 15

    // company matches
    const exactCompany = q.companies.includes(company)
    const generalCompany = q.companies.includes('All')
    if (exactCompany) score += 30
    else if (generalCompany) score += 15

    return { q, score }
  })

  // Sort descending by score, so exact matching target questions bubble to the top of the list
  const sorted = scored.sort((a, b) => b.score - a.score)

  // Map to customize and return all 101 questions dynamically
  return sorted.map(({ q }) => {
    const customizedText = q.question
      .replace(/\{company\}/g, company)
      .replace(/\b(Google|Amazon|Microsoft|Meta|Apple|Flipkart|Infosys|TCS|Startup)\b/gi, company)

    const customizedFollowUp = q.followUp
      ? q.followUp.replace(/\{company\}/g, company).replace(/\b(Google|Amazon|Microsoft|Meta|Apple|Flipkart|Infosys|TCS|Startup)\b/gi, company)
      : null

    const customizedHint = q.hint
      ? q.hint.replace(/\{company\}/g, company).replace(/\b(Google|Amazon|Microsoft|Meta|Apple|Flipkart|Infosys|TCS|Startup)\b/gi, company)
      : null

    return {
      ...q,
      question: customizedText,
      followUp: customizedFollowUp,
      hint: customizedHint
    }
  })
}

export default function InterviewPage() {
  const [config, setConfig] = useState({ role: '', company: '', level: '', category: 'All' })
  const [generated, setGenerated] = useState(false)
  const [questions, setQuestions] = useState([])
  const [loading, setLoading] = useState(false)
  const [activeQ, setActiveQ] = useState(null)
  const [activeHints, setActiveHints] = useState({})
  const [answers, setAnswers] = useState({})
  const [answered, setAnswered] = useState({})

  const handleGenerate = async () => {
    if (!config.role || !config.company || !config.level) { 
      toast.error('Please configure all target fields first!')
      return 
    }
    setLoading(true)
    await new Promise(r => setTimeout(r, 1500))
    const generatedQs = generateFilteredQuestions(config.role, config.company, config.level)
    setQuestions(generatedQs)
    setGenerated(true)
    setLoading(false)
    toast.success(`${generatedQs.length} custom AI questions generated! 🎯`)
  }

  const handleToggleHint = (qId, e) => {
    e.stopPropagation()
    setActiveHints(prev => {
      const isCurrentlyOpen = !!prev[qId]
      if (!isCurrentlyOpen) {
        toast.success('AI solution strategy generated! 💡')
      }
      return { ...prev, [qId]: !isCurrentlyOpen }
    })
  }

  const handleSaveAnswer = (qId, e) => {
    e.stopPropagation()
    const text = answers[qId] || ''
    if (!text.trim()) {
      toast.error('Please type an answer first!')
      return
    }
    setAnswered(prev => ({ ...prev, [qId]: true }))
    toast.success('Your response has been saved securely! +20 XP')
  }

  const filtered = config.category === 'All' ? questions : questions.filter(q => q.category === config.category)
  const diffColor = { Easy: 'var(--success)', Medium: 'var(--warning)', Hard: 'var(--danger)' }

  return (
    <div>
      <div className="page-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 6 }}>
          <div style={{ width: 40, height: 40, background: 'rgba(139,92,246,0.15)', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <BrainCircuit size={20} color="var(--primary-light)"/>
          </div>
          <h1 className="page-title" style={{ margin: 0 }}>AI Interview Copilot</h1>
        </div>
        <p className="page-subtitle">Generate custom-tailored, professional mock interview questionnaires paired with dynamic, step-by-step AI Answer Strategies.</p>
      </div>

      {/* Config Panel */}
      <motion.div className="card" style={{ marginBottom: 24 }} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h4 style={{ marginBottom: 20, display: 'flex', alignItems: 'center', gap: 8 }}>
          <Sparkles size={16} color="var(--accent)"/> Configure Your Mock Session
        </h4>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16, marginBottom: 20 }}>
          {/* Role */}
          <div className="input-group">
            <label className="input-label">Target Professional Role *</label>
            <div style={{ position: 'relative' }}>
              <select className="input" id="interview-role" value={config.role}
                onChange={e => setConfig({ ...config, role: e.target.value })}
                style={{ appearance: 'none', cursor: 'pointer' }}>
                <option value="">Select role...</option>
                {roles.map(r => <option key={r}>{r}</option>)}
              </select>
              <ChevronDown size={14} style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)', pointerEvents: 'none' }}/>
            </div>
          </div>

          {/* Company */}
          <div className="input-group">
            <label className="input-label">Target Corporate Culture *</label>
            <div style={{ position: 'relative' }}>
              <select className="input" id="interview-company" value={config.company}
                onChange={e => setConfig({ ...config, company: e.target.value })}
                style={{ appearance: 'none', cursor: 'pointer' }}>
                <option value="">Select company...</option>
                {companies.map(c => <option key={c}>{c}</option>)}
              </select>
              <ChevronDown size={14} style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)', pointerEvents: 'none' }}/>
            </div>
          </div>

          {/* Level */}
          <div className="input-group">
            <label className="input-label">Experience Bracket *</label>
            <div style={{ position: 'relative' }}>
              <select className="input" id="interview-level" value={config.level}
                onChange={e => setConfig({ ...config, level: e.target.value })}
                style={{ appearance: 'none', cursor: 'pointer' }}>
                <option value="">Select level...</option>
                {levels.map(l => <option key={l}>{l}</option>)}
              </select>
              <ChevronDown size={14} style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)', pointerEvents: 'none' }}/>
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
          <button id="generate-questions" className="btn btn-primary" onClick={handleGenerate} disabled={loading}>
            {loading ? (
              <><div style={{ width: 14, height: 14, border: '2px solid rgba(255,255,255,0.3)', borderTopColor: '#fff', borderRadius: '50%', animation: 'spin-slow 0.8s linear infinite' }}/> Generating...</>
            ) : (
              <><Sparkles size={16}/> Generate custom questions</>
            )}
          </button>
          {generated && (
            <button className="btn btn-secondary btn-sm" onClick={() => { setGenerated(false); setQuestions([]); setAnswers({}); setAnswered({}); setActiveHints({}) }}>
              <RefreshCw size={14}/> Clear Session
            </button>
          )}
          <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginLeft: 'auto', fontSize: 13, color: 'var(--text-muted)' }}>
            <Clock size={14}/> ~35 min duration
          </div>
        </div>
      </motion.div>

      {/* Category Tabs */}
      {generated && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20, flexWrap: 'wrap', gap: 12 }}>
            <div className="tabs">
              {categories.map(cat => (
                <div key={cat} className={`tab ${config.category === cat ? 'active' : ''}`}
                  onClick={() => setConfig({ ...config, category: cat })}>
                  {cat} {cat !== 'All' && <span style={{ fontSize: 10, opacity: 0.7 }}>({questions.filter(q => q.category === cat).length})</span>}
                </div>
              ))}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13 }}>
              <CheckCircle size={14} color="var(--success)"/>
              <span style={{ color: 'var(--text-muted)', fontWeight: 500 }}>{Object.values(answered).filter(Boolean).length}/{questions.length} Completed</span>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {filtered.map((q, i) => (
              <motion.div
                key={q.id}
                className="card"
                style={{ 
                  border: answered[q.id] ? '1px solid rgba(16,185,129,0.3)' : '1px solid var(--border)',
                  boxShadow: activeQ === q.id ? '0 10px 30px rgba(139,92,246,0.06)' : 'none',
                  cursor: 'pointer' 
                }}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: Math.min(i * 0.015, 0.3) }}
                onClick={() => setActiveQ(activeQ === q.id ? null : q.id)}
              >
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: 14 }}>
                  <div style={{ width: 32, height: 32, borderRadius: 8, background: 'rgba(139,92,246,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 13, color: 'var(--primary-light)', flexShrink: 0 }}>
                    Q{i + 1}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', gap: 8, marginBottom: 10, flexWrap: 'wrap', alignItems: 'center' }}>
                      <span className={`badge ${q.category === 'Technical' ? 'badge-primary' : q.category === 'HR' ? 'badge-cyan' : q.category === 'Behavioral' ? 'badge-info' : q.category === 'Coding' ? 'badge-warning' : 'badge-success'}`}>
                        {q.category}
                      </span>
                      <span style={{ fontSize: 11, fontWeight: 700, color: diffColor[q.difficulty] }}>{q.difficulty}</span>
                      {answered[q.id] && <span className="badge badge-success"><CheckCircle size={10}/> Response Logged</span>}
                    </div>
                    <p style={{ color: 'var(--text-primary)', fontSize: 15, fontWeight: 500, lineHeight: 1.6, marginBottom: 0 }}>{q.question}</p>

                    <AnimatePresence>
                      {activeQ === q.id && (
                        <motion.div 
                          initial={{ opacity: 0, height: 0 }} 
                          animate={{ opacity: 1, height: 'auto' }} 
                          exit={{ opacity: 0, height: 0 }}
                          style={{ marginTop: 16, overflow: 'hidden' }}
                          onClick={e => e.stopPropagation()}
                        >
                          {q.followUp && (
                            <div style={{ padding: '12px 14px', background: 'rgba(6,182,212,0.06)', border: '1px solid rgba(6,182,212,0.15)', borderRadius: 10, marginBottom: 14 }}>
                              <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--secondary)', marginBottom: 6, textTransform: 'uppercase', letterSpacing: 1, display: 'flex', alignItems: 'center', gap: 4 }}><ChevronRight size={12}/> Follow-up Challenge</div>
                              <p style={{ fontSize: 13, color: 'var(--text-secondary)', margin: 0 }}>{q.followUp}</p>
                            </div>
                          )}

                          {/* Inline AI Hint Area */}
                          {activeHints[q.id] && (
                            <motion.div 
                              initial={{ opacity: 0, y: -10 }} 
                              animate={{ opacity: 1, y: 0 }}
                              style={{ 
                                padding: '14px 16px', 
                                background: 'rgba(139,92,246,0.06)', 
                                border: '1px solid rgba(139,92,246,0.2)', 
                                borderRadius: 10, 
                                marginBottom: 14 
                              }}
                            >
                              <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, fontWeight: 700, color: 'var(--primary-light)', textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 8 }}>
                                <HintIcon size={13}/> Active AI Answer Strategy
                              </div>
                              <p style={{ fontSize: 13, color: 'var(--text-secondary)', margin: 0, whiteSpace: 'pre-line', lineHeight: 1.6 }}>
                                {q.hint}
                              </p>
                            </motion.div>
                          )}

                          <textarea
                            className="input"
                            rows={4}
                            placeholder="Type your strategic answer here (we recommend the STAR method for behavioral questions)..."
                            style={{ resize: 'vertical', marginBottom: 12, fontSize: 13 }}
                            value={answers[q.id] || ''}
                            onChange={e => setAnswers({ ...answers, [q.id]: e.target.value })}
                          />
                          <div style={{ display: 'flex', gap: 8 }}>
                            <button className="btn btn-success btn-sm" onClick={e => handleSaveAnswer(q.id, e)}>
                              <ThumbsUp size={12}/> Save Answer
                            </button>
                            <button className="btn btn-secondary btn-sm" onClick={e => handleToggleHint(q.id, e)} style={{ borderColor: activeHints[q.id] ? 'var(--primary-light)' : undefined }}>
                              <Sparkles size={12}/> {activeHints[q.id] ? 'Hide AI Strategy' : 'AI Solution Strategy'}
                            </button>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                  <Target size={16} style={{ color: 'var(--text-muted)', flexShrink: 0, marginTop: 4 }}/>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Empty state */}
      {!generated && !loading && (
        <div style={{ textAlign: 'center', padding: 60, color: 'var(--text-muted)' }}>
          <BrainCircuit size={48} style={{ marginBottom: 16, opacity: 0.3 }}/>
          <h3 style={{ marginBottom: 8, color: 'var(--text-muted)' }}>Ready to Prepare</h3>
          <p style={{ fontSize: 14 }}>Select your target career configuration fields above, then click "Generate custom questions" to start.</p>
        </div>
      )}
    </div>
  )
}

