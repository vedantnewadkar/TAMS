import { NextResponse } from "next/server";
import { students } from "@/lib/dummy-data";

/** GET /api/classes/[id]/students */
export async function GET(request, { params }) {
  const classStudents = students.filter(s => s.classId === params.id);
  return NextResponse.json({ students: classStudents, total: classStudents.length });
}
