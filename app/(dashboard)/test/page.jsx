"use client";

import React from "react";
import {
  Users,
  BookOpen,
  Heart,
  School,
  DollarSign,
  Upload,
  UserPlus
} from "lucide-react";
import { StatCard } from "@/components/shared/StatCard";
import { DataTable } from "@/components/shared/DataTable";
import { SearchBar } from "@/components/shared/SearchBar";
import { FilterBar } from "@/components/shared/FilterBar";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { Button } from "@/components/ui/button";

export default function DashboardTestPage() {
  const [searchTerm, setSearchTerm] = React.useState("");

  const columns = [
    { key: "id", label: "Protocol ID", sortable: true },
    { key: "node", label: "Node Entity", sortable: true },
    { key: "status", label: "Status State", render: (row) => <StatusBadge status={row.status} /> },
    { key: "metrics", label: "Flux Capacity" },
    { key: "lastSeen", label: "Temporal Sync", sortable: true },
  ];

  const data = [
    { id: "PX-101", node: "Arjun Patel", status: "present", metrics: "94%", lastSeen: "2m ago" },
    { id: "PX-102", node: "Sunita Patel", status: "paid", metrics: "100%", lastSeen: "1h ago" },
    { id: "PX-103", node: "Rajesh Kumar", status: "pending", metrics: "65%", lastSeen: "14m ago" },
    { id: "PX-104", node: "Priya Sharma", status: "active", metrics: "88%", lastSeen: "5s ago" },
    { id: "PX-105", node: "Vikram Singh", status: "overdue", metrics: "42%", lastSeen: "2d ago" },
    { id: "PX-106", node: "Amit Shah", status: "absent", metrics: "12%", lastSeen: "1d ago" },
  ];

  const filters = [
    {
      label: "Node Class",
      options: [
        { label: "Admin Alpha", value: "admin" },
        { label: "Teacher Beta", value: "teacher" },
        { label: "Student Gamma", value: "student" }
      ],
      placeholder: "Select Class",
      onChange: (v) => console.log(v)
    },
    {
      label: "Temporal Frame",
      options: [
        { label: "Current Cycle", value: "now" },
        { label: "Previous Cycle", value: "past" }
      ],
      placeholder: "Sync Period",
      onChange: (v) => console.log(v)
    }
  ];

  return (
    <div className="space-y-10">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl font-black tracking-tighter text-white">System Intelligence</h1>
          <p className="text-zinc-500 mt-2 font-medium">Global mission control for the TAMS synchronized ecosystem.</p>
        </div>
        <Button className="rounded-2xl h-14 px-8 bg-indigo-600 hover:bg-indigo-700 text-white font-black uppercase tracking-widest text-xs group">
          <UserPlus className="mr-3 h-5 w-5 group-hover:scale-110 transition-transform" />
          Initialize Node
        </Button>
      </div>

      {/* Stats Cluster */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Active Nodes" value="2,840" icon={Users} trend="+12.5%" color="indigo" />
        <StatCard title="Module Flux" value="48.2" icon={School} trend="+2.1%" color="emerald" />
        <StatCard title="Alert Matrix" value="03" icon={Heart} trend="-14.2%" color="rose" />
        <StatCard title="Capital Flow" value="₹8.4M" icon={DollarSign} trend="+5.8%" color="amber" />
      </div>

      {/* Interactive Controls */}
      <div className="glass p-6 rounded-[2.5rem] border border-white/5 space-y-8">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 pb-4 border-b border-white/5">
          <SearchBar onChange={setSearchTerm} placeholder="Filter neural entries..." />
          <FilterBar filters={filters} onReset={() => console.log("Reset")} />
        </div>

        {/* Data Matrix */}
        <DataTable
          columns={columns}
          data={data}
          onRowClick={(row) => console.log(row)}
        />
      </div>
    </div>
  );
}
