import { content, contact } from '../content/index.js';
import PageLayout from '../components/layout/PageLayout.jsx';
import { pagePath } from '../hooks/useHashRoute.js';
import logoSrc from '../images/brand/den-bosch-taxi-logo.png';

const t = content.pages.driverRegister;

export default function DriverRegisterPage() {
  return (
    <PageLayout current={null} className="page--driver-register">
      <section className="container driver-register" aria-labelledby="driver-register-title">
        <img src={logoSrc} alt="" className="driver-register__logo" width="200" height="135" decoding="async" />
        <p className="driver-register__eyebrow">{t.eyebrow}</p>
        <h1 id="driver-register-title" className="driver-register__title" tabIndex={-1}>
          {t.title}
        </h1>
        <p className="driver-register__body">{t.body}</p>
        <p className="driver-register__status" role="status">
          {t.status}
        </p>
        <div className="btn-row driver-register__actions">
          <a href={contact.phoneHref} className="btn btn--lg btn--gold">
            {t.call}
          </a>
          <a href={pagePath('contact')} className="btn btn--lg btn--ink">
            {t.contact}
          </a>
          <a href="#top" className="btn btn--lg btn--ghost">
            {t.home}
          </a>
        </div>
      </section>
    </PageLayout>
  );
}
