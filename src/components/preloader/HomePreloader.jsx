import { useLayoutEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { afterLayout, decodeImage, HOME_REVEAL_EVENT, waitForPageAssets } from './homePreloaderReadiness';
import './HomePreloader.css';

const VEHICLES = [
  { mode: 'train', entry: 'translate3d(-135%, 0, 0)', delay: 80 },
  { mode: 'plane', entry: 'translate3d(0, -135%, 0)', delay: 220 },
  { mode: 'truck', entry: 'translate3d(135%, 0, 0)', delay: 150 },
  { mode: 'ship', entry: 'translate3d(0, 135%, 0)', delay: 300 },
];
// Crops use the reference's original coordinate system, excluding its typography.
const VEHICLE_CROPS = ['307 200 493 115', '1237 79 382 338', '331 603 454 164', '1159 609 467 153'];
const REFERENCE_SRC = '/preloader/multimodal-reference.webp';
const PANEL_EASE = 'cubic-bezier(0.22, 1, 0.36, 1)';
const EXIT_EASE = 'cubic-bezier(0.76, 0, 0.24, 1)';

export function HomePreloader({ onReveal }) {
  const canvasRef = useRef(null);
  const [finished, setFinished] = useState(false);

  useLayoutEffect(() => {
    const canvas = canvasRef.current;
    const vehicles = Array.from(canvas.querySelectorAll('.home-preloader__vehicle'));
    const wordmark = canvas.querySelector('.home-preloader__wordmark');
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const animations = new Map();
    const timers = new Set();
    const app = document.getElementById('root');
    const wasInert = app.inert;
    let disposed = false;
    const controller = new AbortController();
    const { signal } = controller;
    const sprite = new Image();
    sprite.fetchPriority = 'high';
    sprite.src = REFERENCE_SRC;
    const spriteReady = decodeImage(sprite, signal);
    // Fetch/decode and initialize the page while the visual sequence plays.
    const pageReady = Promise.all([spriteReady, waitForPageAssets(signal)])
      .then(() => undefined)
      .catch((error) => {
        if (!signal.aborted) throw error;
      });

    document.body.classList.remove('is-loaded');
    document.body.classList.add('is-home-loading');
    // The red canvas is the first painted surface; its four cells begin empty.
    canvas.style.transform = 'translate3d(0, 0, 0)';
    wordmark.style.transform = 'translate3d(-135%, 0, 0)';
    vehicles.forEach((vehicle, index) => {
      vehicle.style.transform = VEHICLES[index].entry;
    });
    app.inert = true;

    // Transform-only animation keeps the canvas and artwork fully opaque.
    const slide = (node, target, duration, easing = PANEL_EASE) => {
      const from = getComputedStyle(node).transform;
      animations.get(node)?.cancel();
      node.style.transform = target;
      const animation = node.animate(
        [{ transform: from }, { transform: target }],
        { duration: reducedMotion ? 1 : duration, easing },
      );
      animations.set(node, animation);
      return animation.finished.catch(() => undefined);
    };

    const hold = (duration) => new Promise((resolve) => {
      const timer = window.setTimeout(() => {
        timers.delete(timer);
        resolve();
      }, duration);
      timers.add(timer);
    });

    const prepareHeroReveal = () => {
      document.body.classList.remove('is-home-loading');
      // Commit the original initial hero state with its transition restored.
      // The following animation frame can then transition it cleanly.
      void document.body.offsetWidth;
      ScrollTrigger.refresh();
    };

    const beginHeroReveal = () => {
      app.inert = wasInert;
      // Restore the page's original choreography as the final red canvas moves away.
      document.body.classList.add('is-loaded');
      window.dispatchEvent(new Event(HOME_REVEAL_EVENT));
      onReveal?.(true);
    };

    const run = async () => {
      canvas.dataset.phase = 'grid';
      await spriteReady;
      if (disposed) return;

      // The fixed assortment of directions feels spontaneous while staying
      // consistent across visits: left, top, right, then bottom.
      await Promise.all(
        vehicles.map((vehicle, index) =>
          hold(reducedMotion ? 0 : VEHICLES[index].delay).then(() =>
            slide(vehicle, 'translate3d(0, 0, 0)', 620)
          )
        )
      );
      if (disposed) return;
      await pageReady;
      if (disposed) return;

      await hold(reducedMotion ? 0 : 620);
      if (disposed) return;

      canvas.dataset.phase = 'clearing-grid';
      const clearGrid = Promise.all(
        vehicles.map((vehicle, index) =>
          hold(reducedMotion ? 0 : VEHICLES[index].delay).then(() =>
            slide(vehicle, VEHICLES[index].entry, 460)
          )
        )
      );
      // The wordmark lands as the final panel clears, avoiding a dead beat
      // between the multimodal grid and the master FELMEX reveal.
      const revealWordmark = hold(reducedMotion ? 0 : 150).then(() =>
        slide(wordmark, 'translate3d(0, 0, 0)', 560)
      );
      await Promise.all([clearGrid, revealWordmark]);
      if (disposed) return;

      canvas.dataset.phase = 'brand';
      await hold(reducedMotion ? 0 : 140);
      if (disposed) return;
      ScrollTrigger.refresh();
      await afterLayout(signal);
      if (disposed) return;

      canvas.dataset.phase = 'exit';
      // This keeps the centered wordmark attached to the red canvas as it exits.
      prepareHeroReveal();
      const canvasExit = slide(canvas, 'translate3d(100%, 0, 0)', 1050, EXIT_EASE);
      await afterLayout(signal);
      if (disposed) return;
      beginHeroReveal();
      await canvasExit;
      if (disposed) return;
      setFinished(true);
    };

    run().catch(() => {
      if (disposed) return;
      prepareHeroReveal();
      beginHeroReveal();
      setFinished(true);
    });

    return () => {
      disposed = true;
      controller.abort();
      timers.forEach(window.clearTimeout);
      animations.forEach((animation) => animation.cancel());
      document.body.classList.remove('is-home-loading');
      app.inert = wasInert;
    };
  }, [onReveal]);

  if (finished) return null;

  return createPortal(
    <div id="preloader" ref={canvasRef} role="status" aria-label="Loading FELMEX Logistics">
      <svg className="home-preloader__filters" aria-hidden="true" width="0" height="0">
        <defs>
          <filter id="home-preloader-white" colorInterpolationFilters="sRGB">
            <feColorMatrix type="matrix" values="0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 1.5 0 0 -0.5" />
          </filter>
        </defs>
      </svg>
      <div className="home-preloader__grid" aria-hidden="true">
        {VEHICLES.map(({ mode }, index) => {
          const [x, y, width, height] = VEHICLE_CROPS[index].split(' ');
          return (
            <div key={mode} className={`home-preloader__cell home-preloader__cell--${mode}`}>
              <div className={`home-preloader__vehicle home-preloader__vehicle--${mode}`}>
                <svg className="home-preloader__silhouette" viewBox={VEHICLE_CROPS[index]} focusable="false">
                  <defs>
                    <clipPath id={`home-preloader-crop-${mode}`}>
                      <rect x={x} y={y} width={width} height={height} />
                    </clipPath>
                  </defs>
                  <image
                    href={REFERENCE_SRC}
                    width="1672"
                    height="941"
                    clipPath={`url(#home-preloader-crop-${mode})`}
                    filter="url(#home-preloader-white)"
                  />
                </svg>
              </div>
            </div>
          );
        })}
      </div>
      <div className="home-preloader__wordmark" aria-hidden="true">
        <svg viewBox="0 0 610 80" focusable="false">
          <path d="M0 0h82v17H20v16h54v17H20v30H0z M102 0h82v17h-62v14h55v17h-55v15h62v17h-82z M205 0h20v62h60v18h-80z M305 80V0h20l30 34 30-34h20v80h-20V29l-30 33-30-33v51z M426 0h78v17h-58v14h52v17h-52v15h58v17h-78z M520 0h23l22 26 22-26h23l-34 40 34 40h-23l-22-26-22 26h-23l34-40z" />
        </svg>
      </div>
    </div>,
    document.body,
  );
}
