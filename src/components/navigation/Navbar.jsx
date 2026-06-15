import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { NAV_LINKS } from '../../data/navigation';
import { CONTACT_CHANNELS } from '../../data/contact';
import { MQ } from '../../constants/breakpoints';

let navbarGsapLoadPromise = null;

function loadNavbarGsap() {
  if (!navbarGsapLoadPromise) {
    navbarGsapLoadPromise = import('gsap').then((module) => module.gsap);
  }

  return navbarGsapLoadPromise;
}

export function Navbar() {
  const pathname = typeof window === 'undefined' ? '/' : window.location.pathname;
  const isProjectsPage = pathname === '/blog' || pathname.startsWith('/blog/');
  const isAboutPage = pathname === '/about' || pathname.startsWith('/about/');
  const isContactPage = pathname === '/contact' || pathname.startsWith('/contact/');
  const isServicesPage = pathname === '/services' || pathname.startsWith('/services/');
  const isHomePage = pathname === '/';
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isHomeHeroActive, setIsHomeHeroActive] = useState(isHomePage);
  const headerRef = useRef(null);
  const hasAnimatedHomeNavRef = useRef(false);

  useEffect(() => {
    if (!isMobileMenuOpen) return undefined;

    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        setIsMobileMenuOpen(false);
      }
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', handleEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isMobileMenuOpen]);

  useEffect(() => {
    if (typeof window === 'undefined') return undefined;

    const mediaQuery = window.matchMedia(MQ.nonMobile);
    const handleDesktopBreakpoint = (event) => {
      if (event.matches) {
        setIsMobileMenuOpen(false);
      }
    };

    if (typeof mediaQuery.addEventListener === 'function') {
      mediaQuery.addEventListener('change', handleDesktopBreakpoint);
      return () => mediaQuery.removeEventListener('change', handleDesktopBreakpoint);
    }

    mediaQuery.addListener(handleDesktopBreakpoint);
    return () => mediaQuery.removeListener(handleDesktopBreakpoint);
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined' || typeof document === 'undefined') return undefined;

    const headerElement = headerRef.current;
    if (!headerElement) return undefined;

    const rootStyle = document.documentElement.style;
    const updateHeaderClearance = () => {
      const headerHeight = Math.ceil(headerElement.getBoundingClientRect().height);
      rootStyle.setProperty('--site-header-clearance', `${headerHeight}px`);
    };

    updateHeaderClearance();

    let resizeObserver;
    if (typeof window.ResizeObserver === 'function') {
      resizeObserver = new window.ResizeObserver(() => {
        updateHeaderClearance();
      });
      resizeObserver.observe(headerElement);
    }

    window.addEventListener('resize', updateHeaderClearance);

    return () => {
      window.removeEventListener('resize', updateHeaderClearance);
      resizeObserver?.disconnect();
    };
  }, [isMobileMenuOpen]);

  useEffect(() => {
    if (typeof window === 'undefined' || typeof document === 'undefined' || !isHomePage) {
      setIsHomeHeroActive(false);
      return undefined;
    }

    let frameId = 0;

    const updateHeroState = () => {
      frameId = 0;
      const heroElement = document.querySelector('.hero');
      const headerHeight = headerRef.current?.getBoundingClientRect().height ?? 0;
      const nextIsActive = heroElement
        ? heroElement.getBoundingClientRect().bottom > headerHeight + 1
        : false;

      setIsHomeHeroActive((current) => (current === nextIsActive ? current : nextIsActive));
    };

    const queueUpdate = () => {
      if (frameId) return;
      frameId = window.requestAnimationFrame(updateHeroState);
    };

    queueUpdate();
    window.addEventListener('scroll', queueUpdate, { passive: true });
    window.addEventListener('resize', queueUpdate);

    return () => {
      window.removeEventListener('scroll', queueUpdate);
      window.removeEventListener('resize', queueUpdate);
      if (frameId) {
        window.cancelAnimationFrame(frameId);
      }
    };
  }, [isHomePage]);

  useEffect(() => {
    if (typeof window === 'undefined' || !isHomePage) return undefined;

    loadNavbarGsap();
    return undefined;
  }, [isHomePage]);

  useLayoutEffect(() => {
    if (typeof window === 'undefined' || !isHomePage) {
      hasAnimatedHomeNavRef.current = true;
      return undefined;
    }

    const headerElement = headerRef.current;
    if (!headerElement) return undefined;

    if (!hasAnimatedHomeNavRef.current) {
      hasAnimatedHomeNavRef.current = true;
      return undefined;
    }

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion || isMobileMenuOpen) return undefined;

    const topContactInner = headerElement.querySelector('.top-contact-inner');
    const navShell = headerElement.querySelector('.nav-shell');
    const brand = headerElement.querySelector('.brand');
    const primaryNav = headerElement.querySelector('.primary-nav');
    const navLinks = headerElement.querySelector('.nav-links');
    const quoteButton = headerElement.querySelector('.btn-quote-desktop');
    const revealTargets = [topContactInner, brand].filter(Boolean);
    const settleTargets = [navShell, primaryNav, navLinks, quoteButton].filter(Boolean);
    const allTargets = [headerElement, ...revealTargets, ...settleTargets];
    let isCancelled = false;
    let timeline;

    loadNavbarGsap().then((gsap) => {
      if (isCancelled) return;

      gsap.killTweensOf(allTargets);

      timeline = gsap.timeline({
        defaults: {
          ease: 'power3.out',
          overwrite: 'auto',
        },
      });

      timeline.fromTo(
        navShell,
        {
          y: isHomeHeroActive ? 5 : -7,
          scale: isHomeHeroActive ? 1.01 : 0.985,
        },
        {
          y: 0,
          scale: 1,
          duration: 0.58,
          clearProps: 'transform',
        },
        0
      );

      timeline.fromTo(
        [primaryNav, navLinks, quoteButton].filter(Boolean),
        {
          y: isHomeHeroActive ? 3 : -4,
        },
        {
          y: 0,
          duration: 0.5,
          stagger: 0.025,
          clearProps: 'transform',
        },
        0.04
      );

      if (revealTargets.length) {
        timeline.fromTo(
          revealTargets,
          {
            autoAlpha: isHomeHeroActive ? 1 : 0,
            y: isHomeHeroActive ? 0 : -8,
          },
          {
            autoAlpha: isHomeHeroActive ? 0 : 1,
            y: 0,
            duration: isHomeHeroActive ? 0.26 : 0.4,
            stagger: isHomeHeroActive ? 0 : 0.04,
            ease: 'power2.out',
            clearProps: 'opacity,visibility,transform',
          },
          isHomeHeroActive ? 0 : 0.1
        );
      }
    });

    return () => {
      isCancelled = true;
      timeline?.kill();
    };
  }, [isHomeHeroActive, isHomePage, isMobileMenuOpen]);

  const closeMobileMenu = () => setIsMobileMenuOpen(false);
  const resolveNavHref = (item) => {
    if (!item.href) return '/';
    if (isHomePage) return item.href;
    if (!item.href?.startsWith('#')) return item.href;
    if (item.href === '#') return '/';
    return `/${item.href}`;
  };
  const quoteHref = '/contact';
  const brandHref = isHomePage ? '#' : '/';
  const handleLogoError = (event) => {
    event.currentTarget.style.display = 'none';
    const brand = event.currentTarget.closest('.brand');
    const fallbackMark = brand?.querySelector('.brand-mark');
    if (fallbackMark) {
      fallbackMark.style.display = 'grid';
    }
  };

  return (
    <header
      ref={headerRef}
      className={`site-header${isMobileMenuOpen ? ' is-mobile-menu-open' : ''}${
        isHomeHeroActive ? ' is-home-hero-active' : ''
      }`}
    >
      <div className="top-contact-strip">
        <div className="container top-contact-inner">
          <a className="utility-pill" href={CONTACT_CHANNELS.phoneHref}>
            <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
              <path d="M6.6 10.8a15.6 15.6 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.24c1.1.36 2.3.56 3.6.56a1 1 0 0 1 1 1V20a1 1 0 0 1-1 1C10.8 21 3 13.2 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.3.2 2.5.56 3.6a1 1 0 0 1-.25 1l-2.2 2.2Z" />
            </svg>
            <span className="utility-label-short">Call</span>
            <span className="utility-label-full">{CONTACT_CHANNELS.phoneDisplay}</span>
          </a>
          <a className="utility-pill" href={CONTACT_CHANNELS.emailHref}>
            <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
              <path d="M4 6h16a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1Zm0 2v.2l8 4.8 8-4.8V8l-8 4.8L4 8Z" />
            </svg>
            <span className="utility-label-short">Email</span>
            <span className="utility-label-full">{CONTACT_CHANNELS.emailDisplay}</span>
          </a>
          <a className="utility-pill utility-pill-quote" href={quoteHref} onClick={closeMobileMenu}>
            <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
              <path d="M4 7h16a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V8a1 1 0 0 1 1-1Zm2 3v2h12v-2H6Zm0 4v2h8v-2H6Z" />
            </svg>
            <span>Quote</span>
          </a>
        </div>
      </div>

      <div className="container nav-shell">
        <a className="brand" href={brandHref} aria-label="Felmex Global Logistics home" onClick={closeMobileMenu}>
          <img
            className="brand-logo"
            src="/logo-transparent.png"
            alt="Felmex Global Logistics logo"
            width="80"
            height="80"
            decoding="async"
            onError={handleLogoError}
          />
          <span className="brand-mark" aria-hidden="true">
            FG
          </span>
        </a>

        <button
          type="button"
          className={`nav-menu-toggle${isMobileMenuOpen ? ' is-open' : ''}`}
          aria-expanded={isMobileMenuOpen}
          aria-controls="primary-navigation"
          aria-label={isMobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          onClick={() => setIsMobileMenuOpen((current) => !current)}
        >
          <span className="nav-menu-toggle-text">{isMobileMenuOpen ? 'Close' : 'Menu'}</span>
          <span className="nav-menu-toggle-icon" aria-hidden="true">
            <span />
            <span />
            <span />
          </span>
        </button>

        <nav
          id="primary-navigation"
          className={`primary-nav${isMobileMenuOpen ? ' is-open' : ''}`}
          aria-label="Primary navigation"
        >
          <ul className="nav-links">
            {NAV_LINKS.map((item) => (
              <li key={item.label}>
                <a
                  href={resolveNavHref(item)}
                  onClick={closeMobileMenu}
                  aria-current={
                    item.label === 'Home' && isHomePage
                      ? 'page'
                      : item.href === '/blog' && isProjectsPage
                      ? 'page'
                      : item.label === 'Services' && isServicesPage
                        ? 'page'
                        : item.label === 'About' && isAboutPage
                        ? 'page'
                        : item.label === 'Contact' && isContactPage
                        ? 'page'
                        : undefined
                  }
                >
                  {item.label}
                </a>
              </li>
            ))}
            <li className="nav-links-mobile-quote">
              <a className="btn-quote nav-menu-quote" href={quoteHref} onClick={closeMobileMenu}>
                Get a Quote
              </a>
            </li>
          </ul>
        </nav>

        <a className="btn-quote btn-quote-desktop" href={quoteHref}>
          Get a Quote
        </a>
      </div>
    </header>
  );
}
