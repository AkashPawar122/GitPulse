# 📊 GitPulse — Real-Time GitHub Activity Analyzer & Card Generator

**GitPulse** is a dynamic web application that analyzes real-time GitHub activity to generate stunning, shareable summary cards 🤯. 

Moving beyond basic profile stats, GitPulse gives developers a visually striking way to showcase their yearly contributions, streak milestones, language breakdowns, and custom AI-generated developer archetypes.

---

## 🔥 Features

* 💻 **Flexible Username Search:** Instantly analyze activity for any public GitHub handle with single or multi-year filters.
* 📊 **Deep GraphQL Analytics:** Fetches comprehensive metrics directly via the GitHub GraphQL API, including commits, pull requests, code reviews, and earned stars.
* ✨ **Auto-Generated GitWrapped Card:** Summarizes total contributions, longest active streaks, top languages, and total repository impact in one clean visual.
* 🖼 **Dynamic Server-Side PNG Generation:** Renders crisp, downloadable summary cards on-demand powered by Next.js `ImageResponse`.
* 🌐 **Direct Social Sharing:** Instant PNG downloads plus direct one-click sharing triggers for Twitter/X and LinkedIn.
* 🔄 **Seamless Regeneration:** Reset inputs and switch years or profiles with zero page reloads.

---

## 🛠 Tech Stack

### **Frontend & Framework**
* ⚛️ **React** — Component-driven UI library
* ▲ **Next.js (App Router)** — React framework providing server components and serverless endpoints
* 🎨 **Tailwind CSS** — Utility-first styling for a dark-mode-first aesthetic

### **Backend & API**
* ▲ **Next.js API Routes** — Serverless handlers managing authentication and data transformation
* 🔌 **GitHub GraphQL API** — Aggregates granular yearly contributions and activity logs

### **Image Generation & Export**
* 🖼 **Next.js ImageResponse (`next/og`)** — Server-side dynamic Open Graph image generation

### **Deployment**
* ▲ **Vercel** — Fast, serverless deployment platform optimized for Next.js and Edge functions

---

**Live Demo:** [https://gitpulse.vercel.app/](https://gitpulse.vercel.app/)
