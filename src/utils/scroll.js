const HEADER_OFFSET = 12;

function getHeaderScrollOffset() {
  const siteHeader = document.querySelector('.site-header');
  if (!siteHeader) return 0;
  return -(Math.round(siteHeader.getBoundingClientRect().height) + HEADER_OFFSET);
}

function resolveHashTarget(hash) {
  if (!hash || hash === '#') return null;
  const id = decodeURIComponent(hash.replace(/^#/, ''));
  if (!id) return null;
  return document.getElementById(id);
}

function resolveTargetTop(target, offset) {
  if (typeof target === 'number') {
    return Math.max(0, target);
  }

  if (target instanceof HTMLElement) {
    return Math.max(0, target.getBoundingClientRect().top + window.scrollY + offset);
  }

  if (typeof target === 'string' && target.startsWith('#')) {
    const hashTarget = resolveHashTarget(target);
    if (!hashTarget) return null;
    return Math.max(0, hashTarget.getBoundingClientRect().top + window.scrollY + offset);
  }

  return null;
}

export function scrollToTarget(target, options = {}) {
  if (typeof window === 'undefined') return;

  const offset = options.offset ?? getHeaderScrollOffset();
  const top = resolveTargetTop(target, offset);

  if (top === null) return;

  window.scrollTo({
    top,
    behavior: options.immediate ? 'auto' : 'smooth',
  });
}
