import { FaBuilding } from 'react-icons/fa';

export default function Footer() {
    return (
        <footer className="footer" id="footer">
            <div className="container">
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px,1fr))', gap: '2rem', padding: '3rem 0 2rem' }}>
                    {/* Brand */}
                    <div>
                        <div className="footer-logo">
                            <div style={{ width: 36, height: 36, background: 'var(--gradient-primary)', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <FaBuilding size={16} color="#fff" />
                            </div>
                            PG<span style={{ color: 'var(--primary-400)' }}>Manager</span>
                        </div>
                        <p className="footer-desc">
                            Premium PG accommodation for students and working professionals in Bengaluru. Safe, comfortable, and well-managed.
                        </p>
                    </div>

                    {/* Legal */}
                    <div className="footer-col">
                        <h5>Legal</h5>
                        <a href="#" className="footer-link">Privacy Policy</a>
                        <a href="#" className="footer-link">Terms &amp; Conditions</a>
                        <a href="#" className="footer-link">Refund Policy</a>
                        <a href="#" className="footer-link">Cookie Policy</a>
                    </div>

                    {/* Contact Info */}
                    <div className="footer-col">
                        <h5>Contact Info</h5>
                        <p style={{ fontSize: '0.85rem', lineHeight: 1.8, color: 'rgba(255,255,255,0.6)' }}>
                            42, 3rd Cross, Koramangala<br />
                            Bengaluru – 560095<br />
                            Karnataka, India<br /><br />
                            <a href="tel:+919876543210" style={{ color: 'rgba(255,255,255,0.75)', textDecoration: 'none' }}>📞 +91 98765 43210</a><br />
                            <a href="mailto:info@pgmanager.com" style={{ color: 'rgba(255,255,255,0.75)', textDecoration: 'none' }}>📧 info@pgmanager.com</a>
                        </p>
                    </div>
                </div>
            </div>
            <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}>
                <div className="container">
                    <div className="footer-bottom">
                        <span>© 2025 PGManager. All rights reserved.</span>
                        <span>Made with ❤️ for comfortable living</span>
                    </div>
                </div>
            </div>
        </footer>
    );
}
