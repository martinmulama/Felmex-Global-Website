import { useEffect, useState } from 'react';

const MINIMUM_VISIBLE_DURATION = 160;

export function useSplitPanelPreloader() {
  const [isAppLoaded, setIsAppLoaded] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined' || typeof document === 'undefined') {
      return undefined;
    }

    const mountedAt = window.performance.now();
    let revealTimerId = null;
    let firstFrameId = null;
    let secondFrameId = null;

    const revealPreloader = () => {
      const elapsed = window.performance.now() - mountedAt;
      const remainingVisibleTime = Math.max(0, MINIMUM_VISIBLE_DURATION - elapsed);

      revealTimerId = window.setTimeout(() => {
        // Keep the closed curtain in a committed frame before changing its transform.
        firstFrameId = window.requestAnimationFrame(() => {
          secondFrameId = window.requestAnimationFrame(() => setIsAppLoaded(true));
        });
      }, remainingVisibleTime);
    };

    window.addEventListener('load', revealPreloader, { once: true });

    if (document.readyState === 'complete') {
      revealPreloader();
    }

    return () => {
      window.removeEventListener('load', revealPreloader);

      if (revealTimerId !== null) {
        window.clearTimeout(revealTimerId);
      }

      if (firstFrameId !== null) {
        window.cancelAnimationFrame(firstFrameId);
      }

      if (secondFrameId !== null) {
        window.cancelAnimationFrame(secondFrameId);
      }
    };
  }, []);

  return isAppLoaded;
}
