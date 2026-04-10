import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";

/**
 * [GET] /api/admin/csv-import/history
 * Fetch past CSV import logs for oversight.
 */
export async function GET() {
  try {
    const supabase = createAdminClient();
    if (!supabase) return NextResponse.json([], { status: 500 });

    const { data, error } = await supabase
      .from('csv_import_logs')
      .select('*')
      .order('imported_at', { ascending: false });

    if (error) throw error;
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
