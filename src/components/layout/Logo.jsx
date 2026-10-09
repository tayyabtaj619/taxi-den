import { content } from '../../content/index.js';

const { brand } = content;

/** Header logo: gold mark, white wordmark, links to the top of the page. */
export function HeaderLogo() {
  return (
    <a href="#top" className="logo" aria-label={brand.homeLabel}>
      <span className="logo__mark" aria-hidden="true">{brand.mark}</span>
      <span className="logo__text" aria-hidden="true">
        <span className="logo__name">{brand.name}</span>
        <span className="logo__sub">{brand.sub}</span>
      </span>
    </a>
  );
}

/** Footer logo: dark mark with gold letters. */
export function FooterLogo() {
  return (
    <div className="footer__logo">
      <span className="logo__mark logo__mark--dark" aria-hidden="true">{brand.mark}</span>
      <span className="logo__name">{brand.name}</span>
    </div>
  );
}
