"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function AdminFAQs() {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState({ q: "", a: "" });

  const load = async () => {
    const r = await fetch("/api/faqs").then((r) => r.json());
    setItems(r.faqs || []);
  };
  useEffect(() => { load(); }, []);

  const add = async () => {
    if (!form.q || !form.a) return toast.error("Both fields required");
    const res = await fetch("/api/faqs", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
    if (res.ok) { toast.success("Added"); setForm({ q: "", a: "" }); load(); }
  };
  const del = async (id) => { if (!confirm("Delete?")) return; await fetch(`/api/faqs/${id}`, { method: "DELETE" }); load(); toast.success("Deleted"); };

  return (
    <div className="space-y-6">
      <h1 className="font-display text-3xl font-bold text-primary">FAQs</h1>
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 space-y-3">
        <div><Label>Question</Label><Input value={form.q} onChange={(e) => setForm({...form, q: e.target.value})} className="h-11 mt-1" /></div>
        <div><Label>Answer</Label><Textarea rows={3} value={form.a} onChange={(e) => setForm({...form, a: e.target.value})} className="mt-1" /></div>
        <Button onClick={add} className="btn-gold rounded-full"><Plus className="w-4 h-4 mr-1" /> Add FAQ</Button>
      </div>
      <div className="space-y-3">
        {items.map((f) => (
          <div key={f.id} className="bg-white rounded-xl p-5 shadow-sm border border-slate-100 relative">
            <button onClick={() => del(f.id)} className="absolute top-4 right-4 text-red-500 hover:bg-red-50 p-2 rounded-full"><Trash2 className="w-4 h-4" /></button>
            <div className="font-display font-semibold text-primary mb-2 pr-10">{f.q}</div>
            <div className="text-sm text-slate-600">{f.a}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
