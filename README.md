AI GitHub Trends Analyzer

An automated AI-assisted reporting workflow that monitors GitHub’s trending AI repositories, generates a Markdown report, emails it to a configured recipient, and stores the report under reports/.

What it does

Collects trending AI repositories (implemented in analyzer.js)

Produces a Markdown report in reports/

Emails the report to a configured address

Runs via GitHub Actions on a schedule and can be triggered manually

How it works

Trigger → Data collection → LLM summarization → Report generation → Email delivery → (Optional) commit report back to the repo

Trigger: GitHub Actions schedule (cron) or manual workflow_dispatch

Tools/Services: GitHub data + Groq (LLM) + Resend (email)

Outputs: Markdown report file + email

Repository layout

analyzer.js — main script

reports/ — generated reports (Markdown)

.github/workflows/weekly-report.yml — GitHub Actions workflow

package.json / package-lock.json — Node dependencies

Prerequisites

Node.js 18+

Groq API key

Resend API key

GitHub token (PAT) if you want the workflow to commit reports back to the repository

Configuration
Local environment variables

Create a .env file in the project root (do not commit it):

GH_TOKEN=your_github_token
GROQ_API_KEY=your_groq_api_key
RESEND_API_KEY=your_resend_api_key
EMAIL_TO=recipient@example.com

GitHub Actions secrets

Add these under: Settings → Secrets and variables → Actions

GH_TOKEN

GROQ_API_KEY

RESEND_API_KEY

EMAIL_TO

Run locally

Install dependencies:

npm install


Run the analyzer:

node analyzer.js


Expected result:

A new Markdown report is created in reports/

An email is sent to the address configured in EMAIL_TO

Run on GitHub Actions

Go to the Actions tab in the repository

Select Weekly AI Trends Report

Click Run workflow (top-right)

Choose branch main and run

Output

Report files are stored in reports/

Email is delivered to the address configured in EMAIL_TO

Schedule (UTC)

The workflow runs automatically every Monday at 07:45 UTC and can also be triggered manually from the Actions tab.

Cron: 45 7 * * 1

Notes on “agent” terminology

This is an AI workflow agent in the automation sense: it is trigger-driven (schedule/manual), uses external services (LLM + email), and produces an automated outcome (report + email).

What you should see in Preview

Headings like “GitHub Actions secrets” and “Run locally” as big headings

Only the .env, npm install, and node analyzer.js inside small code boxes

No giant “markdown / Copy code” block around the whole page
