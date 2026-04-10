"use client";

import React from "react";
import { Sidebar } from "@/components/shared/Sidebar";
import { TopBar } from "@/components/shared/TopBar";
import { useAuth } from "@/hooks/useAuth";
import { FirstLoginDialog } from "@/components/shared/FirstLoginDialog";
import { useRouter } from "next/navigation";
import { seedIfNeeded } from "@/lib/local-db";

export default function DashboardLayout({ children }) {
  const { user, role, isLoading, isAuthenticated, updateProfile } = useAuth();
  const router = useRouter();

  // Ensure local DB is seeded
  React.useEffect(() => { seedIfNeeded(); }, []);

  React.useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/login");
    }
  }, [isLoading, isAuthenticated, router]);

  if (isLoading) {
    return (
      <div className="h-screen w-screen bg-black flex flex-col items-center justify-center gap-5">
        <div className="relative w-14 h-14">
          <div className="absolute inset-0 rounded-2xl bg-indigo-600/20 animate-ping" />
          <div className="absolute inset-0 rounded-2xl bg-indigo-600/40 flex items-center justify-center">
            <div className="w-6 h-6 border-2 border-white/20 border-t-white rounded-full animate-spin" />
          </div>
        </div>
        <span className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-600">Loading TAMS</span>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="h-screen w-screen bg-black flex items-center justify-center">
        <span className="text-xs text-zinc-600">Redirecting to login...</span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white selection:bg-indigo-500/30">
      <Sidebar role={role} />

      <div className="md:pl-64 flex flex-col min-h-screen">
        <TopBar />

        <main className="flex-grow p-4 md:p-8 mt-14 max-w-[1600px] mx-auto w-full">
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 ease-out">
            {children}
          </div>
        </main>

        <footer className="py-6 px-8 border-t border-white/5 text-center">
          <p className="text-[10px] font-bold text-zinc-800 uppercase tracking-widest">
            © 2026 TAMS · RAIT — Ramrao Adik Institute of Technology · v1.0.4 · Hackathon Demo Mode
          </p>
        </footer>
      </div>

      {user && !user.form_filled && (
        <FirstLoginDialog
          isOpen={true}
          role={role}
          onComplete={(profileData) => updateProfile({ ...profileData, form_filled: true })}
        />
      )}
    </div>
  );
}
