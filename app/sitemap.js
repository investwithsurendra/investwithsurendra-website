import { getDb } from "@/lib/mongo";
import { SITE_URL } from "@/lib/shared";
import { PROJECTS as SEED } from "@/lib/projects";

export default async function sitemap() {
  const now = new Date().toISOString();
  const staticPages = [
    { url: `${SITE_URL}/`, changeFrequency: "weekly", priority: 1.0, lastModified: now },
    { url: `${SITE_URL}/projects`, changeFrequency: "weekly", priority: 0.9, lastModified: now },
    { url: `${SITE_URL}/property-finder`, changeFrequency: "weekly", priority: 0.9, lastModified: now },
    { url: `${SITE_URL}/tools/emi-calculator`, changeFrequency: "monthly", priority: 0.7, lastModified: now },
    { url: `${SITE_URL}/tools/roi-calculator`, changeFrequency: "monthly", priority: 0.7, lastModified: now },
    { url: `${SITE_URL}/blog`, changeFrequency: "weekly", priority: 0.8, lastModified: now },
    { url: `${SITE_URL}/contact`, changeFrequency: "monthly", priority: 0.8, lastModified: now },
  ];

  try {
    const db = await getDb();
    const projects = await db.collection("projects").find({ published: { $ne: false } }, { projection: { slug: 1, updatedAt: 1, createdAt: 1 } }).toArray();
    const blogs = await db.collection("blogs").find({ published: true }, { projection: { slug: 1, updatedAt: 1, createdAt: 1 } }).toArray();

    const projPages = projects.map((p) => ({
      url: `${SITE_URL}/projects/${p.slug}`,
      lastModified: p.updatedAt || p.createdAt || now,
      changeFrequency: "weekly",
      priority: 0.85,
    }));
    const blogPages = blogs.map((b) => ({
      url: `${SITE_URL}/blog/${b.slug}`,
      lastModified: b.updatedAt || b.createdAt || now,
      changeFrequency: "monthly",
      priority: 0.7,
    }));

    return [...staticPages, ...projPages, ...blogPages];
  } catch {
    const seedPages = SEED.map((p) => ({
      url: `${SITE_URL}/projects/${p.slug}`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.85,
    }));
    return [...staticPages, ...seedPages];
  }
}
