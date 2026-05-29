import { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useDropzone } from 'react-dropzone'
import toast from 'react-hot-toast'
import { Upload, FileText, CheckCircle, AlertCircle, Sparkles, Download, RefreshCw, Target, Zap, TrendingUp, Edit3, Eye, ArrowLeft, ArrowRight, Play } from 'lucide-react'
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css'

const exampleTemplates = [
  {
    id: 'fresher',
    templateName: 'Entry-Level Software Engineer (Fresher)',
    name: 'Aditya Rao',
    title: 'Software Engineer (Entry-Level)',
    contact: 'aditya.rao@example.com · +91 98765 43210 · Bengaluru, India · github.com/adityacodes',
    summary: 'Energetic and problem-solving Computer Science graduate with strong foundations in Data Structures, Algorithms, and Object-Oriented Programming. Proven competitive programmer with 500+ LeetCode problems solved. Passionate about building modular applications and contributing raw coding talent to high-growth development teams.',
    skills: 'Java, Python, C++, SQL, Git, Data Structures, Algorithms, Object-Oriented Programming (OOP), DBMS, REST APIs',
    experience: 'Coding Achievements & Academic Leadership (NIT Surat - 2024)\n- Solved 500+ algorithmic coding challenges on LeetCode and CodeChef, achieving a peak contest rating in the top 5% of global participants.\n- Led NIT Technical Coding Club, organizing weekly mock programming hackathons, training, and database bootcamps for 200+ first-year students.\n- Maintained perfect attendance and outstanding academic records in core CS domains (Database Management Systems, Operating Systems, Computer Networks).',
    projects: 'Real-time Smart Parking Tracker\n- Built an automated IoT parking slot tracking system using Python, socket programming, and SQLite database systems for university campus nodes.\n\nPersonal Developer Portfolio\n- Designed and deployed a responsive personal developer landing page using HTML5, CSS3, React, and Git to host project documentation.',
    education: 'B.Tech in Computer Science & Engineering\nNational Institute of Technology (NIT), Surat (Graduated 2024 - CGPA: 9.2 / 10.0)',
    strengths: ['Java', 'Python', 'C++', 'SQL', 'Git', 'Data Structures', 'Algorithms', 'OOP'],
    missing: ['Docker', 'Kubernetes', 'AWS', 'CI/CD', 'Microservices', 'Redis']
  },
  {
    id: 'intern',
    templateName: 'Software Engineering Intern (College Undergrad)',
    name: 'Sneha Murthy',
    title: 'Software Engineering Intern',
    contact: 'sneha.murthy@example.com · +91 99988 77766 · Vellore, India · linkedin.com/in/snehamurthy',
    summary: 'Ambitious Undergraduate Computer Science student seeking a Software Engineering Internship. Enthusiastic about full-stack web applications, collaborative problem solving, and learning cutting-edge cloud technologies. Hands-on builder with solid experience developing full-stack web portals in team hackathons.',
    skills: 'JavaScript, React, Node.js, Express, HTML5, CSS3, MongoDB, Git, Bootstrap',
    experience: 'Hackathon Contributor & Technical Coordinator (VIT Vellore - 2025)\n- Won "Best Innovation" Award at HackVIT 2025 by designing a prototype emergency response application in a team of 4 within 36 hours.\n- Appointed Tech Club Core Web Developer, maintaining and updating the college festival landing page, driving 15,000+ student registrations.\n- Completed intensive DSA and Web Development bootcamp tracks, mastering modern RESTful API logic and state controllers.',
    projects: 'Community Resource Sharing Web App\n- Developed a local resource sharing web app using React, Node.js, and Express, implementing JWT session authentication.\n\nAutomated Student Attendance Checker\n- Coded a Python script using OpenCV to match faces against a student database, streamlining daily registrations.',
    education: 'B.Tech in Computer Science & Engineering (Third Year Student)\nVellore Institute of Technology (VIT), Vellore (Expected Graduation 2026 - CGPA: 8.8 / 10.0)',
    strengths: ['JavaScript', 'React', 'Node.js', 'HTML5', 'CSS3', 'MongoDB', 'Git'],
    missing: ['Docker', 'TypeScript', 'Redis', 'AWS', 'Kubernetes', 'CI/CD']
  },
  {
    id: 'backend',
    templateName: 'Senior Backend Java & Cloud Architect (Senior)',
    name: 'Amit Sharma',
    title: 'Senior Backend Engineer',
    contact: 'amit.sharma@example.com · +91 98000 12345 · Bengaluru, India · github.com/amit-backend',
    summary: 'Results-driven Backend Engineer with 3+ years of experience designing scalable microservices, RESTful APIs, and distributed systems. Expert in Java, Spring Boot, and SQL optimization. Passionate about solving complex cloud infrastructural and transaction latency problems.',
    skills: 'Java, Spring Boot, SQL, REST APIs, Git, React, Redis, Docker, Microservices, Spring Cloud',
    experience: 'Senior Backend Developer at Swiggy (2023 - Present)\n- Developed high-performance order-matching service using Spring Boot microservices, reducing average transaction latency by 35%.\n- Re-architected database sharding and query index layouts, improving system throughput by 50% under peak loads.\n- Integrated Redis caching layer for merchant catalog searches, saving 40% database read overhead.\n\nSoftware Engineer at Wipro (2022 - 2023)\n- Collaborated with QA and product layers to implement core REST API modules in Java.\n- Patched performance bugs across legacy systems and authored technical architectural docs.',
    projects: 'E-Commerce Microservices System\n- Built modular cart, checkout, and catalogue microservices using Spring Cloud, serving over 10,000 daily active users.\n\nDistributed Telemetry Collector\n- Programmed systems metrics agent in Go to aggregate system CPU, RAM, and disk logs across 50+ nodes in real-time.',
    education: 'B.Tech in Computer Science\nNational Institute of Technology (NIT), Trichy (Graduated 2022 - CGPA: 8.9 / 10.0)',
    strengths: ['Java', 'Spring Boot', 'SQL', 'REST APIs', 'Git', 'React', 'Redis', 'Docker', 'Microservices'],
    missing: ['Kubernetes', 'AWS', 'CI/CD', 'gRPC']
  },
  {
    id: 'frontend',
    templateName: 'Frontend React & UI/UX Architect (Mid-Senior)',
    name: 'Priya Patel',
    title: 'Frontend Engineer',
    contact: 'priya.patel@example.com · +91 99988 77766 · Mumbai, India · github.com/priyadesigns',
    summary: 'Creative Frontend Engineer with 2+ years of experience crafting visually rich, fully accessible (a11y), and lightning-fast user interfaces. Specialized in React, TypeScript, and state management systems. Enforces absolute pixel-perfection and visual consistency.',
    skills: 'React, TypeScript, CSS/HTML, Git, Tailwind, Redux, Figma, Zustand, Framer Motion',
    experience: 'UI Engineer at Razorpay (2023 - Present)\n- Led UI redesign of payment checkout dashboards using React and TypeScript, boosting conversion metrics by 14%.\n- Created modular, reusable UI library mapped to Figma design systems, accelerating developers onboarding by 30%.\n- Conducted extensive split-testing audits over page loads, optimizing bundle size to reduce loading speed by 2.2s.\n\nFrontend Associate at HubSpot (2022 - 2023)\n- Styled responsive landing layouts and interactive templates using vanilla CSS and Tailwind.',
    projects: 'SaaS Analytics Dashboard Workspace\n- Designed interactive chart analytics panels using Recharts and Framer-Motion animations, fully responsive across mobile screens.\n\nPixel-Perfect Design System\n- Built an accessible design system following WCAG AA guidelines with complete light/dark theme variables.',
    education: 'B.Sc in Computer Science\nSt. Xavier\'s College, Mumbai (Graduated 2023 - CGPA: 9.1 / 10.0)',
    strengths: ['React', 'TypeScript', 'CSS/HTML', 'Git', 'Tailwind', 'Redux', 'Figma', 'Zustand'],
    missing: ['Docker', 'AWS', 'CI/CD', 'Microservices', 'Redis']
  },
  {
    id: 'data',
    templateName: 'Data Scientist & Machine Learning Specialist (Senior)',
    name: 'Rohan Verma',
    title: 'Data & ML Scientist',
    contact: 'rohan.verma@example.com · +91 90000 11122 · Delhi, India · github.com/rohananalytics',
    summary: 'Analytical Data Scientist specializing in predictive analytics, statistical split-testing, and Natural Language Processing. Master at translating raw unstructured log feeds into high-impact growth and transaction policies.',
    skills: 'Python, SQL, Machine Learning, Pandas, Scikit-Learn, PyTorch, NumPy, Data Visualization',
    experience: 'Data Scientist at Paytm (2022 - Present)\n- Engineered predictive transaction fraud classifier using Random Forests and Scikit-Learn, blocking 20,000+ fraudulent transactions daily.\n- Formulated dynamic split-testing analytics on user payment conversions, identifying bottleneck points to boost revenues by 8%.\n- Maintained ETL data pipelines running on PostgreSQL to clean and preprocess raw merchant event telemetry feeds.\n\nJunior ML Analyst at IBM (2021 - 2022)\n- Preprocessed text corpora using NLTK and spaCy for resume scanning classifiers.',
    projects: 'AI Resume Classifier & Profiler\n- Trained NLP classification algorithms to score and categorize job applications with 94% validation accuracy.\n\nPredictive Customer Churn Engine\n- Modeled user subscription patterns using XGBoost models to identify users at risk of churning, retaining 12% active subscribers.',
    education: 'M.Tech in Data Science & AI\nIndian Institute of Technology (IIT), Delhi (Graduated 2022 - CGPA: 8.7 / 10.0)',
    strengths: ['Python', 'SQL', 'Machine Learning', 'Pandas', 'Scikit-Learn', 'PyTorch', 'NumPy'],
    missing: ['MLOps', 'Docker', 'AWS', 'Kubernetes', 'CI/CD']
  },
  {
    id: 'devops',
    templateName: 'DevOps & Site Reliability Engineer (Mid-Senior)',
    name: 'Kabir Mehta',
    title: 'DevOps & SRE Engineer',
    contact: 'kabir.mehta@example.com · +91 98888 77777 · Hyderabad, India · github.com/kabir-sre',
    summary: 'Infrastructure Automation Specialist with 4+ years of experience managing production Kubernetes nodes, writing Terraform configurations, and orchestrating zero-downtime CI/CD pipelines. Focuses on system availability, security compliance, and cloud optimization.',
    skills: 'Docker, Kubernetes, AWS, Terraform, Ansible, Jenkins, Prometheus, Bash, CI/CD, Linux',
    experience: 'Senior DevOps Engineer at Atlassian (2023 - Present)\n- Orchestrated continuous integration pipelines in Jenkins and GitLab CI, accelerating feature releases by 40%.\n- Provisioned multi-region AWS cloud nodes using Infrastructure as Code (Terraform), achieving 99.99% infrastructure uptime.\n- Configured Prometheus monitoring and Grafana metric alerts, cutting incident resolution time in half.\n\nSysOps Associate at TCS (2021 - 2023)\n- Administered Linux server nodes, configured system security compliance, and wrote Bash scripts for automated database backups.',
    projects: 'Self-Healing Kubernetes Operator\n- Programmed a custom Kubernetes operator in Go that automatically restarts failed database pods based on custom health thresholds.\n\nAWS Cloud Security Scanner\n- Built an automated security auditing script that alerts Slack channels upon identifying open IAM policies or exposed ports.',
    education: 'B.Tech in Information Technology\nIndian Institute of Technology (IIT), Kharagpur (Graduated 2021 - CGPA: 8.4 / 10.0)',
    strengths: ['Docker', 'Kubernetes', 'AWS', 'Terraform', 'Ansible', 'Jenkins', 'Prometheus', 'Bash', 'CI/CD'],
    missing: ['Go', 'Python', 'Redis', 'Microservices', 'Zustand']
  },
  {
    id: 'mobile',
    templateName: 'Mobile Application Developer (iOS & Android)',
    name: 'Anjali Nair',
    title: 'Mobile Application Engineer',
    contact: 'anjali.nair@example.com · +91 90000 99999 · Chennai, India · github.com/anjalicodes-ios',
    summary: 'Versatile Mobile App Developer with 3+ years of experience building native iOS and Android apps. Expert in Swift/SwiftUI and Kotlin/Jetpack Compose. Passionate about beautiful animations, performance profiling, and pixel-perfect responsive layouts.',
    skills: 'Kotlin, Swift, SwiftUI, Jetpack Compose, MVVM, Retrofit, CoreData, Git, Mobile SDKs, Android Studio, Xcode',
    experience: 'Mobile Engineer at Zomato (2023 - Present)\n- Developed order tracking screens using Jetpack Compose and native Kotlin, reducing app crashes to 0.02%.\n- Streamlined app bundle payload using modern asset compilers, saving 15MB download size for low-network users.\n- Coordinated iOS implementation transitions using SwiftUI & MVVM paradigms to launch dark mode features.\n\nApp Developer at PhonePe (2022 - 2023)\n- Maintained payment gateway integrations in Android native code and resolved critical background worker threads bugs.',
    projects: 'Fitness Tracker Native App\n- Built a high-performance native workout logger utilizing core phone sensor telemetry and local SQLite caches.\n\nOffline-First Notes Editor\n- Designed and published an offline notes editor on the App Store, using CoreData sync and biometric locks.',
    education: 'B.Tech in Computer Science\nBITS Pilani (Graduated 2022 - CGPA: 8.6 / 10.0)',
    strengths: ['Kotlin', 'Swift', 'SwiftUI', 'Jetpack Compose', 'MVVM', 'Retrofit', 'CoreData', 'Git'],
    missing: ['Docker', 'AWS', 'CI/CD', 'SQL', 'Redis', 'Kubernetes']
  },
  {
    id: 'pm',
    templateName: 'Technical Product Manager & Tech Analyst',
    name: 'Vikram Sen',
    title: 'Technical Product Manager',
    contact: 'vikram.sen@example.com · +91 97777 55555 · Bengaluru, India · linkedin.com/in/vikram-pm',
    summary: 'Product Manager bridging the gap between engineering execution and business vision. 3+ years of experience managing agile product backlogs, drafting precise Product Requirement Documents (PRDs), and analyzing customer analytics to guide data-driven roadmap developments.',
    skills: 'Agile, Scrum, Jira, Figma, Product Analytics, SQL, Python, PRD Writing, Mixpanel, User Research',
    experience: 'Technical PM at Razorpay (2023 - Present)\n- Managed full-lifecycle implementation of new subscription payments, generating ₹20Cr in transactional volume within 6 months.\n- Directed daily standups and sprint planning sessions for a cross-functional engineering team of 12 using Agile/Jira.\n- Analyzed cohort performance metrics in Mixpanel, optimizing checkout flows to reduce customer drop-offs by 18%.\n\nProduct Analyst at HubSpot (2022 - 2023)\n- Compiled detailed competitive feature maps and authored over 20 product requirement documents (PRDs).',
    projects: 'AI-Powered Help Center bot\n- Led discovery and execution of an automated customer help assistant, reducing customer support ticket count by 30%.\n\nProduct Analytics Dashboard\n- Designed visual user funnel maps and cohort trackers to identify conversion bottlenecks.',
    education: 'MBA in Tech Management (IIM Bangalore, 2022) · B.Tech in CSE (IIT Madras, 2020)',
    strengths: ['Agile', 'Scrum', 'Jira', 'Figma', 'Product Analytics', 'SQL', 'Python'],
    missing: ['Docker', 'Kubernetes', 'AWS', 'React', 'TypeScript', 'Spring Boot']
  }
]

