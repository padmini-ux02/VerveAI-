import { useState } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { Zap, Target, CheckCircle, AlertTriangle, Clock, BookOpen, ExternalLink, ArrowRight } from 'lucide-react'
import Modal from '../../components/ui/Modal'
import ExplainBox from '../../components/ui/ExplainBox'

const currentSkills = ['Java', 'Spring Boot', 'SQL', 'React', 'Git', 'REST APIs', 'HTML/CSS']
const targetRoles = ['Backend Engineer', 'Full Stack Developer', 'DevOps Engineer', 'Data Engineer', 'Cloud Engineer']

const skillResources = {
  'Docker': {
    desc: 'Docker is a containerization platform that packages your application and all its dependencies together in the form of containers.',
    why: 'Docker is required for 85% of backend/DevOps jobs. It enables consistent deployment across environments.',
    resources: [
      { name: 'Docker Official Docs', url: 'https://docs.docker.com', free: true },
      { name: 'Docker for Beginners - Udemy', url: 'https://www.udemy.com', free: false, cost: '₹499' },
      { name: 'Play with Docker (Interactive)', url: 'https://labs.play-with-docker.com', free: true },
    ],
    time: '3 weeks', projects: ['Dockerize a Spring Boot app', 'Docker Compose for multi-container setup']
  },
  'Kubernetes': {
    desc: 'Kubernetes (K8s) is an open-source container orchestration system for automating deployment, scaling, and management of containerized applications.',
    why: 'K8s is the industry standard for managing containers at scale. Top companies like Google, Amazon, and Netflix use it extensively.',
    resources: [
      { name: 'Kubernetes.io Official Docs', url: 'https://kubernetes.io/docs/', free: true },
      { name: 'KodeKloud K8s Course', url: 'https://kodekloud.com', free: false, cost: '₹2,499' },
      { name: 'Katacoda K8s Scenarios', url: 'https://www.katacoda.com', free: true },
    ],
    time: '4 weeks', projects: ['Deploy app on Minikube', 'Set up K8s cluster on AWS EKS']
  },
  'AWS': {
    desc: 'Amazon Web Services (AWS) is the world\'s most comprehensive and broadly adopted cloud platform, offering 200+ fully featured services.',
    why: 'AWS is the #1 cloud platform globally. 60%+ of backend engineering jobs require at least basic AWS knowledge.',
    resources: [
      { name: 'AWS Free Tier Account', url: 'https://aws.amazon.com/free/', free: true },
      { name: 'A Cloud Guru AWS Course', url: 'https://acloudguru.com', free: false, cost: '₹3,000/month' },
      { name: 'AWS Skill Builder', url: 'https://skillbuilder.aws', free: true },
    ],
    time: '6 weeks', projects: ['Deploy Spring Boot app on EC2', 'Set up S3 file storage', 'Configure RDS database']
  },
  'Microservices': {
    desc: 'Microservices is an architectural style that structures an application as a collection of small, autonomous services modeled around a business domain.',
    why: 'All large-scale applications today use microservices. Understanding this architecture is essential for senior roles.',
    resources: [
      { name: 'Martin Fowler\'s Microservices Guide', url: 'https://martinfowler.com/articles/microservices.html', free: true },
      { name: 'Spring Cloud Documentation', url: 'https://spring.io/cloud', free: true },
      { name: 'Microservices with Spring Boot - Udemy', url: 'https://www.udemy.com', free: false, cost: '₹499' },
    ],
    time: '2 weeks', projects: ['Build an e-commerce microservices system', 'Implement service discovery with Eureka']
  },
  'Redis': {
    desc: 'Redis is an open-source, in-memory data structure store used as a database, cache, message broker, and streaming engine.',
    why: 'Redis dramatically improves API performance. Used by Twitter, GitHub, and Snapchat for caching and session management.',
    resources: [
      { name: 'Redis Official Docs', url: 'https://redis.io/docs/', free: true },
      { name: 'Redis University (Free)', url: 'https://university.redis.com', free: true },
      { name: 'Spring Data Redis Guide', url: 'https://spring.io/guides/gs/messaging-redis/', free: true },
    ],
    time: '1 week', projects: ['Add Redis caching to a REST API', 'Implement rate limiting with Redis']
  },
  'CI/CD': {
    desc: 'CI/CD (Continuous Integration/Continuous Deployment) is a method to frequently deliver apps to customers by introducing automation into the stages of app development.',
    why: 'CI/CD is mandatory knowledge for modern software teams. GitHub Actions and Jenkins are used in virtually every tech company.',
    resources: [
      { name: 'GitHub Actions Docs', url: 'https://docs.github.com/actions', free: true },
      { name: 'Jenkins Official Tutorials', url: 'https://www.jenkins.io/doc/tutorials/', free: true },
      { name: 'DevOps CI/CD - Coursera', url: 'https://www.coursera.org', free: false, cost: '₹1,800/month' },
    ],
    time: '2 weeks', projects: ['Set up GitHub Actions for a Java project', 'Build Jenkins pipeline with automated tests']
  },
}

