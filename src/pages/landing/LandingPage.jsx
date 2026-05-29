import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useAuthStore } from '../../store/authStore'
import { useState } from 'react'
import Modal from '../../components/ui/Modal'
import {
  Sparkles, ArrowRight, BrainCircuit, FileText, Video,
  Code2, BarChart3, Trophy, Zap, Compass, CheckCircle,
  Star, ChevronRight, Play, X
} from 'lucide-react'

const features = [
  {
    icon: <FileText size={24}/>, title: 'Resume Intelligence', color: '#8b5cf6',
    desc: 'AI-powered resume parsing, ATS scoring, and improvement suggestions',
    details: {
      what: 'Upload your PDF/DOC resume and our AI engine instantly parses every section — skills, education, projects, experience, and certifications.',
      how: [
        'Upload your resume (PDF or DOC)',
        'AI extracts all sections automatically',
        'Get ATS compatibility score (0-100)',
        'See missing keywords for your target role',
        'Follow improvement suggestions to boost score',
      ],
      benefit: 'Students who optimize their resume with VerveAI see 3x more interview callbacks.',
    }
  },
  {
    icon: <BrainCircuit size={24}/>, title: 'AI Interview Generator', color: '#06b6d4',
    desc: 'Dynamic questions tailored to your role, company, and skill level',
    details: {
      what: 'Generate personalized interview questions based on your target role, company, and experience level — powered by GPT-4.',
      how: [
        'Select your target role (e.g., Backend Engineer)',
        'Choose the company (Google, Amazon, etc.)',
        'Pick your experience level',
        'Get 8-20 curated questions across categories',
        'Answer questions and get AI feedback',
      ],
      benefit: 'Covers Technical, HR, Behavioral, Aptitude, and Coding categories with adaptive difficulty.',
    }
  },
  {
    icon: <Video size={24}/>, title: 'Mock Interview Room', color: '#f59e0b',
    desc: 'Live camera sessions with AI avatar, real-time scoring, and feedback',
    details: {
      what: 'A fully simulated interview room using your webcam and microphone. AI analyzes your body language, confidence, and communication in real time.',
      how: [
        'Allow camera and microphone access',
        'AI interviewer asks questions one by one',
        'Real-time facial expression & eye contact analysis',
        'Filler word detection ("um", "uh", "like")',
        'Get full performance report after session',
      ],
      benefit: 'Identify nervousness patterns and fix them before your real interview.',
    }
  },
  {
    icon: <Code2 size={24}/>, title: 'Coding Assessment', color: '#10b981',
    desc: 'Multi-language code editor with hidden test cases and AI hints',
    details: {
      what: 'A full-featured in-browser IDE supporting Java, Python, JavaScript, C, and C++. Solve real interview problems with automated evaluation.',
      how: [
        'Pick a problem (Easy / Medium / Hard)',
        'Write your solution in your preferred language',
        'Run against hidden test cases',
        'View time & space complexity analysis',
        'Get AI hints if you\'re stuck',
      ],
      benefit: 'Covers 200+ problems across Arrays, Trees, DP, Graphs, and System Design.',
    }
  },
  {
    icon: <BarChart3 size={24}/>, title: 'Analytics Dashboard', color: '#ef4444',
    desc: 'Track performance with interactive charts, heat maps, and trends',
    details: {
      what: 'A comprehensive analytics hub showing your progress across all modules with beautiful interactive visualizations.',
      how: [
        'View weekly performance trends (line charts)',
        'See skill-by-skill breakdown (radar chart)',
        'Track practice activity heatmap',
        'Compare interview vs. coding vs. resume scores',
        'Export PDF reports for your portfolio',
      ],
      benefit: 'Data-driven insights help you focus on the areas that need the most improvement.',
    }
  },
  {
    icon: <Compass size={24}/>, title: 'Career Guidance', color: '#a78bfa',
    desc: 'Personalized role recommendations, salary estimates, and roadmaps',
    details: {
      what: 'AI-powered career engine that matches your skills to real job roles and guides your growth with certifications, courses, and project ideas.',
      how: [
        'View role recommendations with match %',
        'See expected salary ranges per role',
        'Browse top companies hiring for that role',
        'Get certification & course suggestions',
        'Follow guided project ideas to build portfolio',
      ],
      benefit: 'Over 500 company profiles and real salary data updated monthly.',
    }
  },
  {
    icon: <Zap size={24}/>, title: 'Skill Gap Detection', color: '#22d3ee',
    desc: 'Identify missing skills and get learning roadmaps with time estimates',
    details: {
      what: 'Compare your current skillset against any target job role to find exactly what you\'re missing and how long it will take to learn.',
      how: [
        'Select your desired role',
        'AI compares your skills vs role requirements',
        'Get a prioritized list of missing skills',
        'View step-by-step learning roadmap',
        'See estimated time to become job-ready',
      ],
      benefit: 'Saves months of guesswork — know exactly what to learn next.',
    }
  },
  {
    icon: <Trophy size={24}/>, title: 'Gamification', color: '#fbbf24',
    desc: 'Earn XP, badges, climb leaderboards, and maintain daily streaks',
    details: {
      what: 'Stay motivated with a game-like progression system. Earn XP for every activity, unlock badges, and compete with peers on the leaderboard.',
      how: [
        'Earn XP by completing interviews, problems, and modules',
        'Level up from Beginner (1) to Master (50)',
        'Unlock 20+ unique achievement badges',
        'Maintain daily streaks for bonus XP',
        'Compete in weekly leaderboard rankings',
      ],
      benefit: 'Users who engage with gamification practice 4x more consistently.',
    }
  },
]

