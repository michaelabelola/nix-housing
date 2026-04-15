import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import ListingCard from '../components/ListingCard'
import { listings } from '../data/siteData'

export const Route = createFileRoute('/explore')({
  component: ExplorePage,
})

function ExplorePage() {
  const [query, setQuery] = useState('')
  const [selectedKind, setSelectedKind] = useState<'All' | 'Property' | 'Room' | 'Land'>(
    'All',
  )
  const [selectedFeature, setSelectedFeature] = useState('Any')

  const featureOptions = [
    'Any',
    ...new Set(listings.flatMap((listing) => listing.features)),
  ]

  const filteredListings = listings.filter((listing) => {
    const matchesQuery =
      query.length === 0 ||
      [listing.title, listing.location, listing.country].some((value) =>
        value.toLowerCase().includes(query.toLowerCase()),
      )
    const matchesKind = selectedKind === 'All' || listing.kind === selectedKind
    const matchesFeature =
      selectedFeature === 'Any' || listing.features.includes(selectedFeature)

    return matchesQuery && matchesKind && matchesFeature
  })

  return (
    <div className="page-shell page-stack px-4">
      <section className="stack-lg">
        <div className="stack-sm">
          <p className="section-label">Explore page</p>
          <h1 className="display-title">Search listings</h1>
          <p className="lead-text">
            Search by place, narrow by listing type, then filter by a specific
            feature. The page covers properties, rooms, and land in one view.
          </p>
        </div>

        <div className="panel stack-md">
          <div className="field-stack">
            <label htmlFor="query" className="field-label">
              Search
            </label>
            <input
              id="query"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search location or listing name"
            />
          </div>

          <div className="stack-sm">
            <p className="field-label">Type</p>
            <div className="chip-row">
              {(['All', 'Property', 'Room', 'Land'] as const).map((kind) => (
                <button
                  key={kind}
                  type="button"
                  onClick={() => setSelectedKind(kind)}
                  className={selectedKind === kind ? 'button-primary' : 'button-secondary'}
                >
                  {kind}
                </button>
              ))}
            </div>
          </div>

          <div className="field-stack">
            <label htmlFor="feature" className="field-label">
              Feature
            </label>
            <select
              id="feature"
              value={selectedFeature}
              onChange={(event) => setSelectedFeature(event.target.value)}
            >
              {featureOptions.map((feature) => (
                <option key={feature} value={feature}>
                  {feature}
                </option>
              ))}
            </select>
          </div>
        </div>
      </section>

      <section className="stack-md">
        <div className="inline-meta">
          <span>{filteredListings.length} results</span>
          <span>mobile-first layout</span>
          <span>minimal cards</span>
        </div>

        {filteredListings.length > 0 ? (
          <div className="listing-grid">
            {filteredListings.map((listing) => (
              <ListingCard key={listing.id} listing={listing} />
            ))}
          </div>
        ) : (
          <div className="empty-state">
            No listing matches the current query and filter combination.
          </div>
        )}
      </section>
    </div>
  )
}
