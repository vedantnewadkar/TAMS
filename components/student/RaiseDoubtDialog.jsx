"use client";

import React from "react";
import { 
  X, 
  MessageSquare, 
  ChevronDown, 
  AlertCircle,
  Clock,
  Send,
  BookOpen
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";

export const RaiseDoubtDialog = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/80 backdrop-blur-xl z-[200] animate-in fade-in duration-300"
        onClick={onClose}
      />

      {/* Dialog */}
      <div className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-xl z-[201] animate-in zoom-in-95 duration-300 px-4">
        <div className="glass p-10 rounded-[2.5rem] border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.5)] space-y-8 overflow-hidden relative">
           {/* Decor */}
           <div className="absolute -top-24 -right-24 w-48 h-48 bg-indigo-500/10 blur-[80px]" />
           
           <div className="flex items-center justify-between relative z-10">
              <div className="flex items-center gap-4">
                 <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center">
                    <MessageSquare className="h-6 w-6 text-indigo-400" />
                 </div>
                 <div>
                    <h2 className="text-2xl font-black text-white tracking-tighter">Initialize Signal</h2>
                    <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-[0.2em] mt-1">Raise academic query to assigned mentor</p>
                 </div>
              </div>
              <Button onClick={onClose} variant="ghost" className="h-10 w-10 p-0 rounded-xl glass border-white/5 text-zinc-500 hover:text-white">
                 <X className="h-5 w-5" />
              </Button>
           </div>

           <div className="space-y-6 relative z-10">
              <div className="grid grid-cols-2 gap-4">
                 <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-zinc-600 px-1">Module Payload</label>
                    <Select>
                       <SelectTrigger className="glass border-white/5 h-12 rounded-2xl text-xs font-black uppercase text-white px-4">
                          <SelectValue placeholder="Select Subject" />
                       </SelectTrigger>
                       <SelectContent className="glass border-white/10">
                          <SelectItem value="ds">Data Structures</SelectItem>
                          <SelectItem value="alg">Algorithms</SelectItem>
                          <SelectItem value="web">Web Tech</SelectItem>
                       </SelectContent>
                    </Select>
                 </div>
                 <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-zinc-600 px-1">Urgency Level</label>
                    <Select defaultValue="normal">
                       <SelectTrigger className="glass border-white/5 h-12 rounded-2xl text-xs font-black uppercase text-white px-4">
                          <SelectValue placeholder="Select Urgency" />
                       </SelectTrigger>
                       <SelectContent className="glass border-white/10">
                          <SelectItem value="low">Low Priority</SelectItem>
                          <SelectItem value="normal">Normal Ops</SelectItem>
                          <SelectItem value="high" className="text-rose-400">Critical / Urgent</SelectItem>
                       </SelectContent>
                    </Select>
                 </div>
              </div>

              <div className="space-y-2">
                 <label className="text-[10px] font-black uppercase tracking-widest text-zinc-600 px-1">Query Subject</label>
                 <Input 
                   placeholder="e.g. Difficulty with Red-Black Tree deletions" 
                   className="glass border-white/5 h-14 rounded-2xl px-6 font-bold text-sm text-white focus:border-indigo-500/30"
                 />
              </div>

              <div className="space-y-2">
                 <label className="text-[10px] font-black uppercase tracking-widest text-zinc-600 px-1">Technical Payload (Description)</label>
                 <Textarea 
                   placeholder="Describe your query node in detail..." 
                   className="glass border-white/5 min-h-[150px] rounded-[1.5rem] p-6 font-medium text-sm text-zinc-300 focus:border-indigo-500/30 leading-relaxed"
                 />
                 <div className="flex justify-between px-1">
                    <span className="text-[9px] font-bold text-zinc-700 uppercase tracking-widest flex items-center gap-2">
                       <AlertCircle className="h-3 w-3" /> Minimum 30 packets (chars) required
                    </span>
                    <span className="text-[9px] font-black text-indigo-400">0 / 500</span>
                 </div>
              </div>
           </div>

           <div className="pt-2 flex gap-4 relative z-10">
              <Button 
                onClick={onClose}
                variant="ghost" 
                className="flex-grow rounded-2xl h-14 font-black uppercase tracking-widest text-[10px] text-zinc-500 hover:text-white border border-white/5"
              >
                 Abort Signal
              </Button>
              <Button className="flex-[2] rounded-2xl h-14 bg-indigo-600 hover:bg-indigo-700 text-white font-black uppercase tracking-widest text-[10px] shadow-[0_10px_30px_rgba(79,70,229,0.3)] group">
                 Propagate Signal <Send className="ml-3 h-4 w-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </Button>
           </div>
        </div>
      </div>
    </>
  );
};
