import Media from './ui/Media.jsx';
import Icon from './ui/Icon.jsx';

/**
 * One service: photo (16:10), title, description, optional verified tags and
 * one or more actions. Used by the homepage Services section and the
 * Services page, so both stay identical in structure.
 */
export default function ServiceCard({ item, id, links, tags, headingLevel = 3 }) {
  const Heading = `h${headingLevel}`;
  const actions = links || item.links;
  return (
    <article id={id ?? item.id} className="card">
      <Media image={item.image} className="card__media" sizes="(min-width: 1080px) 400px, (min-width: 720px) 50vw, 100vw" />
      <div className="card__body">
        <Heading className="card__title">{item.title}</Heading>
        {item.body.map((p) => (
          <p key={p} className="card__text">
            {p}
          </p>
        ))}
        {tags?.length ? (
          <ul className="card__tags">
            {tags.map((t) => (
              <li key={t}>{t}</li>
            ))}
          </ul>
        ) : null}
        <div className="card__links">
          {actions.map((l) => (
            <a key={l.label} href={l.href} className={l.button ? 'btn btn--secondary btn--sm card__action' : 'text-link'}>
              {l.label}
              {l.button ? <Icon name="arrowRight" size={16} /> : null}
            </a>
          ))}
        </div>
      </div>
    </article>
  );
}
