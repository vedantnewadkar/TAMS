"use client";

import React from "react";
import { Shield, Mail, Lock, Eye, EyeOff, ArrowRight, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useAuth } from "@/hooks/useAuth";

const DEMO_ACCOUNTS = [
  { role: "Admin", email: "admin@tams.edu", name: "Kiran Desai", color: "rose" },
  { role: "Teacher", email: "teacher@tams.edu", name: "Prof. Rajesh Kumar", color: "emerald" },
  { role: "Mentor", email: "mentor@tams.edu", name: "Dr. Priya Sharma", color: "violet" },
  { role: "Student", email: "student@tams.edu", name: "Arjun Patel", color: "indigo" },
  { role: "Parent", email: "parent@tams.edu", name: "Sunita Patel", color: "amber" },
];

export default function LoginPage() {
  const { login } = useAuth();
  const [showPw, setShowPw] = React.useState(false);
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email.trim()) { setError("Please enter an email address."); return; }
    setIsLoading(true);
    setError("");
    try {
      await login(email, password);
    } catch (err) {
      setError(err?.message || "Login failed. Please try again.");
      setIsLoading(false);
    }
  };

  const quickLogin = (acc) => {
    setEmail(acc.email);
    setPassword("password123");
    setError("");
  };

  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2 bg-black selection:bg-indigo-500/30">
      {/* ── Left Branding ─────────────────────────────────────────────── */}
      <div className="hidden lg:flex flex-col justify-between p-16 relative overflow-hidden bg-zinc-950 border-r border-white/5">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_-20%,rgba(79,70,229,0.12),transparent_60%)]" />

        <div className="relative z-10 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center shadow-[0_0_24px_rgba(79,70,229,0.5)]">
            <Shield className="h-5 w-5 text-white" />
          </div>
          <span className="text-xl font-black text-white tracking-tighter uppercase italic">TAMS</span>
        </div>

        <div className="relative z-10 space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider">RAIT — Ramrao Adik Institute of Technology</span>
          </div>
          <h1 className="text-7xl font-black text-white tracking-tighter leading-[0.9]">
            Centralized<br />
            <span className="text-indigo-500">University</span><br />
            Management.
          </h1>
          <p className="text-base text-zinc-500 max-w-md leading-relaxed">
            One platform for students, parents, teachers, mentors, and administrators — tracking attendance, grades, fees, and communication in real time.
          </p>
        </div>

        <div className="relative z-10 flex items-center gap-6">
          <div className="flex -space-x-3">
            {["AP", "PS", "RK", "SD", "KD"].map((i, k) => (
              <div key={k} className="w-11 h-11 rounded-full border-[3px] border-zinc-950 bg-zinc-800 flex items-center justify-center text-[10px] font-black text-zinc-500">{i}</div>
            ))}
          </div>
          <p className="text-xs font-black text-zinc-700 uppercase tracking-widest leading-relaxed">Trusted by<br />24+ Colleges</p>
        </div>
      </div>

      {/* ── Right Form ────────────────────────────────────────────────── */}
      <div className="flex items-center justify-center p-8 relative">
        <div className="absolute top-6 right-8 flex items-center gap-2 text-[10px] font-bold text-zinc-700 uppercase tracking-widest">
          <Globe className="h-3 w-3" /> System Online
        </div>

        <div className="w-full max-w-md space-y-8">
          {/* Header */}
          <div>
            <h2 className="text-4xl font-black text-white tracking-tighter">Welcome Back</h2>
            <p className="text-sm text-zinc-600 mt-2 uppercase tracking-widest font-bold">Sign in to your account</p>
          </div>

          {/* Form */}
          <form onSubmit={handleLogin} className="space-y-5">
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-zinc-600">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-700" />
                <Input
                  type="email"
                  placeholder="any email works here"
                  value={email}
                  onChange={e => { setEmail(e.target.value); setError(""); }}
                  className="pl-11 h-14 bg-white/5 border-white/8 rounded-2xl text-white font-medium placeholder:text-zinc-800 focus:border-indigo-500/50 focus:ring-0"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between">
                <label className="text-[10px] font-black uppercase tracking-widest text-zinc-600">Password</label>
                <span className="text-[10px] text-zinc-700">Any password works</span>
              </div>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-700" />
                <Input
                  type={showPw ? "text" : "password"}
                  placeholder="password123"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  className="pl-11 pr-12 h-14 bg-white/5 border-white/8 rounded-2xl text-white font-medium placeholder:text-zinc-800 focus:border-indigo-500/50 focus:ring-0"
                />
                <button type="button" onClick={() => setShowPw(!showPw)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-700 hover:text-white transition-colors">
                  {showPw ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            {error && (
              <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/20 text-xs text-rose-400 font-medium">{error}</div>
            )}

            <Button disabled={isLoading}
              className="w-full h-14 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-black uppercase tracking-widest text-[11px] flex items-center justify-center gap-3 shadow-[0_8px_24px_rgba(79,70,229,0.3)] transition-all">
              {isLoading
                ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                : <> Sign In <ArrowRight className="h-4 w-4" /> </>
              }
            </Button>
          </form>

          {/* Demo Quick-Login */}
          <div className="pt-6 border-t border-white/5 space-y-4">
            <p className="text-[10px] font-black uppercase tracking-widest text-zinc-700 text-center">
              ⚡ Quick Demo — click any role to auto-fill
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {DEMO_ACCOUNTS.map(acc => (
                <button
                  key={acc.role}
                  type="button"
                  onClick={() => quickLogin(acc)}
                  className="p-3.5 rounded-2xl border border-white/8 bg-white/3 text-left hover:border-indigo-500/40 hover:bg-indigo-500/5 transition-all group"
                >
                  <span className="block text-[9px] font-black uppercase tracking-widest text-zinc-600 group-hover:text-indigo-400 transition-colors">{acc.role}</span>
                  <span className="block text-[11px] font-bold text-zinc-400 mt-0.5">{acc.name}</span>
                </button>
              ))}
            </div>
            <p className="text-center text-[10px] text-zinc-700 font-bold uppercase tracking-widest">
              New here?{" "}
              <Link href="/register" className="text-indigo-400 hover:text-indigo-300 font-black transition-colors">Register →</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
