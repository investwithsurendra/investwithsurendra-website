"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
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
  Home as HomeIcon,
  Star,
  Facebook,
  Instagram,
  Youtube,
  ChevronRight,
  CheckCircle2,
  Sparkles,
} from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

// Contact constants
const PHONE = "+91 9352835139";
const PHONE_TEL = "+919352835139";
const WA = "919352835139";
const EMAIL = "surendra.kumar.ctl@gmail.com";
const ADDRESS =
  "356, Vardhaman Nagar B, Gopalpura Bypass Road, Patrakar Colony, Mansarovar, Jaipur, Rajasthan 302020";
const MAP_QUERY = encodeURIComponent(ADDRESS);
const MAP_EMBED = `https://www.google.com/maps?q=${MAP_QUERY}&output=embed`;
const MAP_LINK = `https://www.google.com/maps/search/?api=1&query=${MAP_QUERY}`;

const WA_LINK = (msg) =>
  `https://wa.me/${WA}?text=${encodeURIComponent(
    msg || "Hi Surendra, I'm interested in JDA approved plots in Jaipur. Please share details."
  )}`;

const HERO_VIDEO =
  "https://videos.pexels.com/video-files/2022395/2022395-uhd_3840_2160_24fps.mp4";
const HERO_POSTER =
  "https://images.unsplash.com/photo-1505843795480-5cfb3c03f6ff?crop=entropy&cs=srgb&fm=jpg&w=1920&q=85";

const PROJECT_IMAGES = [
  "https://images.pexels.com/photos/34823937/pexels-photo-34823937.jpeg",
  "https://images.pexels.com/photos/16573669/pexels-photo-16573669.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
  "https://images.pexels.com/photos/29334668/pexels-photo-29334668.png?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
];

const FOUNDER_IMG =
  "https://images.pexels.com/photos/15073808/pexels-photo-15073808.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940";

const NAV_LINKS = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Why Us", href: "#why" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "Contact", href: "#contact" },
];

const PROJECTS = [
  {
    name: "Vardhaman Greens",
    location: "Ajmer Road, Jaipur",
    tag: "JDA Approved",
    price: "₹18.5 L onwards",
    size: "125 – 300 sq. yd.",
    img: PROJECT_IMAGES[0],
    features: ["Gated Community", "24x7 Security", "Wide Roads"],
  },
  {
    name: "Royal Palm Township",
    location: "Tonk Road, Jaipur",
    tag: "RERA Registered",
    price: "₹32 L onwards",
    size: "150 – 500 sq. yd.",
    img: PROJECT_IMAGES[1],
    features: ["Club House", "Landscaped Parks", "Premium Villas"],
  },
  {
    name: "Aravali Heights",
    location: "Jaipur–Delhi Highway",
    tag: "80% Loan Available",
    price: "₹24 L onwards",
    size: "100 – 400 sq. yd.",
    img: PROJECT_IMAGES[2],
    features: ["Highway Facing", "High Appreciation", "Free Registry"],
  },
];

const WHY_US = [
  {
    icon: FileCheck,
    title: "JDA Approved Plots",
    desc: "Every project is officially approved by Jaipur Development Authority with clear title deeds.",
  },
  {
    icon: ShieldCheck,
    title: "RERA Registered",
    desc: "All townships are RERA registered, ensuring complete legal protection for your investment.",
  },
  {
    icon: Banknote,
    title: "80–90% Bank Loan",
    desc: "Home loans arranged from SBI, HDFC, ICICI, Axis & top banks at the best interest rates.",
  },
  {
    icon: Users,
    title: "500+ Happy Families",
    desc: "Trusted by families and NRI investors across India for genuine, transparent property deals.",
  },
  {
    icon: Award,
    title: "Legal Guidance",
    desc: "End-to-end legal documentation and registry support by expert property lawyers.",
  },
  {
    icon: Sparkles,
    title: "End-to-End Support",
    desc: "From site visit to registry to resale — we handle every step for you personally.",
  },
];

