import { NextResponse } from "next/server";
import { students, mentors } from "@/lib/dummy-data";

/** GET /api/mentor/students — get mentor's assigned students */
export async function GET() {
  // Dr. Priya Sharma (M-101) has 18 students
  const mentorStudents = students.filter(s => s.mentorId === "M-101");
  return NextResponse.json({ students: mentorStudents, mentor: mentors[0] });
}
