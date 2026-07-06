import { notFound } from "next/navigation";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import { getDb } from "@/lib/mongo";
import { SiteHeader, SiteFooter, FloatingActions } from "@/components/site/Chrome";
import { Calendar, User, ArrowLeft, Tag } from "lucide-react";
import { SITE_URL } from "@/lib/shared";

export const dynamic = "force-dynamic";

async function getBlog(slug) {
  try {
    const db = await getDb();
    return await db.collection("blogs").findOne({ slug, published: true }, { projection: { _id: 0 } });
  } catch { return null; }
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const b = await getBlog(slug);
  if (!b) return { title: "Not Found" };
  return {
    title: `${b.seoTitle || b.title} | Invest With Surendra`,
    description: b.seoDescription || b.excerpt,
    openGraph: {
      title: b.seoTitle || b.title,
      description: b.seoDescription || b.excerpt,
      images: b.featuredImage ? [b.featuredImage] : [],
      type: "article",
      url: `${SITE_URL}/blog/${b.slug}`,
    },
  };
}

export default async function BlogDetail({ params }) {
  const { slug } = await params;
  const b = await getBlog(slug);
  if (!b) return notFound();

  return (
    <main className="bg-white min-h-screen">
      <SiteHeader />

      <article className="pt-24 pb-16">
        {b.featuredImage && (
          <div className="relative h-[45vh] md:h-[60vh] overflow-hidden">
            <img src={b.featuredImage} alt={b.title} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/40 to-transparent" />
            <div className="absolute bottom-0 inset-x-0 pb-12">
              <div className="container text-white">
                <Link href="/blog" className="inline-flex items-center gap-1 text-gold text-sm mb-4 hover:gap-2 transition-all"><ArrowLeft className="w-4 h-4" /> Back to Blog</Link>
                <div className="text-gold text-xs font-semibold uppercase tracking-widest mb-2">{b.category}</div>
                <h1 className="font-display text-3xl md:text-5xl lg:text-6xl font-bold max-w-4xl leading-tight">{b.title}</h1>
                <div className="flex flex-wrap gap-4 mt-6 text-sm text-white/80">
                  <span className="flex items-center gap-1"><User className="w-4 h-4 text-gold" /> {b.author}</span>
                  <span className="flex items-center gap-1"><Calendar className="w-4 h-4 text-gold" /> {new Date(b.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}</span>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="container max-w-3xl py-12">
          {!b.featuredImage && (
            <div className="mb-8">
              <Link href="/blog" className="inline-flex items-center gap-1 text-gold text-sm mb-4 hover:gap-2 transition-all"><ArrowLeft className="w-4 h-4" /> Back to Blog</Link>
              <div className="text-gold text-xs font-semibold uppercase tracking-widest mb-2">{b.category}</div>
              <h1 className="font-display text-4xl md:text-5xl font-bold text-primary">{b.title}</h1>
            </div>
          )}

          {b.excerpt && <p className="text-xl text-primary/70 leading-relaxed mb-8 font-light border-l-4 border-gold pl-6 italic">{b.excerpt}</p>}

          <div className="prose prose-lg max-w-none prose-headings:font-display prose-headings:text-primary prose-a:text-gold prose-strong:text-primary prose-blockquote:border-gold prose-blockquote:text-primary/80">
            <ReactMarkdown>{b.content}</ReactMarkdown>
          </div>

          {b.tags?.length > 0 && (
            <div className="mt-12 pt-6 border-t border-gold/20 flex flex-wrap items-center gap-2">
              <Tag className="w-4 h-4 text-gold" />
              {b.tags.map((t) => <span key={t} className="bg-secondary text-primary/70 text-xs px-3 py-1 rounded-full">#{t}</span>)}
            </div>
          )}

          <div className="mt-12 bg-primary text-white rounded-2xl p-8 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(200,155,60,0.2),transparent_60%)]" />
            <div className="relative">
              <h3 className="font-display text-2xl font-bold mb-2">Ready to invest in a JDA approved plot?</h3>
              <p className="text-white/70 mb-4">Talk to Surendra Kumar Meena for expert guidance.</p>
              <Link href="/contact" className="inline-block bg-gold-gradient text-primary px-6 py-3 rounded-full font-semibold hover:brightness-110">Book Free Consultation →</Link>
            </div>
          </div>
        </div>
      </article>

      <SiteFooter />
      <FloatingActions />
    </main>
  );
}
