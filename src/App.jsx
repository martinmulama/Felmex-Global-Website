import { cloneElement, Suspense, lazy, useEffect, useState } from 'react';
import { SplitPanelPreloader } from './components/preloader/SplitPanelPreloader';
import { useSplitPanelPreloader } from './hooks/useSplitPanelPreloader';
import { MainLayout } from './layouts/MainLayout';
import { HomePage } from './pages/HomePage';
import { scrollToTarget } from './utils/scroll';

const loadAboutPage = () => import('./pages/AboutPage');
const loadContactPage = () => import('./pages/ContactPage');
const loadProjectsPage = () => import('./pages/ProjectsPage');
const loadServicePage = () => import('./pages/ServicePage');

const AboutPage = lazy(() => loadAboutPage().then((module) => ({ default: module.AboutPage })));
const ContactPage = lazy(() =>
  loadContactPage().then((module) => ({ default: module.ContactPage }))
);
const ProjectsPage = lazy(() =>
  loadProjectsPage().then((module) => ({ default: module.ProjectsPage }))
);
const ServicePage = lazy(() =>
  loadServicePage().then((module) => ({ default: module.ServicePage }))
);
const SITE_NAME = 'Felmex Global Logistics';
const DEFAULT_DESCRIPTION =
  'Reliable freight forwarding, customs, warehousing, and project logistics solutions.';
const DEFAULT_SOCIAL_IMAGE = '/hero-air-panel.webp';

function getRouteMetadata(pathname) {
  if (pathname === '/services' || pathname.startsWith('/services/')) {
    return {
      title: `Services | ${SITE_NAME}`,
      description:
        'Explore Felmex freight forwarding, customs clearance, warehousing, and project logistics services.',
      image: '/air-freight.webp',
    };
  }

  if (pathname === '/about' || pathname.startsWith('/about/')) {
    return {
      title: `About | ${SITE_NAME}`,
      description:
        'Learn about the Felmex logistics team, operating standards, and regional freight network.',
      image: '/about-our-story-people.png',
    };
  }

  if (pathname === '/contact' || pathname.startsWith('/contact/')) {
    return {
      title: `Contact | ${SITE_NAME}`,
      description:
        'Contact Felmex Global Logistics for freight quotes, customs support, and routing assistance.',
      image: '/contact-network-hero-1440.webp',
    };
  }

  if (pathname === '/blog' || pathname.startsWith('/blog/')) {
    return {
      title: `Projects | ${SITE_NAME}`,
      description:
        'Review Felmex project logistics, warehousing, customs, and freight coordination work.',
      image: '/road-freight.webp',
    };
  }

  return {
    title: SITE_NAME,
    description: DEFAULT_DESCRIPTION,
    image: DEFAULT_SOCIAL_IMAGE,
  };
}

function setMetaContent(attributeName, attributeValue, content) {
  if (typeof document === 'undefined') return;

  let metaElement = document.head.querySelector(`meta[${attributeName}="${attributeValue}"]`);

  if (!metaElement) {
    metaElement = document.createElement('meta');
    metaElement.setAttribute(attributeName, attributeValue);
    document.head.appendChild(metaElement);
  }

  metaElement.setAttribute('content', content);
}

function setLinkHref(rel, href) {
  if (typeof document === 'undefined') return;

  let linkElement = document.head.querySelector(`link[rel="${rel}"]`);

  if (!linkElement) {
    linkElement = document.createElement('link');
    linkElement.setAttribute('rel', rel);
    document.head.appendChild(linkElement);
  }

  linkElement.setAttribute('href', href);
}

function readWindowLocation() {
  if (typeof window === 'undefined') {
    return {
      pathname: '/',
      hash: '',
      search: '',
    };
  }

  return {
    pathname: window.location.pathname,
    hash: window.location.hash,
    search: window.location.search,
  };
}

function preloadRouteForPath(pathname) {
  if (pathname === '/about' || pathname.startsWith('/about/')) {
    return loadAboutPage();
  }

  if (pathname === '/contact' || pathname.startsWith('/contact/')) {
    return loadContactPage();
  }

  if (pathname === '/services' || pathname.startsWith('/services/')) {
    return loadServicePage();
  }

  if (pathname === '/blog' || pathname.startsWith('/blog/')) {
    return loadProjectsPage();
  }

  return Promise.resolve();
}

function SecondaryRoute({ children }) {
  // Keep one curtain mounted while a lazy interior page loads. This prevents a
  // cold route from replacing the moving FELMEX mark midway through its entry.
  const isAppLoaded = useSplitPanelPreloader();
  const [isPreloaderExited, setIsPreloaderExited] = useState(false);

  return (
    <>
      <SplitPanelPreloader
        isAppLoaded={isAppLoaded}
        onExitComplete={() => setIsPreloaderExited(true)}
      />
      <Suspense fallback={null}>
        {cloneElement(children, { isAppLoaded, isPreloaderExited })}
      </Suspense>
    </>
  );
}

