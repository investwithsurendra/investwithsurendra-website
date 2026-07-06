"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Users, Building2, BookOpen, Star, Image as ImageIcon, TrendingUp, MessageSquare, Calendar } from "lucide-react";

export default function AdminDashboard() {
  const [stats, setStats] = useState(null);
  useEffect(() => { fetch("/api/admin/stats").then((r) => r.json()).then(setStats); }, []);
  if (!stats) return <div className="text-slate-500">Loading stats...</div>;

  const cards = [
    { label: "Total Leads", value: stats.counts.leadsTotal, icon: Users, color: "bg-blue-500", href: "/admin/leads" },
    { label: "New Leads", value: stats.counts.leadsNew, icon: TrendingUp, color: "bg-emerald-500", href: "/admin/leads?status=New" },
    { label: "Booked", value: stats.counts.leadsBooked, icon: Calendar, color: "bg-amber-500", href: "/admin/leads?status=Booked" },
    { label: "Projects", value: stats.counts.projects, icon: Building2, color: "bg-purple-500", href: "/admin/projects" },
    { label: "Blogs", value: stats.counts.blogs, icon: BookOpen, color: "bg-pink-500", href: "/admin/blog" },
    { label: "Testimonials", value: stats.counts.testimonials, icon: Star, color: "bg-orange-500", href: "/admin/testimonials" },
    { label: "Media", value: stats.counts.media, icon: ImageIcon, color: "bg-cyan-500", href: "/admin/media" },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display text-3xl md:text-4xl font-bold text-primary">Welcome back, Surendra</h1>
        <p className="text-slate-500 mt-1">Overview of your business at a glance.</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {cards.map((c) => (
          <Link key={c.label} href={c.href} className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100 hover:shadow-lg hover:border-gold/30 transition-all">
            <div className={`w-11 h-11 rounded-xl ${c.color} flex items-center justify-center mb-3 text-white`}>
              <c.icon className="w-5 h-5" />
            </div>
            <div className="font-display text-3xl font-bold text-primary">{c.value}</div>
            <div className="text-slate-500 text-xs mt-1 font-medium">{c.label}</div>
          </Link>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-display text-lg font-bold text-primary">Lead Status Breakdown</h2>
            <Link href="/admin/leads" className="text-xs text-gold hover:underline">View all \u2192</Link>
          </div>
          <div className="space-y-3">
            {Object.entries(stats.statusCounts).map(([status, count]) => {
              const total = stats.counts.leadsTotal || 1;
              const pct = (count / total) * 100;
              return (
                <div key={status}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-slate-700 font-medium">{status}</span>
                    <span className="text-slate-500">{count}</span>
                  </div>
                  <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-gold-gradient" style={{ width: `${pct}%` }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-display text-lg font-bold text-primary">Recent Leads</h2>
            <Link href="/admin/leads" className="text-xs text-gold hover:underline">View all \u2192</Link>
          </div>
          {stats.recentLeads.length === 0 ? (
            <div className="text-slate-500 text-sm py-8 text-center">No leads yet. Share your website!</div>
          ) : (
            <div className="divide-y divide-slate-100">
              {stats.recentLeads.map((l) => (
                <div key={l.id} className="py-3 flex items-center justify-between">
                  <div>
                    <div className="font-semibold text-primary">{l.name}</div>
                    <div className="text-xs text-slate-500">{l.mobile} \u2022 {l.project || "General"}</div>
                  </div>
                  <span className="text-[10px] px-2 py-1 rounded-full bg-gold/10 text-gold font-semibold uppercase">{l.status || "New"}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="bg-primary rounded-2xl p-6 text-white flex items-center justify-between flex-wrap gap-4">
        <div>
          <div className="font-display text-xl font-bold">Ready to add a new project?</div>
          <div className="text-white/70 text-sm">Create a new township or manage existing ones.</div>
        </div>
        <Link href="/admin/projects" className="bg-gold-gradient text-primary px-5 py-2.5 rounded-full font-semibold text-sm hover:brightness-110">Manage Projects \u2192</Link>
      </div>
    </div>
  );
}
