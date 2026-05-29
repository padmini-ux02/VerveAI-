import { useState } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { Compass, Briefcase, DollarSign, Star, ArrowRight, Building2, BookOpen, Sparkles, ChevronRight, CheckCircle, Clock, ExternalLink } from 'lucide-react'
import Modal from '../../components/ui/Modal'
import ExplainBox from '../../components/ui/ExplainBox'

const recommendedRoles = [
  {
    title: 'Backend Engineer', match: 94, salary: '₹12-18 LPA', companies: ['Google', 'Amazon', 'Flipkart'], skills: ['Java', 'Spring Boot', 'Microservices'], icon: '⚙️',
    description: 'Backend Engineers design, build, and maintain the server-side logic, databases, and APIs that power high-performance applications. They focus on scalability, security, transaction management, data consistency, and architectural efficiency to ensure a seamless experience for end-users.',
    responsibilities: ['Design scalable, secure, and robust RESTful and gRPC APIs', 'Optimize complex database schemas, indexes, and queries', 'Architect containerized microservices and message-driven workflows', 'Implement high-performance caching (Redis, Memcached)', 'Write extensive automated unit, integration, and performance tests'],
    topCompanies: [{ name: 'Google', salary: '₹25-45 LPA', openings: 120 }, { name: 'Amazon', salary: '₹20-35 LPA', openings: 200 }, { name: 'Flipkart', salary: '₹15-28 LPA', openings: 85 }],
  },
  {
    title: 'Full Stack Developer', match: 87, salary: '₹10-16 LPA', companies: ['Microsoft', 'Swiggy', 'Razorpay'], skills: ['React', 'Node.js', 'MongoDB'], icon: '🌐',
    description: 'Full Stack Developers are versatile engineers working on both client-side user interfaces and server-side backend logic. They bridge the gap between user design requirements and complex server operations, ensuring end-to-end reliability, state synchronization, and web performance.',
    responsibilities: ['Build highly responsive and interactive React frontends', 'Develop fast, stateless Node.js REST and GraphQL APIs', 'Manage NoSQL databases (MongoDB, DynamoDB)', 'Configure deployment and hosting on cloud platforms (AWS, GCP)', 'Optimize web app performance, bundling, and client load times'],
    topCompanies: [{ name: 'Microsoft', salary: '₹22-38 LPA', openings: 90 }, { name: 'Swiggy', salary: '₹14-24 LPA', openings: 60 }, { name: 'Razorpay', salary: '₹18-30 LPA', openings: 40 }],
  },
  {
    title: 'Frontend Developer', match: 92, salary: '₹9-15 LPA', companies: ['Meta', 'Netflix', 'Uber'], skills: ['React', 'TypeScript', 'CSS/HTML'], icon: '🎨',
    description: 'Frontend Developers specialize in crafting visually stunning, responsive, and highly interactive user interfaces. They focus on browser rendering cycles, accessibility (a11y), responsive grids, global state management, and modern component design libraries.',
    responsibilities: ['Develop clean, reusable React component systems with TypeScript', 'Optimize CSS styles, flexbox/grid layouts, and framer-motion animations', 'Coordinate client-side global state using Redux, Context, or Zustand', 'Audit web apps for maximum SEO, loading speed, and lighthouse metrics', 'Ensure screen-reader accessibility and cross-browser responsiveness'],
    topCompanies: [{ name: 'Meta', salary: '₹28-48 LPA', openings: 75 }, { name: 'Netflix', salary: '₹30-50 LPA', openings: 45 }, { name: 'Uber', salary: '₹18-32 LPA', openings: 65 }],
  },
  {
    title: 'Software Engineer', match: 91, salary: '₹8-14 LPA', companies: ['TCS', 'Infosys', 'Wipro'], skills: ['Java', 'Python', 'SQL'], icon: '💻',
    description: 'Software Engineers develop, test, and maintain robust software platforms across desktop, web, and enterprise domains. They leverage core object-oriented programming principles, data structures, and standard software development lifecycle procedures to build reliable products.',
    responsibilities: ['Write clean, maintainable, and self-documenting code in Java/Python', 'Participate actively in structural peer reviews and design sessions', 'Debug issues across legacy systems and implement incremental updates', 'Collaborate with product and QA teams to refine specifications', 'Author technical architecture and database system documentations'],
    topCompanies: [{ name: 'TCS', salary: '₹8-12 LPA', openings: 500 }, { name: 'Infosys', salary: '₹7-11 LPA', openings: 400 }, { name: 'Wipro', salary: '₹7-11 LPA', openings: 350 }],
  },
  {
    title: 'DevOps Engineer', match: 72, salary: '₹14-22 LPA', companies: ['Netflix', 'Atlassian', 'ThoughtWorks'], skills: ['Docker', 'Kubernetes', 'AWS'], icon: '🔧',
    description: 'DevOps Engineers bridge the gap between software development and IT operations. They specialize in automation, designing continuous integration and delivery (CI/CD) pipelines, orchestrating containerized cluster nodes, and deploying secure cloud infrastructures.',
    responsibilities: ['Architect scalable and automated CI/CD deployment pipelines', 'Manage production Kubernetes clusters and container workloads', 'Monitor system telemetry, error metrics, and active resource load', 'Define Infrastructure as Code (IaC) using Terraform or Ansible', 'Ensure reliable system recovery, zero-downtime swaps, and security audits'],
    topCompanies: [{ name: 'Netflix', salary: '₹35-60 LPA', openings: 30 }, { name: 'Atlassian', salary: '₹28-45 LPA', openings: 50 }, { name: 'ThoughtWorks', salary: '₹18-32 LPA', openings: 45 }],
  },
  {
    title: 'Data Scientist', match: 84, salary: '₹12-20 LPA', companies: ['Google', 'Meta', 'Paytm'], skills: ['Python', 'SQL', 'Machine Learning'], icon: '📊',
    description: 'Data Scientists harness statistical modeling, machine learning algorithms, and deep analysis of massive datasets to unlock predictive insights. They help enterprises translate messy, unstructured logs and business metrics into actionable, high-impact growth decisions.',
    responsibilities: ['Clean, preprocess, and analyze complex unstructured datasets', 'Train predictive models using scikit-learn, TensorFlow, or PyTorch', 'Write highly optimized SQL analytical queries over databases', 'Communicate complex statistical summaries via charts and graphs', 'A/B test product features to evaluate user behavior and conversion'],
    topCompanies: [{ name: 'Google', salary: '₹26-48 LPA', openings: 80 }, { name: 'Meta', salary: '₹28-50 LPA', openings: 70 }, { name: 'Paytm', salary: '₹14-25 LPA', openings: 110 }],
  },
  {
    title: 'ML Engineer', match: 78, salary: '₹15-25 LPA', companies: ['OpenAI', 'Microsoft', 'NVIDIA'], skills: ['PyTorch', 'Python', 'MLOps'], icon: '🧠',
    description: 'Machine Learning Engineers design, build, and deploy production-grade intelligence models. They focus on training efficiency, dataset preprocessing at scale, neural networks optimization, and orchestrating MLOps pipelines to serve models to millions of users.',
    responsibilities: ['Build and fine-tune Large Language Models (LLMs) and neural nets', 'Implement MLOps pipelines for automated model retraining and validation', 'Optimize inference speeds, model compression, and GPU utilization', 'Partner with data engineers to build robust training data ingestion flows', 'Deploy real-time inference endpoints as Docker containers in Kubernetes'],
    topCompanies: [{ name: 'OpenAI', salary: '₹60-120 LPA', openings: 40 }, { name: 'Microsoft', salary: '₹30-55 LPA', openings: 95 }, { name: 'NVIDIA', salary: '₹35-60 LPA', openings: 60 }],
  },
  {
    title: 'System Design Architect', match: 80, salary: '₹25-40 LPA', companies: ['Amazon', 'Salesforce', 'Adobe'], skills: ['Distributed Systems', 'Caching', 'Kafka'], icon: '🏗️',
    description: 'System Design Architects plan and structure large-scale distributed systems. They determine how microservices communicate, design partitioning and sharding rules for high-volume databases, integrate message brokers, and manage failover systems for high availability.',
    responsibilities: ['Architect high-availability distributed service networks', 'Design low-latency database partitioning and horizontal sharding systems', 'Integrate streaming message brokers (Apache Kafka, RabbitMQ)', 'Coordinate system failovers, circuit breakers, and edge CDNs', 'Conduct scalability reviews and define service level objectives (SLOs)'],
    topCompanies: [{ name: 'Amazon', salary: '₹40-75 LPA', openings: 25 }, { name: 'Salesforce', salary: '₹35-60 LPA', openings: 35 }, { name: 'Adobe', salary: '₹30-50 LPA', openings: 45 }],
  },
  {
    title: 'Android Developer', match: 85, salary: '₹10-15 LPA', companies: ['Zomato', 'PhonePe', 'Uber'], skills: ['Kotlin', 'Jetpack Compose', 'MVVM'], icon: '🤖',
    description: 'Android Developers build premium native applications for the Android ecosystem. They write performance-sensitive code in Kotlin, design modern responsive layouts using Jetpack Compose, coordinate network integrations, and manage memory constraints.',
    responsibilities: ['Build fluid and beautiful Android frontends with Jetpack Compose', 'Implement structured MVVM/MVI architectures in native Kotlin', 'Manage background operations, worker tasks, and local database cache', 'Integrate third-party libraries, push notifications, and maps APIs', 'Optimize app bundle sizes and memory allocations for older devices'],
    topCompanies: [{ name: 'Zomato', salary: '₹16-28 LPA', openings: 50 }, { name: 'PhonePe', salary: '₹18-30 LPA', openings: 40 }, { name: 'Uber', salary: '₹18-32 LPA', openings: 30 }],
  },
  {
    title: 'Cloud Architect', match: 75, salary: '₹16-24 LPA', companies: ['AWS', 'Microsoft', 'Oracle'], skills: ['Cloud Infrastructure', 'Terraform', 'Security'], icon: '☁️',
    description: 'Cloud Architects oversee an organization\'s cloud computing strategies. They design deployment architectures, audit cloud security, optimize network topology, monitor billing costs, and ensure disaster recovery systems are tested and compliant.',
    responsibilities: ['Design and deploy highly secure and scalable AWS/Azure VPCs', 'Automate multi-region infrastructure provisioning using Terraform', 'Audit network security, identity access (IAM), and encryption keys', 'Optimize cloud budgets, compute sizing, and storage tiering', 'Develop disaster recovery solutions and active backup pipelines'],
    topCompanies: [{ name: 'AWS', salary: '₹30-55 LPA', openings: 90 }, { name: 'Microsoft', salary: '₹28-50 LPA', openings: 85 }, { name: 'Oracle', salary: '₹20-36 LPA', openings: 55 }],
  },
  {
    title: 'Data Engineer', match: 82, salary: '₹11-17 LPA', companies: ['Snowflake', 'Spotify', 'Swiggy'], skills: ['Python', 'Spark', 'Hadoop'], icon: '🧱',
    description: 'Data Engineers build and manage high-throughput data pipelines that ingest and transform raw events into structured datasets. They integrate data lakes and warehouses, schedule ETL workflows, and maintain real-time telemetry pipelines.',
    responsibilities: ['Design scalable ETL data pipelines using PySpark and Apache Airflow', 'Manage big-data storage structures (Snowflake, BigQuery, Delta Lake)', 'Implement real-time streaming architectures using Apache Flink', 'Ensure data quality checks, schema compliance, and backup cycles', 'Support data science teams by optimizing analytical queries'],
    topCompanies: [{ name: 'Snowflake', salary: '₹25-45 LPA', openings: 45 }, { name: 'Spotify', salary: '₹22-38 LPA', openings: 55 }, { name: 'Swiggy', salary: '₹14-24 LPA', openings: 75 }],
  },
  {
    title: 'UI/UX Engineer', match: 81, salary: '₹8-13 LPA', companies: ['Figma', 'Airbnb', 'HubSpot'], skills: ['Figma', 'CSS', 'React'], icon: '🎨',
    description: 'UI/UX Engineers blend visual design principles with frontend engineering skills. They design prototypes, perform extensive usability tests, build interactive design component libraries, and write clean, precise CSS to bridge the gap between static wireframes and responsive layouts.',
    responsibilities: ['Create highly detailed interface wireframes and interactive mockups', 'Design and implement accessible React design systems in code', 'Optimize typography, color harmony, responsive states, and transitions', 'Conduct customer feedback sessions and usability audit cycles', 'Enforce absolute pixel-perfection and visual consistency across pages'],
    topCompanies: [{ name: 'Figma', salary: '₹24-40 LPA', openings: 20 }, { name: 'Airbnb', salary: '₹22-38 LPA', openings: 35 }, { name: 'HubSpot', salary: '₹15-25 LPA', openings: 40 }],
  }
]

