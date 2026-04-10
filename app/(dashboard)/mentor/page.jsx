"use client";

import React from "react";
import { Users, AlertTriangle, MessageSquare, ArrowRight, ChevronRight, TrendingDown, UserCheck } from "lucide-react";
import { StatCard } from "@/components/shared/StatCard";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { db } from "@/lib/local-db";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";

export default function MentorDashboard() {
  const { user } = useAuth();
  const router = useRouter();
  const [students, setStudents]   = React.useState([]);
  const [messages, setMessages]   = React.useState([]);

  React.useEffect(() => {
    // Dr. Priya Sharma (M-101) is the demo mentor
    const mentorStudents = db.students.getAll().filter(s => s.mentorId === "M-101");
    setStudents(mentorStudents);
    setMessages(db.messages.getAll().slice(0, 3));
  }, []);

  const lowAttendance  = students.filter(s => s.attendance < 75);
  const unreadMessages = messages.filter(m => !m.isRead).length;

  const mentorStats = [
    { title: "Assigned Students",  value: `${students.length}/20`,    icon: UserCheck,   color: "indigo" },
    { title: "Attendance Alerts",  value: lowAttendance.length.toString(), icon: AlertTriangle, color: "rose" },
    { title: "Academic Alerts",    value: "0",                        icon: TrendingDown, color: "amber" },
    { title: "Unread Messages",    value: unreadMessages.toString(),   icon: MessageSquare, color: "emerald" },
  ];

  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-4xl font-black tracking-tighter text-white">Mentorship Dashboard</h1>
        <p className="text-zinc-500 mt-2 font-medium">
          Welcome, {user?.name || "Dr. Priya Sharma"} — monitoring {students.length} assigned students
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {mentorStats.map(s => <StatCard key={s.title} {...s} />)}
      </div>

      {/* Alerts + Messages */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Alerts */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center">
              <AlertTriangle className="h-5 w-5 text-rose-400" />
            </div>
            <h2 className="text-xl font-black text-white tracking-tight">Student Alerts</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Attendance */}
            <div className="glass p-6 rounded-[2rem] border-l-4 border-l-rose-500 border-white/5 space-y-4">
              <h3 className="text-xs font-black uppercase tracking-widest text-zinc-500">Attendance {"<"} 75%</h3>
              <div className="space-y-3">
                {lowAttendance.length > 0 ? lowAttendance.slice(0, 5).map(s => (
                  <div key={s.id} className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/5 hover:border-rose-500/20 transition-all group">
                    <div>
                      <p className="text-sm font-black text-white">{s.name}</p>
                      <p className="text-[10px] font-bold text-rose-400 uppercase tracking-widest">{s.attendance}% attendance</p>
                    </div>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0 rounded-lg group-hover:bg-rose-500/10">
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                )) : (
                  <p className="text-[10px] font-bold text-zinc-700 uppercase tracking-widest p-2">All students above 75% ✓</p>
                )}
              </div>
            </div>

            {/* Fee issues */}
            <div className="glass p-6 rounded-[2rem] border-l-4 border-l-amber-500 border-white/5 space-y-4">
              <h3 className="text-xs font-black uppercase tracking-widest text-zinc-500">Fee Status Issues</h3>
              <div className="space-y-3">
                {students.filter(s => s.fees === "overdue" || s.fees === "pending").slice(0, 5).map(s => (
                  <div key={s.id} className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/5 hover:border-amber-500/20 transition-all group">
                    <div>
                      <p className="text-sm font-black text-white">{s.name}</p>
                      <StatusBadge status={s.fees} />
                    </div>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0 rounded-lg group-hover:bg-amber-500/10">
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
                {students.filter(s => s.fees === "overdue" || s.fees === "pending").length === 0 && (
                  <p className="text-[10px] font-bold text-zinc-700 uppercase tracking-widest p-2">No fee issues ✓</p>
                )}
              </div>
            </div>
          </div>

          <Button onClick={() => router.push("/mentor/students")}
            className="w-full h-14 rounded-2xl glass border border-white/5 text-[10px] font-black uppercase tracking-widest text-zinc-400 hover:text-white transition-all group">
            View All {students.length} Assigned Students
            <ArrowRight className="ml-3 h-4 w-4 group-hover:translate-x-2 transition-transform" />
          </Button>
        </div>

        {/* Messages */}
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
              <MessageSquare className="h-5 w-5 text-emerald-400" />
            </div>
            <h2 className="text-xl font-black text-white tracking-tight">Recent Messages</h2>
          </div>

          <div className="glass rounded-[2.5rem] border border-white/5 overflow-hidden">
            <div className="divide-y divide-white/5">
              {messages.map(thread => (
                <div key={thread.id} className="p-5 hover:bg-white/5 transition-all cursor-pointer group"
                  onClick={() => router.push("/mentor/messages")}>
                  <div className="flex justify-between items-start mb-1.5">
                    <StatusBadge status={thread.isRead ? "active" : "pending"} />
                    <span className="text-[9px] font-bold text-zinc-700 uppercase tracking-widest">{thread.timestamp}</span>
                  </div>
                  <h4 className="text-sm font-black text-white truncate group-hover:text-indigo-400 transition-colors">{thread.sender}</h4>
                  <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-tight mt-1 truncate">{thread.subject}</p>
                </div>
              ))}
            </div>
            <div className="p-4 border-t border-white/5">
              <Button variant="ghost" onClick={() => router.push("/mentor/messages")}
                className="w-full text-[10px] font-black uppercase tracking-widest text-zinc-500 hover:text-white">
                Open Messages →
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
