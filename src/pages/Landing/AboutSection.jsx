import { MdCheckCircle } from 'react-icons/md';

const whyUs = [
    'Prime location with good connectivity',
    'Professional round-the-clock security',
    'Hygienic homemade food served daily',
    'High-speed Wi-Fi in all rooms',
    'Zero tolerance for misconduct',
    'Transparent billing and management',
];

export default function AboutSection() {
    return (
        <section className="section" id="about" style={{ background: 'var(--bg-secondary)' }}>
            <div className="container">
                {/* Header */}
                <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
                    <div className="section-tag">About Us</div>
                    <h2 className="section-heading">A Home Away From Home</h2>
                    <p className="section-subheading" style={{ margin: '0 auto' }}>
                        Established in 2017, PG Manager offers premium paying guest accommodation designed for students and working professionals seeking comfort, safety, and community.
                    </p>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem', marginBottom: '3rem' }}>
                    {[
                        { title: '🎯 Our Mission', text: 'To provide safe, affordable, and comfortable living spaces that feel like home — with professional management and modern amenities that support your growth and well-being.' },
                        { title: '🔭 Our Vision', text: 'To become the most trusted PG accommodation brand in the city by setting the highest standards in tenant experience, cleanliness, and transparent management.' },
                        { title: '💡 Why Choose Us', showList: true },
                    ].map(card => (
                        <div key={card.title} className="card card-hover" style={{ padding: '2rem' }}>
                            <h3 style={{ fontSize: '1.2rem', marginBottom: '1rem' }}>{card.title}</h3>
                            {card.showList ? (
                                <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                                    {whyUs.map(item => (
                                        <li key={item} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.6rem', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                                            <MdCheckCircle size={18} color="var(--success)" style={{ flexShrink: 0, marginTop: 2 }} />
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p style={{ fontSize: '0.9rem', lineHeight: 1.75 }}>{card.text}</p>
                            )}
                        </div>
                    ))}
                </div>

                {/* Stats */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px,1fr))', gap: '1.25rem' }}>
                    {[
                        { value: '50+', label: 'Total Rooms', icon: '🏠', color: '#6366f1' },
                        { value: '200+', label: 'Happy Tenants', icon: '😊', color: '#10b981' },
                        { value: '8+', label: 'Years of Service', icon: '🏆', color: '#f59e0b' },
                        { value: '24/7', label: 'Security', icon: '🛡️', color: '#ef4444' },
                    ].map(s => (
                        <div key={s.label} className="card" style={{ padding: '1.75rem', textAlign: 'center' }}>
                            <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>{s.icon}</div>
                            <div style={{ fontSize: '2rem', fontWeight: 800, color: s.color }}>{s.value}</div>
                            <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 500 }}>{s.label}</div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
