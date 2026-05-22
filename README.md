# madb — Mary Adrianne D. Bisoy Portfolio

Personal portfolio of Mary Adrianne D. Bisoy (YxnZx / madb), built with Next.js, Tailwind CSS, and Lucide React icons.

## Profile Photos

Place your two profile photos in the `/public` folder:
- `profile-light.jpg` — shown in **light mode**
- `profile-dark.jpg`  — shown in **dark mode**

## Getting Started (Local Dev)

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Deploy to GitHub + Vercel

### Step 1 — Push to GitHub

```bash
git init
git add .
git commit -m "initial commit: madb portfolio"
git branch -M main
git remote add origin https://github.com/Marshmallow707/madb-portfolio.git
git push -u origin main
```

### Step 2 — Deploy to Vercel

1. Go to [vercel.com](https://vercel.com) and sign in with GitHub
2. Click **"Add New Project"**
3. Import the `madb-portfolio` repository
4. Leave all settings as default (Vercel auto-detects Next.js)
5. Click **Deploy** — done!

Your site will be live at `madb-portfolio.vercel.app` (or a custom domain if you add one).

## Tech Stack

- [Next.js 15](https://nextjs.org/) — React framework
- [Tailwind CSS](https://tailwindcss.com/) — utility-first CSS
- [Lucide React](https://lucide.dev/) — icon library
- DM Serif Display + DM Mono + DM Sans (Google Fonts)

## Customization

All content is in `app/page.tsx` inside the `DATA` section at the top — easy to update projects, certs, skills, etc.
