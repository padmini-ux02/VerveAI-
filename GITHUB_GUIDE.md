# 🚀 VerveAI - GitHub Upload & Live Deployment Guide

This guide provides a neat project description, relative links, and step-by-step instructions to upload your **VerveAI** application to **GitHub** and deploy it to **Vercel** to get your own live website link.

---

## 🔗 Project Navigation Links

* 🖥️ **Live Demo Website**: [verveai-prep.vercel.app](https://verveai-prep.vercel.app) *(Replace with your actual deployment link once active)*
* 📄 **Global Stylesheet**: [index.css](./src/index.css)
* 🎤 **Mock Interview Component**: [MockInterviewRoom.jsx](./src/pages/mockinterview/MockInterviewRoom.jsx)
* 📄 **Resume Editor Component**: [ResumePage.jsx](./src/pages/resume/ResumePage.jsx)
* 💻 **Coding Laboratory Component**: [CodingPage.jsx](./src/pages/coding/CodingPage.jsx)

---

## 📝 Project Summary (For GitHub / Resume)

> **VerveAI** is an intelligent, developer-focused career copilot and placement preparation hub. It features a **Monaco Coding Lab** supporting 23 programming languages with browser-sandboxed execution, an **interactive Resume Builder** with real-time ATS scoring and swappable layouts, and a **webcam Mock Interview Room** equipped with biometric telemetry and camera/microphone mute diagnostics.

---

## 🛠️ Step-by-Step GitHub Upload Guide

Follow these steps to upload this project to your personal GitHub account:

### Step 1: Initialize Git Repository
Open your terminal in the `verveai-frontend` directory and initialize git:
```bash
git init
```

### Step 2: Add Files & Create First Commit
Stage all files and commit them locally:
```bash
git add .
git commit -m "feat: initial release of VerveAI Placement Copilot"
```

### Step 3: Create a New GitHub Repository
1. Go to [github.com](https://github.com) and click **New Repository**.
2. Name the repository `verveai-prep-platform` or similar.
3. Keep it Public and leave "Add a README" **unchecked** (we already have a complete README!).
4. Click **Create Repository**.

### Step 4: Link Local Git to GitHub & Push
Copy the commands from your GitHub repository setup page and run them in your local terminal:
```bash
git branch -M main
git remote add origin https://github.com/YOUR_GITHUB_USERNAME/YOUR_REPOSITORY_NAME.git
git push -u origin main
```
*(Replace `YOUR_GITHUB_USERNAME` and `YOUR_REPOSITORY_NAME` with your actual credentials)*

---

## 🚀 Step-by-Step Vercel Deployment Guide

Deploy your website for free and get a custom live link in under 2 minutes:

### Step 1: Sign Up on Vercel
Go to [vercel.com](https://vercel.com) and log in using your **GitHub account**.

### Step 2: Import Your Repository
1. On the Vercel Dashboard, click **Add New** ➔ **Project**.
2. Locate your newly pushed `verveai-prep-platform` repository under your GitHub list and click **Import**.

### Step 3: Configure Project Settings
Vercel automatically detects that the project uses **Vite**. Keep the default settings:
* **Framework Preset**: `Vite`
* **Build Command**: `npm run build`
* **Output Directory**: `dist`

### Step 4: Deploy!
Click the **Deploy** button. Vercel will install dependencies, bundle the assets, and host your live website. 

🎉 **Done!** You will receive a live URL (e.g. `https://verveai-prep-platform.vercel.app`) which you can add to your GitHub repository and resume!
