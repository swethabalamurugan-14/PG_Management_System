import { useState, useRef, useEffect } from 'react';
import { MdChevronLeft, MdChevronRight, MdZoomIn, MdClose } from 'react-icons/md';

const images = [
    { src: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=900&q=80', label: 'Reception' },
    { src: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=900&q=80', label: 'Bedroom' },
    { src: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=900&q=80', label: 'Dining Hall' },
    { src: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=900&q=80', label: 'Kitchen' },
    { src: 'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=900&q=80', label: 'Washroom' },
    { src: 'https://images.unsplash.com/photo-1590674899484-d5640e854abe?w=900&q=80', label: 'Parking Area' },
    { src: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=900&q=80', label: 'Common Area' },
    { src: 'https://images.unsplash.com/photo-1540518614846-7eded433c457?w=900&q=80', label: 'Single Room' },
];

export default function GallerySection() {
    const [current, setCurrent] = useState(0);
    const [lightbox, setLightbox] = useState(null);
    const [sliding, setSliding] = useState(false);
    const [direction, setDirection] = useState('');
    const autoRef = useRef(null);

    const goTo = (idx, dir = '') => {
        if (sliding) return;
        setDirection(dir);
        setSliding(true);
        setTimeout(() => {
            setCurrent(idx);
            setSliding(false);
            setDirection('');
        }, 300);
    };

    const prev = () => goTo((current - 1 + images.length) % images.length, 'prev');
    const next = () => goTo((current + 1) % images.length, 'next');

    // Auto-advance every 4s
    useEffect(() => {
        autoRef.current = setInterval(() => next(), 4000);
        return () => clearInterval(autoRef.current);
    }, [current]);

    const resetAuto = (cb) => {
        clearInterval(autoRef.current);
        cb();
        autoRef.current = setInterval(() => next(), 4000);
    };

    return (
        <section className="section" id="gallery">
            <div className="container">
                <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                    <div className="section-tag">Gallery</div>
                    <h2 className="section-heading">See Our Spaces</h2>
                    <p className="section-subheading" style={{ margin: '0 auto' }}>
                        A glimpse into the well-maintained and welcoming spaces that await you at PG Manager.
                    </p>
                </div>

                {/* Carousel */}
                <div style={{ position: 'relative', maxWidth: 900, margin: '0 auto' }}>
                    {/* Main image */}
                    <div style={{
                        position: 'relative',
                        borderRadius: 20,
                        overflow: 'hidden',
                        aspectRatio: '16/9',
                        background: 'var(--bg-secondary)',
                        cursor: 'pointer',
                        boxShadow: '0 20px 60px rgba(0,0,0,0.25)',
                    }}>
                        <img
                            key={current}
                            src={images[current].src}
                            alt={images[current].label}
                            onClick={() => setLightbox(images[current])}
                            style={{
                                width: '100%',
                                height: '100%',
                                objectFit: 'cover',
                                display: 'block',
                                animation: `${sliding ? (direction === 'prev' ? 'slideInRight' : 'slideInLeft') : 'fadeSlide'} 0.35s ease`,
                            }}
                        />
                        {/* Label badge */}
                        <div style={{
                            position: 'absolute', bottom: 0, left: 0, right: 0,
                            padding: '3rem 1.5rem 1.25rem',
                            background: 'linear-gradient(transparent, rgba(0,0,0,0.65))',
                            color: '#fff', fontWeight: 700, fontSize: '1.1rem',
                            display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between',
                        }}>
                            <span>{images[current].label}</span>
                            <button
                                onClick={(e) => { e.stopPropagation(); setLightbox(images[current]); }}
                                style={{ background: 'rgba(255,255,255,0.2)', border: 'none', borderRadius: 8, padding: '0.4rem', cursor: 'pointer', color: '#fff', display: 'flex' }}
                            >
                                <MdZoomIn size={20} />
                            </button>
                        </div>
                        {/* Counter */}
                        <div style={{
                            position: 'absolute', top: 14, right: 14,
                            background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(8px)',
                            color: '#fff', borderRadius: 99, padding: '0.25rem 0.75rem',
                            fontSize: '0.8rem', fontWeight: 600,
                        }}>
                            {current + 1} / {images.length}
                        </div>
                    </div>

                    {/* Prev/Next Arrows */}
                    {[
                        { fn: () => resetAuto(prev), icon: <MdChevronLeft size={28} />, side: { left: -20 } },
                        { fn: () => resetAuto(next), icon: <MdChevronRight size={28} />, side: { right: -20 } },
                    ].map((btn, i) => (
                        <button
                            key={i}
                            onClick={btn.fn}
                            style={{
                                position: 'absolute', top: '50%', transform: 'translateY(-50%)',
                                ...btn.side,
                                width: 46, height: 46, borderRadius: '50%',
                                background: 'var(--surface)',
                                border: '1.5px solid var(--border)',
                                boxShadow: '0 4px 16px rgba(0,0,0,0.15)',
                                cursor: 'pointer', color: 'var(--text-primary)',
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                                zIndex: 2,
                            }}
                            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-50%) scale(1.1)'; e.currentTarget.style.boxShadow = '0 6px 24px rgba(99,102,241,0.25)'; }}
                            onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(-50%) scale(1)'; e.currentTarget.style.boxShadow = '0 4px 16px rgba(0,0,0,0.15)'; }}
                        >
                            {btn.icon}
                        </button>
                    ))}

                    {/* Dot indicators */}
                    <div style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem', marginTop: '1.25rem' }}>
                        {images.map((_, i) => (
                            <button
                                key={i}
                                onClick={() => resetAuto(() => goTo(i))}
                                style={{
                                    width: i === current ? 28 : 8,
                                    height: 8, borderRadius: 99,
                                    border: 'none', cursor: 'pointer',
                                    background: i === current ? 'var(--primary-400)' : 'var(--border)',
                                    transition: 'all 0.3s ease',
                                    padding: 0,
                                }}
                            />
                        ))}
                    </div>

                    {/* Thumbnail strip */}
                    <div style={{
                        display: 'flex', gap: '0.6rem', marginTop: '1rem',
                        overflowX: 'auto', paddingBottom: '0.25rem',
                        scrollbarWidth: 'none',
                        justifyContent: 'center',
                        flexWrap: 'wrap',
                    }}>
                        {images.map((img, i) => (
                            <button
                                key={i}
                                onClick={() => resetAuto(() => goTo(i))}
                                style={{
                                    width: 70, height: 50, borderRadius: 8, padding: 0,
                                    border: i === current ? '2.5px solid var(--primary-400)' : '2px solid transparent',
                                    overflow: 'hidden', cursor: 'pointer', flexShrink: 0,
                                    opacity: i === current ? 1 : 0.65,
                                    transition: 'all 0.25s ease',
                                }}
                            >
                                <img src={img.src} alt={img.label} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Lightbox */}
            {lightbox && (
                <div
                    className="modal-overlay"
                    onClick={() => setLightbox(null)}
                    style={{ background: 'rgba(0,0,0,0.92)' }}
                >
                    <div style={{ position: 'relative', maxWidth: 960, width: '95%', padding: '1rem' }}>
                        <img src={lightbox.src} alt={lightbox.label} style={{ width: '100%', borderRadius: 14, display: 'block' }} />
                        <div style={{ textAlign: 'center', color: '#fff', marginTop: '0.75rem', fontWeight: 600 }}>{lightbox.label}</div>
                        <button
                            className="btn btn-icon"
                            onClick={() => setLightbox(null)}
                            style={{ position: 'absolute', top: 0, right: 0, color: '#fff', background: 'rgba(255,255,255,0.12)' }}
                        >
                            <MdClose size={20} />
                        </button>
                    </div>
                </div>
            )}

            <style>{`
                @keyframes fadeSlide {
                    from { opacity: 0.6; transform: scale(1.02); }
                    to   { opacity: 1; transform: scale(1); }
                }
                @keyframes slideInLeft {
                    from { opacity: 0; transform: translateX(-40px); }
                    to   { opacity: 1; transform: translateX(0); }
                }
                @keyframes slideInRight {
                    from { opacity: 0; transform: translateX(40px); }
                    to   { opacity: 1; transform: translateX(0); }
                }
            `}</style>
        </section>
    );
}
