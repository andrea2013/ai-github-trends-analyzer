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
