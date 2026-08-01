import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { ONGOING_PROJECTS } from './projects/data';
import './ProjectsPage.css';

const LOOP_COPIES = 15;
const CENTER_LOOP_INDEX = Math.floor(LOOP_COPIES / 2);
const DESKTOP_PROJECT_FOCUS_RATIO = 2.5 / 8;
const MOBILE_PROJECT_FOCUS_RATIO = 0.62;
const PROJECT_SEQUENCE_START_ID = 'port-drayage-window';
const FEATURED_PROJECT_ID = 'port-drayage-window';
const DEFAULT_PROJECT_ID =
  ONGOING_PROJECTS.find((project) => project.id === 'regional-delivery-pulse')?.id ??
  ONGOING_PROJECTS[0]?.id ??
  '';
const PROJECT_IMAGE_POOL = [
  '/project-hero-1536.webp',
  '/sea-freight.webp',
  '/road-freight.webp',
  '/air-freight.webp',
  '/rail-freight.webp',
  '/cold-general-warehousing.webp',
  '/customs-clearance-brokerage.webp',
  '/ship-service-catalog.webp',
];
const PROJECT_CLIENT_NAMES = ['Apple', 'NFL', 'BMW', 'Stella', 'State Farm'];
const PROJECT_BACKDROP_IMAGES = {
  'port-drayage-window': '/ship-service-catalog.webp',
  'port-to-plant': '/felmex-overview-port-lift-1536.webp',
  'brokerage-preclearance': '/customs-clearance-brokerage.webp',
  'regional-delivery-pulse': '/road-freight.webp',
  'cold-chain-release': '/cold-general-warehousing.webp',
  'border-continuity': '/road-freight.webp',
  'airbridge-spares': '/air-freight.webp',
  'rail-linked-program': '/rail-freight.webp',
};
const PROJECT_SIDEBAR_DETAILS = {
  'port-to-plant': {
    location: 'Mombasa, Kenya',
    timeline: 'May 2024 - Ongoing',
    service: 'Project Logistics',
    client: 'Global Manufacturing Co.',
  },
  'cold-chain-release': {
    location: 'Nairobi, Kenya',
    timeline: 'April 2024 - Ongoing',
    service: 'Cold Warehousing',
    client: 'Regional Foods Co.',
  },
  'border-continuity': {
    location: 'Namanga Corridor',
    timeline: 'April 2024 - Ongoing',
    service: 'Customs Brokerage',
    client: 'Program Freight Client',
  },
  'airbridge-spares': {
    location: 'Jomo Kenyatta Intl.',
    timeline: 'March 2024 - Ongoing',
    service: 'Air Freight',
    client: 'Engineering Spares Client',
  },
  'rail-linked-program': {
    location: 'Nairobi ICD',
    timeline: 'March 2024 - Ongoing',
    service: 'Rail Freight',
    client: 'Inland Equipment Co.',
  },
  'brokerage-recovery': {
    location: 'Port of Mombasa',
    timeline: 'March 2024 - Ongoing',
    service: 'Brokerage Support',
    client: 'Import Program Client',
  },
  'port-drayage-window': {
    copy:
      'Streamlining port turnaround times through intelligent scheduling, real-time visibility, and coordinated movement control.',
    location: 'Mombasa, Kenya',
    timeline: 'May 2024 - Ongoing',
    service: 'Port Operations',
    client: 'Global Manufacturing Co.',
  },
  'brokerage-preclearance': {
    location: 'Mombasa, Kenya',
    timeline: 'February 2024 - Ongoing',
    service: 'Pre-Clearance',
    client: 'Import Desk Client',
  },
  'regional-delivery-pulse': {
    location: 'East Africa',
    timeline: 'February 2024 - Ongoing',
    service: 'Road Distribution',
    client: 'Retail Distribution Co.',
  },
};

function getProjectTone(projectIndex) {
  return projectIndex % 2 === 0 ? 'red' : 'blue';
}

