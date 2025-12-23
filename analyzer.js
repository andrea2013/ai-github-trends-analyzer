import { Octokit } from '@octokit/rest';
import Groq from 'groq-sdk';
import { Resend } from 'resend';
import fs from 'fs';
import dotenv from 'dotenv';

dotenv.config();

const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN });
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });
const resend = new Resend(process.env.RESEND_API_KEY);

// AI-related keywords to filter
const AI_KEYWORDS = [
  'ai', 'llm', 'gpt', 'claude', 'agent', 'mcp', 
  'langchain', 'openai', 'anthropic', 'machine-learning',
  'deep-learning', 'transformer', 'rag', 'vector'
];

async function fetchTrendingAIRepos() {
  const oneWeekAgo = new Date();
  oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
  const dateStr = oneWeekAgo.toISOString().split('T')[0];

  // Search for trending AI repos
  const queries = [
    'mcp server',
    'ai agent',
    'llm tools',
    'anthropic',
    'langchain'
  ];

  let allRepos = [];

  for (const query of queries) {
    const { data } = await octokit.search.repos({
      q: `${query} created:>${dateStr}`,
      sort: 'stars',
      order: 'desc',
      per_page: 10
    });
    allRepos = allRepos.concat(data.items);
  }

  // Remove duplicates and filter AI-related
  const uniqueRepos = Array.from(
    new Map(allRepos.map(repo => [repo.id, repo])).values()
  ).filter(repo => {
    const text = `${repo.name} ${repo.description || ''}`.toLowerCase();
    return AI_KEYWORDS.some(keyword => text.includes(keyword));
  }).slice(0, 15);

  return uniqueRepos.map(repo => ({
    name: repo.full_name,
    description: repo.description || 'No description',
    stars: repo.stargazers_count,
    url: repo.html_url,
    language: repo.language,
    topics: repo.topics || []
  }));
}

async function analyzeWithAI(repos) {
  const prompt = `You are an AI technology analyst. Analyze these trending GitHub repositories from the past week and provide insights.

Repositories:
${repos.map((r, i) => `
${i + 1}. ${r.name} (⭐ ${r.stars})
   Description: ${r.description}
   Topics: ${r.topics.join(', ')}
   Language: ${r.language}
`).join('\n')}

Provide a concise analysis covering:
1. **Key Trends**: What technologies/topics are gaining traction?
2. **Notable Projects**: Highlight 3-5 most interesting repos and why
3. **Technology Insights**: What do these trends tell us about the AI ecosystem?
4. **Recommendations**: What should developers pay attention to?

Keep it concise and actionable. Use bullet points.`;

  const completion = await groq.chat.completions.create({
    messages: [{ role: 'user', content: prompt }],
    model: 'llama-3.3-70b-versatile',
    temperature: 0.7,
    max_tokens: 2000
  });

  return completion.choices[0].message.content;
}

async function generateReport(repos, analysis) {
  const date = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return `# AI GitHub Trends Report - ${date}

## 🔥 Trending AI Repositories This Week

${repos.map((r, i) => `
### ${i + 1}. [${r.name}](${r.url}) ⭐ ${r.stars}
**Description:** ${r.description}
**Language:** ${r.language || 'N/A'}
**Topics:** ${r.topics.join(', ') || 'N/A'}
`).join('\n')}

---

## 🤖 AI Analysis

${analysis}

---

*Generated automatically by AI GitHub Trends Analyzer*
*Next report: ${new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString()}*
`;
}

async function sendEmail(report) {
  const date = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  // Convert markdown to HTML with better formatting
  const htmlContent = report
    .replace(/^# (.*$)/gm, '<h1 style="color: #2563eb; font-size: 28px; margin: 20px 0 10px 0;">$1</h1>')
    .replace(/^## (.*$)/gm, '<h2 style="color: #1e40af; font-size: 22px; margin: 20px 0 10px 0;">$1</h2>')
    .replace(/^### (.*$)/gm, '<h3 style="color: #334155; font-size: 18px; margin: 15px 0 8px 0; font-weight: 600;">$1</h3>')
    .replace(/\*\*(.*?)\*\*/g, '<strong style="color: #0f172a;">$1</strong>')
    .replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" style="color: #2563eb; text-decoration: none;">$1</a>')
    .replace(/⭐ (\d+)/g, '<span style="background: #fef3c7; padding: 2px 8px; border-radius: 4px; font-weight: 600;">⭐ $1</span>')
    .replace(/🔥/g, '<span style="font-size: 24px;">🔥</span>')
    .replace(/🤖/g, '<span style="font-size: 24px;">🤖</span>')
    .replace(/\n/g, '<br>');

  const htmlEmail = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin: 0; padding: 0; background-color: #f8fafc; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;">
  <div style="max-width: 800px; margin: 0 auto; background-color: #ffffff; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
    
    <!-- Header -->
    <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 40px 30px; text-align: center;">
      <h1 style="color: #ffffff; margin: 0; font-size: 32px; font-weight: 700;">
        🤖 AI GitHub Trends Report
      </h1>
      <p style="color: #e0e7ff; margin: 10px 0 0 0; font-size: 16px;">
        ${date}
      </p>
    </div>

    <!-- Content -->
    <div style="padding: 40px 30px; color: #334155; line-height: 1.8; font-size: 15px;">
      ${htmlContent}
    </div>

    <!-- Footer -->
    <div style="background-color: #f1f5f9; padding: 30px; text-align: center; border-top: 1px solid #e2e8f0;">
      <p style="margin: 0 0 10px 0; color: #64748b; font-size: 14px;">
        Generated automatically by AI GitHub Trends Analyzer
      </p>
      <p style="margin: 0; color: #94a3b8; font-size: 13px;">
        <a href="https://github.com/andrea2013/ai-github-trends-analyzer" style="color: #2563eb; text-decoration: none;">
          View on GitHub
        </a>
      </p>
    </div>

  </div>
</body>
</html>
  `;

  await resend.emails.send({
    from: 'AI Trends <onboarding@resend.dev>',
    to: process.env.EMAIL_TO,
    subject: `🤖 AI GitHub Trends Report - ${date}`,
    html: htmlEmail
  });
}

async function saveReport(report) {
  const date = new Date().toISOString().split('T')[0];
  const filename = `reports/report-${date}.md`;
  
  if (!fs.existsSync('reports')) {
    fs.mkdirSync('reports');
  }
  
  fs.writeFileSync(filename, report);
  console.log(`📄 Report saved: ${filename}`);
}

// Main execution
async function main() {
  try {
    console.log('🔍 Fetching trending AI repositories...');
    const repos = await fetchTrendingAIRepos();
    
    console.log(`✅ Found ${repos.length} repositories`);
    console.log('🤖 Analyzing with AI...');
    
    const analysis = await analyzeWithAI(repos);
    
    console.log('📝 Generating report...');
    const report = await generateReport(repos, analysis);
    
    console.log('💾 Saving report...');
    await saveReport(report);
    
    console.log('📧 Sending email...');
    await sendEmail(report);
    
    console.log('✅ Done! Check your email and reports/ folder.');
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

main();