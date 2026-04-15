import { Link, createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import { getListingById, paymentSupportByCountry } from '../../data/siteData'

export const Route = createFileRoute('/book/$listingId')({
  component: BookingPage,
})

function BookingPage() {
  const { listingId } = Route.useParams()
  const listing = getListingById(listingId)

  const [people, setPeople] = useState(2)
  const [stay, setStay] = useState('6 months')
  const [country, setCountry] = useState(listing?.country ?? 'United States')
  const [moveIn, setMoveIn] = useState('2026-06-01')
  const [note, setNote] = useState('')

  if (!listing) {
    return (
      <div className="page-shell px-4">
        <div className="empty-state">Listing not found.</div>
      </div>
    )
  }

  return (
    <div className="page-shell page-stack px-4">
      <section className="hero-grid">
        <div className="stack-lg">
          <p className="section-label">Book page</p>
          <h1 className="display-title">Reserve the listing</h1>
          <p className="lead-text">
            Set who will be housed, how long you expect to stay, and where you want
            to pay from. The next screen will show only supported methods for that
            country.
          </p>
        </div>

        <aside className="panel stack-md">
          <p className="section-label">Listing summary</p>
          <h2 className="card-title">{listing.title}</h2>
          <p className="muted-text">{listing.summary}</p>
          <div className="inline-meta">
            <span>{listing.location}</span>
            <span>{listing.capacity} people max</span>
          </div>
        </aside>
      </section>

      <section className="payment-grid">
        <form className="panel stack-md">
          <div className="field-stack">
            <label htmlFor="people" className="field-label">
              Number of people to be housed
            </label>
            <select
              id="people"
              value={people}
              onChange={(event) => setPeople(Number(event.target.value))}
            >
              {Array.from({ length: listing.capacity }, (_, index) => index + 1).map(
                (count) => (
                  <option key={count} value={count}>
                    {count}
                  </option>
                ),
              )}
            </select>
          </div>

          <div className="field-stack">
            <label htmlFor="stay" className="field-label">
              Stay length
            </label>
            <select
              id="stay"
              value={stay}
              onChange={(event) => setStay(event.target.value)}
            >
              {['1 month', '3 months', '6 months', '12 months', 'Full purchase'].map(
                (option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ),
              )}
            </select>
          </div>

          <div className="field-stack">
            <label htmlFor="country" className="field-label">
              Country to pay from
            </label>
            <select
              id="country"
              value={country}
              onChange={(event) => setCountry(event.target.value)}
            >
              {paymentSupportByCountry.map((entry) => (
                <option key={entry.country} value={entry.country}>
                  {entry.country}
                </option>
              ))}
            </select>
          </div>

          <div className="field-stack">
            <label htmlFor="move-in" className="field-label">
              Preferred move-in
            </label>
            <input
              id="move-in"
              type="date"
              value={moveIn}
              onChange={(event) => setMoveIn(event.target.value)}
            />
          </div>

          <div className="field-stack">
            <label htmlFor="note" className="field-label">
              Booking note
            </label>
            <textarea
              id="note"
              rows={5}
              value={note}
              onChange={(event) => setNote(event.target.value)}
              placeholder="Arrival time, inspection request, or household needs."
            />
          </div>
        </form>

        <aside className="panel stack-md">
          <p className="section-label">Next step</p>
          <p className="muted-text">
            Proceed to payment with your booking choices. Supported payment methods
            will adapt to <strong>{country}</strong>.
          </p>
          <ul className="feature-list">
            <li>{people} people included in this reservation</li>
            <li>{stay} expected duration</li>
            <li>Preferred move-in: {moveIn}</li>
            <li>{note.length > 0 ? note : 'No additional note yet'}</li>
          </ul>
          <div className="button-row">
            <Link
              to="/payment/$listingId"
              params={{ listingId: listing.id }}
              search={{ country, people, stay, moveIn }}
              className="button-primary"
            >
              Continue to payment
            </Link>
            <Link
              to="/listings/$listingId"
              params={{ listingId: listing.id }}
              className="button-secondary"
            >
              Back to details
            </Link>
          </div>
        </aside>
      </section>
    </div>
  )
}
