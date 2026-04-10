"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { RotateCcw } from "lucide-react";
import { cn } from "@/lib/utils";

export const FilterBar = ({ filters = [], onReset, className }) => {
  return (
    <div className={cn("flex flex-wrap items-center gap-4", className)}>
      {filters.map((filter) => (
        <div key={filter.label} className="min-w-[150px] space-y-2">
          <label className="text-[10px] font-black uppercase tracking-widest text-zinc-600 block px-1">
            {filter.label}
          </label>
          <Select onValueChange={filter.onChange} value={filter.value}>
            <SelectTrigger className="glass border-white/5 rounded-xl h-10 font-bold text-xs uppercase tracking-widest">
              <SelectValue placeholder={filter.placeholder} />
            </SelectTrigger>
            <SelectContent className="glass border-white/10">
              {filter.options.map((opt) => (
                <SelectItem 
                  key={opt.value} 
                  value={opt.value}
                  className="font-bold text-xs uppercase tracking-widest text-zinc-400 focus:text-white"
                >
                  {opt.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      ))}

      {onReset && (
        <div className="pt-6">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={onReset}
            className="h-10 px-4 glass border-white/5 text-zinc-500 hover:text-white"
          >
            <RotateCcw className="mr-2 h-4 w-4" />
            <span className="font-bold text-xs uppercase tracking-widest leading-none mt-0.5">Reset</span>
          </Button>
        </div>
      )}
    </div>
  );
};
