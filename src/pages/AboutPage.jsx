import { content } from '../content/index.js';
import PageLayout from '../components/layout/PageLayout.jsx';
import PageHero from '../components/PageHero.jsx';
import CtaBand from '../components/CtaBand.jsx';
import Media from '../components/ui/Media.jsx';
import Icon from '../components/ui/Icon.jsx';
import SectionHeading from '../components/ui/SectionHeading.jsx';
import { pagePath } from '../hooks/useHashRoute.js';

const t = content.pages.about;

export default function AboutPage() {
  return (
    <PageLayout current="about">
      <PageHero id="about-title" eyebrow={t.hero.eyebrow} title={t.hero.title} body={t.hero.body} image={t.hero.image}>
        <a href="#book" className="btn btn--lg btn--gold">
          {t.hero.primary}
          <Icon name="arrowRight" />
        </a>
        <a href={pagePath('services')} className="btn btn--lg btn--ghost-light">
          {t.hero.secondary}
        </a>
      </PageHero>

      <section className="container section" aria-labelledby="about-intro-title">
        <div className="about-intro">
          <div>
            <SectionHeading id="about-intro-title" eyebrow={t.intro.eyebrow} title={t.intro.title} />
            <div className="about-intro__body">
              {t.intro.body.map((p) => (
                <p key={p} className="lede">
                  {p}
                </p>
              ))}
            </div>
          </div>
          <dl className="facts" aria-label={t.intro.factsLabel}>
            {t.intro.facts.map((f) => (
              <div key={f.term} className="facts__row">
                <dt>{f.term}</dt>
                <dd>{f.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="container section" aria-labelledby="principles-title">
        <SectionHeading id="principles-title" eyebrow={t.principles.eyebrow} title={t.principles.title} />
        <ul className="principles">
          {t.principles.items.map((item) => (
            <li key={item.title} className="principle">
              <span className="principle__icon" aria-hidden="true">
                <Icon name={item.icon} size={22} />
              </span>
              <h3 className="principle__title">{item.title}</h3>
              <p className="principle__text">{item.body}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="container section" aria-label="Photos">
        <div className="photo-pair">
          {t.photos.map((ph) => (
            <figure key={ph.caption} className="photo">
              <Media
                image={ph.image}
                className="photo__media"
                sizes="(min-width: 900px) 600px, 100vw"
              />
              <figcaption className="photo__caption">{ph.caption}</figcaption>
            </figure>
          ))}
        </div>
      </section>

      <CtaBand id="about-cta-title" title={t.cta.title} body={t.cta.body}>
        <a href="#book" className="btn btn--lg btn--gold">
          {t.cta.primary}
          <Icon name="arrowRight" />
        </a>
        <a href={pagePath('services')} className="btn btn--lg btn--ghost-dark">
          {t.cta.secondary}
        </a>
      </CtaBand>
    </PageLayout>
  );
}
