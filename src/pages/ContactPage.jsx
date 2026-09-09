import { useMemo, useState } from 'react';
import { SplitPanelPreloader } from '../components/preloader/SplitPanelPreloader';
import { CONTACT_OFFICES } from './contact/data';
import { ScrollSectionTitle } from '../components/scroll-reveal/ScrollSectionTitle';
import { useSplitPanelPreloader } from '../hooks/useSplitPanelPreloader';
import './ContactPage.css';

const ACTIVE_OFFICE_STORAGE_KEY = 'felmex-active-office';

function ContactIcon({ name }) {
  const paths = {
    phone:
      'M6.6 10.8a15.6 15.6 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.24c1.1.36 2.3.56 3.6.56a1 1 0 0 1 1 1V20a1 1 0 0 1-1 1C10.8 21 3 13.2 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.3.2 2.5.56 3.6a1 1 0 0 1-.25 1l-2.2 2.2Z',
    mail:
      'M4 6h16a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1Zm0 2v.2l8 4.8 8-4.8V8l-8 4.8L4 8Z',
    pin:
      'M12 21s7-5.2 7-11A7 7 0 1 0 5 10c0 5.8 7 11 7 11Zm0-8a3 3 0 1 1 0-6 3 3 0 0 1 0 6Z',
    arrow: 'M4 12h15m-6-6 6 6-6 6',
  };

  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path d={paths[name]} />
    </svg>
  );
}

function getInitialOfficeId() {
  const fallbackOffice = CONTACT_OFFICES[0];

  if (typeof window === 'undefined') return fallbackOffice?.id ?? '';

  try {
    const storedOfficeId = window.localStorage.getItem(ACTIVE_OFFICE_STORAGE_KEY);
    if (CONTACT_OFFICES.some((office) => office.id === storedOfficeId)) return storedOfficeId;
  } catch {
    // Storage can be unavailable in private browsing contexts.
  }

  const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const locales = navigator.languages?.length ? navigator.languages : [navigator.language];
  const countryCodes = locales
    .map((locale) => locale?.split('-').at(-1)?.toUpperCase())
    .filter((code) => /^[A-Z]{2}$/.test(code));
  const locationMatchedOffice = CONTACT_OFFICES.find(
    (office) =>
      office.timeZones?.includes(timeZone) || office.countryCodes?.some((code) => countryCodes.includes(code))
  );

  return locationMatchedOffice?.id ?? fallbackOffice?.id ?? '';
}

function makePhoneHref(phone) {
  const digits = phone?.replace(/\D/g, '');
  return digits ? `tel:+${digits}` : undefined;
}

function OperationsNote({ compact = false }) {
  return (
    <div className={`cnt-operations-note-wrap${compact ? ' cnt-operations-note-wrap--compact' : ' cnt-operations-note-wrap--form'}`}>
      <span className="cnt-operations-note-backing" aria-hidden="true" />
      <aside className="cnt-operations-note" aria-label="What to include in your enquiry">
        <img
          className="cnt-operations-note-clip"
          src="/service-catalog-paperclip.png"
          alt=""
          aria-hidden="true"
          width="1280"
          height="1280"
        />
        <p className="cnt-operations-note-label">Operations Note</p>
        <p>Tell us the route, timing, and cargo. We’ll connect you with the right FELMEX team.</p>
        <span className="cnt-operations-note-rule" aria-hidden="true" />
      </aside>
    </div>
  );
}

