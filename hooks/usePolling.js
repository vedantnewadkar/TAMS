import { useEffect, useRef } from 'react';

/**
 * usePolling
 * Custom hook for lightweight real-time synchronization.
 * 
 * @param {Function} callback - The async function to execute periodically
 * @param {number} interval - The polling interval in milliseconds (default: 30s)
 * @param {boolean} immediate - Whether to trigger the first call immediately
 */
export function usePolling(callback, interval = 30000, immediate = true) {
  const savedCallback = useRef();

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    if (immediate) {
      savedCallback.current();
    }

    const id = setInterval(() => {
      savedCallback.current();
    }, interval);

    return () => clearInterval(id);
  }, [interval, immediate]);
}
