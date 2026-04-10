"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  School,
  DollarSign,
  Upload,
  Calendar,
  FileText,
  GraduationCap,
  MessageSquare,
  HelpCircle,
  TrendingUp,
  User,
  ChevronRight
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

const navigation = {
  admin: [
    { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
    { name: "Actors", href: "/admin/actors", icon: Users },
    { name: "Classes", href: "/admin/classes", icon: School },
    { name: "Fees", href: "/admin/fees", icon: DollarSign },
    { name: "CSV Import", href: "/admin/import", icon: Upload },
  ],
  teacher: [
    { name: "Dashboard", href: "/teacher", icon: LayoutDashboard },
    { name: "Attendance", href: "/teacher/attendance", icon: Calendar },
    { name: "Tests", href: "/teacher/tests", icon: FileText },
    { name: "My Classes", href: "/teacher/classes", icon: School },
  ],
  mentor: [
    { name: "Dashboard", href: "/mentor", icon: LayoutDashboard },
    { name: "Students", href: "/mentor/students", icon: GraduationCap },
    { name: "Messages", href: "/mentor/messages", icon: MessageSquare },
  ],
  student: [
    { name: "Dashboard", href: "/student", icon: LayoutDashboard },
    { name: "Sync Stats", href: "/student/attendance", icon: TrendingUp },
    { name: "Signals", href: "/student/doubts", icon: MessageSquare },
    { name: "Profile", href: "/student/profile", icon: User },
  ],
  parent: [
    { name: "Overview", href: "/parent", icon: LayoutDashboard },
    { name: "Ward Progress", href: "/parent/attendance", icon: TrendingUp },
    { name: "Messages", href: "/parent/messages", icon: MessageSquare },
    { name: "Fee Details", href: "/parent/fees", icon: DollarSign },
  ],
};

export const Sidebar = ({ role = "admin" }) => {
  const pathname = usePathname();
  const links = navigation[role] || [];

  return (
    <aside className="w-64 h-screen glass border-r border-white/5 fixed left-0 top-0 z-40 hidden md:flex flex-col">
      {/* Sidebar Header */}
      <div className="h-14 flex items-center px-6 border-b border-white/5 gap-3">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center">
          <span className="text-white font-black text-sm">E</span>
        </div>
        <div className="flex flex-col">
          <span className="text-white font-black tracking-tighter text-sm uppercase leading-none">TAMS</span>
          <span className="text-[10px] text-indigo-400 font-bold uppercase tracking-widest leading-none mt-1">{role}</span>
        </div>
      </div>

      {/* Navigation Links */}
      <nav className="flex-grow p-4 space-y-2 mt-4">
        {links.map((link) => {
          const isActive = pathname === link.href;
          const Icon = link.icon;

          return (
            <Link
              key={link.name}
              href={link.href}
              className={cn(
                "flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-200 group font-bold tracking-tight text-sm",
                isActive
                  ? "bg-indigo-600/10 text-indigo-400 border border-indigo-500/20"
                  : "text-zinc-500 hover:text-white hover:bg-white/5 border border-transparent"
              )}
            >
              <div className="flex items-center gap-3">
                <Icon className={cn(
                  "h-5 w-5 transition-transform duration-300 group-hover:scale-110",
                  isActive ? "text-indigo-400" : "text-zinc-500 group-hover:text-white"
                )} />
                <span>{link.name}</span>
              </div>
              {isActive && <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 shadow-[0_0_10px_rgba(79,70,229,0.5)]" />}
            </Link>
          );
        })}
      </nav>

      {/* Sidebar Footer / Profile */}
      <div className="p-4 border-t border-white/5">
        <div className="glass p-3 rounded-xl flex items-center justify-between border border-white/5 hover:border-white/10 transition-colors group cursor-pointer">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-zinc-800 border border-white/10 overflow-hidden relative">
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-transparent" />
              <div className="flex items-center justify-center h-full text-zinc-500 text-xs font-bold">JD</div>
            </div>
            <div className="flex flex-col">
              <span className="text-xs font-black text-white group-hover:text-indigo-400 transition-colors">John Doe</span>
              <span className="text-[10px] text-zinc-500 font-bold uppercase">Mock User</span>
            </div>
          </div>
          <ChevronRight className="h-4 w-4 text-zinc-700 group-hover:text-white transition-colors" />
        </div>
      </div>
    </aside>
  );
};
