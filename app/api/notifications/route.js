import { NextResponse } from "next/server";

/** GET /api/notifications */
export async function GET() {
  return NextResponse.json({
    notifications: [
      { id: 1, type: "alert",   title: "Low Attendance Alert",   message: "Karan Mehta (CE22A007) attendance dropped below 75%.", time: "2 hours ago", read: false },
      { id: 2, type: "info",    title: "Fee Payment Received",    message: "₹34,000 received from Rohan Kulkarni (CE22A005).", time: "3 hours ago", read: false },
      { id: 3, type: "success", title: "CSV Import Completed",    message: "23 students imported from batch_ce2023.csv.", time: "Yesterday", read: true },
      { id: 4, type: "info",    title: "New Doubt Posted",        message: "Ishaan Gupta posted a doubt in Data Structures.", time: "Yesterday", read: true },
      { id: 5, type: "alert",   title: "Fee Overdue",             message: "Siddharth Reddy (CE22B003) fee is now overdue.", time: "2 days ago", read: true },
    ]
  });
}

/** PATCH /api/notifications — mark read */
export async function PATCH() {
  return NextResponse.json({ success: true });
}
