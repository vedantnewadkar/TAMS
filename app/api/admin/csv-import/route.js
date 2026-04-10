import { NextResponse } from "next/server";

/** POST /api/admin/csv-import — mock bulk import handler */
export async function POST(request) {
  try {
    const body = await request.json();
    const { fileName, rows = [] } = body;
    
    // Simulate processing with realistic results
    const success = rows.length > 0 ? rows.length - Math.floor(rows.length * 0.05) : 0;
    const failed  = rows.length - success;

    return NextResponse.json({
      success: true,
      fileName,
      total:   rows.length,
      success,
      failed,
      message: `Import complete. ${success} records processed.`,
    });
  } catch {
    return NextResponse.json({ success: true, total: 0, success: 0, failed: 0 });
  }
}

/** GET /api/admin/csv-import/history */
export async function GET() {
  return NextResponse.json({
    history: [
      { id: "IMP-001", file_name: "batch_ce2023.csv", imported_at: "2026-04-09T10:30:00Z", success_rows: 23, failed_rows: 2, imported_by: "Admin" },
      { id: "IMP-002", file_name: "staff_2024.csv",   imported_at: "2026-03-15T09:00:00Z", success_rows: 15, failed_rows: 0, imported_by: "Admin" },
    ]
  });
}
