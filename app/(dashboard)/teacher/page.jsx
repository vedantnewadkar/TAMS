"use client";

import React from "react";
import { 
  Calendar, 
  FileText, 
  School, 
  Users,
  Clock,
  ChevronRight,
  TrendingUp,
  AlertCircle
} from "lucide-react";
import { StatCard } from "@/components/shared/StatCard";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { Button } from "@/components/ui/button";
import { 
  teacherSchedule, 
  teacherTests 
} from "@/lib/dummy-data";

export default function TeacherDashboard() {
  const teacherStats = [
    { title: "Today's Classes", value: teacherSchedule.length.toString(), icon: Clock, color: "indigo" },
    { title: "Pending Marks", value: "2", icon: FileText, color: "rose" },
    { title: "Upcoming Tests", value: "1", icon: Calendar, color: "amber" },
    { title: "Total Students", value: "182", icon: Users, color: "emerald" },
  ];

  return (
    <div className="space-y-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl font-black tracking-tighter text-white">Academic Intelligence</h1>
          <p className="text-zinc-500 mt-2 font-medium">Welcome back, Prof. Rajesh Kumar. Your daily neural schedule is synchronized.</p>
        </div>
        <div className="flex bg-white/5 p-1 rounded-2xl border border-white/5">
          <div className="px-4 py-2 font-black uppercase tracking-widest text-[10px] text-indigo-400">Apr 10, 2026</div>
        </div>
      </div>

      {/* Stats Cluster */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {teacherStats.map((stat) => (
          <StatCard key={stat.title} {...stat} />
        ))}
      </div>

      {/* Today's Schedule & Recent Tests */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Schedule */}
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center">
              <Clock className="h-5 w-5 text-indigo-400" />
            </div>
            <h2 className="text-xl font-black text-white tracking-tight">Today's Schedule</h2>
          </div>

          <div className="glass rounded-[2.5rem] border border-white/5 overflow-hidden">
            <div className="divide-y divide-white/5">
              {teacherSchedule.map((item) => (
                <div key={item.id} className="p-6 flex items-center justify-between hover:bg-white/5 transition-all group">
                  <div className="flex items-center gap-6">
                    <div className="text-xs font-black uppercase tracking-widest text-zinc-600 w-32">{item.time}</div>
                    <div>
                      <h4 className="text-lg font-black text-white tracking-tight group-hover:text-indigo-400 transition-colors">{item.subject}</h4>
                      <p className="text-xs font-bold text-zinc-500 uppercase tracking-widest mt-0.5">{item.class}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <StatusBadge status={item.status === "marked" ? "paid" : item.status === "pending" ? "pending" : "inactive"} />
                    <Button variant="ghost" size="sm" className="h-9 w-9 p-0 rounded-xl glass border-white/5 text-zinc-500 hover:text-white">
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Evaluation Metrics */}
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center">
              <TrendingUp className="h-5 w-5 text-violet-400" />
            </div>
            <h2 className="text-xl font-black text-white tracking-tight">Recent Evaluations</h2>
          </div>

          <div className="space-y-4">
            {teacherTests.map((test) => {
              const progress = (test.marksEntered / test.totalStudents) * 100;
              return (
                <div key={test.id} className="glass p-6 rounded-3xl border border-white/5 hover:border-white/10 transition-all group">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h4 className="text-lg font-black text-white tracking-tight">{test.name}</h4>
                      <p className="text-xs font-bold text-zinc-500 uppercase tracking-widest mt-0.5">{test.subject} • {test.class}</p>
                    </div>
                    <StatusBadge status={test.status === "completed" ? "paid" : test.status === "pending" ? "pending" : "inactive"} />
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-zinc-600">
                      <span>Sync Progress</span>
                      <span>{Math.round(progress)}%</span>
                    </div>
                    <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden border border-white/5">
                      <div 
                        className="h-full bg-gradient-to-r from-indigo-500 to-violet-600 transition-all duration-1000" 
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                  </div>

                  <Button className="w-full mt-6 rounded-xl h-11 bg-white/5 hover:bg-white/10 border border-white/5 text-xs font-black uppercase tracking-widest text-zinc-400 hover:text-white transition-all">
                    {test.status === "completed" ? "View Analytics" : "Initialize Marking"}
                  </Button>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Quick Access Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="glass p-8 rounded-[2.5rem] border border-white/5 flex flex-col items-center text-center group cursor-pointer hover:border-indigo-500/20 transition-all">
          <div className="w-14 h-14 rounded-2xl bg-indigo-500/10 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-indigo-500/20 transition-all">
            <Users className="h-7 w-7 text-indigo-400" />
          </div>
          <h3 className="text-xl font-black text-white tracking-tight uppercase">Registry</h3>
          <p className="text-xs font-bold text-zinc-600 uppercase tracking-widest mt-2">Manage assigned students</p>
        </div>
        <div className="glass p-8 rounded-[2.5rem] border border-white/5 flex flex-col items-center text-center group cursor-pointer hover:border-rose-500/20 transition-all">
          <div className="w-14 h-14 rounded-2xl bg-rose-500/10 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-rose-500/20 transition-all">
            <FileText className="h-7 w-7 text-rose-400" />
          </div>
          <h3 className="text-xl font-black text-white tracking-tight uppercase">New Payload</h3>
          <p className="text-xs font-bold text-zinc-600 uppercase tracking-widest mt-2">Initialize new evaluation</p>
        </div>
        <div className="glass p-8 rounded-[2.5rem] border border-white/5 flex flex-col items-center text-center group cursor-pointer hover:border-amber-500/20 transition-all">
          <div className="w-14 h-14 rounded-2xl bg-amber-500/10 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-amber-500/20 transition-all">
            <AlertCircle className="h-7 w-7 text-amber-400" />
          </div>
          <h3 className="text-xl font-black text-white tracking-tight uppercase">Alerts</h3>
          <p className="text-xs font-bold text-zinc-600 uppercase tracking-widest mt-2">Synchronized system notices</p>
        </div>
      </div>
    </div>
  );
}
