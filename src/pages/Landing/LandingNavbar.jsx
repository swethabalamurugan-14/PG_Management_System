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

    useEffect(() => {
        const handler = () => setScrolled(window.scrollY > 50);
        window.addEventListener('scroll', handler);
        return () => window.removeEventListener('scroll', handler);
    }, []);

    const textColor = scrolled ? 'var(--text-primary)' : '#fff';

    return (
        <nav className={`landing-nav${scrolled ? ' scrolled' : ''}`}>
            <div className="nav-inner container">
                {/* Logo */}
                <div className="nav-logo" style={{ color: textColor }}>
                    <div style={{ width: 38, height: 38, background: 'var(--gradient-primary)', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', flexShrink: 0 }}>
                        <FaBuilding size={18} />
                    </div>
                    <span style={{ fontWeight: 800, fontSize: '1.2rem' }}>PG<span style={{ color: 'var(--primary-400)' }}>Manager</span></span>
                </div>

                {/* Desktop Links */}
                <div className="nav-links">
                    {links.map(l => (
                        <a
                            key={l}
                            href={`#${l.toLowerCase()}`}
                            className="nav-link"
                            style={{ color: textColor }}
                        >{l}</a>
                    ))}
                </div>

                {/* Actions */}
                <div className="nav-actions">
                    <button className="btn btn-icon" onClick={toggleTheme} style={{ color: textColor, background: 'rgba(255,255,255,0.1)' }}>
                        {theme === 'light' ? <MdDarkMode size={20} /> : <MdSunny size={20} />}
                    </button>
                    <Link to="/login" className="btn btn-primary btn-sm">Login</Link>
                    <button className="btn btn-icon" style={{ color: textColor, display: 'none' }} id="mobile-menu-btn" onClick={() => setMenuOpen(o => !o)}>
                        {menuOpen ? <MdClose size={24} /> : <MdMenu size={24} />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {menuOpen && (
                <div style={{ background: 'var(--surface)', padding: '1rem 1.5rem', borderTop: '1px solid var(--border)', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    {links.map(l => (
                        <a key={l} href={`#${l.toLowerCase()}`} className="nav-link" onClick={() => setMenuOpen(false)} style={{ color: 'var(--text-primary)', display: 'block', padding: '0.6rem 0.5rem' }}>{l}</a>
                    ))}
                    <Link to="/login" className="btn btn-primary btn-sm" style={{ width: 'fit-content', marginTop: '0.5rem' }}>Login</Link>
                </div>
            )}
        </nav>
    );
}
