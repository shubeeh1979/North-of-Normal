import { useState } from 'react'
import PageHeader from '../components/PageHeader.jsx'
import { email } from '../data/site.js'
import { usePageTitle } from '../lib.js'

const field = 'w-full rounded-xl border border-amber-500/20 bg-[#0a0a0a] px-4 py-3 text-white placeholder:text-neutral-600 focus:border-amber-400 focus:outline-none'

export default function Contact() {
  usePageTitle('Contact')
  const [status, setStatus] = useState('idle')

  const onSubmit = async (e) => {
    e.preventDefault()
    setStatus('sending')
    const res = await fetch('/__forms.html', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams(new FormData(e.target)).toString(),
    }).catch(() => null)
    setStatus(res?.ok ? 'sent' : 'error')
  }

  return (
    <>
      <PageHeader eyebrow="Contact" title="Get in Touch">
        <p>Have a question or interested in working together? Send us a message and we'll respond within 24-48 hours.</p>
      </PageHeader>
      <section className="px-4 py-8">
        <div className="card mx-auto max-w-2xl p-8">
          {status === 'sent' ? (
            <div className="text-center">
              <h2 className="font-heading text-2xl">Thank You!</h2>
              <p className="mt-2 text-neutral-400">We've received your message and will get back to you within 24-48 hours.</p>
            </div>
          ) : (
            <form name="contact" method="POST" data-netlify="true" netlify-honeypot="bot-field" onSubmit={onSubmit} className="space-y-4">
              <input type="hidden" name="form-name" value="contact" />
              <input type="hidden" name="subject" value="New inquiry from northofnormal-sync.com" />
              <p hidden><input name="bot-field" /></p>
              <input name="name" required placeholder="Your full name" className={field} />
              <input name="email" type="email" required placeholder="your@email.com" className={field} />
              <input name="phone" placeholder="+44 123 456 7890 (optional)" className={field} />
              <textarea name="message" required rows={6} placeholder="Tell us about your project or inquiry..." className={field} />
              <button type="submit" disabled={status === 'sending'} className="btn-gold w-full">
                {status === 'sending' ? 'Sending…' : 'Send Message'}
              </button>
              {status === 'error' && <p className="text-sm text-red-400">Failed to send message. Please try again or email {email}.</p>}
            </form>
          )}
        </div>
        <p className="mt-6 text-center text-sm text-neutral-400">
          Or email <a href={`mailto:${email}`} className="text-amber-300">{email}</a>
        </p>
      </section>
    </>
  )
}
