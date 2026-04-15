import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import {
  paymentMethodCatalog,
  paymentSupportByCountry,
  savedPaymentMethods,
} from '../data/siteData'

export const Route = createFileRoute('/payment-methods')({
  component: PaymentMethodsPage,
})

function PaymentMethodsPage() {
  const [methods, setMethods] = useState(savedPaymentMethods)
  const [label, setLabel] = useState('')
  const [country, setCountry] = useState(paymentSupportByCountry[0]!.country)
  const [type, setType] = useState(paymentMethodCatalog[0]!.id)

  function addMethod() {
    if (!label.trim()) {
      return
    }

    const selectedType = paymentMethodCatalog.find((method) => method.id === type)

    if (!selectedType) {
      return
    }

    setMethods((current) => [
      {
        id: `pm-${crypto.randomUUID()}`,
        label: label.trim(),
        type,
        detail: selectedType.summary,
        country,
      },
      ...current,
    ])
    setLabel('')
  }

  function removeMethod(id: string) {
    setMethods((current) => current.filter((method) => method.id !== id))
  }

  return (
    <div className="page-shell page-stack px-4">
      <section className="hero-grid">
        <div className="stack-lg">
          <p className="section-label">Payment method page</p>
          <h1 className="display-title">Manage payment methods</h1>
          <p className="lead-text">
            List saved payment options, add a new preferred method, or remove an old
            one. Country support remains visible so users understand why methods
            appear or disappear during checkout.
          </p>
        </div>

        <aside className="panel stack-md">
          <p className="section-label">Supported by country</p>
          <ul className="feature-list">
            {paymentSupportByCountry.map((entry) => (
              <li key={entry.country}>
                {entry.country}: {entry.methods.length} methods
              </li>
            ))}
          </ul>
        </aside>
      </section>

      <section className="payment-grid">
        <div className="stack-md">
          {methods.length > 0 ? (
            methods.map((method) => (
              <div key={method.id} className="table-row">
                <div className="stack-sm">
                  <p className="section-label">
                    {method.label} / {method.country}
                  </p>
                  <h2 className="card-title">
                    {paymentMethodCatalog.find((entry) => entry.id === method.type)?.label}
                  </h2>
                  <p className="muted-text">{method.detail}</p>
                </div>
                <button
                  type="button"
                  onClick={() => removeMethod(method.id)}
                  className="button-secondary"
                >
                  Remove
                </button>
              </div>
            ))
          ) : (
            <div className="empty-state">No saved payment methods yet.</div>
          )}
        </div>

        <aside className="panel stack-md">
          <p className="section-label">Add method</p>
          <div className="form-grid">
            <div className="field-stack">
              <label htmlFor="payment-label" className="field-label">
                Label
              </label>
              <input
                id="payment-label"
                value={label}
                onChange={(event) => setLabel(event.target.value)}
                placeholder="Personal wallet or card name"
              />
            </div>

            <div className="field-stack">
              <label htmlFor="payment-country" className="field-label">
                Country
              </label>
              <select
                id="payment-country"
                value={country}
                onChange={(event) => setCountry(event.target.value)}
              >
                {paymentSupportByCountry.map((entry) => (
                  <option key={entry.country} value={entry.country}>
                    {entry.country}
                  </option>
                ))}
              </select>
            </div>

            <div className="field-stack">
              <label htmlFor="payment-type" className="field-label">
                Method
              </label>
              <select
                id="payment-type"
                value={type}
                onChange={(event) =>
                  setType(event.target.value as (typeof paymentMethodCatalog)[number]['id'])
                }
              >
                {paymentMethodCatalog.map((method) => (
                  <option key={method.id} value={method.id}>
                    {method.label}
                  </option>
                ))}
              </select>
            </div>

            <button type="button" onClick={addMethod} className="button-primary">
              Add payment method
            </button>
          </div>
        </aside>
      </section>
    </div>
  )
}
