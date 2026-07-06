"use client";

import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { Building2, Lock, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

function LoginForm() {
  const router = useRouter();
  const sp = useSearchParams();
  const next = sp.get("next") || "/admin";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        toast.success("Welcome, Surendra!");
        router.replace(next);
      } else {
        toast.error(data.error || "Login failed");
      }
    } catch { toast.error("Network error"); }
    finally { setLoading(false); }
  };

  return (
    <div className="min-h-screen bg-primary flex items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(200,155,60,0.2),transparent_60%)]" />
      <form onSubmit={submit} className="relative bg-white rounded-2xl shadow-2xl p-8 md:p-10 w-full max-w-md border border-gold/20">
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-full bg-gold-gradient mx-auto flex items-center justify-center mb-4">
            <Building2 className="w-8 h-8 text-primary" />
          </div>
          <div className="font-display text-2xl font-bold text-primary">Invest With <span className="text-gold-gradient">Surendra</span></div>
          <div className="text-xs uppercase tracking-widest text-gold mt-1">Admin Login</div>
        </div>
        <div className="space-y-4">
          <div>
            <Label>Email</Label>
            <div className="relative mt-1.5">
              <Mail className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="pl-10 h-12" placeholder="surendra.kumar.ctl@gmail.com" required />
            </div>
          </div>
          <div>
            <Label>Password</Label>
            <div className="relative mt-1.5">
              <Lock className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="pl-10 h-12" placeholder="\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022" required />
            </div>
          </div>
          <Button type="submit" disabled={loading} className="btn-gold w-full h-12 rounded-full font-semibold">
            {loading ? "Signing in..." : "Sign In \u2192"}
          </Button>
        </div>
      </form>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-primary" />}>
      <LoginForm />
    </Suspense>
  );
}
