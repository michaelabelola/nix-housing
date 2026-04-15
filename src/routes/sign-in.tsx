import { Link, createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/sign-in')({
  component: SignInPage,
})

function SignInPage() {
  return (
    <div className="page-shell page-stack px-4">
      <section className="auth-grid">
        <div className="stack-lg">
          <p className="section-label">Sign in</p>
          <h1 className="display-title">Return to your bookings</h1>
          <p className="lead-text">
            Sign in to continue a reservation, review payment methods, or contact a
            listing agent again.
          </p>
        </div>

        <form className="panel stack-md">
          <div className="field-stack">
            <label htmlFor="signin-email" className="field-label">
              Email
            </label>
            <input id="signin-email" type="email" placeholder="you@example.com" />
          </div>
          <div className="field-stack">
            <label htmlFor="signin-password" className="field-label">
              Password
            </label>
            <input id="signin-password" type="password" placeholder="Password" />
          </div>
          <button type="button" className="button-primary">
            Sign in
          </button>
          <p className="muted-text">
            Need an account? <Link to="/sign-up">Create one here</Link>.
          </p>
        </form>
      </section>
    </div>
  )
}