const TESTIMONIALS = [
  {
    name: "Rajeev Sharma",
    role: "IT Professional, Bengaluru",
    text: "Surendra ji made my first plot purchase in Jaipur completely stress-free. Transparent pricing, JDA approval verified — highly recommended for NRIs and outstation buyers.",
    rating: 5,
  },
  {
    name: "Priya & Amit Agarwal",
    role: "Business Family, Delhi",
    text: "We booked a plot at Vardhaman Greens with 85% bank loan help. Registry was done in 15 days. Excellent service from the entire Invest With Surendra team.",
    rating: 5,
  },
  {
    name: "Dr. Mahesh Meena",
    role: "Doctor, Jaipur",
    text: "Genuine advice, no false promises. Surendra explained appreciation potential clearly. Value of my plot has already increased 40% in 2 years.",
    rating: 5,
  },
];

const STATS = [
  { value: "500+", label: "Happy Customers" },
  { value: "100+", label: "Properties Sold" },
  { value: "5+", label: "Years Experience" },
  { value: "100%", label: "Transparent Deals" },
];

// --- Components ---

function Header({ open, setOpen }) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-primary/95 backdrop-blur-xl shadow-lg py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="container mx-auto flex items-center justify-between">
        <a href="#home" className="flex items-center gap-3 group">
          <div className="w-11 h-11 rounded-full bg-gold-gradient flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform">
            <Building2 className="w-5 h-5 text-primary" />
          </div>
          <div className="leading-tight">
            <div className="font-display text-white text-lg md:text-xl font-bold tracking-tight">
              Invest With <span className="text-gold-gradient">Surendra</span>
            </div>
            <div className="text-[10px] md:text-xs text-gold/90 tracking-[0.2em] uppercase">
              Premium Real Estate • Jaipur
            </div>
          </div>
        </a>

        <nav className="hidden lg:flex items-center gap-8">
          {NAV_LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-white/90 hover:text-gold text-sm font-medium tracking-wide transition-colors relative group"
            >
              {l.label}
              <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-gold group-hover:w-full transition-all duration-300" />
            </a>
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-3">
          <a
            href={`tel:${PHONE_TEL}`}
            className="flex items-center gap-2 text-gold hover:text-gold-light text-sm font-semibold"
          >
            <Phone className="w-4 h-4" /> {PHONE}
          </a>
          <a href={WA_LINK()} target="_blank" rel="noopener">
            <Button className="btn-gold rounded-full px-5 h-10 font-semibold">
              <MessageCircle className="w-4 h-4 mr-2" /> WhatsApp
            </Button>
          </a>
        </div>

        <button
          onClick={() => setOpen(!open)}
          className="lg:hidden text-white p-2"
          aria-label="Toggle menu"
        >
          {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="lg:hidden absolute top-full inset-x-0 bg-primary/98 backdrop-blur-xl border-t border-gold/20 shadow-2xl animate-fade-in">
          <div className="container py-6 flex flex-col gap-4">
            {NAV_LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="text-white/90 hover:text-gold py-2 border-b border-white/10 flex items-center justify-between"
              >
                {l.label} <ChevronRight className="w-4 h-4" />
              </a>
            ))}
            <div className="flex gap-3 pt-2">
              <a href={`tel:${PHONE_TEL}`} className="flex-1">
                <Button variant="outline" className="w-full border-gold text-gold hover:bg-gold hover:text-primary">
                  <Phone className="w-4 h-4 mr-2" /> Call
                </Button>
              </a>
              <a href={WA_LINK()} target="_blank" rel="noopener" className="flex-1">
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

