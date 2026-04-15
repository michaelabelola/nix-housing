import { Link } from '@tanstack/react-router'
import { type Listing, formatListingPrice } from '../data/siteData'

interface ListingCardProps {
  listing: Listing
}

export default function ListingCard({ listing }: ListingCardProps) {
  return (
    <article className="listing-card stack-md">
      <div className="stack-sm">
        <p className="section-label">
          {listing.kind} / {listing.location}
        </p>
        <h3 className="card-title">{listing.title}</h3>
        <p className="muted-text">{listing.summary}</p>
      </div>

      <div className="inline-meta">
        <span>{formatListingPrice(listing)}</span>
        <span>{listing.capacity} people</span>
        <span>{listing.area}</span>
      </div>

      <ul className="feature-list">
        {listing.features.slice(0, 3).map((feature) => (
          <li key={feature}>{feature}</li>
        ))}
      </ul>

      <div className="button-row">
        <Link
          to="/listings/$listingId"
          params={{ listingId: listing.id }}
          className="button-primary"
        >
          View details
        </Link>
        <Link
          to="/book/$listingId"
          params={{ listingId: listing.id }}
          className="button-secondary"
        >
          Book
        </Link>
      </div>
    </article>
  )
}
