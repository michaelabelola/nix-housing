import { Link, createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/sign-up')({
  component: SignUpPage,
})

function SignUpPage() {
  return (
    <div className="page-shell page-stack px-4">
      <section className="auth-grid">
        <div className="stack-lg">
          <p className="section-label">Sign up</p>
          <h1 className="display-title">Create a quiet account</h1>
          <p className="lead-text">
            Register once, then keep booking history, saved payment methods, and
            preferred countries in one place.
          </p>
        </div>

        <form className="panel stack-md">
          <div className="field-stack">
            <label htmlFor="signup-name" className="field-label">
              Full name
            </label>
            <input id="signup-name" placeholder="Your full name" />
          </div>
          <div className="field-stack">
            <label htmlFor="signup-email" className="field-label">
              Email
            </label>
            <input id="signup-email" type="email" placeholder="you@example.com" />
          </div>
          <div className="field-stack">
            <label htmlFor="signup-password" className="field-label">
              Password
            </label>
            <input id="signup-password" type="password" placeholder="Create password" />
          </div>
          <button type="button" className="button-primary">
            Sign up
          </button>
          <p className="muted-text">
            Already registered? <Link to="/sign-in">Sign in here</Link>.
          </p>
        </form>
      </section>
    </div>
  )
}
