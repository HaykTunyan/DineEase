import { useState, useCallback } from 'react';

/**
 * Hook to manage boolean state easily.
 * Very useful for modals, switches, accordions, and other togglable components.
 */
export function useToggle(initialValue: boolean = false): [boolean, () => void, (value: boolean) => void] {
  const [value, setValue] = useState<boolean>(initialValue);

  const toggle = useCallback(() => {
    setValue((prev) => !prev);
  }, []);

  return [value, toggle, setValue];
}
