import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { BrainCircuit, X, Send, Sparkles } from 'lucide-react'

const suggestions = [
  "How do I improve my resume score?",
  "Generate interview questions for React",
  "What skills should I learn for Backend?",
  "Analyze my coding performance",
]

const botResponses = {
  default: "I'm VerveAI, your career copilot! I can help you prepare for interviews, analyze your resume, suggest learning paths, and guide your career journey. What would you like to work on today?",
  resume: "To improve your resume score: 1) Add quantifiable achievements 2) Include relevant keywords 3) Keep it to 1-2 pages 4) Use action verbs. Want me to analyze your resume now?",
  interview: "Here are React interview questions: \n1. Explain Virtual DOM\n2. useState vs useReducer\n3. What are React hooks?\n4. Explain component lifecycle\n5. What is Context API?",
  skills: "For Backend development, I recommend: \n• Java Spring Boot\n• Docker & Kubernetes\n• MySQL / PostgreSQL\n• Redis caching\n• REST API design\n• Microservices architecture",
  coding: "Your coding performance shows: Accuracy 78%, Average time 24min. Focus areas: Dynamic Programming and System Design. Practice 2-3 problems daily for improvement!",
}

export default function AIWidget() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState([
    { type: 'bot', text: botResponses.default }
  ])
  const [input, setInput] = useState('')
  const [typing, setTyping] = useState(false)

  const getResponse = (text) => {
    const lower = text.toLowerCase()
    if (lower.includes('resume')) return botResponses.resume
    if (lower.includes('interview') || lower.includes('react')) return botResponses.interview
    if (lower.includes('skill') || lower.includes('learn') || lower.includes('backend')) return botResponses.skills
    if (lower.includes('cod')) return botResponses.coding
    return `Great question! I'm analyzing "${text}" — I recommend checking your Analytics dashboard for detailed insights. Would you like me to generate a personalized action plan?`
  }

  const sendMessage = (text) => {
    if (!text.trim()) return
    const userMsg = { type: 'user', text }
    setMessages(prev => [...prev, userMsg])
    setInput('')
    setTyping(true)
    setTimeout(() => {
      setTyping(false)
      setMessages(prev => [...prev, { type: 'bot', text: getResponse(text) }])
    }, 1000 + Math.random() * 800)
  }

  return (
    <div className="ai-widget">
      <AnimatePresence>
        {open && (
          <motion.div
            className="ai-widget-panel"
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ duration: 0.2 }}
          >
            {/* Header */}
            <div className="ai-panel-header">
              <div style={{ width:36, height:36, borderRadius:'50%', background:'rgba(255,255,255,0.2)', display:'flex', alignItems:'center', justifyContent:'center' }}>
                <BrainCircuit size={18} color="#fff"/>
              </div>
              <div style={{ flex:1 }}>
                <div style={{ fontWeight:700, color:'#fff', fontSize:14 }}>VerveAI Assistant</div>
                <div style={{ fontSize:11, color:'rgba(255,255,255,0.7)' }}>● Online · Always ready</div>
              </div>
              <button onClick={() => setOpen(false)} style={{ background:'none', color:'rgba(255,255,255,0.7)', cursor:'pointer' }}>
                <X size={16}/>
              </button>
            </div>

            {/* Messages */}
            <div className="ai-panel-messages">
              {messages.map((msg, i) => (
                <motion.div
                  key={i}
                  className={`ai-message ${msg.type}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  style={{ whiteSpace: 'pre-line' }}
                >
                  {msg.text}
                </motion.div>
              ))}
              {typing && (
                <div className="ai-message bot" style={{ display:'flex', gap:4 }}>
                  <span style={{ animation:'pulse-glow 1s infinite' }}>●</span>
                  <span style={{ animation:'pulse-glow 1s infinite 0.2s' }}>●</span>
                  <span style={{ animation:'pulse-glow 1s infinite 0.4s' }}>●</span>
                </div>
              )}
            </div>

            {/* Quick Suggestions */}
            <div style={{ padding:'8px 16px', display:'flex', gap:6, flexWrap:'wrap', borderTop:'1px solid var(--border)' }}>
              {suggestions.slice(0, 2).map((s, i) => (
                <button
                  key={i}
                  onClick={() => sendMessage(s)}
                  style={{
                    padding:'4px 10px', background:'rgba(139,92,246,0.1)', border:'1px solid rgba(139,92,246,0.2)',
                    borderRadius:'99px', fontSize:11, color:'var(--primary-light)', cursor:'pointer', whiteSpace:'nowrap'
                  }}
                >
                  {s.length > 28 ? s.slice(0, 28) + '…' : s}
                </button>
              ))}
            </div>

            {/* Input */}
            <div className="ai-panel-input">
              <input
                className="input"
                style={{ flex:1, fontSize:13, padding:'8px 12px' }}
                placeholder="Ask anything..."
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && sendMessage(input)}
              />
              <button
                className="btn btn-primary btn-sm"
                onClick={() => sendMessage(input)}
                style={{ padding:'8px 12px' }}
              >
                <Send size={14}/>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Trigger Button */}
      <motion.button
        className="ai-widget-btn"
        onClick={() => setOpen(!open)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        title="VerveAI Assistant"
      >
        {open ? <X size={22} color="#fff"/> : <Sparkles size={22} color="#fff"/>}
      </motion.button>
    </div>
  )
}
