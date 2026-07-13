import { MdStar } from 'react-icons/md';

export default function HeroSection() {
    return (
        <section className="hero-section" id="home" style={{ padding: '0 0' }}>
            <div className="hero-overlay" />
            {/* Decorative circles */}
            <div style={{ position: 'absolute', top: '15%', right: '8%', width: 350, height: 350, borderRadius: '50%', background: 'rgba(99,102,241,0.15)', filter: 'blur(60px)', pointerEvents: 'none' }} />
            <div style={{ position: 'absolute', bottom: '10%', right: '20%', width: 200, height: 200, borderRadius: '50%', background: 'rgba(139,92,246,0.2)', filter: 'blur(40px)', pointerEvents: 'none' }} />

            <div className="container" style={{ position: 'relative', zIndex: 1, padding: '8rem 1.5rem 5rem' }}>
                <div className="hero-content">
                    <div className="hero-badge">
                        <MdStar size={14} />
                        Trusted by 500+ Happy Tenants
                    </div>
                    <h1 className="hero-title">
                        Comfortable Living<br />
                        <span style={{ background: 'linear-gradient(90deg, #a5b4fc, #c4b5fd)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Starts Here</span>
                    </h1>
                    <p className="hero-subtitle">
                        Safe, affordable and comfortable accommodation for students and working professionals with modern facilities and secure management.
                    </p>
                    <div className="hero-btns">
                        <a href="#contact" className="btn btn-lg" style={{ background: 'rgba(255,255,255,0.12)', color: '#fff', border: '1.5px solid rgba(255,255,255,0.3)', backdropFilter: 'blur(10px)' }}>
                            Contact Us
                        </a>
                    </div>

                    <div className="hero-stats">
                        {[
                            { value: '50+', label: 'Total Rooms' },
                            { value: '200+', label: 'Happy Tenants' },
                            { value: '8+', label: 'Years of Service' },
                            { value: '24/7', label: 'Security' },
                        ].map(s => (
                            <div key={s.label}>
                                <div className="hero-stat-value">{s.value}</div>
                                <div className="hero-stat-label">{s.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
