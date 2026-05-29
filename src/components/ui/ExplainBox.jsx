import { Info, CheckCircle, AlertTriangle, Lightbulb, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

const icons = { info: <Info size={16}/>, success: <CheckCircle size={16}/>, warning: <AlertTriangle size={16}/>, tip: <Lightbulb size={16}/> }
const colors = { info: '#3b82f6', success: '#10b981', warning: '#f59e0b', tip: '#8b5cf6' }

export default function ExplainBox({ type = 'info', title, children, onClose }) {
  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: 'auto' }}
      exit={{ opacity: 0, height: 0 }}
      style={{
        background: `${colors[type]}10`,
        border: `1px solid ${colors[type]}30`,
        borderLeft: `3px solid ${colors[type]}`,
        borderRadius: 12, padding: '14px 16px',
        marginBottom: 16
      }}
    >
      <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
        <span style={{ color: colors[type], flexShrink: 0, marginTop: 2 }}>{icons[type]}</span>
        <div style={{ flex: 1 }}>
          {title && <div style={{ fontWeight: 700, fontSize: 13, color: colors[type], marginBottom: 6 }}>{title}</div>}
          <div style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.6 }}>{children}</div>
        </div>
        {onClose && (
          <button onClick={onClose} style={{ background: 'none', color: 'var(--text-muted)', cursor: 'pointer', padding: 2 }}>
            <X size={14}/>
          </button>
        )}
      </div>
    </motion.div>
  )
}
