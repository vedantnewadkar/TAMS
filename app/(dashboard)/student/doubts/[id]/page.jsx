"use client";

import React from "react";
import { ChevronLeft, Send, User, CheckCircle2, MessageSquare } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { db, fakeDelay } from "@/lib/local-db";
import { cn } from "@/lib/utils";

const MENTOR_REPLY = [
  "Great question! Let me explain this in detail.",
  "I can see why this is confusing. Here's the key insight:",
  "This is a common point of confusion. The answer is:",
  "Good that you raised this. Here's what you need to understand:",
];

export default function DoubtThreadView() {
  const params = useParams();
  const router = useRouter();
  const [doubt, setDoubt]         = React.useState(null);
  const [messages, setMessages]   = React.useState([]);
  const [newMessage, setNewMessage] = React.useState("");
  const [sending, setSending]     = React.useState(false);
  const [resolved, setResolved]   = React.useState(false);
  const endRef = React.useRef(null);

  React.useEffect(() => {
    const all  = db.doubts.getAll();
    const found = all.find(d => d.id === params.id);
    setDoubt(found || { id: params.id, title: "Doubt Thread", subject: "General", status: "open" });
    setResolved(found?.status === "resolved");
    setMessages([
      {
        id: 1, isOwn: true,
        sender: "Arjun Patel", role: "student",
        content: found?.title || "I have a question about this topic.",
        time: found?.timestamp || "Earlier",
      },
      {
        id: 2, isOwn: false,
        sender: "Dr. Priya Sharma", role: "mentor",
        content: MENTOR_REPLY[Math.floor(Math.random() * MENTOR_REPLY.length)] + " " + (found?.title || ""),
        time: "Just now",
      },
    ]);
  }, [params.id]);

  const sendMessage = async () => {
    if (!newMessage.trim()) return;
    setSending(true);
    const content = newMessage;
    setNewMessage("");
    const userMsg = { id: Date.now(), isOwn: true, sender: "Arjun Patel", role: "student", content, time: "Just now" };
    setMessages(p => [...p, userMsg]);
    await fakeDelay(1000);
    const mentorReply = {
      id: Date.now() + 1, isOwn: false, sender: "Dr. Priya Sharma", role: "mentor",
      content: `Thank you for the clarification, Arjun. ${MENTOR_REPLY[Math.floor(Math.random() * MENTOR_REPLY.length)]}`,
      time: "Just now",
    };
    setMessages(p => [...p, mentorReply]);
    setSending(false);
    setTimeout(() => endRef.current?.scrollIntoView({ behavior: "smooth" }), 100);
  };

  const markResolved = () => {
    db.doubts.close(params.id);
    setDoubt(d => ({ ...d, status: "resolved" }));
    setResolved(true);
    db.activities.add({ actor: "Arjun Patel", action: "Doubt Resolved", details: `Doubt "${doubt?.title}" marked as resolved.` });
  };

  return (
    <div className="h-[calc(100vh-160px)] flex flex-col gap-6 max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <Button onClick={() => router.back()} variant="ghost"
            className="h-11 w-11 p-0 glass border-white/5 rounded-2xl text-zinc-400 hover:text-white">
            <ChevronLeft className="h-6 w-6" />
          </Button>
          <div>
            <h1 className="text-2xl font-black tracking-tighter text-white">{doubt?.title || "Doubt Thread"}</h1>
            <div className="flex items-center gap-2 mt-0.5">
              <span className="text-[10px] font-black uppercase tracking-widest text-indigo-400">{doubt?.subject}</span>
              <span className="text-zinc-800">·</span>
              <span className="text-[10px] font-black uppercase tracking-widest text-zinc-600">ID: {params.id}</span>
            </div>
          </div>
        </div>
        <StatusBadge status={resolved ? "paid" : "pending"} />
      </div>

      {/* Chat area */}
      <div className="flex-grow glass rounded-[2.5rem] border border-white/5 flex flex-col overflow-hidden">
        <div className="flex-grow overflow-y-auto p-8 space-y-8">
          {messages.map(msg => (
            <div key={msg.id} className={`flex w-full ${msg.isOwn ? "justify-end" : "justify-start"}`}>
              <div className={`flex gap-4 max-w-[80%] ${msg.isOwn ? "flex-row-reverse" : "flex-row"}`}>
                <div className={cn(
                  "w-10 h-10 rounded-xl flex-shrink-0 flex items-center justify-center border",
                  msg.isOwn ? "bg-indigo-600/10 border-indigo-500/20" : "bg-white/5 border-white/5"
                )}>
                  <User className={`h-5 w-5 ${msg.isOwn ? "text-indigo-400" : "text-zinc-500"}`} />
                </div>
                <div className="space-y-2">
                  <div className={cn(
                    "p-5 rounded-[1.5rem] text-sm leading-relaxed",
                    msg.isOwn
                      ? "bg-indigo-600 text-white rounded-tr-none shadow-[0_8px_24px_rgba(79,70,229,0.3)]"
                      : "glass border-white/5 text-zinc-300 rounded-tl-none"
                  )}>
                    {msg.content}
                  </div>
                  <div className={`text-[9px] font-black uppercase tracking-widest text-zinc-700 mx-2 ${msg.isOwn ? "text-right" : "text-left"}`}>
                    {msg.sender} · {msg.time}
                  </div>
                </div>
              </div>
            </div>
          ))}
          {sending && (
            <div className="flex justify-start">
              <div className="glass border-white/5 rounded-[1.5rem] rounded-tl-none p-5 flex items-center gap-2">
                <div className="flex gap-1">
                  {[0,1,2].map(i => (
                    <div key={i} className="w-2 h-2 bg-zinc-600 rounded-full animate-bounce" style={{ animationDelay: `${i * 150}ms` }} />
                  ))}
                </div>
                <span className="text-xs text-zinc-600 font-bold">Dr. Sharma is typing...</span>
              </div>
            </div>
          )}
          <div ref={endRef} />
        </div>

        {/* Input */}
        <div className="p-6 border-t border-white/5 space-y-3">
          {resolved ? (
            <div className="flex items-center justify-center gap-2 py-3 text-emerald-400">
              <CheckCircle2 className="h-5 w-5" />
              <span className="text-sm font-black uppercase tracking-widest">This doubt has been resolved</span>
            </div>
          ) : (
            <>
              <div className="flex items-center gap-3">
                <Input
                  value={newMessage}
                  onChange={e => setNewMessage(e.target.value)}
                  onKeyDown={e => e.key === "Enter" && sendMessage()}
                  placeholder="Type your follow-up question..."
                  className="flex-grow h-14 glass border-white/5 rounded-2xl px-5 text-white focus:border-indigo-500/30"
                />
                <Button onClick={sendMessage} disabled={sending || !newMessage.trim()}
                  className="h-14 w-14 p-0 rounded-2xl bg-indigo-600 hover:bg-indigo-700 shadow-[0_0_20px_rgba(79,70,229,0.4)]">
                  <Send className="h-5 w-5" />
                </Button>
              </div>
              <div className="flex justify-center">
                <Button variant="ghost" onClick={markResolved}
                  className="text-[9px] font-black uppercase tracking-widest text-zinc-700 hover:text-emerald-400 h-7 flex items-center gap-2">
                  <CheckCircle2 className="h-3.5 w-3.5" /> Mark as Resolved
                </Button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
