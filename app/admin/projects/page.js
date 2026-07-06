"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Plus, Edit2, Trash2, Save, X, Building2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const empty = {
  slug: "", name: "", tagline: "", location: "", price: "", size: "",
  highlight: "", overview: "", card: "", hero: "", masterPlanImg: "", brochureUrl: "",
  approvals: ["JDA Approved", "RERA Registered"],
  amenities: [], locationAdvantages: [], gallery: [], published: true,
};

export default function AdminProjects() {
  const [items, setItems] = useState([]);
  const [editing, setEditing] = useState(null); // "new" | slug
  const [form, setForm] = useState(empty);

  const load = async () => {
    const r = await fetch("/api/projects/all").then((r) => r.json());
    setItems(r.projects || []);
  };
  useEffect(() => { load(); }, []);

  const openNew = () => { setForm({ ...empty, amenities: [""], locationAdvantages: [""], gallery: [""] }); setEditing("new"); };
  const openEdit = (p) => {
    setForm({
      ...empty, ...p,
      amenities: p.amenities?.length ? p.amenities : [""],
      locationAdvantages: p.locationAdvantages?.length ? p.locationAdvantages : [""],
      gallery: p.gallery?.length ? p.gallery : [""],
    });
    setEditing(p.slug);
  };
  const cancel = () => { setEditing(null); setForm(empty); };

  const save = async () => {
    const clean = {
      ...form,
      amenities: form.amenities.filter(Boolean),
      locationAdvantages: form.locationAdvantages.filter(Boolean),
      gallery: form.gallery.filter(Boolean),
    };
    const url = editing === "new" ? "/api/projects" : `/api/projects/${editing}`;
    const method = editing === "new" ? "POST" : "PUT";
    const res = await fetch(url, { method, headers: { "Content-Type": "application/json" }, body: JSON.stringify(clean) });
    const data = await res.json();
    if (res.ok && data.success !== false) { toast.success(editing === "new" ? "Project created" : "Project updated"); cancel(); load(); }
    else toast.error(data.error || "Failed to save");
  };

  const del = async (slug) => {
    if (!confirm("Delete this project?")) return;
    await fetch(`/api/projects/${slug}`, { method: "DELETE" });
    toast.success("Deleted");
    load();
  };

  const setArr = (k, i, v) => { const a = [...form[k]]; a[i] = v; setForm({ ...form, [k]: a }); };
  const addArr = (k) => setForm({ ...form, [k]: [...form[k], ""] });
  const rmArr = (k, i) => setForm({ ...form, [k]: form[k].filter((_, x) => x !== i) });

  if (editing) return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="font-display text-3xl font-bold text-primary">{editing === "new" ? "New Project" : `Edit: ${form.name}`}</h1>
        <div className="flex gap-2">
          <Button variant="outline" onClick={cancel}><X className="w-4 h-4 mr-1" /> Cancel</Button>
          <Button onClick={save} className="btn-gold"><Save className="w-4 h-4 mr-1" /> Save</Button>
        </div>
      </div>
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 space-y-4">
        <div className="grid md:grid-cols-2 gap-4">
          <div><Label>Name *</Label><Input value={form.name} onChange={(e) => setForm({...form, name: e.target.value})} className="h-11 mt-1" /></div>
          <div><Label>Slug (URL) *</Label><Input value={form.slug} onChange={(e) => setForm({...form, slug: e.target.value.toLowerCase().replace(/\s+/g,'-')})} className="h-11 mt-1" placeholder="e.g. royal-heights" /></div>
          <div><Label>Tagline</Label><Input value={form.tagline} onChange={(e) => setForm({...form, tagline: e.target.value})} className="h-11 mt-1" /></div>
          <div><Label>Location</Label><Input value={form.location} onChange={(e) => setForm({...form, location: e.target.value})} className="h-11 mt-1" /></div>
          <div><Label>Price (e.g. ₹20 L onwards)</Label><Input value={form.price} onChange={(e) => setForm({...form, price: e.target.value})} className="h-11 mt-1" /></div>
          <div><Label>Plot Sizes</Label><Input value={form.size} onChange={(e) => setForm({...form, size: e.target.value})} className="h-11 mt-1" /></div>
          <div><Label>Highlight Badge</Label><Input value={form.highlight} onChange={(e) => setForm({...form, highlight: e.target.value})} className="h-11 mt-1" placeholder="e.g. Highest ROI" /></div>
          <div className="flex items-center gap-3 mt-6"><input type="checkbox" checked={form.published} onChange={(e) => setForm({...form, published: e.target.checked})} /><Label>Published on website</Label></div>
        </div>
        <div><Label>Overview / Description</Label><Textarea rows={5} value={form.overview} onChange={(e) => setForm({...form, overview: e.target.value})} className="mt-1" /></div>
        <div className="grid md:grid-cols-3 gap-4">
          <div><Label>Card Image URL</Label><Input value={form.card} onChange={(e) => setForm({...form, card: e.target.value})} className="h-11 mt-1" /></div>
          <div><Label>Hero Image URL</Label><Input value={form.hero} onChange={(e) => setForm({...form, hero: e.target.value})} className="h-11 mt-1" /></div>
          <div><Label>Master Plan Image URL</Label><Input value={form.masterPlanImg} onChange={(e) => setForm({...form, masterPlanImg: e.target.value})} className="h-11 mt-1" /></div>
        </div>
        <div><Label>Brochure PDF URL</Label><Input value={form.brochureUrl} onChange={(e) => setForm({...form, brochureUrl: e.target.value})} className="h-11 mt-1" placeholder="Upload PDF in Media panel first, then paste URL" /></div>

        {[
          { k: "amenities", label: "Amenities" },
          { k: "locationAdvantages", label: "Location Advantages" },
          { k: "gallery", label: "Gallery Image URLs" },
        ].map(({ k, label }) => (
          <div key={k}>
            <div className="flex items-center justify-between mb-2"><Label>{label}</Label>
              <Button variant="outline" size="sm" onClick={() => addArr(k)}><Plus className="w-3 h-3 mr-1" /> Add</Button></div>
            <div className="space-y-2">
              {form[k].map((v, i) => (
                <div key={i} className="flex gap-2">
                  <Input value={v} onChange={(e) => setArr(k, i, e.target.value)} className="h-10" />
                  <Button variant="outline" size="icon" onClick={() => rmArr(k, i)}><X className="w-4 h-4" /></Button>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-3xl font-bold text-primary">Projects</h1>
          <p className="text-slate-500 text-sm">{items.length} project{items.length !== 1 ? "s" : ""}</p>
        </div>
        <Button onClick={openNew} className="btn-gold rounded-full h-11 px-5 font-semibold"><Plus className="w-4 h-4 mr-2" /> New Project</Button>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {items.map((p) => (
          <div key={p.slug} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-100">
            <div className="aspect-video bg-slate-100 overflow-hidden">
              {p.card ? <img src={p.card} alt={p.name} className="w-full h-full object-cover" /> : <div className="h-full flex items-center justify-center text-slate-400"><Building2 className="w-10 h-10" /></div>}
            </div>
            <div className="p-4">
              <div className="font-display text-lg font-bold text-primary">{p.name}</div>
              <div className="text-slate-500 text-xs mb-2">{p.location}</div>
              <div className="flex gap-1 mb-3">
                {p.seeded && <span className="text-[10px] px-2 py-0.5 rounded bg-gold/10 text-gold font-semibold">FEATURED</span>}
                {!p.published && <span className="text-[10px] px-2 py-0.5 rounded bg-slate-100 text-slate-600 font-semibold">HIDDEN</span>}
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={() => openEdit(p)} className="flex-1"><Edit2 className="w-3.5 h-3.5 mr-1" /> Edit</Button>
                {!p.seeded && <Button variant="outline" size="sm" onClick={() => del(p.slug)} className="text-red-600 border-red-200 hover:bg-red-50"><Trash2 className="w-3.5 h-3.5" /></Button>}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
