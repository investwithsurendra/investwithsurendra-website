# Invest With Surendra — Luxury Real Estate Platform

Production-ready Next.js 15 + MongoDB + Cloudinary luxury real estate website with full admin CMS, lead management, blog engine, and analytics-ready SEO.

**Founder:** Surendra Kumar Meena
**Contact:** +91 9352835139 • surendra.kumar.ctl@gmail.com

---

## Tech Stack

- **Framework:** Next.js 15 (App Router) + React 18
- **Styling:** Tailwind CSS + shadcn/ui + Framer Motion
- **Fonts:** Playfair Display (headings) + Poppins (body)
- **Database:** MongoDB
- **Auth:** JWT httpOnly cookies (custom)
- **Media/CDN:** Cloudinary
- **Email:** Resend
- **Icons:** Lucide React

---

## Features

### Public Site
- Cinematic hero with drone video background + glassmorphism lead form
- 4 flagship JDA-approved townships (The Orbis SEZ, Silver Dune, Akira Living, Knowledge Park)
- Dynamic project pages `/projects/[slug]` with 10 sections each
- **Property Finder** with budget/location/goal filters
- **EMI Calculator** with interactive sliders + payment breakdown
- **ROI Calculator** with year-by-year projection chart
- **Blog** engine with markdown, categories, tags, SEO-optimized
- Contact page with map + full contact info
- Gallery masonry with category filters
- Google-style testimonials carousel
- FAQ accordion

### Admin Panel (`/admin`)
- Secure login (email + password from `.env`)
- Dashboard with lead status breakdown, recent leads, KPIs
- **Lead Management:** filter by status (New / Contacted / Follow Up / Site Visit Scheduled / Negotiation / Booked / Closed), export CSV, one-click Call/WhatsApp
- **Project CRUD:** add/edit/delete, publish/hide, image URLs, amenities, master plan, gallery
- **Blog CMS:** markdown editor, draft/publish, SEO title/description, categories, tags
- **Media Manager:** upload images/videos/PDFs to Cloudinary, copy CDN URLs
- **Gallery:** custom images with categories
- **Testimonials & FAQs** CRUD

### SEO & Growth
- Server-generated `sitemap.xml` + `robots.txt`
- Local Business JSON-LD schema (RealEstateAgent)
- Open Graph + Twitter cards
- Geo meta tags (India, Rajasthan, Jaipur coordinates)
- Google Analytics 4 hook
- Google Ads conversion tracking hook
- Meta (Facebook) Pixel hook
- Google Search Console verification hook
- All tracking via env vars — no code changes needed to activate

### Integrations
- **WhatsApp:** `wa.me` deep links across all CTAs (opens WhatsApp on user device)
- **Email notifications:** Every lead auto-emailed to Surendra via Resend
- **Cloudinary:** Full media upload pipeline (images, video, PDF brochures)
- **MongoDB:** All content and leads persisted

---

## Environment Variables

Create `.env` at project root:

```env
# Database (already configured)
MONGO_URL=mongodb://localhost:27017
DB_NAME=invest_with_surendra
NEXT_PUBLIC_BASE_URL=https://www.investwithsurendra.com

# Admin Auth
ADMIN_EMAIL=surendra.kumar.ctl@gmail.com
ADMIN_PASSWORD="Surendra@2026#IWS"
AUTH_SECRET=<random 64-char string>

# Cloudinary — get from https://cloudinary.com dashboard
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=

# Resend — get from https://resend.com
RESEND_API_KEY=
RESEND_FROM_EMAIL=onboarding@resend.dev
NOTIFICATION_EMAIL=surendra.kumar.ctl@gmail.com

# Tracking (all optional; add anytime)
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
NEXT_PUBLIC_META_PIXEL_ID=
NEXT_PUBLIC_GADS_ID=AW-XXXXXXX
NEXT_PUBLIC_GADS_LABEL=
NEXT_PUBLIC_GSC_VERIFICATION=

# WhatsApp
NEXT_PUBLIC_WHATSAPP_NUMBER=919352835139
```

> **Important:** If a password contains `#`, wrap it in quotes (`"..."`) or dotenv will treat everything after `#` as a comment.

