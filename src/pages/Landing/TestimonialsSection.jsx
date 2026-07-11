import { MdStar } from 'react-icons/md';

const testimonials = [
    { name: 'Karthik Reddy', role: 'Software Engineer', rating: 5, text: 'Living here for 2 years and it has been an amazing experience. Clean rooms, great food, high-speed internet — everything you need in one place!', initials: 'KR' },
    { name: 'Aisha Nair', role: 'MBA Student', rating: 5, text: 'The security here is top-notch and the management is very responsive. I feel safe and comfortable. Highly recommend to working women!', initials: 'AN' },
    { name: 'Vikram Singh', role: 'Data Analyst', rating: 4, text: 'Great value for money. The study area is perfect for late-night work sessions and the Wi-Fi never cuts out. Very happy tenant!', initials: 'VS' },
    { name: 'Pooja Mehta', role: 'College Student', rating: 5, text: 'The food is absolutely wonderful, just like home cooking. The management team is always available to help with any issues.', initials: 'PM' },
    { name: 'Rohan Gupta', role: 'UI Developer', rating: 4, text: 'Modern rooms, clean washrooms, and a very friendly community. The app makes paying rent super convenient as well.', initials: 'RG' },
    { name: 'Deepika Rao', role: 'Medical Student', rating: 5, text: 'Best PG in the city! The gym and study area are excellent and the location is very convenient. Would recommend to anyone!', initials: 'DR' },
];

export default function TestimonialsSection() {
    return (
        <section className="section" style={{ background: 'var(--bg-secondary)' }}>
            <div className="container">
                <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                    <div className="section-tag">Testimonials</div>
                    <h2 className="section-heading">What Our Tenants Say</h2>
                    <p className="section-subheading" style={{ margin: '0 auto' }}>
                        Real reviews from people who call PG Manager their home.
                    </p>
                </div>
                <div className="testimonial-grid">
                    {testimonials.map((t, i) => (
                        <div key={i} className="testimonial-card">
                            <div className="testimonial-stars">
                                {Array.from({ length: 5 }).map((_, j) => (
                                    <MdStar key={j} style={{ opacity: j < t.rating ? 1 : 0.3 }} />
                                ))}
                            </div>
                            <p className="testimonial-text">"{t.text}"</p>
                            <div className="testimonial-author">
                                <div className="testimonial-avatar">{t.initials}</div>
                                <div>
                                    <div style={{ fontWeight: 700, fontSize: '0.9rem' }}>{t.name}</div>
                                    <div style={{ fontSize: '0.775rem', color: 'var(--text-muted)' }}>{t.role}</div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