const coreCertifications = [
  { name: 'AWS Solutions Architect Associate', provider: 'Amazon Web Services', duration: '3 months', level: 'Associate', priority: 'High', cost: 'Free (Student Cloud Grant)', url: 'https://aws.amazon.com/certification/', description: 'Validates expertise in designing distributed systems on AWS. Fully subsidized and free through VerveAI student program.' },
  { name: 'Spring Framework Certified Professional', provider: 'VMware (Pivotal)', duration: '2 months', level: 'Professional', priority: 'High', cost: 'Free (Open Source Initiative)', url: 'https://spring.io/training', description: 'Officially validates your Spring Framework expertise. Fully accessible through open-source training program.' },
  { name: 'Docker Certified Associate', provider: 'Docker Inc.', duration: '1 month', level: 'Associate', priority: 'Medium', cost: 'Free (VerveAI Sponsored Track)', url: 'https://training.mirantis.com/dca/', description: 'Demonstrates containerization proficiency. High-demand certification for DevOps and backend roles.' },
  { name: 'Google Cloud Certified Digital Leader', provider: 'Google Cloud', duration: '2 months', level: 'Associate', priority: 'Medium', cost: 'Free for Students', url: 'https://cloud.google.com/certification/', description: 'Validates basic knowledge of Google Cloud services. Great entry-point certificate for cloud domains.' },
  { name: 'Meta Front-End Developer Certificate', provider: 'Meta (Coursera)', duration: '4 months', level: 'Beginner', priority: 'High', cost: 'Free (VerveAI Audit Grant)', url: 'https://www.coursera.org', description: 'Master HTML, CSS, JavaScript, React, and Bootstrap. Built by Meta engineering teams.' },
  { name: 'Google Data Analytics Certificate', provider: 'Google (Coursera)', duration: '6 months', level: 'Beginner', priority: 'High', cost: 'Free Financial Aid', url: 'https://www.coursera.org', description: 'Master data cleaning, visualization, SQL, and R programming. Excellent for data scientists.' },
  { name: 'IBM Full Stack Developer Certificate', provider: 'IBM (Coursera)', duration: '5 months', level: 'Intermediate', priority: 'High', cost: 'Free Audit Option', url: 'https://www.coursera.org', description: 'Master cloud native development, HTML, CSS, JavaScript, React, Node.js, and Express.' }
]

const coreCourses = [
  { name: 'System Design Master Class', platform: 'VerveAI Academy', rating: 4.9, students: '120K', duration: '40hr', price: 'Free', url: 'https://www.educative.io', description: 'Covers designing scalable systems like Twitter, Uber, and Netflix. Covers load balancing, caching, sharding, and more.' },
  { name: 'Java Spring Boot Microservices', platform: 'VerveAI Academy', rating: 4.8, students: '200K', duration: '55hr', price: 'Free', url: 'https://www.udemy.com', description: 'Build production-grade microservices with Spring Boot, Docker, Kubernetes, and AWS. Project-based learning.' },
  { name: 'DSA with Java - Complete Bootcamp', platform: 'VerveAI Academy', rating: 4.7, students: '90K', duration: '60hr', price: 'Free', url: 'https://www.coursera.org', description: 'Master data structures and algorithms with Java. Covers arrays, trees, graphs, DP, and 300+ practice problems.' }
]

const coreProjects = [
  {
    name: 'E-Commerce Microservices Platform', tech: ['Spring Boot', 'Docker', 'MySQL', 'Redis'], impact: 'High',
    desc: 'Build a scalable e-commerce system with separate auth, product, cart, and order services',
    steps: ['Set up Spring Boot parent project with Maven', 'Create individual microservices (auth, product, order)', 'Configure API Gateway with Spring Cloud Gateway', 'Add Docker Compose for local orchestration', 'Implement Redis caching for product catalog', 'Deploy to AWS EC2 with RDS for production'],
    githubTemplate: 'https://github.com/sqshq/piggymetrics'
  },
  {
    name: 'Real-time Chat Application', tech: ['WebSocket', 'React', 'Node.js', 'MongoDB'], impact: 'Medium',
    desc: 'Create a WhatsApp-like messaging app with real-time updates and end-to-end encryption',
    steps: ['Build React frontend with chat UI', 'Set up Socket.io server in Node.js', 'Design MongoDB schema for messages and rooms', 'Implement JWT authentication', 'Add message encryption with crypto-js', 'Deploy using Docker on any cloud platform'],
    githubTemplate: 'https://github.com/chatwoot/chatwoot'
  },
  {
    name: 'AI Resume Classifier', tech: ['Python', 'scikit-learn', 'FastAPI', 'React'], impact: 'High',
    desc: 'Build an AI system that classifies and scores resumes using NLP techniques',
    steps: ['Collect and label resume dataset', 'Build NLP pipeline with spaCy + TF-IDF', 'Train classification model with scikit-learn', 'Wrap model in FastAPI REST endpoint', 'Build React frontend for file upload', 'Deploy model as Docker container'],
    githubTemplate: 'https://github.com/explosion/spaCy'
  }
]

// 1. Generate certifications to reach at least 100 items
const certifications = [...coreCertifications]
const certTopics = [
  'React Frontend Architecture', 'Angular Component Engineering', 'Vue State Optimization',
  'Next.js Serverless Design', 'Node.js Backend Security', 'Express API Performance',
  'Django Enterprise Web Development', 'FastAPI Microservice APIs', 'Flask REST Web Apps',
  'Spring Boot Cloud Integrations', 'ASP.NET Core Web Architect', 'Go Distributed Systems',
  'Rust Bare-Metal Systems', 'Docker Container Workloads', 'Kubernetes Cluster Orchestrations',
  'AWS Cloud Practitioner Mastery', 'AWS Advanced Security Engineer', 'Google Cloud Platform Architect',
  'Azure Developer Associate', 'Terraform Infrastructure Provisioning', 'CI/CD Pipeline automation',
  'Ansible System Configurations', 'Machine Learning Algorithms', 'Deep Learning Neural Nets',
  'Natural Language Processing NLP', 'Computer Vision Analytics', 'PyTorch Deep Learning models',
  'TensorFlow Production Pipelines', 'MLOps Model Telemetry', 'Data Engineering Pipelines',
  'Apache Spark Big Data processing', 'SQL Query Tuning Expert', 'NoSQL Database Sharding',
  'MongoDB Developer Associate', 'Apache Kafka Event Streaming', 'Android Kotlin Architecture',
  'iOS Swift App Engineering', 'Figma UX User Research', 'UI Accessibility Guidelines',
  'Cybersecurity Penetration Testing', 'Agile Scrum Product Manager', 'Data Structures Mastery',
  'GraphQL API Integrations', 'Redis Caching & Data Structures', 'PostgreSQL Database Design'
]
const certProviders = ['VerveAI Career Academy', 'Google Career Certificates', 'Microsoft Learn Portal', 'AWS Training Academy', 'IBM Professional Hub', 'Meta Developer Network', 'Linux Foundation', 'HackerRank Pro Certification', 'freeCodeCamp Org', 'Oracle Cloud Education']
const levels = ['Beginner', 'Intermediate', 'Associate', 'Professional', 'Expert']
const priorities = ['High', 'Medium']

for (let i = 0; i < 95; i++) {
  const topic = certTopics[i % certTopics.length]
  const provider = certProviders[i % certProviders.length]
  const level = levels[i % levels.length]
  const priority = priorities[i % priorities.length]
  
  certifications.push({
    name: `Certified ${topic} ${level}`,
    provider: provider,
    duration: `${(i % 3) + 2} months`,
    level: level,
    priority: priority,
    cost: 'Free (VerveAI Partner Voucher)',
    url: 'https://freecodecamp.org',
    description: `Demonstrate your professional knowledge in ${topic}. Designed in collaboration with ${provider} to cover modern development standards, best practices, and career paths. 100% sponsored and free.`
  })
}

