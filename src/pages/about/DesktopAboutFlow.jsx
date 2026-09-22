import { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { AboutCapabilityCards } from './AboutCapabilityCards';

gsap.registerPlugin(ScrollTrigger);

export const ABOUT_FLOW_CHAPTERS = [
  { id: 'story', label: 'Our Story', statements: [
    ['Our Story', 'We were founded on a simple principle: freight should be predictable, transparent, and accountable. As trade grew more complex, businesses needed more than transportation; they needed a partner capable of coordinating every stage of the supply chain with precision and care. Today, we integrate sea, road, rail, and air freight into one seamless network, helping businesses move confidently across borders with reliability, integrity, and efficiency.'],
  ] },
  { id: 'who', label: 'Who We Are', statements: [
    ['Who We Are', 'We are a global multimodal logistics partner, simplifying movement across air, sea, road, and rail. We manage each shipment through clear handoffs, transparent communication, and reliable follow-through, aligning sourcing, forwarding, customs, warehousing, and delivery. Accountability, visibility, and consistency guide the way we plan, communicate, and solve problems across demanding supply chains. From first coordination to final delivery, we keep businesses informed, supported, and ready for growth.'],
  ] },
  { id: 'mission', label: 'Our Mission', statements: [
    ['Our Mission', 'We exist to simplify complexity in international trade. We integrate air, sea, road, and rail services into one cohesive network, ensuring reliable, transparent, and future-ready supply chain solutions for our partners worldwide. Our vision is to redefine global logistics by delivering seamless, multimodal solutions that connect businesses, markets, and communities with efficiency and integrity. Integrity, reliability, excellence, and collaboration guide every route, handoff, and cargo promise.'],
  ] },
];

function PinnedCard() {
  return <div className="abt-pinned-card abt-pinned-card--target" aria-hidden="true">
    <span className="abt-pinned-card-back" />
    <figure className="abt-pinned-card-photo"><img src="/overview/felmex-container-lift.png" alt="" /></figure>
    <img className="abt-pinned-card-clip" src="/service-catalog-paperclip.png" alt="" />
    <aside className="abt-pinned-card-note"><span /><h2>About Us</h2></aside>
  </div>;
}

export function DesktopAboutFlow({ isPreloaderExited = false, stats = [] }) {
  const root = useRef(null);
  useLayoutEffect(() => {
    if (!isPreloaderExited) return undefined;

    const flow = root.current;
    const media = gsap.matchMedia();
    media.add('(min-width: 1025px) and (prefers-reduced-motion: no-preference)', (context) => {
      const stage = flow.querySelector('.abt-desktop-pinned-stage');
      const collage = flow.querySelector('.abt-desktop-scroll-visual--about');
      const photo = collage.querySelector('.abt-desktop-hero-photo--warehouse');
      const back = collage.querySelector('.abt-desktop-hero-card-back--warehouse');
      const note = collage.querySelector('.abt-desktop-hero-note');
      const clip = collage.querySelector('.abt-desktop-hero-paperclip');
      const noteCopy = note.querySelector('p');
      const noteTitle = note.querySelector('h2');
      const noteRule = note.querySelector(':scope > span');
      const team = collage.querySelectorAll('[class$="--team"]');
      const target = flow.querySelector('.abt-pinned-card--target');
      const aboutLayer = flow.querySelector('.abt-desktop-about-visual-layer');
      const heroStats = flow.querySelector('.abt-desktop-hero-stats');
      const track = flow.querySelector('.abt-desktop-reading-track');
      const chapters = [...track.children];
      const nav = flow.querySelector('.abt-desktop-scroll-nav');
      const links = [...nav.querySelectorAll('a')];
      let timeline;
      let destinations = [];
      let disposed = false;

      // Measure untransformed layout boxes, never a previous scrub frame. This
      // keeps endpoints stable on refresh, resize, and reverse scrolling.
      const endpoint = (element, selector) => {
        const destination = target.querySelector(selector);
        return {
          x: target.offsetLeft + destination.offsetLeft - collage.offsetLeft - element.offsetLeft,
          y: target.offsetTop + destination.offsetTop - collage.offsetTop - element.offsetTop,
          width: destination.offsetWidth,
          height: destination.offsetHeight,
        };
      };
      const build = () => {
        const progress = timeline?.scrollTrigger?.progress ?? 0;
        timeline?.scrollTrigger?.kill();
        timeline?.kill();
        gsap.set([photo, back, note, clip, noteCopy, noteTitle, noteRule, target.querySelector('.abt-pinned-card-clip'), ...team, track, nav, collage, aboutLayer, heroStats], { clearProps: 'all' });
        const h = stage.clientHeight;
        const entry = h * 0.8;
        const hold = h * 0.3;
        const contentTop = track.offsetTop;
        const finalChapter = chapters.at(-1);
        const finalBottomInset = Math.max(48, h * 0.09);
        // Bring the last chapter down to the normal lower section inset before
        // releasing the pin. Previously it stopped at the regular reading top,
        // leaving most of a viewport blank before the partners block.
        const travel = Math.max(
          0,
          finalChapter.offsetTop + contentTop - (h - finalChapter.offsetHeight - finalBottomInset)
        );
        // Release as the final mission chapter reaches its resting place so
        // the capability cards can begin as the next independent section.
        const end = entry + hold + travel;
        destinations = chapters.map(chapter => entry + hold + Math.min(chapter.offsetTop, travel));
        gsap.set(track, { y: h });
        gsap.set(nav, { y: -h });
        gsap.set(noteTitle, { visibility: 'visible', clipPath: 'inset(100% 0 0 0)' });
        gsap.set(target.querySelector('.abt-pinned-card-clip'), { visibility: 'visible', y: -h });
        const setActive = () => {
          const time = timeline.time();
          let active = 0;
          destinations.forEach((position, index) => { if(time >= position - h * 0.22) active = index; });
          links.forEach((link, index) => {
            if(index === active) link.setAttribute('aria-current', 'location');
            else link.removeAttribute('aria-current');
          });
        };
        timeline = gsap.timeline({ defaults: { ease: 'none' }, scrollTrigger: {
          id: 'about-desktop-flow', trigger: stage, start: 'top top', end: `+=${end}`,
          pin: true, pinType: 'fixed', pinSpacing: true, scrub: true,
          anticipatePin: 1, onUpdate: setActive,
        } });
        timeline.to(photo, { ...endpoint(photo, '.abt-pinned-card-photo'), rotation: -6.9, duration: entry }, 0)
          .to(back, { ...endpoint(back, '.abt-pinned-card-back'), rotation: 3, duration: entry }, 0)
          .to(note, { ...endpoint(note, '.abt-pinned-card-note'), minHeight: 0, padding: 0, rotation: -5, duration: entry }, 0)
          .to(clip, { y: -80, clipPath: 'inset(0 0 100% 0)', duration: entry * 0.2 }, 0)
          .to([noteCopy, noteRule], { clipPath: 'inset(0 0 100% 0)', duration: entry * 0.2 }, 0)
          .to(noteTitle, { clipPath: 'inset(0% 0 0 0)', duration: entry * 0.25 }, entry * 0.75)
          .to(team, { y: -h, duration: entry * 0.7 }, 0)
          .to(heroStats, { y: -h, duration: entry * 0.7 }, 0)
          .to(track, { y: 0, duration: entry * 0.6 }, entry * 0.4)
          .to(nav, { y: 0, duration: entry * 0.4 }, entry * 0.6)
          .to(target.querySelector('.abt-pinned-card-clip'), { y: 0, duration: entry * 0.25 }, entry * 0.75)
          .to(track, { y: -travel, duration: travel }, entry + hold);
        timeline.progress(progress);
        setActive();
      };
      context.add('rebuild', build);
      context.rebuild();
      const navigate = event => {
        const link = event.target.closest('a');
        const index = links.indexOf(link);
        if(index < 0) return;
        event.preventDefault();
        window.scrollTo({ top: timeline.scrollTrigger.start + destinations[index], behavior: 'instant' });
        history.replaceState(null, '', link.hash);
      };
      nav.addEventListener('click', navigate);
      // ScrollTrigger replaces the stage with a pin spacer. A ResizeObserver on
      // the stage therefore sees the pin itself as a layout change and can keep
      // rebuilding the trigger at a zoom-dependent scroll position. Rebuild from
      // actual viewport changes instead, including Chrome desktop zoom events.
      const viewportKey = () => {
        const viewport = window.visualViewport;
        return [
          window.innerWidth,
          window.innerHeight,
          viewport?.width ?? 0,
          viewport?.height ?? 0,
          viewport?.scale ?? 1,
        ].map((value) => Math.round(value * 100) / 100).join(':');
      };
      let viewportSize = viewportKey();
      let resizeFrame;
      const rebuildForViewport = () => {
        const next = viewportKey();
        if (next === viewportSize) return;

        viewportSize = next;
        cancelAnimationFrame(resizeFrame);
        resizeFrame = requestAnimationFrame(() => {
          context.rebuild();
          ScrollTrigger.refresh();
        });
      };

      window.addEventListener('resize', rebuildForViewport, { passive: true });
      window.visualViewport?.addEventListener('resize', rebuildForViewport, { passive: true });
      document.fonts.ready.then(() => { if(!disposed) { context.rebuild(); ScrollTrigger.refresh(); } });
      return () => {
        disposed = true;
        cancelAnimationFrame(resizeFrame);
        window.removeEventListener('resize', rebuildForViewport);
        window.visualViewport?.removeEventListener('resize', rebuildForViewport);
        nav.removeEventListener('click', navigate);
        timeline?.scrollTrigger?.kill();
        timeline?.kill();
      };
    });
    return () => media.revert();
  }, [isPreloaderExited]);

  return <>
    <section
      className={`abt-desktop-scroll-flow${isPreloaderExited ? ' is-flow-ready' : ''}`}
      ref={root}
      aria-label="About Felmex overview"
    >
    <div className="abt-desktop-pinned-stage">
      <div className="abt-desktop-about-visual-layer">
      <div className="abt-desktop-scroll-visual abt-desktop-scroll-visual--about" aria-hidden="true">
        <span className="abt-desktop-hero-card-back abt-desktop-hero-card-back--team" />
        <figure className="abt-desktop-hero-photo abt-desktop-hero-photo--team"><img src="/overview/team.png" alt="" width="1190" height="1322" /></figure>
        <span className="abt-desktop-hero-card-back abt-desktop-hero-card-back--warehouse" />
        <figure className="abt-desktop-hero-photo abt-desktop-hero-photo--warehouse"><img src="/overview/felmex-container-lift.png" alt="" width="1314" height="1197" /></figure>
        <img className="abt-desktop-hero-paperclip" src="/service-catalog-paperclip.png" alt="" width="1254" height="1254" />
        <aside className="abt-desktop-hero-note">
          <p>We coordinate freight, customs, warehousing, and last-mile movement with accountable handoffs.</p>
          <span aria-hidden="true" />
          <h2>About Us</h2>
        </aside>
      </div>
      <div className="abt-desktop-hero-stats" aria-label="Felmex in numbers">
        {stats.map((stat) => <article key={stat.label}>
          <strong>{stat.value}</strong>
          <span>{stat.label}</span>
        </article>)}
      </div>
      <PinnedCard />
      </div>
      <div className="abt-desktop-reading-track">
        {ABOUT_FLOW_CHAPTERS.map(chapter => <section className="abt-desktop-reading-chapter" id={`abt-desktop-${chapter.id}`} key={chapter.id} aria-label={chapter.label}>
          {chapter.statements.map(([label, copy]) => <article className="abt-desktop-scroll-statement" key={label}><p>{label}</p><div>{copy}</div></article>)}
        </section>)}
      </div>
      <nav className="abt-desktop-scroll-nav" aria-label="About overview sections">
        {ABOUT_FLOW_CHAPTERS.map(chapter => <a href={`#abt-desktop-${chapter.id}`} key={chapter.id}>{chapter.label}</a>)}
      </nav>
      </div>
    </section>
    <AboutCapabilityCards />
  </>;
}
