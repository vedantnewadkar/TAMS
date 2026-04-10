"use client";

import React from "react";
import { Bell, Search, ChevronRight, LogOut, Settings, User as UserIcon } from "lucide-react";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem,
  DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";

const MOCK_NOTIFICATIONS = [
  { id: 1, title: "Low Attendance Alert", time: "2h ago", read: false },
  { id: 2, title: "Fee Payment Received", time: "3h ago", read: false },
  { id: 3, title: "CSV Import Complete", time: "Yesterday", read: true },
];

export const TopBar = ({ breadcrumbs = [] }) => {
  const { user, role, logout } = useAuth();
  const [showNotif, setShowNotif] = React.useState(false);
  const [notifications, setNotifs] = React.useState(MOCK_NOTIFICATIONS);
  const unread = notifications.filter(n => !n.read).length;

  const markAllRead = () => setNotifs(n => n.map(x => ({ ...x, read: true })));
  const initials = user?.name?.split(" ").map(w => w[0]).join("").slice(0, 2).toUpperCase() || "EC";

  return (
    <header className="h-14 fixed top-0 right-0 left-0 md:left-64 z-30 glass border-b border-white/5 flex items-center justify-between px-6">
      {/* Breadcrumbs */}
      <div className="flex items-center gap-2 overflow-hidden">
        <span className="text-xs font-bold text-zinc-600 uppercase tracking-widest">TAMS</span>
        <ChevronRight className="h-3.5 w-3.5 text-zinc-800 flex-shrink-0" />
        <span className="text-xs font-bold text-zinc-500 uppercase tracking-widest capitalize truncate">{role || "Dashboard"}</span>
        {breadcrumbs.map((item, idx) => (
          <React.Fragment key={item.name}>
            <ChevronRight className="h-3.5 w-3.5 text-zinc-800 flex-shrink-0" />
            <span className={`text-xs font-bold uppercase tracking-widest truncate ${item.current ? "text-indigo-400" : "text-zinc-500"}`}>
              {item.name}
            </span>
          </React.Fragment>
        ))}
      </div>

      {/* Right Side */}
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="sm" className="hidden lg:flex px-2 text-zinc-600 hover:text-white hover:bg-white/5">
          <Search className="h-4.5 w-4.5" />
        </Button>

        {/* Notifications */}
        <div className="relative">
          <button
            onClick={() => { setShowNotif(!showNotif); if (!showNotif) markAllRead(); }}
            className="relative w-9 h-9 glass rounded-xl border border-white/5 flex items-center justify-center hover:bg-white/10 hover:border-white/20 transition-all"
          >
            <Bell className="h-4.5 w-4.5 text-zinc-500 hover:text-indigo-400 transition-colors" />
            {unread > 0 && (
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-indigo-500 rounded-full shadow-[0_0_8px_rgba(79,70,229,0.8)]" />
            )}
          </button>

          {showNotif && (
            <div className="absolute right-0 top-12 w-80 glass border border-white/10 rounded-2xl shadow-2xl z-50 overflow-hidden">
              <div className="p-4 border-b border-white/5 flex items-center justify-between">
                <h4 className="text-xs font-black text-white uppercase tracking-widest">Notifications</h4>
                <button onClick={markAllRead} className="text-[10px] text-indigo-400 font-bold hover:text-indigo-300">Mark all read</button>
              </div>
              {notifications.map(n => (
                <div key={n.id} className={`p-4 border-b border-white/5 flex items-start gap-3 hover:bg-white/5 transition-all ${!n.read ? "bg-indigo-500/5" : ""}`}>
                  <div className="w-2 h-2 rounded-full mt-1.5 flex-shrink-0" style={{ background: n.read ? "transparent" : "#6366f1" }} />
                  <div>
                    <p className="text-xs font-bold text-white">{n.title}</p>
                    <p className="text-[10px] text-zinc-600 mt-0.5">{n.time}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* User menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div className="flex items-center gap-2.5 cursor-pointer group ml-1">
              <Avatar className="h-9 w-9 border border-white/10 group-hover:border-indigo-500/50 transition-colors flex-shrink-0">
                <AvatarFallback className="bg-indigo-600/20 text-indigo-400 text-xs font-black">{initials}</AvatarFallback>
              </Avatar>
              <div className="hidden lg:flex flex-col text-left">
                <span className="text-xs font-black text-white group-hover:text-indigo-400 transition-colors">{user?.name || "User"}</span>
                <span className="text-[10px] text-zinc-500 font-bold uppercase">{role}</span>
              </div>
            </div>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end" className="w-56 glass border-white/10 mt-2">
            <DropdownMenuLabel className="text-xs font-black uppercase tracking-widest text-zinc-400">
              {user?.name || "Account"}
            </DropdownMenuLabel>
            <DropdownMenuSeparator className="bg-white/5" />
            <DropdownMenuItem className="text-zinc-300 focus:bg-white/5 focus:text-white cursor-pointer py-2.5">
              <UserIcon className="mr-3 h-4 w-4" />
              <span className="font-bold text-sm">View Profile</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="text-zinc-300 focus:bg-white/5 focus:text-white cursor-pointer py-2.5">
              <Settings className="mr-3 h-4 w-4" />
              <span className="font-bold text-sm">Settings</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator className="bg-white/5" />
            <DropdownMenuItem onClick={logout}
              className="text-rose-400 focus:bg-rose-400/10 focus:text-rose-400 cursor-pointer py-2.5">
              <LogOut className="mr-3 h-4 w-4" />
              <span className="font-bold text-sm">Sign Out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};
