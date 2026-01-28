export default {
  async fetch(request: Request, env: any) {

    const feedback = [
      { source: "Web App", sentiment: "Negative", urgency: "High", text: "Login page takes too long to load" },
      { source: "Dashboard", sentiment: "Negative", urgency: "Medium", text: "Navigation is confusing" },
      { source: "Sales", sentiment: "Negative", urgency: "High", text: "Pricing feels expensive" },
      { source: "Support", sentiment: "Positive", urgency: "Low", text: "Support resolved issue quickly" },
      { source: "Mobile", sentiment: "Positive", urgency: "Low", text: "Performance improved after update" },
      { source: "Docs", sentiment: "Neutral", urgency: "Medium", text: "Documentation could be clearer" }
    ];

    const summaryVersions = [
`• Login performance issues are the most frequent negative signal.
• Early friction may be impacting conversion and retention.
• Improving authentication speed should be a top short-term priority.`,

`• Pricing concerns are consistent across Web and Sales feedback.
• Users may not clearly understand the value relative to cost.
• Clearer value communication could improve conversion.`,

`• Dashboard navigation remains difficult for some users.
• Poor discoverability may be limiting feature adoption.
• Navigation simplification should be explored.`,

`• Customer support feedback is consistently positive.
• Strong support is helping offset product friction.
• This strength can be leveraged in onboarding and marketing.`
];

    return new Response(`
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>Feedback Intelligence Dashboard</title>

<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>

<style>
:root {
  --bg: #f5f7fb;
  --card: #ffffff;
  --text: #0f172a;
  --muted: #64748b;
  --accent: #2563eb;
  --border: #e5e7eb;
}

* { box-sizing: border-box; }

body {
  margin: 0;
  background: var(--bg);
  font-family: system-ui, -apple-system, BlinkMacSystemFont, "Inter", sans-serif;
  color: var(--text);
}

.container {
  max-width: 1200px;
  margin: auto;
  padding: 32px;
}

h1 { font-size: 28px; margin-bottom: 4px; }
p.sub { color: var(--muted); margin-top: 0; }

.cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px,1fr));
  gap: 16px;
  margin: 24px 0;
}

.card {
  background: var(--card);
  border-radius: 14px;
  padding: 20px;
  box-shadow: 0 10px 30px rgba(0,0,0,0.08);
}

.grid {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 24px;
}

button {
  background: var(--accent);
  border: none;
  color: white;
  padding: 10px 16px;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
}

.table {
  width: 100%;
  border-collapse: collapse;
}

.table th {
  text-align: left;
  font-size: 12px;
  color: var(--muted);
  border-bottom: 1px solid var(--border);
  padding-bottom: 6px;
}

.table td {
  padding: 10px 0;
  border-bottom: 1px solid var(--border);
}

.badge {
  font-size: 12px;
  padding: 4px 10px;
  border-radius: 999px;
  font-weight: 600;
}

.Positive { background: #dcfce7; color: #166534; }
.Negative { background: #fee2e2; color: #991b1b; }
.Neutral { background: #fef9c3; color: #854d0e; }

.chat {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.chat-window {
  background: #f1f5f9;
  border-radius: 12px;
  padding: 12px;
  flex: 1;
  overflow-y: auto;
  margin-bottom: 8px;
}

.msg {
  max-width: 80%;
  margin-bottom: 8px;
  padding: 10px 14px;
  border-radius: 12px;
  font-size: 14px;
}

.ai { background: #e0e7ff; align-self: flex-start; }
.user { background: #e5e7eb; align-self: flex-end; }

.chat-input {
  display: flex;
  gap: 8px;
}

.chat-input input {
  flex: 1;
  padding: 10px;
  border-radius: 8px;
  border: 1px solid var(--border);
}

.charts {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
  margin-top: 24px;
}

canvas { max-height: 260px; }

@media (max-width: 900px) {
  .grid, .charts { grid-template-columns: 1fr; }
}
</style>
</head>

<body>
<div class="container">

<h1>Feedback Intelligence Dashboard</h1>
<p class="sub">AI-powered analysis to support product decisions</p>

<div class="cards">
  <div class="card"><strong>Total Feedback</strong><p>${feedback.length}</p></div>
  <div class="card"><strong>Negative Signals</strong><p>3</p></div>
  <div class="card"><strong>Positive Signals</strong><p>2</p></div>
  <div class="card"><strong>High Urgency</strong><p>2</p></div>
</div>

<div class="grid">
  <div class="card">
    <h2>Executive AI Summary</h2>
    <pre id="summary">${summaryVersions[0]}</pre>
    <button id="regenBtn">Generate Updated Insights</button>
  </div>

  <div class="card chat">
    <h2>AI Feedback Analyst</h2>
    <div class="chat-window" id="chatWindow">
      <div class="msg ai">Ask me about trends, risks, or what to prioritize.</div>
    </div>
    <div class="chat-input">
      <input id="chatInput" placeholder="Ask a question…" />
      <button id="sendBtn">Send</button>
    </div>
  </div>
</div>

<div class="charts">
  <div class="card">
    <h3>Sentiment Breakdown</h3>
    <canvas id="sentimentChart"></canvas>
  </div>
  <div class="card">
    <h3>Feedback Volume by Source</h3>
    <canvas id="sourceChart"></canvas>
  </div>
</div>

<div class="card" style="margin-top:24px;">
  <h2>Incoming Feedback Stream</h2>
  <table class="table">
    <thead>
      <tr><th>Source</th><th>Sentiment</th><th>Urgency</th><th>Feedback</th></tr>
    </thead>
    <tbody>
      ${feedback.map(f => `
        <tr>
          <td>${f.source}</td>
          <td><span class="badge ${f.sentiment}">${f.sentiment}</span></td>
          <td>${f.urgency}</td>
          <td>${f.text}</td>
        </tr>`).join("")}
    </tbody>
  </table>
</div>

</div>

<script>
/* -------- SUMMARY BUTTON -------- */
const summaries = ${JSON.stringify(summaryVersions)};
let summaryIndex = 0;
document.getElementById("regenBtn").onclick = () => {
  summaryIndex = (summaryIndex + 1) % summaries.length;
  document.getElementById("summary").textContent = summaries[summaryIndex];
};

/* -------- CHAT -------- */
const chatWindow = document.getElementById("chatWindow");
const input = document.getElementById("chatInput");

document.getElementById("sendBtn").onclick = () => {
  if (!input.value.trim()) return;
  addMsg(input.value, "user");
  input.value = "";
  const thinking = addMsg("Thinking…", "ai");
  setTimeout(() => {
    thinking.textContent =
      "Based on current trends, login performance and pricing clarity should be prioritized first.";
  }, 800);
};

function addMsg(text, type) {
  const div = document.createElement("div");
  div.className = "msg " + type;
  div.textContent = text;
  chatWindow.appendChild(div);
  chatWindow.scrollTop = chatWindow.scrollHeight;
  return div;
}

/* -------- CHART DATA FIX -------- */
const feedbackData = ${JSON.stringify(feedback)};

// Aggregate sentiment
const sentimentCounts = { Positive: 0, Neutral: 0, Negative: 0 };
feedbackData.forEach(f => sentimentCounts[f.sentiment]++);

// Aggregate sources
const sourceCounts = {};
feedbackData.forEach(f => {
  sourceCounts[f.source] = (sourceCounts[f.source] || 0) + 1;
});

/* -------- CHARTS -------- */
new Chart(sentimentChart, {
  type: "doughnut",
  data: {
    labels: Object.keys(sentimentCounts),
    datasets: [{
      data: Object.values(sentimentCounts),
      backgroundColor: ["#22c55e", "#facc15", "#ef4444"]
    }]
  }
});

new Chart(sourceChart, {
  type: "bar",
  data: {
    labels: Object.keys(sourceCounts),
    datasets: [{
      data: Object.values(sourceCounts),
      backgroundColor: "#2563eb"
    }]
  },
  options: {
    plugins: { legend: { display: false } },
    scales: { y: { beginAtZero: true, ticks: { stepSize: 1 } } }
  }
});
</script>

</body>
</html>
`, {
      headers: { "Content-Type": "text/html" }
    });
  }
};
