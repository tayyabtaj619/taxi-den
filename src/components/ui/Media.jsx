import { useState } from 'react';
import { config } from '../../config.js';

/**
 * Photo slot. `src` is a URL Vite produced from a static import in the
 * component that uses the image (`import heroImage from '../images/…'`).
 * The slot's size comes from CSS (aspect-ratio or absolute fill), so images
 * cause no layout shift.
 *
 * - eager: load first with high priority (heroes); otherwise lazy-loaded.
 * - No src: renders the design's striped placeholder (decorative, hidden from
 *   assistive tech).
 * - Broken src: logged as an error in every environment; in development the
 *   slot is also outlined and labelled. In production the <img> stays in
 *   place (alt text visible), never hidden.
 */
export default function Media({ src, alt = '', tone = 'light', className = '', eager = false }) {
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
          src={src}
          alt={alt}
          loading={eager ? 'eager' : 'lazy'}
          decoding={eager ? 'sync' : 'async'}
          fetchpriority={eager ? 'high' : undefined}
          onError={() => {
            console.error(`[Media] Image failed to load: ${src}`);
            setFailed(true);
          }}
        />
        {failed && config.showDevNotes ? <span className="media__error">Missing image: {src}</span> : null}
      </div>
    );
  }

  return <div className={classes} aria-hidden="true" />;
}
