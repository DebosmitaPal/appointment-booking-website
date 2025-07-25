import React, { useState } from "react";
import "./ContactPage.css";
import officeImg from "../../assets/ContactUs.jpg";
import calendarLogo from "../../assets/calendar1.avif";

function ContactContainer() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus('');
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (res.ok) {
        setStatus('Message sent successfully! Please check your email.');
        setForm({ name: '', email: '', phone: '', message: '' });
      } else {
        setStatus(data.message || 'Failed to send message.');
      }
    } catch (err) {
      setStatus('Failed to send message.');
    }
    setLoading(false);
  };

  return (
    <div className="contact-page-container">
      <div className="contact-card">
        <div className="contact-left">
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
            <img src={calendarLogo} alt="SyncUniServe Calendar Logo" style={{ height: '48px', width: '48px', borderRadius: '8px', background: '#fff' }} />
            <h1 className="contact-title" style={{ marginBottom: 0 }}>Get in touch</h1>
          </div>
          <form className="contact-form" onSubmit={handleSubmit}>
            <input type="text" name="name" placeholder="Name" required value={form.name} onChange={handleChange} />
            <input type="email" name="email" placeholder="Email" required value={form.email} onChange={handleChange} />
            <input type="tel" name="phone" placeholder="Phone" required value={form.phone} onChange={handleChange} />
            <textarea name="message" placeholder="Message" rows={4} required value={form.message} onChange={handleChange} />
            <button type="submit" className="contact-submit-btn" disabled={loading}>{loading ? 'Sending...' : 'Submit'}</button>
          </form>
          {status && <div style={{ marginTop: 16, color: status.includes('success') ? 'green' : 'red', fontWeight: 500 }}>{status}</div>}
        </div>
        <div className="contact-right">
          <div className="contact-info-block">
            <div className="contact-info-item">
              <span role="img" aria-label="location">📍</span>
              <div>
                <strong>SyncUniServe: Appointy Store, DP Road</strong><br />
                Kolkata<br />
                A wooden door, next to the KrishnaMurthy shopping mall.
              </div>
            </div>
            <div className="contact-info-item">
              <span role="img" aria-label="phone">📞</span>
              <a href="tel:+9876543210">9876543210</a>
            </div>
            <div className="contact-info-item">
              <span role="img" aria-label="email">✉️</span>
              <a href="mailto:high@hubitat.rs">support@syncuniserve.com</a>
            </div>
          </div>
          <img src={officeImg} alt="Office" className="contact-office-img" />
        </div>
      </div>
    </div>
  );
}

export default ContactContainer; 