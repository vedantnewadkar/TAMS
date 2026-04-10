"use client";

import React from "react";
import { MessageSquare, Send, User, ArrowLeft } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { db, fakeDelay } from "@/lib/local-db";
import { cn } from "@/lib/utils";

export default function MentorMessaging() {
  const [threads, setThreads]         = React.useState([]);
  const [selected, setSelected]       = React.useState(null);
  const [chatMessages, setChatMsgs]   = React.useState([]);
  const [newMsg, setNewMsg]           = React.useState("");
  const [sending, setSending]         = React.useState(false);
  const endRef = React.useRef(null);

  React.useEffect(() => {
    setThreads(db.messages.getAll());
  }, []);

  const openThread = async (thread) => {
    db.messages.markRead(thread.id);
    setSelected({ ...thread, isRead: true });
    // Simulate conversation history
    setChatMsgs([
      { id: 1, sender: thread.sender, content: thread.lastMessage, time: thread.timestamp, isOwn: false },
      { id: 2, sender: "Dr. Priya Sharma", content: "Thank you for reaching out. I'll look into this right away.", time: "Just now", isOwn: true },
    ]);
    setTimeout(() => endRef.current?.scrollIntoView({ behavior: "smooth" }), 100);
  };

  const sendMessage = async () => {
    if (!newMsg.trim() || !selected) return;
    setSending(true);
    const content = newMsg;
    setNewMsg("");
    await fakeDelay(400);
    const msg = { id: Date.now(), sender: "Dr. Priya Sharma", content, time: "Just now", isOwn: true };
    setChatMsgs(prev => [...prev, msg]);
    db.messages.reply(selected.id, content);
    setSending(false);
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const students = threads.filter(t => t.role === "Student");
  const parents  = threads.filter(t => t.role === "Parent");
  const unread   = threads.filter(t => !t.isRead).length;

  return (
    <div className="h-[calc(100vh-160px)] flex flex-col gap-6">
      <div className="flex items-center justify-between px-1">
        <div>
          <h1 className="text-4xl font-black tracking-tighter text-white">Messages</h1>
          <p className="text-zinc-500 mt-2 font-medium">
            {threads.length} conversations · {unread} unread
          </p>
        </div>
      </div>

      <div className="flex-grow flex gap-6 overflow-hidden">
        {/* Sidebar */}
        <div className="w-full md:w-[380px] flex flex-col gap-4 overflow-hidden">
          <Tabs defaultValue="students" className="flex flex-col h-full">
            <TabsList className="glass border-white/5 p-1 rounded-2xl h-[54px]">
              <TabsTrigger value="students" className="flex-grow rounded-xl font-black uppercase tracking-widest text-[10px] data-[state=active]:bg-indigo-600 data-[state=active]:text-white">
                Students ({students.length})
              </TabsTrigger>
              <TabsTrigger value="parents" className="flex-grow rounded-xl font-black uppercase tracking-widest text-[10px] data-[state=active]:bg-indigo-600 data-[state=active]:text-white">
                Parents ({parents.length})
              </TabsTrigger>
            </TabsList>

            <div className="flex-grow overflow-y-auto mt-4 space-y-3 pr-1">
              {[{ value: "students", list: students }, { value: "parents", list: parents }].map(({ value, list }) => (
                <TabsContent key={value} value={value} className="m-0 space-y-3 outline-none">
                  {list.length === 0 && (
                    <div className="text-center py-12 text-zinc-700 font-bold text-xs uppercase tracking-widest">No messages</div>
                  )}
                  {list.map(thread => (
                    <div key={thread.id} onClick={() => openThread(thread)}
                      className={cn(
                        "p-5 rounded-[1.5rem] border cursor-pointer transition-all",
                        selected?.id === thread.id ? "border-indigo-500/40 bg-indigo-500/10" : "glass border-white/5 hover:border-white/20"
                      )}>
                      <div className="flex justify-between items-start mb-2">
                        <div className="flex items-center gap-2">
                          <div className={cn("w-8 h-8 rounded-xl flex items-center justify-center",
                            selected?.id === thread.id ? "bg-indigo-500 text-white" : "bg-white/5 text-zinc-600")}>
                            <User className="h-4 w-4" />
                          </div>
                          <div>
                            <h4 className="text-sm font-black text-white">{thread.sender}</h4>
                            <p className="text-[9px] font-bold text-zinc-600 uppercase">{thread.relation}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          {!thread.isRead && <div className="w-2 h-2 rounded-full bg-indigo-400 shadow-[0_0_8px_rgba(99,102,241,0.8)]" />}
                          <span className="text-[9px] text-zinc-700">{thread.timestamp}</span>
                        </div>
                      </div>
                      <p className="text-[10px] font-bold text-indigo-400/80 uppercase tracking-tight mb-1">{thread.subject}</p>
                      <p className="text-xs text-zinc-500 line-clamp-2 leading-relaxed">{thread.lastMessage}</p>
                      <div className="mt-3 flex items-center justify-between">
                        <StatusBadge status={thread.status === "open" ? "pending" : "active"} />
                      </div>
                    </div>
                  ))}
                </TabsContent>
              ))}
            </div>
          </Tabs>
        </div>

        {/* Chat viewport */}
        <div className="hidden md:flex flex-grow glass rounded-[2.5rem] border border-white/5 flex-col overflow-hidden">
          {selected ? (
            <>
              <div className="p-5 border-b border-white/5 flex items-center gap-4 bg-zinc-900/30">
                <div className="w-11 h-11 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center">
                  <User className="h-5 w-5 text-indigo-400" />
                </div>
                <div>
                  <h3 className="font-black text-white">{selected.sender}</h3>
                  <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">{selected.relation} · {selected.subject}</p>
                </div>
                <StatusBadge status={selected.status === "open" ? "pending" : "active"} className="ml-auto" />
              </div>

              <div className="flex-grow overflow-y-auto p-8 space-y-5">
                {chatMessages.map(msg => (
                  <div key={msg.id} className={`flex ${msg.isOwn ? "justify-end" : "justify-start"}`}>
                    <div className={cn(
                      "p-5 rounded-[1.5rem] text-sm leading-relaxed max-w-[80%]",
                      msg.isOwn
                        ? "bg-indigo-600 text-white rounded-br-none shadow-[0_8px_24px_rgba(79,70,229,0.3)]"
                        : "glass border-white/5 text-zinc-300 rounded-tl-none"
                    )}>
                      {msg.content}
                      <div className={`text-[9px] font-bold uppercase mt-2 ${msg.isOwn ? "text-indigo-200/50" : "text-zinc-700"}`}>{msg.time}</div>
                    </div>
                  </div>
                ))}
                <div ref={endRef} />
              </div>

              <div className="p-5 border-t border-white/5">
                <div className="flex items-center gap-3">
                  <Input
                    value={newMsg}
                    onChange={e => setNewMsg(e.target.value)}
                    onKeyDown={e => e.key === "Enter" && sendMessage()}
                    placeholder="Type your reply..."
                    className="flex-grow h-14 glass border-white/5 rounded-2xl px-5 text-white focus:border-indigo-500/30"
                  />
                  <Button onClick={sendMessage} disabled={sending || !newMsg.trim()}
                    className="h-14 w-14 p-0 rounded-2xl bg-indigo-600 hover:bg-indigo-700 shadow-[0_0_20px_rgba(79,70,229,0.4)]">
                    <Send className="h-5 w-5" />
                  </Button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-grow flex flex-col items-center justify-center gap-4 text-center p-20">
              <div className="w-20 h-20 rounded-[2.5rem] bg-white/5 border border-white/10 flex items-center justify-center">
                <MessageSquare className="h-10 w-10 text-zinc-800" />
              </div>
              <h3 className="text-xl font-black text-white uppercase tracking-widest">Select a Conversation</h3>
              <p className="text-xs font-bold text-zinc-600 uppercase tracking-widest max-w-[200px]">Choose from the sidebar to start messaging</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
