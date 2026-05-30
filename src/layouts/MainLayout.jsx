import { Navbar } from '../components/navigation/Navbar';
import { SiteFooter } from '../components/footer/SiteFooter';

export function MainLayout({
  children,
  isContentPreview = false,
  previewLabel = 'Page',
}) {
  return (
    <>
      <Navbar />
      <main className={`site-main${isContentPreview ? ' is-content-preview' : ''}`}>
        <div className={`site-main-content${isContentPreview ? ' is-blurred' : ''}`}>
          {children}
        </div>
        {isContentPreview ? (
          <div className="site-preview-banner" role="status" aria-live="polite">
            <p className="site-preview-kicker">Under Development</p>
            <h2 className="site-preview-title">{previewLabel} is still under development.</h2>
            <p className="site-preview-copy">
              Home and Services are live. This page is temporarily blurred while we finish the
              content, layout, and interactions.
            </p>
          </div>
        ) : null}
      </main>
      <SiteFooter />
    </>
  );
}
