"use client";

import React from "react";
import { 
  Wallet, 
  Download, 
  ChevronRight, 
  CheckCircle2, 
  Clock, 
  AlertCircle,
  History,
  TrendingUp,
  ArrowUpRight,
  ShieldCheck,
  CreditCard
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { arjunFees, parentProfile } from "@/lib/dummy-data";
import { cn } from "@/lib/utils";

export default function ParentFeesHub() {
  const totalSettled = (arjunFees.paidAmount / arjunFees.totalFee) * 100;
  
  return (
    <div className="space-y-10 pb-20">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 px-1">
        <div>
          <h1 className="text-4xl font-black tracking-tighter text-white">Financial Ledger Hub</h1>
          <p className="text-zinc-500 mt-2 font-medium italic">Transparent tracking of node quotas and transactional history for {parentProfile.wardName}.</p>
        </div>
        <div className="flex items-center gap-4">
           <div className="glass px-6 py-4 rounded-3xl border border-emerald-500/20 flex items-center gap-4">
              <ShieldCheck className="h-6 w-6 text-emerald-500" />
              <div>
                 <div className="text-[9px] font-black uppercase tracking-widest text-zinc-600">Sync Status</div>
                 <div className="text-sm font-black text-emerald-400">All Nodes Settled</div>
              </div>
           </div>
        </div>
      </div>

      {/* Main Stats Cluster */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
         {/* Overall Balance Card */}
         <div className="lg:col-span-2 glass p-10 rounded-[3rem] border border-white/5 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-500/5 blur-[120px] pointer-events-none" />
            
            <div className="flex justify-between items-start mb-12">
               <div>
                  <h3 className="text-sm font-black text-white uppercase tracking-[0.2em] mb-4">Total Academic Quota</h3>
                  <div className="text-6xl font-black text-white tracking-tighter italic">₹{arjunFees.totalFee.toLocaleString()}</div>
               </div>
               <StatusBadge status="paid" className="px-6 h-8 text-[10px]" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 pt-10 border-t border-white/5">
               <div className="space-y-4">
                  <div className="flex justify-between items-end">
                     <span className="text-[10px] font-black uppercase tracking-widest text-zinc-600 italic">Total Settled</span>
                     <span className="text-lg font-black text-emerald-400 italic">100%</span>
                  </div>
                  <div className="h-3 w-full bg-white/5 rounded-full overflow-hidden border border-white/5 p-1">
                     <div className="h-full bg-gradient-to-r from-emerald-600 to-emerald-400 rounded-full" />
                  </div>
                  <div className="flex justify-between text-[9px] font-bold text-zinc-700 uppercase tracking-widest">
                     <span>₹{arjunFees.paidAmount.toLocaleString()} Processed</span>
                     <span>₹0 Pending</span>
                  </div>
               </div>
               
               <div className="flex items-center gap-6">
                  <div className="glass rounded-[2rem] border border-white/5 p-6 flex flex-col items-center justify-center flex-grow">
                     <TrendingUp className="h-6 w-6 text-emerald-500 mb-2" />
                     <div className="text-[9px] font-black uppercase text-zinc-600">Last Flux</div>
                     <div className="text-sm font-black text-white">Mar 05, 2026</div>
                  </div>
                  <Button className="h-16 w-16 p-0 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white shadow-[0_15px_30px_rgba(79,70,229,0.3)] group">
                     <CreditCard className="h-6 w-6 group-hover:scale-110 transition-transform" />
                  </Button>
               </div>
            </div>
         </div>

         {/* Quick Actions / Billing */}
         <div className="glass p-10 rounded-[3rem] border border-white/5 space-y-8 flex flex-col justify-between">
            <div>
               <h3 className="text-sm font-black text-white uppercase tracking-widest mb-6">Financial Intelligence</h3>
               <div className="space-y-4">
                  <div className="p-5 rounded-2xl bg-white/5 border border-white/5 group hover:border-indigo-500/20 transition-all cursor-pointer">
                     <div className="flex items-center justify-between mb-2">
                        <StatusBadge status="paid" className="h-4 text-[7px]" />
                        <ArrowUpRight className="h-4 w-4 text-zinc-800 group-hover:text-indigo-400 transition-colors" />
                     </div>
                     <div className="text-sm font-black text-white italic">Download Annual Statement</div>
                     <p className="text-[9px] font-bold text-zinc-700 uppercase tracking-widest mt-1">Academic Year 2025-26</p>
                  </div>
                  <div className="p-5 rounded-2xl bg-white/5 border border-white/5 group hover:border-indigo-500/20 transition-all cursor-pointer">
                     <div className="flex items-center justify-between mb-2">
                        <Info className="h-4 w-4 text-indigo-400" />
                        <ArrowUpRight className="h-4 w-4 text-zinc-800 group-hover:text-indigo-400 transition-colors" />
                     </div>
                     <div className="text-sm font-black text-white italic">Scholarship Threshold</div>
                     <p className="text-[9px] font-bold text-zinc-700 uppercase tracking-widest mt-1">Node Eligible for Merit Flux</p>
                  </div>
               </div>
            </div>
            
            <Button variant="ghost" className="w-full text-indigo-400 font-black uppercase tracking-widest text-[9px] group italic">
               Raise Financial Query <ChevronRight className="ml-2 h-3 w-3 group-hover:translate-x-1 transition-transform" />
            </Button>
         </div>
      </div>

      {/* Transaction Chronology */}
      <div className="space-y-6">
         <div className="flex items-center gap-3 px-2">
            <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center">
               <History className="h-5 w-5 text-zinc-400" />
            </div>
            <h2 className="text-xl font-black text-white tracking-tight">Transactional Chronology</h2>
         </div>

         <div className="glass rounded-[3rem] border border-white/5 overflow-hidden">
            <table className="w-full">
               <thead className="bg-white/5">
                  <tr className="border-b border-white/5 text-left">
                     <th className="p-8 text-[10px] font-black uppercase tracking-[0.2em] text-zinc-600">ID Node</th>
                     <th className="p-8 text-[10px] font-black uppercase tracking-[0.2em] text-zinc-600">Deployment Date</th>
                     <th className="p-8 text-[10px] font-black uppercase tracking-[0.2em] text-zinc-600">Status Vector</th>
                     <th className="p-8 text-[10px] font-black uppercase tracking-[0.2em] text-zinc-600">Signal (Amount)</th>
                     <th className="p-8 text-[10px] font-black uppercase tracking-[0.2em] text-zinc-600 text-right">Acknowledgement</th>
                  </tr>
               </thead>
               <tbody className="divide-y divide-white/5">
                  {arjunFees.installments.map((inst) => (
                    <tr key={inst.id} className="hover:bg-white/5 transition-all group">
                       <td className="p-8 font-black text-white tracking-tight italic uppercase">{inst.receipt}</td>
                       <td className="p-8 text-sm font-bold text-zinc-500">{inst.date}</td>
                       <td className="p-8">
                          <StatusBadge status="paid" />
                       </td>
                       <td className="p-8 font-black text-white italic">₹{inst.amount.toLocaleString()}</td>
                       <td className="p-8 text-right">
                          <Button variant="ghost" className="h-10 rounded-xl px-4 glass border-white/5 text-[9px] font-black uppercase tracking-widest text-zinc-500 hover:text-white group">
                             <Download className="mr-2 h-4 w-4 group-hover:translate-y-1 transition-transform" /> Receipt
                          </Button>
                       </td>
                    </tr>
                  ))}
               </tbody>
            </table>
         </div>
      </div>
    </div>
  );
}

const Info = ({ className }) => (
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
     <circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/>
   </svg>
);