function getSequencedProjects() {
  const startIndex = ONGOING_PROJECTS.findIndex((project) => project.id === PROJECT_SEQUENCE_START_ID);
  if (startIndex < 0) return ONGOING_PROJECTS;

  return [...ONGOING_PROJECTS.slice(startIndex), ...ONGOING_PROJECTS.slice(0, startIndex)];
}

function getProjectFocusRatio() {
  if (typeof window === 'undefined') return DESKTOP_PROJECT_FOCUS_RATIO;

  return window.matchMedia('(max-width: 900px)').matches
    ? MOBILE_PROJECT_FOCUS_RATIO
    : DESKTOP_PROJECT_FOCUS_RATIO;
}

function getRailFocusY(rail) {
  const railRect = rail.getBoundingClientRect();
  return railRect.top + railRect.height * getProjectFocusRatio();
}

function getProjectDisplayIndex(projectId) {
  const startIndex = ONGOING_PROJECTS.findIndex((project) => project.id === PROJECT_SEQUENCE_START_ID);
  const projectIndex = ONGOING_PROJECTS.findIndex((project) => project.id === projectId);

  if (startIndex < 0 || projectIndex < 0) return '01';

  return String(((projectIndex - startIndex + ONGOING_PROJECTS.length) % ONGOING_PROJECTS.length) + 1).padStart(
    2,
    '0'
  );
}

function getProjectSidebarDetails(project) {
  const details = PROJECT_SIDEBAR_DETAILS[project.id] ?? {};
  const primaryService = project.services?.[0] ?? 'Project Logistics';

  return {
    copy: details.copy ?? project.subtitle ?? project.lead,
    facts: [
      { label: 'Location', value: details.location ?? 'Mombasa, Kenya' },
      { label: 'Timeline', value: details.timeline ?? 'Ongoing' },
      { label: 'Service', value: details.service ?? primaryService },
      { label: 'Client', value: details.client ?? 'Global Manufacturing Co.' },
    ],
  };
}

function getProjectPreviewImages(project) {
  return getProjectImages(project).slice(0, 2);
}

