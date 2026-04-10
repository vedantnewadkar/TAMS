"use client";

import React from "react";
import { TrendingUp, FileText, MessageSquare, ArrowRight, ChevronRight, BookOpen, Star, Award, Wallet } from "lucide-react";
import { StatCard } from "@/components/shared/StatCard";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { Button } from "@/components/ui/button";
import { db } from "@/lib/local-db";
import { useAuth } from "@/hooks/useAuth";
import { progressNotes, studentTestScores } from "@/lib/dummy-data";
import { useRouter } from "next/navigation";

const ATTENDANCE_BREAKDOWN = [
  { name: "Data Structures",   percentage: 96, present: 24, total: 25 },
  { name: "Algorithms",        percentage: 92, present: 22, total: 24 },
  { name: "DBMS",              percentage: 88, present: 21, total: 24 },
  { name: "Operating Systems", percentage: 98, present: 19, total: 20 },
];

export default function StudentDashboard() {
  const { user }  = useAuth();
  const router    = useRouter();
  const [student, setStudent] = React.useState(null);
  const [fees,    setFees]    = React.useState(null);

  React.useEffect(() => {
    const s = db.students.getByRollNo("CE22A001") || db.students.getAll()[0];
    const f = db.fees.getByStudent(s?.id);
    setStudent(s);
    setFees(f);
  }, []);

  const stats = [
    { title: "Attendance",      value: `${student?.attendance || 94}%`,  icon: BookOpen,     color: "indigo" },
    { title: "Avg Test Score",  value: "87%",                             icon: TrendingUp,   color: "emerald" },
    { title: "Open Doubts",     value: db.doubts.getAll().filter(d=>d.status==="open").length.toString(), icon: FileText, color: "rose" },
    { title: "Fee Status",      value: fees?.status || "paid",            icon: Wallet,       color: "amber",
      render: () => <StatusBadge status={fees?.status || "paid"} /> },
  ];

  return (
    <div className="space-y-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl font-black tracking-tighter text-white">My Dashboard</h1>
          <p className="text-zinc-500 mt-2 font-medium">
            Welcome back, {user?.name || student?.name || "Arjun Patel"} · {student?.rollNo} · {student?.branch}
          </p>
        </div>
        <div className="glass px-6 py-3 rounded-2xl border border-white/5 flex items-center gap-3">
          <Award className="h-4 w-4 text-indigo-400" />
          <span className="text-sm font-black text-white">{student?.class || "2-A"} · {student?.branch}</span>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map(s => <StatCard key={s.title} {...s} />)}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Attendance + Tests */}
        <div className="lg:col-span-2 space-y-8">
          {/* Attendance by subject */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center">
                  <BookOpen className="h-5 w-5 text-indigo-400" />
                </div>
                <h2 className="text-xl font-black text-white tracking-tight">Attendance by Subject</h2>
              </div>
              <Button variant="ghost" onClick={() => router.push("/student/attendance")}
                className="text-[10px] font-black uppercase tracking-widest text-zinc-500 hover:text-white group">
                Full View <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>

            <div className="glass p-8 rounded-[2.5rem] border border-white/5 grid grid-cols-1 md:grid-cols-2 gap-8">
              {ATTENDANCE_BREAKDOWN.map(sub => (
                <div key={sub.name} className="space-y-3">
                  <div className="flex justify-between items-end">
                    <div>
                      <h4 className="text-sm font-black text-zinc-300 tracking-tight">{sub.name}</h4>
                      <p className="text-[9px] font-bold text-zinc-600 uppercase tracking-widest">{sub.present} / {sub.total} lectures</p>
                    </div>
                    <span className={`text-sm font-black ${sub.percentage >= 75 ? "text-indigo-400" : "text-rose-400"}`}>{sub.percentage}%</span>
                  </div>
                  <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                    <div className={`h-full transition-all duration-1000 ${sub.percentage >= 75 ? "bg-gradient-to-r from-indigo-500 to-indigo-400" : "bg-rose-500"}`}
                      style={{ width: `${sub.percentage}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Test Scores */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
                <TrendingUp className="h-5 w-5 text-emerald-400" />
              </div>
              <h2 className="text-xl font-black text-white tracking-tight">Recent Test Scores</h2>
            </div>
            <div className="glass rounded-[2.5rem] border border-white/5 overflow-hidden">
              <div className="divide-y divide-white/5">
                {studentTestScores.map(score => (
                  <div key={score.id} className="p-6 flex items-center justify-between hover:bg-white/5 transition-all group">
                    <div className="flex items-center gap-6">
                      <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/5 flex flex-col items-center justify-center flex-shrink-0">
                        <span className="text-[9px] font-black text-zinc-500 uppercase">{score.date.split('-')[1]}</span>
                        <span className="text-sm font-black text-white">{score.date.split('-')[2]}</span>
                      </div>
                      <div>
                        <h4 className="text-base font-black text-white tracking-tight group-hover:text-emerald-400 transition-colors">{score.test}</h4>
                        <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mt-0.5">{score.subject}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <div className="text-sm font-black text-white">{score.score} / {score.total}</div>
                        <StatusBadge status={score.badge === "excellent" ? "paid" : "pending"} className="mt-1 h-5 text-[8px]" />
                      </div>
                      <ChevronRight className="h-5 w-5 text-zinc-800" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-8">
          {/* Mentor Note */}
          <div className="space-y-4">
            <h2 className="text-sm font-black text-white uppercase tracking-widest px-2">Latest Mentor Note</h2>
            <div className="glass p-8 rounded-[2.5rem] border border-white/5 border-l-4 border-l-indigo-500 space-y-4 relative overflow-hidden">
              <div className="absolute top-4 right-4">
                <Star className="h-4 w-4 text-indigo-500 fill-indigo-500" />
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 flex items-center justify-center flex-shrink-0">
                  <Award className="h-6 w-6 text-indigo-400" />
                </div>
                <div>
                  <h4 className="font-black text-white tracking-tight text-sm">Performance: 9.2/10</h4>
                  <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">By Dr. Priya Sharma</span>
                </div>
              </div>
              <p className="text-xs font-medium text-zinc-500 leading-relaxed italic">
                "{progressNotes?.[0]?.note || "Excellent academic trajectory this semester."}"
              </p>
              <Button onClick={() => router.push("/student/doubts")}
                className="w-full rounded-2xl h-12 bg-white/5 hover:bg-white/10 border border-white/5 text-[10px] font-black uppercase tracking-widest text-zinc-400 hover:text-white transition-all">
                Message Mentor
              </Button>
            </div>
          </div>

          {/* Fees */}
          <div className="space-y-4">
            <h2 className="text-sm font-black text-white uppercase tracking-widest px-2">Fee Status</h2>
            <div className="glass p-8 rounded-[2.5rem] border border-white/5 space-y-5">
              <div className="flex justify-between items-center">
                <span className="text-[10px] font-black uppercase tracking-widest text-zinc-500">Outstanding Balance</span>
                <StatusBadge status={fees?.status || "paid"} />
              </div>
              <div className="text-3xl font-black text-white tracking-tighter">
                ₹{((fees?.totalFee || 102000) - (fees?.paidAmount || 102000)).toLocaleString("en-IN")}
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-zinc-700">
                  <span>Paid: ₹{(fees?.paidAmount || 102000).toLocaleString("en-IN")}</span>
                  <span>{Math.round(((fees?.paidAmount || 102000) / (fees?.totalFee || 102000)) * 100)}%</span>
                </div>
                <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-500 rounded-full transition-all"
                    style={{ width: `${Math.round(((fees?.paidAmount || 102000) / (fees?.totalFee || 102000)) * 100)}%` }} />
                </div>
              </div>
            </div>
          </div>

          {/* Raise a Doubt */}
          <Button onClick={() => router.push("/student/doubts")}
            className="w-full h-20 rounded-[2rem] bg-indigo-600/10 hover:bg-indigo-600/20 border border-indigo-500/20 text-indigo-400 font-black uppercase tracking-widest text-[10px] transition-all flex flex-col items-center justify-center gap-1 group">
            <MessageSquare className="h-5 w-5 group-hover:scale-110 transition-transform" />
            Raise a Doubt
          </Button>
        </div>
      </div>
    </div>
  );
}
