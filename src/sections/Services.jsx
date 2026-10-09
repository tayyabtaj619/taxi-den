import { content } from '../content/index.js';
import Media from '../components/ui/Media.jsx';
import SectionHeading from '../components/ui/SectionHeading.jsx';

const t = content.services;

function ServiceCard({ item }) {
  return (
    <article id={item.id} className="card">
      <Media image={item.image} className="card__media" />
      <div className="card__body">
        <h3 className="card__title">{item.title}</h3>
        {item.body.map((p) => (
          <p key={p} className="card__text">
            {p}
          </p>
        ))}
        <div className="card__links">
          {item.links.map((l) => (
            <a key={l.label} href={l.href} className="text-link">
              {l.label}
            </a>
          ))}
        </div>
      </div>
    </article>
  );
}

export default function Services() {
  return (
    <section id="services" className="container section" aria-labelledby="services-title">
      <div className="section-head">
        <div>
          <SectionHeading id="services-title" eyebrow={t.eyebrow} title={t.title} />
        </div>
        <p className="section-head__intro">{t.intro}</p>
      </div>
      <div className="cards">
        {t.items.map((item) => (
          <ServiceCard key={item.id} item={item} />
        ))}
      </div>
    </section>
  );
}
