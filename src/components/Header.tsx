import { Link } from '@tanstack/react-router'
import ThemeToggle from './ThemeToggle'

const navigation = [
  { to: '/', label: 'Home' },
  { to: '/explore', label: 'Explore' },
  { to: '/bookings', label: 'Bookings' },
  { to: '/payment-methods', label: 'Payment methods' },
  { to: '/about', label: 'About' },
] as const

export default function Header() {
  return (
    <header className="site-header px-4">
      <div className="page-shell site-header-inner">
        <div className="stack-sm">
          <Link to="/" className="brand-mark">
            <span className="brand-block" />
            <span>Axis Estate</span>
          </Link>
          <span className="brand-copy">
            Quiet real estate search, booking, and payment
          </span>
        </div>

        <nav className="nav-scroll" aria-label="Primary navigation">
          {navigation.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="nav-link"
              activeProps={{ className: 'nav-link is-active' }}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="header-actions">
          <ThemeToggle />
          <div className="header-auth">
            <Link to="/sign-in" className="nav-link">
              Sign in
            </Link>
            <Link to="/sign-up" className="nav-link">
              Sign up
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
}
