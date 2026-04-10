import React from "react";
import { cn } from "@/lib/utils";

export const FeatureCard = ({ icon: Icon, title, description }) => {
  return (
    <div className="flex flex-col p-8 glass glass-hover rounded-[2rem] group h-full">
      <div className="w-14 h-14 rounded-2xl bg-indigo-600/20 flex items-center justify-center mb-8 border border-indigo-500/20 group-hover:bg-indigo-600 group-hover:scale-110 transition-all duration-500">
        <Icon className="h-7 w-7 text-indigo-400 group-hover:text-white transition-colors" />
      </div>
      <h3 className="text-xl font-black text-white mb-3 tracking-tight">{title}</h3>
      <p className="text-zinc-500 font-medium leading-relaxed">{description}</p>
    </div>
  );
};
