import Link from "next/link";
import { getDb } from "@/lib/mongo";
import { SiteHeader, SiteFooter, FloatingActions } from "@/components/site/Chrome";
import { Calendar, User, ChevronRight, BookOpen } from "lucide-react";

export const metadata = {
  title: "Real Estate Blog \u2014 JDA Plots, RERA & Investment Guides | Invest With Surendra",
  description: "Expert insights on Jaipur real estate, JDA approved plots, RERA registered projects, home loans, and property investment strategies.",
};

export const dynamic = "force-dynamic";

async function getBlogs() {
  try {
    const db = await getDb();
    const items = await db.collection("blogs").find({ published: true }, { projection: { _id: 0 } }).sort({ createdAt: -1 }).toArray();
    return items;
  } catch { return []; }
}

export default async function BlogList() {
  const blogs = await getBlogs();

  return (
    <main className="bg-white min-h-screen">
      <SiteHeader />

      <section className="pt-32 pb-14 bg-primary text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_50%,rgba(200,155,60,0.2),transparent_60%)]" />
        <div className="container relative text-center">
          <div className="text-gold text-xs uppercase tracking-widest mb-3">Blog</div>
          <h1 className="font-display text-4xl md:text-6xl font-bold mb-3">Real Estate <span className="text-gold-gradient">Insights</span></h1>
          <p className="text-white/70 text-lg max-w-2xl mx-auto">Expert advice, market trends and investment guides for Jaipur real estate.</p>
        </div>
      </section>

      <section className="container py-16">
        {blogs.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-16 h-16 mx-auto rounded-full bg-slate-100 flex items-center justify-center mb-4"><BookOpen className="w-8 h-8 text-slate-400" /></div>
            <div className="font-display text-2xl text-primary mb-2">Blog coming soon!</div>
            <p className="text-slate-500">Fresh articles on JDA plots, RERA compliance and investment strategy are being prepared.</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogs.map((b) => (
              <Link key={b.slug} href={`/blog/${b.slug}`} className="group bg-white rounded-2xl overflow-hidden shadow-lg border border-gold/10 hover-lift">
                {b.featuredImage && (
                  <div className="aspect-video overflow-hidden bg-slate-100">
                    <img src={b.featuredImage} alt={b.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" loading="lazy" />
                  </div>
                )}
                <div className="p-6">
                  <div className="text-gold text-xs font-semibold uppercase tracking-widest mb-2">{b.category}</div>
                  <h2 className="font-display text-xl font-bold text-primary mb-2 group-hover:text-gold transition-colors line-clamp-2">{b.title}</h2>
                  <p className="text-primary/70 text-sm line-clamp-3 mb-4">{b.excerpt}</p>
                  <div className="flex items-center justify-between text-xs text-primary/60">
                    <div className="flex items-center gap-3">
                      <span className="flex items-center gap-1"><User className="w-3 h-3" /> {b.author}</span>
                      <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {new Date(b.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}</span>
                    </div>
                    <span className="text-gold flex items-center gap-1 font-semibold group-hover:gap-2 transition-all">Read <ChevronRight className="w-3 h-3" /></span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>

      <SiteFooter />
      <FloatingActions />
    </main>
  );
}