const stats = [
  { value: '50K+', label: 'Students Placed' },
  { value: '98%', label: 'Satisfaction Rate' },
  { value: '500+', label: 'Companies' },
  { value: '10M+', label: 'Questions Generated' },
]

const testimonials = [
  { name: 'Priya Sharma', role: 'SDE at Google', text: 'VerveAI helped me crack Google in just 3 months. The mock interviews are incredibly realistic!', rating: 5, avatar: 'PS' },
  { name: 'Rahul Mehta', role: 'Backend Eng. at Amazon', text: 'The resume scoring was a game-changer. Got 3x more interview calls after optimizing with VerveAI.', rating: 5, avatar: 'RM' },
  { name: 'Aisha Khan', role: 'Full Stack at Microsoft', text: 'The coding lab and AI hints helped me master DSA. Best interview prep platform out there!', rating: 5, avatar: 'AK' },
]

const pricingPlans = [
  { name: 'Free', price: '₹0', period: 'forever', features: ['5 mock interviews/month', '10 coding problems', 'Basic resume analysis', 'Community support'], cta: 'Get Started Free', highlight: false },
  { name: 'Pro', price: '₹499', period: '/month', features: ['Unlimited mock interviews', 'Full coding lab (200+ problems)', 'Advanced resume AI + ATS', 'Career recommendations', 'Priority support', 'Detailed analytics'], cta: 'Start Pro Trial', highlight: true },
  { name: 'Enterprise', price: 'Custom', period: '', features: ['Everything in Pro', 'Team dashboard', 'Recruiter access panel', 'Custom interview templates', 'Dedicated account manager', 'SSO & API access'], cta: 'Contact Sales', highlight: false },
]

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.6 } })
}

