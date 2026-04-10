import { NextResponse } from "next/server";
import { students, teachers, mentors, parents, classes, feeRecords } from "@/lib/dummy-data";

/** GET /api/admin/stats */
export async function GET() {
  const pendingFees = (feeRecords || []).filter(f => f.status === "pending" || f.status === "overdue").length;
  return NextResponse.json({
    stats: {
      students: students.length,
      teachers: teachers.length,
      mentors:  mentors.length,
      parents:  parents.length,
      classes:  classes.length,
      branches: 8,
      pendingFees,
      infrastructure: 97,
    }
  });
}
