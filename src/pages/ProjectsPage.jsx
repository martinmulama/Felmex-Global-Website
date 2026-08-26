import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';
import { SplitPanelPreloader } from '../components/preloader/SplitPanelPreloader';
import { MQ } from '../constants/breakpoints';
import { CONTACT_CHANNELS } from '../data/contact';
import { useSplitPanelPreloader } from '../hooks/useSplitPanelPreloader';
import { ONGOING_PROJECTS } from './projects/data';
import './ProjectsPage.css';

const DESKTOP_SCROLL_QUERY = MQ.nonMobile;
const REDUCED_MOTION_QUERY = '(prefers-reduced-motion: reduce)';
const TOUCH_DEVICE_QUERY = '(any-pointer: coarse)';
const DESKTOP_VISIBLE_PROJECTS = 3;
const PROJECT_IMAGE_POOL = [
  '/sea-freight.webp',
  '/road-freight.webp',
  '/air-freight.webp',
  '/rail-freight.webp',
  '/cold-general-warehousing.webp',
  '/customs-clearance-brokerage.webp',
  '/ship-service-catalog.webp',
];
const PROJECT_CLIENT_NAMES = ['Quantum sea', 'Air Uk'];

gsap.registerPlugin(ScrollTrigger);

function getProjectTone(projectIndex) {
  return projectIndex % 2 === 0 ? 'red' : 'blue';
}

function getProjectColumnTone(projectIndex) {
  if (projectIndex % 3 === 0) return 'red';
  if (projectIndex % 3 === 1) return 'blue';
  return 'neutral';
}

function getProjectBrief(project) {
  return project.subtitle ?? project.lead ?? project.body ?? '';
}

function getProjectCategory(project) {
  return project.services?.[0] ?? project.meta?.[0]?.value ?? project.eyebrow ?? 'Project Logistics';
}

function getProjectYear(project) {
  const publishedValue =
    project.meta?.find((item) => item.label.toLowerCase() === 'published')?.value ??
    project.publishedOn ??
    '';
  const yearMatch = String(publishedValue).match(/\b(19|20)\d{2}\b/);

  return yearMatch?.[0] ?? 'Ongoing';
}

function getArticleParagraphs(project) {
  if (Array.isArray(project.bodyParagraphs) && project.bodyParagraphs.length > 0) {
    return project.bodyParagraphs;
  }

  return [project.lead, project.body].filter(Boolean);
}

function getProjectImages(project) {
  return [project.image, ...PROJECT_IMAGE_POOL]
    .filter(Boolean)
    .filter((image, index, images) => images.indexOf(image) === index)
    .slice(0, 5);
}

function getProjectClientDetails(project) {
  return project.clients ?? PROJECT_CLIENT_NAMES;
}

function getProjectPublishedDate(project) {
  return (
    project.meta?.find((item) => item.label.toLowerCase() === 'published')?.value ??
    project.publishedOn ??
    'Ongoing'
  );
}

function getHeaderClearance() {
  if (typeof document === 'undefined') return 0;

  const headerElement = document.querySelector('.site-header');
  return headerElement ? Math.ceil(headerElement.getBoundingClientRect().height) : 0;
}

function getIsTouchLikeDevice() {
  if (typeof window === 'undefined') return false;

  return (navigator.maxTouchPoints ?? 0) > 0 || window.matchMedia(TOUCH_DEVICE_QUERY).matches;
}

function canScrollInsideProjectDrawer(target, deltaY) {
  if (!(target instanceof Element)) return false;

  const scrollable = target.closest('.prj-drop-copy, .prj-detail-overlay');
  if (!scrollable || scrollable.scrollHeight <= scrollable.clientHeight + 1) return false;

  const isAtTop = scrollable.scrollTop <= 0;
  const isAtBottom = scrollable.scrollTop + scrollable.clientHeight >= scrollable.scrollHeight - 1;

  return (deltaY < 0 && !isAtTop) || (deltaY > 0 && !isAtBottom);
}

