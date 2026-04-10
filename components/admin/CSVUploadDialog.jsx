"use client";

import React from "react";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { parseCSV } from "@/lib/csv-parser";
import { Upload, FileText, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import { db, fakeDelay } from "@/lib/local-db";

export function CSVUploadDialog({ open, onOpenChange, onSuccess }) {
  const [file, setFile]             = React.useState(null);
  const [previewData, setPreview]   = React.useState([]);
  const [isProcessing, setProc]     = React.useState(false);
  const [results, setResults]       = React.useState(null);

  const handleFile = async (e) => {
    const f = e.target.files[0];
    if (!f) return;
    setFile(f);
    try {
      const rows = await parseCSV(f);
      setPreview(rows.slice(0, 5));
    } catch {
      setPreview([]);
    }
  };

  const handleUpload = async () => {
    if (!file) return;
    setProc(true);
    await fakeDelay(1200);  // simulate processing time

    try {
      const rows = await parseCSV(file);
      let success = 0;
      let failed  = 0;

      // Fake "import" — add rows to local DB
      rows.forEach(row => {
        try {
          const role = (row.role || "student").toLowerCase();
          if (role === "student") {
            db.students.add({
              name:           row.name || row.full_name,
              email:          row.email,
              rollNo:         row.roll_number,
              branch:         row.branch || "Computer Engineering",
              year:           Number(row.year) || 1,
              division:       row.division || "A",
              class:          `${row.year || 1}-${row.division || "A"}`,
              attendance:     0,
              fees:           "pending",
              phone:          row.phone || "",
              mentorId:       null,
              mentor:         "To be assigned",
              isActive:       true,
            });
          }
          success++;
        } catch {
          failed++;
        }
      });

      const result = {
        fileName: file.name,
        total:    rows.length,
        success,
        failed,
      };

      setResults(result);
      if (onSuccess) onSuccess(result);
    } catch {
      setResults({ total: 0, success: 0, failed: 0, fileName: file.name });
    } finally {
      setProc(false);
    }
  };

  const reset = () => { setFile(null); setPreview([]); setResults(null); };

  return (
    <Dialog open={open} onOpenChange={v => { if (!v) reset(); onOpenChange(v); }}>
      <DialogContent className="max-w-xl">
        <DialogHeader>
          <DialogTitle>Bulk CSV Import</DialogTitle>
          <DialogDescription>Upload a CSV to bulk-enroll students, teachers, or parents.</DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {!file ? (
            <label
              htmlFor="csv-input"
              className="border-2 border-dashed border-white/10 rounded-2xl p-10 flex flex-col items-center justify-center gap-3 hover:border-indigo-500/40 hover:bg-indigo-500/5 transition-all cursor-pointer"
            >
              <Upload className="h-10 w-10 text-zinc-600" />
              <p className="text-sm text-zinc-500 font-medium">Click to upload CSV file</p>
              <p className="text-xs text-zinc-700">Use the template files from the download section above</p>
              <input id="csv-input" type="file" accept=".csv" className="hidden" onChange={handleFile} />
            </label>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-white/5 rounded-xl border border-white/10">
                <div className="flex items-center gap-3">
                  <FileText className="h-5 w-5 text-indigo-400" />
                  <span className="text-sm font-medium text-white">{file.name}</span>
                  <span className="text-xs text-zinc-600">{previewData.length}+ rows detected</span>
                </div>
                <Button variant="ghost" size="sm" onClick={reset} className="text-zinc-500 hover:text-white">Change</Button>
              </div>

              {previewData.length > 0 && !results && (
                <div className="border border-white/10 rounded-xl overflow-hidden">
                  <table className="w-full text-xs">
                    <thead className="bg-white/5 border-b border-white/10">
                      <tr>
                        {Object.keys(previewData[0]).slice(0, 4).map(k => (
                          <th key={k} className="px-3 py-2 text-left font-bold text-zinc-500 uppercase tracking-wider">{k}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {previewData.map((row, i) => (
                        <tr key={i} className="border-b border-white/5 last:border-0">
                          {Object.values(row).slice(0, 4).map((v, j) => (
                            <td key={j} className="px-3 py-2 text-zinc-400 truncate max-w-[120px]">{String(v)}</td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <p className="p-2 text-center text-[10px] text-zinc-700">Preview of first {previewData.length} rows</p>
                </div>
              )}

              {results && (
                <div className="p-5 bg-emerald-500/5 border border-emerald-500/20 rounded-2xl space-y-4">
                  <div className="flex items-center gap-2 text-emerald-400">
                    <CheckCircle2 className="h-5 w-5" />
                    <span className="font-bold">Import Successful!</span>
                  </div>
                  <div className="grid grid-cols-3 gap-3">
                    <div className="p-3 bg-white/5 rounded-xl text-center">
                      <p className="text-2xl font-black text-white">{results.total}</p>
                      <p className="text-[10px] text-zinc-600 font-bold uppercase">Total Rows</p>
                    </div>
                    <div className="p-3 bg-emerald-500/10 rounded-xl text-center">
                      <p className="text-2xl font-black text-emerald-400">{results.success}</p>
                      <p className="text-[10px] text-zinc-600 font-bold uppercase">Imported</p>
                    </div>
                    <div className="p-3 bg-rose-500/10 rounded-xl text-center">
                      <p className="text-2xl font-black text-rose-400">{results.failed}</p>
                      <p className="text-[10px] text-zinc-600 font-bold uppercase">Failed</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        <DialogFooter>
          <Button variant="ghost" onClick={() => onOpenChange(false)}>Cancel</Button>
          {!results && (
            <Button
              className="bg-indigo-600 hover:bg-indigo-700"
              disabled={!file || isProcessing}
              onClick={handleUpload}
            >
              {isProcessing ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Processing...</> : "Import Now"}
            </Button>
          )}
          {results && (
            <Button className="bg-emerald-600 hover:bg-emerald-700" onClick={() => { onOpenChange(false); reset(); }}>
              Done ✓
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
