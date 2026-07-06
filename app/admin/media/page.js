"use client";

import { useEffect, useState, useRef } from "react";
import { toast } from "sonner";
import { UploadCloud, Trash2, Copy, Image as ImageIcon, FileText, Video, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function AdminMedia() {
  const [items, setItems] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [folder, setFolder] = useState("iws");
  const [cldConfigured, setCldConfigured] = useState(true);
  const fileRef = useRef();

  const load = async () => {
    const r = await fetch("/api/media").then((r) => r.json());
    setItems(r.items || []);
  };
  useEffect(() => { load(); }, []);

  const upload = async (files) => {
    if (!files || files.length === 0) return;
    setUploading(true);
    for (const file of files) {
      const fd = new FormData();
      fd.append("file", file);
      fd.append("folder", folder);
      const type = file.type.startsWith("video/") ? "video" : file.type.startsWith("image/") ? "image" : "raw";
      fd.append("type", type);
      const res = await fetch("/api/media/upload", { method: "POST", body: fd });
      const d = await res.json();
      if (res.status === 503) { setCldConfigured(false); toast.error("Cloudinary not configured — add API keys to .env"); break; }
      else if (res.ok) toast.success(`Uploaded: ${file.name}`);
      else toast.error(d.error || "Upload failed");
    }
    setUploading(false);
    load();
  };

  const del = async (id) => {
    if (!confirm("Delete this file? (Only removes DB record)")) return;
    await fetch(`/api/media/${id}`, { method: "DELETE" });
    toast.success("Removed");
    load();
  };

  const copyUrl = (url) => { navigator.clipboard.writeText(url); toast.success("URL copied!"); };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div><h1 className="font-display text-3xl font-bold text-primary">Media & Brochures</h1><p className="text-slate-500 text-sm">Upload images, videos, PDFs to Cloudinary. Copy URLs to use in projects/blogs.</p></div>
      </div>

      {!cldConfigured && (
        <div className="bg-amber-50 border border-amber-200 text-amber-800 rounded-xl p-4 flex items-start gap-3">
          <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
          <div className="text-sm">
            <strong>Cloudinary not configured.</strong> Add these to your <code className="bg-white px-1 rounded">.env</code> file:
            <pre className="mt-2 text-xs bg-white p-2 rounded border">CLOUDINARY_CLOUD_NAME=your_cloud_name\nCLOUDINARY_API_KEY=your_key\nCLOUDINARY_API_SECRET=your_secret</pre>
            Get them free at <a href="https://cloudinary.com" target="_blank" rel="noopener" className="underline">cloudinary.com</a>. Then restart the server.
          </div>
        </div>
      )}

      <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
        <div className="flex items-center gap-4 mb-4">
          <select value={folder} onChange={(e) => setFolder(e.target.value)} className="h-10 px-4 rounded-md border border-slate-200 text-sm">
            <option value="iws">General</option>
            <option value="iws/projects">Projects</option>
            <option value="iws/brochures">Brochures (PDF)</option>
            <option value="iws/gallery">Gallery</option>
            <option value="iws/blog">Blog</option>
          </select>
          <input ref={fileRef} type="file" multiple onChange={(e) => upload(e.target.files)} className="hidden" accept="image/*,video/*,application/pdf" />
          <Button onClick={() => fileRef.current?.click()} disabled={uploading} className="btn-gold rounded-full h-11 px-5 font-semibold">
            <UploadCloud className="w-4 h-4 mr-2" /> {uploading ? "Uploading..." : "Upload Files"}
          </Button>
        </div>
        <p className="text-xs text-slate-500">Supports images (JPG, PNG, WebP), videos (MP4, MOV) and PDFs (brochures). Files upload to Cloudinary CDN.</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {items.length === 0 && !uploading && (
          <div className="col-span-full bg-white rounded-2xl p-12 text-center text-slate-400 border border-slate-100">
            <UploadCloud className="w-10 h-10 mx-auto mb-3 opacity-40" />
            No files yet. Upload your first image or brochure.
          </div>
        )}
        {items.map((m) => (
          <div key={m.id} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-100 group">
            <div className="aspect-square bg-slate-100 relative">
              {m.resourceType === "image" && <img src={m.url} className="w-full h-full object-cover" alt="" />}
              {m.resourceType === "video" && <div className="h-full flex items-center justify-center bg-slate-800 text-white"><Video className="w-10 h-10" /></div>}
              {m.resourceType === "raw" && <div className="h-full flex items-center justify-center bg-red-50 text-red-600"><FileText className="w-10 h-10" /></div>}
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                <button onClick={() => copyUrl(m.url)} className="bg-white text-primary p-2 rounded-full" title="Copy URL"><Copy className="w-4 h-4" /></button>
                <button onClick={() => del(m.id)} className="bg-red-500 text-white p-2 rounded-full" title="Delete"><Trash2 className="w-4 h-4" /></button>
              </div>
            </div>
            <div className="p-3">
              <div className="text-xs font-semibold text-primary truncate">{m.originalName || m.publicId}</div>
              <div className="text-[10px] text-slate-400 uppercase">{m.resourceType} \u2022 {Math.round(m.bytes / 1024)} KB</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
