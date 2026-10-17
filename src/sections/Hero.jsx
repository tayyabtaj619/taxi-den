import { content } from '../content/index.js';
import Media from '../components/ui/Media.jsx';
import EntryCard from '../components/booking/EntryCard.jsx';

const t = content.hero;

/** Image-led hero: headline left, booking entry card right (stacked on mobile). */
export default function Hero() {
  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="hero__visual">
        <Media image={t.image} tone="dark" className="hero__media" eager sizes="100vw" />
        <div className="hero__shade" aria-hidden="true" />
      </div>

      <div className="hero__inner">
        <div className="hero__copy">
          <p className="hero__eyebrow">
            <span className="hero__rule" aria-hidden="true" />
            {t.eyebrow}
          </p>
          <h1 id="hero-title" className="hero__title">
            {t.title}
          </h1>
          <p className="hero__body">{t.body}</p>
          <ul className="hero__points">
            {t.points.map((p) => (
              <li key={p}>
                <span className="diamond" aria-hidden="true" />
                {p}
              </li>
            ))}
          </ul>
        </div>

        <EntryCard />
      </div>
    </section>
  );
}
