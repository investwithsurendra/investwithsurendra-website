"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  Building2,
  BookOpen,
  Image as ImageIcon,
  FileText,
  Star,
  HelpCircle,
  UploadCloud,
  LogOut,
  Menu,
  X,
  Home as HomeIcon,
} from "lucide-react";

const NAV = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/leads", label: "Leads", icon: Users },
  { href: "/admin/projects", label: "Projects", icon: Building2 },
  { href: "/admin/blog", label: "Blog", icon: BookOpen },
  { href: "/admin/gallery", label: "Gallery", icon: ImageIcon },
  { href: "/admin/media", label: "Media & Brochures", icon: UploadCloud },
  { href: "/admin/testimonials", label: "Testimonials", icon: Star },
  { href: "/admin/faqs", label: "FAQs", icon: HelpCircle },
];

export default function AdminShell({ children }) {
  const pathname = usePathname();
  const router = useRouter();
  const [checking, setChecking] = useState(true);
  const [authed, setAuthed] = useState(false);
  const [open, setOpen] = useState(false);

  const isLoginPage = pathname === "/admin/login";

  useEffect(() => {
    if (isLoginPage) { setChecking(false); return; }
    (async () => {
      const r = await fetch("/api/auth/me").then((r) => r.json());
      if (!r.authenticated) {
        router.replace("/admin/login?next=" + encodeURIComponent(pathname));
      } else {
        setAuthed(true);
      }
      setChecking(false);
    })();
  }, [pathname, router, isLoginPage]);

  const logout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.replace("/admin/login");
  };

  if (isLoginPage) return children;
  if (checking) return <div className="min-h-screen flex items-center justify-center bg-primary text-gold">Loading...</div>;
  if (!authed) return null;

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Sidebar */}
      <aside className={`fixed lg:static inset-y-0 left-0 w-64 bg-primary text-white z-40 transform ${open ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0 transition-transform flex flex-col`}>
        <div className="p-5 border-b border-white/10">
          <Link href="/admin" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gold-gradient flex items-center justify-center">
              <Building2 className="w-5 h-5 text-primary" />
            </div>
            <div>
              <div className="font-display font-bold">Invest With <span className="text-gold-gradient">Surendra</span></div>
              <div className="text-[10px] uppercase tracking-widest text-gold/70">Admin Panel</div>
            </div>
          </Link>
        </div>
        <nav className="flex-1 p-3 overflow-y-auto">
          {NAV.map(({ href, label, icon: Icon }) => {
            const active = pathname === href || (href !== "/admin" && pathname.startsWith(href));
            return (
              <Link key={href} href={href} onClick={() => setOpen(false)} className={`flex items-center gap-3 px-3 py-2.5 rounded-lg mb-1 text-sm transition-all ${active ? "bg-gold-gradient text-primary font-semibold" : "text-white/80 hover:bg-white/5 hover:text-gold"}`}>
                <Icon className="w-4 h-4" /> {label}
              </Link>
            );
          })}
        </nav>
        <div className="p-3 border-t border-white/10 space-y-2">
          <a href="/" target="_blank" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-white/80 hover:bg-white/5 hover:text-gold">
            <HomeIcon className="w-4 h-4" /> View Website
          </a>
          <button onClick={logout} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-white/80 hover:bg-red-500/20 hover:text-red-300">
            <LogOut className="w-4 h-4" /> Logout
          </button>
        </div>
      </aside>
      {open && <div onClick={() => setOpen(false)} className="fixed inset-0 bg-black/50 z-30 lg:hidden" />}

      {/* Main */}
      <div className="flex-1 min-w-0">
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-4 lg:px-8 sticky top-0 z-20">
          <button onClick={() => setOpen(true)} className="lg:hidden p-2 text-primary"><Menu className="w-5 h-5" /></button>
          <div className="font-display text-lg font-bold text-primary">Admin Dashboard</div>
          <div className="text-xs text-slate-500 hidden md:block">surendra.kumar.ctl@gmail.com</div>
        </header>
        <main className="p-4 md:p-8">{children}</main>
      </div>
    </div>
  );
}
