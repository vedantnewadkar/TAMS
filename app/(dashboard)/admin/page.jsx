"use client";

import React from "react";
import { Users, BookOpen, Heart, School, IndianRupee, Activity } from "lucide-react";
import { StatCard } from "@/components/shared/StatCard";
import { DataTable } from "@/components/shared/DataTable";
import { useAuth } from "@/hooks/useAuth";
import { db, getStats } from "@/lib/local-db";

export default function AdminDashboard() {
  const { user } = useAuth();
  const [stats, setStats]   = React.useState(null);
  const [activity, setAct]  = React.useState([]);

  React.useEffect(() => {
    // Load from local DB every time page mounts
    setStats(getStats());
    setAct(db.activities.getAll().slice(0, 10));
  }, []);

  const statCards = stats ? [
    { title: "Total Students", value: stats.students.toString(), icon: Users,        color: "indigo" },
    { title: "Teachers",       value: stats.teachers.toString(), icon: BookOpen,     color: "emerald" },
    { title: "Mentors",        value: stats.mentors.toString(),  icon: Heart,        color: "violet" },
    { title: "Active Classes", value: stats.classes.toString(),  icon: School,       color: "amber" },
    { title: "Fee Overdue",    value: stats.pendingFees.toString(), icon: IndianRupee, color: "rose", trend: "Needs action" },
  ] : [];

  const columns = [
    { key: "timestamp", label: "Time",   sortable: true },
    { key: "actor",     label: "By",     sortable: true },
    { key: "action",    label: "Action", sortable: true },
    { key: "details",   label: "Details" },
  ];

  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-4xl font-black tracking-tighter text-white">Admin Dashboard</h1>
        <p className="text-zinc-500 mt-2 font-medium">
          Welcome back, {user?.name || "Admin"} — RAIT University Management System
        </p>
      </div>

      {/* Stats */}
      {stats ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          {statCards.map(s => <StatCard key={s.title} {...s} />)}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          {[1,2,3,4,5].map(i => (
            <div key={i} className="h-32 glass rounded-[2rem] border border-white/5 animate-pulse" />
          ))}
        </div>
      )}

      {/* Activity */}
      <div className="space-y-5">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center">
            <Activity className="h-5 w-5 text-indigo-400" />
          </div>
          <div>
            <h2 className="text-xl font-black text-white tracking-tight">Recent Activity</h2>
            <p className="text-xs font-bold text-zinc-600 uppercase tracking-widest mt-0.5">Last 10 system events</p>
          </div>
        </div>
        <div className="glass p-6 rounded-[2.5rem] border border-white/5">
          <DataTable columns={columns} data={activity} />
        </div>
      </div>
    </div>
  );
}
