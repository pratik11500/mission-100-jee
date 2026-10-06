# JEE Tracker

A simple tracker app with Neon DB sync and dark mode default.

## File Structure

```text
jee-tracker/
├── index.html
├── package.json
└── api/
    └── tracker.js
```

## What each file does

- `index.html` → frontend UI, dark theme, edit mode, checklist
- `package.json` → installs backend dependencies
- `api/tracker.js` → Vercel serverless function for saving/loading data

## Environment Variables

Set these in **Vercel → Project → Settings → Environment Variables**:

- `DATABASE_URL` → your Neon connection string
- `EDIT_PASSWORD` → password for edit mode

Do not commit real secrets to GitHub.

## Deploy on Vercel

1. Push the project to GitHub.
2. Open **Vercel** and click **Add New → Project**.
3. Import your repo.
4. Set **Framework Preset** to **Other**.
5. Set **Root Directory** to the folder that contains `index.html` and `api/`.
6. Add the environment variables above.
7. Click **Deploy**.

## Test

- Open your Vercel link.
- The tracker should load and show **Synced**.
- Turn on edit mode, make a change, and refresh.
- The change should stay saved.

## Notes

- `api/tracker.js` must be inside `api/`
- `api/` must be at the repo root
- Do not open `index.html` directly on your computer
- If it shows **Offline** or **404**, check the path and environment variables
