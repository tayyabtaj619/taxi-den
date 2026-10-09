import { content, contact } from '../content/index.js';
import Media from '../components/ui/Media.jsx';

const t = content.hero;

export default function Hero() {
  return (
    <section className="hero" aria-labelledby="hero-title">
      <Media image={t.image} tone="dark" className="hero__media" eager />
      <div className="hero__shade" aria-hidden="true" />
      <div className="hero__inner">
        <p className="hero__eyebrow">{t.eyebrow}</p>
        <h1 id="hero-title" className="hero__title">
          {t.title}
        </h1>
        <p className="hero__body">{t.body}</p>
        <div className="btn-row hero__ctas">
          <a href="#book" className="btn btn--lg btn--gold">
            {t.ctaBook}
          </a>
          <a href={contact.phoneHref} className="btn btn--lg btn--ghost-light">
            {t.ctaCall}
          </a>
        </div>
        <ul className="hero__points">
          {t.points.map((p) => (
            <li key={p}>
              <span className="diamond" aria-hidden="true" />
              {p}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
