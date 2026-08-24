/**
 * Mock API layer.
 *
 * The contact form calls `submitContactForm`, which simulates a network round
 * trip. To go live later, replace the promise below with a real request —
 * nothing else in the codebase needs to change. Examples:
 *
 *   // Formspree
 *   await fetch('https://formspree.io/f/<your-id>', {
 *     method: 'POST',
 *     headers: { 'Content-Type': 'application/json' },
 *     body: JSON.stringify(payload),
 *   })
 *
 *   // EmailJS
 *   await emailjs.send('<service-id>', '<template-id>', payload)
 *
 *   // Custom backend
 *   await fetch('/api/contact', { method: 'POST', body: JSON.stringify(payload) })
 */

const SIMULATED_LATENCY_MS = 900

export function submitContactForm(payload) {
  return new Promise((resolve) => {
    // Intentional log — proves the payload shape that would hit a real endpoint.
    console.info('[mock-api] POST /api/contact', payload)
    setTimeout(() => resolve({ ok: true }), SIMULATED_LATENCY_MS)
  })
}
