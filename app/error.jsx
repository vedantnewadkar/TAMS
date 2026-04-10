"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { AlertTriangle, RefreshCcw, Home } from "lucide-react";
import Link from "next/link";

export default function GlobalError({ error, reset }) {
  React.useEffect(() => {
    console.error("Neural Link Disruption:", error);
  }, [error]);

  return (
    <div className="min-h-screen bg-zinc-50 flex items-center justify-center p-6 text-center">
      <div className="max-w-md w-full bg-white border border-zinc-200 rounded-3xl p-10 space-y-6 shadow-sm">
        <div className="mx-auto h-20 w-20 bg-red-50 rounded-full flex items-center justify-center">
          <AlertTriangle className="h-10 w-10 text-red-600" />
        </div>
        
        <div className="space-y-2">
          <h1 className="text-2xl font-bold text-zinc-900">Neural Link Disruption</h1>
          <p className="text-zinc-500 text-sm">
            We've encountered an unexpected synchronization protocol failure. Your session remains secure.
          </p>
        </div>

        {process.env.NODE_ENV === 'development' && (
          <div className="p-3 bg-zinc-50 rounded-xl text-[10px] text-zinc-400 font-mono text-left overflow-auto max-h-32">
            {error.message}
          </div>
        )}

        <div className="flex flex-col space-y-3">
          <Button 
            onClick={() => reset()} 
            className="bg-indigo-600 hover:bg-indigo-700 w-full rounded-xl h-11"
          >
            <RefreshCcw className="mr-2 h-4 w-4" />
            Retry Connection
          </Button>
          <Button variant="ghost" asChild className="w-full">
            <Link href="/">
              <Home className="mr-2 h-4 w-4" />
              Return to Landing
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