export default function LandingPage() {
  const navigate = useNavigate()
  const { demoLogin } = useAuthStore()
  const [featureModal, setFeatureModal] = useState(null)
  const [pricingOpen, setPricingOpen] = useState(false)
  const [aboutOpen, setAboutOpen] = useState(false)

  const handleGetStarted = () => navigate('/register')
  const handleDemo = () => { demoLogin(); navigate('/dashboard') }

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-primary)' }}>

      {/* Navbar */}
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        padding: '0 48px', height: 64, display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        background: 'rgba(10,10,15,0.85)', backdropFilter: 'blur(20px)',
        borderBottom: '1px solid var(--border)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ width: 36, height: 36, background: 'var(--gradient-primary)', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18 }}>✦</div>
          <span style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 800, fontSize: 22, background: 'var(--gradient-primary)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>VerveAI</span>
        </div>
        <div style={{ display: 'flex', gap: 32, alignItems: 'center' }}>
          {[
            { label: 'Features', action: () => document.getElementById('features-section')?.scrollIntoView({ behavior: 'smooth' }) },
            { label: 'Pricing', action: () => setPricingOpen(true) },
            { label: 'About', action: () => setAboutOpen(true) },
          ].map(item => (
            <span key={item.label}
              onClick={item.action}
              style={{ fontSize: 14, color: 'var(--text-secondary)', cursor: 'pointer', fontWeight: 500, transition: 'color 0.2s' }}
              onMouseEnter={e => e.target.style.color = 'var(--text-primary)'}
              onMouseLeave={e => e.target.style.color = 'var(--text-secondary)'}
            >{item.label}</span>
          ))}
        </div>
        <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
          <button className="btn btn-secondary btn-sm" onClick={() => navigate('/login')}>Sign In</button>
          <button className="btn btn-primary btn-sm" onClick={handleGetStarted}>Get Started <ArrowRight size={14}/></button>
        </div>
      </nav>

      {/* Hero */}
      <section className="landing-hero" style={{ paddingTop: 120 }}>
        <div className="hero-bg-orb hero-bg-orb-1"/>
        <div className="hero-bg-orb hero-bg-orb-2"/>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(139,92,246,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(139,92,246,0.03) 1px, transparent 1px)', backgroundSize: '60px 60px', pointerEvents: 'none' }}/>

        <motion.div className="hero-badge" initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
          <Sparkles size={14}/> AI-Powered Career Copilot · Powered by GPT-4
        </motion.div>

        <motion.h1 className="hero-title" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          Ace Every Interview with{' '}
          <span className="gradient-text">Intelligent AI</span>
          <br/>Preparation
        </motion.h1>

        <motion.p className="hero-subtitle" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          VerveAI combines resume intelligence, AI mock interviews, coding assessments,
          and personalized career guidance to land your dream job faster.
        </motion.p>

        <motion.div className="hero-cta" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
          <button className="btn btn-primary btn-lg" onClick={handleGetStarted}>
            Start Free Today <ArrowRight size={18}/>
          </button>
          <button className="btn btn-secondary btn-lg" onClick={handleDemo}>
            <Play size={18}/> Try Demo — No Signup
          </button>
        </motion.div>

        <motion.div className="hero-stats" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
          {stats.map((stat, i) => (
            <div key={i} className="hero-stat-item">
              <div className="hero-stat-value">{stat.value}</div>
              <div className="hero-stat-label">{stat.label}</div>
            </div>
          ))}
        </motion.div>

        {/* Dashboard Preview */}
        <motion.div style={{ width: '100%', maxWidth: 900, marginTop: 60, position: 'relative' }}
          initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}>
          <div style={{ background: 'var(--bg-card)', borderRadius: 20, border: '1px solid var(--border)', overflow: 'hidden', boxShadow: '0 40px 100px rgba(139,92,246,0.2)' }}>
            <div style={{ padding: '14px 20px', background: 'var(--bg-secondary)', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', gap: 8 }}>
              <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#ef4444' }}/>
              <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#f59e0b' }}/>
              <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#10b981' }}/>
              <div style={{ flex: 1, background: 'var(--bg-glass)', borderRadius: 6, height: 28, margin: '0 16px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>verveai.app/dashboard</span>
              </div>
            </div>
            <div style={{ padding: 24, display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}>
              {[
                { label: 'Resume Score', value: '87/100', color: '#8b5cf6', icon: '📄' },
                { label: 'ATS Score', value: '92/100', color: '#06b6d4', icon: '🎯' },
                { label: 'Interviews Done', value: '23', color: '#10b981', icon: '🎤' },
                { label: 'Streak', value: '7 days', color: '#f59e0b', icon: '🔥' },
              ].map((item, i) => (
                <motion.div key={i} style={{ background: 'var(--bg-glass)', border: '1px solid var(--border)', borderRadius: 12, padding: 16 }}
                  initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.8 + i * 0.1 }}>
                  <div style={{ fontSize: 24, marginBottom: 8 }}>{item.icon}</div>
                  <div style={{ fontSize: 20, fontWeight: 800, color: item.color, fontFamily: 'Outfit, sans-serif' }}>{item.value}</div>
                  <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 4 }}>{item.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
          <div style={{ position: 'absolute', bottom: -40, left: '10%', right: '10%', height: 80, background: 'radial-gradient(ellipse, rgba(139,92,246,0.4) 0%, transparent 70%)', filter: 'blur(20px)', pointerEvents: 'none' }}/>
        </motion.div>
      </section>

      {/* Features */}
      <section id="features-section" style={{ padding: '100px 48px' }}>
        <div className="container">
          <motion.div style={{ textAlign: 'center', marginBottom: 64 }} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <span className="badge badge-primary" style={{ marginBottom: 16 }}>Everything You Need</span>
            <h2>Supercharge Your Interview Preparation</h2>
            <p style={{ maxWidth: 520, margin: '16px auto 0' }}>From AI-powered resume analysis to live mock interviews — VerveAI has it all.</p>
          </motion.div>
          <div className="feature-grid">
            {features.map((f, i) => (
              <motion.div key={i} className="feature-card" variants={fadeUp} initial="hidden" whileInView="visible" custom={i} viewport={{ once: true }} whileHover={{ y: -6 }}>
                <div className="feature-icon" style={{ background: `${f.color}18`, borderColor: `${f.color}33`, color: f.color }}>{f.icon}</div>
                <h4 style={{ marginBottom: 8 }}>{f.title}</h4>
                <p style={{ fontSize: 14 }}>{f.desc}</p>
                <button
                  onClick={() => setFeatureModal(f)}
                  style={{ marginTop: 16, display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, color: f.color, fontWeight: 600, background: 'none', cursor: 'pointer', border: 'none', padding: 0 }}
                >
                  Learn more <ChevronRight size={14}/>
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section style={{ padding: '80px 48px', background: 'rgba(139,92,246,0.03)' }}>
        <div className="container">
          <motion.div style={{ textAlign: 'center', marginBottom: 48 }} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <span className="badge badge-cyan" style={{ marginBottom: 16 }}>Success Stories</span>
            <h2>Loved by 50,000+ Professionals</h2>
          </motion.div>
          <div className="grid-3">
            {testimonials.map((t, i) => (
              <motion.div key={i} className="card" variants={fadeUp} initial="hidden" whileInView="visible" custom={i} viewport={{ once: true }}>
                <div style={{ display: 'flex', gap: 4, marginBottom: 16 }}>
                  {[...Array(t.rating)].map((_, j) => <Star key={j} size={14} fill="#f59e0b" color="#f59e0b"/>)}
                </div>
                <p style={{ fontSize: 14, lineHeight: 1.7, marginBottom: 20 }}>"{t.text}"</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div className="avatar">{t.avatar}</div>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: 14 }}>{t.name}</div>
                    <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>{t.role}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: '100px 48px', textAlign: 'center' }}>
        <div className="container">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
            style={{ background: 'linear-gradient(135deg, rgba(139,92,246,0.15), rgba(6,182,212,0.1))', border: '1px solid rgba(139,92,246,0.3)', borderRadius: 24, padding: '64px 40px' }}>
            <div style={{ fontSize: 48, marginBottom: 16 }}>🚀</div>
            <h2 style={{ marginBottom: 16 }}>Start Your Journey Today</h2>
            <p style={{ maxWidth: 480, margin: '0 auto 40px', fontSize: 16 }}>Join 50,000+ students who landed their dream jobs using VerveAI. Free to start.</p>
            <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
              <button className="btn btn-primary btn-lg" onClick={handleGetStarted}><Sparkles size={18}/> Get Started Free</button>
              <button className="btn btn-secondary btn-lg" onClick={handleDemo}>Try Demo Dashboard</button>
              <button className="btn btn-secondary btn-lg" onClick={() => setPricingOpen(true)}>View Pricing</button>
            </div>
            <div style={{ marginTop: 32, display: 'flex', gap: 32, justifyContent: 'center', flexWrap: 'wrap' }}>
              {['No Credit Card', 'Free Forever Plan', 'Cancel Anytime', '24/7 AI Support'].map(item => (
                <div key={item} style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, color: 'var(--text-muted)' }}>
                  <CheckCircle size={14} color="var(--success)"/> {item}
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ borderTop: '1px solid var(--border)', padding: '40px 48px' }}>
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 24 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ width: 32, height: 32, background: 'var(--gradient-primary)', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>✦</div>
            <span style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 700, fontSize: 18 }}>VerveAI</span>
          </div>
          <p style={{ fontSize: 13, color: 'var(--text-muted)' }}>© 2026 VerveAI. All rights reserved. Built with ❤️ for job seekers.</p>
          <div style={{ display: 'flex', gap: 24 }}>
            {[
              { label: 'Privacy', action: () => setAboutOpen(true) },
              { label: 'Terms', action: () => setAboutOpen(true) },
              { label: 'Support', action: () => setAboutOpen(true) },
            ].map(item => (
              <span key={item.label} onClick={item.action} style={{ fontSize: 13, color: 'var(--text-muted)', cursor: 'pointer' }}>{item.label}</span>
            ))}
          </div>
        </div>
      </footer>

      {/* Feature Detail Modal */}
      <Modal
        open={!!featureModal}
        onClose={() => setFeatureModal(null)}
        title={featureModal?.title}
        subtitle="How this feature works"
        icon={featureModal?.icon}
        maxWidth={580}
      >
        {featureModal && (
          <div>
            <div style={{ padding: '14px 16px', background: `${featureModal.color}10`, border: `1px solid ${featureModal.color}25`, borderRadius: 12, marginBottom: 20 }}>
              <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.7, margin: 0 }}>{featureModal.details.what}</p>
            </div>
            <h5 style={{ marginBottom: 12, color: 'var(--text-primary)' }}>How It Works</h5>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 20 }}>
              {featureModal.details.how.map((step, i) => (
                <div key={i} style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                  <div style={{ width: 24, height: 24, borderRadius: '50%', background: `${featureModal.color}20`, border: `1px solid ${featureModal.color}40`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700, color: featureModal.color, flexShrink: 0 }}>{i + 1}</div>
                  <span style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.6, paddingTop: 3 }}>{step}</span>
                </div>
              ))}
            </div>
            <div style={{ padding: '12px 16px', background: 'rgba(16,185,129,0.08)', border: '1px solid rgba(16,185,129,0.2)', borderRadius: 10, marginBottom: 20, display: 'flex', gap: 10 }}>
              <CheckCircle size={16} color="var(--success)" style={{ flexShrink: 0, marginTop: 2 }}/>
              <span style={{ fontSize: 13, color: 'var(--text-secondary)' }}>{featureModal.details.benefit}</span>
            </div>
            <button className="btn btn-primary" style={{ width: '100%' }} onClick={() => { setFeatureModal(null); handleGetStarted() }}>
              Try {featureModal.title} Now <ArrowRight size={16}/>
            </button>
          </div>
        )}
      </Modal>

      {/* Pricing Modal */}
      <Modal open={pricingOpen} onClose={() => setPricingOpen(false)} title="Choose Your Plan" subtitle="Start free, upgrade anytime" icon="💎" maxWidth={760}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
          {pricingPlans.map((plan, i) => (
            <div key={i} style={{
              padding: 20, borderRadius: 16,
              background: plan.highlight ? 'linear-gradient(135deg, rgba(139,92,246,0.15), rgba(6,182,212,0.08))' : 'var(--bg-glass)',
              border: `1px solid ${plan.highlight ? 'var(--primary)' : 'var(--border)'}`,
              position: 'relative'
            }}>
              {plan.highlight && (
                <div style={{ position: 'absolute', top: -10, left: '50%', transform: 'translateX(-50%)', background: 'var(--gradient-primary)', color: '#fff', fontSize: 11, fontWeight: 700, padding: '3px 12px', borderRadius: 99 }}>
                  MOST POPULAR
                </div>
              )}
              <div style={{ fontFamily: 'Outfit', fontWeight: 800, fontSize: 20, marginBottom: 4 }}>{plan.name}</div>
              <div style={{ fontSize: 28, fontWeight: 800, color: 'var(--primary-light)', marginBottom: 4 }}>
                {plan.price}<span style={{ fontSize: 13, color: 'var(--text-muted)', fontWeight: 400 }}>{plan.period}</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8, margin: '16px 0', minHeight: 160 }}>
                {plan.features.map((f, j) => (
                  <div key={j} style={{ display: 'flex', gap: 8, fontSize: 13, color: 'var(--text-secondary)' }}>
                    <CheckCircle size={13} color="var(--success)" style={{ flexShrink: 0, marginTop: 2 }}/>{f}
                  </div>
                ))}
              </div>
              <button
                className={`btn ${plan.highlight ? 'btn-primary' : 'btn-secondary'}`}
                style={{ width: '100%' }}
                onClick={() => { setPricingOpen(false); handleGetStarted() }}
              >
                {plan.cta}
              </button>
            </div>
          ))}
        </div>
      </Modal>

      {/* About Modal */}
      <Modal open={aboutOpen} onClose={() => setAboutOpen(false)} title="About VerveAI" subtitle="Intelligent Interview & Career Copilot" icon="✦" maxWidth={540}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.8 }}>
            VerveAI is a production-grade AI-powered interview preparation and career guidance platform. We combine cutting-edge NLP, computer vision, and recommendation systems to give every job seeker an unfair advantage.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            {[{ label: 'Founded', value: '2026' }, { label: 'Users', value: '50,000+' }, { label: 'Questions Generated', value: '10M+' }, { label: 'Success Rate', value: '98%' }].map((item, i) => (
              <div key={i} style={{ padding: '12px 16px', background: 'var(--bg-glass)', border: '1px solid var(--border)', borderRadius: 10 }}>
                <div style={{ fontSize: 20, fontWeight: 800, color: 'var(--primary-light)', fontFamily: 'Outfit' }}>{item.value}</div>
                <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>{item.label}</div>
              </div>
            ))}
          </div>
          <div style={{ padding: '14px 16px', background: 'rgba(139,92,246,0.08)', borderRadius: 10, border: '1px solid rgba(139,92,246,0.2)' }}>
            <div style={{ fontWeight: 600, fontSize: 13, marginBottom: 6 }}>📧 Contact Support</div>
            <div style={{ fontSize: 13, color: 'var(--text-muted)' }}>support@verveai.app · Available 24/7 via AI chat</div>
          </div>
          <button className="btn btn-primary" style={{ width: '100%' }} onClick={() => { setAboutOpen(false); handleGetStarted() }}>
            Get Started Free
          </button>
        </div>
      </Modal>
    </div>
  )
}
