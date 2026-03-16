import { useState, useEffect, useCallback } from 'react';

interface FetchState<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
}

/**
 * Hook to simplify fetching data from an API Endpoint.
 * Supports basic caching if needed, and clean state structure.
 */
export function useFetch<T>(url: string | null, options?: RequestInit) {

  /**
   * 
   * useFetch Hook
   * 
   * This hook takes a URL and optional fetch options, and returns an object containing the fetched data, loading state, error state, and a refetch function.
   * It uses useState to manage the data, loading, and error states, and useEffect to trigger the fetch when the URL or options change.
   * The fetchData function is defined using useCallback to ensure it has a stable reference for useEffect dependencies. It performs the fetch operation, updates the state accordingly, and handles any errors that may occur.
   * 
   */


  const [state, setState] = useState<FetchState<T>>({
    data: null,
    loading: false,
    error: null,
  });

  const fetchData = useCallback(async () => {
    if (!url) return;
    
    setState(prev => ({ ...prev, loading: true, error: null }));
    
    try {
      const response = await fetch(url, options);
      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }
      
      const json = await response.json();
      setState({ data: json, loading: false, error: null });
    } catch (error) {
      setState({ data: null, loading: false, error: error as Error });
    }
  }, [url, options]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { ...state, refetch: fetchData };
}
