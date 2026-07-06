"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { Phone, MessageCircle, Mail, MapPin, Send, CheckCircle2, Clock } from "lucide-react";
import { SiteHeader, SiteFooter, FloatingActions } from "@/components/site/Chrome";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { PHONE, PHONE_TEL, EMAIL, ADDRESS, MAP_EMBED, MAP_LINK, waLink } from "@/lib/shared";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", mobile: "", subject: "", message: "" });
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.mobile) return toast.error("Please fill name, email and mobile.");
    setLoading(true);
    try {
      const res = await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
      const d = await res.json();
      if (res.ok) { toast.success("Thanks! We'll reply within 24 hours."); setForm({ name:"", email:"", mobile:"", subject:"", message:"" }); }
      else toast.error(d.error || "Failed");
    } catch { toast.error("Network error"); }
    finally { setLoading(false); }
  };

  return (
    <main className="bg-white min-h-screen">
      <SiteHeader />

      {/* Hero */}
      <section className="relative pt-32 pb-16 bg-primary text-white overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_50%,rgba(200,155,60,0.2),transparent_60%)]" />
        <div className="container relative text-center">
          <div className="text-gold text-sm font-semibold tracking-[0.3em] uppercase mb-4">Get In Touch</div>
          <h1 className="font-display text-4xl md:text-6xl font-bold mb-4">Contact <span className="text-gold-gradient">Invest With Surendra</span></h1>
          <p className="text-white/70 text-lg max-w-2xl mx-auto">Talk to Surendra Kumar Meena directly. We're here to help you invest in Jaipur's finest JDA approved plots.</p>
        </div>
      </section>

      {/* Info cards */}
      <section className="container -mt-10 relative z-10 grid md:grid-cols-3 gap-4">
        {[
          { Icon: Phone, label: "Call Us", value: PHONE, href: `tel:${PHONE_TEL}`, sub: "Mon-Sun, 9 AM - 9 PM" },
          { Icon: MessageCircle, label: "WhatsApp", value: PHONE, href: waLink(), sub: "Instant reply" },
          { Icon: Mail, label: "Email", value: EMAIL, href: `mailto:${EMAIL}`, sub: "Reply within 24 hrs" },
        ].map(({ Icon, label, value, href, sub }, i) => (
          <motion.a key={label} href={href} target={label === "WhatsApp" ? "_blank" : undefined} rel="noopener" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="bg-white rounded-2xl p-6 shadow-xl border border-gold/10 hover-lift group">
            <div className="w-12 h-12 rounded-xl bg-gold-gradient flex items-center justify-center mb-4 group-hover:rotate-6 transition-transform">
              <Icon className="w-5 h-5 text-primary" />
            </div>
            <div className="text-xs uppercase tracking-wider text-primary/60 mb-1">{label}</div>
            <div className="font-display text-lg font-bold text-primary">{value}</div>
            <div className="text-slate-500 text-xs mt-1 flex items-center gap-1"><Clock className="w-3 h-3" /> {sub}</div>
          </motion.a>
        ))}
      </section>

      {/* Form + Map */}
      <section className="container py-20 grid lg:grid-cols-2 gap-10">
        <motion.form onSubmit={submit} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="bg-white rounded-2xl shadow-xl p-8 border border-gold/10 space-y-4">
          <div>
            <div className="text-gold text-xs font-semibold tracking-[0.3em] uppercase mb-2">Send a Message</div>
            <h2 className="font-display text-3xl font-bold text-primary">We'd love to <span className="text-gold-gradient">hear from you</span></h2>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <div><Label>Full Name *</Label><Input value={form.name} onChange={(e) => setForm({...form, name: e.target.value})} className="h-12 mt-1.5" /></div>
            <div><Label>Mobile *</Label><Input type="tel" value={form.mobile} onChange={(e) => setForm({...form, mobile: e.target.value})} className="h-12 mt-1.5" /></div>
          </div>
          <div><Label>Email *</Label><Input type="email" value={form.email} onChange={(e) => setForm({...form, email: e.target.value})} className="h-12 mt-1.5" /></div>
          <div><Label>Subject</Label><Input value={form.subject} onChange={(e) => setForm({...form, subject: e.target.value})} className="h-12 mt-1.5" placeholder="e.g. Enquiry about Orbis SEZ" /></div>
          <div><Label>Message</Label><Textarea rows={5} value={form.message} onChange={(e) => setForm({...form, message: e.target.value})} className="mt-1.5" placeholder="Tell us how we can help..." /></div>
          <Button type="submit" disabled={loading} className="btn-gold w-full h-13 rounded-full font-semibold text-base py-4">{loading ? "Sending..." : (<><Send className="w-4 h-4 mr-2" /> Send Message</>)}</Button>
          <p className="text-xs text-slate-500 flex items-center gap-1"><CheckCircle2 className="w-3 h-3 text-gold" /> Your info is safe with us. No spam.</p>
        </motion.form>

        <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="space-y-6">
          <div className="rounded-2xl overflow-hidden shadow-xl border-4 border-gold/20 h-[400px]">
            <iframe src={MAP_EMBED} width="100%" height="100%" style={{ border: 0 }} loading="lazy" title="Office Location" />
          </div>
          <div className="bg-primary text-white rounded-2xl p-6">
            <div className="flex items-start gap-3">
              <MapPin className="w-6 h-6 text-gold flex-shrink-0 mt-1" />
              <div>
                <div className="font-display text-lg font-bold">Our Office</div>
                <p className="text-white/80 text-sm mt-1 leading-relaxed">{ADDRESS}</p>
                <a href={MAP_LINK} target="_blank" rel="noopener" className="inline-flex items-center gap-1 text-gold hover:text-gold-light text-sm mt-3">Get Directions →</a>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      <SiteFooter />
      <FloatingActions />
    </main>
  );
}
