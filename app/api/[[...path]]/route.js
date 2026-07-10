import { NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";
import { getDb, stripId } from "@/lib/mongo";
import {
  signToken,
  getSessionFromRequest,
  setAuthCookieHeader,
  clearAuthCookieHeader,
} from "@/lib/auth";
import { uploadToCloudinary, isCloudinaryConfigured } from "@/lib/cloudinary";
import { sendLeadEmail } from "@/lib/email";
import { PROJECTS as SEED_PROJECTS } from "@/lib/projects";

const cors = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export async function OPTIONS() {
  return new NextResponse(null, { status: 204, headers: cors });
}

const json = (data, opts = {}) =>
  NextResponse.json(data, { ...opts, headers: { ...cors, ...(opts.headers || {}) } });

const err = (msg, status = 400, extra) =>
  json({ error: msg, ...(extra || {}) }, { status });

async function requireAdmin(request) {
  const session = await getSessionFromRequest(request);
  if (!session || session.role !== "admin") return null;
  return session;
}

// Ensure default seed projects exist in DB
async function ensureSeedProjects(db) {
  const col = db.collection("projects");
  const count = await col.countDocuments({ seeded: true });
  if (count === 0) {
    const docs = SEED_PROJECTS.map((p) => ({
      id: uuidv4(),
      seeded: true,
      published: true,
      createdAt: new Date().toISOString(),
      ...p,
    }));
    if (docs.length) await col.insertMany(docs);
  }
}

// Seed default FAQs & testimonials once
const DEFAULT_FAQS = [
  { q: "What does JDA Approved mean?", a: "JDA (Jaipur Development Authority) approval means the layout, roads, and infrastructure of the township are legally sanctioned by the Jaipur Development Authority. It ensures your plot has a clear title, proper land conversion, and can be legally registered in your name." },
  { q: "Is RERA registration necessary?", a: "Yes. RERA (Real Estate Regulatory Authority) registration provides legal protection to buyers. All projects we recommend are RERA registered, ensuring timely delivery, transparent pricing, and refund/compensation rights as per the RERA Act 2016." },
  { q: "How much home loan can I get?", a: "We help arrange 80\u201390% home loan from top banks like SBI, HDFC, ICICI, Axis Bank, and Bank of Baroda. Interest rates start from 8.4% p.a. Our loan team handles complete documentation." },
  { q: "Can NRIs invest in these plots?", a: "Absolutely. All our JDA approved plots are open to NRI investment as per FEMA guidelines. We handle remote site visits (video tours), PoA execution, registry, and post-purchase management \u2014 everything without you needing to fly down." },
  { q: "What is the registry process?", a: "Once you finalize a plot, our team prepares the sale deed, verifies the seller's title, and coordinates with the sub-registrar office. Registry typically takes 10\u201315 days. Stamp duty (5% in Rajasthan) and registration fees are paid at the time of registry." },
  { q: "How long does site visit take?", a: "A standard site visit takes 2\u20133 hours including project tour, master plan discussion, plot selection, and pricing. Book a free visit via WhatsApp or the form \u2014 we arrange pickup/drop from Jaipur city too." },
  { q: "What is your commission or fees?", a: "There is ZERO buyer-side commission for our clients. We are compensated by the developer as their official channel partner. You pay only the plot cost + government fees. Everything is disclosed in writing." },
  { q: "How do I verify the plot before buying?", a: "We provide: JDA approval letter, RERA certificate, seller's title chain, latest jamabandi, land conversion order, and encumbrance certificate. Our legal partners physically verify each document before booking." },
];

const DEFAULT_TESTIMONIALS = [
  { name: "Rajeev Sharma", role: "IT Professional, Bengaluru", text: "Surendra ji made my first plot purchase in Jaipur completely stress-free. Transparent pricing, JDA approval verified — highly recommended for NRIs and outstation buyers.", rating: 5, avatar: "RS", published: true },
  { name: "Priya & Amit Agarwal", role: "Business Family, Delhi", text: "We booked a plot at Silver Dune with 85% bank loan help. Registry was done in 15 days. Excellent service from the entire Invest With Surendra team.", rating: 5, avatar: "PA", published: true },
  { name: "Dr. Mahesh Meena", role: "Doctor, Jaipur", text: "Genuine advice, no false promises. Surendra explained appreciation potential clearly. Value of my plot has already increased 40% in 2 years.", rating: 5, avatar: "MM", published: true },
  { name: "Vikram Singhania", role: "NRI, Dubai", text: "Being an NRI, I was worried about property fraud. Surendra handled everything remotely — from site visit videos to registry. Truly transparent!", rating: 5, avatar: "VS", published: true },
  { name: "Neha Gupta", role: "Home Buyer, Jaipur", text: "Got my dream plot in Akira Living. Legal team explained every document. Bank loan was approved in 10 days. Best real estate experience!", rating: 5, avatar: "NG", published: true },
  { name: "Anil Kumar", role: "Investor, Mumbai", text: "Purchased 2 plots in Orbis SEZ as investment. The location advice was spot-on — already seeing 30% appreciation in 18 months.", rating: 5, avatar: "AK", published: true },
];

async function ensureSeedFaqs(db) {
  const col = db.collection("faqs");
  const count = await col.countDocuments({});
  if (count === 0) {
    await col.insertMany(DEFAULT_FAQS.map((f, i) => ({ id: uuidv4(), order: i, published: true, createdAt: new Date().toISOString(), ...f })));
  }
}
async function ensureSeedTestimonials(db) {
  const col = db.collection("testimonials");
  const count = await col.countDocuments({});
  if (count === 0) {
    await col.insertMany(DEFAULT_TESTIMONIALS.map((t, i) => ({ id: uuidv4(), order: i, createdAt: new Date().toISOString(), ...t })));
  }
}

const { pathname } = new URL(request.url);
const route = pathname.replace("/api", "") || "/";
const method = request.method;
  try {
    const db = await getDb();

    // ---------- HEALTH ----------
    if (route === "/" || route === "/health") {
      return json({ status: "ok", app: "Invest With Surendra", time: new Date().toISOString() });
    }

    // ---------- AUTH ----------
    if (route === "/auth/login" && method === "POST") {
      const { email, password } = await request.json();
      if (email !== process.env.ADMIN_EMAIL || password !== process.env.ADMIN_PASSWORD) {
        return err("Invalid email or password", 401);
      }
      const token = signToken({ email, role: "admin" });
      return new NextResponse(JSON.stringify({ success: true, email }), {
        status: 200,
        headers: { ...cors, "Content-Type": "application/json", "Set-Cookie": setAuthCookieHeader(token) },
      });
    }
    if (route === "/auth/logout" && method === "POST") {
      return new NextResponse(JSON.stringify({ success: true }), {
        status: 200,
        headers: { ...cors, "Content-Type": "application/json", "Set-Cookie": clearAuthCookieHeader() },
      });
    }
    if (route === "/auth/me") {
      const s = await getSessionFromRequest(request);
      return json({ authenticated: !!s, user: s });
    }

    // ---------- LEADS ----------
    if (route === "/leads" && method === "POST") {
      const body = await request.json();
      const { name, mobile, project, budget, visitDate, source, message, email: eml, propertyGoal, location } = body || {};
      if (!name || !mobile) return err("Name and mobile are required.");
      const lead = {
        id: uuidv4(),
        name: String(name).trim(),
        mobile: String(mobile).trim(),
        email: eml ? String(eml).trim() : "",
        project: project ? String(project).trim() : "",
        budget: budget ? String(budget).trim() : "",
        visitDate: visitDate ? String(visitDate).trim() : "",
        message: message ? String(message).trim() : "",
        source: source || "website",
        propertyGoal: propertyGoal || "",
        location: location || "",
        status: "New",
        notes: [],
        createdAt: new Date().toISOString(),
      };
      await db.collection("leads").insertOne(lead);
      // fire email (non-blocking best-effort)
      sendLeadEmail(lead).catch(() => {});
      return json({ success: true, message: "Thanks! Our team will contact you shortly.", lead: stripId(lead) });
    }

    if (route === "/leads" && method === "GET") {
      if (!(await requireAdmin(request))) return err("Unauthorized", 401);
      const { searchParams } = new URL(request.url);
      const status = searchParams.get("status");
      const q = status ? { status } : {};
      const leads = await db.collection("leads").find(q, { projection: { _id: 0 } }).sort({ createdAt: -1 }).limit(500).toArray();
      return json({ leads });
    }

    if (route.startsWith("/leads/") && method === "PATCH") {
      if (!(await requireAdmin(request))) return err("Unauthorized", 401);
      const id = route.split("/")[2];
      const patch = await request.json();
      const allowed = ["status", "notes", "assignedTo"];
      const update = {};
      for (const k of allowed) if (k in patch) update[k] = patch[k];
      update.updatedAt = new Date().toISOString();
      await db.collection("leads").updateOne({ id }, { $set: update });
      const lead = await db.collection("leads").findOne({ id }, { projection: { _id: 0 } });
      return json({ success: true, lead });
    }

    if (route.startsWith("/leads/") && method === "DELETE") {
      if (!(await requireAdmin(request))) return err("Unauthorized", 401);
      const id = route.split("/")[2];
      await db.collection("leads").deleteOne({ id });
      return json({ success: true });
    }

    if (route === "/leads/export" && method === "GET") {
      if (!(await requireAdmin(request))) return err("Unauthorized", 401);
      const leads = await db.collection("leads").find({}, { projection: { _id: 0 } }).sort({ createdAt: -1 }).toArray();
      const cols = ["createdAt", "name", "mobile", "email", "project", "budget", "visitDate", "status", "source", "message"];
      const escape = (v) => `"${String(v || "").replace(/"/g, '""')}"`;
      const rows = [cols.join(",")];
      for (const l of leads) rows.push(cols.map((c) => escape(l[c])).join(","));
      const csv = rows.join("\n");
      return new NextResponse(csv, {
        status: 200,
        headers: {
          ...cors,
          "Content-Type": "text/csv; charset=utf-8",
          "Content-Disposition": `attachment; filename=\"iws-leads-${Date.now()}.csv\"`,
        },
      });
    }

    // ---------- PROJECTS ----------
    if (route === "/projects" && method === "GET") {
      await ensureSeedProjects(db);
      const items = await db.collection("projects").find({ published: { $ne: false } }, { projection: { _id: 0 } }).sort({ createdAt: -1 }).toArray();
      return json({ projects: items });
    }

    if (route === "/projects/all" && method === "GET") {
      if (!(await requireAdmin(request))) return err("Unauthorized", 401);
      await ensureSeedProjects(db);
      const items = await db.collection("projects").find({}, { projection: { _id: 0 } }).sort({ createdAt: -1 }).toArray();
      return json({ projects: items });
    }

    if (route.startsWith("/projects/") && method === "GET") {
      await ensureSeedProjects(db);
      const slug = route.split("/")[2];
      const item = await db.collection("projects").findOne({ slug }, { projection: { _id: 0 } });
      if (!item) return err("Project not found", 404);
      return json({ project: item });
    }

    if (route === "/projects" && method === "POST") {
      if (!(await requireAdmin(request))) return err("Unauthorized", 401);
      const body = await request.json();
      if (!body.name || !body.slug) return err("Name and slug required.");
      const doc = {
        id: uuidv4(),
        slug: body.slug,
        name: body.name,
        tagline: body.tagline || "",
        location: body.location || "",
        price: body.price || "",
        size: body.size || "",
        highlight: body.highlight || "",
        approvals: body.approvals || ["JDA Approved", "RERA Registered"],
        overview: body.overview || "",
        amenities: body.amenities || [],
        locationAdvantages: body.locationAdvantages || [],
        gallery: body.gallery || [],
        card: body.card || body.hero || "",
        hero: body.hero || body.card || "",
        masterPlanImg: body.masterPlanImg || "",
        brochureUrl: body.brochureUrl || "",
        published: body.published !== false,
        seeded: false,
        createdAt: new Date().toISOString(),
      };
      await db.collection("projects").insertOne(doc);
      return json({ success: true, project: stripId(doc) });
    }

    if (route.startsWith("/projects/") && method === "PUT") {
      if (!(await requireAdmin(request))) return err("Unauthorized", 401);
      const slug = route.split("/")[2];
      const body = await request.json();
      const update = { ...body, updatedAt: new Date().toISOString() };
      delete update._id;
      delete update.id;
      delete update.slug;
      await db.collection("projects").updateOne({ slug }, { $set: update });
      const item = await db.collection("projects").findOne({ slug }, { projection: { _id: 0 } });
      return json({ success: true, project: item });
    }

    if (route.startsWith("/projects/") && method === "DELETE") {
      if (!(await requireAdmin(request))) return err("Unauthorized", 401);
      const slug = route.split("/")[2];
      await db.collection("projects").deleteOne({ slug, seeded: { $ne: true } });
      return json({ success: true });
    }

    // ---------- BLOGS ----------
    if (route === "/blogs" && method === "GET") {
      const items = await db.collection("blogs").find({ published: true }, { projection: { _id: 0 } }).sort({ createdAt: -1 }).toArray();
      return json({ blogs: items });
    }

    if (route === "/blogs/all" && method === "GET") {
      if (!(await requireAdmin(request))) return err("Unauthorized", 401);
      const items = await db.collection("blogs").find({}, { projection: { _id: 0 } }).sort({ createdAt: -1 }).toArray();
      return json({ blogs: items });
    }

    if (route.startsWith("/blogs/") && method === "GET") {
      const slug = route.split("/")[2];
      const item = await db.collection("blogs").findOne({ slug }, { projection: { _id: 0 } });
      if (!item) return err("Blog not found", 404);
      return json({ blog: item });
    }

    if (route === "/blogs" && method === "POST") {
      if (!(await requireAdmin(request))) return err("Unauthorized", 401);
      const b = await request.json();
      if (!b.title || !b.slug || !b.content) return err("Title, slug and content required.");
      const doc = {
        id: uuidv4(),
        title: b.title,
        slug: b.slug,
        excerpt: b.excerpt || "",
        content: b.content,
        featuredImage: b.featuredImage || "",
        category: b.category || "General",
        tags: b.tags || [],
        author: b.author || "Surendra Kumar Meena",
        published: !!b.published,
        seoTitle: b.seoTitle || b.title,
        seoDescription: b.seoDescription || b.excerpt,
        createdAt: new Date().toISOString(),
      };
      await db.collection("blogs").insertOne(doc);
      return json({ success: true, blog: stripId(doc) });
    }

    if (route.startsWith("/blogs/") && method === "PUT") {
      if (!(await requireAdmin(request))) return err("Unauthorized", 401);
      const slug = route.split("/")[2];
      const b = await request.json();
      const update = { ...b, updatedAt: new Date().toISOString() };
      delete update._id;
      delete update.id;
      await db.collection("blogs").updateOne({ slug }, { $set: update });
      const item = await db.collection("blogs").findOne({ slug: update.slug || slug }, { projection: { _id: 0 } });
      return json({ success: true, blog: item });
    }

    if (route.startsWith("/blogs/") && method === "DELETE") {
      if (!(await requireAdmin(request))) return err("Unauthorized", 401);
      const slug = route.split("/")[2];
      await db.collection("blogs").deleteOne({ slug });
      return json({ success: true });
    }

    // ---------- TESTIMONIALS ----------
    if (route === "/testimonials" && method === "GET") {
      await ensureSeedTestimonials(db);
      const items = await db.collection("testimonials").find({ published: { $ne: false } }, { projection: { _id: 0 } }).sort({ order: 1 }).toArray();
      return json({ testimonials: items });
    }
    if (route === "/testimonials" && method === "POST") {
      if (!(await requireAdmin(request))) return err("Unauthorized", 401);
      const b = await request.json();
      const doc = { id: uuidv4(), published: true, rating: 5, ...b, createdAt: new Date().toISOString() };
      if (!doc.avatar && doc.name) doc.avatar = doc.name.split(" ").map((s) => s[0]).slice(0, 2).join("").toUpperCase();
      await db.collection("testimonials").insertOne(doc);
      return json({ success: true, testimonial: stripId(doc) });
    }
    if (route.startsWith("/testimonials/") && method === "PUT") {
      if (!(await requireAdmin(request))) return err("Unauthorized", 401);
      const id = route.split("/")[2];
      const b = await request.json();
      await db.collection("testimonials").updateOne({ id }, { $set: { ...b, updatedAt: new Date().toISOString() } });
      return json({ success: true });
    }
    if (route.startsWith("/testimonials/") && method === "DELETE") {
      if (!(await requireAdmin(request))) return err("Unauthorized", 401);
      const id = route.split("/")[2];
      await db.collection("testimonials").deleteOne({ id });
      return json({ success: true });
    }

    // ---------- FAQs ----------
    if (route === "/faqs" && method === "GET") {
      await ensureSeedFaqs(db);
      const items = await db.collection("faqs").find({ published: { $ne: false } }, { projection: { _id: 0 } }).sort({ order: 1 }).toArray();
      return json({ faqs: items });
    }
    if (route === "/faqs" && method === "POST") {
      if (!(await requireAdmin(request))) return err("Unauthorized", 401);
      const b = await request.json();
      const doc = { id: uuidv4(), published: true, order: b.order ?? 999, q: b.q, a: b.a, createdAt: new Date().toISOString() };
      await db.collection("faqs").insertOne(doc);
      return json({ success: true, faq: stripId(doc) });
    }
    if (route.startsWith("/faqs/") && method === "PUT") {
      if (!(await requireAdmin(request))) return err("Unauthorized", 401);
      const id = route.split("/")[2];
      const b = await request.json();
      await db.collection("faqs").updateOne({ id }, { $set: { ...b, updatedAt: new Date().toISOString() } });
      return json({ success: true });
    }
    if (route.startsWith("/faqs/") && method === "DELETE") {
      if (!(await requireAdmin(request))) return err("Unauthorized", 401);
      const id = route.split("/")[2];
      await db.collection("faqs").deleteOne({ id });
      return json({ success: true });
    }

    // ---------- GALLERY ----------
    if (route === "/gallery" && method === "GET") {
      const items = await db.collection("gallery").find({}, { projection: { _id: 0 } }).sort({ createdAt: -1 }).toArray();
      return json({ items });
    }
    if (route === "/gallery" && method === "POST") {
      if (!(await requireAdmin(request))) return err("Unauthorized", 401);
      const b = await request.json();
      if (!b.src) return err("Image URL required.");
      const doc = { id: uuidv4(), src: b.src, category: b.category || "Township", caption: b.caption || "", tall: !!b.tall, createdAt: new Date().toISOString() };
      await db.collection("gallery").insertOne(doc);
      return json({ success: true, item: stripId(doc) });
    }
    if (route.startsWith("/gallery/") && method === "DELETE") {
      if (!(await requireAdmin(request))) return err("Unauthorized", 401);
      const id = route.split("/")[2];
      await db.collection("gallery").deleteOne({ id });
      return json({ success: true });
    }

    // ---------- MEDIA (Cloudinary upload) ----------
    if (route === "/media/upload" && method === "POST") {
      if (!(await requireAdmin(request))) return err("Unauthorized", 401);
      if (!isCloudinaryConfigured()) {
        return err("Cloudinary not configured. Add CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET to .env", 503);
      }
      const form = await request.formData();
      const file = form.get("file");
      const folder = (form.get("folder") || "iws").toString();
      const type = (form.get("type") || "image").toString();
      if (!file || typeof file === "string") return err("No file uploaded.");
      const buffer = Buffer.from(await file.arrayBuffer());
      const resType = type === "raw" ? "raw" : type === "video" ? "video" : type === "image" ? "image" : "auto";
      const result = await uploadToCloudinary(buffer, folder, resType);
      const doc = {
        id: uuidv4(),
        publicId: result.public_id,
        url: result.secure_url,
        format: result.format,
        resourceType: result.resource_type,
        bytes: result.bytes,
        folder,
        originalName: file.name || "",
        createdAt: new Date().toISOString(),
      };
      await db.collection("media").insertOne(doc);
      return json({ success: true, media: stripId(doc) });
    }

    if (route === "/media" && method === "GET") {
      if (!(await requireAdmin(request))) return err("Unauthorized", 401);
      const items = await db.collection("media").find({}, { projection: { _id: 0 } }).sort({ createdAt: -1 }).limit(200).toArray();
      return json({ items });
    }
    if (route.startsWith("/media/") && method === "DELETE") {
      if (!(await requireAdmin(request))) return err("Unauthorized", 401);
      const id = route.split("/")[2];
      await db.collection("media").deleteOne({ id });
      return json({ success: true });
    }

    // ---------- CONTACT ----------
    if (route === "/contact" && method === "POST") {
      const b = await request.json();
      if (!b.name || !b.email || !b.mobile) return err("Name, email and mobile required.");
      const doc = {
        id: uuidv4(),
        name: b.name,
        email: b.email,
        mobile: b.mobile,
        subject: b.subject || "",
        message: b.message || "",
        source: "contact_page",
        status: "New",
        createdAt: new Date().toISOString(),
      };
      await db.collection("leads").insertOne({ ...doc, project: "", budget: "", visitDate: "" });
      sendLeadEmail(doc).catch(() => {});
      return json({ success: true, message: "Thanks! We'll get back to you within 24 hours." });
    }

    // ---------- ADMIN STATS ----------
    if (route === "/admin/stats" && method === "GET") {
      if (!(await requireAdmin(request))) return err("Unauthorized", 401);
      const [leadsTotal, leadsNew, leadsBooked, projects, blogs, testimonials, media] = await Promise.all([
        db.collection("leads").countDocuments({}),
        db.collection("leads").countDocuments({ status: "New" }),
        db.collection("leads").countDocuments({ status: "Booked" }),
        db.collection("projects").countDocuments({}),
        db.collection("blogs").countDocuments({}),
        db.collection("testimonials").countDocuments({}),
        db.collection("media").countDocuments({}),
      ]);
      // recent 5 leads
      const recentLeads = await db.collection("leads").find({}, { projection: { _id: 0 } }).sort({ createdAt: -1 }).limit(5).toArray();
      // status breakdown
      const statuses = ["New", "Contacted", "Follow Up", "Site Visit Scheduled", "Negotiation", "Booked", "Closed"];
      const statusCounts = {};
      for (const s of statuses) {
        statusCounts[s] = await db.collection("leads").countDocuments({ status: s });
      }
      return json({
        counts: { leadsTotal, leadsNew, leadsBooked, projects, blogs, testimonials, media },
        recentLeads,
        statusCounts,
      });
    }

    return err(`Route not found: ${method} ${route}`, 404);
  } catch (e) {
    console.error("API error:", e);
    return err("Internal server error: " + e.message, 500);
  }
}

export const GET = handler;
export const POST = handler;
export const PUT = handler;
export const PATCH = handler;
export const DELETE = handler;