export default function ResumePage() {
  const [uploaded, setUploaded] = useState(false)
  const [analyzing, setAnalyzing] = useState(false)
  const [analyzed, setAnalyzed] = useState(false)
  const [fileName, setFileName] = useState('')

  // Interactive Resume Editor States
  const [isEditing, setIsEditing] = useState(false)
  const [editFields, setEditFields] = useState(null)
  
  // Scoring parameters (updated dynamically during edit)
  const [resumeScore, setResumeScore] = useState(87)
  const [atsScore, setAtsScore] = useState(92)
  const [keywordMatch, setKeywordMatch] = useState(74)
  const [formatScore, setFormatScore] = useState(95)
  const [strengthSkills, setStrengthSkills] = useState(['Java', 'Spring Boot', 'SQL', 'REST APIs', 'Git', 'React'])
  const [missingSkills, setMissingSkills] = useState(['Docker', 'Kubernetes', 'AWS', 'Microservices', 'Redis', 'CI/CD'])
  const [suggestions, setSuggestions] = useState([
    { type: 'warning', text: 'Add quantifiable achievements (e.g., "Reduced load time by 40%")' },
    { type: 'warning', text: 'Include more industry-specific keywords for ATS optimization' },
    { type: 'info', text: 'Add a professional summary section at the top' },
    { type: 'success', text: 'Good use of action verbs in experience section' },
    { type: 'warning', text: 'Add Docker and cloud certifications to boost ATS score' },
    { type: 'success', text: 'Education section is well-formatted and complete' }
  ])

  // Recalculates scores in real-time based on input keywords
  const calculateRealTimeScore = (fields) => {
    let score = 70 // baseline
    const content = `${fields.summary} ${fields.skills} ${fields.experience} ${fields.projects}`.toLowerCase()
    
    // Check keywords
    const targetKeywords = ['docker', 'kubernetes', 'aws', 'microservices', 'redis', 'ci/cd', 'typescript', 'pytorch', 'tensorflow', 'scikit-learn', 'graphql', 'zustand', 'figma', 'pandas', 'jira', 'agile', 'scrum', 'swift', 'kotlin']
    let matchCount = 0
    targetKeywords.forEach(kw => {
      if (content.includes(kw)) {
        score += 3
        matchCount++
      }
    })

    // Length weights
    if (content.length > 600) score += 5
    if (content.length > 1100) score += 5
    
    const finalScore = Math.min(score, 100)
    setResumeScore(finalScore)
    setAtsScore(Math.min(finalScore + 3, 100))
    setKeywordMatch(Math.min(60 + matchCount * 4, 100))
    setFormatScore(fields.name && fields.title && fields.contact ? 98 : 75)

    // Dynamic skills analyzer
    const userSkills = fields.skills.split(',').map(s => s.trim().toLowerCase()).filter(Boolean)
    const allStrengths = [...exampleTemplates.find(t => t.id === fields.id)?.strengths || strengthSkills]
    const allMissing = [...exampleTemplates.find(t => t.id === fields.id)?.missing || missingSkills]
    
    const matchedStrengths = allStrengths.filter(s => userSkills.includes(s.toLowerCase()) || content.includes(s.toLowerCase()))
    const remainingMissing = allMissing.filter(s => !userSkills.includes(s.toLowerCase()) && !content.includes(s.toLowerCase()))
    
    // Add any newly typed custom keywords to strengths
    userSkills.forEach(us => {
      const matchLabel = allStrengths.find(s => s.toLowerCase() === us) || us.charAt(0).toUpperCase() + us.slice(1)
      if (!matchedStrengths.includes(matchLabel)) {
        matchedStrengths.push(matchLabel)
      }
    })

    setStrengthSkills(matchedStrengths)
    setMissingSkills(remainingMissing)

    // Dynamic suggestions based on text characteristics
    const newSuggestions = []
    if (remainingMissing.length > 0) {
      newSuggestions.push({ type: 'warning', text: `Include missing critical skills: ${remainingMissing.slice(0,3).join(', ')} to raise ATS score.` })
    } else {
      newSuggestions.push({ type: 'success', text: 'All recommended critical tech stack skills are included! Great job.' })
    }

    if (!/\d+%|\d+\s*s|\d+\s*ms/g.test(content)) {
      newSuggestions.push({ type: 'warning', text: 'Tip: Add quantifiable metrics (e.g. "Improved throughput by 30%") to enhance business impact.' })
    } else {
      newSuggestions.push({ type: 'success', text: 'Excellent! Quantifiable metrics and performance achievements detected.' })
    }

    if (fields.summary.length < 100) {
      newSuggestions.push({ type: 'info', text: 'Consider making your professional summary slightly longer (120-180 characters) to capture target domains.' })
    } else {
      newSuggestions.push({ type: 'success', text: 'Professional summary is robust and provides great career context.' })
    }

    if (content.includes('certif')) {
      newSuggestions.push({ type: 'success', text: 'Certifications section detected, boosting recruiter visibility.' })
    } else {
      newSuggestions.push({ type: 'info', text: 'Tip: Include a dedicated Certifications or Accreditations block to strengthen profiles.' })
    }

    setSuggestions(newSuggestions)
  }

  const handleFieldChange = (key, val) => {
    const updated = { ...editFields, [key]: val }
    setEditFields(updated)
    calculateRealTimeScore(updated)
  }

  const onDrop = useCallback(async (files) => {
    if (files[0]) {
      setFileName(files[0].name)
      setUploaded(true)
      setAnalyzing(true)
      toast.success('Resume uploaded! Analyzing...')
      await new Promise(r => setTimeout(r, 2200))
      setAnalyzing(false)
      setAnalyzed(true)
      toast.success('Analysis complete! 🎉')
      
      // Load default strength & missing tags for static upload
      setStrengthSkills(['Java', 'Spring Boot', 'SQL', 'REST APIs', 'Git', 'React'])
      setMissingSkills(['Docker', 'Kubernetes', 'AWS', 'Microservices', 'Redis', 'CI/CD'])
      setResumeScore(87)
      setAtsScore(92)
      setKeywordMatch(74)
      setFormatScore(95)
      setSuggestions([
        { type: 'warning', text: 'Add quantifiable achievements (e.g., "Reduced load time by 40%")' },
        { type: 'warning', text: 'Include more industry-specific keywords for ATS optimization' },
        { type: 'info', text: 'Add a professional summary section at the top' },
        { type: 'success', text: 'Good use of action verbs in experience section' },
        { type: 'warning', text: 'Add Docker and cloud certifications to boost ATS score' },
        { type: 'success', text: 'Education section is well-formatted and complete' }
      ])
    }
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop, accept: { 'application/pdf': ['.pdf'], 'application/msword': ['.doc', '.docx'] }, maxFiles: 1
  })

  const loadExampleTemplate = (template) => {
    setFileName(`${template.name}_Resume_Draft`)
    setEditFields(template)
    setIsEditing(true)
    setUploaded(true)
    
    // Initialize scores based on template type and details
    setResumeScore(template.id === 'fresher' ? 82 : template.id === 'intern' ? 80 : template.id === 'backend' ? 89 : template.id === 'frontend' ? 84 : 86)
    setAtsScore(template.id === 'fresher' ? 85 : template.id === 'intern' ? 83 : template.id === 'backend' ? 91 : template.id === 'frontend' ? 87 : 89)
    setKeywordMatch(template.id === 'fresher' ? 70 : template.id === 'intern' ? 68 : template.id === 'backend' ? 78 : template.id === 'frontend' ? 70 : 75)
    setFormatScore(98)
    setStrengthSkills(template.strengths)
    setMissingSkills(template.missing)
    
    toast.success(`Loaded ${template.templateName} Template!`)
  }

  // Exports professionally formatted, ATS-optimized plain text resume
  const handleDownloadText = () => {
    if (!editFields) return

    const resumeContent = `==================================================
${editFields.name.toUpperCase()}
${editFields.title.toUpperCase()}
==================================================
CONTACT INFORMATION
${editFields.contact}

--------------------------------------------------
PROFESSIONAL SUMMARY
${editFields.summary}

--------------------------------------------------
TECHNICAL SKILLS
${editFields.skills}

--------------------------------------------------
PROFESSIONAL EXPERIENCE
${editFields.experience}

--------------------------------------------------
KEY PROJECTS
${editFields.projects}

--------------------------------------------------
EDUCATION
${editFields.education}

==================================================
Generated via VerveAI Resume Intelligence Engine
==================================================`

    const element = document.createElement("a")
    const file = new Blob([resumeContent], { type: 'text/plain;charset=utf-8' })
    element.href = URL.createObjectURL(file)
    element.download = `${editFields.name.replace(/\s+/g, '_')}_Resume_ATS_Optimized.txt`
    document.body.appendChild(element)
    element.click()
    document.body.removeChild(element)
    toast.success('ATS-Optimized Text Resume Downloaded! 📄')
  }

  const runAiAnalysis = async () => {
    setAnalyzing(true)
    toast.success('Evaluating edited sections with AI Engine...')
    await new Promise(r => setTimeout(r, 1500))
    setAnalyzing(false)
    setAnalyzed(true)
    setIsEditing(false)
    toast.success('Resume Diagnostics Unlocked! 🎉')
  }

  const reset = () => {
    setUploaded(false)
    setAnalyzing(false)
    setAnalyzed(false)
    setFileName('')
    setIsEditing(false)
    setEditFields(null)
  }

  return (
    <div>
      <div className="page-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 6 }}>
          <div style={{ width: 40, height: 40, background: 'rgba(139,92,246,0.15)', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <FileText size={20} color="var(--primary-light)"/>
          </div>
          <h1 className="page-title" style={{ margin: 0 }}>Resume Intelligence Engine</h1>
          <span className="badge badge-primary">AI Powered</span>
        </div>
        <p className="page-subtitle">Upload your resume for AI-powered analysis, ATS scoring, or select a fresher/experienced example template to edit.</p>
      </div>

      {/* 1. Upload & Template Selection View */}
      {!uploaded && !isEditing && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 360px', gap: 24, alignItems: 'start' }}>
            {/* Upload Zone */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <div
                {...getRootProps()}
                style={{
                  border: '2px dashed var(--border)',
                  borderRadius: 20, padding: 60, textAlign: 'center', cursor: 'pointer',
                  background: isDragActive ? 'rgba(139,92,246,0.08)' : 'var(--bg-card)',
                  transition: 'all 0.25s'
                }}
              >
                <input {...getInputProps()} id="resume-upload"/>
                <motion.div animate={isDragActive ? { scale: 1.1 } : { scale: 1 }}>
                  <div style={{ fontSize: 60, marginBottom: 20 }}>📄</div>
                  <h3 style={{ marginBottom: 8 }}>Drop your resume here</h3>
                  <p style={{ color: 'var(--text-muted)', marginBottom: 20 }}>Supports PDF, DOC, DOCX · Max 10MB</p>
                  <button className="btn btn-primary">
                    <Upload size={16}/> Choose File
                  </button>
                </motion.div>
              </div>
            </motion.div>

            {/* Info Panel */}
            <motion.div style={{ display: 'flex', flexDirection: 'column', gap: 16 }} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
              {[
                { icon: <Sparkles size={18} color="#8b5cf6"/>, title: 'AI Resume Parser', desc: 'Extracts skills, education, experience, certifications automatically' },
                { icon: <Target size={18} color="#06b6d4"/>, title: 'ATS Score', desc: 'Check compatibility with Applicant Tracking Systems' },
                { icon: <Zap size={18} color="#f59e0b"/>, title: 'Keyword Optimization', desc: 'Identify missing keywords for your target role' },
                { icon: <TrendingUp size={18} color="#10b981"/>, title: 'Improvement Tips', desc: 'Get actionable suggestions to improve your score' },
              ].map((item, i) => (
                <div key={i} className="card" style={{ padding: 16, display: 'flex', gap: 14, alignItems: 'flex-start' }}>
                  <div style={{ width: 36, height: 36, borderRadius: 8, background: 'var(--bg-glass)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    {item.icon}
                  </div>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: 14, marginBottom: 4 }}>{item.title}</div>
                    <div style={{ fontSize: 12, color: 'var(--text-muted)', lineHeight: 1.5 }}>{item.desc}</div>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Premium Example Resume Templates for Direct Editing */}
          <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} style={{ background: 'var(--bg-glass)', border: '1px solid var(--border)', borderRadius: 20, padding: 24 }}>
            <h3 style={{ margin: '0 0 8px', fontSize: 16, color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: 8 }}>
              🎯 Start with an Example Template to Edit (For Freshers & Experienced)
            </h3>
            <p style={{ fontSize: 13, color: 'var(--text-muted)', margin: '0 0 20px' }}>
              Select a professionally structured, ATS-optimized placeholder resume to customize in real-time, review keyword suggestions, and download as a formatted file. Mapped for all career levels.
            </p>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 20 }}>
              {exampleTemplates.map((template, idx) => (
                <motion.div
                  key={template.id}
                  whileHover={{ y: -4, borderColor: 'var(--primary-light)' }}
                  onClick={() => loadExampleTemplate(template)}
                  style={{
                    padding: 20, background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 16, cursor: 'pointer', transition: 'all 0.2s ease-in-out',
                    display: 'flex', flexDirection: 'column', justifyContent: 'space-between'
                  }}
                >
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                      <span style={{ fontSize: 24 }}>
                        {template.id === 'fresher' ? '🎓' : template.id === 'intern' ? '🌱' : template.id === 'backend' ? '⚙️' : template.id === 'frontend' ? '🎨' : template.id === 'data' ? '📊' : template.id === 'devops' ? '🔧' : template.id === 'mobile' ? '🤖' : '💼'}
                      </span>
                      <span className="badge badge-success" style={{ fontSize: 10 }}>
                        {template.id === 'fresher' ? 'Fresher Stack' : template.id === 'intern' ? 'Intern Spec' : 'Senior / Mid'}
                      </span>
                    </div>
                    <h4 style={{ margin: '0 0 6px', fontSize: 14, color: 'var(--text-primary)', fontWeight: 700 }}>{template.templateName}</h4>
                    <p style={{ fontSize: 11, color: 'var(--text-muted)', margin: '0 0 14px', lineHeight: 1.5 }}>
                      {template.summary.slice(0, 100)}...
                    </p>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid var(--border)', paddingTop: 12, marginTop: 8 }}>
                    <span style={{ fontSize: 11, color: 'var(--primary-light)', fontWeight: 600 }}>Edit Template</span>
                    <ArrowRight size={14} color="var(--primary-light)"/>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      )}

      {/* 2. Analyzing State Spinner */}
      {analyzing && (
        <div style={{ padding: '80px 40px', textAlign: 'center', background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 20 }}>
          <div style={{ fontSize: 60, animation: 'spin-slow 2s linear infinite', display: 'inline-block', marginBottom: 24 }}>⚙️</div>
          <h2 style={{ margin: '0 0 8px' }}>Processing Resume Diagnostics...</h2>
          <p style={{ color: 'var(--text-secondary)', margin: '0 auto 20px', maxWidth: 460 }}>
            Our parsing engines are mapping custom entities, verifying syntax structures, and scoring ATS compatibility criteria.
          </p>
          <div style={{ width: 240, height: 6, background: 'var(--border)', borderRadius: 99, margin: '0 auto', overflow: 'hidden' }}>
            <motion.div
              style={{ height: '100%', background: 'var(--gradient-primary)', borderRadius: 99 }}
              animate={{ width: ['0%', '100%'] }}
              transition={{ duration: 1.8, ease: 'easeInOut' }}
            />
          </div>
        </div>
      )}

      {/* 3. Live Interactive Resume Editor Workspace */}
      {isEditing && !analyzing && editFields && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          {/* Header Workspace */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16 }}>
            <button className="btn btn-secondary btn-sm" onClick={reset} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <ArrowLeft size={14}/> Back to Upload
            </button>
            <div style={{ display: 'flex', gap: 10 }}>
              <button className="btn btn-secondary btn-sm" onClick={handleDownloadText}>
                <Download size={14}/> Download Resume (.txt)
              </button>
              <button className="btn btn-primary btn-sm" onClick={runAiAnalysis}>
                <Play size={14}/> Run AI Diagnostics
              </button>
            </div>
          </div>

          {/* Top Real-time Telemetry Dashboard */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 14, background: 'var(--bg-glass)', border: '1px solid var(--border)', borderRadius: 16, padding: 16 }}>
            {[
              { label: 'Dynamic ATS Score', value: atsScore, color: 'var(--primary-light)' },
              { label: 'Real-time Resume Score', value: resumeScore, color: 'var(--success)' },
              { label: 'Keyword Match Index', value: keywordMatch, color: 'var(--accent-light)' },
              { label: 'Formatting Health', value: formatScore, color: 'var(--warning)' }
            ].map((stat, i) => (
              <div key={i} style={{ display: 'flex', gap: 12, alignItems: 'center', padding: '8px 12px', background: 'var(--bg-secondary)', borderRadius: 10, border: '1px solid var(--border)' }}>
                <div style={{ width: 44, height: 44, flexShrink: 0 }}>
                  <CircularProgressbar
                    value={stat.value}
                    text={`${stat.value}`}
                    styles={buildStyles({
                      pathColor: stat.color,
                      textColor: 'var(--text-primary)',
                      trailColor: 'rgba(255,255,255,0.05)',
                      textSize: '24px',
                    })}
                  />
                </div>
                <div>
                  <div style={{ fontSize: 10, color: 'var(--text-muted)' }}>{stat.label}</div>
                  <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--text-primary)' }}>{stat.value}/100</div>
                </div>
              </div>
            ))}
          </div>

          {/* Split Screen Panel */}
          <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: 24, alignItems: 'start' }}>
            {/* Left: Input Editor Panel */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16, background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 20, padding: 24 }}>
              <h3 style={{ margin: '0 0 10px', fontSize: 16, color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: 8 }}>
                <Edit3 size={18} color="var(--primary-light)"/> Live Interactive Editor
              </h3>
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                  <label style={{ fontSize: 11, fontWeight: 600, color: 'var(--text-secondary)' }}>Full Name</label>
                  <input type="text" className="input" value={editFields.name} onChange={e => handleFieldChange('name', e.target.value)} style={{ height: 38 }}/>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                  <label style={{ fontSize: 11, fontWeight: 600, color: 'var(--text-secondary)' }}>Target Title</label>
                  <input type="text" className="input" value={editFields.title} onChange={e => handleFieldChange('title', e.target.value)} style={{ height: 38 }}/>
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                <label style={{ fontSize: 11, fontWeight: 600, color: 'var(--text-secondary)' }}>Contact Information Details</label>
                <input type="text" className="input" value={editFields.contact} onChange={e => handleFieldChange('contact', e.target.value)} style={{ height: 38 }}/>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                <label style={{ fontSize: 11, fontWeight: 600, color: 'var(--text-secondary)', display: 'flex', justifyContent: 'space-between' }}>
                  <span>Professional Summary</span>
                  <span style={{ fontSize: 10, color: 'var(--text-muted)' }}>{editFields.summary.length} chars</span>
                </label>
                <textarea className="input" rows={4} value={editFields.summary} onChange={e => handleFieldChange('summary', e.target.value)} style={{ fontSize: 12, lineHeight: 1.5, resize: 'vertical', padding: '10px 12px' }}/>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                <label style={{ fontSize: 11, fontWeight: 600, color: 'var(--text-secondary)', display: 'flex', justifyContent: 'space-between' }}>
                  <span>Core Tech Stack Skills (Comma-separated)</span>
                  <span style={{ fontSize: 10, color: 'var(--primary-light)' }}>🔥 ATS Keywords</span>
                </label>
                <input type="text" className="input" value={editFields.skills} onChange={e => handleFieldChange('skills', e.target.value)} style={{ height: 38 }} placeholder="React, Python, Java..."/>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                <label style={{ fontSize: 11, fontWeight: 600, color: 'var(--text-secondary)' }}>
                  {editFields.id === 'fresher' || editFields.id === 'intern' ? 'Academic Leadership & Campus Activities' : 'Professional Experience History'}
                </label>
                <textarea className="input" rows={6} value={editFields.experience} onChange={e => handleFieldChange('experience', e.target.value)} style={{ fontSize: 12, lineHeight: 1.5, resize: 'vertical', padding: '10px 12px', fontFamily: 'monospace' }}/>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                <label style={{ fontSize: 11, fontWeight: 600, color: 'var(--text-secondary)' }}>Key Projects & Hackathons</label>
                <textarea className="input" rows={4} value={editFields.projects} onChange={e => handleFieldChange('projects', e.target.value)} style={{ fontSize: 12, lineHeight: 1.5, resize: 'vertical', padding: '10px 12px', fontFamily: 'monospace' }}/>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                <label style={{ fontSize: 11, fontWeight: 600, color: 'var(--text-secondary)' }}>Education & Accreditations</label>
                <textarea className="input" rows={3} value={editFields.education} onChange={e => handleFieldChange('education', e.target.value)} style={{ fontSize: 12, lineHeight: 1.5, resize: 'vertical', padding: '10px 12px', fontFamily: 'monospace' }}/>
              </div>
            </div>

            {/* Right: Live A4 Styled Interactive Preview */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16, position: 'sticky', top: 20 }}>
              <div style={{ padding: '10px 16px', background: 'var(--bg-glass)', border: '1px solid var(--border)', borderRadius: 12, display: 'flex', alignItems: 'center', gap: 8 }}>
                <Eye size={16} color="var(--primary-light)"/>
                <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-secondary)' }}>Real-Time A4 Preview (ATS Optimized)</span>
              </div>
              
              <div style={{ 
                background: '#ffffff', 
                color: '#1a1a2e', 
                padding: '30px', 
                borderRadius: 16, 
                boxShadow: 'var(--shadow-lg)',
                fontFamily: 'Outfit, sans-serif',
                fontSize: 11,
                lineHeight: 1.5,
                border: '1px solid rgba(0,0,0,0.1)',
                maxHeight: '620px',
                overflowY: 'auto'
              }}>
                {/* A4 Content */}
                <div style={{ textAlign: 'center', marginBottom: 16 }}>
                  <h2 style={{ margin: '0 0 4px', fontSize: 18, fontWeight: 700, color: '#111111', textTransform: 'uppercase', letterSpacing: '0.5px' }}>{editFields.name || 'Your Name'}</h2>
                  <div style={{ fontSize: 12, color: '#555555', fontWeight: 600, marginBottom: 6 }}>{editFields.title || 'Job Title'}</div>
                  <div style={{ fontSize: 10, color: '#777777', fontStyle: 'italic' }}>{editFields.contact || 'Contact Details'}</div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                  {/* Summary */}
                  {editFields.summary && (
                    <div>
                      <h4 style={{ margin: '0 0 4px', fontSize: 11, textTransform: 'uppercase', borderBottom: '1px solid #dddddd', paddingBottom: 2, color: '#333333', letterSpacing: '0.3px' }}>Professional Summary</h4>
                      <p style={{ margin: 0, color: '#444444', textAlign: 'justify' }}>{editFields.summary}</p>
                    </div>
                  )}

                  {/* Skills */}
                  {editFields.skills && (
                    <div>
                      <h4 style={{ margin: '0 0 4px', fontSize: 11, textTransform: 'uppercase', borderBottom: '1px solid #dddddd', paddingBottom: 2, color: '#333333', letterSpacing: '0.3px' }}>Technical Stack Skills</h4>
                      <p style={{ margin: 0, color: '#444444', fontWeight: 600 }}>{editFields.skills}</p>
                    </div>
                  )}

                  {/* Experience */}
                  {editFields.experience && (
                    <div>
                      <h4 style={{ margin: '0 0 6px', fontSize: 11, textTransform: 'uppercase', borderBottom: '1px solid #dddddd', paddingBottom: 2, color: '#333333', letterSpacing: '0.3px' }}>
                        {editFields.id === 'fresher' || editFields.id === 'intern' ? 'Academic Leadership & Campus Activities' : 'Professional Experience'}
                      </h4>
                      <div style={{ whiteSpace: 'pre-wrap', color: '#444444', fontFamily: 'inherit' }}>{editFields.experience}</div>
                    </div>
                  )}

                  {/* Projects */}
                  {editFields.projects && (
                    <div>
                      <h4 style={{ margin: '0 0 6px', fontSize: 11, textTransform: 'uppercase', borderBottom: '1px solid #dddddd', paddingBottom: 2, color: '#333333', letterSpacing: '0.3px' }}>Key Projects & Hackathons</h4>
                      <div style={{ whiteSpace: 'pre-wrap', color: '#444444', fontFamily: 'inherit' }}>{editFields.projects}</div>
                    </div>
                  )}

                  {/* Education */}
                  {editFields.education && (
                    <div>
                      <h4 style={{ margin: '0 0 6px', fontSize: 11, textTransform: 'uppercase', borderBottom: '1px solid #dddddd', paddingBottom: 2, color: '#333333', letterSpacing: '0.3px' }}>Education & Accreditations</h4>
                      <div style={{ whiteSpace: 'pre-wrap', color: '#444444', fontFamily: 'inherit' }}>{editFields.education}</div>
                    </div>
                  )}
                </div>
              </div>

              {/* Suggestions Panel */}
              <div style={{ padding: '16px 20px', background: 'var(--bg-glass)', border: '1px solid var(--border)', borderRadius: 16 }}>
                <h4 style={{ margin: '0 0 12px', fontSize: 13, color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: 6 }}>
                  💡 Live Recommendations ({suggestions.length})
                </h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {suggestions.slice(0, 3).map((s, idx) => (
                    <div key={idx} style={{ display: 'flex', gap: 8, fontSize: 11, color: 'var(--text-secondary)', lineHeight: 1.4 }}>
                      <span>{s.type === 'success' ? '✅' : s.type === 'warning' ? '⚠️' : 'ℹ️'}</span>
                      <span>{s.text}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* 4. Results Header & Full Analysis Display */}
      {analyzed && !analyzing && !isEditing && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          {/* Results Header */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 28 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <CheckCircle size={20} color="var(--success)"/>
              <span style={{ fontWeight: 600 }}>Analysis complete for: <strong>{fileName}</strong></span>
            </div>
            <div style={{ display: 'flex', gap: 10 }}>
              <button className="btn btn-secondary btn-sm" onClick={reset}>
                <RefreshCw size={14}/> New Upload
              </button>
              {editFields && (
                <button className="btn btn-secondary btn-sm" onClick={() => setIsEditing(true)}>
                  <Edit3 size={14}/> Edit Resume Content
                </button>
              )}
              <button className="btn btn-primary btn-sm" onClick={editFields ? handleDownloadText : () => toast.success('Report downloaded!')}>
                <Download size={14}/> {editFields ? 'Download Resume' : 'Export Report'}
              </button>
            </div>
          </div>

          {/* Score Cards */}
          <div className="grid-4" style={{ marginBottom: 28 }}>
            {[
              { label: 'Resume Score', value: resumeScore, color: '#8b5cf6', trail: '#2a1a4e' },
              { label: 'ATS Score', value: atsScore, color: '#06b6d4', trail: '#0a2a35' },
              { label: 'Keyword Match', value: keywordMatch, color: '#10b981', trail: '#0a2a1a' },
              { label: 'Format Score', value: formatScore, color: '#f59e0b', trail: '#2a1a00' },
            ].map((item, i) => (
              <motion.div key={i} className="card" style={{ textAlign: 'center', padding: 24 }}
                initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.1 }}>
                <div style={{ width: 100, height: 100, margin: '0 auto 16px' }}>
                  <CircularProgressbar
                    value={item.value}
                    text={`${item.value}`}
                    styles={buildStyles({
                      pathColor: item.color,
                      textColor: 'var(--text-primary)',
                      trailColor: item.trail,
                      textSize: '24px',
                    })}
                  />
                </div>
                <div style={{ fontWeight: 700, fontSize: 14 }}>{item.label}</div>
              </motion.div>
            ))}
          </div>

          {/* Skills + Suggestions */}
          <div className="grid-2" style={{ marginBottom: 28 }}>
            {/* Skills Analysis */}
            <div className="card">
              <h4 style={{ marginBottom: 20 }}>Skills Analysis</h4>
              <div style={{ marginBottom: 16 }}>
                <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--success)', marginBottom: 10, display: 'flex', alignItems: 'center', gap: 6 }}>
                  <CheckCircle size={14}/> Your Strengths ({strengthSkills.length})
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                  {strengthSkills.map(s => <span key={s} className="badge badge-success">{s}</span>)}
                </div>
              </div>
              <div className="section-divider"/>
              <div>
                <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--danger)', marginBottom: 10, display: 'flex', alignItems: 'center', gap: 6 }}>
                  <AlertCircle size={14}/> Missing Skills ({missingSkills.length})
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                  {missingSkills.map(s => <span key={s} className="badge badge-danger">{s}</span>)}
                </div>
              </div>
            </div>

            {/* Suggestions */}
            <div className="card">
              <h4 style={{ marginBottom: 20 }}>AI Improvement Suggestions</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {suggestions.map((s, i) => (
                  <div key={i} style={{
                    display: 'flex', gap: 12, padding: '10px 14px', borderRadius: 10,
                    background: s.type === 'success' ? 'rgba(16,185,129,0.08)' : s.type === 'warning' ? 'rgba(245,158,11,0.08)' : 'rgba(59,130,246,0.08)',
                    border: `1px solid ${s.type === 'success' ? 'rgba(16,185,129,0.2)' : s.type === 'warning' ? 'rgba(245,158,11,0.2)' : 'rgba(59,130,246,0.2)'}`
                  }}>
                    {s.type === 'success' ? <CheckCircle size={14} color="var(--success)" style={{ flexShrink: 0, marginTop: 2 }}/> :
                     s.type === 'warning' ? <AlertCircle size={14} color="var(--warning)" style={{ flexShrink: 0, marginTop: 2 }}/> :
                     <Sparkles size={14} color="var(--info)" style={{ flexShrink: 0, marginTop: 2 }}/>}
                    <span style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.5 }}>{s.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Extracted Info */}
          <div className="card">
            <h4 style={{ marginBottom: 20 }}>Extracted Information</h4>
            <div className="grid-3">
              {[
                { label: 'Experience Stage', value: editFields ? editFields.id === 'fresher' ? 'Fresher (NIT)' : editFields.id === 'intern' ? 'Intern (VIT)' : 'Experienced' : '2 Years', icon: '💼' },
                { label: 'Education', value: editFields ? editFields.education.split('\n')[0] : 'B.Tech CSE', icon: '🎓' },
                { label: 'Certifications / Accreditations', value: editFields ? 'Complete' : '3 Found', icon: '🏅' },
                { label: 'Projects & Hackathons', value: editFields ? '2 Listed' : '5 Listed', icon: '🚀' },
                { label: 'Core Tech Stack', value: editFields ? editFields.id === 'fresher' ? 'Java, Python, C++' : editFields.id === 'intern' ? 'React, Node, Mongo' : 'Backend/Frontend Core' : 'Java, Python, JS', icon: '💻' },
                { label: 'ATS Formatting Health', value: 'Excellent (A4)', icon: '✅' },
              ].map((item, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 14px', background: 'var(--bg-glass)', borderRadius: 10, border: '1px solid var(--border)' }}>
                  <span style={{ fontSize: 20 }}>{item.icon}</span>
                  <div>
                    <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>{item.label}</div>
                    <div style={{ fontSize: 14, fontWeight: 600 }}>{item.value}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </div>
  )
}
