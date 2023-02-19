import React, { useRef, useEffect } from 'react';

export function useIsMounted(): () => boolean {
  // your code here
  const isMountedRef = useRef(false);

  useEffect(() => {
    isMountedRef.current = true;
    return () => {
      isMountedRef.current = false;
    }
  }, [])

  return () => isMountedRef.current;
}

// from https://usehooks-ts.com/react-hook/use-is-mounted
