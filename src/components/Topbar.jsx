import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { MdSunny, MdDarkMode, MdNotifications, MdSearch, MdMenu } from 'react-icons/md';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Topbar({ collapsed, setCollapsed, setMobileOpen, title }) {
    const { user } = useAuth();
    const { theme, toggleTheme } = useTheme();
    const [searchVal, setSearchVal] = useState('');
    const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
    const navigate = useNavigate();

    const roleNotifPath = `/${user?.role}/notifications`;

    return (
        <div className="topbar">
            {/* ── Left: hamburger (desktop only) + title ── */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                {/* Hamburger — hidden on mobile via CSS */}
                <button
                    className="btn btn-icon btn-ghost desktop-only-btn"
                    onClick={() => setCollapsed(c => !c)}
                    title="Toggle Sidebar"
                >
                    <MdMenu size={22} />
                </button>
                <div>
                    <h4 style={{ margin: 0, fontSize: '1rem', fontWeight: 700 }}>{title}</h4>
                </div>
            </div>

            {/* ── Right ── */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>

                {/* Search bar — desktop only */}
                <div className="search-bar desktop-search">
                    <MdSearch size={18} />
                    <input
                        placeholder="Search..."
                        value={searchVal}
                        onChange={e => setSearchVal(e.target.value)}
                        style={{ width: 160 }}
                    />
                </div>

                {/* Search icon — mobile only */}
                <button
                    className="btn btn-icon btn-ghost mobile-only-btn"
                    onClick={() => setMobileSearchOpen(o => !o)}
                    title="Search"
                >
                    <MdSearch size={22} />
                </button>

                {/* Theme toggle */}
                <button
                    className="btn btn-icon btn-ghost"
                    onClick={toggleTheme}
                    title={theme === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
                >
                    {theme === 'light' ? <MdDarkMode size={20} /> : <MdSunny size={20} />}
                </button>

                {/* Notifications */}
                <button
                    className="btn btn-icon btn-ghost"
                    style={{ position: 'relative' }}
                    onClick={() => navigate(roleNotifPath)}
                >
                    <MdNotifications size={22} />
                    <span className="notif-badge">3</span>
                </button>

                {/* Avatar */}
                <div
                    className="avatar"
                    style={{ width: 36, height: 36, fontSize: '0.9rem', cursor: 'pointer', background: 'var(--gradient-primary)' }}
                    onClick={() => navigate(`/${user?.role}/profile`)}
                >
                    {user?.avatar}
                </div>
            </div>

            {/* Mobile inline search — expands below topbar */}
            {mobileSearchOpen && (
                <div className="mobile-search-bar">
                    <MdSearch size={18} color="var(--text-muted)" />
                    <input
                        autoFocus
                        placeholder="Search..."
                        value={searchVal}
                        onChange={e => setSearchVal(e.target.value)}
                        style={{
                            flex: 1, border: 'none', background: 'transparent',
                            outline: 'none', color: 'var(--text-primary)', fontSize: '0.9rem',
                        }}
                    />
                </div>
            )}
        </div>
    );
}
