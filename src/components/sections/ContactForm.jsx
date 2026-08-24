// Contact form with client-side validation, loading state, success state and
// an error banner. All submission logic delegates to src/utils/api.js — swap
// the mock function there to wire up Formspree, EmailJS or a real backend.
import { AnimatePresence, motion } from 'framer-motion'
import { AlertCircle, ArrowRight, CheckCircle2, Loader2 } from 'lucide-react'
import Button from '../ui/Button'
import useContactForm, { INITIAL_CONTACT_VALUES } from '../../hooks/useContactForm'
import services from '../../data/services.json'

const SERVICE_OPTIONS = [...services.map((service) => service.title), 'Something else']

function inputClass(hasError) {
  return [
    'w-full rounded-lg border bg-white px-3.5 py-2.5 text-sm text-slate-900',
    'placeholder:text-slate-400 transition-colors focus:outline-none focus:ring-2',
    hasError
      ? 'border-red-300 focus:border-red-500 focus:ring-red-200'
      : 'border-slate-300 hover:border-slate-400 focus:border-indigo-500 focus:ring-indigo-100',
  ].join(' ')
}

/** Inline validation message beneath a field. */
function FieldError({ id, message }) {
  if (!message) return null
  return (
    <p id={id} role="alert" className="mt-1.5 flex items-center gap-1 text-xs font-medium text-red-600">
      <AlertCircle className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
      {message}
    </p>
  )
}

export default function ContactForm() {
  const { values, errors, status, handleChange, handleSubmit, reset } = useContactForm()

  const isSubmitting = status === 'submitting'

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
      <AnimatePresence mode="wait" initial={false}>
        {status === 'success' ? (
          /* ---------- Success confirmation ---------- */
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col items-center py-10 text-center"
          >
            <span className="grid h-16 w-16 place-items-center rounded-full bg-emerald-50 text-emerald-600">
              <CheckCircle2 className="h-9 w-9" aria-hidden="true" />
            </span>
            <h2 className="mt-5 text-2xl font-bold text-slate-900">Message sent!</h2>
            <p className="mt-2 max-w-sm text-sm leading-relaxed text-slate-600">
              Thanks for reaching out — a senior consultant (not a bot) will get back to you
              within one business day.
            </p>
            <Button variant="ghost" className="mt-6" onClick={reset}>
              Send another message
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Button>
          </motion.div>
        ) : (
          /* ---------- The form ---------- */
          <motion.form
            key="form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.25 }}
            onSubmit={handleSubmit}
            noValidate
          >
            <div className="grid gap-5 sm:grid-cols-2">
              {/* Name */}
              <div>
                <label htmlFor="contact-name" className="mb-1.5 block text-sm font-medium text-slate-700">
                  Name <span className="text-red-500">*</span>
                </label>
                <input
                  id="contact-name"
                  type="text"
                  autoComplete="name"
                  placeholder="Jane Cooper"
                  value={values.name}
                  onChange={handleChange('name')}
                  aria-invalid={Boolean(errors.name)}
                  aria-describedby={errors.name ? 'contact-name-error' : undefined}
                  className={inputClass(Boolean(errors.name))}
                />
                <FieldError id="contact-name-error" message={errors.name} />
              </div>

              {/* Email */}
              <div>
                <label htmlFor="contact-email" className="mb-1.5 block text-sm font-medium text-slate-700">
                  Work email <span className="text-red-500">*</span>
                </label>
                <input
                  id="contact-email"
                  type="email"
                  autoComplete="email"
                  placeholder="jane@company.com"
                  value={values.email}
                  onChange={handleChange('email')}
                  aria-invalid={Boolean(errors.email)}
                  aria-describedby={errors.email ? 'contact-email-error' : undefined}
                  className={inputClass(Boolean(errors.email))}
                />
                <FieldError id="contact-email-error" message={errors.email} />
              </div>

              {/* Company (optional) */}
              <div className="sm:col-span-2">
                <label htmlFor="contact-company" className="mb-1.5 block text-sm font-medium text-slate-700">
                  Company <span className="font-normal text-slate-400">(optional)</span>
                </label>
                <input
                  id="contact-company"
                  type="text"
                  autoComplete="organization"
                  placeholder="Acme Inc."
                  value={values.company}
                  onChange={handleChange('company')}
                  className={inputClass(false)}
                />
              </div>

              {/* Service interest */}
              <div className="sm:col-span-2">
                <label htmlFor="contact-service" className="mb-1.5 block text-sm font-medium text-slate-700">
                  What do you need help with? <span className="text-red-500">*</span>
                </label>
                <select
                  id="contact-service"
                  value={values.service}
                  onChange={handleChange('service')}
                  aria-invalid={Boolean(errors.service)}
                  aria-describedby={errors.service ? 'contact-service-error' : undefined}
                  className={`${inputClass(Boolean(errors.service))} ${values.service ? '' : 'text-slate-400'}`}
                >
                  <option value="" disabled>
                    Select a service…
                  </option>
                  {SERVICE_OPTIONS.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
                <FieldError id="contact-service-error" message={errors.service} />
              </div>

              {/* Message */}
              <div className="sm:col-span-2">
                <label htmlFor="contact-message" className="mb-1.5 block text-sm font-medium text-slate-700">
                  Project summary <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="contact-message"
                  rows={5}
                  placeholder="What are you building, what's blocking you, and what does success look like?"
                  value={values.message}
                  onChange={handleChange('message')}
                  aria-invalid={Boolean(errors.message)}
                  aria-describedby={errors.message ? 'contact-message-error' : undefined}
                  className={`${inputClass(Boolean(errors.message))} resize-y`}
                />
                <FieldError id="contact-message-error" message={errors.message} />
              </div>
            </div>

            {/* Failed-submission banner (exercises the error path once a real API is wired up) */}
            {status === 'error' && (
              <div
                role="alert"
                className="mt-5 flex items-start gap-2 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
              >
                <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
                Something went wrong sending your message. Please try again, or email us directly.
              </div>
            )}

            <Button type="submit" size="lg" className="mt-6 w-full" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                  Sending…
                </>
              ) : (
                <>
                  Send message
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </>
              )}
            </Button>

            <p className="mt-4 text-center text-xs leading-relaxed text-slate-500">
              By submitting, you agree to our privacy policy. We never share your details — this
              demo logs to the console instead of hitting a server.
            </p>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  )
}
