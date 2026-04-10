"use client";

import React from "react";
import { 
  Calendar, 
  ChevronLeft, 
  Download, 
  Search, 
  FilterX,
  Target,
  Clock,
  LayoutGrid,
  List
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { AttendanceHeatmap } from "@/components/student/AttendanceHeatmap";
import { studentAttendanceLog } from "@/lib/dummy-data";
import { DataTable } from "@/components/shared/DataTable";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { cn } from "@/lib/utils";

export default function StudentAttendanceDetail() {
  const [view, setView] = React.useState("grid");

  const recentColumns = [
    { key: "date", label: "Date", sortable: true },
    { key: "subject", label: "Module Signal" },
    { key: "status", label: "Sync State", render: (row) => <StatusBadge status={row.status === "present" ? "paid" : row.status === "late" ? "pending" : "overdue"} /> },
  ];

  return (
    <div className="space-y-10 pb-20">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl font-black tracking-tighter text-white">Attendance Analytics</h1>
          <p className="text-zinc-500 mt-2 font-medium">Longitudinal tracking of node synchronization consistency.</p>
        </div>
        <Button className="rounded-2xl h-14 px-8 bg-white/5 hover:bg-white/10 border border-white/5 text-zinc-400 hover:text-white font-black uppercase tracking-widest text-xs group">
          <Download className="mr-3 h-5 w-5 group-hover:translate-y-1 transition-transform" />
          Export Sync Report
        </Button>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
         <div className="glass p-8 rounded-[2.5rem] border border-white/5 flex items-center gap-6">
            <div className="w-16 h-16 rounded-[2rem] bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center">
               <Target className="h-8 w-8 text-indigo-400" />
            </div>
            <div>
               <div className="text-[10px] font-black uppercase tracking-widest text-zinc-600">Global Sync</div>
               <div className="text-3xl font-black text-white italic">94.2%</div>
            </div>
         </div>
         <div className="glass p-8 rounded-[2.5rem] border border-white/5 flex items-center gap-6">
            <div className="w-16 h-16 rounded-[2rem] bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
               <Calendar className="h-8 w-8 text-emerald-400" />
            </div>
            <div>
               <div className="text-[10px] font-black uppercase tracking-widest text-zinc-600">Consecutive Days</div>
               <div className="text-3xl font-black text-white italic">12 Days</div>
            </div>
         </div>
         <div className="glass p-8 rounded-[2.5rem] border border-white/5 flex items-center gap-6">
            <div className="w-16 h-16 rounded-[2rem] bg-rose-500/10 border border-rose-500/20 flex items-center justify-center">
               <Clock className="h-8 w-8 text-rose-400" />
            </div>
            <div>
               <div className="text-[10px] font-black uppercase tracking-widest text-zinc-600">Signals Missed</div>
               <div className="text-3xl font-black text-white italic">4 PKT</div>
            </div>
         </div>
      </div>

      {/* Heatmap Section */}
      <div className="space-y-6">
         <div className="flex items-center justify-between px-2">
            <div className="flex items-center gap-3">
               <div className="w-10 h-10 rounded-xl bg-violet-500/10 flex items-center justify-center">
                  <Activity className="h-5 w-5 text-violet-400" />
               </div>
               <h2 className="text-xl font-black text-white tracking-tight">Synchronization Heartbeat</h2>
            </div>
         </div>
         <AttendanceHeatmap data={studentAttendanceLog} />
      </div>

      {/* Detailed Log */}
      <div className="space-y-6">
         <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
               <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center">
                  <List className="h-5 w-5 text-zinc-400" />
               </div>
               <h2 className="text-xl font-black text-white tracking-tight">Signal Chronology</h2>
            </div>
            <div className="flex bg-white/5 p-1 rounded-xl border border-white/5">
                <Button 
                   onClick={() => setView("grid")}
                   variant={view === "grid" ? "default" : "ghost"}
                   className={cn("h-10 w-10 p-0 rounded-lg", view === "grid" ? "bg-indigo-600" : "text-zinc-500")}
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

         <div className="glass p-8 rounded-[2.5rem] border border-white/5">
            <DataTable columns={recentColumns} data={studentAttendanceLog.slice(0, 10)} />
         </div>
      </div>
    </div>
  );
}

const Activity = ({ className }) => (
   <svg 
     xmlns="http://www.w3.org/2000/svg" 
     width="24" 
     height="24" 
     viewBox="0 0 24 24" 
     fill="none" 
     stroke="currentColor" 
     strokeWidth="2" 
     strokeLinecap="round" 
     strokeLinejoin="round" 
     className={className}
   >
     <path d="M22 12h-4l-3 9L9 3l-3 9H2"/>
   </svg>
);