export function ContactPage() {
  const isAppLoaded = useSplitPanelPreloader();
  const [activeOfficeId, setActiveOfficeId] = useState(getInitialOfficeId);
  const [formStatus, setFormStatus] = useState('');
  const activeOffice = useMemo(
    () => CONTACT_OFFICES.find((office) => office.id === activeOfficeId) ?? CONTACT_OFFICES[0],
    [activeOfficeId]
  );
  const primaryPhone =
    activeOffice?.phones.find((phone) => makePhoneHref(phone)) ?? activeOffice?.phones[0];
  const primaryPhoneHref = makePhoneHref(primaryPhone);
  const emailHref = activeOffice?.email ? `mailto:${activeOffice.email}` : undefined;

  const selectOffice = (officeId) => {
    setActiveOfficeId(officeId);
    setFormStatus('');

    try {
      window.localStorage.setItem(ACTIVE_OFFICE_STORAGE_KEY, officeId);
    } catch {
      // The selection remains active for this visit when storage is unavailable.
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!emailHref || !activeOffice) {
      setFormStatus('Please select an office with an available email address.');
      return;
    }

    const formData = new FormData(event.currentTarget);
    const body = [
      `Name: ${formData.get('name')}`,
      `Company: ${formData.get('company') || 'Not provided'}`,
      `Email: ${formData.get('email')}`,
      `Phone: ${formData.get('phone') || 'Not provided'}`,
      '',
      `${formData.get('message')}`,
    ].join('\n');
    const subject = `Website enquiry — ${activeOffice.country}`;

    window.location.href = `${emailHref}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  if (!activeOffice) return null;

  return (
    <section className="cnt-page scroll-section" id="contact-top" aria-label="Contact Felmex Global Logistics">
      <SplitPanelPreloader isAppLoaded={isAppLoaded} />
      <div className="cnt-contact-layout">
        <aside className="cnt-office-panel" aria-labelledby="cnt-office-title">
          <div className="cnt-office-intro">
            <h1 id="cnt-office-title">Get in Touch</h1>
            <span className="cnt-office-rule" aria-hidden="true" />
            <p className="cnt-office-description">
              We’re here to help you move forward. Reach out to our team and let’s build something great together.
            </p>
          </div>
          <OperationsNote compact />

          <div className="cnt-office-details" aria-live="polite">
            <div className="cnt-office-detail">
              <ContactIcon name="phone" />
              {primaryPhoneHref ? <a href={primaryPhoneHref}>{primaryPhone}</a> : <span>{primaryPhone}</span>}
            </div>
            <div className="cnt-office-detail">
              <ContactIcon name="mail" />
              {emailHref ? <a href={emailHref}>{activeOffice.email}</a> : <span>{activeOffice.email}</span>}
            </div>
            <div className="cnt-office-detail cnt-office-address">
              <ContactIcon name="pin" />
              <div>
                <strong>
                  {activeOffice.country} — {activeOffice.label}
                </strong>
                {activeOffice.addressLines.map((line) => (
                  <span key={line}>{line}</span>
                ))}
              </div>
            </div>
          </div>

          <nav className="cnt-office-switcher" aria-label="Select a country office">
            {CONTACT_OFFICES.map((office) => (
              <button
                key={office.id}
                type="button"
                className={office.id === activeOffice.id ? 'is-active' : ''}
                aria-pressed={office.id === activeOffice.id}
                onClick={() => selectOffice(office.id)}
              >
                {office.country}
              </button>
            ))}
          </nav>
        </aside>

        <div className="cnt-form-panel">
          <div className="cnt-form-heading">
            <p>Contact Us</p>
            <ScrollSectionTitle>
              Let’s Move Your Business
              <br />
              Forward, <span>Together.</span>
            </ScrollSectionTitle>
            <div>
              Partner with FELMEX Global Logistics for seamless, reliable, and scalable logistics solutions that
              drive growth and open new opportunities.
            </div>
          </div>

          <OperationsNote />

          <form className="cnt-form" id="cnt-contact-form" onSubmit={handleSubmit}>
            <div className="cnt-form-fields">
              <label className="cnt-field">
                <span>Full Name</span>
                <input name="name" type="text" autoComplete="name" placeholder="Your name" required />
              </label>
              <label className="cnt-field">
                <span>Company Name</span>
                <input name="company" type="text" autoComplete="organization" placeholder="Your company" />
              </label>
              <label className="cnt-field">
                <span>Email Address</span>
                <input name="email" type="email" autoComplete="email" placeholder="you@example.com" required />
              </label>
              <label className="cnt-field">
                <span>Phone Number</span>
                <input
                  key={activeOffice.id}
                  name="phone"
                  type="tel"
                  autoComplete="tel"
                  placeholder={primaryPhone ?? 'Your phone number'}
                />
              </label>
            </div>
            <label className="cnt-field cnt-field-message">
              <span>How can we help you?</span>
              <textarea
                name="message"
                rows="2"
                placeholder="Tell us about your logistics needs..."
                required
              />
            </label>
            <button className="cnt-submit" type="submit">
              <span>Send Message</span>
              <ContactIcon name="arrow" />
            </button>
            {formStatus ? <p className="cnt-form-status">{formStatus}</p> : null}
          </form>
        </div>
      </div>
    </section>
  );
}
