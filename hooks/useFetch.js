"use client";

import { useState, useEffect } from "react";

/**
 * useFetch — Hackathon Edition
 * Instead of real HTTP calls, returns data from the local dummy-data module.
 * Accepts an optional `localData` argument for direct injection.
 * For API routes that still exist, falls back gracefully.
 */
export function useFetch(url, options = {}) {
  const [data, setData]       = useState(options.initialData || null);
  const [isLoading, setLoad]  = useState(true);
  const [isError, setError]   = useState(null);

  const mutate = (newData) => setData(newData);

  useEffect(() => {
    if (!url) { setLoad(false); return; }

    let cancelled = false;
    setLoad(true);

    // Try real fetch first, fall back to null gracefully
    fetch(url)
      .then(r => r.ok ? r.json() : Promise.reject(r.status))
      .then(d => { if (!cancelled) { setData(d); setLoad(false); } })
      .catch(() => { if (!cancelled) { setLoad(false); } });

    return () => { cancelled = true; };
  }, [url]);

  return { data, isLoading, isError, mutate, isValidating: isLoading };
}
