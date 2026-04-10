"use client";

import React from "react";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";
import { cn } from "@/lib/utils";

export const StatCard = ({ title, value, icon: Icon, trend, color = "indigo" }) => {
  const colorMap = {
    indigo: "bg-indigo-500/10 text-indigo-400 border-indigo-500/20",
    emerald: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    rose: "bg-rose-500/10 text-rose-400 border-rose-500/20",
    amber: "bg-amber-500/10 text-amber-400 border-amber-500/20",
  };

  const trendIsPositive = trend && !trend.startsWith("-");

  return (
    <div className="glass p-5 rounded-2xl border border-white/5 hover:translate-y-[-2px] transition-all group overflow-hidden relative">
      {/* Background Glow */}
      <div className={cn(
        "absolute -top-10 -right-10 w-32 h-32 blur-[50px] opacity-20 transition-opacity group-hover:opacity-30",
        color === "indigo" && "bg-indigo-500",
        color === "emerald" && "bg-emerald-500",
        color === "rose" && "bg-rose-500",
        color === "amber" && "bg-amber-500"
      )} />

      <div className="flex items-start justify-between relative z-10">
        <div className={cn(
          "w-12 h-12 rounded-xl border flex items-center justify-center mb-4 transition-transform group-hover:scale-110 duration-500",
          colorMap[color]
        )}>
          <Icon className="h-6 w-6" />
        </div>
        {trend && (
          <div className={cn(
            "flex items-center gap-1 text-[10px] uppercase font-black tracking-widest",
            trendIsPositive ? "text-emerald-400" : "text-rose-400"
          )}>
            {trendIsPositive ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
            {trend}
          </div>
        )}
      </div>

      <div className="relative z-10 mt-2">
        <div className="text-3xl font-black text-white tracking-tight">{value}</div>
        <div className="text-xs font-bold uppercase tracking-widest text-zinc-500 mt-1">{title}</div>
      </div>
    </div>
  );
};
