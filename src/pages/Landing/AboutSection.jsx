import { MdGroups, MdApartment, MdAutoAwesome } from 'react-icons/md';

const cards = [
    {
        step: '01',
        tag: 'WHY',
        title: 'Why We Exist',
        icon: MdGroups,
        iconColor: '#6366f1',
        iconBg: 'rgba(99,102,241,0.12)',
        borderColor: '#6366f1',
        glowColor: 'rgba(99,102,241,0.18)',
        text: 'Finding a safe, affordable, and comfortable place to stay can be challenging for students and working professionals. Our goal is to make PG living simple, secure, and stress-free by providing a well-managed environment that truly feels like home.',
    },
    {
        step: '02',
        tag: 'WHAT',
        title: 'What We Provide',
        icon: MdApartment,
        iconColor: '#10b981',
        iconBg: 'rgba(16,185,129,0.12)',
        borderColor: '#10b981',
        glowColor: 'rgba(16,185,129,0.18)',
        text: 'We offer fully managed accommodation with comfortable rooms, nutritious meals, high-speed internet, housekeeping, security, and modern facilities designed to support everyday living.',
    },
    {
        step: '03',
        tag: 'HOW',
        title: 'How We Deliver',
        icon: MdAutoAwesome,
        iconColor: '#f59e0b',
        iconBg: 'rgba(245,158,11,0.12)',
        borderColor: '#f59e0b',
        glowColor: 'rgba(245,158,11,0.18)',
        text: 'Through smart room allocation, organized tenant management, regular maintenance, transparent payment tracking, and dedicated support — we ensure a seamless and comfortable experience for every resident.',
    },
];

