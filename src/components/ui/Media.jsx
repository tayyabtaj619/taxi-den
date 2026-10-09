import { config } from '../../config.js';

/**
 * Photo slot. Pass `src` (and optional `srcSet`/`sizes`) once the approved
 * photography is supplied; it then renders a lazy-loaded <img> with the alt
 * text from the content file. Without a src it renders the design's striped
 * placeholder, which is decorative and hidden from assistive technology.
 */
export default function Media({ image, tone = 'light', className = '', eager = false }) {
  const { src, srcSet, sizes, alt, caption } = image || {};
  const classes = `media${tone === 'dark' ? ' media--dark' : ''} ${className}`.trim();

  if (src) {
    return (
      <div className={classes}>
        <img
          src={src}
          srcSet={srcSet}
          sizes={sizes}
          alt={alt}
          loading={eager ? 'eager' : 'lazy'}
          decoding="async"
          fetchpriority={eager ? 'high' : undefined}
        />
      </div>
    );
  }

  return (
    <div className={classes} aria-hidden="true">
      {config.showDevNotes && caption ? <span className="media__caption">{caption}</span> : null}
    </div>
  );
}
