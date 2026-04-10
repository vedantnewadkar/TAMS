"use client";

import React from "react";
import { 
  CheckCircle2, 
  XCircle, 
  Clock, 
  User,
  Search,
  Users
} from "lucide-react";
import { cn } from "@/lib/utils";

export const StudentAttendanceCard = ({ student, status, onStatusChange }) => {
  return (
    <div className={cn(
      "glass p-4 rounded-3xl border transition-all duration-300 group",
      status === "present" && "border-emerald-500/30 bg-emerald-500/5",
      status === "absent" && "border-rose-500/30 bg-rose-500/5",
      status === "late" && "border-amber-500/30 bg-amber-500/5",
      !status && "border-white/5"
    )}>
      <div className="flex items-center gap-4 mb-4">
        <div className="w-12 h-12 rounded-2xl bg-zinc-900 border border-white/5 flex items-center justify-center relative overflow-hidden flex-shrink-0">
          <User className="h-6 w-6 text-zinc-700" />
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-transparent" />
        </div>
        <div className="min-w-0">
          <h4 className="text-sm font-black text-white tracking-tight truncate">{student.name}</h4>
          <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest truncate">{student.rollNo}</p>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2">
        <button
          onClick={() => onStatusChange("present")}
          className={cn(
            "flex flex-col items-center justify-center p-2 rounded-xl border transition-all gap-1",
            status === "present" 
              ? "bg-emerald-500 text-white border-emerald-400" 
              : "border-white/5 text-zinc-600 hover:text-zinc-400 hover:bg-white/5"
          )}
        >
          <CheckCircle2 className="h-4 w-4" />
          <span className="text-[9px] font-black uppercase tracking-widest">Pres</span>
        </button>
        <button
          onClick={() => onStatusChange("absent")}
          className={cn(
            "flex flex-col items-center justify-center p-2 rounded-xl border transition-all gap-1",
            status === "absent" 
              ? "bg-rose-500 text-white border-rose-400" 
              : "border-white/5 text-zinc-600 hover:text-zinc-400 hover:bg-white/5"
          )}
        >
          <XCircle className="h-4 w-4" />
          <span className="text-[9px] font-black uppercase tracking-widest">Abs</span>
        </button>
        <button
          onClick={() => onStatusChange("late")}
          className={cn(
            "flex flex-col items-center justify-center p-2 rounded-xl border transition-all gap-1",
            status === "late" 
              ? "bg-amber-500 text-white border-amber-400" 
              : "border-white/5 text-zinc-600 hover:text-zinc-400 hover:bg-white/5"
          )}
        >
          <Clock className="h-4 w-4" />
          <span className="text-[9px] font-black uppercase tracking-widest">Late</span>
        </button>
      </div>
    </div>
  );
};
