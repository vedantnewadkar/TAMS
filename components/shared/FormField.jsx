"use client";

import React from "react";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

export const FormField = ({ label, error, required, children, className, helperText }) => {
  return (
    <div className={cn("space-y-2 w-full", className)}>
      <div className="flex items-center justify-between">
        <Label className="text-xs font-black uppercase tracking-widest text-zinc-400">
          {label}
          {required && <span className="text-rose-500 ml-1 font-bold">*</span>}
        </Label>
      </div>
      
      <div className="relative">
        {children}
      </div>

      {error ? (
        <p className="text-[10px] font-bold text-rose-500 uppercase tracking-widest animate-reveal">
          {error}
        </p>
      ) : helperText ? (
        <p className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest">
          {helperText}
        </p>
      ) : null}
    </div>
  );
};