function App() {
  const [currentLocation, setCurrentLocation] = useState(() => readWindowLocation());
  const { pathname, hash } = currentLocation;
  const isProjectsPage = pathname === '/blog' || pathname.startsWith('/blog/');
  const isAboutPage = pathname === '/about' || pathname.startsWith('/about/');
  const isContactPage = pathname === '/contact' || pathname.startsWith('/contact/');
  const isServicesPage = pathname === '/services' || pathname.startsWith('/services/');
  const isHomePage =
    !isProjectsPage && !isServicesPage && !isAboutPage && !isContactPage;
  const activePage = isHomePage ? (
    <HomePage />
  ) : isServicesPage ? (
    <ServicePage />
  ) : isAboutPage ? (
    <AboutPage />
  ) : isContactPage ? (
    <ContactPage />
  ) : (
    <ProjectsPage />
  );

  useEffect(() => {
    if (typeof window === 'undefined') return undefined;

    const syncLocation = () => {
      setCurrentLocation(readWindowLocation());
    };

    window.addEventListener('popstate', syncLocation);

    return () => {
      window.removeEventListener('popstate', syncLocation);
    };
  }, []);

  useEffect(() => {
    if (typeof document === 'undefined' || typeof window === 'undefined') return;

    const metadata = getRouteMetadata(pathname);
    const absoluteImageUrl = new URL(metadata.image, window.location.origin).href;
    const canonicalUrl = new URL(pathname, window.location.origin).href;

    document.title = metadata.title;
    setMetaContent('name', 'description', metadata.description);
    setMetaContent('property', 'og:title', metadata.title);
    setMetaContent('property', 'og:description', metadata.description);
    setMetaContent('property', 'og:image', absoluteImageUrl);
    setMetaContent('property', 'og:url', canonicalUrl);
    setMetaContent('name', 'twitter:title', metadata.title);
    setMetaContent('name', 'twitter:description', metadata.description);
    setMetaContent('name', 'twitter:image', absoluteImageUrl);
    setLinkHref('canonical', canonicalUrl);
  }, [pathname]);

  useEffect(() => {
    if (typeof document === 'undefined' || typeof window === 'undefined') return undefined;
    let latestNavigationId = 0;

    const canInterceptLink = (anchor) => {
      if (!anchor) return false;
      if (anchor.hasAttribute('download')) return false;

      const href = anchor.getAttribute('href');
      if (!href) return false;
      if (href.startsWith('mailto:') || href.startsWith('tel:')) return false;

      const target = anchor.getAttribute('target');
      if (target && target.toLowerCase() !== '_self') return false;

      return true;
    };

    const resolveInternalUrl = (anchor) => {
      try {
        const url = new URL(anchor.href, window.location.href);
        if (url.origin !== window.location.origin) return null;
        return url;
      } catch {
        return null;
      }
    };

    const preloadAnchorRoute = (anchor) => {
      const url = resolveInternalUrl(anchor);
      if (!url) return;
      preloadRouteForPath(url.pathname);
    };

    const handleDocumentClick = (event) => {
      if (event.defaultPrevented) return;
      if (event.button !== 0) return;
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

      const clickTarget = event.target;
      if (!(clickTarget instanceof Element)) return;

      const anchor = clickTarget.closest('a[href]');
      if (!canInterceptLink(anchor)) return;

      const url = resolveInternalUrl(anchor);
      if (!url) return;

      const nextHref = `${url.pathname}${url.search}${url.hash}`;
      const currentHref = `${window.location.pathname}${window.location.search}${window.location.hash}`;

      if (nextHref === currentHref) {
        if (url.hash && url.hash !== '#') {
          event.preventDefault();
          scrollToTarget(url.hash);
        } else if (url.pathname === window.location.pathname && !url.hash) {
          event.preventDefault();
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
        return;
      }

      event.preventDefault();
      const navigationId = latestNavigationId + 1;
      latestNavigationId = navigationId;

      preloadRouteForPath(url.pathname)
        .catch(() => undefined)
        .finally(() => {
          if (navigationId !== latestNavigationId) return;
          window.history.pushState({}, '', nextHref);
          window.dispatchEvent(new Event('popstate'));
        });
    };

    const handlePointerEnter = (event) => {
      const pointerTarget = event.target;
      if (!(pointerTarget instanceof Element)) return;
      const anchor = pointerTarget.closest('a[href]');
      if (!canInterceptLink(anchor)) return;
      preloadAnchorRoute(anchor);
    };

    const handleFocusIn = (event) => {
      const focusTarget = event.target;
      if (!(focusTarget instanceof Element)) return;
      const anchor = focusTarget.closest('a[href]');
      if (!canInterceptLink(anchor)) return;
      preloadAnchorRoute(anchor);
    };

    document.addEventListener('click', handleDocumentClick);
    document.addEventListener('pointerenter', handlePointerEnter, true);
    document.addEventListener('focusin', handleFocusIn);

    return () => {
      document.removeEventListener('click', handleDocumentClick);
      document.removeEventListener('pointerenter', handlePointerEnter, true);
      document.removeEventListener('focusin', handleFocusIn);
    };
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return undefined;

    if (!hash || hash === '#') {
      window.scrollTo({ top: 0, behavior: 'auto' });
      return undefined;
    }

    let frameId = null;
    let attempts = 0;
    const maxAttempts = 12;

    const scrollToHashTarget = () => {
      attempts += 1;
      let targetId;

      try {
        targetId = decodeURIComponent(hash.replace(/^#/, ''));
      } catch {
        return;
      }

      const target = document.getElementById(targetId);
      if (target) {
        scrollToTarget(target, { immediate: true });
        return;
      }

      if (attempts < maxAttempts) {
        frameId = window.requestAnimationFrame(scrollToHashTarget);
      }
    };

    frameId = window.requestAnimationFrame(scrollToHashTarget);

    return () => {
      if (frameId !== null) {
        window.cancelAnimationFrame(frameId);
      }
    };
  }, [pathname, hash]);

  return (
    <MainLayout hideFooter={isProjectsPage}>
      {isHomePage ? (
        activePage
      ) : (
        <SecondaryRoute key={pathname}>{activePage}</SecondaryRoute>
      )}
    </MainLayout>
  );
}

export default App;
