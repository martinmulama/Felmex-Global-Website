import { CONTACT_CHANNELS, MAIN_OFFICE_ADDRESS_LINES } from '../../data/contact';
import './SiteFooter.css';

function FooterIcon({ kind }) {
  const paths = {
    phone:
      'M6.6 10.8a15.6 15.6 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.24c1.1.36 2.3.56 3.6.56a1 1 0 0 1 1 1V20a1 1 0 0 1-1 1C10.8 21 3 13.2 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.3.2 2.5.56 3.6a1 1 0 0 1-.25 1l-2.2 2.2Z',
    mail:
      'M4 6h16a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1Zm0 2v.2l8 4.8 8-4.8V8l-8 4.8L4 8Z',
    pin:
      'M12 21c4.2-4.4 6.3-7.8 6.3-10.4a6.3 6.3 0 1 0-12.6 0C5.7 13.2 7.8 16.6 12 21Zm0-8a2.4 2.4 0 1 1 0-4.8 2.4 2.4 0 0 1 0 4.8Z',
    route:
      'M6.5 18.5a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm11-11a2 2 0 1 0 0-4 2 2 0 0 0 0 4ZM8.5 16.5h3.1a5.9 5.9 0 0 0 5.9-5.9V7.5',
    quote:
      'M4 7h16a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V8a1 1 0 0 1 1-1Zm2 3v2h12v-2H6Zm0 4v2h8v-2H6Z',
    projects:
      'M5 5h14v14H5V5Zm2 2v10h10V7H7Zm2 2h6v2H9V9Zm0 4h4v2H9v-2Z',
  };

  return (
    <svg viewBox="0 0 24 24" focusable="false" aria-hidden="true">
      <path d={paths[kind] ?? paths.route} />
    </svg>
  );
}

export function SiteFooter({ id = 'contact' }) {
  const pathname = typeof window === 'undefined' ? '/' : window.location.pathname;
  const isHomePage = pathname === '/';
  const homeHash = (targetId) => (isHomePage ? `#${targetId}` : `/#${targetId}`);
  const contactFormHref = '/contact#cnt-contact-form';

  const solutionLinks = [
    { label: 'Source', href: homeHash('landing-final-tab-source') },
    { label: 'Store', href: homeHash('landing-final-tab-store') },
    { label: 'Process', href: homeHash('landing-final-tab-process') },
    { label: 'Ship', href: homeHash('landing-final-tab-ship') },
    { label: 'Scale', href: homeHash('landing-final-tab-scale') },
  ];
  const companyLinks = [
    { label: 'About Us', href: '/about' },
    { label: 'Our Approach', href: homeHash('why-choose-felmex') },
    { label: 'Services', href: '/services' },
    { label: 'Projects', href: '/blog' },
    { label: 'Contact Us', href: '/contact' },
  ];
  const resourceLinks = [
    { label: 'Case Studies', href: '/blog' },
    { label: 'Reports', href: '/blog/report' },
    { label: 'Client Testimonials', href: homeHash('clients') },
    { label: 'Service Catalog', href: homeHash('services-catalog') },
    { label: 'Request Support', href: contactFormHref },
  ];
  const quickActions = [
    { label: 'Call Felmex', href: CONTACT_CHANNELS.phoneHref, icon: 'phone' },
    { label: 'Email Felmex', href: CONTACT_CHANNELS.emailHref, icon: 'mail' },
    { label: 'View projects', href: '/blog', icon: 'projects' },
    { label: 'Request a quote', href: contactFormHref, icon: 'quote' },
  ];

  return (
    <footer
      id={id}
      className="site-footer"
      aria-label="Footer and contact details"
    >
      <div className="site-footer-shell">
        <div className="site-footer-grid">
          <section className="site-footer-brand-block" aria-label="Felmex footer introduction">
            <a className="site-footer-wordmark" href="/" aria-label="Felmex Global Logistics home">
              Felmex Global Logistics
            </a>
            <p className="site-footer-copy">
              Delivering seamless logistics solutions that connect businesses to the world.
            </p>
            <div className="site-footer-action-icons" aria-label="Quick footer actions">
              {quickActions.map((action) => (
                <a key={action.label} href={action.href} aria-label={action.label}>
                  <FooterIcon kind={action.icon} />
                </a>
              ))}
            </div>
          </section>

          <section className="site-footer-links" aria-label="Solutions">
            <p className="site-footer-list-title">Solutions</p>
            <ul>
              {solutionLinks.map((link) => (
                <li key={link.label}>
                  <a href={link.href}>{link.label}</a>
                </li>
              ))}
            </ul>
          </section>

          <section className="site-footer-links" aria-label="Company">
            <p className="site-footer-list-title">Company</p>
            <ul>
              {companyLinks.map((link) => (
                <li key={link.label}>
                  <a href={link.href}>{link.label}</a>
                </li>
              ))}
            </ul>
          </section>

          <section className="site-footer-links" aria-label="Resources">
            <p className="site-footer-list-title">Resources</p>
            <ul>
              {resourceLinks.map((link) => (
                <li key={link.label}>
                  <a href={link.href}>{link.label}</a>
                </li>
              ))}
            </ul>
          </section>

          <section className="site-footer-contact" aria-label="Contact Felmex">
            <p className="site-footer-list-title">Contact Us</p>
            <ul>
              <li>
                <FooterIcon kind="pin" />
                <span>
                  {MAIN_OFFICE_ADDRESS_LINES.map((line) => (
                    <span key={line}>{line}</span>
                  ))}
                </span>
              </li>
              <li>
                <FooterIcon kind="phone" />
                <a href={CONTACT_CHANNELS.phoneHref}>{CONTACT_CHANNELS.phoneDisplay}</a>
              </li>
              <li>
                <FooterIcon kind="mail" />
                <a href={CONTACT_CHANNELS.emailHref}>{CONTACT_CHANNELS.emailDisplay}</a>
              </li>
            </ul>
          </section>
        </div>

        <div className="site-footer-base">
          <p>© {new Date().getFullYear()} Felmex Global Logistics. All rights reserved.</p>
          <nav className="site-footer-base-links" aria-label="Footer links">
            <a href="/services">Services</a>
            <a href="/blog">Projects</a>
            <a href="/contact">Contact</a>
          </nav>
        </div>
      </div>
    </footer>
  );
}
