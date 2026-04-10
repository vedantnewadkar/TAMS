"use client";

import React from "react";
import { 
  FilePlus2, 
  Search, 
  FilterX, 
  ChevronRight,
  Target,
  FileText
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { SearchBar } from "@/components/shared/SearchBar";
import { FilterBar } from "@/components/shared/FilterBar";
import { TestCard } from "@/components/teacher/TestCard";
import { teacherTests } from "@/lib/dummy-data";

export default function TestsPage() {
  return (
    <div className="space-y-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl font-black tracking-tighter text-white">Evaluation Matrix</h1>
          <p className="text-zinc-500 mt-2 font-medium">Standardized assessment tracking and marking protocols.</p>
        </div>
        <Button className="rounded-2xl h-14 px-8 bg-indigo-600 hover:bg-indigo-700 text-white font-black uppercase tracking-widest text-xs group">
          <FilePlus2 className="mr-3 h-5 w-5 group-hover:scale-110 transition-transform" />
          Initialize New Evaluation
        </Button>
      </div>

      {/* Utilities */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 glass p-8 rounded-[2.5rem] border border-white/5">
        <SearchBar placeholder="Locate specific evaluation..." />
        <FilterBar 
          onReset={() => {}}
          filters={[
            { label: "Academic Group", options: [], placeholder: "All Groups" },
            { label: "Sync Status", options: [], placeholder: "All Status" }
          ]} 
        />
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {teacherTests.map((test) => (
          <TestCard 
            key={test.id} 
            test={test} 
            onEnterMarks={() => {}} 
          />
        ))}

        {/* Create CTA Card */}
        <div className="glass p-8 rounded-[2.5rem] border border-dashed border-white/10 flex flex-col items-center justify-center text-center space-y-6 group cursor-pointer hover:border-indigo-500/30 transition-all min-h-[400px]">
          <div className="w-20 h-20 rounded-full bg-white/5 border border-white/5 flex items-center justify-center group-hover:bg-indigo-500/10 group-hover:scale-110 transition-all">
            <FileText className="h-10 w-10 text-zinc-800 group-hover:text-indigo-400 transition-colors" />
          </div>
          <div>
            <h3 className="text-xl font-black text-white tracking-widest uppercase">New Module</h3>
            <p className="text-xs font-bold text-zinc-700 uppercase tracking-widest mt-2 max-w-[200px] leading-relaxed">
              Define a new academic assessment payload for assigned nodes.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
