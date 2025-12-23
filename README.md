# 🤖 AI GitHub Trends Analyzer

An automated AI-powered agent that monitors trending GitHub repositories in the AI/ML ecosystem, analyzes emerging technologies, and delivers weekly intelligence reports.

## 📋 Overview

This project demonstrates an **AI workflow agent** that:
- ✅ Automatically fetches trending AI repositories from GitHub
- ✅ Uses LLM (Groq/Llama) to analyze trends and provide insights
- ✅ Generates professional Markdown reports
- ✅ Delivers reports via email (Resend API)
- ✅ Runs autonomously via GitHub Actions on a weekly schedule

**Focus Areas:** AI agents, MCP servers, LLM tools, frameworks (LangChain, Anthropic, OpenAI, etc.)

---

## 🎯 What It Does
```
GitHub API → Fetch Trending Repos (AI-focused)
     ↓
Filter & Deduplicate
     ↓
Groq AI (Llama 3.3) → Analyze Trends
     ↓
Generate Markdown Report
     ↓
Save to /reports & Send Email
```

**Key Features:**
- 🔍 Searches for repositories with keywords: `mcp`, `ai agent`, `llm tools`, `anthropic`, `langchain`
- 🤖 AI-powered analysis of technology trends and notable projects
- 📊 Tracks stars, languages, topics, and descriptions
- 📧 Automated email delivery with formatted reports
- 📅 Weekly scheduling + manual trigger support
- 💾 Historical reports stored in `/reports` folder

---

## 🏗️ Architecture

**Type:** Trigger-driven automation workflow with AI augmentation

**Components:**
- **Data Source:** GitHub REST API (trending repositories)
- **AI Engine:** Groq (Llama 3.3-70B model)
- **Delivery:** Resend (email API)
- **Automation:** GitHub Actions (scheduled cron + manual dispatch)
- **Storage:** Git repository (reports committed automatically)

**Note:** This is an **AI workflow agent** (automated, tool-using, outcome-driven), not a fully autonomous agentic system with planning, memory, or self-correction loops.

---

## 📁 Repository Structure
```
ai-github-trends-analyzer/
├── .github/
│   └── workflows/
│       └── weekly-report.yml    # GitHub Actions workflow
├── reports/                     # Generated reports (committed automatically)
│   └── report-YYYY-MM-DD.md
├── analyzer.js                  # Main script (Node.js)
├── package.json                 # Dependencies
├── .env                         # Local environment variables (not committed)
├── .gitignore
└── README.md
```

---

## 🚀 Quick Setup

### Prerequisites
- Node.js 18+ installed
- GitHub account
- API keys (see below)

### 1. Clone and Install
```bash
git clone https://github.com/YOUR-USERNAME/ai-github-trends-analyzer.git
cd ai-github-trends-analyzer
npm install
```

### 2. Get API Keys

| Service | Purpose | Get Key |
|---------|---------|---------|
| **GitHub** | Fetch repository data | [Create token](https://github.com/settings/tokens) (permissions: `public_repo`, `read:user`) |
| **Groq** | AI analysis | [Get API key](https://console.groq.com/keys) (free tier available) |
| **Resend** | Email delivery | [Get API key](https://resend.com/api-keys) (100 emails/day free) |

### 3. Configure Environment Variables

Create `.env` file in project root:
```env
GITHUB_TOKEN=ghp_your_github_token_here
GROQ_API_KEY=gsk_your_groq_key_here
RESEND_API_KEY=re_your_resend_key_here
EMAIL_TO=your.email@example.com
```

### 4. Test Locally
```bash
node analyzer.js
```

**Expected output:**
```
🔍 Fetching trending AI repositories...
✅ Found 15 repositories
🤖 Analyzing with AI...
📝 Generating report...
💾 Saving report...
📄 Report saved: reports/report-2024-12-23.md
📧 Sending email...
✅ Done! Check your email and reports/ folder.
```

### 5. Deploy to GitHub

**Add secrets to your repository:**

Go to: **Settings → Secrets and variables → Actions → New repository secret**

Add these 4 secrets:
- `GH_TOKEN` → Your GitHub token
- `GROQ_API_KEY` → Your Groq API key
- `RESEND_API_KEY` → Your Resend API key
- `EMAIL_TO` → Your email address

**Push code:**
```bash
git add .
git commit -m "Initial commit: AI GitHub Trends Analyzer"
git push origin main
```

### 6. Enable and Test Workflow

1. Go to **Actions** tab in your repository
2. Click **"Weekly AI Trends Report"**
3. Click **"Run workflow"** → **"Run workflow"**
4. Wait ~1 minute
5. Check your email and `reports/` folder

---

## ⏰ Schedule

**Automatic runs:** Every **Monday at 7:45 AM UTC**

**Cron expression:** `45 7 * * 1`

**Manual trigger:** Available anytime via Actions tab

---

## 📊 Sample Output

Reports include:

### 🔥 Trending AI Repositories
- Repository name, description, stars, language, topics
- Direct links to each project

### 🤖 AI Analysis
- **Key Trends:** Emerging technologies and patterns
- **Notable Projects:** Highlighted interesting repositories
- **Technology Insights:** What trends mean for the AI ecosystem
- **Recommendations:** What developers should watch

---

## 🛠️ Technologies Used

| Technology | Purpose |
|------------|---------|
| **Node.js** | Runtime environment |
| **@octokit/rest** | GitHub API client |
| **groq-sdk** | Groq AI integration (Llama 3.3) |
| **resend** | Email delivery service |
| **dotenv** | Environment variable management |
| **GitHub Actions** | Workflow automation |

---

**Key Learnings:**
- ✅ Workflow automation fundamentals
- ✅ AI context engineering and prompting
- ✅ External API integration (REST)
- ✅ CI/CD with GitHub Actions
- ✅ Email delivery systems
- ✅ Documentation and code organization

---

## 🙏 Acknowledgments

- **Anthropic** - For inspiring AI agent architectures
- **Groq** - For fast, free LLM inference
- **GitHub** - For Actions platform and API
- **Resend** - For reliable email delivery

---

*Last updated: December 23, 2024*