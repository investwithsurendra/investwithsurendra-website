"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { TrendingUp, IndianRupee, Percent, Calendar, MessageCircle, ChevronRight } from "lucide-react";
import { SiteHeader, SiteFooter, FloatingActions } from "@/components/site/Chrome";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { waLink } from "@/lib/shared";

const inr = (n) => (!isFinite(n) || isNaN(n) ? "\u20b90" : "\u20b9" + Math.round(n).toLocaleString("en-IN"));

export default function ROICalculator() {
  const [P, setP] = useState(2500000);
  const [R, setR] = useState(15); // annual appreciation %
  const [N, setN] = useState(5);

  const { future, gain, cagr, timeline } = useMemo(() => {
    const future = P * Math.pow(1 + R / 100, N);
    const gain = future - P;
    const cagr = R;
    const timeline = Array.from({ length: N + 1 }, (_, i) => ({
      year: i,
      value: P * Math.pow(1 + R / 100, i),
    }));
    return { future, gain, cagr, timeline };
  }, [P, R, N]);

  const maxValue = Math.max(...timeline.map((t) => t.value));

  return (
    <main className="bg-white min-h-screen">
      <SiteHeader />

      <section className="pt-32 pb-14 bg-primary text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(200,155,60,0.2),transparent_60%)]" />
        <div className="container relative text-center">
          <div className="inline-flex items-center gap-2 bg-gold/15 rounded-full px-4 py-1.5 mb-4 border border-gold/30">
            <TrendingUp className="w-3.5 h-3.5 text-gold" />
            <span className="text-gold text-xs font-medium tracking-widest uppercase">Calculator</span>
          </div>
          <h1 className="font-display text-4xl md:text-6xl font-bold mb-3">ROI <span className="text-gold-gradient">Calculator</span></h1>
          <p className="text-white/70 text-lg">Project your property investment growth over time.</p>
          <div className="flex justify-center gap-4 mt-6 text-sm">
            <Link href="/tools/emi-calculator" className="text-white/60 hover:text-gold">EMI Calculator</Link>
            <Link href="/tools/roi-calculator" className="text-gold border-b-2 border-gold">ROI Calculator</Link>
          </div>
        </div>
      </section>

      <section className="container py-16 grid lg:grid-cols-5 gap-8">
        <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="lg:col-span-2 bg-white rounded-2xl p-8 shadow-xl border border-gold/10 space-y-6">
          <h2 className="font-display text-2xl font-bold text-primary">Investment Details</h2>

          <div>
            <Label className="flex justify-between"><span><IndianRupee className="w-3 h-3 inline" /> Plot Cost</span><span className="text-gold font-bold">{inr(P)}</span></Label>
            <input type="range" min={500000} max={20000000} step={100000} value={P} onChange={(e) => setP(+e.target.value)} className="w-full mt-2 accent-yellow-600" />
            <Input type="number" value={P} onChange={(e) => setP(+e.target.value || 0)} className="mt-2 h-11" />
          </div>

          <div>
            <Label className="flex justify-between"><span><Percent className="w-3 h-3 inline" /> Annual Appreciation</span><span className="text-gold font-bold">{R}%</span></Label>
            <input type="range" min={5} max={30} step={0.5} value={R} onChange={(e) => setR(+e.target.value)} className="w-full mt-2 accent-yellow-600" />
            <Input type="number" step={0.5} value={R} onChange={(e) => setR(+e.target.value || 0)} className="mt-2 h-11" />
            <div className="text-[11px] text-slate-500 mt-1">Jaipur JDA plot corridors typically appreciate 12–25% p.a.</div>
          </div>

          <div>
            <Label className="flex justify-between"><span><Calendar className="w-3 h-3 inline" /> Holding Period (Years)</span><span className="text-gold font-bold">{N} yrs</span></Label>
            <input type="range" min={1} max={20} step={1} value={N} onChange={(e) => setN(+e.target.value)} className="w-full mt-2 accent-yellow-600" />
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="lg:col-span-3 bg-primary text-white rounded-2xl p-8 shadow-2xl relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(200,155,60,0.25),transparent_60%)]" />
          <div className="relative">
            <div className="text-center mb-6">
              <div className="text-gold text-xs uppercase tracking-widest mb-2">Projected Value in {N} Years</div>
              <div className="font-display text-5xl md:text-6xl font-bold text-gold-gradient">{inr(future)}</div>
              <div className="text-white/70 text-sm mt-2">Estimated gain: <span className="text-gold font-bold">{inr(gain)}</span> ({((gain/P)*100).toFixed(0)}%)</div>
            </div>

            <div className="grid grid-cols-3 gap-3 mb-6">
              <div className="bg-white/5 rounded-xl p-3 border border-gold/20 text-center">
                <div className="text-white/60 text-[10px] uppercase">Invested</div>
                <div className="font-display text-lg font-bold">{inr(P)}</div>
              </div>
              <div className="bg-white/5 rounded-xl p-3 border border-gold/20 text-center">
                <div className="text-white/60 text-[10px] uppercase">Gain</div>
                <div className="font-display text-lg font-bold text-gold">{inr(gain)}</div>
              </div>
              <div className="bg-white/5 rounded-xl p-3 border border-gold/20 text-center">
                <div className="text-white/60 text-[10px] uppercase">CAGR</div>
                <div className="font-display text-lg font-bold">{cagr}%</div>
              </div>
            </div>

            {/* Chart */}
            <div className="bg-white/5 rounded-xl p-4 border border-gold/20 mb-6">
              <div className="text-white/60 text-xs uppercase mb-3">Year-by-Year Projection</div>
              <div className="flex items-end gap-1 h-32">
                {timeline.map((t) => (
                  <div key={t.year} className="flex-1 flex flex-col items-center gap-1">
                    <div className="w-full bg-gold-gradient rounded-t" style={{ height: `${(t.value / maxValue) * 100}%`, minHeight: 4 }} title={inr(t.value)} />
                    <div className="text-[9px] text-white/60">Y{t.year}</div>
                  </div>
                ))}
              </div>
            </div>

            <a href={waLink(`Hi Surendra, my ROI calculator shows ${inr(P)} → ${inr(future)} over ${N} years. Please suggest the best JDA plots to match this goal.`)} target="_blank" rel="noopener">
              <Button className="btn-gold w-full h-12 rounded-full font-semibold"><MessageCircle className="w-4 h-4 mr-2" /> Discuss This Investment</Button>
            </a>
          </div>
        </motion.div>
      </section>

      <SiteFooter />
      <FloatingActions />
    </main>
  );
}
