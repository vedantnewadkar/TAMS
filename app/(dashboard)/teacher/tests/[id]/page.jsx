"use client";

import React from "react";
import { 
  ChevronLeft, 
  Save, 
  CloudUpload, 
  User,
  Calculator,
  Search,
  CheckCircle2,
  AlertCircle
} from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { SearchBar } from "@/components/shared/SearchBar";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { teacherTests, students } from "@/lib/dummy-data";

export default function MarksEntryPage() {
  const params = useParams();
  const router = useRouter();
  const test = teacherTests.find(t => t.id === params.id) || teacherTests[0];
  
  const [marks, setMarks] = React.useState({});
  
  const handleMarksChange = (studentId, value) => {
    const numValue = parseInt(value);
    if (!isNaN(numValue) && numValue >= 0 && numValue <= test.totalMarks) {
      setMarks(prev => ({ ...prev, [studentId]: numValue }));
    } else if (value === "") {
      setMarks(prev => ({ ...prev, [studentId]: "" }));
    }
  };

  const markedCount = Object.keys(marks).filter(id => marks[id] !== "").length;

  return (
    <div className="space-y-10 pb-24">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center gap-6">
          <Button 
            onClick={() => router.back()}
            variant="ghost" 
            className="h-12 w-12 p-0 glass border-white/5 rounded-2xl text-zinc-400 hover:text-white"
          >
            <ChevronLeft className="h-6 w-6" />
          </Button>
          <div>
            <h1 className="text-4xl font-black tracking-tighter text-white">{test.name}</h1>
            <p className="text-zinc-500 mt-1 font-medium italic">Synchronizing academic outcomes for group {test.class}.</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="glass px-6 py-3 rounded-2xl border border-white/5">
             <span className="text-[10px] font-black uppercase tracking-widest text-zinc-500 mr-4">Total Payload</span>
             <span className="text-sm font-black text-indigo-400">{test.totalMarks} PKT</span>
          </div>
        </div>
      </div>

      {/* Info Card */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
         <div className="glass p-6 rounded-[2.5rem] border border-white/5 flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-indigo-500/10 flex items-center justify-center">
               <Calculator className="h-5 w-5 text-indigo-400" />
            </div>
            <div>
               <div className="text-[10px] font-black uppercase tracking-widest text-zinc-600">Sync Capacity</div>
               <div className="text-lg font-black text-white">{markedCount} / {students.length}</div>
            </div>
         </div>
         <div className="lg:col-span-3 glass p-6 rounded-[2.5rem] border border-white/5 flex items-center justify-between gap-8">
            <SearchBar placeholder="Filter neural entries..." className="max-w-md" />
            <div className="flex items-center gap-2">
               <AlertCircle className="h-4 w-4 text-rose-400" />
               <span className="text-[10px] font-black uppercase tracking-widest text-rose-400">Security: Validation Active</span>
            </div>
         </div>
      </div>

      {/* Marks Sheet */}
      <div className="glass rounded-[2.5rem] border border-white/5 overflow-hidden">
        <Table>
          <TableHeader className="bg-white/5">
            <TableRow className="border-white/5 hover:bg-transparent">
              <TableHead className="w-[100px] text-zinc-500 font-black uppercase tracking-[0.2em] text-[10px] py-6 px-8">Rank</TableHead>
              <TableHead className="text-zinc-500 font-black uppercase tracking-[0.2em] text-[10px] py-6">Node Entity</TableHead>
              <TableHead className="w-[150px] text-zinc-500 font-black uppercase tracking-[0.2em] text-[10px] py-6">Status</TableHead>
              <TableHead className="w-[200px] text-zinc-500 font-black uppercase tracking-[0.2em] text-[10px] py-6 text-right px-8">Value (Out of {test.totalMarks})</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {students.map((student) => {
              const val = marks[student.id];
              const isPassed = val !== undefined && val !== "" && (val / test.totalMarks) >= 0.4;
              const isSet = val !== undefined && val !== "";
              
              return (
                <TableRow key={student.id} className="border-white/5 hover:bg-white/5 transition-colors group">
                  <TableCell className="font-black text-zinc-700 py-4 px-8 group-hover:text-indigo-600 transition-colors">#{student.rollNo.slice(-3)}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-zinc-900 border border-white/5 flex items-center justify-center">
                         <User className="h-4 w-4 text-zinc-700" />
                      </div>
                      <div className="font-bold text-sm tracking-tight text-white">{student.name}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    {isSet ? (
                      <StatusBadge status={isPassed ? "paid" : "overdue"} />
                    ) : (
                      <span className="text-[9px] font-black uppercase tracking-widest text-zinc-800">Uninitialized</span>
                    )}
                  </TableCell>
                  <TableCell className="text-right px-8">
                    <Input 
                      type="number"
                      value={val ?? ""}
                      onChange={(e) => handleMarksChange(student.id, e.target.value)}
                      placeholder="0"
                      className="w-24 ml-auto glass border-white/10 h-10 rounded-xl text-center font-black text-sm text-indigo-400 focus:border-indigo-500/50"
                    />
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>

      {/* Sticky Action Footer */}
      <div className="fixed bottom-10 left-0 right-0 md:left-64 flex justify-center z-50 pointer-events-none">
        <div className="glass p-4 rounded-3xl border border-indigo-500/30 shadow-[0_-10px_40px_rgba(0,0,0,0.5)] flex gap-4 pointer-events-auto bg-zinc-950/80 backdrop-blur-3xl px-8">
          <div className="flex items-center gap-2 px-4 border-r border-white/5 mr-2">
             <div className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse" />
             <span className="text-[10px] font-black uppercase tracking-widest text-zinc-500">Auto-save Enabled</span>
          </div>
          <Button variant="ghost" className="h-12 rounded-2xl font-black uppercase tracking-widest text-[10px] text-zinc-500 hover:text-white px-6">
            <Save className="mr-2 h-4 w-4" /> Save Local Draft
          </Button>
          <Button 
            disabled={markedCount < students.length}
            className="h-12 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-black uppercase tracking-widest text-[10px] px-10 shadow-[0_0_20px_rgba(79,70,229,0.4)] disabled:opacity-30 disabled:shadow-none"
          >
            <CheckCircle2 className="mr-2 h-4 w-4" /> Finalize Marks
          </Button>
        </div>
      </div>
    </div>
  );
}
