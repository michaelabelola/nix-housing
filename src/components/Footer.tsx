import { Link } from '@tanstack/react-router'

export default function Footer() {
  return (
    <footer className="site-footer px-4">
      <div className="page-shell footer-grid">
        <div className="stack-sm">
          <p className="section-label">Axis Estate</p>
          <p className="muted-text">
            Search properties, rooms, and land without overload. Each flow keeps
            decisions small: discover, inspect, book, then pay.
          </p>
        </div>

        <div className="stack-sm">
          <p className="section-label">Shortcuts</p>
          <div className="button-row">
            <Link to="/explore" className="button-secondary">
              Explore listings
            </Link>
            <Link to="/bookings" className="button-secondary">
              Booking history
            </Link>
            <Link to="/payment-methods" className="button-secondary">
              Manage payments
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
