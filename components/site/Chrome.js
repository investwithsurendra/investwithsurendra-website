"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Phone, MessageCircle, Menu, X, Building2, ArrowUp, Calendar, ChevronRight, MapPin, Mail, Facebook, Instagram, Youtube } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PHONE, PHONE_TEL, EMAIL, ADDRESS, MAP_EMBED, MAP_LINK, NAV_LINKS, waLink } from "@/lib/shared";

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <header className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${scrolled ? "bg-primary/95 backdrop-blur-xl shadow-lg py-3" : "bg-primary/70 backdrop-blur py-4"}`}>
      <div className="container mx-auto flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-11 h-11 rounded-full bg-gold-gradient flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform">
            <img 
            src="https://i.postimg.cc/Rh4FnjgW/file-0000000000bc7208b701ffacd96333ab.jpg"
  alt="Invest With Surendra"
  className="w-10 h-10 rounded-full object-cover" />
          </div>
          <div className="leading-tight">
            <div className="font-display text-white text-lg md:text-xl font-bold">Invest With <span className="text-gold-gradient">Surendra</span></div>
            <div className="text-[10px] md:text-xs text-gold/90 tracking-[0.2em] uppercase">Premium Real Estate • Jaipur</div>
          </div>
        </Link>
        <nav className="hidden lg:flex items-center gap-6">
          {NAV_LINKS.map((l) => (
            <Link key={l.href} href={l.href} className="text-white/90 hover:text-gold text-sm font-medium relative group">
              {l.label}
              <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-gold group-hover:w-full transition-all duration-300" />
            </Link>
          ))}
        </nav>
        <div className="hidden lg:flex items-center gap-3">
          <a href={waLink()} target="_blank" rel="noopener"><Button className="btn-gold rounded-full px-5 h-10 font-semibold"><MessageCircle className="w-4 h-4 mr-2" /> WhatsApp</Button></a>
        </div>
        <button onClick={() => setOpen(!open)} className="lg:hidden text-white p-2" aria-label="Menu">{open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}</button>
      </div>
      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="lg:hidden overflow-hidden bg-primary/98 backdrop-blur-xl border-t border-gold/20">
            <div className="container py-6 flex flex-col gap-2">
              {NAV_LINKS.map((l) => (
                <Link key={l.href} href={l.href} onClick={() => setOpen(false)} className="text-white/90 hover:text-gold py-2 border-b border-white/10 flex items-center justify-between">{l.label} <ChevronRight className="w-4 h-4" /></Link>
              ))}
              <div className="flex gap-3 pt-3">
                <a href={`tel:${PHONE_TEL}`} className="flex-1"><Button variant="outline" className="w-full border-gold text-gold"><Phone className="w-4 h-4 mr-2" /> Call</Button></a>
                <a href={waLink()} target="_blank" rel="noopener" className="flex-1"><Button className="w-full btn-gold"><MessageCircle className="w-4 h-4 mr-2" /> WhatsApp</Button></a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer id="contact" className="bg-primary text-white pt-20 pb-8 border-t border-gold/20">
      <div className="container mx-auto grid lg:grid-cols-4 md:grid-cols-2 gap-10 mb-12">
        <div>
          <div className="flex items-center gap-3 mb-5">
            <div className="w-11 h-11 rounded-full bg-gold-gradient flex items-center justify-center"><Building2 className="w-5 h-5 text-primary" /></div>
            <div className="font-display text-lg font-bold">Invest With <span className="text-gold-gradient">Surendra</span></div>
          </div>
          <p className="text-white/70 text-sm leading-relaxed mb-5">Jaipur's most trusted name for JDA approved premium plot investments. RERA registered, legally verified, bank loan enabled.</p>
          <div className="flex gap-3">
            {[
  { Icon: Facebook, url: "https://www.facebook.com/share/18orXYA3sc/" },
  { Icon: Instagram, url: "https://www.instagram.com/invest_with_surendra?igsh=MWlmcmgzZTBhdHpsaQ==" },
  { Icon: Youtube, url: "https://youtube.com/@investwithsurendra" }
].map(({ Icon, url }, i) => (
  <a
    key={i}
    href={url}
    target="_blank"
    rel="noopener noreferrer"
    className="w-10 h-10 rounded-full bg-white/10 hover:bg-gold hover:text-primary flex items-center justify-center transition-all"
  >
    <Icon />
  </a>
))}
          </div>
        </div>
        <div>
          <h4 className="font-display text-lg font-bold mb-5 text-gold">Contact</h4>
          <ul className="space-y-4 text-sm">
            <li className="flex gap-3"><MapPin className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" /><span className="text-white/80">{ADDRESS}</span></li>
            <li className="flex items-center gap-3"><Phone className="w-5 h-5 text-gold" /><a href={`tel:${PHONE_TEL}`} className="text-white/80 hover:text-gold">{PHONE}</a></li>
            <li className="flex items-center gap-3"><MessageCircle className="w-5 h-5 text-gold" /><a href={waLink()} target="_blank" rel="noopener" className="text-white/80 hover:text-gold">WhatsApp Chat</a></li>
            <li className="flex items-center gap-3"><Mail className="w-5 h-5 text-gold" /><a href={`mailto:${EMAIL}`} className="text-white/80 hover:text-gold break-all">{EMAIL}</a></li>
          </ul>
        </div>
        <div>
          <h4 className="font-display text-lg font-bold mb-5 text-gold">Quick Links</h4>
          <ul className="space-y-3 text-sm">
            {NAV_LINKS.map((l) => <li key={l.href}><Link href={l.href} className="text-white/80 hover:text-gold flex items-center gap-2"><ChevronRight className="w-3.5 h-3.5 text-gold" /> {l.label}</Link></li>)}
            <li><Link href="/tools/roi-calculator" className="text-white/80 hover:text-gold flex items-center gap-2"><ChevronRight className="w-3.5 h-3.5 text-gold" /> ROI Calculator</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-display text-lg font-bold mb-5 text-gold">Find Us</h4>
          <a href={MAP_LINK} target="_blank" rel="noopener" className="block rounded-xl overflow-hidden border border-gold/30 hover:border-gold transition"><iframe src={MAP_EMBED} width="100%" height="180" style={{border:0}} loading="lazy" title="Office" /></a>
          <a href={MAP_LINK} target="_blank" rel="noopener" className="inline-flex items-center gap-1 text-gold hover:text-gold-light text-sm mt-3">Open in Google Maps <ChevronRight className="w-4 h-4" /></a>
        </div>
      </div>
      <div className="container mx-auto pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-white/60">
        <div>© {new Date().getFullYear()} Invest With Surendra. All rights reserved.</div>
        <div>Founder: <span className="text-gold">Surendra Kumar Meena</span> • Jaipur</div>
      </div>
    </footer>
  );
}

export function FloatingActions() {
  const [top, setTop] = useState(false);
  useEffect(() => {
    const onScroll = () => setTop(window.scrollY > 500);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <div className="fixed right-4 md:right-6 bottom-4 md:bottom-6 z-40 flex flex-col gap-3">
      <a href={waLink()} target="_blank" rel="noopener" className="w-14 h-14 rounded-full bg-[#25D366] text-white shadow-2xl hover:scale-110 transition flex items-center justify-center animate-float" aria-label="WhatsApp"><MessageCircle className="w-6 h-6" /></a>
      <a href={`tel:${PHONE_TEL}`} className="w-14 h-14 rounded-full bg-gold-gradient text-primary shadow-2xl hover:scale-110 transition flex items-center justify-center" aria-label="Call"><Phone className="w-6 h-6" /></a>
      <Link href="/contact" className="w-14 h-14 rounded-full bg-primary text-gold border border-gold/40 shadow-2xl hover:scale-110 transition flex items-center justify-center" aria-label="Book"><Calendar className="w-6 h-6" /></Link>
      {top && <button onClick={() => window.scrollTo({top:0, behavior:"smooth"})} className="w-11 h-11 rounded-full bg-white text-primary shadow-2xl hover:scale-110 transition flex items-center justify-center border border-gold/30" aria-label="Top"><ArrowUp className="w-5 h-5" /></button>}
    </div>
  );
}