function ProjectDetailDrawer({ project, projectIndex, onClose }) {
  const paragraphs = getArticleParagraphs(project);
  const projectImages = getProjectImages(project);
  const clientDetails = getProjectClientDetails(project);
  const publishedDate = getProjectPublishedDate(project);
  const tone = getProjectTone(projectIndex);

  return (
    <div
      className={`prj-detail-overlay prj-detail-overlay--${tone}`}
      role="dialog"
      aria-modal="true"
      aria-labelledby="prj-detail-title"
    >
      <section className="prj-drop-panel" aria-label={`${project.title} details`}>
        <div className="prj-drop-identity">
          <p className="prj-drop-name" id="prj-detail-title">
            {project.title}
          </p>
          <figure className="prj-drop-portrait">
            <img src={project.image} alt={project.imageAlt} width="420" height="300" />
          </figure>
        </div>

        <article className="prj-drop-story" aria-label={`${project.title} article`}>
          <div className="prj-drop-copy">
            {paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </article>

        <aside className="prj-drop-facts" aria-label="Clients">
          <div className="prj-drop-client">
            <p className="prj-drop-facts-label">Clients</p>
            <ul>
              {clientDetails.map((detail) => (
                <li key={detail}>{detail}</li>
              ))}
            </ul>
          </div>
          <div className="prj-drop-published">
            <p>Published</p>
            <span>{publishedDate}</span>
          </div>
        </aside>

        <button className="prj-drop-close" type="button" aria-label="Close project" onClick={onClose}>
          <span aria-hidden="true">X</span>
        </button>
      </section>

      <div className="prj-drop-media-strip" aria-hidden="true">
        {projectImages.map((image, index) => (
          <figure key={`${project.id}-${image}`} className="prj-drop-media-item">
            <img src={image} alt="" width="520" height="320" loading={index === 0 ? 'eager' : 'lazy'} />
          </figure>
        ))}
      </div>
    </div>
  );
}

function ProjectColumn({ project, projectIndex, onOpen }) {
  const tone = getProjectColumnTone(projectIndex);
  const titleId = `prj-column-title-${project.id}`;
  const briefId = `prj-column-brief-${project.id}`;

  return (
    <article className={`prj-column prj-column--${tone}`} aria-labelledby={titleId}>
      <button
        className="prj-column-open"
        type="button"
        aria-describedby={briefId}
        aria-label={`Open ${project.title}`}
        onClick={() => onOpen(project.id)}
      />
      <figure className="prj-column-media">
        <img
          src={project.image}
          alt={project.imageAlt}
          width="520"
          height="760"
          loading={projectIndex < DESKTOP_VISIBLE_PROJECTS ? 'eager' : 'lazy'}
          decoding="async"
        />
      </figure>
      <p className="prj-column-brief" id={briefId}>
        {getProjectBrief(project)}
      </p>
      <div className="prj-column-meta">
        <h2 className="prj-column-title" id={titleId}>
          {project.title}
        </h2>
        <p className="prj-column-category">{getProjectCategory(project)}</p>
        <p className="prj-column-year">{getProjectYear(project)}</p>
      </div>
    </article>
  );
}

export function ProjectsPage() {
  const isAppLoaded = useSplitPanelPreloader();
  const pageRef = useRef(null);
  const pinRef = useRef(null);
  const viewportRef = useRef(null);
  const trackRef = useRef(null);
  const progressRef = useRef(null);
  const scrollTriggerRef = useRef(null);
  const lenisRef = useRef(null);
  const [openProjectId, setOpenProjectId] = useState(null);
  const [usesNativeProjectScroll, setUsesNativeProjectScroll] = useState(false);

  const projectList = useMemo(() => ONGOING_PROJECTS, []);
  const timelineMarkers = useMemo(() => {
    if (projectList.length === 0) return [];

    const middleIndex = Math.floor((projectList.length - 1) / 2);

    return [
      {
        project: projectList[middleIndex],
        projectIndex: middleIndex,
      },
    ];
  }, [projectList]);
  const openProjectIndex = projectList.findIndex((project) => project.id === openProjectId);
  const openProject = openProjectIndex >= 0 ? projectList[openProjectIndex] : null;

  const calculateScrollDistance = useCallback(() => {
    const viewport = viewportRef.current;
    const track = trackRef.current;

    if (!viewport || !track) return 0;

    return Math.max(0, track.scrollWidth - viewport.clientWidth);
  }, []);

  const scrollToPagePosition = useCallback((targetY) => {
    const lenis = lenisRef.current;

    if (lenis) {
      lenis.scrollTo(targetY, {
        duration: 1.05,
        easing: (time) => Math.min(1, 1.001 - 2 ** (-10 * time)),
      });
      return;
    }

    window.scrollTo({
      top: targetY,
      behavior: 'smooth',
    });
  }, []);

  const scrollToProjectIndex = useCallback(
    (projectIndex) => {
      const trigger = scrollTriggerRef.current;

      if (!trigger) return;

      const maxSteps = Math.max(1, projectList.length - DESKTOP_VISIBLE_PROJECTS);
      const stepIndex = Math.min(projectIndex, maxSteps);
      const progress = stepIndex / maxSteps;
      const targetY = trigger.start + (trigger.end - trigger.start) * progress;

      scrollToPagePosition(targetY);
    },
    [projectList.length, scrollToPagePosition]
  );

  useLayoutEffect(() => {
    if (typeof window === 'undefined' || typeof document === 'undefined') return undefined;

    const root = pageRef.current;
    const pin = pinRef.current;
    const viewport = viewportRef.current;
    const track = trackRef.current;

    if (!root || !pin || !viewport || !track) return undefined;

    const desktopQuery = window.matchMedia(DESKTOP_SCROLL_QUERY);
    const reducedMotionQuery = window.matchMedia(REDUCED_MOTION_QUERY);
    const touchDeviceQuery = window.matchMedia(TOUCH_DEVICE_QUERY);
    const listeners = [];
    let animationContext = null;
    let lenisUnsubscribe = null;
    let lenisTicker = null;

    const addMediaListener = (mediaQuery, callback) => {
      if (typeof mediaQuery.addEventListener === 'function') {
        mediaQuery.addEventListener('change', callback);
        listeners.push(() => mediaQuery.removeEventListener('change', callback));
        return;
      }

      mediaQuery.addListener(callback);
      listeners.push(() => mediaQuery.removeListener(callback));
    };

    const teardown = () => {
      animationContext?.revert();
      animationContext = null;
      scrollTriggerRef.current = null;

      if (lenisTicker) {
        gsap.ticker.remove(lenisTicker);
        lenisTicker = null;
      }

      lenisUnsubscribe?.();
      lenisUnsubscribe = null;
      lenisRef.current?.destroy();
      lenisRef.current = null;

      gsap.set(track, { clearProps: 'transform' });
      progressRef.current && gsap.set(progressRef.current, { clearProps: 'transform' });
    };

    const refreshScrollTrigger = () => {
      lenisRef.current?.resize();
      ScrollTrigger.refresh();
    };

    const setup = () => {
      teardown();

      const shouldUseNativeScroll =
        !desktopQuery.matches || reducedMotionQuery.matches || getIsTouchLikeDevice();

      setUsesNativeProjectScroll(shouldUseNativeScroll);

      if (shouldUseNativeScroll) {
        ScrollTrigger.refresh();
        return;
      }

      const lenis = new Lenis({
        autoRaf: false,
        duration: 1.05,
        lerp: 0.08,
        smoothWheel: true,
        syncTouch: false,
        touchMultiplier: 0,
        wheelMultiplier: 0.86,
        prevent: (node) => Boolean(node.closest('.prj-detail-overlay')),
        respectReducedMotion: true,
      });

      lenisRef.current = lenis;
      lenisUnsubscribe = lenis.on('scroll', ScrollTrigger.update);
      lenisTicker = (time) => lenis.raf(time * 1000);
      gsap.ticker.add(lenisTicker);

      animationContext = gsap.context(() => {
        gsap.set(track, { x: 0 });
        progressRef.current && gsap.set(progressRef.current, { scaleX: 0, transformOrigin: 'left center' });

        const timeline = gsap.timeline({
          defaults: { ease: 'none' },
          scrollTrigger: {
            trigger: root,
            pin,
            scrub: 0.85,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            start: () => `top top+=${getHeaderClearance()}`,
            end: () => `+=${calculateScrollDistance()}`,
          },
        });

        timeline.to(
          track,
          {
            x: () => -calculateScrollDistance(),
            duration: 1,
          },
          0
        );

        if (progressRef.current) {
          timeline.to(
            progressRef.current,
            {
              scaleX: 1,
              duration: 1,
            },
            0
          );
        }

        scrollTriggerRef.current = timeline.scrollTrigger;
      }, root);

      refreshScrollTrigger();
    };

    const handleImageSettled = () => refreshScrollTrigger();
    const mediaElements = Array.from(root.querySelectorAll('img'));
    mediaElements.forEach((image) => {
      if (image.complete) return;
      image.addEventListener('load', handleImageSettled, { once: true });
      image.addEventListener('error', handleImageSettled, { once: true });
    });

    setup();
    addMediaListener(desktopQuery, setup);
    addMediaListener(reducedMotionQuery, setup);
    addMediaListener(touchDeviceQuery, setup);
    window.addEventListener('resize', refreshScrollTrigger);
    window.addEventListener('load', refreshScrollTrigger, { once: true });

    return () => {
      listeners.forEach((removeListener) => removeListener());
      window.removeEventListener('resize', refreshScrollTrigger);
      window.removeEventListener('load', refreshScrollTrigger);
      mediaElements.forEach((image) => {
        image.removeEventListener('load', handleImageSettled);
        image.removeEventListener('error', handleImageSettled);
      });
      teardown();
    };
  }, [calculateScrollDistance]);

  useEffect(() => {
    if (typeof document === 'undefined') return undefined;

    if (!openProject) return undefined;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    lenisRef.current?.stop();

    return () => {
      document.body.style.overflow = previousOverflow;
      lenisRef.current?.start();
      ScrollTrigger.refresh();
    };
  }, [openProject]);

  useEffect(() => {
    if (typeof document === 'undefined' || !openProject) return undefined;

    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        setOpenProjectId(null);
      }
    };

    document.addEventListener('keydown', handleEscape);

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [openProject]);

  const handleDetailWheel = (event) => {
    if (!openProject) return;

    if (event.target instanceof Element && event.target.closest('.prj-detail-overlay')) {
      if (canScrollInsideProjectDrawer(event.target, event.deltaY)) return;
      event.preventDefault();
    }
  };

  if (projectList.length === 0) {
    return (
      <section className="prj-page" id="projects-top" aria-label="Projects">
        <SplitPanelPreloader isAppLoaded={isAppLoaded} />
      </section>
    );
  }

  return (
    <section
      className={`prj-page${openProject ? ' is-detail-open' : ''}${
        usesNativeProjectScroll ? ' is-native-project-scroll' : ''
      }`}
      id="projects-top"
      aria-label="Projects"
      ref={pageRef}
      onWheel={handleDetailWheel}
    >
      <SplitPanelPreloader isAppLoaded={isAppLoaded} />
      <div className="prj-horizontal-pin" ref={pinRef}>
        <div className="prj-gallery-viewport" ref={viewportRef}>
          <div className="prj-track" ref={trackRef}>
            {projectList.map((project, projectIndex) => (
              <ProjectColumn
                key={project.id}
                project={project}
                projectIndex={projectIndex}
                onOpen={setOpenProjectId}
              />
            ))}
          </div>
        </div>

        <div className="prj-timeline" aria-label="Project chronology">
          <span className="prj-timeline-edge prj-timeline-edge--newest">Newest</span>
          <div className="prj-timeline-rail">
            <span className="prj-timeline-fill" ref={progressRef} />
            <div
              className="prj-timeline-nodes"
              style={{ '--prj-node-count': timelineMarkers.length }}
            >
              {timelineMarkers.map(({ project, projectIndex }) => (
                <button
                  className="prj-timeline-node"
                  key={project.id}
                  type="button"
                  aria-label={`Scroll to ${project.title}`}
                  onClick={() => scrollToProjectIndex(projectIndex)}
                >
                  <span />
                  <strong>{getProjectYear(project)}</strong>
                </button>
              ))}
            </div>
          </div>
          <span className="prj-timeline-edge prj-timeline-edge--oldest">Oldest</span>
        </div>

        <div className="prj-page-cta" aria-label="Project contact">
          <p>
            Delivering <span>tomorrow's trade</span> today.
          </p>
          <a href={CONTACT_CHANNELS.phoneHref}>
            Call us: <strong>{CONTACT_CHANNELS.phoneDisplay}</strong>
          </a>
        </div>
      </div>

      {openProject ? (
        <ProjectDetailDrawer
          project={openProject}
          projectIndex={openProjectIndex}
          onClose={() => setOpenProjectId(null)}
        />
      ) : null}
    </section>
  );
}
