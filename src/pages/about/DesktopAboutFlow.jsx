import { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const ABOUT_FLOW_CHAPTERS = [
  { id: 'who', label: 'Who We Are', statements: [
    ['Who We Are', 'We are a global multimodal logistics partner built to simplify complex movement across air, sea, road, and rail. Our work combines disciplined coordination with practical execution so cargo keeps moving without unnecessary friction.'],
    ['How We Work', 'Every shipment is managed through clear handoffs, transparent communication, and reliable follow-through. We align sourcing, forwarding, customs, warehousing, and delivery so each stage supports the next with less delay and less guesswork.'],
    ['What We Value', 'We believe operational clarity matters as much as speed. Accountability, visibility, and consistency guide the way we plan, communicate, and solve problems for clients navigating demanding supply chains.'],
    ['Our Commitment', 'From first coordination to final delivery, we focus on keeping businesses informed, supported, and ready for growth. Our role is to make logistics feel structured, dependable, and easier to trust.'],
  ] },
  { id: 'story', label: 'Our Story', statements: [
    ['Our Story', 'FELMEX Global Logistics was founded on a simple principle: freight should be predictable, transparent, and accountable.'],
    ['Built Around Your Business', 'As trade grew more complex, businesses needed more than transportation; they needed a partner capable of coordinating every stage of the supply chain with precision and care.'],
    ['One Connected Network', 'Today, FELMEX integrates sea, road, rail, and air freight into one seamless network, helping businesses move confidently across borders with reliability, integrity, and efficiency.'],
  ] },
  { id: 'mission', label: 'Our Mission', statements: [
    ['Our Mission', 'FELMEX Global Logistics exists to simplify complexity in international trade. We integrate air, sea, road, and rail services into one cohesive network, ensuring reliable, transparent, and future-ready supply chain solutions for our partners worldwide.'],
    ['Our Vision', 'Redefine global logistics by delivering seamless, multimodal solutions that connect businesses, markets, and communities with efficiency and integrity.'],
    ['Our Values', 'Integrity, reliability, excellence, and collaboration guide every route, handoff, and cargo promise.'],
  ] },
  { id: 'why', label: 'Why Choose Felmex', statements: [
    ['Transparent Communication', 'Clear updates and complete visibility from origin to destination. We keep your business informed with transparent communication and reliable follow-through at every handoff.'],
    ['Global Reach', 'Integrated logistics across air, sea, road, and rail. We connect sourcing, forwarding, customs, warehousing, and delivery so each stage supports the next.'],
    ['Reliable Delivery', 'Every shipment handled with precision and accountability. From first coordination to final delivery, we focus on keeping your cargo moving and your business ready for growth.'],
  ] },
];

function PinnedCard({ why = false, target = false }) {
  return <div className={`abt-pinned-card${target ? ' abt-pinned-card--target' : ' abt-pinned-card--why'}`} aria-hidden="true">
    <span className="abt-pinned-card-back" />
    <figure className="abt-pinned-card-photo"><img src={why ? '/overview/harbor.png' : '/overview/felmex-container-lift.png'} alt="" /></figure>
    <img className="abt-pinned-card-clip" src="/service-catalog-paperclip.png" alt="" />
    <aside className="abt-pinned-card-note"><span /><h2>{why ? 'Why Choose Felmex' : 'About Us'}</h2></aside>
  </div>;
}

export function DesktopAboutFlow({ stats = [] }) {
  const root = useRef(null);
  useLayoutEffect(() => {
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
      const why = flow.querySelector('.abt-pinned-card--why');
      const aboutLayer = flow.querySelector('.abt-desktop-about-visual-layer');
      const whyLayer = flow.querySelector('.abt-desktop-why-visual-layer');
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
        gsap.set([photo, back, note, clip, noteCopy, noteTitle, noteRule, target.querySelector('.abt-pinned-card-clip'), ...team, track, nav, why, collage, aboutLayer, whyLayer, heroStats], { clearProps: 'all' });
        const h = stage.clientHeight;
        const entry = h * 0.8;
        const hold = h * 0.3;
        const contentTop = track.offsetTop;
        const whyOffset = chapters.at(-1).offsetTop;
        const finalChapter = chapters.at(-1);
        const finalBottomInset = Math.max(48, h * 0.09);
        // Bring the last chapter down to the normal lower section inset before
        // releasing the pin. Previously it stopped at the regular reading top,
        // leaving most of a viewport blank before the partners block.
        const travel = Math.max(
          0,
          whyOffset + contentTop - (h - finalChapter.offsetHeight - finalBottomInset)
        );
        // Release as the final Why Choose chapter reaches its resting place.
        // Its own lower whitespace provides the same separation used between
        // the regular page sections; an additional pinned hold made the
        // partners block arrive too late.
        const end = entry + hold + travel;
        destinations = chapters.map(chapter => entry + hold + Math.min(chapter.offsetTop, travel));
        gsap.set(track, { y: h });
        gsap.set(nav, { y: -h });
        gsap.set(why, { visibility: 'visible' });
        const cardBottom = target.offsetTop + target.offsetHeight + 48;
        gsap.set(whyLayer, { clipPath: `inset(${cardBottom}px 0 0 0)` });
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
        // Both cards occupy the same measured slot throughout the handoff.
        const handoff = entry + hold + Math.min(whyOffset, travel) - h * 0.45;
        timeline.set(aboutLayer, { clipPath: `inset(0 0 ${h - cardBottom}px 0)` }, handoff)
          .to(aboutLayer, { clipPath: `inset(0 0 ${h}px 0)`, duration: h * 0.4 }, handoff)
          .to(whyLayer, { clipPath: 'inset(0px 0 0 0)', duration: h * 0.4 }, handoff);
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
      let size = `${stage.clientWidth}:${stage.clientHeight}`;
      const observer = new ResizeObserver(() => {
        const next = `${stage.clientWidth}:${stage.clientHeight}`;
        if(next !== size) { size = next; context.rebuild(); ScrollTrigger.refresh(); }
      });
      observer.observe(stage);
      document.fonts.ready.then(() => { if(!disposed) { context.rebuild(); ScrollTrigger.refresh(); } });
      return () => {
        disposed = true;
        observer.disconnect();
        nav.removeEventListener('click', navigate);
        timeline?.scrollTrigger?.kill();
        timeline?.kill();
      };
    });
    return () => media.revert();
  }, []);

  return <section className="abt-desktop-scroll-flow" ref={root} aria-label="About Felmex overview">
    <div className="abt-desktop-pinned-stage">
      <div className="abt-desktop-about-visual-layer">
      <div className="abt-desktop-scroll-visual abt-desktop-scroll-visual--about" aria-hidden="true">
        <span className="abt-desktop-hero-card-back abt-desktop-hero-card-back--team" />
        <figure className="abt-desktop-hero-photo abt-desktop-hero-photo--team"><img src="/overview/team.png" alt="" width="1190" height="1322" /></figure>
        <span className="abt-desktop-hero-card-back abt-desktop-hero-card-back--warehouse" />
        <figure className="abt-desktop-hero-photo abt-desktop-hero-photo--warehouse"><img src="/overview/felmex-container-lift.png" alt="" width="1314" height="1197" /></figure>
        <aside className="abt-desktop-hero-note">
          <img className="abt-desktop-hero-paperclip" src="/service-catalog-paperclip.png" alt="" width="1254" height="1254" />
          <p>FELMEX coordinates freight, customs, warehousing, and last-mile movement with accountable handoffs.</p>
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
      <PinnedCard target />
      </div>
      <div className="abt-desktop-why-visual-layer"><PinnedCard why /></div>
      <div className="abt-desktop-reading-track">
        {ABOUT_FLOW_CHAPTERS.map(chapter => <section className="abt-desktop-reading-chapter" id={`abt-desktop-${chapter.id}`} key={chapter.id} aria-label={chapter.label}>
          {chapter.statements.map(([label, copy]) => <article className="abt-desktop-scroll-statement" key={label}><p>{label}</p><div>{copy}</div></article>)}
        </section>)}
      </div>
      <nav className="abt-desktop-scroll-nav" aria-label="About overview sections">
        {ABOUT_FLOW_CHAPTERS.map(chapter => <a href={`#abt-desktop-${chapter.id}`} key={chapter.id}>{chapter.label}</a>)}
      </nav>
    </div>
  </section>;
}
