import { NextResponse } from "next/server";
import { messageThreads } from "@/lib/dummy-data";

/** GET /api/messages/threads */
export async function GET() {
  return NextResponse.json({ threads: messageThreads });
}

/** POST /api/messages/threads — new thread */
export async function POST(request) {
  try {
    const body = await request.json();
    const thread = {
      id:          `TH-${Date.now()}`,
      sender:      body.sender || "You",
      role:        body.role || "Student",
      subject:     body.subject || "New Message",
      lastMessage: body.message || body.lastMessage || "",
      timestamp:   "Just now",
      isRead:      false,
      status:      "open",
    };
    return NextResponse.json({ success: true, thread });
  } catch {
    return NextResponse.json({ success: true });
  }
}
