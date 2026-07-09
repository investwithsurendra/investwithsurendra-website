"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Phone,
  MessageCircle,
  MapPin,
  Mail,
  Calendar,
  ArrowUp,
  Menu,
  X,
  Building2,
  ShieldCheck,
  Banknote,
  FileCheck,
  Award,
  Users,
  Star,
  Facebook,
  Instagram,
  Youtube,
  ChevronRight,
  ChevronLeft,
  CheckCircle2,
  Sparkles,
  Download,
  Eye,
  Handshake,
  BookOpen,
  HeartHandshake,
  Search,
  ScrollText,
  Plus,
  Minus,
} from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PROJECTS as SEED_PROJECTS, GALLERY, CATEGORIES } from "@/lib/projects";
import {
  PHONE,
  PHONE_TEL,
  EMAIL,
  ADDRESS,
  MAP_EMBED,
  MAP_LINK,
  NAV_LINKS,
  waLink,
} from "@/lib/shared";

const HERO_VIDEO =
  "https://videos.pexels.com/video-files/2022395/2022395-uhd_3840_2160_24fps.mp4";
const HERO_POSTER =
  "https://images.unsplash.com/photo-1505843795480-5cfb3c03f6ff?crop=entropy&cs=srgb&fm=jpg&w=1920&q=85";

const FOUNDER_IMG =
"https://i.postimg.cc/qRfgptnD/file-0000000007e87208a9adf3aaae5600b1.jpg";

const STATS = [
  { value: "500+", label: "Happy Customers" },
  { value: "100+", label: "Properties Sold" },
  { value: "5+", label: "Years Experience" },
  { value: "100%", label: "Transparent Deals" },
];

const WHY_US = [
  { icon: Handshake, title: "Transparent Deals", desc: "Zero hidden charges. Every rupee, every clause, every plot — clearly explained upfront." },
  { icon: Search, title: "Verified Projects", desc: "Only JDA approved, RERA registered projects with clear title deeds and legal verification." },
  { icon: ScrollText, title: "Documentation", desc: "Complete registry, mutation, and paperwork handled by expert property lawyers — end to end." },
  { icon: Banknote, title: "Loan Assistance", desc: "80–90% home loan approvals from SBI, HDFC, ICICI, Axis and top banks at best rates." },
  { icon: BookOpen, title: "Investment Guidance", desc: "Data-backed advice on appreciation, ROI, and best-fit projects for your goals." },
  { icon: HeartHandshake, title: "After Sales Support", desc: "We stay with you after registry — resale help, valuation guidance, tax advice, always." },
];

const TESTIMONIALS = [
  { name: "Rajeev Sharma", role: "IT Professional, Bengaluru", text: "Surendra ji made my first plot purchase in Jaipur completely stress-free. Transparent pricing, JDA approval verified — highly recommended for NRIs and outstation buyers.", rating: 5, avatar: "RS" },
  { name: "Priya & Amit Agarwal", role: "Business Family, Delhi", text: "We booked a plot at Silver Dune with 85% bank loan help. Registry was done in 15 days. Excellent service from the entire Invest With Surendra team.", rating: 5, avatar: "PA" },
  { name: "Dr. Mahesh Meena", role: "Doctor, Jaipur", text: "Genuine advice, no false promises. Surendra explained appreciation potential clearly. Value of my plot has already increased 40% in 2 years.", rating: 5, avatar: "MM" },
  { name: "Vikram Singhania", role: "NRI, Dubai", text: "Being an NRI, I was worried about property fraud. Surendra handled everything remotely — from site visit videos to registry. Truly transparent!", rating: 5, avatar: "VS" },
  { name: "Neha Gupta", role: "Home Buyer, Jaipur", text: "Got my dream plot in Akira Living. Legal team explained every document. Bank loan was approved in 10 days. Best real estate experience!", rating: 5, avatar: "NG" },
  { name: "Anil Kumar", role: "Investor, Mumbai", text: "Purchased 2 plots in Orbis SEZ as investment. The location advice was spot-on — already seeing 30% appreciation in 18 months.", rating: 5, avatar: "AK" },
];

