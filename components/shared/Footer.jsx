"use client";

import React from "react";
import Link from "next/link";

export const Footer = () => {
  return (
    <footer className="relative z-10 py-20 border-t border-white/5 bg-zinc-950">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-16">
          {/* Brand Column */}
          <div className="md:col-span-1 space-y-6">
            <Link href="/" className="text-xl font-black tracking-tighter flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center shadow-[0_0_15px_rgba(99,102,241,0.4)]">
                <span className="text-white text-lg font-bold">E</span>
              </div>
              <span className="text-white uppercase tracking-widest text-sm">TAMS</span>
            </Link>
            <p className="text-sm font-medium text-zinc-500 leading-relaxed">
              Orchestrating academic excellence through unified intelligence and real-time connectivity.
            </p>
          </div>

          {/* Nav Columns */}
          <div className="space-y-6">
            <h4 className="text-xs font-black text-white uppercase tracking-[0.2em]">Platform</h4>
            <ul className="flex flex-col gap-4">
              <li><Link href="#features" className="text-sm font-medium text-zinc-500 hover:text-indigo-400 transition-colors">Architecture</Link></li>
              <li><Link href="#how-it-works" className="text-sm font-medium text-zinc-500 hover:text-indigo-400 transition-colors">Workflow</Link></li>
              <li><Link href="#roles" className="text-sm font-medium text-zinc-500 hover:text-indigo-400 transition-colors">Access Matrix</Link></li>
            </ul>
          </div>

          <div className="space-y-6">
            <h4 className="text-xs font-black text-white uppercase tracking-[0.2em]">Security</h4>
            <ul className="flex flex-col gap-4">
              <li><Link href="#" className="text-sm font-medium text-zinc-500 hover:text-indigo-400 transition-colors">Privacy Shield</Link></li>
              <li><Link href="#" className="text-sm font-medium text-zinc-500 hover:text-indigo-400 transition-colors">Compliance</Link></li>
              <li><Link href="#" className="text-sm font-medium text-zinc-500 hover:text-indigo-400 transition-colors">Data Residency</Link></li>
            </ul>
          </div>

          {/* Contact Column */}
          <div className="space-y-6">
            <h4 className="text-xs font-black text-white uppercase tracking-[0.2em]">Connect</h4>
            <div className="space-y-4">
              <p className="text-sm font-bold text-zinc-300">HQ • Innovation District</p>
              <p className="text-sm font-medium text-zinc-500">nexus@TAMS.io</p>
              <div className="flex gap-4 pt-2">
                <div className="w-8 h-8 rounded-lg glass border-white/5 flex items-center justify-center hover:bg-white/10 transition-colors cursor-pointer">
                  <div className="w-3 h-3 bg-white rounded-sm" />
                </div>
                <div className="w-8 h-8 rounded-lg glass border-white/5 flex items-center justify-center hover:bg-white/10 transition-colors cursor-pointer">
                  <div className="w-3 h-3 bg-white rounded-full" />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-20 pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-[10px] font-black uppercase tracking-widest text-zinc-600">
            © {new Date().getFullYear()} TAMS CORE ANALYTICS • ALL PROTOCOLS RESERVED
          </p>
          <div className="flex gap-8">
            <Link href="#" className="text-[10px] font-black uppercase tracking-widest text-zinc-600 hover:text-zinc-400 transition-colors">Terms of Op</Link>
            <Link href="#" className="text-[10px] font-black uppercase tracking-widest text-zinc-600 hover:text-zinc-400 transition-colors">Stability Matrix</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
