import nodemailer from 'nodemailer'
import { NextResponse } from 'next/server'

type ContactPayload = {
  name: string
  email: string
  message: string
  token: string
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as Partial<ContactPayload>
    const name = body.name?.trim()
    const email = body.email?.trim()
    const message = body.message?.trim()
    const token = body.token

    if (!name || !email || !message || !token) {
      return NextResponse.json({ error: 'Missing required fields.' }, { status: 400 })
    }

    // Basic email sanity check (not perfect, but prevents obvious junk)
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      return NextResponse.json({ error: 'Invalid email address.' }, { status: 400 })
    }

    const recaptchaSecret = process.env.RECAPTCHA_SECRET_KEY
    if (!recaptchaSecret) {
      return NextResponse.json({ error: 'Missing reCAPTCHA secret.' }, { status: 500 })
    }

    type RecaptchaVerifyResponse = {
      success?: boolean
      challenge_ts?: string
      hostname?: string
      ['error-codes']?: string[]
    }

    const verifyResponse = await fetch('https://www.google.com/recaptcha/api/siteverify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        secret: recaptchaSecret,
        response: token,
      }).toString(),
    })

    if (!verifyResponse.ok) {
      // Google sometimes returns non-200 on network/policy issues
      return NextResponse.json(
        { error: 'reCAPTCHA verification request failed.' },
        { status: 502 }
      )
    }

    const verification = (await verifyResponse.json()) as RecaptchaVerifyResponse

    if (!verification.success) {
      return NextResponse.json(
        { error: 'reCAPTCHA verification failed.', details: verification['error-codes'] ?? [] },
        { status: 400 }
      )
    }

    // Optional: ensure the token was issued for this site (recommended for production).
    // Set RECAPTCHA_ALLOWED_HOSTNAMES="macelebrant.vercel.app,localhost,macelebrant.com" in env.
    const allowedHostnames = (process.env.RECAPTCHA_ALLOWED_HOSTNAMES || '')
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean)

    if (allowedHostnames.length && verification.hostname) {
      if (!allowedHostnames.includes(verification.hostname)) {
        return NextResponse.json({ error: 'reCAPTCHA hostname mismatch.' }, { status: 400 })
      }
    }

    const smtpHost = process.env.SMTP_HOST || 'smtp.crazydomains.com'
    const smtpPort = Number(process.env.SMTP_PORT || 465)
    const smtpUser = process.env.SMTP_USER
    const smtpPass = process.env.SMTP_PASS
    const contactTo = process.env.CONTACT_TO || 'carlosesierra@gmail.com'

    if (!smtpUser || !smtpPass) {
      return NextResponse.json({ error: 'Missing SMTP credentials.' }, { status: 500 })
    }

    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: smtpPort,
      secure: smtpPort === 465,
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
    })

    await transporter.sendMail({
      to: contactTo,
      from: `MA Celebrant <${smtpUser}>`,
      replyTo: email,
      subject: `New contact form message from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
    })

    return NextResponse.json({ ok: true })
  } catch (error) {
    console.error('Contact form error:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Unknown server error.' },
      { status: 500 }
    )
  }
}
