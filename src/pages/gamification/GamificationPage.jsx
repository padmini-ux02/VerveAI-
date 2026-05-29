import { motion } from 'framer-motion'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { Trophy, Flame, Zap, Star, Crown, Award, Info, ArrowRight } from 'lucide-react'
import Modal from '../../components/ui/Modal'
import ExplainBox from '../../components/ui/ExplainBox'

const badges = [
  { icon: '🎯', name: 'First Interview', desc: 'Awarded for completing your very first mock interview session. This marks the beginning of your journey!', how: 'Complete 1 mock interview session to earn this badge.', earned: true, xp: 50, rarity: 'Common', color: '#94a3b8' },
  { icon: '💻', name: 'Code Warrior', desc: 'Earned by solving 10 coding challenges in the Coding Lab. Your persistence is paying off!', how: 'Solve 10 coding problems (any difficulty) in the Coding Lab.', earned: true, xp: 100, rarity: 'Rare', color: '#3b82f6' },
  { icon: '📄', name: 'Resume Pro', desc: 'Your resume scored 90+ on ATS analysis. Recruiters will notice you now!', how: 'Upload your resume and achieve an ATS score of 90 or higher.', earned: true, xp: 75, rarity: 'Rare', color: '#10b981' },
  { icon: '🔥', name: '7-Day Streak', desc: 'You practiced 7 days in a row without missing a single day. Discipline is the key to success!', how: 'Log in and complete at least one activity for 7 consecutive days.', earned: true, xp: 150, rarity: 'Epic', color: '#f59e0b' },
  { icon: '⭐', name: 'Top Performer', desc: 'Score 95+ on a mock interview. This shows exceptional preparation and confidence.', how: 'Achieve a combined mock interview score of 95/100 or higher.', earned: false, xp: 200, rarity: 'Epic', color: '#ef4444' },
  { icon: '🏆', name: 'Interview Ace', desc: 'Complete 25 mock interviews total. This demonstrates true commitment to mastery.', how: 'Complete a total of 25 mock interview sessions.', earned: false, xp: 300, rarity: 'Legendary', color: '#a78bfa' },
  { icon: '🚀', name: 'Speed Coder', desc: 'Solve a Hard difficulty problem in under 10 minutes. Impressive!', how: 'Solve any Hard problem in the Coding Lab within 10 minutes.', earned: false, xp: 250, rarity: 'Legendary', color: '#fbbf24' },
  { icon: '🎓', name: 'Career Ready', desc: 'Complete all modules: Resume, Interview, Coding, and Career guidance. You are ready!', how: 'Complete at least 5 sessions in each of the 4 main modules.', earned: false, xp: 500, rarity: 'Legendary', color: '#22d3ee' },
]

const leaderboard = [
  { rank: 1, name: 'Priya S.', xp: 12450, level: 24, streak: 32, avatar: 'PS', change: 0, college: 'IIT Bombay', achievements: 8 },
  { rank: 2, name: 'Rahul M.', xp: 11200, level: 22, streak: 18, avatar: 'RM', change: 1, college: 'NIT Trichy', achievements: 7 },
  { rank: 3, name: 'Alex J.', xp: 10800, level: 21, streak: 7, avatar: 'AJ', change: -1, college: 'SRM Institute', achievements: 4, isUser: true },
  { rank: 4, name: 'Aisha K.', xp: 9600, level: 19, streak: 14, avatar: 'AK', change: 2, college: 'VIT Vellore', achievements: 5 },
  { rank: 5, name: 'Dev P.', xp: 8900, level: 18, streak: 5, avatar: 'DP', change: -1, college: 'BITS Pilani', achievements: 3 },
]

const rankIcon = { 1: '🥇', 2: '🥈', 3: '🥉' }
const rarityColor = { Common: '#94a3b8', Rare: '#3b82f6', Epic: '#8b5cf6', Legendary: '#f59e0b' }
const streakDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

