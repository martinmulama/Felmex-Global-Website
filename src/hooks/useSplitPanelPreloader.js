import { useEffect, useState } from 'react';

export function useSplitPanelPreloader() {
  const [isAppLoaded, setIsAppLoaded] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined' || typeof document === 'undefined') {
      return undefined;
    }

    const handleWindowLoad = () => setIsAppLoaded(true);

    window.addEventListener('load', handleWindowLoad);

    if (document.readyState === 'complete') {
      handleWindowLoad();
    }

    return () => {
      window.removeEventListener('load', handleWindowLoad);
    };
  }, []);

  return isAppLoaded;
}
