import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import './HomePreloader.css';

const COUNTER_TICK_MS = 40;
const PRELOADER_PAUSE_MS = 200;

export function HomePreloader() {
  const [progress, setProgress] = useState(0);
  const hasFinishedRef = useRef(false);

  useLayoutEffect(() => {
    if (typeof document === 'undefined') return;

    document.body.classList.remove('is-loaded');
    hasFinishedRef.current = false;
  }, []);

  useEffect(() => {
    if (typeof document === 'undefined' || typeof window === 'undefined') return undefined;

    const criticalImages = Array.from(document.querySelectorAll('img[data-preloader-critical]'));
    const loadedImages = new Set();
    const totalImages = criticalImages.length;
    let targetProgress = totalImages === 0 ? 100 : 0;
    let displayedProgress = 0;
    let finishTimeoutId = null;
    let counterIntervalId = null;

    const updateTargetProgress = () => {
      targetProgress = Math.round((loadedImages.size / totalImages) * 100);
    };

    const markImageLoaded = (image) => {
      if (loadedImages.has(image)) return;

      loadedImages.add(image);
      updateTargetProgress();
    };

    const imageListeners = criticalImages.map((image) => {
      const onLoad = () => markImageLoaded(image);
      const onError = () => markImageLoaded(image);

      if (image.complete) {
        markImageLoaded(image);
      } else {
        image.addEventListener('load', onLoad, { once: true });
        image.addEventListener('error', onError, { once: true });
      }

      return { image, onLoad, onError };
    });

    const completeSequence = () => {
      if (hasFinishedRef.current) return;

      hasFinishedRef.current = true;
      if (counterIntervalId !== null) {
        window.clearInterval(counterIntervalId);
      }
      document.body.classList.add('is-loaded');
    };

    const startExitPause = () => {
      if (finishTimeoutId !== null) return;

      finishTimeoutId = window.setTimeout(completeSequence, PRELOADER_PAUSE_MS);
    };

    counterIntervalId = window.setInterval(() => {
      if (displayedProgress < targetProgress) {
        const remainingProgress = targetProgress - displayedProgress;
        const step = Math.max(1, Math.ceil(remainingProgress / 12));

        displayedProgress = Math.min(targetProgress, displayedProgress + step);
        setProgress(displayedProgress);

        if (displayedProgress === 100) {
          startExitPause();
        }
        return;
      }

      if (displayedProgress === 100) {
        startExitPause();
      }
    }, COUNTER_TICK_MS);

    return () => {
      window.clearInterval(counterIntervalId);
      if (finishTimeoutId !== null) {
        window.clearTimeout(finishTimeoutId);
      }

      imageListeners.forEach(({ image, onLoad, onError }) => {
        image.removeEventListener('load', onLoad);
        image.removeEventListener('error', onError);
      });
    };
  }, []);

  return (
    <div id="preloader" aria-label={`Loading homepage: ${progress}%`} role="status">
      <span id="load-counter" aria-hidden="true">
        {progress}%
      </span>
    </div>
  );
}
