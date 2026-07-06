"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Phone,
  MessageCircle,
  MapPin,
  Calendar,
  Download,
  CheckCircle2,
  ArrowLeft,
  Building2,
  Sparkles,
  ChevronRight,
  Trees,
  Shield,
  Waves,
  Dumbbell,
  Camera,
  Car,
  X,
} from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { PROJECTS, getRelatedProjects } from "@/lib/projects";
import { PHONE, PHONE_TEL, EMAIL, ADDRESS, MAP_EMBED, MAP_LINK, waLink } from "@/lib/shared";

function MiniHeader() {
  return (
    <header className="fixed top-0 inset-x-0 z-50 bg-primary/95 backdrop-blur-xl shadow-lg py-3 border-b border-gold/20">
      <div className="container mx-auto flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-full bg-gold-gradient flex items-center justify-center">
            <Building2 className="w-4 h-4 text-primary" />
          </div>
          <div className="leading-tight">
            <div className="font-display text-white text-base font-bold">
              Invest With <span className="text-gold-gradient">Surendra</span>
            </div>
            <div className="text-[10px] text-gold/90 tracking-widest uppercase">Premium Real Estate</div>
          </div>
        </Link>
        <div className="flex items-center gap-3">
          <Link href="/" className="hidden md:flex items-center gap-2 text-white/80 hover:text-gold text-sm">
            <ArrowLeft className="w-4 h-4" /> Back to Home
          </Link>
          <a href={waLink()} target="_blank" rel="noopener">
            <Button className="btn-gold rounded-full h-10 px-4">
              <MessageCircle className="w-4 h-4 mr-2" /> Enquire
            </Button>
          </a>
        </div>
      </div>
    </header>
  );
}

function ProjectHero({ p }) {
  return (
    <section className="relative min-h-[85vh] flex items-end overflow-hidden">
      <div className="absolute inset-0">
        <img src={p.hero} alt={p.name} className="w-full h-full object-cover animate-slow-zoom" />
        <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/50 to-primary/30" />
      </div>
      <div className="container relative z-10 pb-16 pt-32 text-white">
        <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9 }} className="max-w-3xl">
          <div className="flex flex-wrap gap-2 mb-4">
            {p.approvals.map((a) => (
              <span key={a} className="bg-gold text-primary text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> {a}
              </span>
            ))}
            <span className="bg-white/10 border border-gold/40 backdrop-blur text-gold text-xs font-semibold px-3 py-1.5 rounded-full">
              {p.highlight}
            </span>
          </div>
          <div className="text-gold text-sm uppercase tracking-[0.3em] mb-2">{p.tagline}</div>
          <h1 className="font-display text-5xl md:text-7xl font-bold mb-4 leading-[1.05]">{p.name}</h1>
          <div className="flex items-center gap-2 text-white/90 mb-6">
            <MapPin className="w-5 h-5 text-gold" /> <span className="text-lg">{p.location}</span>
          </div>
          <div className="flex flex-wrap gap-6 mb-8">
            <div>
              <div className="text-white/60 text-xs uppercase tracking-wider">Starting Price</div>
              <div className="text-gold-gradient font-display text-3xl font-bold">{p.price}</div>
            </div>
            <div>
              <div className="text-white/60 text-xs uppercase tracking-wider">Plot Sizes</div>
              <div className="text-white font-display text-3xl font-bold">{p.size}</div>
            </div>
          </div>
          <div className="flex flex-wrap gap-3">
            <a href={waLink(`Hi Surendra, please share brochure & details for ${p.name}.`)} target="_blank" rel="noopener">
              <Button className="btn-gold h-12 px-6 rounded-full font-semibold">
                <Download className="w-4 h-4 mr-2" /> Download Brochure
              </Button>
            </a>
            <a href={`tel:${PHONE_TEL}`}>
              <Button variant="outline" className="h-12 px-6 rounded-full border-white/40 text-white bg-white/5 hover:bg-white hover:text-primary backdrop-blur font-semibold">
                <Phone className="w-4 h-4 mr-2" /> Call Now
              </Button>
            </a>
            <a href="#lead-form">
              <Button variant="outline" className="h-12 px-6 rounded-full border-gold/60 text-gold bg-transparent hover:bg-gold hover:text-primary font-semibold">
                <Calendar className="w-4 h-4 mr-2" /> Book Site Visit
              </Button>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

