import { content } from '../content/index.js';
import { useBookingForm } from '../hooks/useBookingForm.js';
import BookingForm from '../components/booking/BookingForm.jsx';
import BookingSummary from '../components/booking/BookingSummary.jsx';

const messages = { ...content.booking.errors, currentLocation: content.booking.currentLocation };

export default function Booking() {
  const booking = useBookingForm(messages);

  return (
    <section id="book" className="booking" aria-labelledby="book-title">
      <div className="booking__card">
        {booking.status === 'done' && booking.result ? (
          <BookingSummary result={booking.result} onEdit={booking.edit} />
        ) : (
          <BookingForm booking={booking} />
        )}
      </div>
    </section>
  );
}
