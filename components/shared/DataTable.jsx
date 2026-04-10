"use client";

import React from "react";
import { 
  ArrowUpDown, 
  ChevronLeft, 
  ChevronRight, 
  MoreHorizontal,
  FileText,
  Trash2,
  Edit
} from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

export const DataTable = ({ columns, data, emptyMessage = "No records found.", onRowClick }) => {
  const [sortConfig, setSortConfig] = React.useState({ key: null, direction: 'asc' });
  const [currentPage, setCurrentPage] = React.useState(1);
  const rowsPerPage = 10;

  // Sorting Logic
  const sortedData = React.useMemo(() => {
    // Safety guard: Ensure data is an array before processing
    const safeData = Array.isArray(data) ? data : [];
    let sortableItems = [...safeData];
    
    if (sortConfig.key !== null) {
      sortableItems.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'asc' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'asc' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableItems;
  }, [data, sortConfig]);

  // Pagination Logic
  const totalPages = Math.ceil(sortedData.length / rowsPerPage);
  const paginatedData = sortedData.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  const requestSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  return (
    <div className="space-y-4">
      <div className="rounded-2xl border border-white/5 glass overflow-hidden">
        <Table>
          <TableHeader className="bg-white/5">
            <TableRow className="hover:bg-transparent border-white/5">
              {columns.map((col) => (
                <TableHead key={col.key} className="text-zinc-500 font-black uppercase tracking-[0.2em] text-[10px]">
                  <div 
                    className={cn(
                      "flex items-center gap-2 py-3 cursor-pointer hover:text-white transition-colors",
                      col.sortable && "select-none"
                    )}
                    onClick={() => col.sortable && requestSort(col.key)}
                  >
                    {col.label}
                    {col.sortable && <ArrowUpDown className="h-3 w-3" />}
                  </div>
                </TableHead>
              ))}
              <TableHead className="w-[80px]" />
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedData.length > 0 ? (
              paginatedData.map((row, i) => (
                <TableRow 
                  key={i} 
                  className="border-white/5 hover:bg-white/5 transition-colors group cursor-pointer"
                  onClick={() => onRowClick && onRowClick(row)}
                >
                  {columns.map((col) => (
                    <TableCell key={col.key} className="py-4 font-bold text-sm tracking-tight text-white">
                      {col.render ? col.render(row) : row[col.key]}
                    </TableCell>
                  ))}
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-zinc-600 hover:text-white hover:bg-white/10">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="glass border-white/10 w-40">
                        <DropdownMenuItem className="text-zinc-300 focus:text-white font-bold text-xs uppercase tracking-widest cursor-pointer">
                          <FileText className="mr-2 h-3.5 w-3.5" /> View
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-zinc-300 focus:text-white font-bold text-xs uppercase tracking-widest cursor-pointer">
                          <Edit className="mr-2 h-3.5 w-3.5" /> Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-rose-400 focus:text-rose-400 focus:bg-rose-400/10 font-bold text-xs uppercase tracking-widest cursor-pointer">
                          <Trash2 className="mr-2 h-3.5 w-3.5" /> Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow className="hover:bg-transparent">
                <TableCell colSpan={columns.length + 1} className="h-32 text-center text-zinc-600 font-bold tracking-widest uppercase text-xs italic">
                  {emptyMessage}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between px-2">
          <div className="text-[10px] font-black uppercase tracking-widest text-zinc-600">
            Page {currentPage} of {totalPages} • {sortedData.length} records
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(p => p - 1)}
              className="glass border-white/5 h-9 w-9 p-0 text-white disabled:opacity-30"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(p => p + 1)}
              className="glass border-white/5 h-9 w-9 p-0 text-white disabled:opacity-30"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};
