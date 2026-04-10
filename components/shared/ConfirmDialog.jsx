"use client";

import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { AlertTriangle, Info } from "lucide-react";
import { cn } from "@/lib/utils";

export const ConfirmDialog = ({ 
  open, 
  onClose, 
  onConfirm, 
  title, 
  description, 
  confirmText = "Confirm Action", 
  variant = "default" 
}) => {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="glass border-white/10 sm:max-w-[425px]">
        <DialogHeader className="pt-4 items-center sm:items-start">
          <div className={cn(
            "w-12 h-12 rounded-2xl flex items-center justify-center mb-4",
            variant === "destructive" ? "bg-rose-500/10 text-rose-400" : "bg-indigo-500/10 text-indigo-400"
          )}>
            {variant === "destructive" ? <AlertTriangle className="h-6 w-6" /> : <Info className="h-6 w-6" />}
          </div>
          <DialogTitle className="text-xl font-black text-white tracking-tight">{title}</DialogTitle>
          <DialogDescription className="text-zinc-500 font-medium py-2">
            {description}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="gap-2 sm:gap-0 mt-6">
          <Button variant="ghost" onClick={onClose} className="rounded-xl font-bold uppercase tracking-widest text-xs h-11 glass border-white/5 text-zinc-500 hover:text-white">
            Cancel Operation
          </Button>
          <Button 
            onClick={onConfirm} 
            className={cn(
              "rounded-xl font-black uppercase tracking-widest text-xs h-11 px-8",
              variant === "destructive" ? "bg-rose-500 text-white hover:bg-rose-600" : "bg-indigo-600 text-white hover:bg-indigo-700"
            )}
          >
            {confirmText}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
