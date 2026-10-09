import { content } from '../content/index.js';
import SectionHeading from '../components/ui/SectionHeading.jsx';

const t = content.why;

export default function WhyChoose() {
  return (
    <section id="about" className="container section section--tight" aria-labelledby="why-title">
      <div className="dark-panel">
        <div className="why__head">
          <div>
            <SectionHeading id="why-title" eyebrow={t.eyebrow} title={t.title} onDark />
          </div>
          <p className="why__intro">{t.intro}</p>
        </div>
        <ul className="why__grid">
          {t.items.map((item) => (
            <li key={item.title} className="why__item">
              <span className="why__badge" aria-hidden="true">
                {item.badge}
              </span>
              <h3 className="why__title">{item.title}</h3>
              <p className="why__text">{item.body}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
