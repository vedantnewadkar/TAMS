"use client";

import React from "react";
import { Calendar, ChevronLeft, CloudUpload, Users } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { SearchBar } from "@/components/shared/SearchBar";
import { StudentAttendanceCard } from "@/components/teacher/StudentAttendanceCard";
import { db, fakeDelay } from "@/lib/local-db";

const CLASS_OPTIONS = [
  { value: "CL-CE-2A", label: "Computer Engineering - 2A" },
  { value: "CL-CE-2B", label: "Computer Engineering - 2B" },
  { value: "CL-CE-3A", label: "Computer Engineering - 3A" },
  { value: "CL-ME-2A", label: "Mechanical Engineering - 2A" },
  { value: "CL-IT-2A", label: "Information Technology - 2A" },
];

const SUBJECT_OPTIONS = [
  { value: "DS", label: "Data Structures (DS-201)" },
  { value: "AL", label: "Algorithms (AL-202)" },
  { value: "DBMS", label: "Database Management Systems (DB-301)" },
  { value: "OS", label: "Operating Systems (OS-302)" },
  { value: "CN", label: "Computer Networks (CN-401)" },
];

export default function AttendancePage() {
  const [step, setStep]             = React.useState(1);
  const [students, setStudents]     = React.useState([]);
  const [attendance, setAttendance] = React.useState({});
  const [isLoading, setLoading]     = React.useState(false);
  const [saved, setSaved]           = React.useState(false);
  const [search, setSearch]         = React.useState("");
  const [selectedClass, setClass]   = React.useState("CL-CE-2A");
  const [selectedSubject, setSubj]  = React.useState("DS");
  const [markingDate, setDate]      = React.useState(new Date().toISOString().split("T")[0]);

  const loadStudents = async () => {
    setLoading(true);
    await fakeDelay(600);
    const all = db.students.getAll();
    const filtered = all.filter(s => s.classId === selectedClass);
    // Default all to present
    const defaultAttendance = {};
    filtered.forEach(s => { defaultAttendance[s.id] = "present"; });
    setStudents(filtered);
    setAttendance(defaultAttendance);
    setSaved(false);
    setLoading(false);
    setStep(2);
  };

  const markAll = (status) => {
    const updated = {};
    students.forEach(s => { updated[s.id] = status; });
    setAttendance(updated);
  };

  const saveAttendance = async () => {
    setLoading(true);
    await fakeDelay(800);
    const records = Object.entries(attendance).map(([id, status]) => ({
      studentId: id, status, date: markingDate, subject: selectedSubject,
    }));
    db.attendance.mark(records);
    db.activities.add({
      actor:   "Prof. Rajesh Kumar",
      action:  "Attendance Marked",
      details: `Attendance recorded for ${CLASS_OPTIONS.find(c=>c.value===selectedClass)?.label}, ${SUBJECT_OPTIONS.find(s=>s.value===selectedSubject)?.label} — ${records.filter(r=>r.status==="present").length} present, ${records.filter(r=>r.status==="absent").length} absent.`,
    });
    setSaved(true);
    setLoading(false);
  };

  const filteredStudents = students.filter(s =>
    !search || s.name?.toLowerCase().includes(search.toLowerCase()) || s.rollNo?.toLowerCase().includes(search.toLowerCase())
  );

  const presentCount = Object.values(attendance).filter(v => v === "present").length;
  const absentCount  = Object.values(attendance).filter(v => v === "absent").length;
  const markedCount  = Object.keys(attendance).length;

  return (
    <div className="space-y-10 pb-32">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl font-black tracking-tighter text-white">Mark Attendance</h1>
          <p className="text-zinc-500 mt-1 font-medium">Select a class and subject, then mark each student's status.</p>
        </div>
        {step === 2 && (
          <div className="flex items-center gap-4">
            <div className="glass px-6 py-3 rounded-2xl border border-white/5">
              <span className="text-xs font-black uppercase tracking-widest text-zinc-500 mr-3">Progress</span>
              <span className="text-sm font-black text-indigo-400">{markedCount} / {students.length}</span>
            </div>
            <Button onClick={() => { setStep(1); setSaved(false); }} variant="ghost"
              className="h-12 w-12 p-0 glass border-white/5 rounded-2xl text-zinc-400 hover:text-white">
              <ChevronLeft className="h-6 w-6" />
            </Button>
          </div>
        )}
      </div>

      {step === 1 ? (
        <div className="glass rounded-[2.5rem] border border-white/5 p-10">
          <div className="max-w-2xl space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-zinc-600">Class</label>
                <Select value={selectedClass} onValueChange={setClass}>
                  <SelectTrigger className="glass border-white/5 h-13 rounded-2xl font-bold text-sm text-white px-4">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {CLASS_OPTIONS.map(c => <SelectItem key={c.value} value={c.value}>{c.label}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-zinc-600">Subject</label>
                <Select value={selectedSubject} onValueChange={setSubj}>
                  <SelectTrigger className="glass border-white/5 h-13 rounded-2xl font-bold text-sm text-white px-4">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {SUBJECT_OPTIONS.map(s => <SelectItem key={s.value} value={s.value}>{s.label}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-zinc-600">Date</label>
              <input
                type="date"
                value={markingDate}
                onChange={e => setDate(e.target.value)}
                className="w-full glass border border-white/10 h-12 rounded-2xl font-bold text-sm text-white px-4 bg-transparent focus:outline-none focus:border-indigo-500/50"
              />
            </div>

            <Button onClick={loadStudents} disabled={isLoading}
              className="w-full md:w-auto px-12 h-14 bg-indigo-600 hover:bg-indigo-700 text-white font-black uppercase tracking-widest text-xs rounded-2xl shadow-[0_0_20px_rgba(79,70,229,0.3)]">
              {isLoading ? "Loading..." : "Load Students"}
            </Button>
          </div>
        </div>
      ) : (
        <div className="space-y-8">
          {/* Quick actions */}
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between glass p-6 rounded-[2rem] border border-white/5">
            <div className="flex items-center gap-4 flex-wrap">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center">
                  <Users className="h-5 w-5 text-indigo-400" />
                </div>
                <div>
                  <p className="text-xs font-black text-white">{CLASS_OPTIONS.find(c=>c.value===selectedClass)?.label}</p>
                  <p className="text-[10px] text-zinc-600 font-bold uppercase">{SUBJECT_OPTIONS.find(s=>s.value===selectedSubject)?.label} · {markingDate}</p>
                </div>
              </div>
              <div className="flex items-center gap-2 text-xs text-zinc-500 font-bold">
                <span className="text-emerald-400">{presentCount} P</span>
                <span>·</span>
                <span className="text-rose-400">{absentCount} A</span>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Button size="sm" variant="ghost" onClick={() => markAll("present")}
                className="text-emerald-400 hover:bg-emerald-500/10 rounded-xl text-xs font-black uppercase">All Present</Button>
              <Button size="sm" variant="ghost" onClick={() => markAll("absent")}
                className="text-rose-400 hover:bg-rose-500/10 rounded-xl text-xs font-black uppercase">All Absent</Button>
              <SearchBar onChange={setSearch} placeholder="Search student..." className="max-w-xs" />
            </div>
          </div>

          {/* Student cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {filteredStudents.length > 0 ? filteredStudents.map(student => (
              <StudentAttendanceCard
                key={student.id}
                student={student}
                status={attendance[student.id]}
                onStatusChange={status => setAttendance(p => ({ ...p, [student.id]: status }))}
              />
            )) : (
              <div className="col-span-4 text-center py-12 text-zinc-600 font-bold text-sm">
                {students.length === 0 ? "No students found for this class." : "No students match your search."}
              </div>
            )}
          </div>

          {/* Fixed footer */}
          <div className="fixed bottom-10 left-0 right-0 md:left-64 flex justify-center z-50 pointer-events-none">
            <div className="glass p-4 rounded-3xl border border-indigo-500/30 shadow-[0_-10px_40px_rgba(0,0,0,0.5)] flex gap-4 pointer-events-auto bg-zinc-950/80 backdrop-blur-3xl px-8 items-center">
              {saved ? (
                <div className="flex items-center gap-3 text-emerald-400 font-black text-xs uppercase tracking-widest">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  Attendance Saved Successfully!
                </div>
              ) : (
                <>
                  <p className="text-[10px] font-black uppercase tracking-widest text-zinc-500 border-r border-white/10 pr-6 mr-2">
                    {presentCount} Present · {absentCount} Absent
                  </p>
                  <Button onClick={saveAttendance} disabled={isLoading}
                    className="h-12 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-black uppercase tracking-widest text-[10px] px-10 shadow-[0_0_20px_rgba(79,70,229,0.4)] transition-all">
                    <CloudUpload className="mr-2 h-4 w-4" />
                    {isLoading ? "Saving..." : "Save Attendance"}
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
