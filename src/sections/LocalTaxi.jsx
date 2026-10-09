import { content, contact } from '../content/index.js';
import Media from '../components/ui/Media.jsx';
import SectionHeading from '../components/ui/SectionHeading.jsx';

const t = content.local;

export default function LocalTaxi() {
  return (
    <section id="local" className="container section" aria-labelledby="local-title">
      <div className="split">
        <div>
          <SectionHeading id="local-title" eyebrow={t.eyebrow} title={t.title} />
          <p className="lede split__p1">{t.body[0]}</p>
          <p className="lede split__p2">{t.body[1]}</p>
          <div className="btn-row">
            <a href="#book" className="btn btn--md btn--ink">
              {t.ctaBook}
            </a>
            <a href={contact.phoneHref} className="btn btn--md btn--outline">
              {t.ctaCall}
            </a>
          </div>
        </div>
        <Media image={t.image} className="split__media" />
      </div>
    </section>
  );
}
