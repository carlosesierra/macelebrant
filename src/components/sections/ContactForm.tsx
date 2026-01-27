'use client'

import { useRef, useState, type ChangeEvent, type FormEvent } from 'react'
import ReCAPTCHA from 'react-google-recaptcha'

type FormState = {
  name: string
  email: string
  message: string
}

const initialForm: FormState = {
  name: '',
  email: '',
  message: '',
}

export default function ContactForm() {
  const [form, setForm] = useState<FormState>(initialForm)
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')
  const [error, setError] = useState<string | null>(null)
  const recaptchaRef = useRef<ReCAPTCHA | null>(null)

  const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || ''

  const [captchaToken, setCaptchaToken] = useState<string | null>(null)


  const onChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }))
  }

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setStatus('sending')
    setError(null)

    const token = captchaToken
    if (!token) {
      setStatus('error')
      setError('Please complete the reCAPTCHA.')
      return
    }

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, token }),
      })

      if (!response.ok) {
        const data = await response.json().catch(() => ({}))
        throw new Error(data?.error || 'Something went wrong. Please try again.')
      }

      setStatus('success')
      setForm(initialForm)
      recaptchaRef.current?.reset()
      setCaptchaToken(null)
    } catch (err) {
      setStatus('error')
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.')
      recaptchaRef.current?.reset()
      setCaptchaToken(null)
    }
  }

  if (!siteKey) {
    return (
      <div className='rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700'>
        Missing reCAPTCHA site key. Set `NEXT_PUBLIC_RECAPTCHA_SITE_KEY` in `.env.local`.
      </div>
    )
  }

  return (
    <form onSubmit={onSubmit} className='grid gap-4'>
      <div className='grid gap-2'>
        <label htmlFor='name' className='text-sm font-medium text-gray-700'>
          Name
        </label>
        <input
          id='name'
          name='name'
          type='text'
          required
          value={form.name}
          onChange={onChange}
          className='w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm text-gray-900 shadow-sm focus:border-black focus:outline-none'
        />
      </div>

      <div className='grid gap-2'>
        <label htmlFor='email' className='text-sm font-medium text-gray-700'>
          Email
        </label>
        <input
          id='email'
          name='email'
          type='email'
          required
          value={form.email}
          onChange={onChange}
          className='w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm text-gray-900 shadow-sm focus:border-black focus:outline-none'
        />
      </div>

      <div className='grid gap-2'>
        <label htmlFor='message' className='text-sm font-medium text-gray-700'>
          Message
        </label>
        <textarea
          id='message'
          name='message'
          rows={5}
          required
          value={form.message}
          onChange={onChange}
          className='w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm text-gray-900 shadow-sm focus:border-black focus:outline-none'
        />
      </div>

      <ReCAPTCHA
        ref={recaptchaRef}
        sitekey={siteKey}
        onChange={(token) => setCaptchaToken(token)}
        onExpired={() => setCaptchaToken(null)}
      />
      <div className='flex'>  
        <button
          type='submit'
          disabled={status === 'sending' || !captchaToken}
          className='inline-flex items-center justify-center rounded-full bg-black px-6 py-3 text-sm font-semibold uppercase tracking-widest text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-70'
        >
          {status === 'sending' ? 'Sending...' : 'Submit'}
        </button>
      </div>

      {status === 'success' ? (
        <p className='text-sm font-medium text-green-700'>Message sent successfully.</p>
      ) : null}
      {status === 'error' && error ? (
        <p className='text-sm font-medium text-red-600'>{error}</p>
      ) : null}
    </form>
  )
}
