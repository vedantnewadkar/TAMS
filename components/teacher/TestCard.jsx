"use client";

import React from "react";
import { 
  FileText, 
  Calendar, 
  Users, 
  ChevronRight,
  TrendingUp,
  Target
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { cn } from "@/lib/utils";

export const TestCard = ({ test, onEnterMarks }) => {
  const progress = (test.marksEntered / test.totalStudents) * 100;
  
  return (
    <div className="glass p-6 rounded-[2.5rem] border border-white/5 hover:border-white/10 transition-all group relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/5 blur-[60px] pointer-events-none" />
      
      <div className="flex items-start justify-between mb-6">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center group-hover:scale-110 transition-transform">
             <Target className="h-6 w-6 text-indigo-400" />
          </div>
          <div>
            <h3 className="text-xl font-black text-white tracking-tight">{test.name}</h3>
            <div className="flex items-center gap-3 mt-1">
               <span className="text-[10px] font-black uppercase tracking-widest text-zinc-500">{test.subject}</span>
               <div className="w-1 h-1 rounded-full bg-zinc-800" />
               <span className="text-[10px] font-black uppercase tracking-widest text-zinc-500">{test.class}</span>
            </div>
          </div>
        </div>
        <StatusBadge status={test.status === "completed" ? "paid" : test.status === "pending" ? "pending" : "inactive"} />
      </div>

      <div className="grid grid-cols-2 gap-4 mb-8">
        <div className="glass p-3 rounded-2xl border border-white/5">
          <div className="text-[9px] font-black uppercase tracking-widest text-zinc-600 mb-1 flex items-center gap-1">
             <Calendar className="h-3 w-3" /> Scheduled
          </div>
          <div className="text-xs font-black text-white">{test.date}</div>
        </div>
        <div className="glass p-3 rounded-2xl border border-white/5">
          <div className="text-[9px] font-black uppercase tracking-widest text-zinc-600 mb-1 flex items-center gap-1">
             <Users className="h-3 w-3" /> Registered
          </div>
          <div className="text-xs font-black text-white">{test.totalStudents} Nodes</div>
        </div>
      </div>

      {/* Progress Section */}
      <div className="space-y-3 mb-6">
        <div className="flex justify-between items-end">
          <div className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500">Marks Synchronization</div>
          <div className="text-sm font-black text-white">{Math.round(progress)}%</div>
        </div>
        <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden border border-white/5 flex p-[2px]">
          <div 
            className="h-full rounded-full bg-gradient-to-r from-indigo-500 via-violet-600 to-indigo-400 transition-all duration-1000 shadow-[0_0_15px_rgba(79,70,229,0.4)]" 
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="text-[9px] font-bold text-center text-zinc-700 uppercase tracking-widest">
            {test.marksEntered} of {test.totalStudents} node payloads processed
        </div>
      </div>

      <div className="flex gap-3">
        <Button 
          variant="ghost" 
          onClick={onEnterMarks}
          className="flex-grow rounded-2xl h-12 glass border-white/5 text-[10px] font-black uppercase tracking-widest text-zinc-400 hover:text-white"
        >
          {test.status === "completed" ? "Refine Data" : "Initialize marking"}
        </Button>
        <Button className="w-12 h-12 p-0 rounded-2xl bg-indigo-600/10 border border-indigo-500/20 text-indigo-400 hover:bg-indigo-600 hover:text-white transition-all">
          <TrendingUp className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
};
