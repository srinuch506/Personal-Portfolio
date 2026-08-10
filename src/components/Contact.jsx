import { useState } from 'react'
import { motion } from 'framer-motion'
import axios from 'axios'
import './Contact.css'

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })
  const [status, setStatus] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('sending...')

    const endpoint = import.meta.env.VITE_FORMSPREE_ENDPOINT || 'https://formspree.io/f/your_form_id'

    try {
      const response = await axios.post(endpoint, formData, {
        headers: { 'Accept': 'application/json' }
      })

      if (response.status >= 200 && response.status < 300) {
        setStatus('MESSAGE SENT SUCCESSFULLY!')
        setFormData({ name: '', email: '', message: '' })
      } else {
        setStatus('FAILED TO SEND MESSAGE. PLEASE TRY AGAIN.')
      }
    } catch (error) {
      const msg = error?.response?.data?.error || error?.message || 'FAILED TO SEND MESSAGE. PLEASE TRY AGAIN.'
      setStatus(msg.toUpperCase())
    }
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  return (
    <motion.section
      id="contact"
      className="contact"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
    >
      <div className="contact__container">
        <div className="contact__grid-layout">
          {/* Left Column: Contact info */}
          <motion.div
            className="contact__info-col"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="contact__title">
              Get in <span className="contact__title-accent">Touch.</span>
            </h2>
            <p className="contact__description">
              Open to collaborations, AI consulting, freelance projects, or full-time roles. If you have an interesting problem, I'd love to hear about it.
            </p>

            <div className="contact__channels">
              <div className="contact__channel-row">
                <div className="channel__icon-box">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <path d="M22 6l-10 7L2 6" />
                  </svg>
                </div>
                <a href="mailto:srinivasaraoch506@gmail.com" className="channel__link">srinivasaraoch506@gmail.com</a>
              </div>

              <div className="contact__channel-row">
                <div className="channel__icon-box">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
                  </svg>
                </div>
                <a href="https://github.com/srinuch506" target="_blank" rel="noreferrer" className="channel__link">github.com/srinuch506</a>
              </div>

              <div className="contact__channel-row">
                <div className="channel__icon-box">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                    <rect x="2" y="9" width="4" height="12" />
                    <circle cx="4" cy="4" r="2" />
                  </svg>
                </div>
                <a href="https://www.linkedin.com/in/srinivasarao-cherukupalli-34a844240" target="_blank" rel="noreferrer" className="channel__link">LinkedIn Profile</a>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Input form */}
          <motion.div
            className="contact__form-col"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <form className="contact__form" onSubmit={handleSubmit}>
              <div className="form__group">
                <label htmlFor="name">NAME</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="Your name"
                />
              </div>

              <div className="form__group">
                <label htmlFor="email">EMAIL</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="your@email.com"
                />
              </div>

              <div className="form__group">
                <label htmlFor="message">MESSAGE</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows="5"
                  placeholder="Let's connect about a role or project..."
                />
              </div>

              <button type="submit" className="contact__submit-btn">
                <span>SEND MESSAGE &rarr;</span>
              </button>

              {status && (
                <div className="status__message-box">
                  {status}
                </div>
              )}
            </form>
          </motion.div>
        </div>
      </div>
    </motion.section>
  )
}

export default Contact
