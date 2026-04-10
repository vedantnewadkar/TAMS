import { NextResponse } from "next/server";
import { students, studentAttendanceLog, studentTestScores, arjunFees } from "@/lib/dummy-data";

/** GET /api/student/summary */
export async function GET() {
  const student = students[0]; // Arjun Patel — demo student
  return NextResponse.json({
    student,
    attendance:  studentAttendanceLog?.slice(0, 30) || [],
    testScores:  studentTestScores || [],
    fees:        arjunFees || {},
  });
}
