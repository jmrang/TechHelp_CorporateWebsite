/**
 * Contact form state machine: field values, per-field validation errors and a
 * submission status of "idle" | "submitting" | "success" | "error".
 *
 * Keeps the Contact page purely presentational. Submission goes through
 * src/utils/api.js — swap that single function to wire up Formspree, EmailJS
 * or your own backend later.
 */
import { useState } from 'react'
import { submitContactForm } from '../utils/api'

export const INITIAL_CONTACT_VALUES = {
  name: '',
  email: '',
  company: '',
  service: '',
  message: '',
}

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function validate(values) {
  const errors = {}

  if (!values.name.trim()) {
    errors.name = 'Please tell us your name.'
  }

  if (!values.email.trim()) {
    errors.email = 'An email address is required.'
  } else if (!EMAIL_PATTERN.test(values.email.trim())) {
    errors.email = 'That email address does not look right.'
  }

  if (!values.service) {
    errors.service = 'Please select what you need help with.'
  }

  if (!values.message.trim()) {
    errors.message = 'Please include a short project summary.'
  } else if (values.message.trim().length < 20) {
    errors.message = 'A little more detail helps — 20 characters minimum.'
  }

  return errors
}

export default function useContactForm() {
  const [values, setValues] = useState(INITIAL_CONTACT_VALUES)
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle')

  /** Update one field; clears its error as soon as the user edits again. */
  const handleChange = (field) => (event) => {
    const { value } = event.target
    setValues((prev) => ({ ...prev, [field]: value }))
    setErrors((prev) => {
      if (!prev[field]) return prev
      const next = { ...prev }
      delete next[field]
      return next
    })
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    const validationErrors = validate(values)
    setErrors(validationErrors)
    if (Object.keys(validationErrors).length > 0) return

    setStatus('submitting')
    try {
      await submitContactForm(values)
      setStatus('success')
      setValues(INITIAL_CONTACT_VALUES)
      setErrors({})
    } catch {
      setStatus('error')
    }
  }

  /** Returns from the success confirmation to a blank form. */
  const reset = () => {
    setValues(INITIAL_CONTACT_VALUES)
    setErrors({})
    setStatus('idle')
  }

  return { values, errors, status, handleChange, handleSubmit, reset }
}
