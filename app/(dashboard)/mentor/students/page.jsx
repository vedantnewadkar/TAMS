"use client";

import React from "react";
import { 
  Users, 
  Search, 
  FilterBar,
  ChevronRight,
  User,
  Activity,
  UserCheck
} from "lucide-react";
import { DataTable } from "@/components/shared/DataTable";
import { SearchBar } from "@/components/shared/SearchBar";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { mentorStudents } from "@/lib/dummy-data";
import { StudentDetailDrawer } from "@/components/mentor/StudentDetailDrawer";

export default function MentorStudentRegistry() {
  const [selectedStudent, setSelectedStudent] = React.useState(null);
  const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);

  const openDrawer = (student) => {
    setSelectedStudent(student);
    setIsDrawerOpen(true);
  };

  const studentColumns = [
    { key: "rollNo", label: "Rank ID", sortable: true },
    { key: "name", label: "Entity Node", sortable: true, render: (row) => (
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center">
          <User className="h-4 w-4 text-indigo-400" />
        </div>
        <span className="font-black tracking-tight">{row.name}</span>
      </div>
    )},
    { key: "class", label: "Group" },
    { key: "attendance", label: "Sync %", sortable: true, render: (row) => (
      <div className="flex items-center gap-3">
        <div className="flex-grow h-1.5 w-16 bg-white/5 rounded-full overflow-hidden border border-white/5">
           <div 
             className={cn(
               "h-full rounded-full transition-all",
               row.attendance >= 85 ? "bg-emerald-500" : row.attendance >= 75 ? "bg-amber-500" : "bg-rose-500"
             )} 
             style={{ width: `${row.attendance}%` }} 
           />
        </div>
        <span className={cn(
          "text-[10px] font-black uppercase tracking-widest",
          row.attendance >= 85 ? "text-emerald-400" : row.attendance >= 75 ? "text-amber-400" : "text-rose-400"
        )}>
          {row.attendance}%
        </span>
      </div>
    )},
    { key: "avgMarks", label: "Efficiency", sortable: true, render: (row) => (
      <span className={cn(
        "text-xs font-black uppercase tracking-widest",
        row.avgMarks >= 75 ? "text-emerald-400" : row.avgMarks >= 40 ? "text-amber-400" : "text-rose-400"
      )}>
        {row.avgMarks}% AVG
      </span>
    )},
    { key: "lastContact", label: "Last Sync" },
    { key: "actions", label: "Manage", render: (row) => (
      <Button 
        variant="ghost" 
        onClick={() => openDrawer(row)}
        className="h-10 rounded-xl px-4 glass border-white/5 text-[10px] font-black uppercase tracking-widest text-zinc-400 hover:text-white group"
      >
        Assess <ChevronRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
      </Button>
    )},
  ];

  return (
    <div className="space-y-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl font-black tracking-tighter text-white">Student Registry</h1>
          <p className="text-zinc-500 mt-2 font-medium">Assigned node assessment and performance synchronization.</p>
        </div>
        <div className="flex items-center gap-4">
           <div className="glass px-6 py-4 rounded-3xl border border-white/5 flex items-center gap-4">
              <div className="w-10 h-10 rounded-2xl bg-indigo-500/10 flex items-center justify-center">
                 <UserCheck className="h-5 w-5 text-indigo-400" />
              </div>
              <div>
                 <div className="text-[9px] font-black uppercase tracking-widest text-zinc-600">Sync Load</div>
                 <div className="text-sm font-black text-white">{mentorStudents.length} / 20 Nodes</div>
              </div>
           </div>
        </div>
      </div>

      {/* Toolbox */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 glass p-8 rounded-[2.5rem] border border-white/5">
        <SearchBar placeholder="Identify node by signature (name/rank)..." />
        <div className="flex items-center gap-4 bg-white/5 p-1.5 rounded-2xl border border-white/5">
           <Button variant="ghost" className="h-10 rounded-xl px-4 text-[9px] font-black uppercase tracking-widest text-indigo-400">All Nodes</Button>
           <Button variant="ghost" className="h-10 rounded-xl px-4 text-[9px] font-black uppercase tracking-widest text-zinc-600">Pending Refinement</Button>
        </div>
      </div>

      {/* Registry Table */}
      <div className="glass p-8 rounded-[2.5rem] border border-white/5">
        <DataTable columns={studentColumns} data={mentorStudents} />
      </div>

      {/* Detail Drawer */}
      <StudentDetailDrawer 
        student={selectedStudent} 
        isOpen={isDrawerOpen} 
        onClose={() => setIsDrawerOpen(false)} 
      />
    </div>
  );
}
