# 🇧🇩 Popular Personalities of Bangladesh — Frontend

React 19 + Vite single-page application for the Popular Personalities of Bangladesh project.

> Full project docs, API reference, and setup guide live in the repo root: **[`../README.md`](../README.md)**

## Quick Start

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build → dist/
npm run lint     # oxlint
```

## Environment

```env
VITE_API_BASE_URL=https://your-backend.vercel.app
```

This is read by `src/api.js` and used by every page (Home, Categories, Search, Profile, and the Map).

## Scripts

| Script | Purpose |
|---|---|
| `dev` | Vite dev server (port 3000) |
| `build` | Production build to `dist/` |
| `preview` | Preview the production build |
| `lint` | Oxlint static analysis |