function getProjectBackdropImage(project) {
  return PROJECT_BACKDROP_IMAGES[project.id] ?? project.image;
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

function getLoopMetrics(rail) {
  const stack = rail.querySelector('.prj-title-stack');
  const loopHeight = ((stack?.scrollHeight ?? rail.scrollHeight) || 0) / LOOP_COPIES;

  return {
    contentStart: stack?.offsetTop ?? 0,
    loopHeight,
  };
}

function getCenteredTitleItem(rail) {
  const items = Array.from(rail.querySelectorAll('.prj-title-item'));
  if (items.length === 0) return null;

  const railFocusY = getRailFocusY(rail);
  let centeredItem = items[0];
  let shortestDistance = Number.POSITIVE_INFINITY;

  items.forEach((item) => {
    const itemRect = item.getBoundingClientRect();
    const itemCenterY = itemRect.top + itemRect.height / 2;
    const distance = Math.abs(itemCenterY - railFocusY);

    if (distance < shortestDistance) {
      shortestDistance = distance;
      centeredItem = item;
    }
  });

  return centeredItem;
}

function getProjectTitleItem(rail, projectId, loopIndex = CENTER_LOOP_INDEX) {
  const items = Array.from(rail.querySelectorAll('.prj-title-item'));

  return (
    items.find(
      (item) => item.dataset.projectId === projectId && Number(item.dataset.loopIndex) === loopIndex
    ) ?? items.find((item) => item.dataset.projectId === projectId)
  );
}

function scrollTitleItemToCenter(rail, item, behavior = 'smooth') {
  if (!rail || !item) return;

  const targetTop = item.offsetTop - rail.clientHeight * getProjectFocusRatio() + item.offsetHeight / 2;

  if (Math.abs(rail.scrollTop - targetTop) > 0.5) {
    rail.scrollTo({
      top: targetTop,
      behavior,
    });
  }
}

function canScrollInsideProjectDrawer(target, deltaY) {
  if (!(target instanceof Element)) return false;

  const scrollable = target.closest('.prj-drop-copy');
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

export function ProjectsPage() {
  const titleRailRef = useRef(null);
  const animationFrameRef = useRef(null);
  const settleTimerRef = useRef(null);
  const touchYRef = useRef(null);
  const hasUserDrivenRailRef = useRef(false);
  const [selectedProjectId, setSelectedProjectId] = useState(DEFAULT_PROJECT_ID);
  const [featuredProjectId, setFeaturedProjectId] = useState(
    ONGOING_PROJECTS.find((project) => project.id === FEATURED_PROJECT_ID)?.id ?? DEFAULT_PROJECT_ID
  );
  const [activeItemKey, setActiveItemKey] = useState('');
  const [openProjectId, setOpenProjectId] = useState(null);
  const [hoveredProjectId, setHoveredProjectId] = useState(null);

  const loopedProjects = useMemo(
    () =>
      Array.from({ length: LOOP_COPIES }, (_, loopIndex) => {
        const sequencedProjects = getSequencedProjects();

        return sequencedProjects.map((project, projectIndex) => ({
          itemKey: `${loopIndex}-${project.id}`,
          loopIndex,
          project,
          projectIndex,
        }));
      }).flat(),
    []
  );

  const selectedProjectIndex = Math.max(
    ONGOING_PROJECTS.findIndex((project) => project.id === selectedProjectId),
    0
  );
  const selectedProject = ONGOING_PROJECTS[selectedProjectIndex] ?? ONGOING_PROJECTS[0];
  const featuredProject =
    ONGOING_PROJECTS.find((project) => project.id === featuredProjectId) ?? selectedProject ?? ONGOING_PROJECTS[0];
  const featuredProjectSidebar = getProjectSidebarDetails(featuredProject);
  const selectedProjectPreviewImages = getProjectPreviewImages(selectedProject);
  const openProjectIndex = ONGOING_PROJECTS.findIndex((project) => project.id === openProjectId);
  const openProject = openProjectIndex >= 0 ? ONGOING_PROJECTS[openProjectIndex] : null;

  const recycleRailScroll = useCallback(() => {
    const rail = titleRailRef.current;
    if (!rail) return;

    const { contentStart, loopHeight } = getLoopMetrics(rail);
    if (!loopHeight) return;

    const lowerLimit = contentStart + loopHeight * (CENTER_LOOP_INDEX - 2);
    const upperLimit = contentStart + loopHeight * (CENTER_LOOP_INDEX + 2);

    if (rail.scrollTop < lowerLimit || rail.scrollTop > upperLimit) {
      const offsetWithinLoop = ((rail.scrollTop - contentStart) % loopHeight + loopHeight) % loopHeight;
      rail.scrollTop = contentStart + loopHeight * CENTER_LOOP_INDEX + offsetWithinLoop;
    }
  }, []);

  const syncActiveProject = useCallback(() => {
    const rail = titleRailRef.current;
    if (!rail) return;

    const centeredItem = getCenteredTitleItem(rail);
    if (!centeredItem) return;

    const nextProjectId = centeredItem.dataset.projectId;
    const nextItemKey = centeredItem.dataset.itemKey;

    if (nextProjectId) {
      setSelectedProjectId((currentProjectId) =>
        currentProjectId === nextProjectId ? currentProjectId : nextProjectId
      );

      if (hasUserDrivenRailRef.current) {
        setFeaturedProjectId((currentProjectId) =>
          currentProjectId === nextProjectId ? currentProjectId : nextProjectId
        );
      }
    }

    if (nextItemKey) {
      setActiveItemKey((currentItemKey) => (currentItemKey === nextItemKey ? currentItemKey : nextItemKey));
    }
  }, []);

  const queueRailSync = useCallback(() => {
    if (animationFrameRef.current !== null) return;

    animationFrameRef.current = window.requestAnimationFrame(() => {
      animationFrameRef.current = null;
      recycleRailScroll();
      syncActiveProject();
    });
  }, [recycleRailScroll, syncActiveProject]);

  const snapRailToCenteredTitle = useCallback(() => {
    if (settleTimerRef.current !== null) {
      window.clearTimeout(settleTimerRef.current);
    }

    settleTimerRef.current = window.setTimeout(() => {
      settleTimerRef.current = null;
      const rail = titleRailRef.current;
      if (!rail) return;

      scrollTitleItemToCenter(rail, getCenteredTitleItem(rail));
    }, 120);
  }, []);

  const moveRailBy = useCallback(
    (deltaY) => {
      const rail = titleRailRef.current;
      if (!rail) return;

      hasUserDrivenRailRef.current = true;
      rail.scrollTop += deltaY;
      recycleRailScroll();
      queueRailSync();
      snapRailToCenteredTitle();
    },
    [queueRailSync, recycleRailScroll, snapRailToCenteredTitle]
  );

  const focusProjectInRail = useCallback(
    (projectId, behavior = 'smooth') => {
      const rail = titleRailRef.current;
      if (!rail || !projectId) return;

      const targetItem = getProjectTitleItem(rail, projectId);
      scrollTitleItemToCenter(rail, targetItem, behavior);
      queueRailSync();
    },
    [queueRailSync]
  );

  useEffect(() => {
    if (typeof document === 'undefined') return undefined;

    document.documentElement.classList.add('projects-page-scroll-lock');
    document.body.classList.add('projects-page-scroll-lock');

    return () => {
      document.documentElement.classList.remove('projects-page-scroll-lock');
      document.body.classList.remove('projects-page-scroll-lock');
    };
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return undefined;

    const frameId = window.requestAnimationFrame(() => {
      focusProjectInRail(DEFAULT_PROJECT_ID, 'auto');
      syncActiveProject();
    });

    return () => window.cancelAnimationFrame(frameId);
  }, [focusProjectInRail, syncActiveProject]);

  useEffect(() => {
    if (typeof window === 'undefined') return undefined;

    let frameId = 0;

    const handleResize = () => {
      if (frameId) return;

      frameId = window.requestAnimationFrame(() => {
        frameId = 0;
        focusProjectInRail(selectedProjectId, 'auto');
        syncActiveProject();
      });
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (frameId) {
        window.cancelAnimationFrame(frameId);
      }
    };
  }, [focusProjectInRail, selectedProjectId, syncActiveProject]);

  useEffect(
    () => () => {
      if (animationFrameRef.current !== null) {
        window.cancelAnimationFrame(animationFrameRef.current);
      }

      if (settleTimerRef.current !== null) {
        window.clearTimeout(settleTimerRef.current);
      }
    },
    []
  );

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

  const handleWheel = (event) => {
    if (event.target instanceof Element && event.target.closest('.prj-detail-overlay')) {
      if (canScrollInsideProjectDrawer(event.target, event.deltaY)) return;
      event.preventDefault();
      return;
    }

    event.preventDefault();
    moveRailBy(event.deltaY);
  };

  const handleTouchStart = (event) => {
    touchYRef.current = event.touches[0]?.clientY ?? null;
  };

  const handleTouchMove = (event) => {
    if (event.target instanceof Element && event.target.closest('.prj-detail-overlay')) return;

    const nextTouchY = event.touches[0]?.clientY;
    if (touchYRef.current === null || nextTouchY === undefined) return;

    event.preventDefault();
    moveRailBy(touchYRef.current - nextTouchY);
    touchYRef.current = nextTouchY;
  };

  const handleRailScroll = () => {
    queueRailSync();
    snapRailToCenteredTitle();
  };

  const handleRailKeyDown = (event) => {
    if (event.key === 'ArrowDown') {
      event.preventDefault();
      moveRailBy(48);
    }

    if (event.key === 'ArrowUp') {
      event.preventDefault();
      moveRailBy(-48);
    }

    if (event.key === 'PageDown') {
      event.preventDefault();
      moveRailBy(220);
    }

    if (event.key === 'PageUp') {
      event.preventDefault();
      moveRailBy(-220);
    }
  };

  const handleProjectClick = (projectId, item) => {
    hasUserDrivenRailRef.current = true;
    setSelectedProjectId(projectId);
    setFeaturedProjectId(projectId);
    setActiveItemKey(item.dataset.itemKey ?? '');
    setOpenProjectId(projectId);
    scrollTitleItemToCenter(titleRailRef.current, item);
  };

  if (!selectedProject) {
    return <section className="prj-page" id="projects-top" aria-label="Projects" />;
  }

  return (
    <section
      className={`prj-page${openProject ? ' is-detail-open' : ''}`}
      id="projects-top"
      aria-label="Projects"
      onTouchMove={handleTouchMove}
      onTouchStart={handleTouchStart}
      onWheel={handleWheel}
    >
      <div className="prj-page-canvas">
        <figure className="prj-page-bg" aria-hidden="true">
          <img src={getProjectBackdropImage(featuredProject)} alt="" width="1440" height="960" decoding="async" />
        </figure>

        <aside className="prj-current-panel" aria-label="Focused project summary">
          <p className="prj-current-kicker">Current Project</p>
          <h1 className="prj-current-title">{featuredProject.title}</h1>
          <p className="prj-current-copy">{featuredProjectSidebar.copy}</p>
          <dl className="prj-current-facts">
            {featuredProjectSidebar.facts.map((fact) => (
              <div className="prj-current-fact" key={fact.label}>
                <dt>{fact.label}</dt>
                <dd>{fact.value}</dd>
              </div>
            ))}
          </dl>
        </aside>

        <div className="prj-title-viewport" aria-label={`${selectedProject.title} project list`}>
          <div
            className="prj-title-rail"
            ref={titleRailRef}
            tabIndex={0}
            role="listbox"
            aria-activedescendant={activeItemKey ? `prj-title-${activeItemKey}` : undefined}
            aria-label="Project title list"
            onKeyDown={handleRailKeyDown}
            onScroll={handleRailScroll}
          >
            <div className="prj-title-stack">
              {loopedProjects.map(({ itemKey, loopIndex, project, projectIndex }) => {
                const isCentered = activeItemKey === itemKey;
                const isOpen = openProjectId === project.id;
                const isHovered = hoveredProjectId === project.id;
                const tone = getProjectTone(projectIndex);

                return (
                  <button
                    className={`prj-title-item prj-title-item--${tone}${isCentered ? ' is-centered' : ''}${
                      isOpen ? ' is-open' : ''
                    }${isHovered ? ' is-hovered' : ''}`}
                    data-item-key={itemKey}
                    data-display-index={getProjectDisplayIndex(project.id)}
                    data-loop-index={loopIndex}
                    data-project-id={project.id}
                    id={`prj-title-${itemKey}`}
                    key={itemKey}
                    type="button"
                    role="option"
                    aria-expanded={isOpen}
                    aria-selected={isCentered}
                    onBlur={() => setHoveredProjectId(null)}
                    onClick={(event) => handleProjectClick(project.id, event.currentTarget)}
                    onFocus={() => {
                      setHoveredProjectId(project.id);
                      setFeaturedProjectId(project.id);
                    }}
                    onMouseEnter={() => {
                      setHoveredProjectId(project.id);
                      setFeaturedProjectId(project.id);
                    }}
                    onMouseLeave={() => setHoveredProjectId(null)}
                  >
                    <span className="prj-title-index" aria-hidden="true">
                      {getProjectDisplayIndex(project.id)}
                    </span>
                    <span className="prj-title-copy">{project.title}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        <div className="prj-focus-media" aria-hidden="true">
          {selectedProjectPreviewImages.map((image, index) => (
            <figure className="prj-focus-media-card" key={`${selectedProject.id}-${image}`}>
              <img
                src={image}
                alt=""
                width="360"
                height="230"
                loading={index === 0 ? 'eager' : 'lazy'}
              />
            </figure>
          ))}
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
