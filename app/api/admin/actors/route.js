import { NextResponse } from "next/server";
import * as data from "@/lib/dummy-data";

/** GET /api/admin/actors?role=student|teacher|mentor|parent */
export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const role = searchParams.get("role") || "student";

  const map = {
    student: data.students,
    teacher: data.teachers,
    mentor:  data.mentors,
    parent:  data.parents,
  };

  return NextResponse.json({ actors: map[role] || [] });
}

/** POST /api/admin/actors — mock actor creation */
export async function POST(request) {
  try {
    const body = await request.json();
    const newActor = {
      id: `MOCK-${Date.now()}`,
      ...body,
      created_at: new Date().toISOString(),
    };
    return NextResponse.json({ success: true, actor: newActor });
  } catch {
    return NextResponse.json({ success: true, actor: {} });
  }
}