const AMENITY_ICONS = [Trees, Shield, Waves, Dumbbell, Camera, Car, Sparkles, Building2, CheckCircle2, MapPin];

function Overview({ p }) {
  return (
    <section className="py-20 bg-white">
      <div className="container grid lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2">
          <div className="text-gold text-sm font-semibold tracking-[0.3em] uppercase mb-3">Overview</div>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-primary mb-6 leading-tight">
            A Township <span className="text-gold-gradient">Built for Legacy</span>
          </h2>
          <p className="text-primary/75 text-lg leading-relaxed mb-6">{p.overview}</p>
          <div className="grid sm:grid-cols-2 gap-3">
            {p.approvals.map((a) => (
              <div key={a} className="flex items-center gap-3 bg-secondary rounded-xl p-4">
                <div className="w-10 h-10 rounded-lg bg-gold-gradient flex items-center justify-center">
                  <CheckCircle2 className="w-5 h-5 text-primary" />
                </div>
                <div className="font-semibold text-primary">{a}</div>
              </div>
            ))}
          </div>
        </div>
        <aside className="bg-primary text-white rounded-2xl p-8 h-fit sticky top-24 border border-gold/20">
          <div className="font-display text-2xl font-bold mb-2">Instant Enquiry</div>
          <p className="text-white/70 text-sm mb-5">Talk to Surendra directly for pricing, availability & site visit.</p>
          <div className="space-y-3">
            <a href={`tel:${PHONE_TEL}`} className="flex items-center gap-3 bg-white/5 hover:bg-white/10 rounded-lg p-3 transition">
              <Phone className="w-5 h-5 text-gold" />
              <span className="font-semibold">{PHONE}</span>
            </a>
            <a href={waLink(`Hi Surendra, I'm interested in ${p.name}. Please share details.`)} target="_blank" rel="noopener" className="flex items-center gap-3 bg-[#25D366]/20 hover:bg-[#25D366]/30 rounded-lg p-3 transition">
              <MessageCircle className="w-5 h-5 text-[#25D366]" />
              <span className="font-semibold">WhatsApp Chat</span>
            </a>
            <a href="#lead-form" className="flex items-center gap-3 bg-gold-gradient text-primary rounded-lg p-3 hover:brightness-110">
              <Calendar className="w-5 h-5" />
              <span className="font-bold">Book Free Site Visit</span>
            </a>
          </div>
        </aside>
      </div>
    </section>
  );
}

