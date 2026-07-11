const facilities = [
    { icon: '📶', label: 'Wi-Fi', desc: 'High-speed internet' },
    { icon: '🍽️', label: 'Food', desc: 'Hygienic homemade meals' },
    { icon: '👕', label: 'Laundry', desc: 'Washing facility' },
    { icon: '🧹', label: 'Housekeeping', desc: 'Daily cleaning' },
    { icon: '🚗', label: 'Parking', desc: 'Secure parking area' },
    { icon: '📷', label: 'CCTV', desc: '24/7 surveillance' },
    { icon: '🛡️', label: 'Security', desc: 'Round-the-clock guard' },
    { icon: '⚡', label: 'Power Backup', desc: 'Uninterrupted power' },
    { icon: '💧', label: 'RO Water', desc: 'Purified drinking water' },
    { icon: '❄️', label: 'AC Rooms', desc: 'Premium AC rooms' },
    { icon: '💪', label: 'Gym', desc: 'Fitness centre' },
    { icon: '📚', label: 'Study Area', desc: 'Quiet study space' },
];

export default function FacilitiesSection() {
    return (
        <section className="section" id="facilities">
            <div className="container">
                <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                    <div className="section-tag">Facilities</div>
                    <h2 className="section-heading">Everything You Need to Thrive</h2>
                    <p className="section-subheading" style={{ margin: '0 auto' }}>
                        We provide all the modern amenities to make your living experience comfortable, productive, and enjoyable.
                    </p>
                </div>
                <div className="facility-grid">
                    {facilities.map(f => (
                        <div key={f.label} className="facility-card">
                            <div className="facility-icon">{f.icon}</div>
                            <h5 style={{ marginBottom: '0.25rem' }}>{f.label}</h5>
                            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{f.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
