"use client";

import React from "react";
import { 
  MessageSquare, 
  Search, 
  Send, 
  User, 
  CheckCircle2, 
  MoreVertical,
  History,
  Info,
  Award,
  ChevronRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { cn } from "@/lib/utils";
import { parentThreads, parentProfile } from "@/lib/dummy-data";

export default function ParentMessaging() {
  const [selectedThread, setSelectedThread] = React.useState(parentThreads[0]);
  const [newMessage, setNewMessage] = React.useState("");

  return (
    <div className="h-[calc(100vh-160px)] flex flex-col gap-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 px-1">
        <div>
          <h1 className="text-4xl font-black tracking-tighter text-white">Mentor Coordination</h1>
          <p className="text-zinc-500 mt-2 font-medium">Asynchronous Intercom Nexus with {parentProfile.mentorName}.</p>
        </div>
        <div className="glass px-6 py-4 rounded-3xl border border-white/5 flex items-center gap-4">
           <div className="w-10 h-10 rounded-2xl bg-indigo-500/10 flex items-center justify-center">
              <Award className="h-5 w-5 text-indigo-400" />
           </div>
           <div>
              <div className="text-[9px] font-black uppercase tracking-widest text-zinc-600">Assigned Mentor</div>
              <div className="text-sm font-black text-white italic">{parentProfile.mentorName}</div>
           </div>
        </div>
      </div>

      <div className="flex-grow flex gap-8 overflow-hidden">
        {/* Inbox Sidebar */}
        <div className="w-full md:w-[400px] flex flex-col gap-6">
          <div className="glass p-2 rounded-[2rem] border border-white/10 flex items-center gap-2">
             <div className="flex-grow h-12 bg-white/5 rounded-2xl border border-white/5 flex items-center px-4 gap-3">
                <Search className="h-4 w-4 text-zinc-700" />
                <input 
                  type="text" 
                  placeholder="Filter threads..." 
                  className="bg-transparent border-none text-xs font-bold text-white outline-none w-full placeholder:text-zinc-800"
                />
             </div>
             <Button className="h-12 px-6 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-black uppercase tracking-widest text-[9px]">
                New Query
             </Button>
          </div>

          <div className="flex-grow overflow-y-auto custom-scrollbar space-y-4 pr-2">
             {parentThreads.map((thread) => (
               <div 
                 key={thread.id}
                 onClick={() => setSelectedThread(thread)}
                 className={cn(
                   "glass p-6 rounded-[2.5rem] border transition-all cursor-pointer group",
                   selectedThread?.id === thread.id ? "border-indigo-500/40 bg-indigo-500/10 shadow-[0_10px_30px_rgba(79,70,229,0.1)]" : "border-white/5 hover:border-white/10"
                 )}
               >
                  <div className="flex justify-between items-start mb-4">
                     <StatusBadge status={thread.status === "open" ? "pending" : "paid"} className="text-[8px] h-5" />
                     <span className="text-[9px] font-bold text-zinc-700 uppercase tracking-widest">{thread.timestamp}</span>
                  </div>
                  <h4 className={cn(
                    "text-base font-black tracking-tight mb-1 transition-colors",
                    selectedThread?.id === thread.id ? "text-indigo-400" : "text-white group-hover:text-indigo-400"
                  )}>{thread.subject}</h4>
                  <p className="text-xs font-medium text-zinc-500 line-clamp-2 leading-relaxed italic mb-4">
                     "{thread.lastMessage}"
                  </p>
                  <div className="pt-4 border-t border-white/5 flex items-center justify-between">
                     <div className="flex items-center gap-2">
                        <div className="w-5 h-5 rounded-full bg-zinc-900 border border-white/10 flex items-center justify-center">
                           <User className="h-3 w-3 text-zinc-700" />
                        </div>
                        <span className="text-[9px] font-black uppercase text-zinc-600 italic">{thread.sender}</span>
                     </div>
                     <span className="text-[8px] font-black uppercase text-zinc-800 tracking-widest">{thread.replies} Signals</span>
                  </div>
               </div>
             ))}
          </div>
        </div>

        {/* Conversation Viewport */}
        <div className="hidden md:flex flex-grow glass rounded-[3rem] border border-white/5 flex-col overflow-hidden relative shadow-2xl">
          {selectedThread ? (
            <>
              {/* Header */}
              <div className="p-8 border-b border-white/5 bg-zinc-900/40 backdrop-blur-xl flex items-center justify-between relative z-10">
                 <div className="flex items-center gap-6">
                    <div className="w-14 h-14 rounded-[1.5rem] bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center">
                       <User className="h-7 w-7 text-indigo-400" />
                    </div>
                    <div>
                       <h3 className="text-xl font-black text-white tracking-tight leading-none">{selectedThread.subject}</h3>
                       <div className="flex items-center gap-3 mt-2">
                          <span className="text-[9px] font-black uppercase tracking-widest text-indigo-400">Status: {selectedThread.status}</span>
                          <div className="w-1 h-1 rounded-full bg-zinc-800" />
                          <span className="text-[9px] font-black uppercase tracking-widest text-zinc-600">ID: {selectedThread.id}</span>
                       </div>
                    </div>
                 </div>
                 <div className="flex items-center gap-4">
                    <Button variant="ghost" className="h-12 px-6 rounded-2xl glass border-white/5 text-[9px] font-black uppercase tracking-widest text-emerald-500 hover:text-emerald-400">
                       Mark as Resolved
                    </Button>
                    <Button variant="ghost" className="h-12 w-12 p-0 rounded-2xl glass border-white/5 text-zinc-500 hover:text-white">
                       <MoreVertical className="h-5 w-5" />
                    </Button>
                 </div>
              </div>

              {/* Messages */}
              <div className="flex-grow overflow-y-auto p-10 space-y-10 custom-scrollbar relative z-10">
                 <div className="text-center">
                    <span className="px-4 py-1.5 rounded-full border border-white/5 bg-white/2 text-[9px] font-black uppercase tracking-[0.2em] text-zinc-700">Initial sync established {selectedThread.timestamp}</span>
                 </div>

                 {/* Simulated Logic */}
                 <div className="flex flex-col gap-10">
                    <div className="flex justify-start max-w-[80%]">
                       <div className="space-y-3">
                          <div className="glass p-6 rounded-[2.5rem] rounded-tl-none border border-white/5 bg-white/2 text-sm font-medium text-zinc-300 leading-relaxed italic">
                             {selectedThread.lastMessage}
                          </div>
                          <div className="flex items-center gap-2 px-2">
                             <div className="w-4 h-4 rounded-full bg-indigo-500/20 flex items-center justify-center italic text-[8px] font-black text-indigo-500">M</div>
                             <span className="text-[9px] font-black uppercase text-zinc-700">{selectedThread.sender} • {selectedThread.timestamp}</span>
                          </div>
                       </div>
                    </div>

                    <div className="flex justify-end max-w-[80%] ml-auto">
                       <div className="space-y-3 flex flex-col items-end">
                          <div className="p-6 rounded-[2.5rem] rounded-br-none bg-indigo-600 text-sm font-black text-white leading-relaxed shadow-[0_15px_40px_rgba(79,70,229,0.3)]">
                             Thank you for the update, Dr. Sharma. Arjun has been putting in extra hours on his assignments. Is there anything specific we should focus on for his upcoming labs?
                          </div>
                          <div className="flex flex-row-reverse items-center gap-2 px-2">
                             <div className="w-4 h-4 rounded-full bg-white/10 flex items-center justify-center italic text-[8px] font-black text-zinc-500">P</div>
                             <span className="text-[9px] font-black uppercase text-zinc-700">Sunita Patel • 1 hour ago</span>
                          </div>
                       </div>
                    </div>
                 </div>
              </div>

              {/* Input Area */}
              <div className="p-8 border-t border-white/5 bg-zinc-950/50 relative z-10">
                 <div className="flex items-center gap-6">
                    <Input 
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      placeholder="Propagate neural signal..."
                      className="flex-grow h-16 glass border-white/5 rounded-[1.5rem] px-8 font-medium text-white text-base focus:border-indigo-500/30"
                    />
                    <Button className="h-16 px-10 rounded-[1.5rem] bg-indigo-600 hover:bg-indigo-700 text-white font-black uppercase tracking-widest text-[11px] shadow-[0_0_30px_rgba(79,70,229,0.4)] group">
                       Transmit <Send className="ml-3 h-5 w-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    </Button>
                 </div>
              </div>
            </>
          ) : (
            <div className="flex-grow flex flex-col items-center justify-center text-center p-20 space-y-8">
               <div className="w-32 h-32 rounded-[3rem] bg-white/2 border border-white/5 flex items-center justify-center animate-pulse">
                  <MessageSquare className="h-14 w-14 text-zinc-900" />
               </div>
               <div>
                  <h3 className="text-2xl font-black text-white uppercase tracking-widest italic mb-2">Nexus Primary Node</h3>
                  <p className="text-xs font-bold text-zinc-700 uppercase tracking-widest max-w-xs leading-relaxed">Select a communication signal from the interface to initialize synchronization with the mentor.</p>
               </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
