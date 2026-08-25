import { useEffect } from 'react';

const OBSERVER_OPTIONS = {
  threshold: 0.2,
  rootMargin: '0px 0px -10% 0px',
};

const EARLY_REVEAL_OPTIONS = {
  threshold: 0,
  rootMargin: '0px 0px -12% 0px',
};

export function ScrollSectionTitleObserver() {
  useEffect(() => {
    if (typeof document === 'undefined') return undefined;

    const contentRoot = document.querySelector('.site-main-content');
    if (!contentRoot) return undefined;

    const revealedSections = new WeakSet();
    const revealSection = (section) => {
      revealedSections.add(section);
      section.classList.add('in-view');
    };

    if (typeof IntersectionObserver === 'undefined') {
      contentRoot.querySelectorAll('.scroll-section').forEach(revealSection);
      return undefined;
    }

    const observedSections = new WeakSet();
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        revealSection(entry.target);
        observer.unobserve(entry.target);
      });
    }, OBSERVER_OPTIONS);

    const earlyRevealObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        revealSection(entry.target);
        earlyRevealObserver.unobserve(entry.target);
      });
    }, EARLY_REVEAL_OPTIONS);

    const observeSection = (section) => {
      if (observedSections.has(section) || section.classList.contains('in-view')) return;

      observedSections.add(section);
      const sectionObserver =
        section.dataset.scrollReveal === 'early' ? earlyRevealObserver : observer;

      sectionObserver.observe(section);
    };

    const observeSectionsIn = (node) => {
      if (!(node instanceof Element)) return;

      if (node.matches('.scroll-section')) {
        observeSection(node);
      }

      node.querySelectorAll('.scroll-section').forEach(observeSection);
    };

    observeSectionsIn(contentRoot);

    const mutationObserver = new MutationObserver((records) => {
      records.forEach((record) => {
        if (
          record.type === 'attributes' &&
          record.target instanceof Element &&
          revealedSections.has(record.target) &&
          !record.target.classList.contains('in-view')
        ) {
          record.target.classList.add('in-view');
        }

        record.addedNodes.forEach(observeSectionsIn);
      });
    });

    mutationObserver.observe(contentRoot, {
      attributes: true,
      attributeFilter: ['class'],
      childList: true,
      subtree: true,
    });

    return () => {
      mutationObserver.disconnect();
      observer.disconnect();
      earlyRevealObserver.disconnect();
    };
  }, []);

  return null;
}
