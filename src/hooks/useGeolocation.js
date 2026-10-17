import { useCallback, useEffect, useRef, useState } from 'react';

/**
 * Browser geolocation → coordinates label. Reverse geocoding (a street
 * address) needs a provider the client has not chosen yet, so we do not
 * invent one; the label shows rounded coordinates.
 */
export function useGeolocation() {
  const [locating, setLocating] = useState(false);
  const mounted = useRef(false);
  useEffect(() => {
    mounted.current = true;
    return () => {
      mounted.current = false;
    };
  }, []);

  const locate = useCallback((onSuccess, onError) => {
    if (!('geolocation' in navigator)) {
      onError('unsupported');
      return;
    }
    setLocating(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        if (!mounted.current) return;
        setLocating(false);
        onSuccess(pos.coords.latitude.toFixed(4), pos.coords.longitude.toFixed(4));
      },
      () => {
        if (!mounted.current) return;
        setLocating(false);
        onError('failed');
      },
      { timeout: 8000 }
    );
  }, []);

  return { locating, locate };
}