function HeroForm() {
  const [form, setForm] = useState({
    name: "",
    mobile: "",
    project: "",
    budget: "",
    visitDate: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.mobile.trim()) {
      toast.error("Please enter your name and mobile number.");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, source: "hero_form" }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        toast.success("Thank you! Our team will call you shortly.");
        setForm({ name: "", mobile: "", project: "", budget: "", visitDate: "" });
      } else {
        toast.error(data.error || "Something went wrong. Try WhatsApp.");
      }
    } catch {
      toast.error("Network error. Please try WhatsApp us directly.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.form
      onSubmit={submit}
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.9, delay: 0.4 }}
      className="glass-dark rounded-2xl p-6 md:p-8 w-full max-w-md shadow-2xl relative overflow-hidden"
    >
      <div className="absolute -top-16 -right-16 w-48 h-48 bg-gold/20 blur-3xl rounded-full" />
      <div className="relative">
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-2 bg-gold/15 text-gold border border-gold/30 rounded-full px-3 py-1 text-xs font-medium mb-3">
            <Sparkles className="w-3 h-3" /> Free Consultation
          </div>
          <h3 className="font-display text-2xl md:text-3xl text-white font-bold">
            Book Your <span className="text-gold-gradient">Site Visit</span>
          </h3>
          <p className="text-white/70 text-sm mt-2">Fill the form. Get expert guidance.</p>
        </div>

        <div className="space-y-3">
          <div>
            <Label htmlFor="name" className="text-white/80 text-xs">Full Name *</Label>
            <Input
              id="name"
              value={form.name}
              onChange={handleChange("name")}
              placeholder="Your name"
              className="bg-white/5 border-white/20 text-white placeholder:text-white/40 focus:border-gold h-11 mt-1"
            />
          </div>
          <div>
            <Label htmlFor="mobile" className="text-white/80 text-xs">Mobile Number *</Label>
            <Input
              id="mobile"
              type="tel"
              value={form.mobile}
              onChange={handleChange("mobile")}
              placeholder="+91 XXXXX XXXXX"
              className="bg-white/5 border-white/20 text-white placeholder:text-white/40 focus:border-gold h-11 mt-1"
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label htmlFor="project" className="text-white/80 text-xs">Project</Label>
              <select
                id="project"
                value={form.project}
                onChange={handleChange("project")}
                className="w-full mt-1 bg-white/5 border border-white/20 text-white rounded-md h-11 px-3 text-sm focus:border-gold focus:outline-none"
              >
                <option value="" className="bg-primary">Select</option>
                {PROJECTS.map((p) => (
                  <option key={p.name} value={p.name} className="bg-primary">
                    {p.name}
                  </option>
                ))}
                <option value="Other" className="bg-primary">Other</option>
              </select>
            </div>
            <div>
              <Label htmlFor="budget" className="text-white/80 text-xs">Budget</Label>
              <select
                id="budget"
                value={form.budget}
                onChange={handleChange("budget")}
                className="w-full mt-1 bg-white/5 border border-white/20 text-white rounded-md h-11 px-3 text-sm focus:border-gold focus:outline-none"
              >
                <option value="" className="bg-primary">Select</option>
                <option value="Under ₹20L" className="bg-primary">Under ₹20L</option>
                <option value="₹20L – ₹40L" className="bg-primary">₹20L – ₹40L</option>
                <option value="₹40L – ₹75L" className="bg-primary">₹40L – ₹75L</option>
                <option value="₹75L+" className="bg-primary">₹75L+</option>
              </select>
            </div>
          </div>
          <div>
            <Label htmlFor="visit" className="text-white/80 text-xs">Preferred Visit Date</Label>
            <Input
              id="visit"
              type="date"
              value={form.visitDate}
              onChange={handleChange("visitDate")}
              className="bg-white/5 border-white/20 text-white focus:border-gold h-11 mt-1"
            />
          </div>
          <Button
            type="submit"
            disabled={loading}
            className="btn-gold w-full h-12 rounded-lg font-semibold text-base mt-2"
          >
            {loading ? "Submitting..." : "Submit & Get Free Consultation →"}
          </Button>
          <p className="text-white/50 text-[11px] text-center">
            We respect your privacy. No spam calls.
          </p>
        </div>
      </div>
    </motion.form>
  );
}

