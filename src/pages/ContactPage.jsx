import { useEffect, useState } from 'react';
import { CONTACT_CHANNELS } from '../data/contact';
import { CONTACT_HIGHLIGHTS, CONTACT_OFFICES } from './contact/data';
import './ContactPage.css';

function ContactMetaIcon({ kind }) {
  if (kind === 'office') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        <path d="M5.5 20V8.5h7V20M10.2 20h8.3V4.5h-6V20M8 11.3h2M8 14.5h2M14.7 8.5h2M14.7 11.7h2M14.7 14.9h2" />
      </svg>
    );
  }

  if (kind === 'pin') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        <path d="M12 20s6-5.7 6-10.4A6 6 0 1 0 6 9.6C6 14.3 12 20 12 20Z" />
        <circle cx="12" cy="9.6" r="2.2" />
      </svg>
    );
  }

  if (kind === 'phone') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        <path d="M7.2 4.5c.5-.5 1.2-.7 1.9-.4l1.7.7c.7.3 1.1 1 1 1.8l-.2 1.8c0 .3 0 .6.2.8.9 1.8 2.3 3.2 4.1 4.1.3.2.5.2.8.2l1.8-.2c.8-.1 1.5.3 1.8 1l.7 1.7c.3.7.1 1.5-.4 1.9l-1.6 1.6c-.8.8-2 1.1-3.1.8-2.5-.7-4.8-2-6.8-4-2-2-3.3-4.3-4-6.8-.3-1.1 0-2.3.8-3.1L7.2 4.5Z" />
      </svg>
    );
  }

  if (kind === 'mail') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        <path d="M4.5 7.2A1.7 1.7 0 0 1 6.2 5.5h11.6a1.7 1.7 0 0 1 1.7 1.7v9.6a1.7 1.7 0 0 1-1.7 1.7H6.2a1.7 1.7 0 0 1-1.7-1.7V7.2Z" />
        <path d="m5.8 7.5 6.2 5 6.2-5" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path d="M12 6.2v6.1l3.5 2" />
      <circle cx="12" cy="12" r="8" />
    </svg>
  );
}

function ContactHighlightIcon({ kind }) {
  return (
    <span className="cnt-highlight-icon" aria-hidden="true">
      <ContactMetaIcon kind={kind} />
    </span>
  );
}

