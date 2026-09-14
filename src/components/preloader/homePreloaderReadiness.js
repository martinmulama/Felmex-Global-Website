export const HOME_REVEAL_EVENT = 'felmex:home-reveal';

function abortable(promise, signal) {
  return new Promise((resolve, reject) => {
    const abort = () => reject(signal.reason);
    if (signal.aborted) return abort();
    signal.addEventListener('abort', abort, { once: true });
    promise.then(resolve, reject).finally(() => signal.removeEventListener('abort', abort));
  });
}

export function afterLayout(signal) {
  return new Promise((resolve, reject) => {
    let frame;
    const abort = () => {
      cancelAnimationFrame(frame);
      reject(signal.reason);
    };
    if (signal.aborted) return abort();
    signal.addEventListener('abort', abort, { once: true });
    // Let React's effects, responsive styles, and GSAP's initial layout settle.
    frame = requestAnimationFrame(() => {
      frame = requestAnimationFrame(() => {
        signal.removeEventListener('abort', abort);
        resolve();
      });
    });
  });
}

export async function decodeImage(image, signal) {
  if (!image.complete) {
    await new Promise((resolve, reject) => {
      const cleanup = () => {
        image.removeEventListener('load', settle);
        image.removeEventListener('error', settle);
        signal.removeEventListener('abort', abort);
      };
      const settle = () => { cleanup(); resolve(); };
      const abort = () => { cleanup(); reject(signal.reason); };
      if (signal.aborted) return abort();
      image.addEventListener('load', settle, { once: true });
      image.addEventListener('error', settle, { once: true });
      signal.addEventListener('abort', abort, { once: true });
    });
  }
  // A failed asset must not trap the visitor behind the loader.
  if (image.naturalWidth && typeof image.decode === 'function') {
    await abortable(image.decode().catch(() => undefined), signal);
  }
}

function windowReady(signal) {
  if (document.readyState === 'complete') return Promise.resolve();
  return new Promise((resolve, reject) => {
    const cleanup = () => {
      window.removeEventListener('load', settle);
      signal.removeEventListener('abort', abort);
    };
    const settle = () => { cleanup(); resolve(); };
    const abort = () => { cleanup(); reject(signal.reason); };
    if (signal.aborted) return abort();
    window.addEventListener('load', settle, { once: true });
    signal.addEventListener('abort', abort, { once: true });
  });
}

export async function waitForPageAssets(signal) {
  await afterLayout(signal);
  const images = [...document.images].filter((image) =>
    image.loading !== 'lazy' || image.hasAttribute('data-preloader-critical'),
  );
  // CSS background imagery is not included in document.images.
  const backgrounds = new Set();
  document.querySelectorAll('.site-header, .site-header *, .why-choose-felmex--home-hero, .why-choose-felmex--home-hero *')
    .forEach((node) => {
      for (const match of getComputedStyle(node).backgroundImage.matchAll(/url\(["']?(.*?)["']?\)/g)) {
        backgrounds.add(match[1]);
      }
    });
  backgrounds.forEach((src) => {
    const image = new Image();
    image.src = src;
    images.push(image);
  });

  await Promise.all([
    windowReady(signal),
    abortable(document.fonts?.ready ?? Promise.resolve(), signal),
    ...images.map((image) => decodeImage(image, signal)),
  ]);
  await afterLayout(signal);
}