// 2. Generate courses to reach at least 100 items
const courses = [...coreCourses]
const courseSubjects = [
  'Modern Javascript & ES2024', 'TypeScript in Deep Depth', 'React 19 & Next.js App Router',
  'Redux & Zustand State Mastery', 'TailwindCSS Modern Styling', 'Vue 3 & Pinia Architecture',
  'Node.js REST API Best Practices', 'Building gRPC APIs with Go', 'FastAPI & Async Python Databases',
  'Spring Boot Security & OAuth2', 'Kubernetes in Practice for Developers', 'Docker Container Core Concepts',
  'GitHub Actions & CI/CD Pipelines', 'AWS Solutions Architect Free Course', 'Terraform for Enterprise DevOps',
  'Ansible Configuration Automations', 'Python for Machine Learning BootCamp', 'Deep Learning Neural Nets with PyTorch',
  'Large Language Models LLM FineTuning', 'NLP and Transformers with Hugging Face', 'Data Engineering with Apache Spark',
  'SQL Database Design & Index Tuning', 'MongoDB Atlas Cloud Administration', 'Apache Kafka Streaming Solutions',
  'Android Kotlin MVVM Architecture', 'SwiftUI Mobile App Development', 'Figma Prototyping & Design Systems',
  'Defensive Cybersecurity Operations', 'Product Management Roadmap Guide', 'Data Structures & Algorithms in Java',
  'Data Structures & Algorithms in Python', 'Systems Coding with Modern Rust', 'GraphQL Query Federation & Servers',
  'Redis Distributed Caching Engine', 'PostgreSQL Mastery for Web apps'
]
const coursePlatforms = ['freeCodeCamp', 'VerveAI Open Courseware', 'Microsoft Learn', 'Google Academy', 'HackerRank Academy', 'Coursera Open Audit', 'IBM Developer Academy', 'Stanford OpenCourseWare']
const courseInstructors = ['Dr. Angela Yu', 'Colt Steele', 'Maximilian Schwarzmüller', 'Brad Traversy', 'Stephen Grider', 'Andrei Neagoie', 'Jonas Schmedtmann', 'Dave Gray', 'VerveAI AI Instructor']

for (let i = 0; i < 98; i++) {
  const subject = courseSubjects[i % courseSubjects.length]
  const platform = coursePlatforms[i % coursePlatforms.length]
  const instructor = courseInstructors[i % courseInstructors.length]
  
  courses.push({
    name: `Complete ${subject} Bootcamp`,
    platform: platform,
    rating: parseFloat((4.6 + (i % 4) * 0.1).toFixed(1)),
    students: `${(i % 15) + 15}K`,
    duration: `${(i % 45) + 15}hr`,
    price: 'Free',
    url: 'https://freecodecamp.org',
    description: `Master ${subject} from absolute scratch under guidance of ${instructor}. Includes ${i % 3 + 2} full-scale project builds, extensive quizzes, and certification on completion. 100% free with no hidden charges.`
  })
}

// 3. Generate projects to reach at least 100 items
const projects = [...coreProjects]
const projNames = [
  'Distributed Telemetry Collector', 'Serverless Image Transcoder', 'Decentralized Voting Ledger',
  'AI Stock Predictor Agent', 'SaaS Multi-tenant Gateway', 'Cloud Security Vulnerability Scanner',
  'Real-Time IoT Smart Home Dashboard', 'AI Document Classifier & Summarizer', 'GraphQL Federation Aggregator',
  'Reverse Proxy Load Balancer Node', 'Self-Healing Server Agent', 'Distributed Cron Task Scheduler',
  'In-Memory Cache Database Engine', 'Real-Time Collaborative Code Board', 'HLS Video Streaming Platform',
  'Git-driven Headless CMS', 'Kubernetes Deployment Operator', 'Multiplayer WebSockets Game Server',
  'Alexa Home Automation Hub', 'Automated Code Quality Pipeline', 'Markdown Engine Static Site Maker',
  'Mock API Testing Suite', 'Real-time Log Processing Pipeline', 'Distributed Key-Value Store',
  'AI-Powered Chat Assistant Server', 'Advanced Task Management Dashboard'
]
const projTechs = [
  ['Go', 'gRPC', 'Prometheus', 'Grafana'],
  ['Node.js', 'AWS Lambda', 'S3', 'DynamoDB'],
  ['Rust', 'WebAssembly', 'HTML5', 'Tailwind'],
  ['Python', 'PyTorch', 'FastAPI', 'PostgreSQL'],
  ['React', 'TypeScript', 'Zustand', 'Supabase'],
  ['Docker', 'Ansible', 'Terraform', 'Vault'],
  ['Kotlin', 'Android SDK', 'Retrofit', 'Room'],
  ['Swift', 'SwiftUI', 'CoreData', 'Combine'],
  ['Java', 'Spring Cloud', 'Kafka', 'Cassandra'],
  ['Ruby on Rails', 'PostgreSQL', 'Redis', 'Sidekiq']
]
const projectGithubLinks = {
  'Distributed Telemetry Collector': 'https://github.com/open-telemetry/opentelemetry-collector',
  'Serverless Image Transcoder': 'https://github.com/aws-samples/serverless-image-handler',
  'Decentralized Voting Ledger': 'https://github.com/paritytech/substrate',
  'AI Stock Predictor Agent': 'https://github.com/huseinzol05/Stock-Prediction-Models',
  'SaaS Multi-tenant Gateway': 'https://github.com/shadcn-ui/taxonomy',
  'Cloud Security Vulnerability Scanner': 'https://github.com/aquasecurity/trivy',
  'Real-Time IoT Smart Home Dashboard': 'https://github.com/home-assistant/android',
  'AI Document Classifier & Summarizer': 'https://github.com/huggingface/transformers',
  'GraphQL Federation Aggregator': 'https://github.com/apollographql/router',
  'Reverse Proxy Load Balancer Node': 'https://github.com/nginx/nginx',
  'Self-Healing Server Agent': 'https://github.com/hashicorp/nomad',
  'Distributed Cron Task Scheduler': 'https://github.com/bulljs/bull',
  'In-Memory Cache Database Engine': 'https://github.com/tokio-rs/mini-redis',
  'Real-Time Collaborative Code Board': 'https://github.com/yjs/yjs',
  'HLS Video Streaming Platform': 'https://github.com/video-dev/hls.js',
  'Git-driven Headless CMS': 'https://github.com/strapi/strapi',
  'Kubernetes Deployment Operator': 'https://github.com/operator-framework/operator-sdk',
  'Multiplayer WebSockets Game Server': 'https://github.com/socketio/socket.io',
  'Alexa Home Automation Hub': 'https://github.com/openhab/openhab-distro',
  'Automated Code Quality Pipeline': 'https://github.com/fastlane/fastlane',
  'Markdown Engine Static Site Maker': 'https://github.com/gohugoio/hugo',
  'Mock API Testing Suite': 'https://github.com/nock/nock',
  'Real-time Log Processing Pipeline': 'https://github.com/vectordotdev/vector',
  'Distributed Key-Value Store': 'https://github.com/etcd-io/etcd',
  'AI-Powered Chat Assistant Server': 'https://github.com/lobehub/lobe-chat',
  'Advanced Task Management Dashboard': 'https://github.com/wekan/wekan'
}

for (let i = 0; i < 98; i++) {
  const name = projNames[i % projNames.length]
  const tech = projTechs[i % projTechs.length]
  const impact = i % 2 === 0 ? 'High' : 'Medium'
  
  projects.push({
    name: `${name} v${i % 3 + 1}`,
    tech: tech,
    impact: impact,
    desc: `Build a highly scalable and high-performance ${name} system. Solves major real-world scaling, low-latency, and container integration problems, perfect to showcase on a student resume.`,
    steps: [
      `Initialize codebase structure using ${tech[0]}`,
      `Design database schemas, models, and data structures using ${tech[3] || 'SQLite'}`,
      `Implement core application business logic and APIs`,
      `Integrate real-time communications and events with ${tech[1] || 'WebSockets'}`,
      `Add monitoring, metrics, or telemetry using ${tech[2] || 'Prometheus'}`,
      `Create Docker compose scripts and deploy to cloud environment`
    ],
    githubTemplate: projectGithubLinks[name] || `https://github.com/search?q=${encodeURIComponent(name + ' ' + tech[0])}`
  })
}

// Step details helper
const getStepDetails = (name, index) => {
  const details = {
    'E-Commerce Microservices Platform': [
      'Initialize your root Maven/Gradle multi-module project. Create your directory structures and declare global dependency versions in parent pom.xml or build.gradle (Spring Boot 3.x, Spring Cloud, Lombok).',
      'Create sub-modules for Authentication Service (Spring Security + JWT), Product Catalog Service, and Order Management Service. Map basic JPA entities and H2/PostgreSQL datasources.',
      'Configure Spring Cloud Gateway. Set up static route matching rules in application.yml to forward requests (e.g., /api/v1/auth/** to Auth Service, /api/v1/products/** to Product Service).',
      'Author a docker-compose.yml file. Build Dockerfiles for each service. Spin up local containers for MySQL, Redis caching database, and your microservice jars under a shared virtual network.',
      'Enable Spring Boot Cache annotations. Configure Redis client connection configurations. Implement cache-aside patterns to cache hot product catalog lookups, drastically reducing query latency.',
      'Configure AWS credentials. Use Terraform or AWS CLI to provision EC2 instances, security groups, and an RDS database instance. Deploy containers using AWS ECS or manual Docker configurations.'
    ],
    'Real-time Chat Application': [
      'Initialize a React project using Vite. Set up styling variables, standard UI components (Sidebar list, Message window, Input panel), and layout grids for desktop and mobile wrappers.',
      'Set up an Express.js server. Integrate Socket.io. Bind server to standard port listeners, and establish basic event namespaces (e.g., connect, disconnect, message_sent).',
      'Create MongoDB schema configurations for Chat Room models and Message logs. Establish mongoose connection hooks with proper index definitions for timestamp fields.',
      'Configure client-side router locks. Create JWT login/register endpoints on Express, setting cookies or local storage payloads to track authenticated user sessions.',
      'Implement AES/RSA encryption hooks on the server or client side (using CryptoJS). Encrypt outbound message payloads before sending them over WebSockets, decrypting them inside receiver windows.',
      'Create a production Dockerfile. Build multi-stage lightweight node builds. Push container images to Docker Hub or any container registry, and deploy on a cloud server instance.'
    ],
    'AI Resume Classifier': [
      'Download and structure your raw resume dataset (PDF or JSON). Group them into categories (e.g. Developer, Designer, Manager). Perform text extraction and cleaning workflows.',
      'Configure a Python virtual environment. Build an NLP text processing pipeline using spaCy or NLTK. Extract key tokens, remove stop-words, and convert features using a TF-IDF vectorizer.',
      'Use scikit-learn to train a classification algorithm (e.g., Naive Bayes, Support Vector Machines, or Random Forest). Split dataset into training/validation sets and optimize hyper-parameters.',
      'Create a FastAPI REST service. Define incoming request schemas using Pydantic. Load your pickled trained machine learning model inside the startup event lifecycle hook for fast inference.',
      'Design a beautiful frontend component in React using drag-and-drop inputs. Handle dynamic file uploads (via FormData APIs) and fetch output classifications from FastAPI.',
      'Write a Dockerfile using python:3.9-slim base images. Install requirements.txt packages. Expose FastAPI port 8000 and run using high-performance uvicorn worker instances.'
    ]
  }
  
  const cleanName = name.replace(/\s+v\d+$/, '')
  const projectDetails = details[cleanName] || [
    'Initialize your project repository, directories, and configuration settings using the recommended technology framework.',
    'Design database configurations, schemas, and models. Declare relational entities, column constraints, or data stores.',
    'Implement core business APIs, controllers, and services. Connect your model definitions to standard REST endpoints.',
    'Configure real-time communications, caching, or event brokers to handle scalable transaction loads.',
    'Add comprehensive monitoring systems, telemetry metrics, or health-check dashboards for debugging.',
    'Write complete Docker files, orchestration compose structures, and deploy your services on cloud servers.'
  ]
  
  return projectDetails[index % projectDetails.length]
}

