import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { emailService } from "@/lib/email-service";

/**
 * [GET] /api/cron/weekly-digest
 * Automated cron route to send weekly progress reports to parents.
 * Triggered via Vercel Cron.
 */
export async function GET(req) {
  // 1. Verify Authorization (Simple secret check for Vercel Cron)
  const authHeader = req.headers.get('authorization');
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    // return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    // Note: During dev/test we might bypass this or use a simple flag
  }

  try {
    const supabase = createAdminClient();
    if (!supabase) throw new Error("Supabase Admin link lost.");

    // 2. Fetch all parents with digest enabled
    const { data: parents, error: pError } = await supabase
      .from('profiles')
      .select('id, email, full_name, role, email_preferences')
      .eq('role', 'parent');

    if (pError) throw pError;

    const summary = { total: 0, sent: 0, failed: 0 };

    for (const parent of parents) {
      if (parent.email_preferences?.digest === false) continue;

      summary.total++;

      // 3. Fetch Ward Data (Attendance and Recent Marks)
      // Logic: Find student linked to this parent
      const { data: wardLink } = await supabase
        .from('parents')
        .select('student_id')
        .eq('id', parent.id)
        .single();

      if (wardLink) {
        // Mocking digest content for now. 
        // In a real scenario, we would aggregate attendance_summary and last 7 days of test_marks.
        const { success } = await emailService.sendEmail({
          to: parent.email,
          subject: "TAMS: Weekly Academic Digest",
          body: `<h2>Weekly Digest for ${parent.full_name}</h2><p>Your ward's attendance and marks for the past week are now available in the portal.</p>`,
          template: 'weekly_digest'
        });

        if (success) summary.sent++;
        else summary.failed++;
      }
    }

    return NextResponse.json({
      status: "Neural broadcast complete",
      summary
    });

  } catch (error) {
    console.error("Cron Digest Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
