"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { Phone, MessageCircle, Download, Trash2, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const STATUSES = ["New", "Contacted", "Follow Up", "Site Visit Scheduled", "Negotiation", "Booked", "Closed"];

const STATUS_COLORS = {
  "New": "bg-blue-100 text-blue-700",
  "Contacted": "bg-cyan-100 text-cyan-700",
  "Follow Up": "bg-amber-100 text-amber-700",
  "Site Visit Scheduled": "bg-purple-100 text-purple-700",
  "Negotiation": "bg-orange-100 text-orange-700",
  "Booked": "bg-emerald-100 text-emerald-700",
  "Closed": "bg-slate-100 text-slate-700",
};

function LeadsContent() {
  const sp = useSearchParams();
  const initStatus = sp.get("status") || "";
  const [leads, setLeads] = useState([]);
  const [statusFilter, setStatusFilter] = useState(initStatus);
  const [search, setSearch] = useState("");

  const load = async () => {
    const url = statusFilter ? `/api/leads?status=${encodeURIComponent(statusFilter)}` : "/api/leads";
    const r = await fetch(url).then((r) => r.json());
    setLeads(r.leads || []);
  };
  useEffect(() => { load(); }, [statusFilter]);

  const updateStatus = async (id, status) => {
    await fetch(`/api/leads/${id}`, { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ status }) });
    toast.success("Status updated");
    load();
  };

  const delLead = async (id) => {
    if (!confirm("Delete this lead?")) return;
    await fetch(`/api/leads/${id}`, { method: "DELETE" });
    toast.success("Lead deleted");
    load();
  };

  const exportCsv = () => window.open("/api/leads/export", "_blank");

  const filtered = leads.filter((l) => {
    if (!search) return true;
    const s = search.toLowerCase();
    return [l.name, l.mobile, l.email, l.project].some((v) => (v || "").toLowerCase().includes(s));
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl font-bold text-primary">Leads Management</h1>
          <p className="text-slate-500 text-sm">{filtered.length} lead{filtered.length !== 1 ? "s" : ""}</p>
        </div>
        <Button onClick={exportCsv} className="btn-gold rounded-full h-11 px-5 font-semibold"><Download className="w-4 h-4 mr-2" /> Export CSV</Button>
      </div>

      <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100 flex flex-wrap gap-3">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <Input placeholder="Search name, mobile, project..." className="pl-10 h-10" value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>
        <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="h-10 px-4 rounded-md border border-slate-200 bg-white text-sm">
          <option value="">All statuses</option>
          {STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
        </select>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-slate-50 text-slate-600 uppercase text-[11px]">
              <tr>
                <th className="text-left px-4 py-3">Contact</th>
                <th className="text-left px-4 py-3">Project</th>
                <th className="text-left px-4 py-3">Budget</th>
                <th className="text-left px-4 py-3">Status</th>
                <th className="text-left px-4 py-3">Date</th>
                <th className="text-left px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.length === 0 && (
                <tr><td colSpan={6} className="text-center py-12 text-slate-400">No leads found</td></tr>
              )}
              {filtered.map((l) => (
                <tr key={l.id} className="hover:bg-slate-50">
                  <td className="px-4 py-3">
                    <div className="font-semibold text-primary">{l.name}</div>
                    <div className="text-slate-500 text-xs">{l.mobile}</div>
                    {l.email && <div className="text-slate-400 text-xs">{l.email}</div>}
                  </td>
                  <td className="px-4 py-3 text-slate-700">{l.project || "-"}</td>
                  <td className="px-4 py-3 text-slate-700">{l.budget || "-"}</td>
                  <td className="px-4 py-3">
                    <select value={l.status || "New"} onChange={(e) => updateStatus(l.id, e.target.value)} className={`px-2 py-1 rounded-md text-xs font-semibold border-0 ${STATUS_COLORS[l.status] || STATUS_COLORS.New}`}>
                      {STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </td>
                  <td className="px-4 py-3 text-slate-500 text-xs">{new Date(l.createdAt).toLocaleDateString("en-IN")}</td>
                  <td className="px-4 py-3">
                    <div className="flex gap-1">
                      <a href={`tel:${l.mobile}`} className="p-2 rounded-md hover:bg-blue-50 text-blue-600" title="Call"><Phone className="w-4 h-4" /></a>
                      <a href={`https://wa.me/91${(l.mobile||'').replace(/\D/g,'')}`} target="_blank" rel="noopener" className="p-2 rounded-md hover:bg-green-50 text-green-600" title="WhatsApp"><MessageCircle className="w-4 h-4" /></a>
                      <button onClick={() => delLead(l.id)} className="p-2 rounded-md hover:bg-red-50 text-red-600" title="Delete"><Trash2 className="w-4 h-4" /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default function LeadsPage() {
  return <Suspense fallback={<div>Loading...</div>}><LeadsContent /></Suspense>;
}
