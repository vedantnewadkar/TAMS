import React from "react";
import { Loader2 } from "lucide-react";

export default function GlobalLoading() {
  return (
    <div className="fixed inset-0 bg-white/80 backdrop-blur-sm z-[9999] flex flex-col items-center justify-center space-y-4">
      <div className="relative">
        <div className="h-16 w-16 rounded-full border-4 border-zinc-100 border-t-indigo-600 animate-spin" />
        <Loader2 className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-6 w-6 text-indigo-600" />
      </div>
      <div className="flex flex-col items-center">
        <h2 className="text-lg font-bold text-zinc-900">TAMS</h2>
        <p className="text-xs text-zinc-500 font-medium tracking-widest uppercase">Initializing Neural Link...</p>
      </div>
    </div>
  );
}
