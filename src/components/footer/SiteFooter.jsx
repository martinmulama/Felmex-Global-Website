import { CONTACT_CHANNELS } from '../../data/contact';
import './SiteFooter.css';

export function SiteFooter({ id = 'contact' }) {
  const pathname = typeof window === 'undefined' ? '/' : window.location.pathname;
  const isHomePage = pathname === '/';
  const aboutHref = '/about';
  const contactHref = '/contact';
  const servicesHref = '/services';
  const clientsHref = isHomePage ? '#clients' : '/#clients';
  const convictionHref = isHomePage ? '#final-conviction' : '/#final-conviction';

  return (
    <footer
      id={id}
      className="site-footer"
      aria-label="Footer and contact details"
    >
      <div className="site-footer-shell">
        <div className="site-footer-grid">
          <section className="site-footer-brand-block" aria-label="Felmex footer introduction">
            <p className="site-footer-kicker">Felmex Global Logistics</p>
            <h2 className="site-footer-title">
              Move confidently across borders with one accountable logistics partner.
            </h2>
            <p className="site-footer-copy">
              Real-time coordination across air, sea, road, and rail lanes with customs discipline
              and direct communication from booking to proof of delivery.
            </p>
            <div className="site-footer-actions">
              <a className="site-footer-cta" href="/blog">
                <span>View our projects</span>
                <span className="site-footer-cta-icon" aria-hidden="true">
                  →
                </span>
              </a>
              <a className="site-footer-cta" href={servicesHref}>
                <span>Explore services</span>
                <span className="site-footer-cta-icon" aria-hidden="true">
                  →
                </span>
              </a>
            </div>
          </section>

          <section className="site-footer-links" aria-label="Quick links">
            <p className="site-footer-list-title">Quick Links</p>
            <ul>
              <li>
                <a href={aboutHref}>About</a>
              </li>
              <li>
                <a href={servicesHref}>Services</a>
              </li>
              <li>
                <a href={contactHref}>Contact</a>
              </li>
              <li>
                <a href={clientsHref}>Client Testimonies</a>
              </li>
              <li>
                <a href="/blog">Projects</a>
              </li>
              <li>
                <a href={convictionHref}>Why Felmex</a>
              </li>
            </ul>
          </section>

          <section className="site-footer-links" aria-label="Contact channels">
            <p className="site-footer-list-title">Contact</p>
            <ul>
              <li>
                <a href={CONTACT_CHANNELS.emailHref}>{CONTACT_CHANNELS.emailDisplay}</a>
              </li>
              <li>
                <a href={CONTACT_CHANNELS.phoneHref}>{CONTACT_CHANNELS.phoneDisplay}</a>
              </li>
              <li>{CONTACT_CHANNELS.location}</li>
              <li>{CONTACT_CHANNELS.coverage}</li>
            </ul>
          </section>
        </div>

        <div className="site-footer-base">
          <p>© {new Date().getFullYear()} Felmex Global Logistics. All rights reserved.</p>
          <p>Built for dependable cross-border trade execution.</p>
        </div>
      </div>
    </footer>
  );
}
