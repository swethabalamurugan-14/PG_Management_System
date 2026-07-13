import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';
import { MdDarkMode, MdSunny, MdMenu, MdClose } from 'react-icons/md';
import { FaBuilding } from 'react-icons/fa';

const links = ['Home', 'About', 'Rooms', 'Facilities', 'Gallery', 'Contact'];

export default function LandingNavbar() {
    const { theme, toggleTheme } = useTheme();
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const [activeSection, setActiveSection] = useState('home');

    useEffect(() => {
        const handler = () => setScrolled(window.scrollY > 50);
        window.addEventListener('scroll', handler);
        return () => window.removeEventListener('scroll', handler);
    }, []);

    useEffect(() => {
        const sectionIds = links.map(l => l.toLowerCase());
        const callback = (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) setActiveSection(entry.target.id);
            });
        };
        const observer = new IntersectionObserver(callback, {
            rootMargin: '-40% 0px -55% 0px',
            threshold: 0,
        });
        sectionIds.forEach(id => {
            const el = document.getElementById(id);
            if (el) observer.observe(el);
        });
        return () => observer.disconnect();
    }, []);

    const handleNavClick = (section) => {
        setActiveSection(section.toLowerCase());
        setMenuOpen(false);
    };

    const textColor = scrolled ? 'var(--text-primary)' : '#fff';

    return (
        <>
            <nav className={`landing-nav${scrolled ? ' scrolled' : ''}`}>
                <div className="nav-inner container">
                    {/* Logo */}
                    <div className="nav-logo" style={{ color: textColor }}>
                        <div style={{ width: 38, height: 38, background: 'var(--gradient-primary)', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', flexShrink: 0 }}>
                            <FaBuilding size={18} />
                        </div>
                    </div>

                    {/* Desktop Links */}
                    <div className="nav-links">
                        {links.map(l => {
                            const isActive = activeSection === l.toLowerCase();
                            return (
                                <a
                                    key={l}
                                    href={`#${l.toLowerCase()}`}
                                    className="nav-link"
                                    onClick={() => handleNavClick(l)}
                                    style={{
                                        color: textColor,
                                        position: 'relative',
                                        fontWeight: isActive ? 700 : 500,
                                    }}
                                >
                                    {l}
                                    {isActive && (
                                        <span style={{
                                            position: 'absolute',
                                            bottom: -4,
                                            left: 0,
                                            right: 0,
                                            height: 2.5,
                                            borderRadius: 99,
                                            background: scrolled ? 'var(--primary-400)' : '#a5b4fc',
                                        }} />
                                    )}
                                </a>
                            );
                        })}
                    </div>

                    {/* Actions */}
                    <div className="nav-actions">
                        <button className="btn btn-icon" onClick={toggleTheme} style={{ color: textColor, background: 'rgba(255,255,255,0.1)' }}>
                            {theme === 'light' ? <MdDarkMode size={20} /> : <MdSunny size={20} />}
                        </button>
                        <Link to="/login" className="btn btn-primary btn-sm">Login</Link>
                        {/* Hamburger — always visible, positioned via CSS at mobile */}
                        <button
                            className="hamburger-btn"
                            onClick={() => setMenuOpen(o => !o)}
                            aria-label="Toggle menu"
                            style={{ color: textColor }}
                        >
                            {menuOpen ? <MdClose size={26} /> : <MdMenu size={26} />}
                        </button>
                    </div>
                </div>

                {/* Mobile Drawer */}
                <div className={`mobile-drawer${menuOpen ? ' open' : ''}`}>
                    <div className="mobile-drawer-inner">
                        {links.map(l => {
                            const isActive = activeSection === l.toLowerCase();
                            return (
                                <a
                                    key={l}
                                    href={`#${l.toLowerCase()}`}
                                    className="mobile-nav-link"
                                    onClick={() => handleNavClick(l)}
                                    style={{
                                        color: isActive ? 'var(--primary-400)' : 'var(--text-primary)',
                                        fontWeight: isActive ? 700 : 500,
                                        borderLeft: isActive ? '3px solid var(--primary-400)' : '3px solid transparent',
                                    }}
                                >
                                    {l}
                                </a>
                            );
                        })}
                        <Link
                            to="/login"
                            className="btn btn-primary btn-sm"
                            style={{ marginTop: '0.5rem', width: 'fit-content' }}
                            onClick={() => setMenuOpen(false)}
                        >
                            Login
                        </Link>
                    </div>
                </div>
            </nav>

            {/* Backdrop */}
            {menuOpen && (
                <div
                    onClick={() => setMenuOpen(false)}
                    style={{
                        position: 'fixed', inset: 0, zIndex: 99,
                        background: 'rgba(0,0,0,0.4)',
                        backdropFilter: 'blur(2px)',
                    }}
                />
            )}
        </>
    );
}
