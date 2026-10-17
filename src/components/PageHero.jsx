import Media from './ui/Media.jsx';

/**
 * Image-led page hero for content pages. The overlay is only as dark as the
 * text needs (left-weighted). `size="compact"` keeps the Contact page header
 * short so the contact details stay near the top.
 */
export default function PageHero({ id, eyebrow, title, body, image, size = 'large', children }) {
  return (
    <section className={`page-hero page-hero--${size}`} aria-labelledby={id}>
      <div className="page-hero__visual">
        <Media image={image} tone="dark" className="page-hero__media" eager sizes="100vw" />
        <div className="page-hero__shade" aria-hidden="true" />
      </div>
      <div className="page-hero__inner">
        <p className="page-hero__eyebrow">
          <span className="hero__rule" aria-hidden="true" />
          {eyebrow}
        </p>
        <h1 id={id} className="page-hero__title" tabIndex={-1}>
          {title}
        </h1>
        {body ? <p className="page-hero__body">{body}</p> : null}
        {children ? <div className="btn-row page-hero__actions">{children}</div> : null}
      </div>
    </section>
  );
}
