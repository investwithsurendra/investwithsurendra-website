import Link from "next/link";
import { getDb } from "@/lib/mongo";
import { SiteHeader, SiteFooter, FloatingActions } from "@/components/site/Chrome";
import { PROJECTS as SEED } from "@/lib/projects";
import { MapPin, CheckCircle2, ChevronRight } from "lucide-react";

export const metadata = {
  title: "All Projects \u2014 JDA Approved Townships in Jaipur | Invest With Surendra",
  description: "Explore all JDA approved and RERA registered premium plot projects in Jaipur \u2014 Orbis SEZ, Silver Dune, Akira Living, Knowledge Park and more.",
};

export const dynamic = "force-dynamic";

async function getProjects() {
  try {
    const db = await getDb();
    const items = await db.collection("projects").find({ published: { $ne: false } }, { projection: { _id: 0 } }).sort({ createdAt: -1 }).toArray();
    return items.length ? items : SEED;
  } catch { return SEED; }
}

export default async function ProjectsList() {
  const projects = await getProjects();

  return (
    <main className="bg-white min-h-screen">
      <SiteHeader />
      <section className="pt-32 pb-14 bg-primary text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_50%,rgba(200,155,60,0.2),transparent_60%)]" />
        <div className="container relative text-center">
          <div className="text-gold text-xs uppercase tracking-widest mb-3">Our Portfolio</div>
          <h1 className="font-display text-4xl md:text-6xl font-bold mb-3">All <span className="text-gold-gradient">JDA Approved</span> Projects</h1>
          <p className="text-white/70 text-lg max-w-2xl mx-auto">Handpicked luxury townships across Jaipur's fastest-growing corridors.</p>
        </div>
      </section>
      <section className="container py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((p) => (
            <Link key={p.slug} href={`/projects/${p.slug}`} className="group bg-white rounded-2xl overflow-hidden shadow-lg border border-gold/10 hover-lift">
              <div className="relative h-56 overflow-hidden">
                <img src={p.card || p.hero} alt={p.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" loading="lazy" />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/70 to-transparent" />
                <div className="absolute top-3 left-3 right-3 flex flex-wrap gap-1.5">
                  {(p.approvals || []).map((a) => <span key={a} className="bg-gold text-primary text-[10px] font-bold px-2 py-1 rounded-full flex items-center gap-1"><CheckCircle2 className="w-3 h-3" /> {a}</span>)}
                </div>
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <div className="font-display text-xl font-bold">{p.name}</div>
                  <div className="text-xs opacity-90 flex items-center gap-1"><MapPin className="w-3 h-3" /> {p.location}</div>
                </div>
              </div>
              <div className="p-5">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-[10px] uppercase text-primary/60">Starting</div>
                    <div className="text-gold-gradient font-display text-xl font-bold">{p.price}</div>
                  </div>
                  <span className="text-gold flex items-center gap-1 text-sm font-semibold group-hover:gap-2 transition-all">View <ChevronRight className="w-4 h-4" /></span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
      <SiteFooter />
      <FloatingActions />
    </main>
  );
}
