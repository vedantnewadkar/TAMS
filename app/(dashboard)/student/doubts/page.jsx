"use client";

import React from "react";
import { Plus, MessageSquare, ChevronRight, History, CheckCircle2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SearchBar } from "@/components/shared/SearchBar";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { db, fakeDelay } from "@/lib/local-db";
import Link from "next/link";

export default function StudentDoubts() {
  const [doubts, setDoubts]     = React.useState([]);
  const [search, setSearch]     = React.useState("");
  const [filter, setFilter]     = React.useState("all");
  const [adding, setAdding]     = React.useState(false);
  const [newTitle, setNewTitle] = React.useState("");
  const [newSubj, setNewSubj]   = React.useState("");
  const [saving, setSaving]     = React.useState(false);

  React.useEffect(() => { setDoubts(db.doubts.getAll()); }, []);

  const filtered = doubts.filter(d => {
    const matchesSearch = !search || d.title.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filter === "all" || d.status === filter;
    return matchesSearch && matchesFilter;
  });

  const addDoubt = async () => {
    if (!newTitle.trim()) return;
    setSaving(true);
    await fakeDelay(600);
    const doubt = db.doubts.add({ title: newTitle, subject: newSubj || "General", unread: 0 });
    db.activities.add({ actor: "Arjun Patel", action: "Doubt Posted", details: `New doubt: "${newTitle}" posted for mentor review.` });
    setDoubts(db.doubts.getAll());
    setNewTitle(""); setNewSubj(""); setAdding(false);
    setSaving(false);
  };

  return (
    <div className="space-y-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl font-black tracking-tighter text-white">My Doubts</h1>
          <p className="text-zinc-500 mt-2 font-medium">Post academic questions for your mentor to review and answer.</p>
        </div>
        <Button onClick={() => setAdding(!adding)}
          className="rounded-2xl h-14 px-8 bg-indigo-600 hover:bg-indigo-700 text-white font-black uppercase tracking-widest text-xs group">
          <Plus className="mr-3 h-5 w-5 group-hover:rotate-90 transition-transform" />
          Raise New Doubt
        </Button>
      </div>

      {/* New doubt form */}
      {adding && (
        <div className="glass p-8 rounded-[2.5rem] border border-indigo-500/30 space-y-4 animate-in fade-in slide-in-from-top-2 duration-300">
          <h3 className="text-sm font-black text-white uppercase tracking-widest">New Doubt</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-[10px] font-black uppercase tracking-widest text-zinc-600">Doubt Title</label>
              <Input
                value={newTitle}
                onChange={e => setNewTitle(e.target.value)}
                placeholder="e.g. AVL Tree rotation confusion"
                className="h-12 glass border-white/10 text-white rounded-xl"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-[10px] font-black uppercase tracking-widest text-zinc-600">Subject</label>
              <Input
                value={newSubj}
                onChange={e => setNewSubj(e.target.value)}
                placeholder="e.g. Data Structures"
                className="h-12 glass border-white/10 text-white rounded-xl"
              />
            </div>
          </div>
          <div className="flex gap-3 justify-end">
            <Button variant="ghost" onClick={() => setAdding(false)}>Cancel</Button>
            <Button onClick={addDoubt} disabled={saving || !newTitle.trim()} className="bg-indigo-600 hover:bg-indigo-700">
              {saving ? "Posting..." : "Post Doubt"}
            </Button>
          </div>
        </div>
      )}

      {/* Filters */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 glass p-6 rounded-[2rem] border border-white/5">
        <SearchBar onChange={setSearch} placeholder="Search by subject or title..." />
        <div className="flex items-center gap-2 bg-white/5 p-1.5 rounded-2xl border border-white/5">
          {["all", "open", "resolved"].map(f => (
            <Button key={f} variant="ghost" onClick={() => setFilter(f)}
              className={`h-9 rounded-xl px-5 text-[9px] font-black uppercase tracking-widest transition-all ${filter === f ? "bg-indigo-600 text-white" : "text-zinc-600 hover:text-zinc-400"}`}>
              {f === "all" ? "All" : f === "open" ? "Open" : "Resolved"}
            </Button>
          ))}
        </div>
      </div>

      {/* Doubts grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map(doubt => (
          <Link key={doubt.id} href={`/student/doubts/${doubt.id}`}>
            <div className="glass p-7 rounded-[2.5rem] border border-white/5 hover:border-indigo-500/30 transition-all group h-full flex flex-col">
              <div className="flex items-start justify-between mb-6">
                <div className="w-11 h-11 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-center group-hover:scale-105 transition-transform">
                  <MessageSquare className="h-5 w-5 text-zinc-500 group-hover:text-indigo-400 transition-colors" />
                </div>
                <StatusBadge status={doubt.status === "open" ? "pending" : "paid"} />
              </div>

              <div className="space-y-2 mb-6 flex-grow">
                <p className="text-[10px] font-black uppercase tracking-widest text-indigo-400/70">{doubt.subject}</p>
                <h3 className="text-lg font-black text-white tracking-tight leading-tight group-hover:text-indigo-400 transition-colors">{doubt.title}</h3>
                {doubt.unread > 0 && (
                  <div className="flex items-center gap-1.5 text-rose-400">
                    <AlertCircle className="h-3 w-3" />
                    <span className="text-[9px] font-black uppercase tracking-widest">{doubt.unread} new reply</span>
                  </div>
                )}
              </div>

              <div className="pt-4 border-t border-white/5 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <History className="h-3 w-3 text-zinc-700" />
                  <span className="text-[9px] font-bold text-zinc-700 uppercase tracking-widest">{doubt.timestamp}</span>
                </div>
                {doubt.status === "resolved" && <CheckCircle2 className="h-4 w-4 text-emerald-500" />}
                {doubt.status === "open" && <ChevronRight className="h-4 w-4 text-zinc-700 group-hover:text-white transition-colors" />}
              </div>
            </div>
          </Link>
        ))}

        {/* Placeholder to add */}
        <button onClick={() => setAdding(true)}
          className="glass p-7 rounded-[2.5rem] border border-dashed border-white/10 flex flex-col items-center justify-center gap-5 hover:border-indigo-500/30 hover:bg-indigo-500/5 transition-all group min-h-[240px]">
          <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center group-hover:bg-indigo-500/10 transition-all">
            <Plus className="h-7 w-7 text-zinc-800 group-hover:text-indigo-400 transition-colors" />
          </div>
          <div className="text-center">
            <h3 className="text-sm font-black text-zinc-700 uppercase tracking-widest">New Doubt</h3>
            <p className="text-[10px] font-bold text-zinc-800 mt-1 max-w-[160px]">Click to post a question for your mentor</p>
          </div>
        </button>
      </div>
    </div>
  );
}
