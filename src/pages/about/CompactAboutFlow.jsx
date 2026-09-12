import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ABOUT_FLOW_CHAPTERS } from './DesktopAboutFlow';

gsap.registerPlugin(ScrollTrigger);

function CompactPinnedCard({ why = false, target = false }) {
  return <div className={`abt-compact-pinned-card${target ? ' abt-compact-pinned-card--target' : ' abt-compact-pinned-card--why'}`} aria-hidden="true">
    <span className="abt-compact-pinned-card-back" />
    <figure className="abt-compact-pinned-card-photo">
      <img src={why ? '/overview/harbor.png' : '/overview/felmex-container-lift.png'} alt="" />
    </figure>
    <img className="abt-compact-pinned-card-clip" src="/service-catalog-paperclip.png" alt="" />
    <aside className="abt-compact-pinned-card-note">
      <span />
      <h2>{why ? 'Why Choose Felmex' : 'About Us'}</h2>
    </aside>
  </div>;
}

export function CompactAboutFlow({ isLoaded = false, stats = [] }) {
  const root = useRef(null);
  const [counts, setCounts] = useState(() => stats.map(() => 0));

  useEffect(() => {
    if (!isLoaded || !stats.length) return undefined;

    const targets = stats.map((stat) => stat.count ?? (Number.parseInt(stat.value, 10) || 0));
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (reducedMotion) {
      setCounts(targets);
      return undefined;
    }

    let frame;
    let startedAt;
    const duration = 680;
    const tick = (now) => {
      if (startedAt === undefined) startedAt = now;
      const progress = Math.min(1, (now - startedAt) / duration);
      const eased = 1 - ((1 - progress) ** 3);
      setCounts(targets.map((target) => Math.round(target * eased)));

      if (progress < 1) frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [isLoaded, stats]);

  useLayoutEffect(() => {
    const flow = root.current;
    const media = gsap.matchMedia();

    media.add('(max-width: 1024px) and (prefers-reduced-motion: no-preference)', (context) => {
      const stage = flow.querySelector('.abt-compact-pinned-stage');
      const source = flow.querySelector('.abt-compact-source');
      const photo = source.querySelector('.abt-compact-source-photo--warehouse');
      const back = source.querySelector('.abt-compact-source-card-back--warehouse');
      const note = source.querySelector('.abt-compact-source-note');
      const clip = source.querySelector('.abt-compact-source-paperclip');
      const noteCopy = note.querySelector('p');
      const noteTitle = note.querySelector('h2');
      const noteRule = note.querySelector(':scope > span');
      const team = source.querySelectorAll('[class$="--team"]');
      const target = flow.querySelector('.abt-compact-pinned-card--target');
      const why = flow.querySelector('.abt-compact-pinned-card--why');
      const aboutLayer = flow.querySelector('.abt-compact-about-visual-layer');
      const whyLayer = flow.querySelector('.abt-compact-why-visual-layer');
      const canvas = flow.querySelector('.abt-compact-stage-canvas');
      const hero = flow.querySelector('.abt-compact-flow-hero');
      const heroStats = flow.querySelector('.abt-compact-hero-stats');
      const track = flow.querySelector('.abt-compact-reading-track');
      const chapters = [...track.children];
      let timeline;
      let resizeFrame;
      let disposed = false;

      const endpoint = (element, selector) => {
        const destination = target.querySelector(selector);
        return {
          x: target.offsetLeft + destination.offsetLeft - source.offsetLeft - element.offsetLeft,
          y: target.offsetTop + destination.offsetTop - source.offsetTop - element.offsetTop,
          width: destination.offsetWidth,
          height: destination.offsetHeight,
        };
      };

      const build = () => {
        const progress = timeline?.scrollTrigger?.progress ?? 0;
        timeline?.scrollTrigger?.kill();
        timeline?.kill();

        gsap.set([
          photo,
          back,
          note,
          clip,
          noteCopy,
          noteTitle,
          noteRule,
          target.querySelector('.abt-compact-pinned-card-clip'),
          ...team,
          track,
          why,
          source,
          aboutLayer,
          whyLayer,
          canvas,
          hero,
          heroStats,
        ], { clearProps: 'all' });

        const height = stage.clientHeight;
        const entry = height * 0.72;
        const hold = height * 0.22;
        const contentTop = track.offsetTop;
        const whyOffset = chapters.at(-1).offsetTop;
        const finalChapter = chapters.at(-1);
        const finalBottomInset = Math.max(32, height * 0.075);
        const travel = Math.max(
          0,
          whyOffset + contentTop - (height - finalChapter.offsetHeight - finalBottomInset)
        );
        const end = entry + hold + travel;

        gsap.set(track, { y: height });
        gsap.set(canvas, { clipPath: `inset(${height}px 0 0 0)` });
        gsap.set(why, { visibility: 'visible' });
        gsap.set(whyLayer, { clipPath: 'inset(100% 0 0 0)' });
        gsap.set(noteTitle, { visibility: 'visible', clipPath: 'inset(100% 0 0 0)' });
        gsap.set(target.querySelector('.abt-compact-pinned-card-clip'), { visibility: 'visible', y: -height });

        timeline = gsap.timeline({
          defaults: { ease: 'none' },
          scrollTrigger: {
            id: 'about-compact-flow',
            trigger: stage,
            start: 'top top',
            end: `+=${end}`,
            pin: true,
            pinType: 'fixed',
            pinSpacing: true,
            scrub: true,
            anticipatePin: 1,
          },
        });

        timeline
          .to(photo, { ...endpoint(photo, '.abt-compact-pinned-card-photo'), rotation: -6.9, duration: entry }, 0)
          .to(back, { ...endpoint(back, '.abt-compact-pinned-card-back'), rotation: 3, duration: entry }, 0)
          .to(note, { ...endpoint(note, '.abt-compact-pinned-card-note'), minHeight: 0, padding: 0, rotation: -5, duration: entry }, 0)
          .to(clip, { y: -80, clipPath: 'inset(0 0 100% 0)', duration: entry * 0.2 }, 0)
          .to([noteCopy, noteRule], { clipPath: 'inset(0 0 100% 0)', duration: entry * 0.2 }, 0)
          .to(noteTitle, { clipPath: 'inset(0 0 0 0)', duration: entry * 0.25 }, entry * 0.75)
          .to(hero, { y: -height, duration: entry * 0.7 }, 0)
          .to(heroStats, { y: -height, duration: entry * 0.7 }, 0)
          .to(team, { y: -height, duration: entry * 0.7 }, 0)
          .to(track, { y: 0, duration: entry }, 0)
          .to(canvas, { clipPath: 'inset(0px 0px 0px 0px)', duration: entry }, 0)
          .to(target.querySelector('.abt-compact-pinned-card-clip'), { y: 0, duration: entry * 0.25 }, entry * 0.75)
          .to(track, { y: -travel, duration: travel }, entry + hold);

        const handoff = entry + hold + Math.min(whyOffset, travel) - height * 0.45;
        timeline
          .to(aboutLayer, { clipPath: 'inset(0px 0px 100% 0px)', duration: height * 0.24 }, handoff)
          .to(whyLayer, { clipPath: 'inset(0px 0px 0px 0px)', duration: height * 0.24 }, handoff);

        timeline.progress(progress);
      };

      context.add('rebuild', build);
      context.rebuild();

      // ScrollTrigger swaps the stage in and out of a pin spacer. Observing that
      // element creates a refresh loop on mobile as the browser changes its
      // measured width during pinning. Rebuild only when the viewport width truly
      // changes, such as an orientation or breakpoint change.
      let viewportWidth = window.innerWidth;
      const rebuildForViewportWidth = () => {
        if (window.innerWidth === viewportWidth) return;

        viewportWidth = window.innerWidth;
        cancelAnimationFrame(resizeFrame);
        resizeFrame = requestAnimationFrame(() => {
          context.rebuild();
          ScrollTrigger.refresh();
        });
      };

      window.addEventListener('resize', rebuildForViewportWidth, { passive: true });
      document.fonts.ready.then(() => {
        if (!disposed) {
          context.rebuild();
          ScrollTrigger.refresh();
        }
      });

      return () => {
        disposed = true;
        cancelAnimationFrame(resizeFrame);
        window.removeEventListener('resize', rebuildForViewportWidth);
        timeline?.scrollTrigger?.kill();
        timeline?.kill();
      };
    });

    return () => media.revert();
  }, []);

  return <section className={`abt-compact-flow${isLoaded ? ' is-loaded' : ''}`} ref={root} aria-label="About Felmex overview">
    <header className="abt-compact-flow-hero">
      <div className="abt-compact-hero-kicker-mask"><p className="abt-compact-hero-reveal">About Us</p></div>
      <div className="abt-compact-hero-title-mask"><h1 className="abt-compact-hero-reveal">About Us<span>.</span></h1></div>
    </header>
    <div className="abt-compact-pinned-stage">
      <div className="abt-compact-stage-canvas" aria-hidden="true" />
      <div className="abt-compact-about-visual-layer">
        <div className="abt-compact-source" aria-hidden="true">
          <span className="abt-compact-source-card-back abt-compact-source-card-back--team" />
          <figure className="abt-compact-source-photo abt-compact-source-photo--team">
            <img src="/overview/team.png" alt="" width="1190" height="1322" />
          </figure>
          <span className="abt-compact-source-card-back abt-compact-source-card-back--warehouse" />
          <figure className="abt-compact-source-photo abt-compact-source-photo--warehouse">
            <img src="/overview/felmex-container-lift.png" alt="" width="1314" height="1197" />
          </figure>
          <aside className="abt-compact-source-note">
            <img className="abt-compact-source-paperclip" src="/service-catalog-paperclip.png" alt="" />
            <p>FELMEX coordinates freight, customs, warehousing, and last-mile movement with accountable handoffs.</p>
            <span />
            <h2>About Us</h2>
          </aside>
        </div>
        <CompactPinnedCard target />
      </div>
      <div className="abt-compact-hero-stats" aria-label="Felmex in numbers">
        {stats.map((stat, index) => <article key={stat.label} aria-label={`${stat.value} ${stat.label}`}>
          <strong aria-hidden="true">{counts[index]?.toLocaleString('en-US') ?? '0'}<span>+</span></strong>
          <p>{stat.label}</p>
        </article>)}
      </div>
      <div className="abt-compact-why-visual-layer"><CompactPinnedCard why /></div>
      <div className="abt-compact-reading-track">
        {ABOUT_FLOW_CHAPTERS.map((chapter) => <section className="abt-compact-reading-chapter" key={chapter.id} aria-label={chapter.label}>
          {chapter.statements.map(([label, copy]) => <article className="abt-compact-scroll-statement" key={label}>
            <p>{label}</p>
            <div>{copy}</div>
          </article>)}
        </section>)}
      </div>
    </div>
  </section>;
}
