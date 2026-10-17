/** Dark closing call-to-action panel used at the end of content pages. */
export default function CtaBand({ id, title, body, children }) {
  return (
    <section className="container section section--tight cta-band-wrap" aria-labelledby={id}>
      <div className="dark-panel cta-band">
        <div className="cta-band__text">
          <h2 id={id} className="h2 cta-band__title">
            {title}
          </h2>
          {body ? <p className="cta-band__body">{body}</p> : null}
        </div>
        <div className="btn-row cta-band__actions">{children}</div>
      </div>
    </section>
  );
}
