import { createFileRoute } from '@tanstack/react-router'
import { useEffect, useState } from 'react'
import {
  type PaymentMethodId,
  formatPrice,
  getListingById,
  getPaymentCountry,
  getPaymentMethods,
} from '../../data/siteData'

type PaymentSearch = {
  country?: string
  moveIn?: string
  people?: number
  stay?: string
}

export const Route = createFileRoute('/payment/$listingId')({
  validateSearch: (search): PaymentSearch => ({
    country: typeof search.country === 'string' ? search.country : 'United States',
    moveIn: typeof search.moveIn === 'string' ? search.moveIn : '2026-06-01',
    people:
      typeof search.people === 'number'
        ? search.people
        : Number(search.people ?? 2) || 2,
    stay: typeof search.stay === 'string' ? search.stay : '6 months',
  }),
  component: PaymentPage,
})

function PaymentPage() {
  const { listingId } = Route.useParams()
  const search = Route.useSearch()
  const listing = getListingById(listingId)

  const [country, setCountry] = useState(search.country ?? 'United States')
  const methods = getPaymentMethods(country)
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethodId>(
    methods[0]?.id ?? 'credit-card',
  )

  useEffect(() => {
    if (!methods.some((method) => method.id === selectedMethod)) {
      setSelectedMethod(methods[0]?.id ?? 'credit-card')
    }
  }, [methods, selectedMethod])

  if (!listing) {
    return (
      <div className="page-shell px-4">
        <div className="empty-state">Listing not found.</div>
      </div>
    )
  }

  const paymentCountry = getPaymentCountry(country)
  const serviceFee = Math.max(40, Math.round(listing.price * 0.04))
  const total = listing.price + serviceFee

  return (
    <div className="page-shell page-stack px-4">
      <section className="hero-grid">
        <div className="stack-lg">
          <p className="section-label">Payment page</p>
          <h1 className="display-title">Choose how to pay</h1>
          <p className="lead-text">
            Payment methods change when the country changes. The screen only shows
            methods supported in the country you are paying from.
          </p>
        </div>

        <aside className="panel stack-md">
          <p className="section-label">Booking summary</p>
          <h2 className="card-title">{listing.title}</h2>
          <div className="inline-meta">
            <span>{search.people} people</span>
            <span>{search.stay}</span>
            <span>Move-in {search.moveIn}</span>
          </div>
          <ul className="feature-list">
            <li>Base price: {formatPrice(listing.price, listing.currency)}</li>
            <li>Service fee: {formatPrice(serviceFee, listing.currency)}</li>
            <li>Total due: {formatPrice(total, listing.currency)}</li>
          </ul>
        </aside>
      </section>

      <section className="payment-grid">
        <div className="stack-lg">
          <article className="panel stack-md">
            <div className="field-stack">
              <label htmlFor="payment-country" className="field-label">
                Country you want to pay for
              </label>
              <select
                id="payment-country"
                value={country}
                onChange={(event) => setCountry(event.target.value)}
              >
                {[
                  'United States',
                  'Canada',
                  'Nigeria',
                  'Ghana',
                  'Kenya',
                  'United Arab Emirates',
                ].map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
            <p className="muted-text">
              Supported in {country}: {methods.map((method) => method.label).join(', ')}.
            </p>
            <p className="inline-meta">
              <span>Settlement currency {paymentCountry.currency}</span>
            </p>
          </article>

          <article className="stack-md">
            {methods.map((method) => (
              <button
                key={method.id}
                type="button"
                className={`radio-card ${selectedMethod === method.id ? 'active' : ''}`}
                onClick={() => setSelectedMethod(method.id)}
              >
                <p className="section-label">{method.label}</p>
                <h2 className="card-title">{method.summary}</h2>
                <p className="muted-text">
                  {method.id === 'cash-on-arrival'
                    ? 'Best when the booking requires on-site inspection first.'
                    : 'Complete checkout digitally and receive booking confirmation.'}
                </p>
              </button>
            ))}
          </article>
        </div>

        <aside className="panel stack-md">
          <p className="section-label">Checkout</p>

          {selectedMethod === 'credit-card' && (
            <div className="form-grid">
              <div className="field-stack">
                <label htmlFor="card-name" className="field-label">
                  Name on card
                </label>
                <input id="card-name" placeholder="Full card name" />
              </div>
              <div className="field-stack">
                <label htmlFor="card-number" className="field-label">
                  Card number
                </label>
                <input id="card-number" placeholder="1234 5678 9012 3456" />
              </div>
              <div className="content-grid">
                <div className="field-stack">
                  <label htmlFor="expiry" className="field-label">
                    Expiry
                  </label>
                  <input id="expiry" placeholder="MM / YY" />
                </div>
                <div className="field-stack">
                  <label htmlFor="cvv" className="field-label">
                    CVV
                  </label>
                  <input id="cvv" placeholder="123" />
                </div>
              </div>
            </div>
          )}

          {selectedMethod === 'apple-pay' && (
            <div className="metric-box">
              <strong>Apple Pay enabled</strong>
              <p className="muted-text">
                Confirm the transaction on a supported Apple device to complete the
                booking.
              </p>
            </div>
          )}

          {selectedMethod === 'google-pay' && (
            <div className="metric-box">
              <strong>Google Pay enabled</strong>
              <p className="muted-text">
                Use the wallet linked to your Google account for the final checkout.
              </p>
            </div>
          )}

          {selectedMethod === 'cash-on-arrival' && (
            <div className="form-grid">
              <div className="field-stack">
                <label htmlFor="arrival-note" className="field-label">
                  Arrival note
                </label>
                <textarea
                  id="arrival-note"
                  rows={5}
                  placeholder="Share inspection time or who will deliver the payment."
                />
              </div>
              <p className="muted-text">
                A reservation hold is created now and payment is collected in person.
              </p>
            </div>
          )}

          <button type="button" className="button-primary">
            Confirm payment method
          </button>
        </aside>
      </section>
    </div>
  )
}
