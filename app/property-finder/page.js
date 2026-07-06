"use client";

import { useEffect, useState, useMemo } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { Filter, MapPin, IndianRupee, Target, Building2, ChevronRight, MessageCircle, Search, Sparkles } from "lucide-react";
import { SiteHeader, SiteFooter, FloatingActions } from "@/components/site/Chrome";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { waLink } from "@/lib/shared";

const BUDGETS = ["Under \u20b920L", "\u20b920L \u2013 \u20b940L", "\u20b940L \u2013 \u20b975L", "\u20b975L+"];
const LOCATIONS = ["Mahindra SEZ", "Ajmer Road", "Tonk Road", "Diggi Road", "Knowledge City", "Jaipur-Delhi Highway", "Other"];
const GOALS = ["Own Home", "Long-term Investment", "Short-term Flip", "Rental Income", "NRI Portfolio"];

function budgetMatch(price, budget) {
  if (!budget) return true;
  const n = parseInt(String(price).replace(/[^0-9]/g, "")) || 0;
  if (budget.includes("Under")) return n < 20;
  if (budget.includes("75L+") || budget.includes("75+")) return n >= 75;
  if (budget.includes("20L") && budget.includes("40L")) return n >= 20 && n < 40;
  if (budget.includes("40L") && budget.includes("75L")) return n >= 40 && n < 75;
  return true;
}