const gapData = {
  'Backend Engineer': {
    missing: [
      { skill: 'Docker', priority: 'High', time: '3 weeks', resources: 3 },
      { skill: 'Kubernetes', priority: 'High', time: '4 weeks', resources: 3 },
      { skill: 'AWS', priority: 'High', time: '6 weeks', resources: 3 },
      { skill: 'Microservices', priority: 'Medium', time: '2 weeks', resources: 3 },
      { skill: 'Redis', priority: 'Medium', time: '1 week', resources: 3 },
      { skill: 'CI/CD', priority: 'Medium', time: '2 weeks', resources: 3 },
    ],
    roadmap: [
      { phase: 'Phase 1', title: 'Containerization Basics', duration: '1 month', skills: ['Docker', 'Docker Compose'], status: 'current' },
      { phase: 'Phase 2', title: 'Cloud & Orchestration', duration: '2 months', skills: ['AWS EC2/S3/RDS', 'Kubernetes basics'], status: 'upcoming' },
      { phase: 'Phase 3', title: 'Advanced Architecture', duration: '1 month', skills: ['Microservices patterns', 'Redis caching', 'API Gateway'], status: 'upcoming' },
      { phase: 'Phase 4', title: 'DevOps & Automation', duration: '1 month', skills: ['GitHub Actions CI/CD', 'Jenkins', 'Monitoring with Grafana'], status: 'upcoming' },
    ],
    matchScore: 68, totalTime: '5 months',
  }
}

const priorityColor = { High: 'var(--danger)', Medium: 'var(--warning)', Low: 'var(--success)' }

