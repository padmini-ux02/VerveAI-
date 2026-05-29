# 🚀 VerveAI - AI Placement Prep Platform

> **VerveAI** is an intelligent, developer-focused career copilot and placement preparation hub featuring a Monaco Coding Lab, interactive Resume AI, webcam Mock Interviews, and comprehensive Career workspaces.

### 🔗 Quick Links
* 🌐 **Live Website**: [verveai-prep.vercel.app](https://verveai-prep.vercel.app)
* 🛠️ **Developer Setup Steps**: [GITHUB_GUIDE.md](./GITHUB_GUIDE.md)

---

## 🌟 Core Pillars

### 📄 1. Resume Intelligence Engine
* **14 Role-Specific Templates**: Covers college freshers and industry specialists.
* **4 Swappable A4 CSS Layouts**: Classic Minimalist, Emerald Elite, Royal Indigo, and Modern Slate (Two-Column Sidebar).
* **Live ATS Scoring**: Real-time scoring updates and recruiter diagnostics.

### 🎤 2. Live Mock Interview Room
* **Biometric Telemetry**: Real-time confidence, communication, and eye contact tracking.
* **Mute Diagnostics & Telemetry Sync**: Real-time indicators showing active camera/microphone states; scores drop instantly to `0%` and show `Muted` in red if hardware is disabled.
* **Vocal Fluency Tracker**: Analyzes filler words and speaking rates.

### 💻 3. Monaco Coding Assessment Lab
* **23 Languages Supported**: Dynamic boilerplate skeletons for modern programming languages.
* **Monaco IDE Container**: Visual highlighting, autocorrect, and syntax tracebacks.
* **Simulated Compiler**: Custom diagnostics displaying realistic language tracebacks.

### 🧭 4. Career Roadmap Engine
* **Immersive Workspaces**: Interactive steps, architecture diagrams, and task checklists.
* **300+ Free Assets**: Certifications, courses, and project specifications.

---

## 🛠️ Developer CLI Commands

<details>
<summary><b>📖 View Step-by-Step Setup Commands</b></summary>

| Action | Command | Purpose |
| :--- | :--- | :--- |
| **Install Dependencies** | `npm install` | Restores all package dependencies (React, Monaco Editor, Zustand, Framer Motion, Lucide). |
| **Run Locally** | `npm run dev` | Launches the local development server at `http://localhost:5173`. |
| **Production Build** | `npm run build` | Compiles and builds static files inside the `/dist` directory. |
| **Preview Build** | `npm run preview` | Runs the compiled production build locally to test server environments. |
| **Lint Check** | `npm run lint` | Runs ESLint validations across all components. |

</details>

---

## 🔗 Repository File Map & Route Mappings

<details>
<summary><b>📂 View Complete File Routing Map</b></summary>

### 📁 Primary Core Pages
* 📄 **Resume Page**: [ResumePage.jsx](./src/pages/resume/ResumePage.jsx) (Route: `/resume`)
* 🎤 **Mock Interview**: [MockInterviewRoom.jsx](./src/pages/mockinterview/MockInterviewRoom.jsx) (Route: `/mock-interview`)
* 💻 **Coding Lab**: [CodingPage.jsx](./src/pages/coding/CodingPage.jsx) (Route: `/coding`)
* 🧭 **Career Roadmap**: [CareerPage.jsx](./src/pages/career/CareerPage.jsx) (Route: `/career`)
* 📊 **Dashboard**: [Dashboard.jsx](./src/pages/dashboard/Dashboard.jsx) (Route: `/dashboard`)

### 📁 Configurations, Stores & Styles
* 🔗 **Route Configuration File**: [App.jsx](./src/App.jsx)
* 🔗 **Zustand State Store**: [authStore.js](./src/store/authStore.js)
* 🔗 **Global Stylesheet**: [index.css](./src/index.css)
* 🔗 **Mock Questions Data**: [questionsData.js](./src/pages/interview/questionsData.js)
* 🔗 **LeetCode Catalog**: [problemsData.js](./src/pages/coding/problemsData.js)

</details>

---

## 🔒 Privacy & Safety Compliance
VerveAI respects developer privacy. Camera and microphone tracking is computed entirely locally in the browser runtime environment using client-side JavaScript APIs. No media streams, audio recordings, or webcam feeds are uploaded or processed on remote server instances.
