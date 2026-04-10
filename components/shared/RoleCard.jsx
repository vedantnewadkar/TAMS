import React from "react";
import { cn } from "@/lib/utils";

export const RoleCard = ({ icon: Icon, role, capabilities }) => {
  return (
    <div className="flex flex-col p-6 glass glass-hover rounded-3xl h-full border-white/5">
      <div className="w-12 h-12 rounded-xl bg-violet-600/20 flex items-center justify-center mb-6 border border-violet-500/20">
        <Icon className="h-6 w-6 text-violet-400" />
      </div>
      <h3 className="text-lg font-black text-white mb-4 tracking-tight uppercase">{role}</h3>
      <ul className="space-y-3">
        {capabilities.map((cap, index) => (
          <li key={index} className="text-sm text-zinc-500 flex items-start gap-3 font-medium">
            <span className="mt-2 w-1 h-1 rounded-full bg-indigo-500 flex-shrink-0 animate-pulse" />
            {cap}
          </li>
        ))}
      </ul>
    </div>
  );
};
