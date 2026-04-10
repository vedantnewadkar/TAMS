import { NextResponse } from "next/server";
import { messageThreads } from "@/lib/dummy-data";

/** GET /api/messages/threads/[id] */
export async function GET(request, { params }) {
  const thread = messageThreads.find(t => t.id === params.id) || messageThreads[0];
  return NextResponse.json({
    thread,
    messages: [
      { id: 1, sender: thread?.sender || "User", content: thread?.lastMessage || "Hello", time: thread?.timestamp || "Recently", isOwn: false },
      { id: 2, sender: "You", content: "Thank you for reaching out. I'll look into this.", time: "Just now", isOwn: true },
    ]
  });
}

/** POST /api/messages/threads/[id] — reply */
export async function POST(request, { params }) {
  try {
    const body = await request.json();
    return NextResponse.json({
      success: true,
      message: { id: Date.now(), sender: "You", content: body.content, time: "Just now", isOwn: true }
    });
  } catch {
    return NextResponse.json({ success: true });
  }
}
