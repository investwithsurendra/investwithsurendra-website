"use client";

import { useEffect, useState, useRef } from "react";
import { toast } from "sonner";
import { Plus, Trash2, UploadCloud } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function AdminGallery() {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState({ src: "", category: "Township", caption: "", tall: false });
  const fileRef = useRef();

  const load = async () => {
    const r = await fetch("/api/gallery").then((r) => r.json());
    setItems(r.items || []);
  };
  useEffect(() => { load(); }, []);

  const add = async () => {
    if (!form.src) return toast.error("Image URL required");
    const res = await fetch("/api/gallery", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
    if (res.ok) { toast.success("Added"); setForm({ src: "", category: "Township", caption: "", tall: false }); load(); }
  };

  const del = async (id) => {
    if (!confirm("Delete this image?")) return;
    await fetch(`/api/gallery/${id}`, { method: "DELETE" });
    toast.success("Deleted"); load();
  };

  const upload = async (files) => {
    if (!files || !files[0]) return;
    const fd = new FormData();
    fd.append("file", files[0]);
    fd.append("folder", "iws/gallery");
    fd.append("type", "image");
    const res = await fetch("/api/media/upload", { method: "POST", body: fd });
    const d = await res.json();
    if (res.ok) { setForm({ ...form, src: d.media.url }); toast.success("Uploaded! Now click Add."); }
    else toast.error(d.error || "Upload failed");
  };

  return (
    <div className="space-y-6">
      <h1 className="font-display text-3xl font-bold text-primary">Gallery</h1>

      <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
        <div className="grid md:grid-cols-5 gap-3">
          <div className="md:col-span-2"><Label>Image URL</Label>
            <div className="flex gap-2 mt-1">
              <Input value={form.src} onChange={(e) => setForm({...form, src: e.target.value})} placeholder="https://..." className="h-11" />
              <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={(e) => upload(e.target.files)} />
              <Button variant="outline" onClick={() => fileRef.current?.click()} className="h-11"><UploadCloud className="w-4 h-4" /></Button>
            </div>
          </div>
          <div><Label>Category</Label>
            <select value={form.category} onChange={(e) => setForm({...form, category: e.target.value})} className="w-full mt-1 h-11 px-3 rounded-md border border-slate-200">
              <option>Township</option><option>Villas</option><option>Amenities</option><option>Events</option>
            </select>
          </div>
          <div><Label>Caption</Label><Input value={form.caption} onChange={(e) => setForm({...form, caption: e.target.value})} className="h-11 mt-1" /></div>
          <div className="flex items-end gap-2">
            <label className="flex items-center gap-2 h-11"><input type="checkbox" checked={form.tall} onChange={(e) => setForm({...form, tall: e.target.checked})} /> Tall</label>
            <Button onClick={add} className="btn-gold h-11 rounded-full px-5"><Plus className="w-4 h-4 mr-1" /> Add</Button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {items.length === 0 && <div className="col-span-full bg-white rounded-2xl p-12 text-center text-slate-400 border border-slate-100">No custom gallery items yet.</div>}
        {items.map((g) => (
          <div key={g.id} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-100 group">
            <div className="aspect-square relative">
              <img src={g.src} className="w-full h-full object-cover" alt={g.caption} />
              <button onClick={() => del(g.id)} className="absolute top-2 right-2 bg-red-500 text-white p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"><Trash2 className="w-3.5 h-3.5" /></button>
            </div>
            <div className="p-2 text-xs">
              <div className="font-semibold text-primary truncate">{g.caption || g.category}</div>
              <div className="text-slate-400">{g.category}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