export default function SkillsPage() {
  const navigate = useNavigate()
  const [selectedRole, setSelectedRole] = useState('')
  const [analyzed, setAnalyzed] = useState(false)
  const [loading, setLoading] = useState(false)
  const [skillModal, setSkillModal] = useState(null)
  const [roadmapModal, setRoadmapModal] = useState(false)
  const [learnedSkills, setLearnedSkills] = useState({})

  const analyze = async () => {
    if (!selectedRole) { toast.error('Select a target role first'); return }
    setLoading(true)
    await new Promise(r => setTimeout(r, 1500))
    setAnalyzed(true)
    setLoading(false)
    toast.success('Skill gap analysis complete! 🎯')
  }

  const gap = gapData['Backend Engineer']

  const markLearned = (skill) => {
    setLearnedSkills(prev => ({ ...prev, [skill]: !prev[skill] }))
    toast.success(learnedSkills[skill] ? `${skill} unmarked` : `🎉 ${skill} marked as learned! +30 XP`)
  }

  return (
    <div>
      <div className="page-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 6 }}>
          <div style={{ width: 40, height: 40, background: 'rgba(34,211,238,0.15)', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Zap size={20} color="#22d3ee"/>
          </div>
          <h1 className="page-title" style={{ margin: 0 }}>Skill Gap Detection System</h1>
        </div>
        <p className="page-subtitle">Identify your missing skills and get a personalized learning roadmap to reach your target role</p>
      </div>

      {/* Config */}
      <motion.div className="card" style={{ marginBottom: 24 }} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h4 style={{ marginBottom: 20 }}>Analyze Your Skill Gap</h4>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 20 }}>
          <div>
            <label className="input-label" style={{ marginBottom: 12, display: 'block' }}>
              Your Current Skills
              <span style={{ fontSize: 11, color: 'var(--text-muted)', fontWeight: 400, marginLeft: 8 }}>Auto-extracted from resume</span>
            </label>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, padding: 16, background: 'var(--bg-glass)', borderRadius: 12, border: '1px solid var(--border)', minHeight: 80 }}>
              {currentSkills.map(s => (
                <span key={s} className="badge badge-success" style={{ fontSize: 12, padding: '5px 12px', cursor: 'default' }}>{s}</span>
              ))}
            </div>
          </div>
          <div>
            <label className="input-label" style={{ marginBottom: 12, display: 'block' }}>Select Your Target Role</label>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {targetRoles.map(role => (
                <div key={role} onClick={() => setSelectedRole(role)}
                  style={{ padding: '10px 14px', border: `1px solid ${selectedRole === role ? 'var(--primary)' : 'var(--border)'}`, borderRadius: 10, cursor: 'pointer', fontSize: 13, fontWeight: selectedRole === role ? 600 : 400, color: selectedRole === role ? 'var(--primary-light)' : 'var(--text-secondary)', background: selectedRole === role ? 'rgba(139,92,246,0.1)' : 'transparent', transition: 'all 0.2s', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  {role}
                  {selectedRole === role && <CheckCircle size={14} color="var(--primary-light)"/>}
                </div>
              ))}
            </div>
          </div>
        </div>
        <button id="analyze-skills" className="btn btn-primary" onClick={analyze} disabled={loading}>
          {loading
            ? <><div style={{ width: 14, height: 14, border: '2px solid rgba(255,255,255,0.3)', borderTopColor: '#fff', borderRadius: '50%', animation: 'spin-slow 0.8s linear infinite' }}/> Analyzing...</>
            : <><Target size={16}/> Analyze Skill Gap</>}
        </button>
      </motion.div>

      {analyzed && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          {/* Match Score Banner */}
          <div style={{ padding: '20px 24px', marginBottom: 24, borderRadius: 16, background: 'linear-gradient(135deg, rgba(139,92,246,0.15), rgba(6,182,212,0.1))', border: '1px solid rgba(139,92,246,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16 }}>
            <div>
              <div style={{ fontSize: 13, color: 'var(--text-muted)', marginBottom: 4 }}>Role Match Score — <strong style={{ color: 'var(--text-primary)' }}>Backend Engineer</strong></div>
              <div style={{ fontFamily: 'Outfit', fontWeight: 800, fontSize: 48, background: 'var(--gradient-primary)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>{gap.matchScore}%</div>
            </div>
            <div style={{ display: 'flex', gap: 32, flexWrap: 'wrap' }}>
              {[{ label: 'Skills Matched', value: currentSkills.length, color: 'var(--success)' }, { label: 'Skills Missing', value: gap.missing.length - Object.values(learnedSkills).filter(Boolean).length, color: 'var(--danger)' }, { label: 'Est. Time Left', value: gap.totalTime, color: 'var(--accent)' }].map((item, i) => (
                <div key={i} style={{ textAlign: 'center' }}>
                  <div style={{ fontFamily: 'Outfit', fontWeight: 700, fontSize: 24, color: item.color }}>{item.value}</div>
                  <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>{item.label}</div>
                </div>
              ))}
            </div>
            <button className="btn btn-secondary btn-sm" onClick={() => setRoadmapModal(true)}>
              📍 View Full Roadmap
            </button>
          </div>

          <div className="grid-2" style={{ marginBottom: 24 }}>
            {/* Missing Skills */}
            <div className="card">
              <h4 style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
                <AlertTriangle size={18} color="var(--warning)"/> Missing Skills
              </h4>
              <ExplainBox type="tip">
                Click any skill to see what it is, why you need it, and learning resources. Mark skills as learned to track your progress.
              </ExplainBox>
              {gap.missing.map((skill, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 0', borderBottom: i < gap.missing.length - 1 ? '1px solid var(--border)' : 'none', opacity: learnedSkills[skill.skill] ? 0.5 : 1 }}>
                  <div style={{ width: 10, height: 10, borderRadius: '50%', background: learnedSkills[skill.skill] ? 'var(--success)' : priorityColor[skill.priority], flexShrink: 0 }}/>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 600, fontSize: 14, textDecoration: learnedSkills[skill.skill] ? 'line-through' : 'none' }}>{skill.skill}</div>
                    <div style={{ fontSize: 12, color: 'var(--text-muted)', display: 'flex', gap: 12 }}>
                      <span><Clock size={10} style={{ display: 'inline' }}/> {skill.time}</span>
                      <span><BookOpen size={10} style={{ display: 'inline' }}/> {skill.resources} resources</span>
                    </div>
                  </div>
                  <span style={{ fontSize: 11, fontWeight: 700, color: learnedSkills[skill.skill] ? 'var(--success)' : priorityColor[skill.priority] }}>
                    {learnedSkills[skill.skill] ? '✓ Done' : skill.priority}
                  </span>
                  <div style={{ display: 'flex', gap: 6 }}>
                    <button className="btn btn-primary btn-sm" style={{ padding: '4px 10px', fontSize: 11 }} onClick={() => setSkillModal(skillResources[skill.skill] ? { ...skillResources[skill.skill], name: skill.skill } : null)}>
                      Learn
                    </button>
                    <button
                      className="btn btn-secondary btn-sm"
                      style={{ padding: '4px 8px', fontSize: 11, background: learnedSkills[skill.skill] ? 'rgba(16,185,129,0.1)' : undefined, borderColor: learnedSkills[skill.skill] ? 'var(--success)' : undefined }}
                      onClick={() => markLearned(skill.skill)}
                    >
                      {learnedSkills[skill.skill] ? '✓' : '○'}
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Roadmap */}
            <div className="card">
              <h4 style={{ marginBottom: 16 }}>📍 Learning Roadmap</h4>
              <ExplainBox type="info">
                Follow this 5-month plan to go from your current skill level to job-ready for Backend Engineer. Click "View Full Roadmap" for detailed weekly breakdown.
              </ExplainBox>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
                {gap.roadmap.map((phase, i) => (
                  <div key={i} style={{ display: 'flex', gap: 16, paddingBottom: i < gap.roadmap.length - 1 ? 20 : 0, position: 'relative' }}>
                    {i < gap.roadmap.length - 1 && <div style={{ position: 'absolute', left: 16, top: 32, bottom: 0, width: 2, background: phase.status === 'current' ? 'var(--gradient-primary)' : 'var(--border)' }}/>}
                    <div style={{ width: 32, height: 32, borderRadius: '50%', flexShrink: 0, zIndex: 1, background: phase.status === 'current' ? 'var(--gradient-primary)' : 'var(--bg-glass)', border: `2px solid ${phase.status === 'current' ? 'var(--primary)' : 'var(--border)'}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700, color: phase.status === 'current' ? '#fff' : 'var(--text-muted)' }}>
                      {i + 1}
                    </div>
                    <div style={{ flex: 1, paddingBottom: 8 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                        <span style={{ fontWeight: 700, fontSize: 14 }}>{phase.title}</span>
                        {phase.status === 'current' && <span className="badge badge-primary" style={{ fontSize: 10 }}>Start Here</span>}
                      </div>
                      <div style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 6 }}><Clock size={10} style={{ display: 'inline' }}/> {phase.duration}</div>
                      <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                        {phase.skills.map(s => <span key={s} className="badge badge-cyan" style={{ fontSize: 10 }}>{s}</span>)}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <button className="btn btn-primary btn-sm" style={{ marginTop: 16, width: '100%' }} onClick={() => setRoadmapModal(true)}>
                View Detailed Weekly Breakdown <ArrowRight size={12}/>
              </button>
            </div>
          </div>
        </motion.div>
      )}

      {/* Skill Detail Modal */}
      <Modal open={!!skillModal} onClose={() => setSkillModal(null)} title={skillModal?.name} subtitle="Learning guide & resources" icon="⚡" maxWidth={580}>
        {skillModal && (
          <div>
            <ExplainBox type="info" title="What is this skill?">
              {skillModal.desc}
            </ExplainBox>
            <ExplainBox type="warning" title="Why do you need it?">
              {skillModal.why}
            </ExplainBox>
            <h5 style={{ marginBottom: 12 }}>📚 Learning Resources</h5>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 20 }}>
              {skillModal.resources.map((r, i) => (
                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 14px', background: 'var(--bg-glass)', border: '1px solid var(--border)', borderRadius: 10 }}>
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 500 }}>{r.name}</div>
                    {!r.free && <div style={{ fontSize: 12, color: 'var(--warning)' }}>{r.cost}</div>}
                  </div>
                  <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                    {r.free && <span className="badge badge-success">Free</span>}
                    <button className="btn btn-primary btn-sm" onClick={() => window.open(r.url, '_blank')}>
                      Open <ExternalLink size={10}/>
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <h5 style={{ marginBottom: 10 }}>🚀 Practice Projects</h5>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 20 }}>
              {skillModal.projects.map((p, i) => (
                <div key={i} style={{ display: 'flex', gap: 8, fontSize: 13, color: 'var(--text-secondary)', padding: '8px 12px', background: 'var(--bg-glass)', borderRadius: 8 }}>
                  <CheckCircle size={14} color="var(--primary-light)" style={{ flexShrink: 0, marginTop: 2 }}/>{p}
                </div>
              ))}
            </div>
            <div style={{ display: 'flex', gap: 10 }}>
              <button className="btn btn-primary" style={{ flex: 1 }} onClick={() => { setSkillModal(null); navigate('/coding') }}>Practice in Coding Lab</button>
              <button className="btn btn-secondary" style={{ flex: 1 }} onClick={() => setSkillModal(null)}>Close</button>
            </div>
          </div>
        )}
      </Modal>

      {/* Full Roadmap Modal */}
      <Modal open={roadmapModal} onClose={() => setRoadmapModal(false)} title="5-Month Backend Engineer Roadmap" subtitle="Your personalized path to job readiness" icon="🗺️" maxWidth={620}>
        <ExplainBox type="info" title="How to use this roadmap">
          Follow each phase in order. Complete all resources and projects before moving to the next phase. The estimated timeline assumes 2-3 hours of daily practice.
        </ExplainBox>
        {gap.roadmap.map((phase, i) => (
          <div key={i} style={{ marginBottom: 20, padding: '16px', background: phase.status === 'current' ? 'rgba(139,92,246,0.08)' : 'var(--bg-glass)', border: `1px solid ${phase.status === 'current' ? 'rgba(139,92,246,0.3)' : 'var(--border)'}`, borderRadius: 12 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
              <div>
                <span style={{ fontWeight: 700, fontSize: 15 }}>{phase.phase}: {phase.title}</span>
                {phase.status === 'current' && <span className="badge badge-primary" style={{ marginLeft: 8 }}>Start Here</span>}
              </div>
              <span style={{ fontSize: 13, color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: 4 }}><Clock size={12}/> {phase.duration}</span>
            </div>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {phase.skills.map(s => (
                <span key={s} className="badge badge-cyan"
                  onClick={() => { setRoadmapModal(false); setSkillModal(skillResources[s] ? { ...skillResources[s], name: s } : null) }}
                  style={{ cursor: 'pointer' }}>
                  {s} →
                </span>
              ))}
            </div>
          </div>
        ))}
        <button className="btn btn-primary" style={{ width: '100%' }} onClick={() => { setRoadmapModal(false); navigate('/career') }}>
          View Related Certifications & Courses <ArrowRight size={14}/>
        </button>
      </Modal>
    </div>
  )
}
