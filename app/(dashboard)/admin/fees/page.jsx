"use client";

import React from "react";
import { 
  DollarSign, 
  Search, 
  CreditCard, 
  History,
  TrendingUp,
  Receipt
} from "lucide-react";
import { SearchBar } from "@/components/shared/SearchBar";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { StatCard } from "@/components/shared/StatCard";
import { DataTable } from "@/components/shared/DataTable";
import { Button } from "@/components/ui/button";
import { arjunFees } from "@/lib/dummy-data";

export default function FeesManagement() {
  const [selectedStudent, setSelectedStudent] = React.useState(null);

  const installmentColumns = [
    { key: "id", label: "Sequence", sortable: true },
    { key: "amount", label: "Amount", render: (row) => `₹${row.amount.toLocaleString()}` },
    { key: "date", label: "Transaction Date", sortable: true },
    { key: "receipt", label: "Auth Code" },
    { key: "status", label: "State", render: (row) => <StatusBadge status={row.status} /> },
  ];

  return (
    <div className="space-y-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl font-black tracking-tighter text-white">Financial Matrix</h1>
          <p className="text-zinc-500 mt-2 font-medium">Monitoring capital flow and node financial standing.</p>
        </div>
        <div className="flex flex-col md:flex-row gap-4 items-center">
          <SearchBar 
            onChange={(v) => v.toLowerCase().includes("arjun") ? setSelectedStudent(arjunFees) : setSelectedStudent(null)} 
            placeholder="Search student node (e.g. Arjun)..." 
          />
          <Button className="rounded-2xl h-11 px-6 bg-emerald-600 hover:bg-emerald-700 text-white font-black uppercase tracking-widest text-xs">
            <Receipt className="mr-2 h-4 w-4" /> Global Report
          </Button>
        </div>
      </div>

      {!selectedStudent ? (
        <div className="glass rounded-[2.5rem] border border-white/5 py-32 text-center animate-reveal">
          <div className="max-w-md mx-auto space-y-6">
            <div className="w-16 h-16 rounded-3xl bg-white/5 border border-white/10 flex items-center justify-center mx-auto mb-6">
              <Search className="h-8 w-8 text-zinc-700" />
            </div>
            <h2 className="text-xl font-black text-white tracking-tight uppercase">Awaiting Node Selection</h2>
            <p className="text-sm font-bold text-zinc-600 uppercase tracking-widest leading-relaxed px-10">
              Provide a valid student identity to initialize financial telemetry and transaction history.
            </p>
          </div>
        </div>
      ) : (
        <div className="space-y-8 animate-reveal">
          {/* Student Overview Header */}
          <div className="glass p-8 rounded-[2.5rem] border border-white/5 flex flex-col md:flex-row items-center gap-8">
            <div className="w-24 h-24 rounded-full bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center relative flex-shrink-0">
              <span className="text-white font-black text-2xl uppercase tracking-tighter">AP</span>
              <div className="absolute -bottom-2 -right-2 bg-emerald-500 w-8 h-8 rounded-full flex items-center justify-center shadow-[0_0_15px_rgba(16,185,129,0.5)]">
                <StatusBadge status="paid" className="p-0 border-none bg-transparent" />
              </div>
            </div>
            <div className="flex-grow text-center md:text-left">
              <h2 className="text-3xl font-black text-white tracking-tighter">{selectedStudent.student}</h2>
              <div className="flex flex-wrap justify-center md:justify-start gap-4 mt-2">
                <span className="text-xs font-black uppercase tracking-widest text-zinc-500">Roll: {selectedStudent.rollNo}</span>
                <span className="text-xs font-black uppercase tracking-widest text-zinc-500">Group: {selectedStudent.class}</span>
                <span className="text-xs font-black uppercase tracking-widest text-zinc-500">Sector: {selectedStudent.branch}</span>
              </div>
            </div>
          </div>

          {/* Fee Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <StatCard title="Total Liability" value={`₹${selectedStudent.totalFee.toLocaleString()}`} icon={CreditCard} color="indigo" />
            <StatCard title="Net Contribution" value={`₹${selectedStudent.paidAmount.toLocaleString()}`} icon={TrendingUp} color="emerald" trend="100%" />
            <StatCard title="Floating Balance" value={`₹${selectedStudent.balance.toLocaleString()}`} icon={DollarSign} color="rose" />
          </div>

          {/* Installments Table */}
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <History className="h-5 w-5 text-indigo-400" />
                <h3 className="text-xl font-black text-white tracking-tight">Transaction Chronology</h3>
              </div>
              <Button size="sm" className="h-10 rounded-xl px-6 glass border-white/5 text-zinc-400 hover:text-white font-black uppercase tracking-widest text-[10px]">
                Generate Receipt
              </Button>
            </div>
            <div className="glass p-6 rounded-[2.5rem] border border-white/5">
              <DataTable columns={installmentColumns} data={selectedStudent.installments} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