export default function GamificationPage() {
  const navigate = useNavigate()
  const [badgeModal, setBadgeModal] = useState(null)
  const [userModal, setUserModal] = useState(null)
  const [xpModal, setXpModal] = useState(false)
  const [streakModal, setStreakModal] = useState(false)
  const [activeStreak, setActiveStreak] = useState([true, true, true, true, true, true, true])

  return (
    <div>
      <div className="page-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 6 }}>
          <div style={{ width: 40, height: 40, background: 'rgba(245,158,11,0.15)', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Trophy size={20} color="#fbbf24"/>
          </div>
          <h1 className="page-title" style={{ margin: 0 }}>Achievements & Gamification</h1>
        </div>
        <p className="page-subtitle">Earn XP, collect badges, maintain streaks, and compete on the leaderboard</p>
      </div>

      {/* Level Card */}
      <motion.div style={{ padding: '28px', marginBottom: 28, borderRadius: 20, background: 'linear-gradient(135deg, #1a0a3e, #0a1628)', border: '1px solid rgba(139,92,246,0.3)', position: 'relative', overflow: 'hidden' }}
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <div style={{ position: 'absolute', top: -60, right: -60, width: 200, height: 200, background: 'var(--primary)', borderRadius: '50%', filter: 'blur(80px)', opacity: 0.2 }}/>
        <div style={{ display: 'flex', alignItems: 'center', gap: 24, flexWrap: 'wrap' }}>
          <div style={{ width: 80, height: 80, borderRadius: '50%', background: 'var(--gradient-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 32, fontWeight: 800, color: '#fff', border: '3px solid rgba(255,255,255,0.2)', flexShrink: 0 }}>12</div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 22, fontWeight: 800, fontFamily: 'Outfit', marginBottom: 4 }}>Level 12 — Code Apprentice</div>
            <div style={{ fontSize: 14, color: 'rgba(255,255,255,0.6)', marginBottom: 12 }}>3,450 / 4,000 XP to Level 13</div>
            <div style={{ height: 8, background: 'rgba(255,255,255,0.1)', borderRadius: 99, overflow: 'hidden' }}>
              <motion.div style={{ height: '100%', background: 'var(--gradient-primary)', borderRadius: 99 }} initial={{ width: 0 }} animate={{ width: '86%' }} transition={{ duration: 1, delay: 0.3 }}/>
            </div>
          </div>
          <div style={{ display: 'flex', gap: 16 }}>
            {[
              { icon: <Flame size={20} color="#f59e0b"/>, label: 'Streak', value: '7 days', action: () => setStreakModal(true) },
              { icon: <Zap size={20} color="#8b5cf6"/>, label: 'Total XP', value: '3,450', action: () => setXpModal(true) },
              { icon: <Star size={20} color="#22d3ee"/>, label: 'Badges', value: '4 / 8', action: () => {} },
            ].map((item, i) => (
              <div key={i} style={{ textAlign: 'center', cursor: 'pointer' }} onClick={item.action}
                onMouseEnter={e => e.currentTarget.style.opacity = '0.8'}
                onMouseLeave={e => e.currentTarget.style.opacity = '1'}>
                <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 6 }}>{item.icon}</div>
                <div style={{ fontFamily: 'Outfit', fontWeight: 800, fontSize: 20, color: '#fff' }}>{item.value}</div>
                <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.5)' }}>{item.label}</div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      <div className="grid-2">
        {/* Badges */}
        <motion.div className="card" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
            <h4 style={{ display: 'flex', alignItems: 'center', gap: 8 }}><Award size={18} color="var(--accent)"/> Badges Collection</h4>
            <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>4/8 earned · Click any badge</span>
          </div>
          <ExplainBox type="tip">
            Click any badge to see how to earn it. Locked badges show what you need to do next to unlock them.
          </ExplainBox>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 12 }}>
            {badges.map((badge, i) => (
              <motion.div key={i}
                onClick={() => setBadgeModal(badge)}
                style={{ padding: 14, borderRadius: 14, textAlign: 'center', background: badge.earned ? `${badge.color}12` : 'var(--bg-glass)', border: `1px solid ${badge.earned ? badge.color + '40' : 'var(--border)'}`, opacity: badge.earned ? 1 : 0.6, cursor: 'pointer', transition: 'all 0.2s' }}
                whileHover={{ scale: 1.05, opacity: 1 }}
                initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: badge.earned ? 1 : 0.6, scale: 1 }}
                transition={{ delay: i * 0.05 }}
              >
                <div style={{ fontSize: 28, marginBottom: 6, filter: badge.earned ? 'none' : 'grayscale(100%)' }}>{badge.icon}</div>
                <div style={{ fontSize: 12, fontWeight: 700, color: badge.earned ? 'var(--text-primary)' : 'var(--text-muted)', marginBottom: 3 }}>{badge.name}</div>
                <div style={{ fontSize: 10, color: rarityColor[badge.rarity], fontWeight: 700 }}>{badge.rarity}</div>
                <div style={{ fontSize: 10, color: 'var(--text-muted)', marginTop: 3 }}>+{badge.xp} XP</div>
                {!badge.earned && <div style={{ fontSize: 9, color: 'var(--primary-light)', marginTop: 3 }}>🔒 Tap to see how</div>}
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Leaderboard */}
        <motion.div className="card" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
          <h4 style={{ marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8 }}>
            <Crown size={18} color="#fbbf24"/> Leaderboard — This Week
          </h4>
          <ExplainBox type="info">
            Rankings are based on XP earned this week. Click any user to see their profile. You are currently ranked #3.
          </ExplainBox>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {leaderboard.map((user, i) => (
              <motion.div key={i}
                onClick={() => setUserModal(user)}
                className="leaderboard-item"
                style={{ background: user.isUser ? 'rgba(139,92,246,0.1)' : 'var(--bg-glass)', border: user.isUser ? '1px solid rgba(139,92,246,0.3)' : '1px solid var(--border)', cursor: 'pointer' }}
                initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.08 }}
                whileHover={{ x: 4 }}
              >
                <div className={`leaderboard-rank ${user.rank === 1 ? 'gold' : user.rank === 2 ? 'silver' : user.rank === 3 ? 'bronze' : ''}`}>
                  {rankIcon[user.rank] || `#${user.rank}`}
                </div>
                <div className="avatar">{user.avatar}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 600, fontSize: 14 }}>
                    {user.name} {user.isUser && <span className="badge badge-primary" style={{ fontSize: 9 }}>You</span>}
                  </div>
                  <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>Lv.{user.level} · 🔥{user.streak}d</div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontWeight: 700, fontSize: 14, color: 'var(--primary-light)' }}>{user.xp.toLocaleString()} XP</div>
                  <div style={{ fontSize: 11, color: user.change > 0 ? 'var(--success)' : user.change < 0 ? 'var(--danger)' : 'var(--text-muted)' }}>
                    {user.change > 0 ? `↑${user.change}` : user.change < 0 ? `↓${Math.abs(user.change)}` : '—'}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Streak Calendar */}
          <div style={{ marginTop: 24, paddingTop: 20, borderTop: '1px solid var(--border)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
              <h5 style={{ display: 'flex', alignItems: 'center', gap: 8 }}><Flame size={14} color="var(--accent)"/> This Week's Streak</h5>
              <button className="btn btn-secondary btn-sm" onClick={() => setStreakModal(true)}>How streaks work?</button>
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
              {streakDays.map((day, i) => (
                <div key={i} style={{ flex: 1, textAlign: 'center' }}>
                  <div
                    onClick={() => { const updated = [...activeStreak]; updated[i] = !updated[i]; setActiveStreak(updated); toast.success(updated[i] ? `${day}: Practice logged! +5 XP` : `${day}: Unmarked`) }}
                    style={{ width: '100%', aspectRatio: '1', borderRadius: 8, background: activeStreak[i] ? 'var(--gradient-primary)' : 'var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, marginBottom: 6, boxShadow: activeStreak[i] ? 'var(--shadow-primary)' : 'none', cursor: 'pointer', transition: 'all 0.2s' }}>
                    {activeStreak[i] ? '✓' : ''}
                  </div>
                  <div style={{ fontSize: 10, color: 'var(--text-muted)' }}>{day}</div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Badge Modal */}
      <Modal open={!!badgeModal} onClose={() => setBadgeModal(null)} title={badgeModal?.name} subtitle={`${badgeModal?.rarity} · +${badgeModal?.xp} XP`} icon={badgeModal?.icon} maxWidth={460}>
        {badgeModal && (
          <div>
            <div style={{ textAlign: 'center', marginBottom: 20 }}>
              <div style={{ fontSize: 72, marginBottom: 12, filter: badgeModal.earned ? 'none' : 'grayscale(100%)' }}>{badgeModal.icon}</div>
              <span style={{ padding: '6px 16px', borderRadius: 99, background: `${rarityColor[badgeModal.rarity]}20`, border: `1px solid ${rarityColor[badgeModal.rarity]}40`, color: rarityColor[badgeModal.rarity], fontWeight: 700, fontSize: 13 }}>
                {badgeModal.rarity}
              </span>
            </div>
            <ExplainBox type={badgeModal.earned ? 'success' : 'info'} title={badgeModal.earned ? '✅ Badge Earned!' : '🔒 How to earn this badge'}>
              {badgeModal.earned ? badgeModal.desc : badgeModal.how}
            </ExplainBox>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 16px', background: 'var(--bg-glass)', borderRadius: 10, marginBottom: 16 }}>
              <span style={{ fontSize: 13, color: 'var(--text-muted)' }}>XP Reward</span>
              <span style={{ fontWeight: 700, color: 'var(--primary-light)' }}>+{badgeModal.xp} XP</span>
            </div>
            <button className="btn btn-primary" style={{ width: '100%' }}
              onClick={() => { setBadgeModal(null); if (!badgeModal.earned) navigate(badgeModal.name === 'Code Warrior' || badgeModal.name === 'Speed Coder' ? '/coding' : badgeModal.name.includes('Interview') ? '/mock-interview' : badgeModal.name === 'Resume Pro' ? '/resume' : '/dashboard') }}>
              {badgeModal.earned ? 'View All Badges' : `Go Earn It! →`}
            </button>
          </div>
        )}
      </Modal>

      {/* User Profile Modal */}
      <Modal open={!!userModal} onClose={() => setUserModal(null)} title={userModal?.name} subtitle={`${userModal?.college} · Level ${userModal?.level}`} icon="👤" maxWidth={420}>
        {userModal && (
          <div>
            <div style={{ textAlign: 'center', marginBottom: 20 }}>
              <div style={{ width: 72, height: 72, borderRadius: '50%', background: 'var(--gradient-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 28, fontWeight: 700, color: '#fff', margin: '0 auto 12px' }}>{userModal.avatar}</div>
              <div style={{ fontSize: 20, fontWeight: 800, fontFamily: 'Outfit' }}>{userModal.name}</div>
              <div style={{ fontSize: 13, color: 'var(--text-muted)' }}>{userModal.college}</div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10, marginBottom: 16 }}>
              {[{ label: 'XP', value: userModal.xp.toLocaleString() }, { label: 'Level', value: userModal.level }, { label: 'Streak', value: `${userModal.streak}d 🔥` }, { label: 'Rank', value: `#${userModal.rank}` }, { label: 'Badges', value: userModal.achievements }, { label: 'Change', value: userModal.change > 0 ? `↑${userModal.change}` : userModal.change < 0 ? `↓${Math.abs(userModal.change)}` : '—' }].map((item, i) => (
                <div key={i} style={{ padding: '10px', background: 'var(--bg-glass)', border: '1px solid var(--border)', borderRadius: 10, textAlign: 'center' }}>
                  <div style={{ fontWeight: 700, fontSize: 16, color: 'var(--primary-light)' }}>{item.value}</div>
                  <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>{item.label}</div>
                </div>
              ))}
            </div>
            {userModal.isUser ? (
              <button className="btn btn-primary" style={{ width: '100%' }} onClick={() => { setUserModal(null); navigate('/profile') }}>
                Edit My Profile <ArrowRight size={14}/>
              </button>
            ) : (
              <ExplainBox type="info">
                Practice more to climb above {userModal.name}! You need {(userModal.xp - 10800).toLocaleString()} more XP this week to surpass them.
              </ExplainBox>
            )}
          </div>
        )}
      </Modal>

      {/* XP System Explanation Modal */}
      <Modal open={xpModal} onClose={() => setXpModal(false)} title="How XP Works" subtitle="Experience Points System" icon="⚡" maxWidth={480}>
        <ExplainBox type="info" title="What is XP?">
          XP (Experience Points) measures your overall activity and progress on VerveAI. Accumulate XP to level up and unlock new features.
        </ExplainBox>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 16 }}>
          {[
            { activity: 'Daily Login', xp: '+5 XP' },
            { activity: 'Completing a Mock Interview', xp: '+20 XP' },
            { activity: 'Solving Easy Coding Problem', xp: '+10 XP' },
            { activity: 'Solving Medium Coding Problem', xp: '+25 XP' },
            { activity: 'Solving Hard Coding Problem', xp: '+50 XP' },
            { activity: 'Resume Analysis', xp: '+15 XP' },
            { activity: 'Maintaining 7-Day Streak', xp: '+50 XP Bonus' },
            { activity: 'Earning a Badge', xp: '+50 to +300 XP' },
          ].map((item, i) => (
            <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 14px', background: 'var(--bg-glass)', border: '1px solid var(--border)', borderRadius: 10 }}>
              <span style={{ fontSize: 13, color: 'var(--text-secondary)' }}>{item.activity}</span>
              <span style={{ fontWeight: 700, fontSize: 13, color: 'var(--primary-light)' }}>{item.xp}</span>
            </div>
          ))}
        </div>
        <button className="btn btn-primary" style={{ width: '100%' }} onClick={() => { setXpModal(false); navigate('/dashboard') }}>
          Start Earning XP <ArrowRight size={14}/>
        </button>
      </Modal>

      {/* Streak Explanation Modal */}
      <Modal open={streakModal} onClose={() => setStreakModal(false)} title="Daily Streak System" subtitle="Stay consistent to earn bonus rewards" icon="🔥" maxWidth={460}>
        <ExplainBox type="warning" title="⚠️ Missing a day resets your streak!">
          Log in and complete at least one activity (interview, coding problem, or resume analysis) every day to maintain your streak.
        </ExplainBox>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 16 }}>
          {[{ milestone: '3-Day Streak', reward: '+30 XP Bonus', icon: '🔥' }, { milestone: '7-Day Streak', reward: '+100 XP + Badge', icon: '⚡' }, { milestone: '14-Day Streak', reward: '+200 XP + Epic Badge', icon: '🌟' }, { milestone: '30-Day Streak', reward: '+500 XP + Legendary Badge', icon: '👑' }].map((item, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '12px 14px', background: 'var(--bg-glass)', border: '1px solid var(--border)', borderRadius: 10 }}>
              <span style={{ fontSize: 24 }}>{item.icon}</span>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 600, fontSize: 14 }}>{item.milestone}</div>
                <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>{item.reward}</div>
              </div>
            </div>
          ))}
        </div>
        <button className="btn btn-primary" style={{ width: '100%' }} onClick={() => { setStreakModal(false); navigate('/interview') }}>
          Practice Now to Keep Streak <Flame size={14}/>
        </button>
      </Modal>
    </div>
  )
}
