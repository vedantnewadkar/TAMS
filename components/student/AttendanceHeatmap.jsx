"use client";

import React from "react";
import { cn } from "@/lib/utils";

export const AttendanceHeatmap = ({ data }) => {
  // Generate last 12 weeks of dates
  const weeks = 12;
  const days = 7;
  const totalCells = weeks * days;
  
  // Group data by date for easy lookup
  const dataMap = data.reduce((acc, curr) => {
    acc[curr.date] = curr.status;
    return acc;
  }, {});

  const cells = Array.from({ length: totalCells }).map((_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - (totalCells - 1 - i));
    const dateStr = date.toISOString().split('T')[0];
    const status = dataMap[dateStr];

    return {
      date: dateStr,
      status: status || "none",
      isFuture: date > new Date()
    };
  });

  const getStatusColor = (status) => {
    switch (status) {
      case "present": return "bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.3)]";
      case "absent": return "bg-rose-500 shadow-[0_0_10px_rgba(244,63,94,0.3)]";
      case "late": return "bg-amber-500 shadow-[0_0_10px_rgba(245,158,11,0.3)]";
      default: return "bg-white/5 border border-white/5";
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center px-2">
         <span className="text-[10px] font-black uppercase tracking-widest text-zinc-600">Sync History (Last 12 Weeks)</span>
         <div className="flex gap-4">
            <div className="flex items-center gap-2">
               <div className="w-2 h-2 rounded-full bg-emerald-500" />
               <span className="text-[9px] font-black uppercase tracking-widest text-zinc-700">Present</span>
            </div>
            <div className="flex items-center gap-2">
               <div className="w-2 h-2 rounded-full bg-rose-500" />
               <span className="text-[9px] font-black uppercase tracking-widest text-zinc-700">Absent</span>
            </div>
            <div className="flex items-center gap-2">
               <div className="w-2 h-2 rounded-full bg-amber-500" />
               <span className="text-[9px] font-black uppercase tracking-widest text-zinc-700">Late</span>
            </div>
         </div>
      </div>
      
      <div className="glass p-6 rounded-[2rem] border border-white/5 overflow-x-auto custom-scrollbar">
        <div className="grid grid-flow-col grid-rows-7 gap-1.5 min-w-max">
          {cells.map((cell, idx) => (
            <div 
              key={idx}
              title={`${cell.date}: ${cell.status}`}
              className={cn(
                "w-3.5 h-3.5 rounded-sm transition-all duration-300 hover:scale-125 cursor-help",
                getStatusColor(cell.status)
              )}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
