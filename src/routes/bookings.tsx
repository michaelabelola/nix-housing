import { Link, createFileRoute } from '@tanstack/react-router'
import { bookingHistory, getListingById } from '../data/siteData'

export const Route = createFileRoute('/bookings')({
  component: BookingsPage,
})

function BookingsPage() {
  return (
    <div className="page-shell page-stack px-4">
      <section className="stack-lg">
        <div className="stack-sm">
          <p className="section-label">Bookings history page</p>
          <h1 className="display-title">Review past and current bookings</h1>
          <p className="lead-text">
            Every booking is grouped into a clean card showing people count, stay
            length, payment country, and status.
          </p>
        </div>
      </section>

      <section className="stack-md">
        {bookingHistory.map((booking) => {
          const listing = getListingById(booking.listingId)

          return (
            <article key={booking.id} className="timeline-card stack-md">
              <div className="stack-sm">
                <p className="section-label">
                  {booking.id} / {booking.status}
                </p>
                <h2 className="card-title">{listing?.title ?? 'Unknown listing'}</h2>
                <p className="muted-text">
                  {booking.people} people / {booking.stay} / pay from {booking.country}
                </p>
              </div>
              <div className="button-row">
                <span className="tag">Check-in {booking.checkIn}</span>
                {listing ? (
                  <Link
                    to="/payment/$listingId"
                    params={{ listingId: listing.id }}
                    search={{
                      country: booking.country,
                      people: booking.people,
                      stay: booking.stay,
                    }}
                    className="button-secondary"
                  >
                    Open payment
                  </Link>
                ) : null}
              </div>
            </article>
          )
        })}
      </section>
    </div>
  )
}
