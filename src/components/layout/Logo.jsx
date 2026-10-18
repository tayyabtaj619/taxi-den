import { content } from '../../content/index.js';
import logoSrc from '../../images/brand/den-bosch-taxi-logo.png';

const { brand } = content;

/**
 * Official Den Bosch Taxi mark (transparent PNG). Aspect ratio is preserved;
 * size is controlled in CSS so the header stays compact.
 */
export function HeaderLogo() {
  return (
    <a href="#top" className="logo" aria-label={brand.homeLabel}>
      <img src={logoSrc} alt="" className="logo__img logo__img--header" width="160" height="108" decoding="async" />
    </a>
  );
}

/** Footer logo on the light footer background. */
export function FooterLogo() {
  return (
    <div className="footer__logo">
      <img src={logoSrc} alt={brand.name} className="logo__img logo__img--footer" width="180" height="121" decoding="async" />
    </div>
  );
}
