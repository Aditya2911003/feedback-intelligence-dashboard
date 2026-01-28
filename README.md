# Feedback Intelligence Dashboard

An AI-powered feedback aggregation and analysis dashboard built as a **product management prototype**.  
The goal of this project is to demonstrate how AI and data visualization can help product teams turn scattered feedback into **clear, actionable product insights**.

This project was built as part of a Product Management assignment and is intentionally scoped as a **prototype** rather than a production system.

---

## 🧠 Problem Statement

Product teams receive customer feedback from many different channels:
- Web applications
- Sales conversations
- Customer support tickets
- Mobile apps
- Documentation feedback

In practice, this feedback is:
- Fragmented across tools
- Hard to summarize quickly
- Difficult to prioritize by urgency or impact

As a result, PMs often spend more time **organizing feedback** than **acting on it**.

---

## 💡 Solution Overview

The Feedback Intelligence Dashboard acts as a **central intelligence layer** on top of raw feedback.

It aggregates feedback (mock data for this prototype) and provides:
- An executive-level AI summary
- Sentiment analysis and visual trends
- Source-based feedback analysis
- An interactive AI assistant for exploration and prioritization

The focus is on **decision support**, not just data display.

---

## ✨ Key Features

### 📌 Executive AI Summary
- Automatically generates concise, PM-ready insights
- Highlights risks, opportunities, and recommended priorities
- Can be regenerated to simulate updated analysis

### 📊 Feedback Analytics
- Sentiment breakdown (Positive / Neutral / Negative)
- Feedback volume trends over time
- Source-based analysis (Web, Sales, Support, Mobile, Docs)

### 🤖 AI Feedback Analyst (Prototype)
- Conversational interface for asking questions like:
  - “What should we prioritize first?”
  - “Where are the biggest risks?”
- Simulated AI responses to demonstrate product behavior
- Designed as a foundation for real LLM integration

### 🧾 Incoming Feedback Stream
- Structured table view of individual feedback items
- Includes source, sentiment, urgency, and message
- Optimized for quick scanning by product managers

---

## 🛠 Architecture & Technology

This project uses **Cloudflare’s developer platform** to demonstrate modern, lightweight product architecture.

### Cloudflare Products Used
- **Cloudflare Workers**
  - Serverless backend
  - Hosts the entire dashboard and API logic
- **Cloudflare AI Binding (mocked)**
  - Simulates AI-driven summaries and chat responses
  - Demonstrates how AI would integrate in a real system

### Frontend & Visualization
- **TypeScript**
- **Vanilla HTML/CSS (SaaS-style layout)**
- **Chart.js**
  - Doughnut chart for sentiment breakdown
  - Line chart for feedback trends

> No external databases or third-party APIs are used.  
> All data is mocked intentionally to keep the focus on **product thinking and system design**.

---

## 🌐 Live Demo

👉 **Live Dashboard:**  
https://feedback-dashboard.feedback-dashboard-aditya.workers.dev

The live demo represents the fully deployed prototype running on Cloudflare Workers.

---

## 📦 Project Scope & Limitations

- This is a **prototype**, not a production system
- Feedback data is mocked
- AI responses are simulated (no external LLM API calls)
- Authentication, persistence, and permissions are out of scope

These choices were made intentionally to prioritize:
- Speed of iteration
- Product clarity
- Demonstration of PM decision-making

---

## 🚀 Future Improvements

If taken further, this product could include:
- Real-time feedback ingestion (Zendesk, Intercom, Slack, App reviews)
- Persistent storage using Cloudflare D1 or KV
- Real LLM integration for live AI analysis
- User-defined filters (by team, feature, severity)
- Exportable insights for leadership reporting

---

## 👤 Author

**Aditya Luhadia**  
Product Management Intern Candidate  

This project demonstrates product thinking, system design, and the practical application of AI for decision support.
