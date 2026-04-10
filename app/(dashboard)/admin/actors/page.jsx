"use client";

import React from "react";
import { GraduationCap, BookOpen, Heart, Users, UserPlus } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DataTable } from "@/components/shared/DataTable";
import { SearchBar } from "@/components/shared/SearchBar";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { Button } from "@/components/ui/button";
import { AddActorDialog } from "@/components/admin/AddActorDialog";
import { db } from "@/lib/local-db";

export default function ActorManagement() {
  const [activeTab, setActiveTab] = React.useState("students");
  const [search, setSearch]       = React.useState("");
  const [dialogOpen, setDialog]   = React.useState(false);
  const [students, setStudents]   = React.useState([]);
  const [teachers, setTeachers]   = React.useState([]);
  const [mentors,  setMentors]    = React.useState([]);
  const [parents,  setParents]    = React.useState([]);

  const reload = React.useCallback(() => {
    setStudents(db.students.getAll());
    setTeachers(db.teachers.getAll());
    setMentors(db.mentors.getAll());
    setParents(db.parents.getAll());
  }, []);

  React.useEffect(() => { reload(); }, [reload]);

  const filter = (arr) => {
    if (!search.trim()) return arr;
    const t = search.toLowerCase();
    return arr.filter(item =>
      Object.values(item).some(v => String(v).toLowerCase().includes(t))
    );
  };

  const studentCols = [
    { key: "rollNo",     label: "Roll No.",  sortable: true },
    { key: "name",       label: "Name",      sortable: true },
    { key: "branch",     label: "Branch" },
    { key: "year",       label: "Year", render: r => `Year ${r.year} - ${r.division}` },
    { key: "mentor",     label: "Mentor" },
    { key: "attendance", label: "Attendance", render: r => `${r.attendance}%` },
    { key: "fees",       label: "Fees",  render: r => <StatusBadge status={r.fees} /> },
  ];

  const teacherCols = [
    { key: "employeeId", label: "EMP ID", sortable: true },
    { key: "name",       label: "Name",   sortable: true },
    { key: "department", label: "Department" },
    { key: "subjects",   label: "Subjects", render: r => (r.subjects || []).join(", ") },
    { key: "classes",    label: "Classes",  render: r => `${r.classes || 0}` },
  ];

  const mentorCols = [
    { key: "employeeId",   label: "ID",         sortable: true },
    { key: "name",         label: "Name",       sortable: true },
    { key: "department",   label: "Department" },
    { key: "studentCount", label: "Students",   render: r => (
      <div className="flex items-center gap-2">
        <span>{r.studentCount}/{r.capacity}</span>
        <div className="w-16 h-1.5 bg-white/10 rounded-full">
          <div className="h-full bg-indigo-500 rounded-full" style={{ width: `${(r.studentCount/r.capacity)*100}%` }} />
        </div>
      </div>
    )},
  ];

  const parentCols = [
    { key: "name",       label: "Parent Name", sortable: true },
    { key: "wardName",   label: "Ward Name" },
    { key: "wardRollNo", label: "Ward Roll No." },
    { key: "relation",   label: "Relation" },
    { key: "phone",      label: "Phone" },
  ];

  const tabs = [
    { value: "students", label: "Students",  icon: GraduationCap, count: students.length, cols: studentCols, data: filter(students) },
    { value: "teachers", label: "Teachers",  icon: BookOpen,      count: teachers.length, cols: teacherCols, data: filter(teachers) },
    { value: "mentors",  label: "Mentors",   icon: Heart,         count: mentors.length,  cols: mentorCols,  data: filter(mentors)  },
    { value: "parents",  label: "Parents",   icon: Users,         count: parents.length,  cols: parentCols,  data: filter(parents)  },
  ];

  return (
    <div className="space-y-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl font-black tracking-tighter text-white">Manage Actors</h1>
          <p className="text-zinc-500 mt-2 font-medium">Students, teachers, mentors, and parents across all departments.</p>
        </div>
        <Button
          onClick={() => setDialog(true)}
          className="rounded-2xl h-14 px-8 bg-indigo-600 hover:bg-indigo-700 text-white font-black uppercase tracking-widest text-xs group"
        >
          <UserPlus className="mr-3 h-5 w-5 group-hover:scale-110 transition-transform" />
          Add New Actor
        </Button>
      </div>

      <AddActorDialog
        open={dialogOpen}
        onOpenChange={setDialog}
        onSuccess={() => reload()}
      />

      <Tabs defaultValue="students" onValueChange={v => { setActiveTab(v); setSearch(""); }} className="space-y-8">
        <TabsList className="glass border-white/5 p-1 rounded-2xl h-auto flex-wrap">
          {tabs.map(({ value, label, icon: Icon, count }) => (
            <TabsTrigger
              key={value}
              value={value}
              className="rounded-xl px-6 py-3 font-black uppercase tracking-widest text-[10px] data-[state=active]:bg-indigo-600 data-[state=active]:text-white"
            >
              <Icon className="mr-2 h-4 w-4" /> {label} ({count})
            </TabsTrigger>
          ))}
        </TabsList>

        <div className="glass p-8 rounded-[2.5rem] border border-white/5 min-h-[400px]">
          {tabs.map(({ value, cols, data }) => (
            <TabsContent key={value} value={value} className="space-y-6 mt-0 outline-none">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-white/5">
                <SearchBar onChange={setSearch} placeholder={`Search ${value}...`} />
                <span className="text-xs text-zinc-600">{data.length} results</span>
              </div>
              <DataTable columns={cols} data={data} />
            </TabsContent>
          ))}
        </div>
      </Tabs>
    </div>
  );
}
