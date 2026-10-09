/** Gold eyebrow label above a section <h2>. */
export default function SectionHeading({ id, eyebrow, title, onDark = false, className = '' }) {
  return (
    <>
      {eyebrow ? <p className={`eyebrow${onDark ? ' eyebrow--on-dark' : ''}`}>{eyebrow}</p> : null}
      <h2 id={id} className={`h2 ${className}`.trim()}>
        {title}
      </h2>
    </>
  );
}
