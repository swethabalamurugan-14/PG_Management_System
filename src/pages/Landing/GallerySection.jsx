import { useState } from 'react';
import { MdZoomIn } from 'react-icons/md';

const images = [
    { src: 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=600&q=80', label: 'Rooms' },
    { src: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=600&q=80', label: 'Single Room' },
    { src: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=600&q=80', label: 'Reception' },
    { src: 'https://images.unsplash.com/photo-1567521464027-f127ff144326?w=600&q=80', label: 'Kitchen' },
    { src: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&q=80', label: 'Dining Hall' },
    { src: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80', label: 'Common Area' },
    { src: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80', label: 'Washroom' },
    { src: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80', label: 'Parking' },
];

export default function GallerySection() {
    const [lightbox, setLightbox] = useState(null);

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
                <div className="gallery-grid">
                    {images.map((img, i) => (
                        <div key={i} className="gallery-item" onClick={() => setLightbox(img)}>
                            <img src={img.src} alt={img.label} loading="lazy" />
                            <div className="gallery-overlay">
                                <MdZoomIn />
                            </div>
                            <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '0.75rem', background: 'linear-gradient(transparent, rgba(0,0,0,0.6))', color: '#fff', fontSize: '0.85rem', fontWeight: 600 }}>
                                {img.label}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Lightbox */}
            {lightbox && (
                <div className="modal-overlay" onClick={() => setLightbox(null)} style={{ background: 'rgba(0,0,0,0.9)' }}>
                    <div style={{ position: 'relative', maxWidth: 900, width: '100%', padding: '1rem' }}>
                        <img src={lightbox.src} alt={lightbox.label} style={{ width: '100%', borderRadius: 12 }} />
                        <div style={{ textAlign: 'center', color: '#fff', marginTop: '0.75rem', fontWeight: 600 }}>{lightbox.label}</div>
                        <button className="btn btn-icon" onClick={() => setLightbox(null)} style={{ position: 'absolute', top: 0, right: 16, color: '#fff', background: 'rgba(255,255,255,0.1)', fontSize: '1.5rem' }}>✕</button>
                    </div>
                </div>
            )}
        </section>
    );
}
