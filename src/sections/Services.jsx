import { content } from '../content/index.js';
import SectionHeading from '../components/ui/SectionHeading.jsx';
import ServiceCard from '../components/ServiceCard.jsx';

const t = content.services;

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
