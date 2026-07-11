import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { MdMenu, MdSunny, MdDarkMode, MdNotifications, MdSearch } from 'react-icons/md';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Topbar({ collapsed, setCollapsed, setMobileOpen, title }) {
    const { user } = useAuth();
    const { theme, toggleTheme } = useTheme();
    const [searchVal, setSearchVal] = useState('');
    const navigate = useNavigate();

    const roleNotifPath = `/${user?.role}/notifications`;

    return (
        <div className="topbar">
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <button
                    className="btn btn-icon btn-ghost"
                    onClick={() => {
                        if (window.innerWidth >= 768) setCollapsed(c => !c);
                        else setMobileOpen && setMobileOpen(o => !o);
                    }}
                    title="Toggle Sidebar"
                >
                    <MdMenu size={22} />
                </button>
                <div>
                    <h4 style={{ margin: 0, fontSize: '1rem', fontWeight: 700 }}>{title}</h4>
                </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                {/* Search (hidden on small screens) */}
                <div className="search-bar" style={{ display: 'flex' }}>
                    <MdSearch size={18} />
                    <input
                        placeholder="Search..."
                        value={searchVal}
                        onChange={e => setSearchVal(e.target.value)}
                        style={{ width: 160 }}
                    />
                </div>

                {/* Theme toggle */}
                <button className="btn btn-icon btn-ghost" onClick={toggleTheme} title={theme === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode'}>
                    {theme === 'light' ? <MdDarkMode size={20} /> : <MdSunny size={20} />}
                </button>

                {/* Notifications */}
                <button className="btn btn-icon btn-ghost" style={{ position: 'relative' }} onClick={() => navigate(roleNotifPath)}>
                    <MdNotifications size={22} />
                    <span className="notif-badge">3</span>
                </button>

                {/* Avatar */}
                <div className="avatar" style={{ width: 36, height: 36, fontSize: '0.9rem', cursor: 'pointer', background: 'var(--gradient-primary)' }} onClick={() => navigate(`/${user?.role}/profile`)}>
                    {user?.avatar}
                </div>
            </div>
        </div>
    );
}