export default function PropertyFinder() {
  const [projects, setProjects] = useState([]);
  const [f, setF] = useState({ budget: "", location: "", project: "", goal: "" });
  const [showLead, setShowLead] = useState(false);
  const [lead, setLead] = useState({ name: "", mobile: "" });

  useEffect(() => { fetch("/api/projects").then((r) => r.json()).then((r) => setProjects(r.projects || [])); }, []);

  const filtered = useMemo(() => projects.filter((p) => {
    if (!budgetMatch(p.price, f.budget)) return false;
    if (f.location && !(p.location || "").toLowerCase().includes(f.location.toLowerCase().split(" ")[0])) return false;
    if (f.project && p.slug !== f.project) return false;
    return true;
  }), [projects, f]);

  const submitLead = async (e) => {
    e.preventDefault();
    if (!lead.name || !lead.mobile) return toast.error("Name and mobile required");
    const res = await fetch("/api/leads", {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...lead, budget: f.budget, location: f.location, project: f.project ? projects.find((p) => p.slug === f.project)?.name : "", propertyGoal: f.goal, source: "property_finder" }),
    });
    if (res.ok) { toast.success("Thanks! Surendra will contact you with matching options."); setShowLead(false); setLead({ name: "", mobile: "" }); }
  };

  return (
    <main className="bg-white min-h-screen">
      <SiteHeader />

      <section className="relative pt-32 pb-14 bg-primary text-white overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(200,155,60,0.2),transparent_60%)]" />
        <div className="container relative text-center">
          <div className="inline-flex items-center gap-2 bg-gold/15 border border-gold/30 rounded-full px-4 py-1.5 mb-4">
            <Sparkles className="w-3.5 h-3.5 text-gold" />
            <span className="text-gold text-xs font-medium tracking-widest uppercase">Smart Property Match</span>
          </div>
          <h1 className="font-display text-4xl md:text-6xl font-bold mb-3">Find Your <span className="text-gold-gradient">Perfect Plot</span></h1>
          <p className="text-white/70 text-lg max-w-2xl mx-auto">Answer 4 quick questions and we'll match you with the best JDA approved projects in Jaipur.</p>
        </div>
      </section>

      {/* Filters */}
      <section className="container -mt-8 relative z-10">
        <div className="bg-white rounded-2xl shadow-2xl border border-gold/10 p-6 md:p-8">
          <div className="flex items-center gap-2 mb-4">
            <Filter className="w-5 h-5 text-gold" />
            <div className="font-display text-lg font-bold text-primary">Filter Properties</div>
          </div>
          <div className="grid md:grid-cols-4 gap-4">
            <div>
              <Label className="flex items-center gap-1 text-xs"><IndianRupee className="w-3 h-3 text-gold" /> Budget</Label>
              <select value={f.budget} onChange={(e) => setF({...f, budget: e.target.value})} className="w-full mt-1.5 h-11 px-3 rounded-md border border-slate-200 text-sm">
                <option value="">Any budget</option>
                {BUDGETS.map((b) => <option key={b}>{b}</option>)}
              </select>
            </div>
            <div>
              <Label className="flex items-center gap-1 text-xs"><MapPin className="w-3 h-3 text-gold" /> Location</Label>
              <select value={f.location} onChange={(e) => setF({...f, location: e.target.value})} className="w-full mt-1.5 h-11 px-3 rounded-md border border-slate-200 text-sm">
                <option value="">Any area</option>
                {LOCATIONS.map((l) => <option key={l}>{l}</option>)}
              </select>
            </div>
            <div>
              <Label className="flex items-center gap-1 text-xs"><Building2 className="w-3 h-3 text-gold" /> Project</Label>
              <select value={f.project} onChange={(e) => setF({...f, project: e.target.value})} className="w-full mt-1.5 h-11 px-3 rounded-md border border-slate-200 text-sm">
                <option value="">All projects</option>
                {projects.map((p) => <option key={p.slug} value={p.slug}>{p.name}</option>)}
              </select>
            </div>
            <div>
              <Label className="flex items-center gap-1 text-xs"><Target className="w-3 h-3 text-gold" /> Investment Goal</Label>
              <select value={f.goal} onChange={(e) => setF({...f, goal: e.target.value})} className="w-full mt-1.5 h-11 px-3 rounded-md border border-slate-200 text-sm">
                <option value="">Any goal</option>
                {GOALS.map((g) => <option key={g}>{g}</option>)}
              </select>
            </div>
          </div>
          <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
            <div className="text-sm text-primary/70"><strong className="text-gold">{filtered.length}</strong> matching project{filtered.length !== 1 ? "s" : ""}</div>
            <Button onClick={() => setShowLead(true)} className="btn-gold rounded-full h-11 px-5 font-semibold">Get Personalized Recommendations →</Button>
          </div>
        </div>
      </section>

      {/* Results */}
      <section className="container py-16">
        {filtered.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-16 h-16 mx-auto rounded-full bg-slate-100 flex items-center justify-center mb-4"><Search className="w-8 h-8 text-slate-400" /></div>
            <div className="font-display text-2xl text-primary mb-2">No matches for this filter</div>
            <p className="text-slate-500 mb-6">Try widening your budget or location. Or talk to Surendra directly.</p>
            <a href={waLink()} target="_blank" rel="noopener"><Button className="btn-gold rounded-full"><MessageCircle className="w-4 h-4 mr-2" /> WhatsApp Surendra</Button></a>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((p, i) => (
              <motion.div key={p.slug} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="bg-white rounded-2xl overflow-hidden shadow-lg hover-lift border border-gold/10">
                <div className="relative h-56">
                  <img src={p.card} className="w-full h-full object-cover" alt={p.name} />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/70 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <div className="font-display text-xl font-bold">{p.name}</div>
                    <div className="text-xs opacity-90 flex items-center gap-1"><MapPin className="w-3 h-3" /> {p.location}</div>
                  </div>
                </div>
                <div className="p-5">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <div className="text-[10px] uppercase text-primary/60">Starting</div>
                      <div className="text-gold-gradient font-display text-xl font-bold">{p.price}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-[10px] uppercase text-primary/60">Sizes</div>
                      <div className="text-primary text-sm font-semibold">{p.size}</div>
                    </div>
                  </div>
                  <Link href={`/projects/${p.slug}`}><Button className="w-full btn-gold rounded-full">View Details <ChevronRight className="w-4 h-4 ml-1" /></Button></Link>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </section>

      {/* Lead modal */}
      {showLead && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4" onClick={() => setShowLead(false)}>
          <form onSubmit={submitLead} onClick={(e) => e.stopPropagation()} className="bg-white rounded-2xl p-8 w-full max-w-md shadow-2xl">
            <h3 className="font-display text-2xl font-bold text-primary mb-2">Get personalized <span className="text-gold-gradient">recommendations</span></h3>
            <p className="text-sm text-slate-500 mb-4">We'll match your filters with Surendra's inventory and send options via WhatsApp.</p>
            <div className="space-y-3">
              <div><Label>Full Name *</Label><Input value={lead.name} onChange={(e) => setLead({...lead, name: e.target.value})} className="h-11 mt-1" /></div>
              <div><Label>Mobile *</Label><Input type="tel" value={lead.mobile} onChange={(e) => setLead({...lead, mobile: e.target.value})} className="h-11 mt-1" /></div>
            </div>
            <div className="mt-4 bg-slate-50 rounded-lg p-3 text-xs text-slate-600 space-y-1">
              <div><strong>Budget:</strong> {f.budget || "Any"}</div>
              <div><strong>Location:</strong> {f.location || "Any"}</div>
              <div><strong>Goal:</strong> {f.goal || "Any"}</div>
            </div>
            <Button type="submit" className="btn-gold w-full h-12 rounded-full mt-5 font-semibold">Send Me Recommendations →</Button>
          </form>
        </div>
      )}

      <SiteFooter />
      <FloatingActions />
    </main>
  );
}
