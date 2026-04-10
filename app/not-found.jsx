import React from "react";
import { Button } from "@/components/ui/button";
import { Search, Map, ChevronLeft } from "lucide-react";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-6 text-center">
      <div className="space-y-6 max-w-lg">
        <div className="relative">
          <span className="text-[12rem] font-black text-zinc-100 leading-none select-none">404</span>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 space-y-2">
            <div className="h-16 w-16 bg-indigo-600 rounded-2xl rotate-12 flex items-center justify-center mx-auto shadow-xl">
              <Search className="h-8 w-8 text-white -rotate-12" />
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-zinc-900 leading-tight">Sector Not Found</h1>
          <p className="text-zinc-500 max-w-sm mx-auto">
            The neural sector you are attempting to access does not exist or has been relocated within the institutional grid.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild variant="outline" className="rounded-xl h-11 border-zinc-200">
            <Link href="javascript:history.back()">
              <ChevronLeft className="mr-2 h-4 w-4" />
              Go Back
            </Link>
          </Button>
          <Button asChild className="bg-indigo-600 hover:bg-indigo-700 rounded-xl h-11 px-8">
            <Link href="/">
              <Map className="mr-2 h-4 w-4" />
              Portal Map
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
