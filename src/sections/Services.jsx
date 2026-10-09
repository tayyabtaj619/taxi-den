import { content } from '../content/index.js';
import Media from '../components/ui/Media.jsx';
import SectionHeading from '../components/ui/SectionHeading.jsx';
import localImage from '../assets/images/local.jpg';
import airportImage from '../assets/images/Airport transfers.png';
import businessImage from '../assets/images/business transport.jpg';
import weddingImage from '../assets/images/Wedding transport.png';
import groupImage from '../assets/images/Group transport.png';
import toursImage from '../assets/images/Private tours in Den Bosch.jpg';

const t = content.services;
const serviceImages = {
  'local-card': localImage,
  'airport-card': airportImage,
  business: businessImage,
  weddings: weddingImage,
  groups: groupImage,
  tours: toursImage,
};

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
          <ServiceCard
            key={item.id}
            item={{ ...item, image: { ...item.image, src: serviceImages[item.id] } }}
          />
        ))}
      </div>
    </section>
  );
}
