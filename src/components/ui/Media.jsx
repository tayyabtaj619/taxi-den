import { useState } from 'react';
import { config } from '../../config.js';

// Root-relative public paths ('/images/...') are prefixed with Vite's base
// URL, so the site also works when deployed under a sub-path (vite `base`).
// Absolute URLs (https://…) and data: URIs are used as-is.
const BASE = import.meta.env.BASE_URL.replace(/\/$/, '');
export const assetUrl = (src) => (src && src.startsWith('/') ? `${BASE}${src}` : src);

/**
 * Photo slot. Renders `image.src` (a path into public/images, set in the
 * content file) with its alt text. The slot's size comes from CSS
 * (aspect-ratio or absolute fill), so images cause no layout shift.
 *
 * - eager: load first with high priority (heroes); otherwise lazy-loaded.
 * - No src: renders the design's striped placeholder (decorative, hidden from
 *   assistive tech) with the slot caption in development.
 * - Broken src: logged as an error in every environment; in development the
 *   slot is also outlined and labelled so a wrong path is impossible to miss.
 *   In production the <img> stays in place (alt text visible), never hidden.
 */
export default function Media({ image, tone = 'light', className = '', eager = false, sizes }) {
  const { src, srcSet, alt = '', caption, position } = image || {};
  const [failed, setFailed] = useState(false);
  const classes = [
    'media',
    tone === 'dark' ? 'media--dark' : '',
    src ? 'media--photo' : '',
    failed && config.showDevNotes ? 'media--broken' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  if (src) {
    return (
      <div className={classes}>
        <img
          src={assetUrl(src)}
          srcSet={srcSet}
          sizes={sizes}
          alt={alt}
          loading={eager ? 'eager' : 'lazy'}
          decoding={eager ? 'sync' : 'async'}
          fetchPriority={eager ? 'high' : undefined}
          style={position ? { objectPosition: position } : undefined}
          onError={() => {
            console.error(`[Media] Image not found: ${src} (check public${src} and image.src in src/content)`);
            setFailed(true);
          }}
        />
        {failed && config.showDevNotes ? <span className="media__error">Missing image: {src}</span> : null}
      </div>
    );
  }

  return (
    <div className={classes} aria-hidden="true">
      {config.showDevNotes && caption ? <span className="media__caption">{caption}</span> : null}
    </div>
  );
}