function Amenities({ p }) {
  return (
    <section className="py-20 bg-secondary">
      <div className="container">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="text-gold text-sm font-semibold tracking-[0.3em] uppercase mb-3">World-Class Amenities</div>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-primary">Everything Your <span className="text-gold-gradient">Family Deserves</span></h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {p.amenities.map((a, i) => {
            const Icon = AMENITY_ICONS[i % AMENITY_ICONS.length];
            return (
              <motion.div
                key={a}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.04 }}
                className="bg-white rounded-xl p-5 text-center hover-lift border border-gold/10 hover:border-gold/40"
              >
                <div className="w-12 h-12 mx-auto rounded-lg bg-gold/10 flex items-center justify-center mb-3">
                  <Icon className="w-6 h-6 text-gold" />
                </div>
                <div className="text-primary text-sm font-semibold leading-snug">{a}</div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function MasterPlan({ p }) {
  return (
    <section className="py-20 bg-white">
      <div className="container">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="text-gold text-sm font-semibold tracking-[0.3em] uppercase mb-3">Master Plan</div>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-primary">Thoughtfully <span className="text-gold-gradient">Designed Layout</span></h2>
        </div>
        <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-gold/20 max-w-5xl mx-auto">
          <img src={p.masterPlanImg} alt={`${p.name} Master Plan`} className="w-full aspect-video object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-primary/40 to-transparent" />
          <div className="absolute bottom-6 left-6 right-6 flex flex-wrap gap-3 justify-between items-end text-white">
            <div>
              <div className="font-display text-2xl font-bold">{p.name}</div>
              <div className="text-white/80 text-sm">Master Plan Overview</div>
            </div>
            <a href={waLink(`Hi Surendra, please share detailed master plan of ${p.name}.`)} target="_blank" rel="noopener">
              <Button className="btn-gold rounded-full h-10 px-5">
                <Download className="w-4 h-4 mr-2" /> Full Master Plan
              </Button>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function Gallery({ p }) {
  const [lightbox, setLightbox] = useState(null);
  return (
    <section className="py-20 bg-primary relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_50%,rgba(200,155,60,0.15),transparent_60%)]" />
      <div className="container relative">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="text-gold text-sm font-semibold tracking-[0.3em] uppercase mb-3">Gallery</div>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-white">Experience the <span className="text-gold-gradient">Luxury</span></h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
          {p.gallery.map((img, i) => (
            <motion.button
              key={i}
              onClick={() => setLightbox(img)}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className={`relative rounded-xl overflow-hidden group cursor-pointer ${i === 0 ? "col-span-2 row-span-2 aspect-square md:aspect-auto" : "aspect-square"}`}
            >
              <img src={img} alt="" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
              <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/40 transition-colors flex items-center justify-center">
                <span className="opacity-0 group-hover:opacity-100 transition-opacity text-gold text-2xl">+</span>
              </div>
            </motion.button>
          ))}
        </div>
      </div>
      {lightbox && (
        <div className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-md flex items-center justify-center p-4 animate-fade-in" onClick={() => setLightbox(null)}>
          <button className="absolute top-6 right-6 text-white bg-white/10 hover:bg-gold hover:text-primary rounded-full p-2 transition" onClick={() => setLightbox(null)}>
            <X className="w-6 h-6" />
          </button>
          <img src={lightbox} alt="" className="max-w-full max-h-full rounded-xl shadow-2xl" />
        </div>
      )}
    </section>
  );
}

function LocationSection({ p }) {
  return (
    <section className="py-20 bg-white">
      <div className="container grid lg:grid-cols-2 gap-10">
        <div>
          <div className="text-gold text-sm font-semibold tracking-[0.3em] uppercase mb-3">Location Advantages</div>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-primary mb-6">
            Prime <span className="text-gold-gradient">Connectivity</span>
          </h2>
          <ul className="space-y-3">
            {p.locationAdvantages.map((la, i) => (
              <motion.li
                key={la}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="flex items-start gap-3 bg-secondary rounded-xl p-4"
              >
                <div className="w-8 h-8 rounded-full bg-gold-gradient flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-4 h-4 text-primary" />
                </div>
                <span className="text-primary font-medium pt-1">{la}</span>
              </motion.li>
            ))}
          </ul>
        </div>
        <div>
          <div className="rounded-2xl overflow-hidden shadow-xl border-4 border-gold/20 h-full min-h-[400px]">
            <iframe
              src={`https://www.google.com/maps?q=${encodeURIComponent(p.location + ", Jaipur, Rajasthan")}&output=embed`}
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: 400 }}
              loading="lazy"
              title={`${p.name} Location`}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function LeadForm({ p }) {
  const [form, setForm] = useState({ name: "", mobile: "", visitDate: "", message: "" });
  const [loading, setLoading] = useState(false);
  const submit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.mobile) return toast.error("Name and mobile required.");
    setLoading(true);
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, project: p.name, source: `project_page:${p.slug}` }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        toast.success("Thanks! Surendra will call you shortly.");
        setForm({ name: "", mobile: "", visitDate: "", message: "" });
      } else toast.error(data.error || "Try WhatsApp us.");
    } catch { toast.error("Network error."); }
    finally { setLoading(false); }
  };
  return (
    <section id="lead-form" className="py-20 bg-secondary">
      <div className="container max-w-3xl">
        <div className="text-center mb-10">
          <div className="text-gold text-sm font-semibold tracking-[0.3em] uppercase mb-3">Enquire Now</div>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-primary">Book Your <span className="text-gold-gradient">Site Visit</span></h2>
        </div>
        <form onSubmit={submit} className="bg-white rounded-2xl shadow-2xl p-8 md:p-10 border border-gold/10 space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="n">Full Name *</Label>
              <Input id="n" className="h-12 mt-1.5" value={form.name} onChange={(e) => setForm({...form, name: e.target.value})} placeholder="Your name" />
            </div>
            <div>
              <Label htmlFor="m">Mobile Number *</Label>
              <Input id="m" type="tel" className="h-12 mt-1.5" value={form.mobile} onChange={(e) => setForm({...form, mobile: e.target.value})} placeholder="+91 XXXXX XXXXX" />
            </div>
          </div>
          <div>
            <Label htmlFor="d">Preferred Visit Date</Label>
            <Input id="d" type="date" className="h-12 mt-1.5" value={form.visitDate} onChange={(e) => setForm({...form, visitDate: e.target.value})} />
          </div>
          <div>
            <Label htmlFor="msg">Message (Optional)</Label>
            <Textarea id="msg" rows={3} className="mt-1.5" value={form.message} onChange={(e) => setForm({...form, message: e.target.value})} placeholder={`Interested in ${p.name}...`} />
          </div>
          <Button type="submit" disabled={loading} className="btn-gold w-full h-13 rounded-full font-semibold text-base py-4">
            {loading ? "Submitting..." : `Book Free Site Visit for ${p.name} \u2192`}
          </Button>
        </form>
      </div>
    </section>
  );
}

