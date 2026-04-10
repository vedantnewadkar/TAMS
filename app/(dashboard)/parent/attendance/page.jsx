"use client";

import React from "react";
import { 
  Calendar, 
  ChevronLeft, 
  Download, 
  Target,
  Clock,
  LayoutGrid,
  List,
  AlertCircle,
  TrendingDown,
  TrendingUp,
  Activity
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { AttendanceHeatmap } from "@/components/student/AttendanceHeatmap";
import { studentAttendanceLog, parentProfile } from "@/lib/dummy-data";
import { DataTable } from "@/components/shared/DataTable";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { cn } from "@/lib/utils";

export default function ParentAttendanceView() {
  const [view, setView] = React.useState("heatmap");

  const recentColumns = [
    { key: "date", label: "Date", sortable: true },
    { key: "subject", label: "Academic Module" },
    { key: "status", label: "Ward Status", render: (row) => <StatusBadge status={row.status === "present" ? "paid" : row.status === "late" ? "pending" : "overdue"} /> },
  ];

  return (
    <div className="space-y-10 pb-20">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 px-1">
        <div>
           <div className="flex items-center gap-3 mb-2">
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-indigo-500">Node Oversight</span>
              <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse" />
           </div>
          <h1 className="text-4xl font-black tracking-tighter text-white">Attendance Analytics</h1>
          <p className="text-zinc-500 mt-2 font-medium italic">High-fidelity tracking of {parentProfile.wardName}'s academic presence.</p>
        </div>
        <Button className="rounded-2xl h-14 px-8 bg-white/5 hover:bg-white/10 border border-white/5 text-zinc-400 hover:text-white font-black uppercase tracking-widest text-[10px] group">
          <Download className="mr-3 h-5 w-5 group-hover:translate-y-1 transition-transform" />
          Export Audit Report
        </Button>
      </div>

      {/* Logic Insights */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
         <div className="glass p-8 rounded-[2.5rem] border border-white/5 flex flex-col justify-between h-[200px] group transition-all hover:bg-white/5">
            <div className="flex justify-between items-start">
               <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 flex items-center justify-center">
                  <Target className="h-6 w-6 text-indigo-400" />
               </div>
               <TrendingUp className="h-5 w-5 text-emerald-500" />
            </div>
            <div>
               <div className="text-[10px] font-black uppercase tracking-widest text-zinc-600 mb-1">Weekly Intensity</div>
               <div className="text-3xl font-black text-white tracking-tighter italic">98% <span className="text-xs text-emerald-500 not-italic uppercase font-black ml-2">+2%</span></div>
            </div>
         </div>
         <div className="glass p-8 rounded-[2.5rem] border border-white/5 flex flex-col justify-between h-[200px] group transition-all hover:bg-white/5">
            <div className="flex justify-between items-start">
               <div className="w-12 h-12 rounded-2xl bg-violet-500/10 flex items-center justify-center">
                  <Activity className="h-6 w-6 text-violet-400" />
               </div>
               <div className="text-[9px] font-black uppercase text-zinc-500">Stable Node</div>
            </div>
            <div>
               <div className="text-[10px] font-black uppercase tracking-widest text-zinc-600 mb-1">Consecutive Presence</div>
               <div className="text-3xl font-black text-white tracking-tighter italic">14 Days</div>
            </div>
         </div>
         <div className="glass p-8 rounded-[2.5rem] border border-white/5 flex flex-col justify-between h-[200px] border-l-4 border-l-rose-500 group transition-all hover:bg-white/5">
            <div className="flex justify-between items-start">
               <div className="w-12 h-12 rounded-2xl bg-rose-500/10 flex items-center justify-center">
                  <AlertCircle className="h-6 w-6 text-rose-400" />
               </div>
               <TrendingDown className="h-5 w-5 text-rose-500" />
            </div>
            <div>
               <div className="text-[10px] font-black uppercase tracking-widest text-zinc-600 mb-1">Signal Gaps (Absent)</div>
               <div className="text-3xl font-black text-white tracking-tighter italic">4 PKT <span className="text-xs text-rose-500 not-italic uppercase font-black ml-2">-1%</span></div>
            </div>
         </div>
      </div>

      {/* Heatmap Section */}
      <div className="space-y-6">
         <div className="flex items-center justify-between px-2">
            <div className="flex items-center gap-3">
               <div className="w-10 h-10 rounded-xl bg-indigo-500/10 flex items-center justify-center">
                  <Calendar className="h-5 w-5 text-indigo-400" />
               </div>
               <h2 className="text-xl font-black text-white tracking-tight">Sync History Visualization</h2>
            </div>
            <div className="flex bg-white/5 p-1 rounded-xl border border-white/5">
                <Button 
                   onClick={() => setView("heatmap")}
                   variant={view === "heatmap" ? "default" : "ghost"}
                   className={cn("h-10 w-10 p-0 rounded-lg", view === "heatmap" ? "bg-indigo-600" : "text-zinc-500")}
                >
                   <LayoutGrid className="h-4 w-4" />
                </Button>
                <Button 
                   onClick={() => setView("list")}
                   variant={view === "list" ? "default" : "ghost"}
                   className={cn("h-10 w-10 p-0 rounded-lg", view === "list" ? "bg-indigo-600" : "text-zinc-500")}
                >
                   <List className="h-4 w-4" />
                </Button>
            </div>
         </div>

         {view === "heatmap" ? (
            <div className="animate-reveal">
               <AttendanceHeatmap data={studentAttendanceLog} />
            </div>
         ) : (
            <div className="glass p-8 rounded-[2.5rem] border border-white/5 animate-reveal">
               <DataTable columns={recentColumns} data={studentAttendanceLog.slice(0, 15)} />
            </div>
         )}
      </div>

      {/* Parental Insights */}
      <div className="glass p-10 rounded-[2.5rem] border border-white/5 space-y-8 bg-zinc-950/50">
         <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center">
               <TrendingUp className="h-5 w-5 text-emerald-400" />
            </div>
            <h2 className="text-xl font-black text-white tracking-tight italic">Automated Insights</h2>
         </div>
         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-white/5 border border-white/5 text-sm font-medium text-zinc-400 leading-relaxed italic">
               "Perfect attendance in <span className="text-white font-black">Data Science</span> across the last 15 neural cycles. Node alignment is exceptional."
            </div>
            <div className="p-6 rounded-2xl bg-white/5 border border-white/5 text-sm font-medium text-zinc-400 leading-relaxed italic">
               "Synchronization gap detected in <span className="text-white font-black">Advanced Algorithms</span> on 2026-04-02. Total cumulative gaps: 4."
            </div>
         </div>
      </div>
    </div>
  );
}
