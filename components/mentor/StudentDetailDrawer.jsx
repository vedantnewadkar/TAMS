"use client";

import React from "react";
import { 
  X, 
  User, 
  Phone, 
  Mail, 
  TrendingUp, 
  Calendar,
  DollarSign,
  Plus,
  Star,
  MessageSquare
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { DataTable } from "@/components/shared/DataTable";
import { progressNotes } from "@/lib/dummy-data";

export const StudentDetailDrawer = ({ student, isOpen, onClose }) => {
  if (!student) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className={cn(
          "fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] transition-opacity duration-500",
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
        onClick={onClose}
      />

      {/* Drawer */}
      <div 
        className={cn(
          "fixed right-0 top-0 h-full w-full md:w-[600px] bg-zinc-950 border-l border-white/5 z-[101] transition-transform duration-500 ease-out flex flex-col",
          isOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        {/* Header */}
        <div className="p-8 border-b border-white/5 flex items-center justify-between bg-zinc-900/50 backdrop-blur-xl">
           <div className="flex items-center gap-6">
              <div className="w-16 h-16 rounded-[2rem] bg-indigo-600/10 border border-indigo-500/20 flex items-center justify-center relative overflow-hidden">
                 <User className="h-8 w-8 text-indigo-400" />
                 <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/20 to-transparent" />
              </div>
              <div>
                 <h2 className="text-2xl font-black text-white tracking-tighter">{student.name}</h2>
                 <p className="text-xs font-bold text-zinc-500 uppercase tracking-widest">{student.rollNo} • Group {student.class}</p>
              </div>
           </div>
           <Button 
            onClick={onClose}
            variant="ghost" 
            className="h-12 w-12 p-0 rounded-2xl glass border-white/5 text-zinc-400 hover:text-white"
           >
              <X className="h-6 w-6" />
           </Button>
        </div>

        {/* Content */}
        <div className="flex-grow overflow-y-auto p-8 space-y-10 custom-scrollbar">
           {/* Quick Connect */}
           <div className="grid grid-cols-2 gap-4">
              <div className="glass p-4 rounded-3xl border border-white/5 flex items-center gap-4 group cursor-pointer hover:bg-white/5 transition-all">
                 <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Phone className="h-4 w-4 text-zinc-400" />
                 </div>
                 <div className="text-[10px] font-black uppercase tracking-widest text-zinc-500">Contact Node</div>
              </div>
              <div className="glass p-4 rounded-3xl border border-white/5 flex items-center gap-4 group cursor-pointer hover:bg-white/5 transition-all">
                 <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Mail className="h-4 w-4 text-zinc-400" />
                 </div>
                 <div className="text-[10px] font-black uppercase tracking-widest text-zinc-500">Sync Signal</div>
              </div>
           </div>

           {/* Performance Telemetry */}
           <div className="space-y-6">
              <div className="flex items-center justify-between">
                 <h3 className="text-sm font-black text-white uppercase tracking-widest flex items-center gap-3">
                    <TrendingUp className="h-4 w-4 text-indigo-400" /> Performance Telemetry
                 </h3>
                 <StatusBadge status="paid" className="h-6" />
              </div>
              
              <div className="space-y-6">
                 {/* Attendance Progress */}
                 <div className="space-y-3">
                    <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-zinc-600">
                       <span>Attendance Synchronicity</span>
                       <span>{student.attendance}%</span>
                    </div>
                    <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden border border-white/5">
                       <div 
                        className={cn(
                          "h-full rounded-full transition-all duration-1000",
                          student.attendance >= 75 ? "bg-emerald-500" : "bg-rose-500"
                        )} 
                        style={{ width: `${student.attendance}%` }} 
                       />
                    </div>
                 </div>

                 {/* Marks Progress */}
                 <div className="space-y-3">
                    <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-zinc-600">
                       <span>Academic Efficiency</span>
                       <span>{student.avgMarks}% AVG</span>
                    </div>
                    <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden border border-white/5">
                       <div 
                        className={cn(
                          "h-full rounded-full transition-all duration-1000",
                          student.avgMarks >= 40 ? "bg-amber-500" : "bg-rose-500"
                        )} 
                        style={{ width: `${student.avgMarks}%` }} 
                       />
                    </div>
                 </div>
              </div>
           </div>

           {/* Progress Notes */}
           <div className="space-y-6">
              <div className="flex items-center justify-between">
                 <h3 className="text-sm font-black text-white uppercase tracking-widest flex items-center gap-3">
                    <Calendar className="h-4 w-4 text-violet-400" /> Qualitative Audits
                 </h3>
                 <Button size="sm" className="h-8 rounded-xl px-4 bg-white/5 border border-white/5 text-[9px] font-black uppercase tracking-widest text-zinc-500 hover:text-white">
                    <Plus className="mr-2 h-3 w-3" /> Add Note
                 </Button>
              </div>

              <div className="space-y-4">
                 {progressNotes.map(note => (
                   <div key={note.id} className="glass p-6 rounded-3xl border border-white/5 space-y-4">
                      <div className="flex justify-between items-start">
                         <div className="flex gap-1">
                            {[...Array(5)].map((_, i) => (
                              <Star key={i} className={cn("h-3 w-3", i < note.rating ? "text-amber-500 fill-amber-500" : "text-zinc-800")} />
                            ))}
                         </div>
                         <span className="text-[9px] font-bold text-zinc-700 uppercase tracking-widest">{note.date}</span>
                      </div>
                      <p className="text-xs font-medium text-zinc-500 leading-relaxed italic">"{note.note}"</p>
                      <div className="flex items-center gap-2 pt-2 border-t border-white/5">
                         <div className="w-5 h-5 rounded-full bg-indigo-500/10 flex items-center justify-center">
                            <User className="h-3 w-3 text-indigo-400" />
                         </div>
                         <span className="text-[9px] font-black uppercase tracking-tight text-zinc-600">{note.mentor}</span>
                      </div>
                   </div>
                 ))}
              </div>
           </div>
        </div>

        {/* Footer Actions */}
        <div className="p-8 border-t border-white/5 bg-zinc-900/50 backdrop-blur-xl flex gap-4">
           <Button className="flex-grow rounded-2xl h-14 bg-indigo-600 hover:bg-indigo-700 text-white font-black uppercase tracking-widest text-xs group px-8">
              <MessageSquare className="mr-3 h-5 w-5 group-hover:scale-110 transition-transform" />
              Initialize Intercom
           </Button>
           <Button variant="ghost" className="h-14 w-14 p-0 rounded-2xl glass border-white/5 text-zinc-400 hover:text-white">
              <DollarSign className="h-6 w-6" />
           </Button>
        </div>
      </div>
    </>
  );
};
