import PageLayout from './PageLayout.jsx';

/** Shared frame for long-form Help / Privacy / Terms pages. */
export default function LegalLayout({ current, titleId, eyebrow, title, intro, children }) {
  return (
    <PageLayout current={current} className="page--legal">
      <header className="legal-hero">
        <div className="container legal-hero__inner">
          {eyebrow ? <p className="legal-hero__eyebrow">{eyebrow}</p> : null}
          <h1 id={titleId} className="legal-hero__title" tabIndex={-1}>
            {title}
          </h1>
          {intro ? <p className="legal-hero__intro">{intro}</p> : null}
        </div>
      </header>
      <div className="container legal-body">{children}</div>
    </PageLayout>
  );
}
