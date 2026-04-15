import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/about')({
  component: AboutPage,
})

function AboutPage() {
  return (
    <div className="page-shell page-stack px-4">
      <section className="hero-grid">
        <div className="stack-lg">
          <p className="section-label">About us</p>
          <h1 className="display-title">
            Built for calm
            <br />
            housing search
          </h1>
          <p className="lead-text">
            Axis Estate is designed around fewer decisions per screen. The interface
            uses a strict monochrome system, square edges, and generous white space
            so people can compare homes, rooms, and land without visual clutter.
          </p>
        </div>

        <div className="panel stack-md">
          <p className="section-label">What we do</p>
          <ul className="feature-list">
            <li>Real estate search across properties, rooms, and land listings.</li>
            <li>Detail pages with agent contact channels and booking actions.</li>
            <li>Booking and payment flows that adjust supported methods by country.</li>
          </ul>
        </div>
      </section>

      <section className="content-grid">
        <article className="panel stack-md">
          <p className="section-label">Principles</p>
          <h2 className="section-title">Less at once</h2>
          <p className="muted-text">
            Each page focuses on one major task: discover, inspect, reserve,
            manage payment methods, or review history. That keeps the interface
            readable on mobile-first layouts.
          </p>
        </article>

        <article className="panel stack-md">
          <p className="section-label">Contact</p>
          <h2 className="section-title">Human support</h2>
          <p className="muted-text">
            Listing agents remain visible inside every detail page so users can ask
            about move-in dates, property documents, viewings, and payment options.
          </p>
        </article>
      </section>
    </div>
  )
}
