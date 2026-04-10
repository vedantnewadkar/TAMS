"use client";

import React from "react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export const StatusBadge = ({ status, className }) => {
  const statusMap = {
    // Fee Status
    pending: { label: "Pending", variant: "warning" },
    partial: { label: "Partial", variant: "indigo" },
    paid: { label: "Paid", variant: "success" },
    overdue: { label: "Overdue", variant: "destructive" },
    
    // Attendance Status
    present: { label: "Present", variant: "success" },
    absent: { label: "Absent", variant: "destructive" },
    late: { label: "Late", variant: "warning" },

    // General
    active: { label: "Active", variant: "success" },
    inactive: { label: "Inactive", variant: "secondary" },
    resolved: { label: "Resolved", variant: "success" },
    open: { label: "Open", variant: "indigo" },
  };

  const config = statusMap[status.toLowerCase()] || { label: status, variant: "default" };

  return (
    <Badge 
      variant={config.variant} 
      className={cn("uppercase tracking-widest text-[10px] font-black px-3 py-1", className)}
    >
      {config.label}
    </Badge>
  );
};
