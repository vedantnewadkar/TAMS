"use client";

import React from "react";
import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

export const SearchBar = ({ onChange, placeholder = "Search nodes...", className }) => {
  const [value, setValue] = React.useState("");

  React.useEffect(() => {
    const timer = setTimeout(() => {
      if (onChange) onChange(value);
    }, 300);
    return () => clearTimeout(timer);
  }, [value, onChange]);

  return (
    <div className={cn("relative w-full max-w-md group", className)}>
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-600 group-focus-within:text-indigo-400 transition-colors" />
      <Input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={placeholder}
        className="pl-10 pr-10 glass border-white/5 focus:border-indigo-500/50 rounded-xl h-11 font-bold text-sm tracking-tight placeholder:text-zinc-600"
      />
      {value && (
        <button 
          onClick={() => setValue("")}
          className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-600 hover:text-white transition-colors"
        >
          <X className="h-4 w-4" />
        </button>
      )}
    </div>
  );
};
