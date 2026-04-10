"use client";

import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader2, CheckCircle2, AlertCircle } from "lucide-react";
import { db, fakeDelay } from "@/lib/local-db";

export function AddActorDialog({ open, onOpenChange, onSuccess }) {
  const [form, setForm]       = React.useState({ fullName: "", email: "", role: "student", rollNo: "", year: "", dept: "" });
  const [isLoading, setLoad]  = React.useState(false);
  const [success, setSuccess] = React.useState(false);
  const [error, setError]     = React.useState("");

  const update = (k, v) => setForm(p => ({ ...p, [k]: v }));

  const reset = () => { setForm({ fullName: "", email: "", role: "student", rollNo: "", year: "", dept: "" }); setSuccess(false); setError(""); };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.fullName || !form.email) { setError("Name and email are required."); return; }
    setLoad(true); setError("");

    await fakeDelay(700);

    try {
      const mentors = db.mentors.getAll();
      const mentor  = mentors.find(m => m.studentCount < m.capacity) || mentors[0];

      if (form.role === "student") {
        db.students.add({
          name:       form.fullName,
          email:      form.email,
          rollNo:     form.rollNo || `GEN-${Date.now()}`,
          branch:     form.dept || "Computer Engineering",
          year:       Number(form.year) || 1,
          division:   "A",
          class:      `${form.year || 1}-A`,
          attendance: 0,
          fees:       "pending",
          phone:      "",
          mentorId:   mentor?.id || null,
          mentor:     mentor?.name || "To be assigned",
          isActive:   true,
        });
      } else if (form.role === "teacher") {
        db.teachers.add({
          name:        form.fullName,
          email:       form.email,
          employeeId:  `EMP-${Date.now()}`,
          department:  form.dept || "Computer Engineering",
          subjects:    [],
          classes:     0,
        });
      }

      // Log activity
      db.activities.add({
        actor:   "Admin",
        action:  "Actor Added",
        details: `${form.role.charAt(0).toUpperCase() + form.role.slice(1)} ${form.fullName} added to the system.`,
      });

      setSuccess(true);
      if (onSuccess) onSuccess();
      setTimeout(() => { reset(); onOpenChange(false); }, 1400);
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoad(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={v => { if (!v) reset(); onOpenChange(v); }}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Add New Actor</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 py-2">
          {error && (
            <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 flex items-center gap-2 text-xs text-rose-400">
              <AlertCircle className="h-4 w-4 flex-shrink-0" /> {error}
            </div>
          )}
          {success && (
            <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center gap-2 text-xs text-emerald-400">
              <CheckCircle2 className="h-4 w-4" /> Actor added successfully!
            </div>
          )}

          <div className="space-y-1.5">
            <Label>Full Name</Label>
            <Input required placeholder="e.g. Rajesh Kumar" value={form.fullName} onChange={e => update("fullName", e.target.value)} />
          </div>

          <div className="space-y-1.5">
            <Label>Email Address</Label>
            <Input required type="email" placeholder="e.g. rajesh@rait.edu" value={form.email} onChange={e => update("email", e.target.value)} />
          </div>

          <div className="space-y-1.5">
            <Label>Role</Label>
            <Select value={form.role} onValueChange={v => update("role", v)}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="student">Student</SelectItem>
                <SelectItem value="teacher">Teacher</SelectItem>
                <SelectItem value="mentor">Mentor</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {form.role === "student" && (
            <>
              <div className="space-y-1.5">
                <Label>Roll Number</Label>
                <Input placeholder="e.g. CE24A051" value={form.rollNo} onChange={e => update("rollNo", e.target.value.toUpperCase())} />
              </div>
              <div className="space-y-1.5">
                <Label>Year of Study</Label>
                <Select value={form.year} onValueChange={v => update("year", v)}>
                  <SelectTrigger><SelectValue placeholder="Select year" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">First Year</SelectItem>
                    <SelectItem value="2">Second Year</SelectItem>
                    <SelectItem value="3">Third Year</SelectItem>
                    <SelectItem value="4">Fourth Year</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </>
          )}

          <div className="space-y-1.5">
            <Label>Department / Branch</Label>
            <Select value={form.dept} onValueChange={v => update("dept", v)}>
              <SelectTrigger><SelectValue placeholder="Select department" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="Computer Engineering">Computer Engineering</SelectItem>
                <SelectItem value="Information Technology">Information Technology</SelectItem>
                <SelectItem value="Mechanical Engineering">Mechanical Engineering</SelectItem>
                <SelectItem value="Electrical Engineering">Electrical Engineering</SelectItem>
                <SelectItem value="Electronics & Telecomm">Electronics & Telecomm</SelectItem>
                <SelectItem value="Artificial Intelligence">Artificial Intelligence</SelectItem>
                <SelectItem value="Civil Engineering">Civil Engineering</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <DialogFooter className="pt-4">
            <Button type="button" variant="ghost" onClick={() => { reset(); onOpenChange(false); }}>Cancel</Button>
            <Button type="submit" disabled={isLoading || success} className="bg-indigo-600 hover:bg-indigo-700">
              {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : success ? <CheckCircle2 className="mr-2 h-4 w-4" /> : null}
              {success ? "Added!" : isLoading ? "Adding..." : "Add Actor"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
