"use client";

import React from "react";
import { 
  School, 
  MapPin, 
  Layers, 
  BookMarked,
  Plus
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DataTable } from "@/components/shared/DataTable";
import { Button } from "@/components/ui/button";
import { 
  branches, 
  classes 
} from "@/lib/dummy-data";

export default function AcademicStructure() {
  const branchColumns = [
    { key: "code", label: "Sector Code", sortable: true },
    { key: "name", label: "Sector Name", sortable: true },
    { key: "totalClasses", label: "Group Count" },
    { key: "totalStudents", label: "Node Population", sortable: true },
  ];

  const classColumns = [
    { key: "id", label: "Identity", sortable: true },
    { key: "branch", label: "Sector", sortable: true },
    { key: "year", label: "Cycle Level" },
    { key: "division", label: "Segment" },
    { key: "studentCount", label: "Population" },
    { key: "teacher", label: "Lead Supervisor" },
  ];

  return (
    <div className="space-y-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl font-black tracking-tighter text-white">Academic Architecture</h1>
          <p className="text-zinc-500 mt-2 font-medium">Topological management of university sectors and logical groupings.</p>
        </div>
        <div className="flex gap-4">
          <Button variant="ghost" className="rounded-2xl h-14 px-6 glass border-white/5 text-zinc-400 hover:text-white font-black uppercase tracking-widest text-[10px]">
            <Plus className="mr-2 h-4 w-4" /> Add Sector
          </Button>
          <Button className="rounded-2xl h-14 px-8 bg-indigo-600 hover:bg-indigo-700 text-white font-black uppercase tracking-widest text-xs group">
            <Layers className="mr-3 h-5 w-5 group-hover:scale-110 transition-transform" />
            Define Group
          </Button>
        </div>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="classes" className="space-y-8">
        <TabsList className="glass border-white/5 p-1 rounded-2xl h-auto flex-wrap">
          <TabsTrigger value="branches" className="rounded-xl px-6 py-3 font-black uppercase tracking-widest text-[10px] data-[state=active]:bg-indigo-600 data-[state=active]:text-white">
            <MapPin className="mr-2 h-4 w-4" /> Sectors (Branches)
          </TabsTrigger>
          <TabsTrigger value="classes" className="rounded-xl px-6 py-3 font-black uppercase tracking-widest text-[10px] data-[state=active]:bg-indigo-600 data-[state=active]:text-white">
            <School className="mr-2 h-4 w-4" /> Groups (Classes)
          </TabsTrigger>
          <TabsTrigger value="subjects" className="rounded-xl px-6 py-3 font-black uppercase tracking-widest text-[10px] data-[state=active]:bg-indigo-600 data-[state=active]:text-white">
            <BookMarked className="mr-2 h-4 w-4" /> Payloads (Subjects)
          </TabsTrigger>
        </TabsList>

        <div className="glass p-8 rounded-[2.5rem] border border-white/5">
          <TabsContent value="branches" className="mt-0 outline-none">
            <DataTable columns={branchColumns} data={branches} />
          </TabsContent>

          <TabsContent value="classes" className="mt-0 outline-none">
            <DataTable columns={classColumns} data={classes} />
          </TabsContent>
          
          <TabsContent value="subjects" className="text-center py-24 outline-none">
            <BookMarked className="h-12 w-12 text-zinc-800 mx-auto mb-4" />
            <h3 className="text-zinc-600 font-black uppercase tracking-widest text-sm">Payload Matrix Initializing</h3>
            <p className="text-zinc-700 mt-2 font-bold text-xs uppercase tracking-tight">Academic payloads are being mapped to sectors.</p>
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
}
