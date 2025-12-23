# AI GitHub Trends Analyzer

An automated AI-assisted reporting workflow that monitors GitHub’s trending AI repositories, generates a Markdown report, emails it to a configured recipient, and stores the report under `reports/`.

## What it does

- Collects trending AI repositories (implemented in `analyzer.js`)
- Produces a Markdown report in `reports/`
- Emails the report to a configured address
- Runs via GitHub Actions on a schedule and can be triggered manually

## How it works

Trigger → Data collection → LLM summarization → Report generation → Email delivery → (Optional) commit report back to the repo

- **Trigger:** GitHub Actions schedule (`cron`) or manual `workflow_dispatch`
- **Tools/Services:** GitHub data + Groq (LLM) + Resend (email)
- **Outputs:** Markdown report file + email

## Repository layout

- `analyzer.js` — main script
- `reports/` — generated reports (Markdown)
- `.github/workflows/weekly-report.yml` — GitHub Actions workflow
- `package.json` / `package-lock.json` — Node dependencies

## Configuration

### Local environment variables

Create a `.env` file (do not commit it):

```env
GH_TOKEN=your_github_token
GROQ_API_KEY=your_groq_api_key
RESEND_API_KEY=your_resend_api_key
EMAIL_TO=recipient@example.com

Quick setup (high level)

Create required API keys

GitHub token (used for API access and/or repo operations)

Groq API key (LLM analysis)

Resend API key (email delivery)

Add repository secrets (for GitHub Actions)
Go to: Settings → Secrets and variables → Actions and add:

GH_TOKEN

GROQ_API_KEY

RESEND_API_KEY

EMAIL_TO

Confirm GitHub Actions is enabled

Repo → Actions tab should show the workflow

The workflow supports manual execution via Run workflow

Run a test

Repo → Actions → Weekly AI Trends Report → Run workflow

Verify you receive the email and a new file appears in reports/

Review results

Reports are stored in reports/ (history is preserved as commits)

Workflow logs are available in the Actions run details

Run locally

1. Install dependencies:
npm install
2. Create a .env file (see Configuration above).
3. Run:
node analyzer.js

Expected result:

A new Markdown report is created in reports/
An email is sent to EMAIL_TO

Schedule (UTC)
The workflow runs automatically every Monday at 07:45 UTC and can also be triggered manually from the Actions tab.
Cron:
45 7 * * 1