---

## Local Development

```bash
yarn install
yarn dev
```

Site: http://localhost:3000
Admin: http://localhost:3000/admin/login

---

## Deployment to Vercel

1. Push to GitHub
2. Import repo into Vercel
3. Add environment variables (as above) in Vercel dashboard
4. Deploy — Next.js is auto-detected
5. Point `www.investwithsurendra.com` to Vercel in your DNS

**MongoDB in production:** Use MongoDB Atlas free tier — replace `MONGO_URL` with the Atlas connection string.

---

## Folder Structure

```
app/
├── layout.js             # Root layout + SEO + analytics injection
├── page.js               # Homepage
├── globals.css
├── sitemap.js            # Dynamic sitemap
├── robots.js             # Robots.txt
├── api/[[...path]]/      # Universal API handler (all CRUD)
├── admin/                # Admin panel (protected)
│   ├── layout.js
│   ├── page.js           # Dashboard
│   ├── login/
│   ├── leads/
│   ├── projects/
│   ├── blog/
│   ├── media/
│   ├── gallery/
│   ├── testimonials/
│   └── faqs/
├── projects/
│   ├── page.js           # All projects
│   └── [slug]/           # Dynamic project detail
├── blog/
│   ├── page.js
│   └── [slug]/
├── contact/
├── property-finder/
└── tools/
    ├── emi-calculator/
    └── roi-calculator/
components/
├── ui/                   # shadcn/ui components
├── admin/AdminShell.js
└── site/Chrome.js        # Site Header/Footer/Floating buttons
lib/
├── mongo.js              # DB connection
├── auth.js               # JWT session helpers
├── cloudinary.js
├── email.js              # Resend integration
├── shared.js             # Nav links, constants
└── projects.js           # Seed project data
```

---

## API Endpoints

All under `/api/`:

### Public
- `POST /api/leads` — Submit lead
- `POST /api/contact` — Contact form
- `GET /api/projects` — Published projects
- `GET /api/projects/:slug` — Single project
- `GET /api/blogs` — Published blogs
- `GET /api/blogs/:slug` — Single blog
- `GET /api/testimonials` — Published testimonials
- `GET /api/faqs` — Published FAQs
- `GET /api/gallery` — Gallery items

### Admin (auth required)
- `POST /api/auth/login` / `POST /api/auth/logout` / `GET /api/auth/me`
- `GET /api/leads` — All leads (with `?status=...` filter)
- `PATCH /api/leads/:id` — Update lead status
- `DELETE /api/leads/:id`
- `GET /api/leads/export` — CSV export
- `GET /api/admin/stats` — Dashboard KPIs
- `POST/PUT/DELETE /api/projects/:slug`
- `POST/PUT/DELETE /api/blogs/:slug`
- `POST/PUT/DELETE /api/testimonials/:id`
- `POST/PUT/DELETE /api/faqs/:id`
- `POST/DELETE /api/gallery/:id`
- `POST /api/media/upload` — Cloudinary upload
- `GET /api/media` — List uploads
- `DELETE /api/media/:id`

---

## What's Needed From You

Before going live, please provide the following via Vercel env vars:

| # | Variable | Source | Purpose |
|---|---|---|---|
| 1 | `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET` | Sign up at [cloudinary.com](https://cloudinary.com) (free tier, 25 GB) | Image/video/PDF uploads |
| 2 | `RESEND_API_KEY` | Sign up at [resend.com](https://resend.com) (free 3000 emails/mo) | Lead email notifications |
| 3 | `NEXT_PUBLIC_GA_ID` | Google Analytics 4 property | Traffic analytics |
| 4 | `NEXT_PUBLIC_GADS_ID` + `NEXT_PUBLIC_GADS_LABEL` | Google Ads account | Lead conversion tracking |
| 5 | `NEXT_PUBLIC_META_PIXEL_ID` | Meta Business Suite | Facebook / Instagram Ads tracking |
| 6 | `NEXT_PUBLIC_GSC_VERIFICATION` | Google Search Console | Site verification |

Everything else is already configured and running.

---

© 2026 Invest With Surendra • Built with luxury real estate lead generation in mind.
