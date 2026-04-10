import { NextResponse } from "next/server";
import { students, progressNotes, studentAttendanceLog } from "@/lib/dummy-data";

/** GET /api/mentor/students/[id] */
export async function GET(request, { params }) {
  const student = students.find(s => s.id === params.id) || students[0];
  const notes = (progressNotes || []).filter(n => n.studentId === student.id);
  return NextResponse.json({
    student,
    notes,
    attendance: studentAttendanceLog?.slice(0, 30) || [],
  });
}

/** POST /api/mentor/students/[id] — add progress note */
export async function POST(request, { params }) {
  try {
    const body = await request.json();
    const note = {
      id: Date.now(),
      studentId: params.id,
      date: new Date().toISOString().split("T")[0],
      rating: body.rating || 3,
      note: body.note || "",
      mentor: "Dr. Priya Sharma",
    };
    return NextResponse.json({ success: true, note });
  } catch {
    return NextResponse.json({ success: true });
  }
}