const FAQS = [
  { q: "What does JDA Approved mean?", a: "JDA (Jaipur Development Authority) approval means the layout, roads, and infrastructure of the township are legally sanctioned by the Jaipur Development Authority. It ensures your plot has a clear title, proper land conversion, and can be legally registered in your name." },
  { q: "Is RERA registration necessary?", a: "Yes. RERA (Real Estate Regulatory Authority) registration provides legal protection to buyers. All projects we recommend are RERA registered, ensuring timely delivery, transparent pricing, and refund/compensation rights as per the RERA Act 2016." },
  { q: "How much home loan can I get?", a: "We help arrange 80–90% home loan from top banks like SBI, HDFC, ICICI, Axis Bank, and Bank of Baroda. Interest rates start from 8.4% p.a. Our loan team handles complete documentation, from application to disbursement." },
  { q: "Can NRIs invest in these plots?", a: "Absolutely. All our JDA approved plots are open to NRI investment as per FEMA guidelines. We handle remote site visits (video tours), PoA execution, registry, and post-purchase management — everything without you needing to fly down." },
  { q: "What is the registry process?", a: "Once you finalize a plot, our team prepares the sale deed, verifies the seller's title, and coordinates with the sub-registrar office. Registry typically takes 10–15 days. Stamp duty (5% in Rajasthan) and registration fees are paid at the time of registry." },
  { q: "How long does site visit take?", a: "A standard site visit takes 2–3 hours including project tour, master plan discussion, plot selection, and pricing. Book a free visit via WhatsApp or the form — we arrange pickup/drop from Jaipur city too." },
  { q: "What is your commission or fees?", a: "There is ZERO buyer-side commission for our clients. We are compensated by the developer as their official channel partner. You pay only the plot cost + government fees. Everything is disclosed in writing." },
  { q: "How do I verify the plot before buying?", a: "We provide: JDA approval letter, RERA certificate, seller's title chain (last 30 years), latest jamabandi, land conversion order, and encumbrance certificate. Our legal partners physically verify each document before booking." },
];