function Related({ slug }) {
  const rel = getRelatedProjects(slug);
  return (
    <section className="py-20 bg-white">
      <div className="container">
        <div className="text-center mb-12">
          <div className="text-gold text-sm font-semibold tracking-[0.3em] uppercase mb-3">Related Projects</div>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-primary">Explore <span className="text-gold-gradient">More Townships</span></h2>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {rel.map((r) => (
            <Link key={r.slug} href={`/projects/${r.slug}`} className="group">
              <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover-lift border border-gold/10">
                <div className="relative h-48 overflow-hidden">
                  <img src={r.card} alt={r.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/70 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <div className="font-display text-xl font-bold">{r.name}</div>
                    <div className="text-xs flex items-center gap-1 opacity-90"><MapPin className="w-3 h-3" /> {r.location}</div>
                  </div>
                </div>
                <div className="p-5 flex items-center justify-between">
                  <div className="text-gold-gradient font-display text-lg font-bold">{r.price}</div>
                  <div className="text-gold flex items-center gap-1 text-sm font-semibold group-hover:gap-2 transition-all">View <ChevronRight className="w-4 h-4" /></div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

function MiniFooter() {
  return (
    <footer className="bg-primary text-white py-10 border-t border-gold/20">
      <div className="container flex flex-col md:flex-row justify-between items-center gap-4 text-sm">
        <div>© {new Date().getFullYear()} Invest With Surendra • <span className="text-gold">Surendra Kumar Meena</span></div>
        <div className="flex gap-4">
          <a href={`tel:${PHONE_TEL}`} className="hover:text-gold">{PHONE}</a>
          <a href={`mailto:${EMAIL}`} className="hover:text-gold">Email</a>
          <Link href="/" className="hover:text-gold">Home</Link>
        </div>
      </div>
    </footer>
  );
}

function FloatingButtons() {
  return (
    <div className="fixed right-4 md:right-6 bottom-4 md:bottom-6 z-40 flex flex-col gap-3">
      <a href={waLink()} target="_blank" rel="noopener" className="w-14 h-14 rounded-full bg-[#25D366] text-white shadow-2xl hover:scale-110 transition-transform flex items-center justify-center animate-float">
        <MessageCircle className="w-6 h-6" />
      </a>
      <a href={`tel:${PHONE_TEL}`} className="w-14 h-14 rounded-full bg-gold-gradient text-primary shadow-2xl hover:scale-110 transition-transform flex items-center justify-center">
        <Phone className="w-6 h-6" />
      </a>
      <a href="#lead-form" className="w-14 h-14 rounded-full bg-primary text-gold border border-gold/40 shadow-2xl hover:scale-110 transition-transform flex items-center justify-center">
        <Calendar className="w-6 h-6" />
      </a>
    </div>
  );
}

export default function ProjectClient({ project }) {
  return (
    <main className="bg-white overflow-x-hidden">
      <MiniHeader />
      <ProjectHero p={project} />
      <Overview p={project} />
      <Amenities p={project} />
      <MasterPlan p={project} />
      <Gallery p={project} />
      <LocationSection p={project} />
      <LeadForm p={project} />
      <Related slug={project.slug} />
      <MiniFooter />
      <FloatingButtons />
    </main>
  );
}
