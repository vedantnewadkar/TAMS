import { NextResponse } from "next/server";
import { students, arjunFees, parentProfile } from "@/lib/dummy-data";

/** GET /api/parent/ward/summary */
export async function GET() {
  const ward = students.find(s => s.rollNo === "CE22A001") || students[0];
  return NextResponse.json({
    ward,
    fees:    arjunFees || {},
    parent:  parentProfile,
  });
}
