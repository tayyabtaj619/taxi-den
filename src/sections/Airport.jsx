import { content } from '../content/index.js';
import Media from '../components/ui/Media.jsx';
import SectionHeading from '../components/ui/SectionHeading.jsx';
import airportImage from '../assets/images/Airport Transfer.png';

const t = content.airport;

export default function Airport() {
  return (
    <section id="airport" className="container section" aria-labelledby="airport-title">
      <div className="split">
        <Media image={{ ...t.image, src: airportImage }} tone="dark" className="split__media" />
        <div>
          <SectionHeading id="airport-title" eyebrow={t.eyebrow} title={t.title} />
          <p className="lede split__p1">{t.body[0]}</p>
          <p className="lede split__p2">{t.body[1]}</p>
          <ul className="routes">
            {t.routes.map((route) => (
              <li key={route}>
                <span className="routes__name">{route}</span>
                <a href="#book" aria-label={`${t.routeCta.replace(' →', '')}: ${route}`}>
                  {t.routeCta}
                </a>
              </li>
            ))}
          </ul>
          <div className="btn-row airport__cta">
            <a href="#book" className="btn btn--md btn--ink">
              {t.cta}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
