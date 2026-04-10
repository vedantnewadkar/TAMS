"use client";

import React from "react";
import { TrendingUp, Calendar, MessageSquare, AlertTriangle, ChevronRight, User, Phone, Mail, ArrowRight, Star, Award, Wallet } from "lucide-react";
import { StatCard } from "@/components/shared/StatCard";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { Button } from "@/components/ui/button";
import { db } from "@/lib/local-db";
import { useAuth } from "@/hooks/useAuth";
import { studentTestScores, progressNotes, arjunFees, parentProfile as seedParent } from "@/lib/dummy-data";
import { useRouter } from "next/navigation";

const ATTENDANCE_BY_SUBJECT = [
  { name: "Data Structures",   percentage: 96 },
  { name: "Algorithms",        percentage: 92 },
  { name: "DBMS",              percentage: 88 },
  { name: "Operating Systems", percentage: 98 },
];

export default function ParentDashboard() {
  const { user }  = useAuth();
  const router    = useRouter();
  const [student, setStudent] = React.useState(null);
  const [fees,    setFees]    = React.useState(null);
  const [loaded,  setLoaded]  = React.useState(false);

  React.useEffect(() => {
    const s = db.students.getByRollNo("CE22A001") || db.students.getAll()[0];
    const f = db.fees.getByStudent(s?.id) || arjunFees;
    setStudent(s);
    setFees(f);
    setLoaded(true);
  }, []);

  const attendance = student?.attendance || 94;

  const wardStats = [
    { title: "Attendance",      value: `${attendance}%`,      icon: Calendar,     color: "indigo" },
    { title: "Avg Score",       value: "87%",                  icon: TrendingUp,   color: "emerald" },
    { title: "Fee Status",      value: fees?.status || "paid", icon: Wallet,       color: "amber",
      render: () => <StatusBadge status={fees?.status || "paid"} /> },
    { title: "Mentor Contact",  value: "Verified",             icon: MessageSquare, color: "violet" },
  ];

  return (
    <div className="space-y-10">
      {/* Low attendance alert */}
      {attendance < 75 && (
        <div className="bg-rose-500/10 border border-rose-500/20 p-4 rounded-2xl flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-rose-500/20 flex items-center justify-center flex-shrink-0">
            <AlertTriangle className="h-5 w-5 text-rose-400" />
          </div>
          <div>
            <h4 className="text-sm font-black text-rose-400 uppercase tracking-tight">Attendance Warning</h4>
            <p className="text-xs text-rose-300/70">{student?.name}'s attendance is below 75%, which may affect exam eligibility.</p>
          </div>
        </div>
      )}

      {/* Ward header */}
      <div className="glass p-8 rounded-[2.5rem] border border-white/5 flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_50%,rgba(79,70,229,0.05),transparent_60%)]" />

        <div className="flex items-center gap-6 relative z-10">
          <div className="w-20 h-20 rounded-[2rem] bg-indigo-600/10 border border-indigo-500/20 flex items-center justify-center flex-shrink-0">
            <User className="h-10 w-10 text-indigo-400" />
          </div>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[9px] font-black uppercase tracking-widest text-indigo-400">Your Ward</span>
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            </div>
            <h2 className="text-3xl font-black text-white tracking-tighter">{student?.name || "Arjun Patel"}</h2>
            <p className="text-sm font-bold text-zinc-500 uppercase tracking-widest mt-1">{student?.rollNo} · {student?.branch}</p>
          </div>
        </div>

        <div className="flex gap-3 relative z-10">
          <Button variant="ghost" className="h-12 w-12 p-0 rounded-2xl glass border-white/5 text-zinc-400 hover:text-white">
            <Phone className="h-5 w-5" />
          </Button>
          <Button variant="ghost" className="h-12 w-12 p-0 rounded-2xl glass border-white/5 text-zinc-400 hover:text-white">
            <Mail className="h-5 w-5" />
          </Button>
          <Button onClick={() => router.push("/parent/messages")}
            className="h-12 px-6 bg-indigo-600 hover:bg-indigo-700 text-white font-black uppercase tracking-widest text-[10px] rounded-2xl shadow-[0_8px_24px_rgba(79,70,229,0.3)] flex items-center gap-2">
            <MessageSquare className="h-4 w-4" /> Contact Mentor
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {wardStats.map(s => <StatCard key={s.title} {...s} />)}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Attendance + Tests */}
        <div className="lg:col-span-2 space-y-8">
          {/* Attendance */}
          <div className="glass p-8 rounded-[2.5rem] border border-white/5 space-y-8">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-black text-white tracking-tight flex items-center gap-3">
                <Calendar className="h-5 w-5 text-indigo-400" /> Attendance Overview
              </h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Circle */}
              <div className="flex flex-col items-center justify-center text-center p-6 bg-white/5 rounded-[2rem]">
                <div className="relative w-32 h-32 flex items-center justify-center mb-4">
                  <svg className="w-full h-full -rotate-90" viewBox="0 0 128 128">
                    <circle cx="64" cy="64" r="56" stroke="currentColor" strokeWidth="8" fill="none" className="text-zinc-800" />
                    <circle cx="64" cy="64" r="56" stroke="currentColor" strokeWidth="8" fill="none"
                      strokeDasharray="351.86"
                      strokeDashoffset={351.86 - (351.86 * attendance / 100)}
                      className={attendance >= 75 ? "text-indigo-500" : "text-rose-500"}
                      strokeLinecap="round" />
                  </svg>
                  <span className="absolute text-2xl font-black text-white">{attendance}%</span>
                </div>
                <span className="text-[10px] font-black uppercase tracking-widest text-zinc-500">Overall Attendance</span>
              </div>

              {/* By subject */}
              <div className="space-y-5 flex flex-col justify-center">
                {ATTENDANCE_BY_SUBJECT.map(sub => (
                  <div key={sub.name} className="space-y-1.5">
                    <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-zinc-600">
                      <span>{sub.name}</span>
                      <span className={sub.percentage >= 75 ? "text-indigo-400" : "text-rose-400"}>{sub.percentage}%</span>
                    </div>
                    <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                      <div className={`h-full rounded-full ${sub.percentage >= 75 ? "bg-indigo-500" : "bg-rose-500"}`}
                        style={{ width: `${sub.percentage}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Test scores */}
          <div className="glass p-8 rounded-[2.5rem] border border-white/5 space-y-6">
            <h3 className="text-xl font-black text-white tracking-tight flex items-center gap-3">
              <Award className="h-5 w-5 text-emerald-400" /> Recent Test Results
            </h3>
            <div className="divide-y divide-white/5">
              {studentTestScores.slice(0, 3).map(score => (
                <div key={score.id} className="py-5 flex items-center justify-between group">
                  <div>
                    <h4 className="text-base font-black text-white tracking-tight group-hover:text-emerald-400 transition-colors">{score.test}</h4>
                    <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mt-1">{score.subject} · {score.date}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-black text-white">{score.score} / {score.total}</div>
                    <StatusBadge status={score.badge === "excellent" ? "paid" : "pending"} className="mt-1" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-8">
          {/* Mentor note */}
          <div className="glass p-8 rounded-[2.5rem] border border-white/5 border-t-4 border-t-indigo-500 text-center space-y-4">
            <div className="w-14 h-14 rounded-2xl bg-indigo-500/10 flex items-center justify-center mx-auto">
              <Star className="h-7 w-7 text-indigo-400" />
            </div>
            <h3 className="text-sm font-black text-white uppercase tracking-widest">Mentor's Note</h3>
            <p className="text-xs font-medium text-zinc-500 leading-relaxed italic">
              "{progressNotes?.[0]?.note || "Excellent academic performance this semester."}"
            </p>
            <div className="flex items-center gap-3 pt-4 border-t border-white/5 justify-center">
              <Award className="h-4 w-4 text-zinc-600" />
              <div className="text-left">
                <div className="text-[10px] font-black text-white">{seedParent?.mentorName || "Dr. Priya Sharma"}</div>
                <div className="text-[9px] font-bold text-zinc-600 uppercase">Class Mentor</div>
              </div>
            </div>
          </div>

          {/* Fee summary */}
          <div className="glass p-8 rounded-[2.5rem] border border-white/5 space-y-6">
            <div className="flex items-center gap-3">
              <Wallet className="h-5 w-5 text-indigo-400" />
              <h3 className="text-sm font-black text-white uppercase tracking-widest">Fee Summary</h3>
            </div>
            <div>
              <StatusBadge status={fees?.status || "paid"} />
              <div className="text-3xl font-black text-white tracking-tighter mt-2">
                ₹{((fees?.totalFee || 102000) - (fees?.paidAmount || 102000)).toLocaleString("en-IN")}
                <span className="text-xs text-zinc-600 font-black uppercase tracking-wider ml-2">Outstanding</span>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-zinc-700">
                <span>Paid: ₹{(fees?.paidAmount || 102000).toLocaleString("en-IN")}</span>
                <span>Total: ₹{(fees?.totalFee || 102000).toLocaleString("en-IN")}</span>
              </div>
              <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                <div className="h-full bg-emerald-500 rounded-full transition-all"
                  style={{ width: `${Math.round(((fees?.paidAmount || 102000) / (fees?.totalFee || 102000)) * 100)}%` }} />
              </div>
            </div>
            <div className="space-y-2 pt-2 border-t border-white/5">
              {(fees?.installments || arjunFees.installments).map(inst => (
                <div key={inst.id} className="flex justify-between items-center hover:bg-white/5 p-2 rounded-xl transition-all">
                  <div>
                    <div className="text-[10px] font-black text-white">Installment #{inst.id}</div>
                    <div className="text-[9px] font-bold text-zinc-600">{inst.date}</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-black text-zinc-400">₹{inst.amount.toLocaleString("en-IN")}</span>
                    <StatusBadge status={inst.status} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