export function ContactPage() {
  const [isHeroEntered, setIsHeroEntered] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  const [submitState, setSubmitState] = useState('');

  useEffect(() => {
    let rafOne = null;
    let rafTwo = null;

    setIsHeroEntered(false);
    rafOne = window.requestAnimationFrame(() => {
      rafTwo = window.requestAnimationFrame(() => {
        setIsHeroEntered(true);
      });
    });

    return () => {
      if (rafOne !== null) window.cancelAnimationFrame(rafOne);
      if (rafTwo !== null) window.cancelAnimationFrame(rafTwo);
    };
  }, []);

  const handleFieldChange = (event) => {
    const { name, value } = event.target;

    setFormData((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const trimmedName = formData.name.trim();
    const trimmedEmail = formData.email.trim();
    const trimmedPhone = formData.phone.trim();
    const trimmedMessage = formData.message.trim();
    const subject = `Felmex inquiry from ${trimmedName || 'Website visitor'}`;
    const bodyLines = [
      `Name: ${trimmedName}`,
      `Email: ${trimmedEmail}`,
      `Phone: ${trimmedPhone}`,
      '',
      'Message:',
      trimmedMessage,
    ];
    const mailtoHref = `mailto:${CONTACT_CHANNELS.emailDisplay}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(bodyLines.join('\n'))}`;

    setSubmitState('Opening your email app with the message drafted.');

    if (typeof window !== 'undefined') {
      window.location.href = mailtoHref;
    }
  };

  return (
    <section className="cnt-page" id="contact-top" aria-label="Contact Felmex Global Logistics">
      <section className={`cnt-hero${isHeroEntered ? ' is-entered' : ''}`} aria-label="Contact Felmex hero">
        <div className="cnt-container cnt-hero-shell">
          <div className="cnt-hero-panel">
            <div className="cnt-hero-copy">
              <p className="cnt-section-kicker">Contact Felmex</p>
              <h1 className="cnt-hero-title">
                <span className="cnt-hero-title-line">
                  <span>
                    Send the message once.
                  </span>
                </span>
                <span className="cnt-hero-title-line">
                  <span>
                    We&apos;ll route it to the <span className="cnt-title-accent">right logistics desk.</span>
                  </span>
                </span>
              </h1>
              <p className="cnt-hero-text">
                <span>
                  Use the office rail for direct country contacts, or send one message through the
                  form and let Felmex connect you to the right team for quoting, coordination, and
                  shipment planning.
                </span>
              </p>

              <div className="cnt-hero-actions">
                <a className="cnt-btn-primary" href="#cnt-contact-form">
                  Request a quote
                </a>
                <a className="cnt-btn-ghost" href="#cnt-offices">
                  View offices
                </a>
              </div>
            </div>

            <div className="cnt-hero-visual" aria-hidden="true">
              <picture className="cnt-hero-picture">
                <source
                  type="image/webp"
                  srcSet="/contact-network-hero-960.webp 960w, /contact-network-hero-1440.webp 1440w"
                  sizes="(max-width: 640px) calc(100vw - 1.5rem), (max-width: 1080px) calc(100vw - 2rem), 54vw"
                />
                <img
                  src="/contact-network-hero-1440.webp"
                  alt=""
                  width="1440"
                  height="727"
                  decoding="async"
                  fetchPriority="high"
                  loading="eager"
                />
              </picture>
            </div>
          </div>

          <div className="cnt-hero-highlights" role="list" aria-label="Contact page highlights">
            {CONTACT_HIGHLIGHTS.map((item) => (
              <article key={item.label} className="cnt-highlight-card" role="listitem">
                <ContactHighlightIcon kind={item.icon} />
                <div className="cnt-highlight-copy-block">
                  <p className="cnt-highlight-label">{item.label}</p>
                  <p className="cnt-highlight-value">{item.value}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="cnt-main">
        <div className="cnt-container cnt-main-grid">
          <div className="cnt-office-column" id="cnt-offices">
            <div className="cnt-office-rail-head">
              <h2 className="cnt-section-title">
                Our <span className="site-section-title-accent--flat">offices</span>
              </h2>
              <span />
            </div>

            <div className="cnt-office-list" role="list" aria-label="Felmex office addresses">
              {CONTACT_OFFICES.map((office, index) => (
                <article key={office.id} className="cnt-office-card" role="listitem">
                  <div className="cnt-office-icon-wrap" aria-hidden="true">
                    <div className="cnt-office-index">{(index + 1).toString().padStart(2, '0')}</div>
                    <div className="cnt-office-badge-icon">
                      <ContactMetaIcon kind="office" />
                    </div>
                  </div>

                  <div className="cnt-office-primary">
                    <div className="cnt-office-head">
                      <div>
                        <h3 className="cnt-office-title">
                          {office.country}
                        </h3>
                      </div>
                      <span className="cnt-office-tag">{office.label}</span>
                    </div>

                    <div className="cnt-office-address">
                      <span className="cnt-office-meta-icon" aria-hidden="true">
                        <ContactMetaIcon kind="pin" />
                      </span>
                      <div className="cnt-office-lines">
                        {office.addressLines.map((line) => (
                          <p key={`${office.id}-${line}`}>{line}</p>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="cnt-office-secondary">
                    <div className="cnt-office-meta">
                      <div className="cnt-office-meta-block">
                        <span className="cnt-office-meta-icon" aria-hidden="true">
                          <ContactMetaIcon kind="mail" />
                        </span>
                        <p className="cnt-office-meta-copy">
                          <a href={`mailto:${office.email}`}>{office.email}</a>
                        </p>
                      </div>

                      <div className="cnt-office-meta-block">
                        <span className="cnt-office-meta-icon" aria-hidden="true">
                          <ContactMetaIcon kind="phone" />
                        </span>
                        <div className="cnt-office-lines">
                          {office.phones.map((phone) => (
                            <p key={`${office.id}-${phone}`}>{phone}</p>
                          ))}
                        </div>
                      </div>

                      <div className="cnt-office-meta-block">
                        <span className="cnt-office-meta-icon" aria-hidden="true">
                          <ContactMetaIcon kind="clock" />
                        </span>
                        <p className="cnt-office-meta-copy">{office.hours}</p>
                      </div>
                    </div>

                    <a className="cnt-office-directions" href={office.directionsHref}>
                      <span>Get directions</span>
                      <span aria-hidden="true">↗</span>
                    </a>
                  </div>
                </article>
              ))}
            </div>
          </div>

          <aside className="cnt-form-column" aria-label="Send Felmex a message">
            <div className="cnt-form-sticky">
              <section className="cnt-form-card" id="cnt-contact-form">
                <p className="cnt-form-kicker">Write to us</p>
                <h2 className="cnt-form-title">
                  Request a <span className="site-section-title-accent">quote</span>
                </h2>
                <p className="cnt-form-copy">
                  Share your contact details and a short message. We&apos;ll get back to you
                  within 24 hours.
                </p>

                <div className="cnt-form-channels" aria-label="Quick contact options">
                  <a href={CONTACT_CHANNELS.emailHref}>
                    <ContactMetaIcon kind="mail" />
                    <span>{CONTACT_CHANNELS.emailDisplay}</span>
                  </a>
                  <a href={CONTACT_CHANNELS.phoneHref}>
                    <ContactMetaIcon kind="phone" />
                    <span>{CONTACT_CHANNELS.phoneDisplay}</span>
                  </a>
                </div>

                <form className="cnt-form" onSubmit={handleSubmit}>
                  <label className="cnt-field">
                    <span>Full name</span>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleFieldChange}
                      placeholder="Your full name"
                      autoComplete="name"
                      required
                    />
                  </label>

                  <label className="cnt-field">
                    <span>Email address</span>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleFieldChange}
                      placeholder="name@company.com"
                      autoComplete="email"
                      required
                    />
                  </label>

                  <label className="cnt-field">
                    <span>Phone number (optional)</span>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleFieldChange}
                      placeholder="+254 7xx xxx xxx"
                      autoComplete="tel"
                    />
                  </label>

                  <label className="cnt-field">
                    <span>Message</span>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleFieldChange}
                      placeholder="Tell us the country pair, cargo type, timelines, or any office you want to reach."
                      required
                    />
                  </label>

                  <button className="cnt-submit" type="submit">
                    <span>Send Request</span>
                    <span aria-hidden="true">→</span>
                  </button>
                </form>

                <p className="cnt-form-note">Your information is secure and will never be shared.</p>

                {submitState ? (
                  <p className="cnt-form-status" role="status" aria-live="polite">
                    {submitState}
                  </p>
                ) : null}
              </section>
            </div>
          </aside>
        </div>
      </section>
    </section>
  );
}
