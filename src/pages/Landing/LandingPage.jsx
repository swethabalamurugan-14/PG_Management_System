import { useState, useEffect } from 'react';
import { MdPhone, MdClose, MdWhatsapp } from 'react-icons/md';
import LandingNavbar from './LandingNavbar';
import HeroSection from './HeroSection';
import AboutSection from './AboutSection';
import FacilitiesSection from './FacilitiesSection';
import RoomTypesSection from './RoomTypesSection';
import GallerySection from './GallerySection';
import TestimonialsSection from './TestimonialsSection';
import FAQSection from './FAQSection';
import ContactSection from './ContactSection';
import Footer from './Footer';

export default function LandingPage() {
    const [fabOpen, setFabOpen] = useState(false);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const handler = () => setVisible(window.scrollY > 300);
        window.addEventListener('scroll', handler);
        return () => window.removeEventListener('scroll', handler);
    }, []);

    return (
        <div>
            <LandingNavbar />
            <HeroSection />
            <AboutSection />
            <FacilitiesSection />
            <RoomTypesSection />
            <GallerySection />
            <TestimonialsSection />
            <FAQSection />
            <ContactSection />
            <Footer />

            {/* Floating Action Button */}
            {visible && (
                <div style={{ position: 'fixed', bottom: '2rem', right: '2rem', zIndex: 200, display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '0.75rem' }}>
                    {/* Sub-actions */}
                    {fabOpen && (
                        <>
                            <a
                                href="tel:+919876543210"
                                title="Call Us"
                                style={{
                                    width: 48, height: 48, borderRadius: '50%',
                                    background: '#6366f1',
                                    color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    boxShadow: '0 4px 16px rgba(99,102,241,0.45)',
                                    textDecoration: 'none',
                                    animation: 'fabIn 0.2s ease',
                                }}
                            >
                                <MdPhone size={22} />
                            </a>
                            <a
                                href="https://wa.me/919876543210"
                                target="_blank"
                                rel="noopener noreferrer"
                                title="WhatsApp"
                                style={{
                                    width: 48, height: 48, borderRadius: '50%',
                                    background: '#25d366',
                                    color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    boxShadow: '0 4px 16px rgba(37,211,102,0.45)',
                                    textDecoration: 'none',
                                    animation: 'fabIn 0.25s ease',
                                }}
                            >
                                <MdPhone size={22} />
                            </a>
                        </>
                    )}

                    {/* Main FAB */}
                    <button
                        onClick={() => setFabOpen(o => !o)}
                        style={{
                            width: 58, height: 58, borderRadius: '50%',
                            background: 'var(--gradient-primary)',
                            color: '#fff', border: 'none', cursor: 'pointer',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            boxShadow: '0 6px 24px rgba(99,102,241,0.5)',
                            transition: 'transform 0.25s ease, box-shadow 0.25s ease',
                            transform: fabOpen ? 'rotate(135deg)' : 'rotate(0deg)',
                        }}
                        onMouseEnter={e => { e.currentTarget.style.transform = fabOpen ? 'rotate(135deg) scale(1.08)' : 'scale(1.08)'; }}
                        onMouseLeave={e => { e.currentTarget.style.transform = fabOpen ? 'rotate(135deg)' : 'rotate(0deg)'; }}
                        title="Contact Us"
                    >
                        {fabOpen ? <MdClose size={26} /> : <MdPhone size={24} />}
                    </button>
                </div>
            )}

            <style>{`
                @keyframes fabIn {
                    from { opacity: 0; transform: translateY(10px) scale(0.8); }
                    to   { opacity: 1; transform: translateY(0) scale(1); }
                }

                /* ===== Hamburger Button ===== */
                .hamburger-btn {
                    display: none;
                    align-items: center;
                    justify-content: center;
                    width: 40px;
                    height: 40px;
                    border-radius: 8px;
                    border: none;
                    cursor: pointer;
                    background: rgba(255,255,255,0.12);
                    transition: background 0.2s ease;
                    flex-shrink: 0;
                }
                .hamburger-btn:hover {
                    background: rgba(255,255,255,0.2);
                }

                /* ===== Mobile Drawer ===== */
                .mobile-drawer {
                    overflow: hidden;
                    max-height: 0;
                    opacity: 0;
                    transition: max-height 0.38s cubic-bezier(0.4,0,0.2,1), opacity 0.3s ease;
                    background: var(--surface);
                    border-top: 1px solid var(--border);
                }
                .mobile-drawer.open {
                    max-height: 500px;
                    opacity: 1;
                }
                .mobile-drawer-inner {
                    display: flex;
                    flex-direction: column;
                    gap: 0.25rem;
                    padding: 1rem 1.25rem 1.25rem;
                }
                .mobile-nav-link {
                    display: block;
                    padding: 0.65rem 0.75rem;
                    border-radius: 8px;
                    text-decoration: none;
                    font-size: 0.95rem;
                    transition: all 0.2s ease;
                    border-left: 3px solid transparent;
                }
                .mobile-nav-link:hover {
                    background: var(--bg-secondary);
                }

                /* ===== Responsive: show hamburger on mobile ===== */
                @media (max-width: 768px) {
                    .hamburger-btn {
                        display: flex !important;
                    }
                    .nav-links {
                        display: none !important;
                    }
                    .nav-actions {
                        gap: 0.5rem !important;
                    }
                    .nav-inner {
                        padding-top: 0.75rem !important;
                        padding-bottom: 0.75rem !important;
                    }
                }

                /* ===== Fix desktop: hide hamburger ===== */
                @media (min-width: 769px) {
                    .hamburger-btn {
                        display: none !important;
                    }
                    .mobile-drawer {
                        display: none !important;
                    }
                }
            `}</style>
        </div>
    );
}
