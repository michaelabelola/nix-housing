import { Link, createFileRoute } from '@tanstack/react-router'
import ListingCard from '../components/ListingCard'
import { bookingHistory, listings } from '../data/siteData'

export const Route = createFileRoute('/')({
  component: HomePage,
})

function HomePage() {
  const featuredListings = listings.filter((listing) => listing.trending).slice(0, 3)
  const quickStats = [
    ['Trending now', `${featuredListings.length} live picks`],
    ['Countries', '6 payment regions'],
    ['Property types', 'Homes / rooms / land'],
    ['Bookings tracked', `${bookingHistory.length} recent records`],
  ]

  return (
    <div className="page-shell page-stack px-4">
      <section className="hero-grid">
        <div className="stack-lg">
          <p className="section-label">Real estate, kept spare</p>
          <h1 className="display-title">
            Search.
            <br />
            Inspect.
            <br />
            Book.
          </h1>
          <p className="lead-text">
            Axis Estate helps users query properties, rooms, and land with small,
            focused screens. You see only the next decision: filter listings, open
            a detail view, set your housing needs, then pay using methods supported
            in your country.
          </p>
          <div className="hero-actions">
            <Link to="/explore" className="button-primary">
              Explore listings
            </Link>
            <Link to="/bookings" className="button-secondary">
              View booking history
            </Link>
          </div>
        </div>

        <div className="panel stack-md">
          <p className="section-label">Trending quick overview</p>
          {featuredListings.map((listing) => (
            <div key={listing.id} className="metric-box">
              <strong>{listing.title}</strong>
              <p className="muted-text">{listing.highlight}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="stat-grid">
        {quickStats.map(([label, value]) => (
          <article key={label} className="panel stack-sm">
            <p className="stat-value">{value}</p>
            <p className="stat-label">{label}</p>
          </article>
        ))}
      </section>

      <section className="page-stack" style={{ gap: '1.5rem' }}>
        <div className="stack-sm">
          <p className="section-label">Selected listings</p>
          <h2 className="section-title">Three quiet options to start with</h2>
          <p className="lead-text">
            The first screen stays short on purpose. If one of these fits, open the
            detail page. If not, the explore page gives full filtering.
          </p>
        </div>
        <div className="listing-grid">
          {featuredListings.map((listing) => (
            <ListingCard key={listing.id} listing={listing} />
          ))}
        </div>
      </section>

      <section className="split-grid">
        <div className="panel stack-md">
          <p className="section-label">Payments</p>
          <h2 className="section-title">Country-based support</h2>
          <p className="muted-text">
            Payment methods adjust by country so users only see relevant choices:
            Apple Pay, Google Pay, credit card, or cash on arrival.
          </p>
          <div className="button-row">
            <Link to="/payment-methods" className="button-primary">
              Manage payment methods
            </Link>
            <Link
              to="/payment/$listingId"
              params={{ listingId: featuredListings[0]!.id }}
              search={{ country: 'United States', people: 2, stay: '6 months' }}
              className="button-secondary"
            >
              Open payment page
            </Link>
          </div>
        </div>

        <div className="panel stack-md">
          <p className="section-label">Accounts</p>
          <h2 className="section-title">Fast entry points</h2>
          <p className="muted-text">
            New users can create an account before booking. Returning users can sign
            in and reopen their saved booking history.
          </p>
          <div className="button-row">
            <Link to="/sign-up" className="button-primary">
              Create account
            </Link>
            <Link to="/sign-in" className="button-secondary">
              Sign in
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