function Hero() {
  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden">
      {/* Video Background */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          poster={HERO_POSTER}
          className="w-full h-full object-cover"
        >
          <source src={HERO_VIDEO} type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-br from-primary/85 via-primary/70 to-primary/90" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_50%,rgba(200,155,60,0.15),transparent_50%)]" />
      </div>

      <div className="relative z-10 container mx-auto pt-32 pb-16 grid lg:grid-cols-2 gap-10 items-center">
        {/* Left Content */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9 }}
          className="text-white"
        >
          <div className="inline-flex items-center gap-2 bg-gold/10 border border-gold/30 backdrop-blur-md rounded-full px-4 py-1.5 mb-6">
            <span className="w-2 h-2 rounded-full bg-gold animate-pulse" />
            <span className="text-gold text-xs font-medium tracking-widest uppercase">
              Trusted by 500+ Families
            </span>
          </div>

          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.05] mb-6">
            Invest in Jaipur's
            <br />
            <span className="text-gold-gradient">Premium JDA</span>
            <br />
            Approved Townships
          </h1>

          <div className="flex flex-wrap gap-3 mb-6">
            {["JDA Approved", "RERA Registered", "80–90% Bank Loan"].map((t) => (
              <div
                key={t}
                className="flex items-center gap-2 bg-white/10 backdrop-blur-md border border-gold/30 rounded-full px-4 py-2 text-sm text-white"
              >
                <CheckCircle2 className="w-4 h-4 text-gold" />
                <span className="font-medium">{t}</span>
              </div>
            ))}
          </div>

          <p className="text-white/85 text-base md:text-lg leading-relaxed max-w-xl mb-8">
            <strong className="text-gold">Invest With Surendra</strong> helps families and investors
            buy premium JDA approved plots in Jaipur with complete transparency, legal guidance and
            end-to-end support.
          </p>

          <div className="flex flex-wrap gap-3">
            <a href={WA_LINK()} target="_blank" rel="noopener">
              <Button className="btn-gold h-12 px-6 rounded-full font-semibold text-base">
                <MessageCircle className="w-5 h-5 mr-2" /> WhatsApp Now
              </Button>
            </a>
            <a href={`tel:${PHONE_TEL}`}>
              <Button
                variant="outline"
                className="h-12 px-6 rounded-full border-white/40 text-white bg-white/5 hover:bg-white hover:text-primary backdrop-blur-md font-semibold"
              >
                <Phone className="w-5 h-5 mr-2" /> Call Now
              </Button>
            </a>
            <a href="#contact">
              <Button
                variant="outline"
                className="h-12 px-6 rounded-full border-gold/50 text-gold bg-transparent hover:bg-gold hover:text-primary font-semibold"
              >
                <Calendar className="w-5 h-5 mr-2" /> Book Free Site Visit
              </Button>
            </a>
          </div>
        </motion.div>

        {/* Right form */}
        <div className="flex justify-center lg:justify-end">
          <HeroForm />
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 hidden md:flex flex-col items-center gap-2 text-white/60 animate-float">
        <span className="text-xs tracking-widest uppercase">Scroll</span>
        <div className="w-[1px] h-10 bg-gradient-to-b from-gold to-transparent" />
      </div>
    </section>
  );
}

