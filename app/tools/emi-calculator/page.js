"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Calculator, IndianRupee, TrendingUp, Percent, Calendar, ChevronRight, MessageCircle } from "lucide-react";
import { SiteHeader, SiteFooter, FloatingActions } from "@/components/site/Chrome";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { waLink } from "@/lib/shared";

function inr(n) {
  if (!isFinite(n) || isNaN(n)) return "\u20b90";
  return "\u20b9" + Math.round(n).toLocaleString("en-IN");
}

export default function EMICalculator() {
  const [P, setP] = useState(2500000);
  const [R, setR] = useState(8.5);
  const [N, setN] = useState(20);

  const { emi, totalPay, totalInterest } = useMemo(() => {
    const r = R / 12 / 100;
    const n = N * 12;
    const emi = (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    const totalPay = emi * n;
    return { emi, totalPay, totalInterest: totalPay - P };
  }, [P, R, N]);

  const principalPct = (P / (P + totalInterest)) * 100;

  return (
    <main className="bg-white min-h-screen">
      <SiteHeader />

      <section className="pt-32 pb-14 bg-primary text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_50%,rgba(200,155,60,0.2),transparent_60%)]" />
        <div className="container relative text-center">
          <div className="inline-flex items-center gap-2 bg-gold/15 rounded-full px-4 py-1.5 mb-4 border border-gold/30">
            <Calculator className="w-3.5 h-3.5 text-gold" />
            <span className="text-gold text-xs font-medium tracking-widest uppercase">Calculator</span>
          </div>
          <h1 className="font-display text-4xl md:text-6xl font-bold mb-3">EMI <span className="text-gold-gradient">Calculator</span></h1>
          <p className="text-white/70 text-lg">Plan your home loan EMI with precision.</p>
          <div className="flex justify-center gap-4 mt-6 text-sm">
            <Link href="/tools/emi-calculator" className="text-gold border-b-2 border-gold">EMI Calculator</Link>
            <Link href="/tools/roi-calculator" className="text-white/60 hover:text-gold">ROI Calculator</Link>
          </div>
        </div>
      </section>

      <section className="container py-16 grid lg:grid-cols-5 gap-8">
        <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="lg:col-span-2 bg-white rounded-2xl p-8 shadow-xl border border-gold/10 space-y-6">
          <h2 className="font-display text-2xl font-bold text-primary">Loan Details</h2>

          <div>
            <Label className="flex justify-between text-sm"><span><IndianRupee className="w-3 h-3 inline" /> Loan Amount</span><span className="text-gold font-bold">{inr(P)}</span></Label>
            <input type="range" min={500000} max={20000000} step={100000} value={P} onChange={(e) => setP(+e.target.value)} className="w-full mt-2 accent-yellow-600" />
            <Input type="number" value={P} onChange={(e) => setP(+e.target.value || 0)} className="mt-2 h-11" />
          </div>

          <div>
            <Label className="flex justify-between text-sm"><span><Percent className="w-3 h-3 inline" /> Interest Rate (%)</span><span className="text-gold font-bold">{R}%</span></Label>
            <input type="range" min={6} max={15} step={0.1} value={R} onChange={(e) => setR(+e.target.value)} className="w-full mt-2 accent-yellow-600" />
            <Input type="number" step={0.1} value={R} onChange={(e) => setR(+e.target.value || 0)} className="mt-2 h-11" />
          </div>

          <div>
            <Label className="flex justify-between text-sm"><span><Calendar className="w-3 h-3 inline" /> Tenure (Years)</span><span className="text-gold font-bold">{N} yrs</span></Label>
            <input type="range" min={1} max={30} step={1} value={N} onChange={(e) => setN(+e.target.value)} className="w-full mt-2 accent-yellow-600" />
            <Input type="number" value={N} onChange={(e) => setN(+e.target.value || 0)} className="mt-2 h-11" />
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="lg:col-span-3 bg-primary text-white rounded-2xl p-8 shadow-2xl relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(200,155,60,0.25),transparent_60%)]" />
          <div className="relative">
            <div className="text-center mb-8">
              <div className="text-gold text-xs uppercase tracking-widest mb-2">Your Monthly EMI</div>
              <div className="font-display text-5xl md:text-6xl font-bold text-gold-gradient">{inr(emi)}</div>
            </div>
            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="bg-white/5 rounded-xl p-4 border border-gold/20">
                <div className="text-white/60 text-xs uppercase mb-1">Principal</div>
                <div className="font-display text-2xl font-bold text-white">{inr(P)}</div>
              </div>
              <div className="bg-white/5 rounded-xl p-4 border border-gold/20">
                <div className="text-white/60 text-xs uppercase mb-1">Total Interest</div>
                <div className="font-display text-2xl font-bold text-gold">{inr(totalInterest)}</div>
              </div>
            </div>
            <div className="bg-white/5 rounded-xl p-4 border border-gold/20 mb-6">
              <div className="text-white/60 text-xs uppercase mb-1">Total Amount Payable</div>
              <div className="font-display text-3xl font-bold text-white">{inr(totalPay)}</div>
              <div className="mt-3 h-3 bg-white/10 rounded-full overflow-hidden flex">
                <div className="bg-white h-full" style={{ width: `${principalPct}%` }} />
                <div className="bg-gold-gradient h-full" style={{ width: `${100 - principalPct}%` }} />
              </div>
              <div className="flex justify-between text-[10px] mt-1 text-white/60">
                <span>Principal ({principalPct.toFixed(0)}%)</span>
                <span>Interest ({(100 - principalPct).toFixed(0)}%)</span>
              </div>
            </div>
            <a href={waLink(`Hi Surendra, I calculated my EMI as ${inr(emi)}/month for a ${inr(P)} loan. Please help me with best bank loan options.`)} target="_blank" rel="noopener">
              <Button className="btn-gold w-full h-12 rounded-full font-semibold"><MessageCircle className="w-4 h-4 mr-2" /> Get Best Loan Deal from Surendra</Button>
            </a>
          </div>
        </motion.div>
      </section>

      <section className="container pb-16">
        <div className="bg-secondary rounded-2xl p-8 text-center">
          <div className="text-gold text-xs uppercase tracking-widest mb-2">Bank Partners</div>
          <div className="font-display text-2xl font-bold text-primary mb-2">80–90% Home Loan Assistance</div>
          <p className="text-primary/70 mb-4">SBI • HDFC • ICICI • Axis Bank • Bank of Baroda • PNB • Kotak</p>
          <Link href="/contact"><Button variant="outline" className="rounded-full border-gold text-gold hover:bg-gold hover:text-primary">Talk to Loan Expert <ChevronRight className="w-4 h-4 ml-1" /></Button></Link>
        </div>
      </section>

      <SiteFooter />
      <FloatingActions />
    </main>
  );
}