export default function AboutSection() {
    return (
        <section className="section" id="about" style={{ background: 'var(--bg-secondary)', overflow: 'hidden' }}>
            <div className="container">

                {/* Header */}
                <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
                    <div className="section-tag">About Us</div>
                    <h2 className="section-heading" style={{ letterSpacing: '-0.02em' }}>
                        Why&nbsp;•&nbsp;What&nbsp;•&nbsp;How
                    </h2>
                    <p className="section-subheading" style={{ margin: '0 auto', maxWidth: 560 }}>
                        A simple approach to creating a comfortable, secure, and stress-free living experience.
                    </p>
                </div>

                {/* Two-column layout */}
                <div className="about-two-col">

                    {/* LEFT — Image */}
                    <div className="about-image-wrap">
                        <div style={{
                            position: 'relative',
                            borderRadius: 24,
                            overflow: 'hidden',
                            width: '100%',
                            aspectRatio: '4/5',
                            boxShadow: '0 24px 64px rgba(0,0,0,0.22)',
                        }}>
                            <img
                                src="https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=800&q=85"
                                alt="Modern PG living environment"
                                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                                loading="lazy"
                            />
                            {/* Overlay gradient */}
                            <div style={{
                                position: 'absolute', inset: 0,
                                background: 'linear-gradient(180deg, transparent 55%, rgba(99,102,241,0.25) 100%)',
                                pointerEvents: 'none',
                            }} />
                            {/* Badge */}
                            <div style={{
                                position: 'absolute', bottom: 20, left: 20,
                                background: 'rgba(255,255,255,0.12)',
                                backdropFilter: 'blur(14px)',
                                WebkitBackdropFilter: 'blur(14px)',
                                border: '1.5px solid rgba(255,255,255,0.25)',
                                borderRadius: 14,
                                padding: '0.75rem 1.1rem',
                                color: '#fff',
                            }}>
                                <div style={{ fontWeight: 800, fontSize: '1.4rem', lineHeight: 1 }}>8+</div>
                                <div style={{ fontSize: '0.75rem', opacity: 0.85, marginTop: 3 }}>Years of Trust</div>
                            </div>
                            <div style={{
                                position: 'absolute', top: 20, right: 20,
                                background: 'rgba(99,102,241,0.85)',
                                backdropFilter: 'blur(10px)',
                                borderRadius: 14,
                                padding: '0.65rem 1rem',
                                color: '#fff',
                            }}>
                                <div style={{ fontWeight: 800, fontSize: '1.2rem', lineHeight: 1 }}>500+</div>
                                <div style={{ fontSize: '0.72rem', opacity: 0.9, marginTop: 3 }}>Happy Residents</div>
                            </div>
                        </div>
                    </div>

                    {/* RIGHT — Timeline Cards */}
                    <div className="about-cards-col">
                        {cards.map((card, i) => {
                            const Icon = card.icon;
                            const isLast = i === cards.length - 1;
                            return (
                                <div key={card.tag} style={{ position: 'relative', display: 'flex', gap: '1rem' }}>

                                    {/* Timeline track */}
                                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexShrink: 0 }}>
                                        {/* Circle node */}
                                        <div style={{
                                            width: 44, height: 44, borderRadius: '50%',
                                            background: card.iconBg,
                                            border: `2px solid ${card.borderColor}`,
                                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                                            flexShrink: 0,
                                            boxShadow: `0 0 0 4px ${card.glowColor}`,
                                            zIndex: 1,
                                        }}>
                                            <Icon size={20} color={card.iconColor} />
                                        </div>
                                        {/* Connector line */}
                                        {!isLast && (
                                            <div style={{
                                                width: 2,
                                                flex: 1,
                                                minHeight: 24,
                                                background: `linear-gradient(to bottom, ${card.borderColor}90, ${cards[i + 1].borderColor}50)`,
                                                margin: '4px 0',
                                            }} />
                                        )}
                                    </div>

                                    {/* Card body */}
                                    <div
                                        className="about-card-hover"
                                        style={{
                                            flex: 1,
                                            marginBottom: isLast ? 0 : '1.25rem',
                                            background: 'var(--surface)',
                                            border: `1.5px solid var(--border)`,
                                            borderRadius: 18,
                                            padding: '1.5rem',
                                            boxShadow: '0 4px 24px rgba(0,0,0,0.07)',
                                            transition: 'transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease',
                                            position: 'relative',
                                            overflow: 'hidden',
                                        }}
                                        onMouseEnter={e => {
                                            e.currentTarget.style.transform = 'translateY(-3px)';
                                            e.currentTarget.style.boxShadow = `0 12px 36px ${card.glowColor}`;
                                            e.currentTarget.style.borderColor = card.borderColor;
                                        }}
                                        onMouseLeave={e => {
                                            e.currentTarget.style.transform = 'translateY(0)';
                                            e.currentTarget.style.boxShadow = '0 4px 24px rgba(0,0,0,0.07)';
                                            e.currentTarget.style.borderColor = 'var(--border)';
                                        }}
                                    >
                                        {/* Subtle glow blob */}
                                        <div style={{
                                            position: 'absolute', top: -20, right: -20,
                                            width: 80, height: 80, borderRadius: '50%',
                                            background: card.glowColor, filter: 'blur(24px)',
                                            pointerEvents: 'none',
                                        }} />

                                        {/* Step tag */}
                                        <div style={{
                                            display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
                                            background: card.iconBg,
                                            color: card.iconColor,
                                            borderRadius: 99,
                                            padding: '0.2rem 0.75rem',
                                            fontSize: '0.72rem',
                                            fontWeight: 700,
                                            letterSpacing: '0.08em',
                                            marginBottom: '0.85rem',
                                        }}>
                                            <span style={{
                                                width: 18, height: 18, borderRadius: '50%',
                                                background: card.iconColor,
                                                color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center',
                                                fontSize: '0.6rem', fontWeight: 800, lineHeight: 1,
                                            }}>
                                                {card.step}
                                            </span>
                                            {card.tag}
                                        </div>

                                        <h4 style={{ fontSize: '1.05rem', fontWeight: 700, marginBottom: '0.6rem', color: 'var(--text-primary)' }}>
                                            {card.title}
                                        </h4>
                                        <p style={{ fontSize: '0.875rem', lineHeight: 1.75, color: 'var(--text-secondary)', margin: 0 }}>
                                            {card.text}
                                        </p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>

            <style>{`
                .about-two-col {
                    display: grid;
                    grid-template-columns: 1fr 1.15fr;
                    gap: 3.5rem;
                    align-items: start;
                }
                .about-image-wrap {
                    position: sticky;
                    top: 100px;
                }
                .about-cards-col {
                    display: flex;
                    flex-direction: column;
                }

                @media (max-width: 860px) {
                    .about-two-col {
                        grid-template-columns: 1fr;
                        gap: 2.5rem;
                    }
                    .about-image-wrap {
                        position: static;
                    }
                    .about-image-wrap > div {
                        aspect-ratio: 16/9 !important;
                        max-height: 340px;
                    }
                }

                @media (max-width: 480px) {
                    .about-image-wrap > div {
                        border-radius: 16px !important;
                    }
                }
            `}</style>
        </section>
    );
}