function TrustBar() {
  return (
    <section className="relative -mt-16 z-20 container mx-auto px-4">
      <div className="bg-white rounded-2xl shadow-2xl grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-0 py-8 px-6 md:px-10 border border-gold/10">
        {STATS.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: i * 0.1 }}
            className={`text-center ${
              i < 3 ? "md:border-r md:border-gold/20" : ""
            }`}
          >
            <div className="font-display text-4xl md:text-5xl font-bold text-gold-gradient">
              {s.value}
            </div>
            <div className="text-primary/70 text-xs md:text-sm mt-2 font-medium tracking-wide uppercase">
              {s.label}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function About() {
  return (
    <section id="about" className="py-24 bg-white relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-gold/5 rounded-full blur-3xl" />
      <div className="container mx-auto grid lg:grid-cols-2 gap-16 items-center">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative"
        >
          <div className="relative rounded-2xl overflow-hidden shadow-2xl aspect-[4/5] max-w-md mx-auto">
            <img
              src={FOUNDER_IMG}
              alt="Surendra Kumar Meena — Founder"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/70 via-transparent to-transparent" />
            <div className="absolute bottom-0 inset-x-0 p-6 text-white">
              <div className="text-gold text-xs uppercase tracking-widest mb-1">Founder & CEO</div>
              <div className="font-display text-2xl font-bold">Surendra Kumar Meena</div>
            </div>
          </div>
          <div className="absolute -bottom-6 -right-2 md:-right-8 bg-gold-gradient text-primary rounded-xl p-4 shadow-xl">
            <div className="font-display text-3xl font-bold">5+</div>
            <div className="text-xs font-semibold uppercase tracking-wider">Years Experience</div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="text-gold text-sm font-semibold tracking-[0.3em] uppercase mb-4">
            About Us
          </div>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-primary mb-6 leading-tight">
            Building Trust,
            <br />
            <span className="text-gold-gradient">One Plot at a Time.</span>
          </h2>
          <p className="text-primary/75 text-lg leading-relaxed mb-6">
            <strong>Invest With Surendra</strong> is Jaipur's most trusted name for premium JDA
            approved plot investments. Founded by <strong>Surendra Kumar Meena</strong>, our
            mission is to make real estate investment simple, transparent, and rewarding.
          </p>
          <p className="text-primary/70 leading-relaxed mb-8">
            From site visit to registry to resale, we handle every step personally. Every project
            we recommend is legally verified, RERA registered, and comes with complete bank loan
            support up to 90% of property value.
          </p>
          <div className="grid grid-cols-2 gap-4">
            {[
              { icon: FileCheck, txt: "Legally Verified" },
              { icon: ShieldCheck, txt: "RERA Certified" },
              { icon: Banknote, txt: "Loan Assistance" },
              { icon: Award, txt: "Award Winning" },
            ].map(({ icon: Icon, txt }) => (
              <div key={txt} className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-gold/10 flex items-center justify-center">
                  <Icon className="w-5 h-5 text-gold" />
                </div>
                <span className="text-primary font-medium">{txt}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function Projects() {
  return (
    <section id="projects" className="py-24 bg-secondary relative">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <div className="text-gold text-sm font-semibold tracking-[0.3em] uppercase mb-4">
            Featured Projects
          </div>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-primary mb-4">
            Premium <span className="text-gold-gradient">JDA Approved</span> Townships
          </h2>
          <p className="text-primary/70 text-lg">
            Handpicked luxury projects across Jaipur with clear titles, high appreciation
            potential, and end-to-end bank loan support.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {PROJECTS.map((p, i) => (
            <motion.div
              key={p.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className="bg-white rounded-2xl overflow-hidden shadow-lg hover-lift group"
            >
              <div className="relative h-64 overflow-hidden">
                <img
                  src={p.img}
                  alt={p.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/60 to-transparent" />
                <div className="absolute top-4 left-4 bg-gold text-primary text-xs font-bold px-3 py-1.5 rounded-full">
                  {p.tag}
                </div>
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <div className="font-display text-2xl font-bold">{p.name}</div>
                  <div className="flex items-center gap-1 text-white/90 text-sm mt-1">
                    <MapPin className="w-3.5 h-3.5" /> {p.location}
                  </div>
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between mb-4 pb-4 border-b border-gold/20">
                  <div>
                    <div className="text-primary/60 text-xs uppercase tracking-wider">Starting</div>
                    <div className="text-gold-gradient font-display text-2xl font-bold">
                      {p.price}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-primary/60 text-xs uppercase tracking-wider">Size</div>
                    <div className="text-primary font-semibold">{p.size}</div>
                  </div>
                </div>
                <ul className="space-y-2 mb-6">
                  {p.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm text-primary/80">
                      <CheckCircle2 className="w-4 h-4 text-gold" /> {f}
                    </li>
                  ))}
                </ul>
                <div className="flex gap-2">
                  <a href={WA_LINK(`Hi Surendra, I'm interested in ${p.name}. Please share brochure & site visit details.`)} target="_blank" rel="noopener" className="flex-1">
                    <Button className="w-full btn-gold rounded-full">
                      <MessageCircle className="w-4 h-4 mr-1" /> Enquire
                    </Button>
                  </a>
                  <a href={`tel:${PHONE_TEL}`}>
                    <Button variant="outline" size="icon" className="rounded-full border-gold text-gold hover:bg-gold hover:text-primary">
                      <Phone className="w-4 h-4" />
                    </Button>
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function WhyUs() {
  return (
    <section id="why" className="py-24 bg-primary relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_80%_20%,rgba(200,155,60,0.15),transparent_50%)]" />
      <div className="container mx-auto relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <div className="text-gold text-sm font-semibold tracking-[0.3em] uppercase mb-4">
            Why Choose Us
          </div>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">
            The <span className="text-gold-gradient">Luxury Standard</span> of Real Estate
          </h2>
          <p className="text-white/70 text-lg">
            Six reasons why families and NRI investors trust Invest With Surendra.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {WHY_US.map(({ icon: Icon, title, desc }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="glass p-6 rounded-2xl hover:border-gold/50 transition-all hover:-translate-y-1 group"
            >
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

function Testimonials() {
  return (
    <section id="testimonials" className="py-24 bg-white">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <div className="text-gold text-sm font-semibold tracking-[0.3em] uppercase mb-4">
            Testimonials
          </div>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-primary mb-4">
            What Our <span className="text-gold-gradient">Clients</span> Say
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="bg-secondary rounded-2xl p-8 relative border border-gold/10 hover:border-gold/40 transition-all hover-lift"
            >
              <div className="absolute -top-4 left-6 bg-gold-gradient text-primary w-10 h-10 rounded-full flex items-center justify-center font-display text-2xl font-bold shadow-lg">
                "
              </div>
              <div className="flex gap-1 mb-4 pt-2">
                {Array.from({ length: t.rating }).map((_, j) => (
                  <Star key={j} className="w-4 h-4 fill-gold text-gold" />
                ))}
              </div>
              <p className="text-primary/80 leading-relaxed mb-6 italic">"{t.text}"</p>
              <div className="pt-4 border-t border-gold/20">
                <div className="font-display font-bold text-primary">{t.name}</div>
                <div className="text-primary/60 text-sm">{t.role}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CTA() {
  return (
    <section className="relative py-20 bg-primary overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(200,155,60,0.2),transparent_70%)]" />
      <div className="container mx-auto relative text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto"
        >
          <h2 className="font-display text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">
            Ready to <span className="text-gold-gradient">Invest</span> in Your Dream Plot?
          </h2>
          <p className="text-white/80 text-lg mb-8">
            Talk to Surendra Kumar Meena directly. Get a free property consultation, site visit,
            and legal verification — no obligations.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href={WA_LINK()} target="_blank" rel="noopener">
              <Button className="btn-gold h-14 px-8 rounded-full font-semibold text-base">
                <MessageCircle className="w-5 h-5 mr-2" /> WhatsApp Surendra
              </Button>
            </a>
            <a href={`tel:${PHONE_TEL}`}>
              <Button
                variant="outline"
                className="h-14 px-8 rounded-full border-white/40 text-white bg-white/5 hover:bg-white hover:text-primary backdrop-blur-md font-semibold"
              >
                <Phone className="w-5 h-5 mr-2" /> {PHONE}
              </Button>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer id="contact" className="bg-primary text-white pt-20 pb-8 border-t border-gold/20">
      <div className="container mx-auto grid lg:grid-cols-4 md:grid-cols-2 gap-10 mb-12">
        {/* Brand */}
        <div>
          <div className="flex items-center gap-3 mb-5">
            <div className="w-11 h-11 rounded-full bg-gold-gradient flex items-center justify-center">
              <Building2 className="w-5 h-5 text-primary" />
            </div>
            <div className="font-display text-lg font-bold">
              Invest With <span className="text-gold-gradient">Surendra</span>
            </div>
          </div>
          <p className="text-white/70 text-sm leading-relaxed mb-5">
            Jaipur's most trusted name for JDA approved premium plot investments. RERA registered,
            legally verified, bank loan enabled.
          </p>
          <div className="flex gap-3">
            {[
              { Icon: Facebook, href: "#" },
              { Icon: Instagram, href: "#" },
              { Icon: Youtube, href: "#" },
            ].map(({ Icon, href }, i) => (
              <a
                key={i}
                href={href}
                target="_blank"
                rel="noopener"
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-gold hover:text-primary flex items-center justify-center transition-all"
              >
                <Icon className="w-4 h-4" />
              </a>
            ))}
          </div>
        </div>

        {/* Contact */}
        <div>
          <h4 className="font-display text-lg font-bold mb-5 text-gold">Contact</h4>
          <ul className="space-y-4 text-sm">
            <li className="flex gap-3">
              <MapPin className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" />
              <span className="text-white/80 leading-relaxed">{ADDRESS}</span>
            </li>
            <li className="flex items-center gap-3">
              <Phone className="w-5 h-5 text-gold flex-shrink-0" />
              <a href={`tel:${PHONE_TEL}`} className="text-white/80 hover:text-gold">
                {PHONE}
              </a>
            </li>
            <li className="flex items-center gap-3">
              <MessageCircle className="w-5 h-5 text-gold flex-shrink-0" />
              <a href={WA_LINK()} target="_blank" rel="noopener" className="text-white/80 hover:text-gold">
                WhatsApp Chat
              </a>
            </li>
            <li className="flex items-center gap-3">
              <Mail className="w-5 h-5 text-gold flex-shrink-0" />
              <a href={`mailto:${EMAIL}`} className="text-white/80 hover:text-gold break-all">
                {EMAIL}
              </a>
            </li>
          </ul>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="font-display text-lg font-bold mb-5 text-gold">Quick Links</h4>
          <ul className="space-y-3 text-sm">
            {NAV_LINKS.map((l) => (
              <li key={l.href}>
                <a href={l.href} className="text-white/80 hover:text-gold flex items-center gap-2">
                  <ChevronRight className="w-3.5 h-3.5 text-gold" /> {l.label}
                </a>
              </li>
            ))}
            <li>
              <a
                href={MAP_LINK}
                target="_blank"
                rel="noopener"
                className="text-white/80 hover:text-gold flex items-center gap-2"
              >
                <ChevronRight className="w-3.5 h-3.5 text-gold" /> Google Business
              </a>
            </li>
          </ul>
        </div>

        {/* Map */}
        <div>
          <h4 className="font-display text-lg font-bold mb-5 text-gold">Find Us</h4>
          <a href={MAP_LINK} target="_blank" rel="noopener" className="block rounded-xl overflow-hidden border border-gold/30 hover:border-gold transition-colors">
            <iframe
              src={MAP_EMBED}
              width="100%"
              height="180"
              style={{ border: 0 }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Invest With Surendra Office Location"
            />
          </a>
          <a href={MAP_LINK} target="_blank" rel="noopener" className="inline-flex items-center gap-1 text-gold hover:text-gold-light text-sm mt-3">
            Open in Google Maps <ChevronRight className="w-4 h-4" />
          </a>
        </div>
      </div>

      <div className="container mx-auto pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-white/60">
        <div>© {new Date().getFullYear()} Invest With Surendra. All rights reserved.</div>
        <div>
          Founder: <span className="text-gold">Surendra Kumar Meena</span> • Premium Real Estate,
          Jaipur
        </div>
      </div>
    </footer>
  );
}

function FloatingButtons() {
  const [showTop, setShowTop] = useState(false);
  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 500);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="fixed right-4 md:right-6 bottom-4 md:bottom-6 z-40 flex flex-col gap-3">
      <a
        href={WA_LINK()}
        target="_blank"
        rel="noopener"
        aria-label="WhatsApp"
        className="w-14 h-14 rounded-full bg-[#25D366] text-white shadow-2xl hover:scale-110 transition-transform flex items-center justify-center animate-float"
        style={{ animationDelay: "0s" }}
      >
        <MessageCircle className="w-6 h-6" />
      </a>
      <a
        href={`tel:${PHONE_TEL}`}
        aria-label="Call"
        className="w-14 h-14 rounded-full bg-gold-gradient text-primary shadow-2xl hover:scale-110 transition-transform flex items-center justify-center"
      >
        <Phone className="w-6 h-6" />
      </a>
      <a
        href="#contact"
        aria-label="Book Site Visit"
        className="w-14 h-14 rounded-full bg-primary text-gold border border-gold/40 shadow-2xl hover:scale-110 transition-transform flex items-center justify-center"
      >
        <Calendar className="w-6 h-6" />
      </a>
      {showTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          aria-label="Back to top"
          className="w-11 h-11 rounded-full bg-white text-primary shadow-2xl hover:scale-110 transition-transform flex items-center justify-center border border-gold/30"
        >
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
      <About />
      <Projects />
      <WhyUs />
      <Testimonials />
      <CTA />
      <Footer />
      <FloatingButtons />
    </main>
  );
}

export default App;
