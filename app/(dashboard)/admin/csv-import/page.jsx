"use client";

import React from "react";
import { CSVUploadDialog } from "@/components/admin/CSVUploadDialog";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/shared/DataTable";
import { Upload, Download, History, FileSpreadsheet, GraduationCap, Users, BookOpen } from "lucide-react";
import { StatusBadge } from "@/components/shared/StatusBadge";

const mockImportHistory = [
  {
    id: "IMP-001",
    file_name: "batch_ce2023.csv",
    imported_at: "2026-04-09T10:30:00Z",
    total_rows: 25,
    success_rows: 23,
    failed_rows: 2,
    imported_by: "Admin Kiran Desai",
  },
  {
    id: "IMP-002",
    file_name: "staff_2024.csv",
    imported_at: "2026-03-15T09:00:00Z",
    total_rows: 15,
    success_rows: 15,
    failed_rows: 0,
    imported_by: "Admin Kiran Desai",
  },
  {
    id: "IMP-003",
    file_name: "parents_batch1.csv",
    imported_at: "2026-02-20T11:15:00Z",
    total_rows: 30,
    success_rows: 28,
    failed_rows: 2,
    imported_by: "Admin Kiran Desai",
  },
];

export default function CSVImportPage() {
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);
  const [history, setHistory] = React.useState(mockImportHistory);

  const columns = [
    { key: "file_name", label: "File Name" },
    {
      key: "imported_at",
      label: "Date",
      render: (row) => new Date(row.imported_at).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })
    },
    { key: "imported_by", label: "Imported By" },
    {
      key: "success_rows",
      label: "Success",
      render: (row) => <span className="text-emerald-400 font-bold">{row.success_rows}</span>
    },
    {
      key: "failed_rows",
      label: "Failed",
      render: (row) => <span className={row.failed_rows > 0 ? "text-rose-400 font-bold" : "text-zinc-600"}>{row.failed_rows}</span>
    },
  ];

  const csvTemplates = [
    {
      label: "Students Template",
      description: "50 students · name, email, role, roll_number, branch, year...",
      file: "/csv/students_import.csv",
      icon: GraduationCap,
      color: "indigo",
    },
    {
      label: "Staff Template",
      description: "15 teachers + 8 mentors · name, email, role, department...",
      file: "/csv/staff_import.csv",
      icon: BookOpen,
      color: "violet",
    },
    {
      label: "Parents Template",
      description: "30 parents · name, email, role, ward_roll_number...",
      file: "/csv/parents_import.csv",
      icon: Users,
      color: "emerald",
    },
  ];

  return (
    <div className="space-y-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl font-black tracking-tighter text-white">CSV Bulk Import</h1>
          <p className="text-zinc-500 mt-2 font-medium">Import students, staff, and parents via structured CSV files.</p>
        </div>
        <Button
          onClick={() => setIsDialogOpen(true)}
          className="rounded-2xl h-14 px-8 bg-indigo-600 hover:bg-indigo-700 text-white font-black uppercase tracking-widest text-xs group"
        >
          <Upload className="mr-3 h-5 w-5 group-hover:-translate-y-0.5 transition-transform" />
          Upload CSV File
        </Button>
      </div>

      {/* Download Templates */}
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <FileSpreadsheet className="h-5 w-5 text-zinc-500" />
          <h2 className="text-sm font-black uppercase tracking-widest text-zinc-500">Download Sample CSV Files</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {csvTemplates.map(({ label, description, file, icon: Icon, color }) => (
            <a
              key={file}
              href={file}
              download
              className="glass p-6 rounded-2xl border border-white/5 hover:border-indigo-500/30 transition-all group flex flex-col gap-4"
            >
              <div className={`w-12 h-12 rounded-xl bg-${color}-500/10 border border-${color}-500/20 flex items-center justify-center group-hover:scale-105 transition-transform`}>
                <Icon className={`h-6 w-6 text-${color}-400`} />
              </div>
              <div>
                <p className="text-sm font-black text-white">{label}</p>
                <p className="text-[11px] text-zinc-600 mt-1">{description}</p>
              </div>
              <div className="flex items-center gap-2 text-xs text-indigo-400 font-bold mt-auto">
                <Download className="h-3.5 w-3.5" /> Download
              </div>
            </a>
          ))}
        </div>
      </div>

      {/* Format Info */}
      <div className="glass p-6 rounded-2xl border border-white/5">
        <h3 className="text-sm font-black text-white uppercase tracking-widest mb-4">Required CSV Format</h3>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div>
            <p className="text-xs font-bold text-zinc-500 uppercase tracking-wider mb-2">Students</p>
            <code className="block text-[11px] text-indigo-400 bg-white/5 p-3 rounded-xl leading-relaxed">
              name, email, role=student,<br />
              roll_number, branch, year,<br />
              division, phone, address, dob
            </code>
          </div>
          <div>
            <p className="text-xs font-bold text-zinc-500 uppercase tracking-wider mb-2">Staff (Teachers & Mentors)</p>
            <code className="block text-[11px] text-violet-400 bg-white/5 p-3 rounded-xl leading-relaxed">
              name, email, role,<br />
              department, employee_id,<br />
              phone, designation
            </code>
          </div>
          <div>
            <p className="text-xs font-bold text-zinc-500 uppercase tracking-wider mb-2">Parents</p>
            <code className="block text-[11px] text-emerald-400 bg-white/5 p-3 rounded-xl leading-relaxed">
              name, email, role=parent,<br />
              ward_roll_number, relation,<br />
              phone, address
            </code>
          </div>
        </div>
      </div>

      {/* Import History */}
      <div className="glass p-8 rounded-[2.5rem] border border-white/5 space-y-6">
        <div className="flex items-center gap-3 pb-4 border-b border-white/5">
          <History className="h-5 w-5 text-zinc-500" />
          <h2 className="text-sm font-black uppercase tracking-widest text-zinc-400">Import History</h2>
        </div>
        <DataTable columns={columns} data={history} />
      </div>

      <CSVUploadDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        onSuccess={(result) => {
          setHistory(prev => [{
            id: `IMP-${Date.now()}`,
            file_name: result?.fileName || "uploaded_file.csv",
            imported_at: new Date().toISOString(),
            total_rows: result?.total || 0,
            success_rows: result?.success || 0,
            failed_rows: result?.failed || 0,
            imported_by: "Admin Kiran Desai",
          }, ...prev]);
        }}
      />
    </div>
  );
}
