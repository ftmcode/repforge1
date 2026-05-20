# 🔥 RepForge

> **Forge Your On-Chain Reputation** — The personal toolkit for Web3 builders on Zero Authority DAO

[![Live Demo](https://img.shields.io/badge/Live-Demo-blue?style=for-the-badge)](https://repforge.onrender.com)
[![X Account](https://img.shields.io/badge/X-@RepForgeZA-black?style=for-the-badge&logo=x)](https://x.com/RepForgeZA)
[![Zero Authority](https://img.shields.io/badge/Built%20on-Zero%20Authority%20DAO-purple?style=for-the-badge)](https://zeroauthoritydao.com)

---

## What is RepForge?

RepForge is an AI-powered reputation builder and opportunity matcher for the Zero Authority DAO ecosystem on the Stacks blockchain. It aggregates data from the Zero Authority API to provide builders with:

- A **personalized dashboard** tracking their reputation score, bounties, gigs, and quests
- An **opportunity matcher** that filters and ranks opportunities by skill match
- A **shareable on-chain portfolio** for verifiable Web3 credentials
- **Ecosystem analytics** — category trends, reward distributions, deadline heatmaps
- An **AI assistant (Nova)** powered by Claude via Anthropic API, with ZA MCP integration docs
- A **quest tracker** to see which actions boost rep score the most

RepForge is not a Zero Authority clone — it's a personal productivity and analytics **layer on top of** the ZA ecosystem.

---

## Features

| Feature | Description | ZA API/MCP Used |
|---------|-------------|-----------------|
| 🎯 Opportunity Matcher | Skill-based filtering of bounties & gigs | `/api/bounties`, `/api/gigs` |
| 📊 Reputation Dashboard | Score, breakdown, growth chart | `/user/reputation`, `/user/profile` |
| 🃏 On-Chain Portfolio | Shareable profile with skills & highlights | `/user/endorsements` |
| 📈 Ecosystem Analytics | Category charts, reward heatmaps | `/api/bounties`, `/api/gigs` |
| 🤖 AI Insights (Nova) | Claude-powered assistant for ZA ecosystem | ZA MCP docs + Anthropic API |
| 📜 Quest Tracker | Track XP progress | `/api/quests`, `/user/quests` |
| 🗓 Events Calendar | Upcoming ZA events | `/api/events` |
| 🔑 API Key Auth | Secure ZA API key connection | ZA Auth |

---

## Tech Stack

- **Backend:** Node.js + Express.js
- **Database:** MongoDB (Mongoose)
- **Frontend:** EJS templates + vanilla JS/CSS (no frontend frameworks)
- **Caching:** node-cache (in-memory) + MongoDB TTL indexes
- **Auth:** express-session + connect-mongo
- **Charts:** Chart.js (CDN)
- **AI:** Anthropic Claude API (claude-sonnet-4) + Zero Authority MCP
- **Deployment:** Render.com + MongoDB Atlas

---

## API Endpoints Used

```
GET  /api/bounties          — List all open bounties (with filters)
GET  /api/gigs              — List freelance gigs
GET  /api/quests            — All active quests
GET  /api/events            — Upcoming community events
GET  /api/creators          — Community builders directory
GET  /user/profile          — Authenticated user profile
GET  /user/bounties         — User's bounty applications
GET  /user/gigs             — User's gig history
GET  /user/reputation       — Rep score + breakdown
GET  /user/endorsements     — On-chain endorsements received
GET  /user/quests           — Quest completion status
MCP  https://zeroauthoritydao.com/mcp — AI tool integration
```

---

## Local Setup

```bash
# 1. Clone
git clone https://github.com/yourusername/repforge.git
cd repforge

# 2. Install dependencies
npm install

# 3. Configure environment
cp .env.example .env
# Edit .env with your values:
#   MONGODB_URI — MongoDB Atlas connection string
#   SESSION_SECRET — any random string
#   ZA_API_BASE — https://zeroauthoritydao.com/api

# 4. Run
npm run dev
# Open http://localhost:3000
```

---

## Deployment on Render

1. Push to GitHub
2. Create a new **Web Service** on [render.com](https://render.com)
3. Connect your GitHub repo
4. Set environment variables:
   - `MONGODB_URI` → your MongoDB Atlas URI
   - `SESSION_SECRET` → random secure string
   - `NODE_ENV` → `production`
5. Build: `npm install` | Start: `node server.js`

Or use the included `render.yaml` for one-click deploy.

---

## Why RepForge Wins

1. **Not a clone** — RepForge adds a personal analytics and portfolio layer that ZA's main site doesn't offer
2. **Solves a real pain** — builders struggle to discover relevant opportunities and track their rep growth
3. **Deep API integration** — uses 10+ ZA endpoints + MCP documentation
4. **Polished UX** — dark Web3 aesthetic, responsive, smooth animations, empty states, loading feedback
5. **AI layer** — Nova assistant answers ZA ecosystem questions using Claude + MCP context
6. **Exportable portfolios** — shareable profile pages with `/portfolio/view/:username`

---

## Brand

- **Name:** RepForge
- **Tagline:** Forge Your On-Chain Reputation
- **Colors:** Deep navy (`#070b14`) + Electric blue (`#3b82f6`) + Soft purple (`#8b5cf6`)
- **X Account:** [@RepForgeZA](https://x.com/RepForgeZA)
- **Logo:** Circular monogram — see `/public/images/logo.png`

---

## Submission

- **Live Link:** https://repforge.onrender.com
- **GitHub:** https://github.com/yourusername/repforge
- **X Account:** https://x.com/RepForgeZA
- **Product Name:** RepForge
- **Short Explanation:** RepForge is a personal reputation toolkit for Zero Authority DAO builders — it pulls your bounties, gigs, quests, and rep score from the ZA API and presents them in one polished dashboard with skill-matched opportunity discovery, shareable on-chain portfolios, ecosystem analytics, and an AI assistant.

---

Built with ❤️ on Zero Authority DAO + Stacks Blockchain