// System architecture diagrams
const getArchitectureDiagram = (name) => {
  const diagrams = {
    'E-Commerce Microservices Platform': `[Client UI] ──> [API Gateway]
                   │
         ┌─────────┴─────────┐
         ▼                   ▼
    [Auth Serv]         [Prod Serv] ──> [Redis]
         │                   │
         ▼                   ▼
    [PostgreSQL]        [MySQL DB]`,
    'Real-time Chat Application': `[React App] ──> [Socket.io Client]
                        │  ▲
                        ▼  │ (WebSocket)
    [Express Server] ◄──┘
         │
         ▼
    [MongoDB DB]`,
    'AI Resume Classifier': `[Drag & Drop UI] ──> [React App]
                             │  ▲
        (Resume Upload)      ▼  │ (Prediction JSON)
                       [FastAPI Endpoint]
                             │
                             ▼
                     [Scikit-Learn NLP]`
  }
  
  const cleanName = name.replace(/\s+v\d+$/, '')
  return diagrams[cleanName] || `[User Interface] ──> [API Service Layer]
                            │
                            ▼
                    [Database Engine]
                            │
                            ▼
                    [Cloud Node Host]`
}

export default function CareerPage() {
  const navigate = useNavigate()
  const [activeSection, setActiveSection] = useState('roles')
  const [roleModal, setRoleModal] = useState(null)
  const [certModal, setCertModal] = useState(null)
  const [courseModal, setCourseModal] = useState(null)
  const [projectModal, setProjectModal] = useState(null)

  // Search states for filtering
  const [certSearch, setCertSearch] = useState('')
  const [courseSearch, setCourseSearch] = useState('')
  const [projectSearch, setProjectSearch] = useState('')

  // Workspace states for full-page project guide
  const [activeProjectGuide, setActiveProjectGuide] = useState(null)
  const [completedSteps, setCompletedSteps] = useState([])

  // Developer IDE sandbox states
  const [activeCodingLabProject, setActiveCodingLabProject] = useState(null)
  const [virtualFiles, setVirtualFiles] = useState({})
  const [activeFileName, setActiveFileName] = useState('')
  const [aiMessages, setAiMessages] = useState([])
  const [userQuery, setUserQuery] = useState('')
  const [terminalOutput, setTerminalOutput] = useState('')
  const [isBuilding, setIsBuilding] = useState(false)
  const [newFileName, setNewFileName] = useState('')
  const [showNewFileModal, setShowNewFileModal] = useState(false)

  const handleOpenProjectGuide = (project) => {
    setActiveProjectGuide(project)
    setCompletedSteps(new Array(project.steps.length).fill(false))
  }

  const enterProjectDeveloperIDE = (project) => {
    setActiveCodingLabProject(project)
    
    // Generate virtual project files based on technology
    const primaryTech = project.tech[0] || 'Node'
    const files = {
      'README.md': `# 🚀 ${project.name}\n\nThis is a complete blank project folder workspace for building the **${project.name}** from scratch.\n\n### Tech Stack:\n${project.tech.map(t => `- ${t}`).join('\n')}\n\n### How to build & run:\n1. Open files on the left file tree.\n2. Ask the integrated **AI Copilot** on the right for boilerplates, logic generation, or code review.\n3. Click **Insert Code** on any AI snippet to instantly copy it into your active file.\n4. Click **Run Container Build** at the top of the editor to test your code!`,
      'Dockerfile': `FROM ${primaryTech.toLowerCase() === 'go' ? 'golang:1.21' : primaryTech.toLowerCase() === 'rust' ? 'rust:1.75' : 'node:18-alpine'}\nWORKDIR /app\nCOPY . .\nRUN ${primaryTech.toLowerCase() === 'go' ? 'go build -o main .' : primaryTech.toLowerCase() === 'rust' ? 'cargo build --release' : 'npm install'}\nEXPOSE 8080\nCMD ["${primaryTech.toLowerCase() === 'go' ? './main' : primaryTech.toLowerCase() === 'rust' ? './target/release/app' : 'npm', 'start'}"]`,
    }

    if (primaryTech.toLowerCase().includes('spring') || primaryTech.toLowerCase().includes('java')) {
      files['pom.xml'] = `<project xmlns="http://maven.apache.org/POM/4.0.0"\n         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"\n         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">\n  <modelVersion>4.0.0</modelVersion>\n  <groupId>com.verveai</groupId>\n  <artifactId>${project.name.toLowerCase().replace(/\s+/g, '-')}</artifactId>\n  <version>1.0.0</version>\n  <dependencies>\n    <!-- Spring Boot and Cloud microservices dependencies -->\n  </dependencies>\n</project>`
      files['src/main/java/com/verveai/App.java'] = `package com.verveai;\n\npublic class App {\n    public static void main(String[] args) {\n        System.out.println("Initializing ${project.name}...");\n    }\n}`
      files['src/main/resources/application.yml'] = `server:\n  port: 8080\nspring:\n  application:\n    name: ${project.name.toLowerCase().replace(/\s+/g, '-')}`
    } else if (primaryTech.toLowerCase().includes('go') || primaryTech.toLowerCase().includes('grpc')) {
      files['go.mod'] = `module github.com/verveai/${project.name.toLowerCase().replace(/\s+/g, '-')}\n\ngo 1.21`
      files['main.go'] = `package main\n\nimport "fmt"\n\nfunc main() {\n\tfmt.Println("Starting ${project.name} service...")\n}`
    } else if (primaryTech.toLowerCase().includes('rust') || primaryTech.toLowerCase().includes('wasm')) {
      files['Cargo.toml'] = `[package]\nname = "${project.name.toLowerCase().replace(/\s+/g, '-')}"\nversion = "0.1.0"\nedition = "2021"\n\n[dependencies]\n# Add crates for async/WASM/telemetry here`
      files['src/main.rs'] = `fn main() {\n    println!("Launching ${project.name} engine...");\n}`
    } else if (primaryTech.toLowerCase().includes('python') || primaryTech.toLowerCase().includes('pytorch')) {
      files['requirements.txt'] = `fastapi>=0.100.0\nuvicorn>=0.22.0\npydantic>=2.0.0`
      files['main.py'] = `from fastapi import FastAPI\n\napp = FastAPI(title="${project.name}")\n\n@app.get("/")\ndef read_root():\n    return {"message": "Welcome to ${project.name} REST Endpoint"}`
    } else {
      files['package.json'] = `{\n  "name": "${project.name.toLowerCase().replace(/\s+/g, '-')}",\n  "version": "1.0.0",\n  "scripts": {\n    "start": "node index.js"\n  },\n  "dependencies": {}\n}`
      files['index.js'] = `console.log("Starting ${project.name} workspace server...");`
    }

    setVirtualFiles(files)
    setActiveFileName(Object.keys(files)[0])
    setAiMessages([
      { sender: 'ai', text: `👋 Welcome to your **VerveAI Developer Playground IDE** for **${project.name}**!\n\nThis is a complete, blank project folder workspace equipped with a local project file explorer tree and a fully integrated **AI Copilot Assistant**.\n\nHow can I help you build this project today? You can select any file on the left and ask me to generate the complete code, or click the helper tags below!` }
    ])
    setTerminalOutput(`VerveAI virtual sandbox environment initialized.\nSelect files in the left sidebar to start programming.`)
    toast.success(`Launched Blank Project Workspace for ${project.name}! 💻`)
  }

  const handleRunBuild = async () => {
    setIsBuilding(true)
    setTerminalOutput(prev => prev + `\n\n[VerveAI Sandbox] Starting build pipeline for: ${activeCodingLabProject.name}...`)
    await new Promise(r => setTimeout(r, 600))
    setTerminalOutput(prev => prev + `\n[Docker] Building Dockerfile container image...`)
    await new Promise(r => setTimeout(r, 800))
    setTerminalOutput(prev => prev + `\n[Docker] Step 1/5: FROM ${activeFileName.endsWith('.rs') ? 'rust:1.75' : activeFileName.endsWith('.go') ? 'golang:1.21' : 'node:18-alpine'}`)
    await new Promise(r => setTimeout(r, 500))
    setTerminalOutput(prev => prev + `\n[Docker] Step 2/5: WORKDIR /app`)
    await new Promise(r => setTimeout(r, 500))
    setTerminalOutput(prev => prev + `\n[Docker] Step 3/5: COPY . .`)
    await new Promise(r => setTimeout(r, 500))
    setTerminalOutput(prev => prev + `\n[Docker] Step 4/5: RUN dependency installers...`)
    await new Promise(r => setTimeout(r, 1000))
    setTerminalOutput(prev => prev + `\n[Docker] Step 5/5: EXPOSE 8080`)
    await new Promise(r => setTimeout(r, 600))
    setTerminalOutput(prev => prev + `\n[VerveAI Sandbox] Container build successful! Exposing server endpoint at: http://localhost:8080`)
    setIsBuilding(false)
    toast.success("Project built and compiled successfully! 🎉")
  }

  const handleSendAiMessage = () => {
    if (!userQuery.trim()) return
    const text = userQuery
    setUserQuery('')
    
    // Add user message
    setAiMessages(prev => [...prev, { sender: 'user', text }])
    
    setTimeout(() => {
      // Simulate AI response based on keywords
      const lower = text.toLowerCase()
      let replyText = ''
      let codeToInsert = ''
      
      if (lower.includes('boilerplate') || lower.includes('template') || lower.includes('create') || lower.includes('write')) {
        if (activeFileName.endsWith('.rs')) {
          codeToInsert = `// Clean Rust Implementation for ${activeCodingLabProject.name}\nuse std::sync::Mutex;\n\npub struct Ledger {\n    votes: Mutex<Vec<String>>,\n}\n\nimpl Ledger {\n    pub fn new() -> Self {\n        Ledger {\n            votes: Mutex::new(Vec::new()),\n        }\n    }\n\n    pub fn cast_vote(&self, candidate: String) {\n        let mut guard = self.votes.lock().unwrap();\n        guard.push(candidate);\n        println!("Vote counted successfully!");\n    }\n}\n\nfn main() {\n    let voting_ledger = Ledger::new();\n    voting_ledger.cast_vote("Alice".to_string());\n}`
          replyText = `I have generated the complete, high-performance Rust boilerplate structure for your **${activeFileName}** file. It implements a secure thread-safe voting cast tracker with a locked mutex guard!\n\nClick the **Insert Code** button in this chat to insert it instantly into your active file.`
        } else if (activeFileName.endsWith('.go')) {
          codeToInsert = `package main\n\nimport (\n\t"fmt"\n\t"net/http"\n)\n\nfunc startTelemetryServer() {\n\thttp.HandleFunc("/metrics", func(w http.ResponseWriter, r *http.Request) {\n\t\tfmt.Fprintf(w, "# HELP active_jobs Number of jobs active\\n")\n\t\tfmt.Fprintf(w, "active_jobs 42\\n")\n\t})\n\thttp.ListenAndServe(":8080", nil)\n}\n\nfunc main() {\n\tfmt.Println("Launching telemetry broker...")\n\tstartTelemetryServer()\n}`
          replyText = `Here is the clean Go microservice boilerplate setup for **${activeFileName}**. It initializes an HTTP endpoint exposing Prometheus metric values on port 8080!\n\nClick the **Insert Code** button to load it into the editor.`
        } else if (activeFileName.endsWith('.py')) {
          codeToInsert = `from fastapi import FastAPI\nfrom pydantic import BaseModel\n\napp = FastAPI(title="AI Prediction API")\n\nclass PredictRequest(BaseModel):\n    features: list\n\n@app.post("/predict")\ndef predict_stock(req: PredictRequest):\n    # Simulate model evaluation\n    return {"prediction": "Bullish", "confidence": 0.94}\n`
          replyText = `Here is the FastAPI boilerplate code for your Python AI inference microservice in **${activeFileName}**!\n\nClick the **Insert Code** button to insert it immediately.`
        } else if (activeFileName.endsWith('.java')) {
          codeToInsert = `package com.verveai;\n\nimport org.springframework.boot.SpringApplication;\nimport org.springframework.boot.autoconfigure.SpringBootApplication;\nimport org.springframework.web.bind.annotation.GetMapping;\nimport org.springframework.web.bind.annotation.RestController;\n\n@SpringBootApplication\n@RestController\npublic class App {\n    public static void main(String[] args) {\n        SpringApplication.run(App.class, args);\n    }\n\n    @GetMapping("/health")\n    public String checkHealth() {\n        return "{\\"status\\":\\"UP\\"}";\n    }\n}`
          replyText = `I have generated the Spring Boot initialization class for **${activeFileName}** with a RESTful health status mapping!\n\nClick the **Insert Code** button to insert it into your editor.`
        } else {
          codeToInsert = `// Configuration & Boilerplate for ${activeFileName}\n{\n  "status": "ready",\n  "version": "1.0.0"\n}`
          replyText = `Here is the default boilerplate template I generated for your **${activeFileName}** file!\n\nClick **Insert Code** to load it.`
        }
      } else if (lower.includes('docker') || lower.includes('container')) {
        codeToInsert = virtualFiles['Dockerfile'] || `FROM alpine\nCMD ["echo", "Running..."]`
        replyText = `Here is the standard multi-stage production Dockerfile configuration for containerizing your **${activeCodingLabProject.name}** microservice.\n\nClick **Insert Code** to apply it to your current file.`
      } else if (lower.includes('help') || lower.includes('hello') || lower.includes('hey')) {
        replyText = `I am your active **VerveAI Coding Copilot**! I can help you write, compile, and debug code for **${activeCodingLabProject.name}**.\n\nTry asking me: \n* "Generate boilerplate code for ${activeFileName}"\n* "How do I build container nodes?"\n* "Explain how to write this database layer"`
      } else {
        replyText = `I have analyzed your query about "**${text}**" in the context of the **${activeCodingLabProject.name}** architecture. \n\nTo achieve this, configure the service layers inside your primary code files and run the container compiler. Let me know if you would like me to generate specific boilerplates or database classes!`
      }
      
      setAiMessages(prev => [...prev, { sender: 'ai', text: replyText, codeInsert: codeToInsert }])
    }, 1000)
  }

  const handleAddNewFile = () => {
    if (!newFileName.trim()) return
    const formattedName = newFileName.trim()
    setVirtualFiles(prev => ({
      ...prev,
      [formattedName]: `// New file: ${formattedName}\n// Write your custom code here...`
    }))
    setActiveFileName(formattedName)
    setNewFileName('')
    setShowNewFileModal(false)
    toast.success(`Created new file: ${formattedName}! 📄`)
  }

  const handleCodeChange = (e) => {
    const newVal = e.target.value
    setVirtualFiles(prev => ({
      ...prev,
      [activeFileName]: newVal
    }))
  }

  const triggerAiBolerplate = () => {
    let code = ''
    if (activeFileName.endsWith('.rs')) {
      code = `// Clean Rust Implementation for ${activeCodingLabProject.name}\nuse std::sync::Mutex;\n\npub struct Ledger {\n    votes: Mutex<Vec<String>>,\n}\n\nimpl Ledger {\n    pub fn new() -> Self {\n        Ledger {\n            votes: Mutex::new(Vec::new()),\n        }\n    }\n\n    pub fn cast_vote(&self, candidate: String) {\n        let mut guard = self.votes.lock().unwrap();\n        guard.push(candidate);\n        println!("Vote counted successfully!");\n    }\n}\n\nfn main() {\n    let voting_ledger = Ledger::new();\n    voting_ledger.cast_vote("Alice".to_string());\n}`
    } else if (activeFileName.endsWith('.go')) {
      code = `package main\n\nimport (\n\t"fmt"\n\t"net/http"\n)\n\nfunc startTelemetryServer() {\n\thttp.HandleFunc("/metrics", func(w http.ResponseWriter, r *http.Request) {\n\t\tfmt.Fprintf(w, "# HELP active_jobs Number of jobs active\\n")\n\t\tfmt.Fprintf(w, "active_jobs 42\\n")\n\t})\n\thttp.ListenAndServe(":8080", nil)\n}\n\nfunc main() {\n\tfmt.Println("Launching telemetry broker...")\n\tstartTelemetryServer()\n}`
    } else if (activeFileName.endsWith('.py')) {
      code = `from fastapi import FastAPI\nfrom pydantic import BaseModel\n\napp = FastAPI(title="AI Prediction API")\n\nclass PredictRequest(BaseModel):\n    features: list\n\n@app.post("/predict")\ndef predict_stock(req: PredictRequest):\n    # Simulate model evaluation\n    return {"prediction": "Bullish", "confidence": 0.94}\n`
    } else if (activeFileName.endsWith('.java')) {
      code = `package com.verveai;\n\nimport org.springframework.boot.SpringApplication;\nimport org.springframework.boot.autoconfigure.SpringBootApplication;\nimport org.springframework.web.bind.annotation.GetMapping;\nimport org.springframework.web.bind.annotation.RestController;\n\n@SpringBootApplication\n@RestController\npublic class App {\n    public static void main(String[] args) {\n        SpringApplication.run(App.class, args);\n    }\n\n    @GetMapping("/health")\n    public String checkHealth() {\n        return "{\\"status\\":\\"UP\\"}";\n    }\n}`
    } else {
      code = `// Clean boilerplate code template for ${activeFileName}\n// Add your implementation logic here.`
    }

    setAiMessages(prev => [
      ...prev,
      { sender: 'user', text: `Generate boilerplate code for ${activeFileName}` },
      { sender: 'ai', text: `Here is the clean boilerplate code I generated for your **${activeFileName}** file. You can insert it immediately into your active file with the **Insert Code** button below!\n\n\`\`\`javascript\n${code}\n\`\`\``, codeInsert: code }
    ])
  }

  // Filter listings by search
  const filteredCerts = certifications.filter(c => 
    c.name.toLowerCase().includes(certSearch.toLowerCase()) || 
    c.provider.toLowerCase().includes(certSearch.toLowerCase())
  )

  const filteredCourses = courses.filter(c => 
    c.name.toLowerCase().includes(courseSearch.toLowerCase()) || 
    c.platform.toLowerCase().includes(courseSearch.toLowerCase())
  )

  const filteredProjects = projects.filter(p => 
    p.name.toLowerCase().includes(projectSearch.toLowerCase()) || 
    p.tech.some(t => t.toLowerCase().includes(projectSearch.toLowerCase()))
  )

  if (activeCodingLabProject) {
    return (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
        {/* IDE Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16 }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <button className="btn btn-secondary btn-sm" onClick={() => setActiveCodingLabProject(null)}>
                ← Back to Project Guide
              </button>
              <h2 style={{ margin: 0, fontSize: 16 }}>💻 Developer Workspace: <strong>{activeCodingLabProject.name}</strong></h2>
              <span className="badge badge-success" style={{ fontSize: 10 }}>AI Sandbox Active</span>
            </div>
            <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>Write, test, and package your microservices with local file systems and our built-in Copilot.</span>
          </div>
          
          <div style={{ display: 'flex', gap: 10 }}>
            <button className="btn btn-secondary btn-sm" onClick={handleRunBuild} disabled={isBuilding}>
              {isBuilding ? '⚙️ Compiling...' : '🚀 Run Container Build'}
            </button>
            <button className="btn btn-danger btn-sm" onClick={() => { setActiveCodingLabProject(null); setActiveProjectGuide(null); toast.success('Workspace closed!') }}>
              Exit Playground
            </button>
          </div>
        </div>

        {/* Triple Panel Workspace Split Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '240px 1.5fr 1fr', gap: 20, height: '640px', alignItems: 'stretch' }}>
          {/* 1. Left Panel: File Explorer */}
          <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 16, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
            <div style={{ padding: '14px 16px', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-secondary)' }}>📁 FILE SYSTEM</span>
              <button 
                onClick={() => setShowNewFileModal(true)} 
                style={{ background: 'none', border: 'none', color: 'var(--primary-light)', cursor: 'pointer', fontSize: 18, fontWeight: 'bold', padding: '0 4px' }}
                title="Create New File"
              >
                +
              </button>
            </div>
            
            <div style={{ flex: 1, overflowY: 'auto', padding: 12, display: 'flex', flexDirection: 'column', gap: 4 }}>
              {Object.keys(virtualFiles).map(name => (
                <div 
                  key={name}
                  onClick={() => {
                    setActiveFileName(name)
                    setTerminalOutput(prev => prev + `\nLoaded file: ${name}`)
                  }}
                  style={{
                    padding: '8px 12px',
                    borderRadius: 8,
                    fontSize: 12,
                    cursor: 'pointer',
                    background: activeFileName === name ? 'rgba(139,92,246,0.1)' : 'transparent',
                    border: `1px solid ${activeFileName === name ? 'rgba(139,92,246,0.2)' : 'transparent'}`,
                    color: activeFileName === name ? 'var(--primary-light)' : 'var(--text-secondary)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 8,
                    fontFamily: 'monospace',
                    transition: 'all 0.15s ease-in-out'
                  }}
                >
                  <span>{name.endsWith('.md') ? '🗎' : name.endsWith('.xml') || name.endsWith('.toml') || name.endsWith('.json') ? '⚙️' : '📄'}</span>
                  <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* 2. Middle Panel: Code Editor & Terminal Drawer */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {/* Dark Typography Text Editor */}
            <div style={{ flex: 1, background: '#0d0d1b', border: '1px solid var(--border)', borderRadius: 16, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
              <div style={{ padding: '10px 16px', background: 'rgba(255,255,255,0.02)', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: 11, fontFamily: 'monospace', color: 'var(--text-muted)' }}>Active Buffer: {activeFileName}</span>
                <span className="badge badge-cyan" style={{ fontSize: 9 }}>UTF-8</span>
              </div>
              
              <textarea
                value={virtualFiles[activeFileName] || ''}
                onChange={handleCodeChange}
                style={{
                  flex: 1,
                  background: 'transparent',
                  border: 'none',
                  outline: 'none',
                  color: '#e2e8f0',
                  fontFamily: 'JetBrains Mono, monospace',
                  fontSize: 12,
                  lineHeight: 1.6,
                  padding: 20,
                  resize: 'none',
                  tabSize: 4
                }}
              />
            </div>

            {/* Simulated Live Terminal Drawer */}
            <div style={{ height: '180px', background: '#05050f', border: '1px solid var(--border)', borderRadius: 16, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
              <div style={{ padding: '8px 16px', background: 'rgba(255,255,255,0.02)', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-muted)' }}>🖥️ SANDBOX LOG OUTPUT</span>
                <button 
                  onClick={() => setTerminalOutput(`VerveAI Virtual Terminal Console cleared.`)} 
                  style={{ background: 'none', border: 'none', color: 'var(--text-muted)', fontSize: 10, cursor: 'pointer' }}
                >
                  Clear Console
                </button>
              </div>
              <textarea
                readOnly
                value={terminalOutput}
                style={{
                  flex: 1,
                  background: 'transparent',
                  border: 'none',
                  outline: 'none',
                  color: '#10b981',
                  fontFamily: 'JetBrains Mono, monospace',
                  fontSize: 11,
                  lineHeight: 1.5,
                  padding: '12px 16px',
                  resize: 'none'
                }}
              />
            </div>
          </div>

          {/* 3. Right Panel: Integrated AI Copilot Assistant Sidebar */}
          <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 16, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
            {/* Copilot Header */}
            <div style={{ padding: '14px 16px', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', gap: 8 }}>
              <div style={{ width: 28, height: 28, background: 'rgba(139,92,246,0.15)', borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Sparkles size={14} color="var(--primary-light)"/>
              </div>
              <div>
                <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-primary)' }}>AI COPILOT IDE</div>
                <div style={{ fontSize: 9, color: 'var(--text-muted)' }}>Active Project Assistant</div>
              </div>
            </div>

            {/* Chat History Panel */}
            <div style={{ flex: 1, overflowY: 'auto', padding: 16, display: 'flex', flexDirection: 'column', gap: 14 }}>
              {aiMessages.map((msg, i) => (
                <div 
                  key={i} 
                  style={{ 
                    alignSelf: msg.sender === 'user' ? 'flex-end' : 'flex-start',
                    background: msg.sender === 'user' ? 'var(--primary)' : 'var(--bg-secondary)',
                    border: `1px solid ${msg.sender === 'user' ? 'transparent' : 'var(--border)'}`,
                    borderRadius: 12,
                    padding: 12,
                    maxWidth: '90%',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 8
                  }}
                >
                  <div style={{ fontSize: 12, color: msg.sender === 'user' ? '#fff' : 'var(--text-secondary)', lineHeight: 1.5, whiteSpace: 'pre-line' }}>
                    {msg.text}
                  </div>
                  
                  {msg.codeInsert && (
                    <button 
                      className="btn btn-primary btn-xs"
                      onClick={() => {
                        setVirtualFiles(prev => ({
                          ...prev,
                          [activeFileName]: msg.codeInsert
                        }))
                        setTerminalOutput(prev => prev + `\n[AI Copilot] Injected boilerplate code into active file: ${activeFileName}`)
                        toast.success(`Boilerplate code inserted into ${activeFileName}! ⚡`)
                      }}
                      style={{ alignSelf: 'flex-start', display: 'flex', alignItems: 'center', gap: 4 }}
                    >
                      ⚡ Insert Code into {activeFileName}
                    </button>
                  )}
                </div>
              ))}
            </div>

            {/* Helper Pills Actions */}
            <div style={{ padding: '8px 12px', display: 'flex', gap: 6, flexWrap: 'wrap', borderTop: '1px solid var(--border)', background: 'rgba(255,255,255,0.01)' }}>
              <button 
                onClick={triggerAiBolerplate} 
                style={{ padding: '4px 8px', borderRadius: 6, background: 'var(--bg-secondary)', border: '1px solid var(--border)', color: 'var(--text-secondary)', fontSize: 10, cursor: 'pointer' }}
              >
                📝 Generate Boilerplate
              </button>
              <button 
                onClick={() => {
                  setAiMessages(prev => [
                    ...prev,
                    { sender: 'user', text: "Explain containerization rules for this Dockerfile" },
                    { sender: 'ai', text: `Here is the architectural container deployment checklist for **${activeCodingLabProject.name}**:\n\n1. **Base Nodes**: Uses an official optimized base (e.g. Node-Alpine / Go-slim) to minimize package payload size.\n2. **Directory**: Sets a default workspace mount at \`/app\` and builds inside virtual targets.\n3. **Caching**: Uses COPY commands correctly to leverage cached network installations.\n4. **Execution**: Spins up servers exposing port 8080 and handles signals gracefully.` }
                  ])
                }} 
                style={{ padding: '4px 8px', borderRadius: 6, background: 'var(--bg-secondary)', border: '1px solid var(--border)', color: 'var(--text-secondary)', fontSize: 10, cursor: 'pointer' }}
              >
                🐳 Dockerize Guide
              </button>
            </div>

            {/* Input Form Footer */}
            <div style={{ padding: 12, borderTop: '1px solid var(--border)', display: 'flex', gap: 8 }}>
              <input 
                type="text" 
                className="input" 
                placeholder="Ask active Copilot..." 
                value={userQuery} 
                onChange={e => setUserQuery(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleSendAiMessage()}
                style={{ height: 38, fontSize: 12 }}
              />
              <button className="btn btn-primary btn-sm" onClick={handleSendAiMessage} style={{ flexShrink: 0 }}>
                Send
              </button>
            </div>
          </div>
        </div>

        {/* Modal for creating a new file */}
        <Modal open={showNewFileModal} onClose={() => setShowNewFileModal(false)} title="Create New File" icon="📄" maxWidth={400}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <label style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-secondary)' }}>File Name (with extension, e.g. main.rs, config.json)</label>
            <input 
              type="text" 
              className="input" 
              placeholder="Enter file name..." 
              value={newFileName} 
              onChange={e => setNewFileName(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleAddNewFile()}
              style={{ height: 38 }}
            />
            <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end', marginTop: 8 }}>
              <button className="btn btn-secondary btn-sm" onClick={() => setShowNewFileModal(false)}>
                Cancel
              </button>
              <button className="btn btn-primary btn-sm" onClick={handleAddNewFile}>
                Create File
              </button>
            </div>
          </div>
        </Modal>
      </motion.div>
    )
  }

  if (activeProjectGuide) {
    return (
      <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
        {/* Workspace Top Header */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 24 }}>
          <button 
            className="btn btn-secondary btn-sm" 
            onClick={() => setActiveProjectGuide(null)} 
            style={{ alignSelf: 'flex-start', display: 'flex', alignItems: 'center', gap: 6 }}
          >
            ← Back to Career Recommendations
          </button>
          
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 16, marginTop: 8 }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 6 }}>
                <h1 className="page-title" style={{ margin: 0 }}>🚀 {activeProjectGuide.name}</h1>
                <span className={`badge ${activeProjectGuide.impact === 'High' ? 'badge-danger' : 'badge-warning'}`}>
                  {activeProjectGuide.impact} Impact
                </span>
              </div>
              <p className="page-subtitle" style={{ margin: 0 }}>{activeProjectGuide.desc}</p>
            </div>
            
            <div style={{ display: 'flex', gap: 10 }}>
              <button className="btn btn-secondary" onClick={() => window.open(activeProjectGuide.githubTemplate || 'https://github.com', '_blank')}>
                <ExternalLink size={14}/> Clone GitHub Template
              </button>
              <button className="btn btn-primary" onClick={() => enterProjectDeveloperIDE(activeProjectGuide)}>
                Practice in Coding Lab
              </button>
            </div>
          </div>
        </div>

        {/* Real-time Project Build Progress Tracker */}
        <div style={{ background: 'var(--bg-glass)', border: '1px solid var(--border)', borderRadius: 16, padding: '16px 20px', marginBottom: 24 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
            <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-secondary)' }}>Project Build Progress</span>
            <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--primary-light)' }}>
              {Math.round((completedSteps.filter(Boolean).length / activeProjectGuide.steps.length) * 100)}% Complete
            </span>
          </div>
          <div style={{ height: 8, background: 'var(--bg-secondary)', borderRadius: 4, overflow: 'hidden' }}>
            <motion.div 
              style={{ height: '100%', background: 'linear-gradient(90deg, var(--primary), var(--accent))' }}
              animate={{ width: `${(completedSteps.filter(Boolean).length / activeProjectGuide.steps.length) * 100}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>

        {/* Workspace Dual-Panel Split View */}
        <div style={{ display: 'grid', gridTemplateColumns: '1.6fr 1fr', gap: 24, alignItems: 'start' }}>
          {/* Left Column: Extensive Step-by-Step Interactive Guide */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div style={{ padding: '20px 24px', background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 16 }}>
              <h3 style={{ margin: '0 0 16px', fontSize: 16, color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: 8 }}>
                📋 Implementation Checklist & Detailed Tasks
              </h3>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                {activeProjectGuide.steps.map((step, i) => (
                  <div 
                    key={i} 
                    style={{ 
                      padding: 16, 
                      background: completedSteps[i] ? 'rgba(16,185,129,0.03)' : 'var(--bg-secondary)', 
                      border: `1px solid ${completedSteps[i] ? 'rgba(16,185,129,0.2)' : 'var(--border)'}`, 
                      borderRadius: 12, 
                      display: 'flex', 
                      gap: 16, 
                      alignItems: 'flex-start',
                      transition: 'all 0.2s ease-in-out'
                    }}
                  >
                    <input 
                      type="checkbox" 
                      checked={!!completedSteps[i]} 
                      onChange={() => {
                        const next = [...completedSteps]
                        next[i] = !next[i]
                        setCompletedSteps(next)
                        if (next[i]) {
                          toast.success(`Step ${i + 1} completed! Keep going! 🚀`)
                        }
                      }}
                      style={{ 
                        marginTop: 4, 
                        width: 18, 
                        height: 18, 
                        accentColor: 'var(--success)', 
                        cursor: 'pointer',
                        flexShrink: 0
                      }}
                    />
                    
                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                        <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-muted)' }}>STEP {i + 1} OF {activeProjectGuide.steps.length}</span>
                        {completedSteps[i] && <span style={{ fontSize: 11, color: 'var(--success)', fontWeight: 600 }}>✓ Done</span>}
                      </div>
                      
                      <h4 style={{ margin: '0 0 8px', fontSize: 14, color: completedSteps[i] ? 'var(--text-muted)' : 'var(--text-primary)', textDecoration: completedSteps[i] ? 'line-through' : 'none' }}>
                        {step}
                      </h4>
                      
                      <p style={{ fontSize: 12, color: 'var(--text-secondary)', margin: 0, lineHeight: 1.6 }}>
                        {getStepDetails(activeProjectGuide.name, i)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Architectural Blueprints & Tech Stack Breakdown */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            {/* Tech Stack Focus Panel */}
            <div style={{ padding: '20px 24px', background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 16 }}>
              <h3 style={{ margin: '0 0 14px', fontSize: 15, color: 'var(--text-primary)' }}>🛠️ Technology Stack Breakdown</h3>
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 16 }}>
                {activeProjectGuide.tech.map(t => (
                  <span key={t} className="badge badge-cyan" style={{ fontSize: 11, padding: '4px 10px' }}>{t}</span>
                ))}
              </div>
              <p style={{ fontSize: 12, color: 'var(--text-secondary)', lineHeight: 1.6, margin: 0 }}>
                This project relies heavily on these frameworks. We recommend testing your integrations locally and checking container compatibility across nodes.
              </p>
            </div>

            {/* Architecture Card */}
            <div style={{ padding: '20px 24px', background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 16 }}>
              <h3 style={{ margin: '0 0 14px', fontSize: 15, color: 'var(--text-primary)' }}>🏗️ System Architecture Blueprint</h3>
              <div style={{ 
                fontFamily: 'JetBrains Mono', 
                fontSize: 11, 
                background: 'var(--bg-secondary)', 
                padding: 16, 
                borderRadius: 10, 
                border: '1px solid var(--border)',
                color: 'var(--primary-light)',
                lineHeight: 1.6,
                whiteSpace: 'pre'
              }}>
                {getArchitectureDiagram(activeProjectGuide.name)}
              </div>
            </div>

            {/* AI Assistant Help Panel */}
            <div style={{ padding: '20px 24px', background: 'rgba(139,92,246,0.05)', border: '1px dashed rgba(139,92,246,0.3)', borderRadius: 16, textAlign: 'center' }}>
              <h4 style={{ margin: '0 0 6px', fontSize: 14, color: 'var(--primary-light)' }}>💡 Stuck on an integration?</h4>
              <p style={{ fontSize: 12, color: 'var(--text-secondary)', marginBottom: 14 }}>
                Ask our floating AI Copilot at the bottom right of the screen for instant guidance, sample code structures, or docker debug logs!
              </p>
              <button 
                className="btn btn-primary btn-sm" 
                onClick={() => {
                  toast.success("AI Copilot activated! Ask your questions in the floating widget below.");
                }}
                style={{ margin: '0 auto' }}
              >
                Trigger AI Helper
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    )
  }

  return (
    <div>
      <div className="page-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 6 }}>
          <div style={{ width: 40, height: 40, background: 'rgba(167,139,250,0.15)', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Compass size={20} color="#a78bfa"/>
          </div>
          <h1 className="page-title" style={{ margin: 0 }}>Career Recommendation Engine</h1>
          <span className="badge badge-primary">AI Powered</span>
        </div>
        <p className="page-subtitle">Personalized role recommendations, salary insights, certifications, and project ideas based on your profile</p>
      </div>

      <div className="tabs" style={{ marginBottom: 28 }}>
        {[{ key: 'roles', label: '🎯 Roles' }, { key: 'certs', label: '🏅 Certifications' }, { key: 'courses', label: '📚 Courses' }, { key: 'projects', label: '🚀 Projects' }].map(t => (
          <div key={t.key} className={`tab ${activeSection === t.key ? 'active' : ''}`} onClick={() => setActiveSection(t.key)}>{t.label}</div>
        ))}
      </div>

      {/* Roles */}
      {activeSection === 'roles' && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
          <ExplainBox type="info" title="How role matching works">
            Our AI compares your current skills (from your resume) against the skill requirements of each role. The match % shows how qualified you already are. Roles below 80% match show you which skills to learn in the Skill Gap module.
          </ExplainBox>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {recommendedRoles.map((role, i) => (
              <motion.div key={i} className="card hover-glow" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }}
                onClick={() => setRoleModal(role)}
                whileHover={{ y: -4, scale: 1.01, borderColor: 'var(--primary-light)' }}
                style={{ display: 'grid', gridTemplateColumns: '60px 1fr auto', gap: 20, alignItems: 'center', cursor: 'pointer', transition: 'all 0.2s ease-in-out' }}>
                <div style={{ width: 60, height: 60, borderRadius: 14, background: 'rgba(139,92,246,0.1)', border: '1px solid rgba(139,92,246,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 28 }}>{role.icon}</div>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
                    <h4 style={{ margin: 0, fontSize: 16, color: 'var(--text-primary)' }}>{role.title}</h4>
                    <span className="badge badge-success">{role.match}% Match</span>
                  </div>
                  <div style={{ display: 'flex', gap: 16, marginBottom: 10, flexWrap: 'wrap' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, color: 'var(--success)' }}><DollarSign size={13}/> {role.salary}</span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, color: 'var(--text-muted)' }}><Building2 size={13}/> {role.companies.join(', ')}</span>
                  </div>
                  <div style={{ display: 'flex', gap: 6 }}>
                    {role.skills.map(s => <span key={s} className="badge badge-primary">{s}</span>)}
                  </div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8, alignItems: 'flex-end' }} onClick={e => e.stopPropagation()}>
                  <div style={{ width: 60, height: 60 }}>
                    <svg viewBox="0 0 36 36" style={{ transform: 'rotate(-90deg)' }}>
                      <circle cx="18" cy="18" r="15.9" fill="none" stroke="var(--border)" strokeWidth="2.5"/>
                      <circle cx="18" cy="18" r="15.9" fill="none" stroke="#8b5cf6" strokeWidth="2.5" strokeDasharray={`${role.match} ${100 - role.match}`} strokeLinecap="round"/>
                    </svg>
                  </div>
                  <button className="btn btn-primary btn-sm" onClick={() => setRoleModal(role)}>
                    Explore <ArrowRight size={12}/>
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Certifications */}
      {activeSection === 'certs' && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
          <ExplainBox type="tip" title="Why certifications matter">
            Certifications validate your skills to recruiters and ATS systems. High-priority certs directly address your current skill gaps and are in high demand at top companies. All certifications shown here are free or fully sponsored.
          </ExplainBox>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 18, gap: 16, flexWrap: 'wrap' }}>
            <div style={{ position: 'relative', flex: 1, maxWidth: 360 }}>
              <input 
                type="text" 
                className="input" 
                placeholder="🔍 Search 100+ free certifications..." 
                value={certSearch}
                onChange={e => setCertSearch(e.target.value)}
                style={{ padding: '8px 12px 8px 32px', fontSize: 13, height: 38 }}
              />
            </div>
            <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>
              Showing <strong>{Math.min(filteredCerts.length, 50)}</strong> of <strong>{filteredCerts.length}</strong> free certifications
            </div>
          </div>
          <div className="grid-2">
            {filteredCerts.slice(0, 50).map((cert, i) => (
              <motion.div key={i} className="card" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: Math.min(i * 0.02, 0.3) }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
                  <span className={`badge ${cert.priority === 'High' ? 'badge-danger' : 'badge-warning'}`}>⚡ {cert.priority} Priority</span>
                  <span className="badge badge-cyan">{cert.level}</span>
                </div>
                <h4 style={{ margin: '0 0 4px', fontSize: 15 }}>{cert.name}</h4>
                <p style={{ fontSize: 13, color: 'var(--text-muted)', marginBottom: 8 }}>{cert.provider}</p>
                <p style={{ fontSize: 12, color: 'var(--text-secondary)', lineHeight: 1.5, marginBottom: 14 }}>{cert.description}</p>
                <div style={{ display: 'flex', gap: 8, marginBottom: 14, flexWrap: 'wrap' }}>
                  <span style={{ fontSize: 12, color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: 4 }}><Clock size={11}/> {cert.duration}</span>
                  <span style={{ fontSize: 12, color: 'var(--success)', fontWeight: 600 }}>💰 {cert.cost}</span>
                </div>
                <div style={{ display: 'flex', gap: 8 }}>
                  <button className="btn btn-primary btn-sm" onClick={() => setCertModal(cert)}>
                    <BookOpen size={12}/> Learn More
                  </button>
                  <button className="btn btn-secondary btn-sm" onClick={() => window.open(cert.url, '_blank')}>
                    <ExternalLink size={12}/> Official Site
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Courses */}
      {activeSection === 'courses' && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
          <ExplainBox type="info" title="Course recommendations">
            These courses are hand-picked based on your current skill gaps and target roles. Free courses are marked — start there before investing in paid ones.
          </ExplainBox>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 18, gap: 16, flexWrap: 'wrap' }}>
            <div style={{ position: 'relative', flex: 1, maxWidth: 360 }}>
              <input 
                type="text" 
                className="input" 
                placeholder="🔍 Search 100+ free courses..." 
                value={courseSearch}
                onChange={e => setCourseSearch(e.target.value)}
                style={{ padding: '8px 12px 8px 32px', fontSize: 13, height: 38 }}
              />
            </div>
            <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>
              Showing <strong>{Math.min(filteredCourses.length, 50)}</strong> of <strong>{filteredCourses.length}</strong> free courses
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {filteredCourses.slice(0, 50).map((course, i) => (
              <motion.div key={i} className="card" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: Math.min(i * 0.02, 0.3) }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 16 }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
                      <h4 style={{ margin: 0, fontSize: 15 }}>{course.name}</h4>
                      <span className={`badge ${course.price === 'Free' ? 'badge-success' : 'badge-warning'}`}>{course.price}</span>
                    </div>
                    <p style={{ fontSize: 13, color: 'var(--text-muted)', lineHeight: 1.5, marginBottom: 10 }}>{course.description}</p>
                    <div style={{ display: 'flex', gap: 16, fontSize: 13, color: 'var(--text-muted)', flexWrap: 'wrap' }}>
                      <span>📱 {course.platform}</span>
                      <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}><Star size={12} color="#f59e0b"/> {course.rating}</span>
                      <span>👥 {course.students} students</span>
                      <span>⏱ {course.duration}</span>
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: 8 }}>
                    <button className="btn btn-secondary btn-sm" onClick={() => setCourseModal(course)}>Preview</button>
                    <button className="btn btn-primary btn-sm" onClick={() => window.open(course.url, '_blank')}>
                      Start Learning <ArrowRight size={12}/>
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Projects */}
      {activeSection === 'projects' && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
          <ExplainBox type="tip" title="Why build projects?">
            Projects are the #1 way to demonstrate skills to recruiters. High-impact projects that use your target role's tech stack can directly replace years of experience in a resume.
          </ExplainBox>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 18, gap: 16, flexWrap: 'wrap' }}>
            <div style={{ position: 'relative', flex: 1, maxWidth: 360 }}>
              <input 
                type="text" 
                className="input" 
                placeholder="🔍 Search 100+ free projects..." 
                value={projectSearch}
                onChange={e => setProjectSearch(e.target.value)}
                style={{ padding: '8px 12px 8px 32px', fontSize: 13, height: 38 }}
              />
            </div>
            <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>
              Showing <strong>{Math.min(filteredProjects.length, 50)}</strong> of <strong>{filteredProjects.length}</strong> free project templates
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {filteredProjects.slice(0, 50).map((project, i) => (
              <motion.div key={i} className="card" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: Math.min(i * 0.02, 0.3) }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
                  <h4 style={{ margin: 0 }}>🚀 {project.name}</h4>
                  <span className={`badge ${project.impact === 'High' ? 'badge-danger' : 'badge-warning'}`}>{project.impact} Impact</span>
                </div>
                <p style={{ fontSize: 14, color: 'var(--text-muted)', marginBottom: 14, lineHeight: 1.6 }}>{project.desc}</p>
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 16 }}>
                  {project.tech.map(t => <span key={t} className="badge badge-cyan">{t}</span>)}
                </div>
                <div style={{ display: 'flex', gap: 8 }}>
                  <button className="btn btn-primary btn-sm" onClick={() => handleOpenProjectGuide(project)}>
                    <Sparkles size={12}/> View Step-by-Step Guide
                  </button>
                  <button className="btn btn-secondary btn-sm" onClick={() => window.open(project.githubTemplate, '_blank')}>
                    GitHub Template
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Role Detail Modal */}
      <Modal open={!!roleModal} onClose={() => setRoleModal(null)} title={roleModal?.title} subtitle={`${roleModal?.match}% match with your profile`} icon={roleModal?.icon} maxWidth={600}>
        {roleModal && (
          <div>
            <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: 20 }}>{roleModal.description}</p>
            <h5 style={{ marginBottom: 12 }}>📋 Key Responsibilities</h5>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 20 }}>
              {roleModal.responsibilities.map((r, i) => (
                <div key={i} style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                  <CheckCircle size={14} color="var(--success)"/>
                  <span style={{ fontSize: 13, color: 'var(--text-secondary)' }}>{r}</span>
                </div>
              ))}
            </div>
            <h5 style={{ marginBottom: 12 }}>🏢 Top Companies Hiring</h5>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 20 }}>
              {roleModal.topCompanies.map((c, i) => (
                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 14px', background: 'var(--bg-glass)', borderRadius: 10, border: '1px solid var(--border)' }}>
                  <span style={{ fontWeight: 600, fontSize: 14 }}>{c.name}</span>
                  <div style={{ display: 'flex', gap: 16, fontSize: 13 }}>
                    <span style={{ color: 'var(--success)' }}>{c.salary}</span>
                    <span style={{ color: 'var(--text-muted)' }}>{c.openings} openings</span>
                  </div>
                </div>
              ))}
            </div>
            <div style={{ display: 'flex', gap: 10 }}>
              <button className="btn btn-primary" style={{ flex: 1 }} onClick={() => { setRoleModal(null); navigate('/skills') }}>
                Check Skill Gap <ArrowRight size={14}/>
              </button>
              <button className="btn btn-secondary" style={{ flex: 1 }} onClick={() => { setRoleModal(null); navigate('/interview') }}>
                Practice Interview
              </button>
            </div>
          </div>
        )}
      </Modal>

      {/* Cert Detail Modal */}
      <Modal open={!!certModal} onClose={() => setCertModal(null)} title={certModal?.name} subtitle={`by ${certModal?.provider}`} icon="🏅" maxWidth={520}>
        {certModal && (
          <div>
            <ExplainBox type={certModal.priority === 'High' ? 'warning' : 'info'} title={`${certModal.priority} Priority Certification`}>
              {certModal.description}
            </ExplainBox>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 20 }}>
              {[{ label: 'Duration', value: certModal.duration }, { label: 'Cost', value: certModal.cost }, { label: 'Level', value: certModal.level }, { label: 'Priority', value: certModal.priority }].map((item, i) => (
                <div key={i} style={{ padding: '10px 14px', background: 'var(--bg-glass)', borderRadius: 10, border: '1px solid var(--border)' }}>
                  <div style={{ fontSize: 11, color: 'var(--text-muted)', marginBottom: 3 }}>{item.label}</div>
                  <div style={{ fontWeight: 700, fontSize: 14 }}>{item.value}</div>
                </div>
              ))}
            </div>
            <div style={{ display: 'flex', gap: 10 }}>
              <button className="btn btn-primary" style={{ flex: 1 }} onClick={() => window.open(certModal.url, '_blank')}>
                <ExternalLink size={14}/> Visit Official Page
              </button>
              <button className="btn btn-secondary" style={{ flex: 1 }} onClick={() => { setCertModal(null); navigate('/skills') }}>
                Check Prerequisites
              </button>
            </div>
          </div>
        )}
      </Modal>

      {/* Course Preview Modal */}
      <Modal open={!!courseModal} onClose={() => setCourseModal(null)} title={courseModal?.name} subtitle={`${courseModal?.platform} · ${courseModal?.duration}`} icon="📚" maxWidth={500}>
        {courseModal && (
          <div>
            <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: 20 }}>{courseModal.description}</p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10, marginBottom: 20 }}>
              {[{ label: 'Rating', value: `⭐ ${courseModal.rating}` }, { label: 'Students', value: courseModal.students }, { label: 'Duration', value: courseModal.duration }].map((item, i) => (
                <div key={i} style={{ padding: '10px 14px', background: 'var(--bg-glass)', borderRadius: 10, border: '1px solid var(--border)', textAlign: 'center' }}>
                  <div style={{ fontWeight: 700, fontSize: 16 }}>{item.value}</div>
                  <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>{item.label}</div>
                </div>
              ))}
            </div>
            <button className="btn btn-primary" style={{ width: '100%' }} onClick={() => { window.open(courseModal.url, '_blank'); setCourseModal(null) }}>
              Start Learning on {courseModal.platform} <ExternalLink size={14}/>
            </button>
          </div>
        )}
      </Modal>

      {/* Project Guide Modal */}
      <Modal open={!!projectModal} onClose={() => setProjectModal(null)} title={projectModal?.name} subtitle="Step-by-step implementation guide" icon="🚀" maxWidth={560}>
        {projectModal && (
          <div>
            <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: 16 }}>{projectModal.desc}</p>
            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 20 }}>
              {projectModal.tech.map(t => <span key={t} className="badge badge-cyan">{t}</span>)}
            </div>
            <h5 style={{ marginBottom: 14 }}>📋 Implementation Steps</h5>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 20 }}>
              {projectModal.steps.map((step, i) => (
                <div key={i} style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                  <div style={{ width: 26, height: 26, borderRadius: '50%', background: 'rgba(139,92,246,0.15)', border: '1px solid rgba(139,92,246,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700, color: 'var(--primary-light)', flexShrink: 0 }}>{i + 1}</div>
                  <span style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.6, paddingTop: 4 }}>{step}</span>
                </div>
              ))}
            </div>
            <div style={{ display: 'flex', gap: 10 }}>
              <button className="btn btn-primary" style={{ flex: 1 }} onClick={() => window.open(projectModal.githubTemplate, '_blank')}>
                GitHub Template <ExternalLink size={12}/>
              </button>
              <button className="btn btn-secondary" style={{ flex: 1 }} onClick={() => {
                const proj = projectModal
                setProjectModal(null)
                handleOpenProjectGuide(proj)
                enterProjectDeveloperIDE(proj)
              }}>
                Practice Coding First
              </button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  )
}
