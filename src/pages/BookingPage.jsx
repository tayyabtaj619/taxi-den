import { useEffect } from 'react';
import SkipLink from '../components/layout/SkipLink.jsx';
import { content } from '../content/index.js';
import { useBooking } from '../booking/BookingContext.jsx';
import { useRouter } from '../booking/RouterContext.jsx';
import { bookPath } from '../hooks/useHashRoute.js';
import { STEPS, firstIncompleteStep } from '../lib/booking.js';
import Header from '../components/layout/Header.jsx';
import Footer from '../components/layout/Footer.jsx';
import Progress from '../components/booking/Progress.jsx';
import TripSummary from '../components/booking/TripSummary.jsx';
import BookingDone from '../components/booking/BookingDone.jsx';
import EntryCard from '../components/booking/EntryCard.jsx';
import StepLuggage from '../components/booking/steps/StepLuggage.jsx';
import StepOffers from '../components/booking/steps/StepOffers.jsx';
import StepTravel from '../components/booking/steps/StepTravel.jsx';
import StepContact from '../components/booking/steps/StepContact.jsx';

const msg = content.flow.errors;
const COMPONENTS = { luggage: StepLuggage, offers: StepOffers, travel: StepTravel, contact: StepContact };

/**
 * Where a requested step must redirect to, if anywhere. Visitors may revisit
 * any earlier step, but cannot skip ahead of the first incomplete one (e.g.
 * via a bookmarked #/book/contact). Lead time is not re-checked here (now=0);
 * it is re-checked against the real clock when the booking is sent.
 */
function redirectFor(step, data, done) {
  if (step === 'entry') return null;
  if (step === 'done') return done ? null : bookPath('contact');
  if (!STEPS.includes(step)) return bookPath('entry');
  const blocker = firstIncompleteStep(data, msg, 0);
  if (blocker === 'entry') return bookPath('entry');
  if (blocker && STEPS.indexOf(step) > STEPS.indexOf(blocker)) return bookPath(blocker);
  return null;
}

export default function BookingPage({ step }) {
  const { data, submission, reset } = useBooking();
  const { navigate } = useRouter();
  const done = submission.status === 'done' && submission.result;
  const target = redirectFor(step, data, done);

  useEffect(() => {
    if (target) navigate(target, { replace: true });
  }, [target, navigate]);

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [step]);

  if (target) return null;

  const idx = STEPS.indexOf(step);
  const go = (s) => navigate(bookPath(s));
  const goBack = () => (idx > 0 ? go(STEPS[idx - 1]) : navigate(bookPath('entry')));
  const goNext = () => go(STEPS[idx + 1]);
  const StepComponent = COMPONENTS[step];

  return (
    <div className="page page--booking">
      <SkipLink />
      <Header variant="solid" bookHref={bookPath('entry')} />
      <div className="booking-band">
        <div className={`booking-band__inner${step === 'entry' ? ' booking-band__inner--entry' : ''}`}>
          <p className="booking-band__title">{content.flow.pageTitle}</p>
          {step !== 'entry' ? <Progress current={step} allDone={step === 'done'} /> : null}
        </div>
      </div>

      <main id="main" className="booking-layout">
        {step === 'entry' ? (
          <div className="booking-layout__main booking-layout__main--entry">
            <EntryCard />
          </div>
        ) : step === 'done' ? (
          <div className="booking-layout__main booking-layout__main--full">
            <BookingDone
              result={submission.result}
              onNew={() => {
                reset();
                navigate(bookPath('entry'));
              }}
              onHome={() => {
                reset();
                navigate('#top');
              }}
            />
          </div>
        ) : (
          <>
            <div className="booking-layout__main">
              <StepComponent
                key={step}
                onNext={goNext}
                onBack={goBack}
                onDone={() => navigate(bookPath('done'))}
                onEditJourney={() => navigate(bookPath('entry'))}
              />
            </div>
            <TripSummary data={data} />
          </>
        )}
      </main>
      <Footer />
    </div>
  );
}
