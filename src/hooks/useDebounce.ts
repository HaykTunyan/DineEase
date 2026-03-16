import { useState, useEffect } from 'react';

/**
 * Hook to debounce a rapidly changing value.
 * Useful for text search inputs.
 */
export function useDebounce<T>(value: T, delay: number): T {

  /**
   * 
   * useDebounce Hook
   * 
   * This hook takes a value and a delay, and returns a debounced version of the value that only updates after the specified delay has passed without the value changing.
   * It is commonly used to prevent excessive function calls or API requests when a value changes rapidly, such as during user input in a search field.
   * The hook uses useState to store the debounced value and useEffect to set up a timer that updates the debounced value after the delay. If the value changes before the timer expires, the timer is reset.
   * 
   */


  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}
