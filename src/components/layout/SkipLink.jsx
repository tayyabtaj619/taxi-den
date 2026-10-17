/**
 * Skip link that moves focus to the main region without changing the URL
 * hash (with hash routing, a plain href="#main" would count as navigation).
 */
export default function SkipLink({ target = 'main', children = 'Skip to content' }) {
  const onClick = (e) => {
    const el = document.getElementById(target);
    if (!el) return;
    e.preventDefault();
    if (!el.hasAttribute('tabindex')) el.setAttribute('tabindex', '-1');
    el.focus();
    el.scrollIntoView({ block: 'start' });
  };
  return (
    <a href={`#${target}`} className="skip-link" onClick={onClick}>
      {children}
    </a>
  );
}
