# 🌍 Carbon-oh-no! 
### *Empowering Workforces to Erase the Digital Carbon Shadow.*

[![Project Status](https://img.shields.io/badge/Status-Hackathon_Active-brightgreen)](https://github.com/Nakul71/CSI_Hackathon)
[![License](https://img.shields.io/badge/License-MIT-blue)](LICENSE)

**Carbon-oh-no** is an end-to-end sustainability intelligence platform developed for the **CSI Hackathon**. It provides real-time visibility into the hidden environmental and financial costs of digital actions—transforming "invisible data waste" into actionable, money-saving insights.

---

## 🏗️ Technical Architecture

The platform consists of three core components working in a unified real-time loop:

1.  **🔍 Chrome Extension**: A lightweight telemetry agent that monitors high-impact browser activities (AI prompts, heavy attachments, etc.).
2.  **🚀 Express Backend**: The "Central Nervous System" that processes raw telemetry, applies our Impact Engine, and coordinates with Google Gemini for AI analysis.
3.  **📊 Next.js Dashboard**: A premium, real-time "Digital Mirror" showing organization-wide sustainability scores, cost savings, and gamified leaderboards.

---

## 📂 Repository Structure

```bash
CSI-HACKATHON/
├── 🌐 frontend/           # Next.js 14 Dashboard (Tailwind + Recharts)
├── ⚙️ backend/            # Express.js API & Socket.io (TypeScript)
├── 🧩 chrome-extension/   # Manifest V3 Telemetry Agent
└── 🧪 IMPACT_METHODOLOGY.md # Detailed carbon/cost calculation logic
```

---

## 🚀 Quick Start Guide

Follow these steps to get the entire ecosystem running locally.

### 1. Prerequisites
- **Node.js** (v18 or higher)
- **NPM** (v9 or higher)
- **Git**

### 2. Backend Setup
```bash
cd backend
npm install
# Create a .env file (see Configuration section below)
npm run dev
```

### 3. Frontend Setup
```bash
cd frontend
npm install
# Create a .env.local file
npm run dev
```

### 4. Chrome Extension Installation
1.  Open **Google Chrome** and navigate to `chrome://extensions/`.
2.  Enable **Developer Mode** (top-right toggle).
3.  Click **Load unpacked**.
4.  Select the `chrome-extension` folder from this repository.
5.  *Refresh your target pages (ChatGPT or Gmail) to begin tracking.*

---

## 🔑 Configuration (.env)

The system requires certain keys to function. Create `.env` files in the respective directories:

### Backend (`/backend/.env`)
```env
PORT=5000
GEMINI_API_KEY=your_gemini_key_here
```

### Frontend (`/frontend/.env.local`)
```env
NEXT_PUBLIC_SOCKET_URL=http://localhost:5000
```

---

## 📊 Methodology & Calculations

For a deep dive into our official India-grid localized impact math:
👉 **[View IMPACT_METHODOLOGY.md](./IMPACT_METHODOLOGY.md)**

---

## 💎 The Value Proposition

*   **⚡ Real-Time Heartbeat**: WebSockets provide instant feedback on digital waste.
*   **💰 Cost Translation**: Translates CO₂ into actual INR logic for business buy-in.
*   **✨ AI Sustainability Coach**: Google Gemini integration for personalized, proactive "Big Wins."

---

> [!NOTE]  
> Developed for the **CSI Hackathon 2024**. Join us in making the digital world a little greener, one byte at a time.
