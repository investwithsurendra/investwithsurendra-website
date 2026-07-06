"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Plus, Edit2, Trash2, Save, X, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const empty = { title: "", slug: "", excerpt: "", content: "", featuredImage: "", category: "General", tags: "", published: false, seoTitle: "", seoDescription: "" };

export default function AdminBlog() {
  const [items, setItems] = useState([]);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(empty);

  const load = async () => {
    const r = await fetch("/api/blogs/all").then((r) => r.json());
    setItems(r.blogs || []);
  };
  useEffect(() => { load(); }, []);

  const openNew = () => { setForm(empty); setEditing("new"); };
  const openEdit = (b) => { setForm({ ...empty, ...b, tags: (b.tags || []).join(", ") }); setEditing(b.slug); };
  const cancel = () => { setEditing(null); setForm(empty); };

  const save = async () => {
    if (!form.title || !form.slug || !form.content) return toast.error("Title, slug and content required");
    const body = { ...form, tags: form.tags ? form.tags.split(",").map((s) => s.trim()).filter(Boolean) : [] };
    const url = editing === "new" ? "/api/blogs" : `/api/blogs/${editing}`;
    const method = editing === "new" ? "POST" : "PUT";
    const res = await fetch(url, { method, headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
    const d = await res.json();
    if (res.ok) { toast.success("Saved"); cancel(); load(); } else toast.error(d.error || "Error");
  };

  const del = async (slug) => {
    if (!confirm("Delete this blog?")) return;
    await fetch(`/api/blogs/${slug}`, { method: "DELETE" });
    toast.success("Deleted"); load();
  };

  const togglePublish = async (b) => {
    await fetch(`/api/blogs/${b.slug}`, { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ published: !b.published }) });
    load();
  };

  if (editing) return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="font-display text-3xl font-bold text-primary">{editing === "new" ? "New Blog Post" : `Edit: ${form.title}`}</h1>
        <div className="flex gap-2">
          <Button variant="outline" onClick={cancel}><X className="w-4 h-4 mr-1" /> Cancel</Button>
          <Button onClick={save} className="btn-gold"><Save className="w-4 h-4 mr-1" /> Save</Button>
        </div>
      </div>
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 space-y-4">
        <div className="grid md:grid-cols-2 gap-4">
          <div><Label>Title *</Label><Input value={form.title} onChange={(e) => setForm({...form, title: e.target.value})} className="h-11 mt-1" /></div>
          <div><Label>Slug (URL) *</Label><Input value={form.slug} onChange={(e) => setForm({...form, slug: e.target.value.toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'')})} className="h-11 mt-1" /></div>
          <div><Label>Category</Label><Input value={form.category} onChange={(e) => setForm({...form, category: e.target.value})} className="h-11 mt-1" /></div>
          <div><Label>Tags (comma separated)</Label><Input value={form.tags} onChange={(e) => setForm({...form, tags: e.target.value})} className="h-11 mt-1" placeholder="jda, real estate, jaipur" /></div>
        </div>
        <div><Label>Featured Image URL</Label><Input value={form.featuredImage} onChange={(e) => setForm({...form, featuredImage: e.target.value})} className="h-11 mt-1" /></div>
        <div><Label>Excerpt</Label><Textarea rows={2} value={form.excerpt} onChange={(e) => setForm({...form, excerpt: e.target.value})} className="mt-1" /></div>
        <div><Label>Content (Markdown supported)</Label><Textarea rows={16} value={form.content} onChange={(e) => setForm({...form, content: e.target.value})} className="mt-1 font-mono text-sm" placeholder="# Heading\n\nWrite your blog post in **markdown**..." /></div>
        <div className="grid md:grid-cols-2 gap-4 pt-4 border-t border-slate-100">
          <div><Label>SEO Title</Label><Input value={form.seoTitle} onChange={(e) => setForm({...form, seoTitle: e.target.value})} className="h-11 mt-1" /></div>
          <div><Label>SEO Description</Label><Input value={form.seoDescription} onChange={(e) => setForm({...form, seoDescription: e.target.value})} className="h-11 mt-1" /></div>
        </div>
        <div className="flex items-center gap-3"><input type="checkbox" checked={form.published} onChange={(e) => setForm({...form, published: e.target.checked})} /><Label>Publish immediately</Label></div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div><h1 className="font-display text-3xl font-bold text-primary">Blog Posts</h1><p className="text-slate-500 text-sm">{items.length} posts</p></div>
        <Button onClick={openNew} className="btn-gold rounded-full h-11 px-5 font-semibold"><Plus className="w-4 h-4 mr-2" /> New Post</Button>
      </div>
      {items.length === 0 && (
        <div className="bg-white rounded-2xl p-12 text-center text-slate-400 border border-slate-100">
          No blog posts yet. Click "New Post" to create your first article.
        </div>
      )}
      <div className="grid md:grid-cols-2 gap-4">
        {items.map((b) => (
          <div key={b.slug} className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden flex">
            <div className="w-32 bg-slate-100 flex-shrink-0">{b.featuredImage ? <img src={b.featuredImage} className="w-full h-full object-cover" alt={b.title} /> : null}</div>
            <div className="p-4 flex-1">
              <div className="flex items-start justify-between gap-2 mb-1">
                <div className="font-display font-bold text-primary line-clamp-1">{b.title}</div>
                {b.published ? <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-100 text-emerald-700 font-semibold">LIVE</span> : <span className="text-[10px] px-2 py-0.5 rounded bg-amber-100 text-amber-700 font-semibold">DRAFT</span>}
              </div>
              <div className="text-slate-500 text-xs mb-2">{b.category} \u2022 {new Date(b.createdAt).toLocaleDateString("en-IN")}</div>
              <p className="text-slate-600 text-xs line-clamp-2 mb-3">{b.excerpt}</p>
              <div className="flex gap-1">
                <Button variant="outline" size="sm" onClick={() => openEdit(b)}><Edit2 className="w-3 h-3 mr-1" /> Edit</Button>
                <Button variant="outline" size="sm" onClick={() => togglePublish(b)}>{b.published ? <EyeOff className="w-3 h-3" /> : <Eye className="w-3 h-3" />}</Button>
                <Button variant="outline" size="sm" onClick={() => del(b.slug)} className="text-red-600 border-red-200"><Trash2 className="w-3 h-3" /></Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
