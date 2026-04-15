import { Link, createFileRoute } from '@tanstack/react-router'
import { getListingById, formatListingPrice } from '../../data/siteData'

export const Route = createFileRoute('/listings/$listingId')({
  component: ListingDetailsPage,
})

function ListingDetailsPage() {
  const { listingId } = Route.useParams()
  const listing = getListingById(listingId)

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
          <p className="section-label">
            {listing.kind} / {listing.country}
          </p>
          <h1 className="display-title">{listing.title}</h1>
          <p className="lead-text">{listing.description}</p>
          <div className="hero-actions">
            <Link
              to="/book/$listingId"
              params={{ listingId: listing.id }}
              className="button-primary"
            >
              Book this listing
            </Link>
            <Link to="/explore" className="button-secondary">
              Back to explore
            </Link>
          </div>
        </div>

        <aside className="panel stack-md">
          <p className="section-label">Quick facts</p>
          <div className="metric-grid">
            <div className="metric-box">
              <strong>{formatListingPrice(listing)}</strong>
              <span className="stat-label">Price</span>
            </div>
            <div className="metric-box">
              <strong>{listing.capacity} people</strong>
              <span className="stat-label">Capacity</span>
            </div>
            <div className="metric-box">
              <strong>{listing.area}</strong>
              <span className="stat-label">Area</span>
            </div>
            <div className="metric-box">
              <strong>{listing.location}</strong>
              <span className="stat-label">Location</span>
            </div>
          </div>
          <p className="muted-text">{listing.highlight}</p>
        </aside>
      </section>

      <section className="detail-grid">
        <div className="stack-lg">
          <article className="panel stack-md">
            <p className="section-label">Listing details</p>
            <h2 className="section-title">What is included</h2>
            <p className="muted-text">{listing.summary}</p>
            <ul className="feature-list">
              {listing.features.map((feature) => (
                <li key={feature}>{feature}</li>
              ))}
            </ul>
          </article>

          <article className="panel stack-md">
            <p className="section-label">Contact the listing agents</p>
            {listing.agents.map((agent) => (
              <div key={agent.email} className="metric-box">
                <strong>{agent.name}</strong>
                <p className="muted-text">{agent.title}</p>
                <p className="muted-text">{agent.officeHours}</p>
                <div className="button-row">
                  <a href={`tel:${agent.phone}`} className="button-secondary">
                    {agent.phone}
                  </a>
                  <a href={`mailto:${agent.email}`} className="button-primary">
                    {agent.email}
                  </a>
                </div>
              </div>
            ))}
          </article>
        </div>

        <aside className="panel stack-md">
          <p className="section-label">Agent message</p>
          <div className="form-grid">
            <div className="field-stack">
              <label htmlFor="name" className="field-label">
                Full name
              </label>
              <input id="name" placeholder="Your name" />
            </div>
            <div className="field-stack">
              <label htmlFor="email" className="field-label">
                Email
              </label>
              <input id="email" type="email" placeholder="you@example.com" />
            </div>
            <div className="field-stack">
              <label htmlFor="message" className="field-label">
                Request
              </label>
              <textarea
                id="message"
                rows={6}
                placeholder="Ask about inspection dates, payment timing, or documents."
              />
            </div>
            <button type="button" className="button-primary">
              Send to agent
            </button>
          </div>
        </aside>
      </section>
    </div>
  )
}
