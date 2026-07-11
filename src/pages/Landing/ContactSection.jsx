import { useState } from 'react';
import { MdLocationOn, MdPhone, MdEmail, MdSend } from 'react-icons/md';
import toast from 'react-hot-toast';

export default function ContactSection() {
    const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });

    const handleSubmit = (e) => {
        e.preventDefault();
        toast.success('Message sent! We\'ll get back to you within 24 hours.');
        setForm({ name: '', email: '', phone: '', message: '' });
    };

    return (
        <section className="section" id="contact" style={{ background: 'var(--bg-secondary)' }}>
            <div className="container">
                <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                    <div className="section-tag">Contact Us</div>
                    <h2 className="section-heading">Get In Touch</h2>
                    <p className="section-subheading" style={{ margin: '0 auto' }}>
                        Have questions? We're here to help. Reach out to us and we'll respond promptly.
                    </p>
                </div>

                <div className="contact-grid">
                    <div>
                        <div className="contact-info">
                            {[
                                { icon: MdLocationOn, label: 'Visit Us', value: '42, 3rd Cross, Koramangala 5th Block, Bengaluru – 560095, Karnataka' },
                                { icon: MdPhone, label: 'Call Us', value: '+91 98765 43210  |  +91 80 2553 7890' },
                                { icon: MdEmail, label: 'Email Us', value: 'info@pgmanager.com  |  bookings@pgmanager.com' },
                            ].map(item => (
                                <div key={item.label} className="contact-item">
                                    <div className="contact-icon"><item.icon size={20} /></div>
                                    <div>
                                        <div style={{ fontWeight: 700, fontSize: '0.9rem', marginBottom: '0.25rem' }}>{item.label}</div>
                                        <p style={{ fontSize: '0.875rem', lineHeight: 1.65 }}>{item.value}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="map-embed">
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3888.5992!2d77.6278!3d12.9352!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTLCsDU2JzA2LjciTiA3N8KwMzcnNDAuMSJF!5e0!3m2!1sen!2sin!4v1234567890"
                                allowFullScreen
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                                title="PG Location Map"
                            />
                        </div>
                    </div>

                    <div className="card" style={{ padding: '2rem' }}>
                        <h4 style={{ marginBottom: '1.5rem' }}>Send Us a Message</h4>
                        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            <div className="form-group">
                                <label className="form-label">Full Name *</label>
                                <input className="form-control" placeholder="Your full name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} required />
                            </div>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                                <div className="form-group">
                                    <label className="form-label">Email *</label>
                                    <input type="email" className="form-control" placeholder="you@example.com" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} required />
                                </div>
                                <div className="form-group">
                                    <label className="form-label">Phone</label>
                                    <input type="tel" className="form-control" placeholder="9876543210" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} />
                                </div>
                            </div>
                            <div className="form-group">
                                <label className="form-label">Message *</label>
                                <textarea className="form-control" rows={5} placeholder="Tell us about your requirements..." value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} required style={{ resize: 'vertical' }} />
                            </div>
                            <button type="submit" className="btn btn-primary">
                                <MdSend size={18} /> Send Message
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
}
