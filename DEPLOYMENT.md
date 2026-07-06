# Deployment Guide — Invest With Surendra

This document walks you through deploying the website to production.

---

## 🚀 Recommended: Deploy to Vercel (Free tier works)

### Step 1 — Prepare MongoDB (production database)

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) → Sign up (free)
2. Create a new **Cluster M0 (Free)** in any region close to India (e.g., Mumbai)
3. **Database Access** → Add User (username + password)
4. **Network Access** → Add IP `0.0.0.0/0` (allow from anywhere — Vercel uses dynamic IPs)
5. **Connect** → **Connect your application** → copy the URI
   - Example: `mongodb+srv://<user>:<password>@cluster0.xxxx.mongodb.net/?retryWrites=true&w=majority`

### Step 2 — Get Cloudinary credentials

1. Sign up at [cloudinary.com](https://cloudinary.com) (free 25 GB)
2. Dashboard → copy **Cloud Name**, **API Key**, **API Secret**

### Step 3 — Get Resend API key (email notifications)

1. Sign up at [resend.com](https://resend.com) → free 3000 emails/mo
2. **API Keys** → Create API key
3. (Optional) Verify your custom domain at Resend to send from `leads@investwithsurendra.com`

### Step 4 — Push code to GitHub

Already done → https://github.com/investwithsurendra/investwithsurendra-website

### Step 5 — Deploy on Vercel

1. Go to [vercel.com](https://vercel.com) → sign in with GitHub
2. **Add New Project** → select `investwithsurendra-website`
3. Framework Preset: **Next.js** (auto-detected)
4. Environment Variables → add all from `.env.example`:

```
MONGO_URL=mongodb+srv://...  (Atlas URI)
DB_NAME=invest_with_surendra
NEXT_PUBLIC_BASE_URL=https://www.investwithsurendra.com
ADMIN_EMAIL=surendra.kumar.ctl@gmail.com
ADMIN_PASSWORD=Surendra@2026#IWS
AUTH_SECRET=<paste output of: openssl rand -hex 32>
CLOUDINARY_CLOUD_NAME=<your_cloud>
CLOUDINARY_API_KEY=<your_key>
CLOUDINARY_API_SECRET=<your_secret>
RESEND_API_KEY=<your_resend_key>
RESEND_FROM_EMAIL=onboarding@resend.dev
NOTIFICATION_EMAIL=surendra.kumar.ctl@gmail.com
NEXT_PUBLIC_WHATSAPP_NUMBER=919352835139
```

5. Click **Deploy**. Wait ∼2 minutes.

### Step 6 — Point your domain to Vercel

1. Vercel project → **Settings** → **Domains** → Add `investwithsurendra.com` and `www.investwithsurendra.com`
2. Copy the DNS records Vercel shows (A record + CNAME)
3. Go to your domain registrar (GoDaddy / Namecheap / Google Domains) and update:
   - **A record** `@` → Vercel's IP
   - **CNAME** `www` → `cname.vercel-dns.com`
4. DNS propagates in 10–60 minutes

### Step 7 — Add analytics IDs (anytime post-launch)

Go back to Vercel → Environment Variables → add:
- `NEXT_PUBLIC_GA_ID` (Google Analytics 4)
- `NEXT_PUBLIC_META_PIXEL_ID` (Meta Pixel)
- `NEXT_PUBLIC_GADS_ID` + `NEXT_PUBLIC_GADS_LABEL` (Google Ads)
- `NEXT_PUBLIC_GSC_VERIFICATION` (Search Console)

Redeploy → tracking activates automatically.

---

## 🎛️ Post-Launch Checklist

- [ ] Test the full flow: submit lead → receive email → see it in `/admin/leads`
- [ ] Login to admin → add real projects and gallery photos via Media panel
- [ ] Write 2–3 blog posts to seed SEO (JDA plots, RERA rules, home loan tips)
- [ ] Submit sitemap to Google Search Console: `https://www.investwithsurendra.com/sitemap.xml`
- [ ] Submit sitemap to Bing Webmaster Tools
- [ ] Set up Google Business Profile with same address, phone, categories
- [ ] Enable Vercel Analytics (Settings → Analytics, free)
- [ ] Set up UptimeRobot or Better Uptime free monitor
- [ ] Backup MongoDB Atlas weekly (Atlas UI → Backup)

---

## 🔒 Security Notes

- **NEVER** commit real `.env` to git — the `.gitignore` handles this
- **Change `AUTH_SECRET`** to a random 64-char string in production
- The admin panel is at `/admin/login` (blocked by `robots.txt` from search engines)
- Every admin API endpoint requires a valid JWT cookie
- Consider rotating `ADMIN_PASSWORD` every 6 months

---

## 🐛 Troubleshooting

**Login fails after deploy**
- Check `ADMIN_PASSWORD` in Vercel env vars is wrapped in quotes if it contains `#`
- Check `AUTH_SECRET` is set (any random string works, but keep it consistent)

**Cloudinary upload returns 503**
- Add all 3 Cloudinary env vars (Cloud Name, API Key, API Secret) and redeploy

**Email notifications not arriving**
- Add `RESEND_API_KEY` env var
- Check spam folder
- For custom domain sending, verify domain at Resend dashboard

**Database connection error**
- Ensure MongoDB Atlas Network Access allows `0.0.0.0/0`
- Verify `MONGO_URL` username/password are URL-encoded (no special chars break the URI)

---

© 2026 Invest With Surendra. Built for luxury real estate lead generation.
