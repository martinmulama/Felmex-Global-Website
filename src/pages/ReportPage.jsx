import { DEFAULT_REPORT_SLUG, findReportBySlug } from '../data/reports';
import { SplitPanelPreloader } from '../components/preloader/SplitPanelPreloader';
import { ScrollSectionTitle } from '../components/scroll-reveal/ScrollSectionTitle';
import { useSplitPanelPreloader } from '../hooks/useSplitPanelPreloader';
import './ReportPage.css';

export function ReportPage({ slug = DEFAULT_REPORT_SLUG }) {
  const isAppLoaded = useSplitPanelPreloader();
  const report = findReportBySlug(slug);

  if (!report) {
    return (
      <section className="report-page" aria-label="Report not found">
        <SplitPanelPreloader isAppLoaded={isAppLoaded} />
        <div className="container report-not-found">
          <p className="report-not-found-kicker">Report unavailable</p>
          <h1 className="report-not-found-title">We could not find that report.</h1>
          <p className="report-not-found-copy">The report link may have changed or the article may have been moved.</p>
          <a className="report-not-found-link" href="/blog">
            Return to the blog
          </a>
        </div>
      </section>
    );
  }

  return (
    <section className="report-page" id="report-top" aria-label="Full report">
      <SplitPanelPreloader isAppLoaded={isAppLoaded} />
      <header className="container report-hero" aria-label="Report header">
        <a className="report-back-link" href="/blog#blog-top">
          ← Back to journal
        </a>

        <p className="report-kicker">{report.category}</p>
        <h1 className="report-title">{report.title}</h1>
        <p className="report-dek">{report.dek}</p>

        <p className="report-meta">
          <span>Published {report.date}</span>
          <span>Updated {report.updated}</span>
          <span>{report.readTime}</span>
          <span>{report.analyst}</span>
        </p>
      </header>

      <section className="container report-feature-grid" aria-label="Feature image and highlights">
        <figure className="report-feature-figure">
          <img
            src={report.image}
            alt={report.imageAlt}
            loading="eager"
            fetchpriority="high"
            decoding="async"
            width="1600"
            height="1067"
          />
          <figcaption>{report.imageCaption}</figcaption>
        </figure>

        <aside className="report-highlight-panel" aria-label="Highlights">
          <p className="report-highlight-heading">Key highlights</p>
          <ul className="report-highlight-list">
            {report.keyTakeaways.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>

          <div className="report-stat-grid" role="list" aria-label="Report metrics">
            {report.stats.map((stat) => (
              <article className="report-stat-card" role="listitem" key={stat.label}>
                <p className="report-stat-value">{stat.value}</p>
                <p className="report-stat-label">{stat.label}</p>
              </article>
            ))}
          </div>
        </aside>
      </section>

      <section className="container report-body-grid" aria-label="Report body">
        <aside className="report-rail" aria-label="Report navigation">
          <p className="report-rail-title">In this report</p>
          <ol className="report-rail-list">
            {report.sections.map((section) => (
              <li key={section.id}>
                <a href={`#${section.id}`}>{section.heading}</a>
              </li>
            ))}
          </ol>
          <a className="report-rail-top" href="#report-top">
            Back to top
          </a>
        </aside>

        <article className="report-article" aria-label="Report article content">
          {report.sections.map((section) => (
            <section className="report-article-section scroll-section" key={section.id} id={section.id}>
              <ScrollSectionTitle>{section.heading}</ScrollSectionTitle>
              {section.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </section>
          ))}

          <section className="report-sources scroll-section" aria-label="Sources">
            <ScrollSectionTitle>Sources and references</ScrollSectionTitle>
            <ul>
              {report.sources.map((source) => (
                <li key={source.href}>
                  <a href={source.href} target="_blank" rel="noreferrer noopener">
                    {source.label}
                  </a>
                </li>
              ))}
            </ul>
          </section>

          <div className="report-end-actions">
            <a className="report-end-link" href="/blog">
              Explore more reports
            </a>
          </div>
        </article>
      </section>
    </section>
  );
}
