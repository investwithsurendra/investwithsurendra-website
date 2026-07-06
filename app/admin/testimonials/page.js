"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Plus, Trash2, Save, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function AdminTestimonials() {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState({ name: "", role: "", text: "", rating: 5, published: true });

  const load = async () => {
    const r = await fetch("/api/testimonials").then((r) => r.json());
    setItems(r.testimonials || []);
  };
  useEffect(() => { load(); }, []);

  const add = async () => {
    if (!form.name || !form.text) return toast.error("Name and text required");
    const res = await fetch("/api/testimonials", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
    if (res.ok) { toast.success("Added"); setForm({ name: "", role: "", text: "", rating: 5, published: true }); load(); }
  };
  const del = async (id) => { if (!confirm("Delete?")) return; await fetch(`/api/testimonials/${id}`, { method: "DELETE" }); load(); toast.success("Deleted"); };

  return (
    <div className="space-y-6">
      <h1 className="font-display text-3xl font-bold text-primary">Testimonials</h1>

      <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 space-y-3">
        <div className="grid md:grid-cols-3 gap-3">
          <div><Label>Name</Label><Input value={form.name} onChange={(e) => setForm({...form, name: e.target.value})} className="h-11 mt-1" /></div>
          <div><Label>Role / Location</Label><Input value={form.role} onChange={(e) => setForm({...form, role: e.target.value})} className="h-11 mt-1" placeholder="e.g. NRI, Dubai" /></div>
          <div><Label>Rating (1-5)</Label><Input type="number" min={1} max={5} value={form.rating} onChange={(e) => setForm({...form, rating: +e.target.value})} className="h-11 mt-1" /></div>
        </div>
        <div><Label>Testimonial</Label><Textarea rows={3} value={form.text} onChange={(e) => setForm({...form, text: e.target.value})} className="mt-1" /></div>
        <Button onClick={add} className="btn-gold rounded-full"><Plus className="w-4 h-4 mr-1" /> Add Testimonial</Button>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {items.map((t) => (
          <div key={t.id} className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100 relative">
            <button onClick={() => del(t.id)} className="absolute top-3 right-3 text-red-500 hover:bg-red-50 p-2 rounded-full"><Trash2 className="w-4 h-4" /></button>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-full bg-gold-gradient text-primary font-bold flex items-center justify-center">{t.avatar}</div>
              <div><div className="font-semibold text-primary">{t.name}</div><div className="text-xs text-slate-500">{t.role}</div></div>
            </div>
            <p className="text-sm text-slate-700 italic">"{t.text}"</p>
            <div className="text-xs text-gold mt-2">{"\u2605".repeat(t.rating)}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