// ---------- Header ----------
function Header({ open, setOpen }) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <header className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${scrolled ? "bg-primary/95 backdrop-blur-xl shadow-lg py-3" : "bg-transparent py-5"}`}>
      <div className="container mx-auto flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-11 h-11 rounded-full bg-gold-gradient flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform">
            <img
              src="https://i.postimg.cc/Rh4FnjgW/file-0000000000bc7208b701ffacd96333ab.jpg?v=2"
                alt="Invest With Surendra"
                  className="w-10 h-10 rounded-full object-cover"
                  />
          </div>
          <div className="leading-tight">
            <div className="font-display text-white text-lg md:text-xl font-bold tracking-tight">
              Invest With <span className="text-gold-gradient">Surendra</span>
            </div>
            <div className="text-[10px] md:text-xs text-gold/90 tracking-[0.2em] uppercase">
              Premium Real Estate • Jaipur
            </div>
          </div>
        </Link>
        <nav className="hidden lg:flex items-center gap-7">
          {NAV_LINKS.map((l) => (
            <a key={l.href} href={l.href} className="text-white/90 hover:text-gold text-sm font-medium tracking-wide transition-colors relative group">
              {l.label}
              <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-gold group-hover:w-full transition-all duration-300" />
            </a>
          ))}
        </nav>
        <div className="hidden lg:flex items-center gap-3">
          <a href={`tel:${PHONE_TEL}`} className="flex items-center gap-2 text-gold hover:text-gold-light text-sm font-semibold">
            <Phone className="w-4 h-4" /> {PHONE}
          </a>
          <a href={waLink()} target="_blank" rel="noopener">
            <Button className="btn-gold rounded-full px-5 h-10 font-semibold">
              <MessageCircle className="w-4 h-4 mr-2" /> WhatsApp
            </Button>
          </a>
        </div>
        <button onClick={() => setOpen(!open)} className="lg:hidden text-white p-2" aria-label="Toggle menu">
          {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>
      {open && (
        <div className="lg:hidden absolute top-full inset-x-0 bg-primary/98 backdrop-blur-xl border-t border-gold/20 shadow-2xl">
          <div className="container py-6 flex flex-col gap-4">
            {NAV_LINKS.map((l) => (
              <a key={l.href} href={l.href} onClick={() => setOpen(false)} className="text-white/90 hover:text-gold py-2 border-b border-white/10 flex items-center justify-between">
                {l.label} <ChevronRight className="w-4 h-4" />
              </a>
            ))}
            <div className="flex gap-3 pt-2">
              <a href={`tel:${PHONE_TEL}`} className="flex-1">
                <Button variant="outline" className="w-full border-gold text-gold hover:bg-gold hover:text-primary">
                  <Phone className="w-4 h-4 mr-2" /> Call
                </Button>
              </a>
              <a href={waLink()} target="_blank" rel="noopener" className="flex-1">
                <Button className="w-full btn-gold">
                  <MessageCircle className="w-4 h-4 mr-2" /> WhatsApp
                </Button>
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

// ---------- Hero + Form ----------
function HeroForm() {
  const [form, setForm] = useState({ name: "", mobile: "", project: "", budget: "", visitDate: "" });
  const [loading, setLoading] = useState(false);
  const submit = async (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.mobile.trim()) return toast.error("Please enter your name and mobile.");
    setLoading(true);
    try {
      const res = await fetch("/api/leads", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...form, source: "hero_form" }) });
      const data = await res.json();
      if (res.ok && data.success) {
        toast.success("Thank you! Our team will call you shortly.");
        setForm({ name: "", mobile: "", project: "", budget: "", visitDate: "" });
      } else toast.error(data.error || "Try WhatsApp us.");
    } catch { toast.error("Network error."); }
    finally { setLoading(false); }
  };
  return (
    <motion.form onSubmit={submit} initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.9, delay: 0.4 }} className="glass-dark rounded-2xl p-6 md:p-8 w-full max-w-md shadow-2xl relative overflow-hidden">
      <div className="absolute -top-16 -right-16 w-48 h-48 bg-gold/20 blur-3xl rounded-full" />
      <div className="relative">
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-2 bg-gold/15 text-gold border border-gold/30 rounded-full px-3 py-1 text-xs font-medium mb-3">
            <Sparkles className="w-3 h-3" /> Free Consultation
          </div>
          <h3 className="font-display text-2xl md:text-3xl text-white font-bold">Book Your <span className="text-gold-gradient">Site Visit</span></h3>
          <p className="text-white/70 text-sm mt-2">Fill the form. Get expert guidance.</p>
        </div>
        <div className="space-y-3">
          <div><Label className="text-white/80 text-xs">Full Name *</Label>
            <Input value={form.name} onChange={(e) => setForm({...form, name: e.target.value})} placeholder="Your name" className="bg-white/5 border-white/20 text-white placeholder:text-white/40 focus:border-gold h-11 mt-1" />
          </div>
          <div><Label className="text-white/80 text-xs">Mobile Number *</Label>
            <Input type="tel" value={form.mobile} onChange={(e) => setForm({...form, mobile: e.target.value})} placeholder="+91 XXXXX XXXXX" className="bg-white/5 border-white/20 text-white placeholder:text-white/40 focus:border-gold h-11 mt-1" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div><Label className="text-white/80 text-xs">Project</Label>
              <select value={form.project} onChange={(e) => setForm({...form, project: e.target.value})} className="w-full mt-1 bg-white/5 border border-white/20 text-white rounded-md h-11 px-3 text-sm focus:border-gold focus:outline-none">
                <option value="" className="bg-primary">Select</option>
                {SEED_PROJECTS.map((p) => <option key={p.slug} value={p.name} className="bg-primary">{p.name}</option>)}
              </select>
            </div>
            <div><Label className="text-white/80 text-xs">Budget</Label>
              <select value={form.budget} onChange={(e) => setForm({...form, budget: e.target.value})} className="w-full mt-1 bg-white/5 border border-white/20 text-white rounded-md h-11 px-3 text-sm focus:border-gold focus:outline-none">
                <option value="" className="bg-primary">Select</option>
                <option value="Under ₹20L" className="bg-primary">Under ₹20L</option>
                <option value="₹20L – ₹40L" className="bg-primary">₹20L – ₹40L</option>
                <option value="₹40L – ₹75L" className="bg-primary">₹40L – ₹75L</option>
                <option value="₹75L+" className="bg-primary">₹75L+</option>
              </select>
            </div>
          </div>
          <div><Label className="text-white/80 text-xs">Preferred Visit Date</Label>
            <Input type="date" value={form.visitDate} onChange={(e) => setForm({...form, visitDate: e.target.value})} className="bg-white/5 border-white/20 text-white focus:border-gold h-11 mt-1" />
          </div>
          <Button type="submit" disabled={loading} className="btn-gold w-full h-12 rounded-lg font-semibold text-base mt-2">
            {loading ? "Submitting..." : "Submit & Get Free Consultation →"}
          </Button>
          <p className="text-white/50 text-[11px] text-center">We respect your privacy. No spam calls.</p>
        </div>
      </div>
    </motion.form>
  );
}

function Hero() {
  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <video autoPlay muted loop playsInline poster={HERO_POSTER} className="w-full h-full object-cover">
          <source src={HERO_VIDEO} type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-br from-primary/85 via-primary/70 to-primary/90" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_50%,rgba(200,155,60,0.15),transparent_50%)]" />
      </div>
      <div className="relative z-10 container mx-auto pt-32 pb-16 grid lg:grid-cols-2 gap-10 items-center">
        <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9 }} className="text-white">
          <div className="inline-flex items-center gap-2 bg-gold/10 border border-gold/30 backdrop-blur-md rounded-full px-4 py-1.5 mb-6">
            <span className="w-2 h-2 rounded-full bg-gold animate-pulse" />
            <span className="text-gold text-xs font-medium tracking-widest uppercase">Trusted by 500+ Families</span>
          </div>
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.05] mb-6">
            Invest in Jaipur's<br /><span className="text-gold-gradient">Premium JDA</span><br />Approved Townships
          </h1>
          <div className="flex flex-wrap gap-3 mb-6">
            {["JDA Approved", "RERA Registered", "80–90% Bank Loan"].map((t) => (
              <div key={t} className="flex items-center gap-2 bg-white/10 backdrop-blur-md border border-gold/30 rounded-full px-4 py-2 text-sm text-white">
                <CheckCircle2 className="w-4 h-4 text-gold" /><span className="font-medium">{t}</span>
              </div>
            ))}
          </div>
          <p className="text-white/85 text-base md:text-lg leading-relaxed max-w-xl mb-8">
            <strong className="text-gold">Invest With Surendra</strong> helps families and investors buy premium JDA approved plots in Jaipur with complete transparency, legal guidance and end-to-end support.
          </p>
          <div className="flex flex-wrap gap-3">
            <a href={waLink()} target="_blank" rel="noopener"><Button className="btn-gold h-12 px-6 rounded-full font-semibold text-base"><MessageCircle className="w-5 h-5 mr-2" /> WhatsApp Now</Button></a>
            <a href={`tel:${PHONE_TEL}`}><Button variant="outline" className="h-12 px-6 rounded-full border-white/40 text-white bg-white/5 hover:bg-white hover:text-primary backdrop-blur-md font-semibold"><Phone className="w-5 h-5 mr-2" /> Call Now</Button></a>
            <a href="#contact"><Button variant="outline" className="h-12 px-6 rounded-full border-gold/50 text-gold bg-transparent hover:bg-gold hover:text-primary font-semibold"><Calendar className="w-5 h-5 mr-2" /> Book Free Site Visit</Button></a>
          </div>
        </motion.div>
        <div className="flex justify-center lg:justify-end"><HeroForm /></div>
      </div>
    </section>
  );
}

function TrustBar() {
  return (
    <section className="relative -mt-16 z-20 container mx-auto px-4">
      <div className="bg-white rounded-2xl shadow-2xl grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-0 py-8 px-6 md:px-10 border border-gold/10">
        {STATS.map((s, i) => (
          <motion.div key={s.label} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: i * 0.1 }} className={`text-center ${i < 3 ? "md:border-r md:border-gold/20" : ""}`}>
            <div className="font-display text-4xl md:text-5xl font-bold text-gold-gradient">{s.value}</div>
            <div className="text-primary/70 text-xs md:text-sm mt-2 font-medium tracking-wide uppercase">{s.label}</div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

// ---------- Founder Section ----------
function Founder() {
  return (
    <section id="about" className="py-24 bg-white relative overflow-hidden">
      <div className="absolute top-1/2 right-0 w-96 h-96 bg-gold/5 rounded-full blur-3xl -translate-y-1/2" />
      <div className="container mx-auto grid lg:grid-cols-5 gap-12 items-center">
        <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="relative lg:col-span-2">
          <div className="relative rounded-2xl overflow-hidden shadow-2xl aspect-[4/5] max-w-md mx-auto">
            <img src={FOUNDER_IMG} alt="Surendra Kumar Meena — Founder" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-transparent to-transparent" />
            <div className="absolute bottom-0 inset-x-0 p-6 text-white">
              <div className="text-gold text-xs uppercase tracking-widest mb-1">Founder & CEO</div>
              <div className="font-display text-3xl font-bold">Surendra Kumar Meena</div>
              <div className="text-white/80 text-sm mt-1">Invest With Surendra</div>
            </div>
          </div>
          <div className="absolute -bottom-6 -right-2 md:-right-8 bg-gold-gradient text-primary rounded-xl p-4 shadow-xl">
            <div className="font-display text-3xl font-bold">5+</div>
            <div className="text-xs font-semibold uppercase tracking-wider">Years Experience</div>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="lg:col-span-3">
          <div className="text-gold text-sm font-semibold tracking-[0.3em] uppercase mb-4">About Founder</div>
          <div className="font-display text-2xl md:text-3xl text-primary/80 italic mb-2">Hi, I'm</div>
          <h2 className="font-display text-4xl md:text-6xl font-bold text-primary mb-4 leading-tight">
            Surendra Kumar <span className="text-gold-gradient">Meena</span>
          </h2>
          <div className="flex items-center gap-3 mb-6">
            <div className="h-[2px] w-12 bg-gold" />
            <div className="text-primary/70 font-medium">Founder, Invest With Surendra , RERA NO. RAJ/A/2021/2347</div>
          </div>
          <p className="text-primary/75 text-lg leading-relaxed mb-8">
            I help families and investors buy genuine <strong className="text-gold">JDA approved plots</strong> with
            <strong> complete transparency</strong> and <strong>end-to-end support</strong>. From site visits and
            legal verification to bank loan and registry — my team handles every step personally so you can invest with confidence.
          </p>

          <div className="grid grid-cols-3 gap-4 mb-8">
            {[
              { v: "5+", l: "Years Experience" },
              { v: "500+", l: "Happy Customers" },
              { v: "100+", l: "Properties Sold" },
            ].map((s) => (
              <div key={s.l} className="bg-secondary rounded-xl p-4 text-center border border-gold/10">
                <div className="font-display text-3xl md:text-4xl font-bold text-gold-gradient">{s.v}</div>
                <div className="text-primary/70 text-xs md:text-sm mt-1 font-medium">{s.l}</div>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap gap-3">
            <a href={waLink("Hi Surendra, I'd like to talk to you about property investment in Jaipur.")} target="_blank" rel="noopener">
              <Button className="btn-gold h-12 px-6 rounded-full font-semibold">
                <MessageCircle className="w-4 h-4 mr-2" /> Talk to Surendra
              </Button>
            </a>
            <a href={`tel:${PHONE_TEL}`}>
              <Button variant="outline" className="h-12 px-6 rounded-full border-primary/20 text-primary hover:bg-primary hover:text-white font-semibold">
                <Phone className="w-4 h-4 mr-2" /> {PHONE}
              </Button>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ---------- Projects Section ----------
function ProjectsSection() {
  const [projects, setProjects] = useState(SEED_PROJECTS);
  useEffect(() => {
    fetch("/api/projects").then((r) => r.json()).then((r) => {
      if (r.projects?.length) setProjects(r.projects);
    }).catch(() => {});
  }, []);
  return (
    <section id="projects" className="py-24 bg-secondary relative">
      <div className="container mx-auto">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center max-w-2xl mx-auto mb-16">
          <div className="text-gold text-sm font-semibold tracking-[0.3em] uppercase mb-4">Featured Projects</div>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-primary mb-4">
            Premium <span className="text-gold-gradient">JDA Approved</span> Townships
          </h2>
          <p className="text-primary/70 text-lg">Handpicked luxury projects across Jaipur with clear titles, high appreciation potential, and end-to-end bank loan support.</p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {projects.map((p, i) => (
            <motion.div key={p.slug} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: i * 0.1 }} className="bg-white rounded-2xl overflow-hidden shadow-lg hover-lift group flex flex-col">
              <div className="relative h-56 overflow-hidden">
                <img src={p.card} alt={p.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/70 via-primary/10 to-transparent" />
                <div className="absolute top-3 left-3 right-3 flex flex-wrap gap-1.5">
                  {p.approvals.map((a) => (
                    <span key={a} className="bg-gold text-primary text-[10px] font-bold px-2 py-1 rounded-full flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" /> {a}
                    </span>
                  ))}
                </div>
                <div className="absolute bottom-3 left-3 right-3 text-white">
                  <div className="font-display text-xl font-bold leading-tight">{p.name}</div>
                  <div className="flex items-center gap-1 text-white/90 text-xs mt-0.5">
                    <MapPin className="w-3 h-3" /> {p.location}
                  </div>
                </div>
              </div>

              <div className="p-5 flex flex-col flex-1">
                <div className="flex items-center justify-between mb-3 pb-3 border-b border-gold/20">
                  <div>
                    <div className="text-primary/60 text-[10px] uppercase tracking-wider">Starting</div>
                    <div className="text-gold-gradient font-display text-xl font-bold">{p.price}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-primary/60 text-[10px] uppercase tracking-wider">Sizes</div>
                    <div className="text-primary text-sm font-semibold">{p.size}</div>
                  </div>
                </div>

                <div className="mb-4">
                  <div className="text-primary/60 text-[10px] uppercase tracking-wider mb-2">Key Amenities</div>
                  <div className="flex flex-wrap gap-1.5">
                    {p.amenities.slice(0, 4).map((a) => (
                      <span key={a} className="bg-gold/10 text-primary/80 text-[11px] px-2 py-1 rounded-md border border-gold/20">{a}</span>
                    ))}
                  </div>
                </div>

                <div className="mt-auto space-y-2">
                  <Link href={`/projects/${p.slug}`}>
                    <Button className="w-full btn-gold rounded-full h-10 text-sm font-semibold">
                      <Eye className="w-4 h-4 mr-2" /> View Details
                    </Button>
                  </Link>
                  <div className="grid grid-cols-2 gap-2">
                    <a href={waLink(`Hi Surendra, please send brochure for ${p.name}.`)} target="_blank" rel="noopener">
                      <Button variant="outline" className="w-full h-9 rounded-full border-primary/20 text-primary hover:bg-primary hover:text-white text-xs font-semibold">
                        <Download className="w-3.5 h-3.5 mr-1" /> Brochure
                      </Button>
                    </a>
                    <a href="#contact">
                      <Button variant="outline" className="w-full h-9 rounded-full border-gold text-gold hover:bg-gold hover:text-primary text-xs font-semibold">
                        <Calendar className="w-3.5 h-3.5 mr-1" /> Visit
                      </Button>
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ---------- Why Us ----------
function WhyUs() {
  return (
    <section id="why" className="py-24 bg-primary relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(200,155,60,0.15),transparent_50%)]" />
      <div className="container mx-auto relative">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center max-w-2xl mx-auto mb-16">
          <div className="text-gold text-sm font-semibold tracking-[0.3em] uppercase mb-4">Why Choose Us</div>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">
            Why Choose <span className="text-gold-gradient">Invest With Surendra</span>
          </h2>
          <p className="text-white/70 text-lg">Six pillars that make us Jaipur's most trusted real estate partner.</p>
        </motion.div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {WHY_US.map(({ icon: Icon, title, desc }, i) => (
            <motion.div key={title} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.08 }} className="glass p-7 rounded-2xl hover:border-gold/50 transition-all hover:-translate-y-1 group">
              <div className="w-14 h-14 rounded-xl bg-gold-gradient flex items-center justify-center mb-4 group-hover:rotate-6 transition-transform">
                <Icon className="w-7 h-7 text-primary" />
              </div>
              <h3 className="text-white font-display text-xl font-bold mb-2">{title}</h3>
              <p className="text-white/70 text-sm leading-relaxed">{desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ---------- Gallery ----------
function GallerySection() {
  const [cat, setCat] = useState("All");
  const [lightbox, setLightbox] = useState(null);
  const filtered = GALLERY.filter((g) => cat === "All" || g.category === cat);
  return (
    <section id="gallery" className="py-24 bg-white">
      <div className="container mx-auto">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center max-w-2xl mx-auto mb-10">
          <div className="text-gold text-sm font-semibold tracking-[0.3em] uppercase mb-4">Gallery</div>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-primary mb-4">Moments of <span className="text-gold-gradient">Luxury Living</span></h2>
          <p className="text-primary/70 text-lg">A glimpse into the townships, villas and amenities we deliver.</p>
        </motion.div>

        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {CATEGORIES.map((c) => (
            <button key={c} onClick={() => setCat(c)} className={`px-5 py-2 rounded-full text-sm font-semibold transition-all ${cat === c ? "bg-gold-gradient text-primary shadow-lg" : "bg-secondary text-primary/70 hover:bg-gold/10 hover:text-gold"}`}>
              {c}
            </button>
          ))}
        </div>

        <div className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
          {filtered.map((g, i) => (
            <motion.button
              key={g.src + i}
              onClick={() => setLightbox(g.src)}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: (i % 8) * 0.05 }}
              className={`relative w-full rounded-xl overflow-hidden group break-inside-avoid mb-4 shadow-md hover:shadow-2xl transition-shadow ${g.tall ? "aspect-[3/4]" : "aspect-[4/3]"}`}
            >
              <img src={g.src} alt="" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
              <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/40 transition-colors flex items-end p-4">
                <span className="opacity-0 group-hover:opacity-100 text-white text-xs bg-gold/80 text-primary px-2 py-1 rounded-full font-semibold transition-opacity">{g.category}</span>
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      {lightbox && (
        <div className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-md flex items-center justify-center p-4" onClick={() => setLightbox(null)}>
          <button className="absolute top-6 right-6 text-white bg-white/10 hover:bg-gold hover:text-primary rounded-full p-2" onClick={() => setLightbox(null)}>
            <X className="w-6 h-6" />
          </button>
          <img src={lightbox} alt="" className="max-w-full max-h-full rounded-xl shadow-2xl" />
        </div>
      )}
    </section>
  );
}

// ---------- Testimonials Carousel ----------
function TestimonialsCarousel() {
  const [i, setI] = useState(0);
  const perView = 3;
  const total = TESTIMONIALS.length;
  const maxIndex = Math.max(0, total - perView);
  useEffect(() => {
    const id = setInterval(() => setI((v) => (v >= maxIndex ? 0 : v + 1)), 5000);
    return () => clearInterval(id);
  }, [maxIndex]);
  const prev = () => setI((v) => (v === 0 ? maxIndex : v - 1));
  const next = () => setI((v) => (v >= maxIndex ? 0 : v + 1));

  return (
    <section id="testimonials" className="py-24 bg-secondary relative overflow-hidden">
      <div className="container mx-auto">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center max-w-2xl mx-auto mb-12">
          <div className="text-gold text-sm font-semibold tracking-[0.3em] uppercase mb-4">Testimonials</div>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-primary mb-4">What Our <span className="text-gold-gradient">Clients</span> Say</h2>
          <div className="flex items-center justify-center gap-2 mt-4">
            <div className="flex gap-0.5">{[...Array(5)].map((_, k) => <Star key={k} className="w-5 h-5 fill-gold text-gold" />)}</div>
            <span className="text-primary font-bold">4.9</span>
            <span className="text-primary/60 text-sm">• Google Reviews</span>
          </div>
        </motion.div>

        <div className="relative">
          <div className="overflow-hidden">
            <motion.div className="flex" animate={{ x: `-${i * (100 / perView)}%` }} transition={{ duration: 0.6, ease: "easeInOut" }}>
              {TESTIMONIALS.map((t) => (
                <div key={t.name} className="w-full md:w-1/2 lg:w-1/3 flex-shrink-0 p-3">
                  <div className="bg-white rounded-2xl p-6 shadow-lg border border-gold/10 h-full hover:border-gold/40 transition-colors">
                    <div className="flex items-start gap-3 mb-4">
                      <div className="w-12 h-12 rounded-full bg-gold-gradient text-primary font-display font-bold flex items-center justify-center flex-shrink-0">{t.avatar}</div>
                      <div className="flex-1">
                        <div className="font-display font-bold text-primary">{t.name}</div>
                        <div className="text-primary/60 text-xs">{t.role}</div>
                        <div className="flex gap-0.5 mt-1">{[...Array(t.rating)].map((_, k) => <Star key={k} className="w-3.5 h-3.5 fill-gold text-gold" />)}</div>
                      </div>
                      <svg className="w-6 h-6" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
                    </div>
                    <p className="text-primary/80 leading-relaxed text-sm italic">"{t.text}"</p>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          <button onClick={prev} className="absolute -left-2 md:-left-6 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white shadow-xl border border-gold/20 text-primary hover:bg-gold hover:text-primary flex items-center justify-center transition-all z-10" aria-label="Previous">
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button onClick={next} className="absolute -right-2 md:-right-6 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white shadow-xl border border-gold/20 text-primary hover:bg-gold hover:text-primary flex items-center justify-center transition-all z-10" aria-label="Next">
            <ChevronRight className="w-5 h-5" />
          </button>

          <div className="flex justify-center gap-2 mt-8">
            {Array.from({ length: maxIndex + 1 }).map((_, k) => (
              <button key={k} onClick={() => setI(k)} className={`h-2 rounded-full transition-all ${i === k ? "bg-gold w-8" : "bg-primary/20 w-2"}`} aria-label={`Slide ${k + 1}`} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ---------- FAQ ----------
function FAQ() {
  const [open, setOpen] = useState(0);
  return (
    <section id="faq" className="py-24 bg-white">
      <div className="container mx-auto max-w-4xl">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-14">
          <div className="text-gold text-sm font-semibold tracking-[0.3em] uppercase mb-4">FAQ</div>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-primary mb-4">Frequently Asked <span className="text-gold-gradient">Questions</span></h2>
          <p className="text-primary/70 text-lg">Everything you need to know before buying a JDA approved plot in Jaipur.</p>
        </motion.div>
        <div className="space-y-3">
          {FAQS.map((f, i) => (
            <motion.div key={f.q} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.03 }} className={`rounded-xl border transition-all ${open === i ? "border-gold bg-secondary shadow-lg" : "border-gold/15 bg-white hover:border-gold/40"}`}>
              <button onClick={() => setOpen(open === i ? -1 : i)} className="w-full flex items-center justify-between gap-4 p-5 text-left">
                <span className="font-display text-lg font-semibold text-primary">{f.q}</span>
                <div className={`w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 transition-all ${open === i ? "bg-gold-gradient text-primary" : "bg-gold/10 text-gold"}`}>
                  {open === i ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                </div>
              </button>
              <AnimatePresence>
                {open === i && (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }} className="overflow-hidden">
                    <div className="px-5 pb-5 text-primary/75 leading-relaxed border-t border-gold/15 pt-4">{f.a}</div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        <div className="mt-12 bg-primary rounded-2xl p-8 text-center text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(200,155,60,0.2),transparent_60%)]" />
          <div className="relative">
            <h3 className="font-display text-2xl md:text-3xl font-bold mb-2">Still have questions?</h3>
            <p className="text-white/70 mb-6">Talk to Surendra directly for personalized guidance.</p>
            <div className="flex flex-wrap justify-center gap-3">
              <a href={waLink()} target="_blank" rel="noopener"><Button className="btn-gold rounded-full h-11 px-6 font-semibold"><MessageCircle className="w-4 h-4 mr-2" /> WhatsApp Now</Button></a>
              <a href={`tel:${PHONE_TEL}`}><Button variant="outline" className="rounded-full h-11 px-6 border-white/40 text-white bg-white/5 hover:bg-white hover:text-primary font-semibold"><Phone className="w-4 h-4 mr-2" /> {PHONE}</Button></a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ---------- CTA ----------
function CTA() {
  return (
    <section className="relative py-20 bg-primary overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(200,155,60,0.2),transparent_70%)]" />
      <div className="container mx-auto relative text-center">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="max-w-3xl mx-auto">
          <h2 className="font-display text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">Ready to <span className="text-gold-gradient">Invest</span> in Your Dream Plot?</h2>
          <p className="text-white/80 text-lg mb-8">Talk to Surendra Kumar Meena directly. Get a free property consultation, site visit, and legal verification — no obligations.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href={waLink()} target="_blank" rel="noopener"><Button className="btn-gold h-14 px-8 rounded-full font-semibold text-base"><MessageCircle className="w-5 h-5 mr-2" /> WhatsApp Surendra</Button></a>
            <a href={`tel:${PHONE_TEL}`}><Button variant="outline" className="h-14 px-8 rounded-full border-white/40 text-white bg-white/5 hover:bg-white hover:text-primary backdrop-blur-md font-semibold"><Phone className="w-5 h-5 mr-2" /> {PHONE}</Button></a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ---------- Footer ----------
function Footer() {
  return (
    <footer id="contact" className="bg-primary text-white pt-20 pb-8 border-t border-gold/20">
      <div className="container mx-auto grid lg:grid-cols-4 md:grid-cols-2 gap-10 mb-12">
        <div>
          <div className="flex items-center gap-3 mb-5">
            <div className="w-11 h-11 rounded-full bg-gold-gradient flex items-center justify-center">
              <img
  src="https://i.postimg.cc/Rh4FnjgW/file-0000000000bc7208b701ffacd96333ab.jpg?v=2"
  alt="Invest With Surendra"
  className="w-10 h-10 rounded-full object-cover"
/>
            </div>
            <div className="font-display text-lg font-bold">Invest With <span className="text-gold-gradient">Surendra</span></div>
          </div>
          <p className="text-white/70 text-sm leading-relaxed mb-5">Jaipur's most trusted name for JDA approved premium plot investments. RERA registered, legally verified, bank loan enabled.</p>
          <div className="flex gap-3">
            {[{ Icon: Facebook, href: "#" }, { Icon: Instagram, href: "#" }, { Icon: Youtube, href: "#" }].map(({ Icon, href }, i) => (
              <a key={i} href={href} target="_blank" rel="noopener" className="w-10 h-10 rounded-full bg-white/10 hover:bg-gold hover:text-primary flex items-center justify-center transition-all">
                <Icon className="w-4 h-4" />
              </a>
            ))}
          </div>
        </div>
        <div>
          <h4 className="font-display text-lg font-bold mb-5 text-gold">Contact</h4>
          <ul className="space-y-4 text-sm">
            <li className="flex gap-3"><MapPin className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" /><span className="text-white/80 leading-relaxed">{ADDRESS}</span></li>
            <li className="flex items-center gap-3"><Phone className="w-5 h-5 text-gold flex-shrink-0" /><a href={`tel:${PHONE_TEL}`} className="text-white/80 hover:text-gold">{PHONE}</a></li>
            <li className="flex items-center gap-3"><MessageCircle className="w-5 h-5 text-gold flex-shrink-0" /><a href={waLink()} target="_blank" rel="noopener" className="text-white/80 hover:text-gold">WhatsApp Chat</a></li>
            <li className="flex items-center gap-3"><Mail className="w-5 h-5 text-gold flex-shrink-0" /><a href={`mailto:${EMAIL}`} className="text-white/80 hover:text-gold break-all">{EMAIL}</a></li>
          </ul>
        </div>
        <div>
          <h4 className="font-display text-lg font-bold mb-5 text-gold">Projects</h4>
          <ul className="space-y-3 text-sm">
            {SEED_PROJECTS.map((p) => (
              <li key={p.slug}>
                <Link href={`/projects/${p.slug}`} className="text-white/80 hover:text-gold flex items-center gap-2">
                  <ChevronRight className="w-3.5 h-3.5 text-gold" /> {p.name}
                </Link>
              </li>
            ))}
            <li><a href={MAP_LINK} target="_blank" rel="noopener" className="text-white/80 hover:text-gold flex items-center gap-2"><ChevronRight className="w-3.5 h-3.5 text-gold" /> Google Business</a></li>
          </ul>
        </div>
        <div>
          <h4 className="font-display text-lg font-bold mb-5 text-gold">Find Us</h4>
          <a href={MAP_LINK} target="_blank" rel="noopener" className="block rounded-xl overflow-hidden border border-gold/30 hover:border-gold transition-colors">
            <iframe src={MAP_EMBED} width="100%" height="180" style={{ border: 0 }} loading="lazy" referrerPolicy="no-referrer-when-downgrade" title="Office Location" />
          </a>
          <a href={MAP_LINK} target="_blank" rel="noopener" className="inline-flex items-center gap-1 text-gold hover:text-gold-light text-sm mt-3">Open in Google Maps <ChevronRight className="w-4 h-4" /></a>
        </div>
      </div>
      <div className="container mx-auto pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-white/60">
        <div>© {new Date().getFullYear()} Invest With Surendra. All rights reserved.</div>
        <div>Founder: <span className="text-gold">Surendra Kumar Meena</span> • Premium Real Estate, Jaipur</div>
      </div>
    </footer>
  );
}

// ---------- Floating Buttons ----------
function FloatingButtons() {
  const [showTop, setShowTop] = useState(false);
  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 500);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <div className="fixed right-4 md:right-6 bottom-4 md:bottom-6 z-40 flex flex-col gap-3">
      <a href={waLink()} target="_blank" rel="noopener" aria-label="WhatsApp" className="w-14 h-14 rounded-full bg-[#25D366] text-white shadow-2xl hover:scale-110 transition-transform flex items-center justify-center animate-float">
        <MessageCircle className="w-6 h-6" />
      </a>
      <a href={`tel:${PHONE_TEL}`} aria-label="Call" className="w-14 h-14 rounded-full bg-gold-gradient text-primary shadow-2xl hover:scale-110 transition-transform flex items-center justify-center">
        <Phone className="w-6 h-6" />
      </a>
      <a href="#contact" aria-label="Book Site Visit" className="w-14 h-14 rounded-full bg-primary text-gold border border-gold/40 shadow-2xl hover:scale-110 transition-transform flex items-center justify-center">
        <Calendar className="w-6 h-6" />
      </a>
      {showTop && (
        <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} aria-label="Back to top" className="w-11 h-11 rounded-full bg-white text-primary shadow-2xl hover:scale-110 transition-transform flex items-center justify-center border border-gold/30">
          <ArrowUp className="w-5 h-5" />
        </button>
      )}
    </div>
  );
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <main className="relative min-h-screen bg-white overflow-x-hidden">
      <Header open={menuOpen} setOpen={setMenuOpen} />
      <Hero />
      <TrustBar />
      <Founder />
      <ProjectsSection />
      <WhyUs />
      <GallerySection />
      <TestimonialsCarousel />
      <FAQ />
      <CTA />
      <Footer />
      <FloatingButtons />
    </main>
  );
}

export default App;
