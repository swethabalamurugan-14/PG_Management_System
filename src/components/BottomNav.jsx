import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
    MdDashboard, MdMeetingRoom, MdAssessment, MdSettings,
    MdApps, MdPeople, MdSupervisorAccount, MdBookOnline,
    MdPayment, MdReport, MdPersonPin, MdBuild, MdForum,
    MdClose, MdLogout
} from 'react-icons/md';

/* ── The 5 primary bottom-nav items (admin) ─────────────── */
const primaryItems = [
    { label: 'Dashboard', icon: MdDashboard, path: '/admin/dashboard' },
    { label: 'Rooms', icon: MdMeetingRoom, path: '/admin/rooms' },
    { label: 'Reports', icon: MdAssessment, path: '/admin/reports' },
    { label: 'Settings', icon: MdSettings, path: '/admin/settings' },
];

/* ── Items shown inside the "More" drawer ───────────────── */
const moreItems = [
    { label: 'Tenant Management', icon: MdPeople, path: '/admin/tenants' },
    { label: 'Staff Management', icon: MdSupervisorAccount, path: '/admin/staff' },
    { label: 'Booking Management', icon: MdBookOnline, path: '/admin/bookings' },
    { label: 'Payment Management', icon: MdPayment, path: '/admin/payments' },
    { label: 'Complaint Management', icon: MdReport, path: '/admin/complaints' },
    { label: 'Visitor Management', icon: MdPersonPin, path: '/admin/visitors' },
    { label: 'Maintenance', icon: MdBuild, path: '/admin/maintenance' },
    { label: 'Communication', icon: MdForum, path: '/admin/notices' },
];

export default function BottomNav() {
    const [drawerOpen, setDrawerOpen] = useState(false);
    const { logout } = useAuth();
    const navigate = useNavigate();

    const handleMoreClick = (path) => {
        setDrawerOpen(false);
        navigate(path);
    };

    const handleLogout = () => {
        setDrawerOpen(false);
        logout();
        navigate('/login');
    };

    return (
        <>
            {/* ── Backdrop for "More" drawer ── */}
            {drawerOpen && (
                <div
                    onClick={() => setDrawerOpen(false)}
                    style={{
                        position: 'fixed', inset: 0,
                        background: 'rgba(0,0,0,0.45)',
                        zIndex: 299,
                        backdropFilter: 'blur(2px)',
                    }}
                />
            )}

            {/* ── "More" slide-up drawer ── */}
            <div
                style={{
                    position: 'fixed',
                    bottom: drawerOpen ? 64 : '-100%',
                    left: 0, right: 0,
                    background: 'var(--surface)',
                    borderRadius: '20px 20px 0 0',
                    boxShadow: '0 -8px 32px rgba(0,0,0,0.18)',
                    zIndex: 300,
                    transition: 'bottom 0.32s cubic-bezier(0.4,0,0.2,1)',
                    padding: '0 0 1rem 0',
                    maxHeight: '70vh',
                    overflowY: 'auto',
                }}
            >
                {/* Drawer header */}
                <div style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    padding: '1rem 1.25rem 0.75rem',
                    borderBottom: '1px solid var(--border)',
                }}>
                    <span style={{ fontWeight: 700, fontSize: '0.95rem' }}>More Options</span>
                    <button
                        onClick={() => setDrawerOpen(false)}
                        style={{ background: 'var(--bg-secondary)', border: 'none', borderRadius: '50%', padding: 6, cursor: 'pointer', display: 'flex' }}
                    >
                        <MdClose size={18} color="var(--text-muted)" />
                    </button>
                </div>

                {/* Drawer items — 2-column grid */}
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: '0.5rem',
                    padding: '0.85rem 1rem',
                }}>
                    {moreItems.map(item => {
                        const Icon = item.icon;
                        return (
                            <button
                                key={item.path}
                                onClick={() => handleMoreClick(item.path)}
                                style={{
                                    display: 'flex', alignItems: 'center', gap: '0.6rem',
                                    padding: '0.75rem 0.85rem',
                                    borderRadius: 'var(--radius)',
                                    background: 'var(--bg-secondary)',
                                    border: '1px solid var(--border)',
                                    cursor: 'pointer',
                                    fontSize: '0.82rem', fontWeight: 500,
                                    color: 'var(--text-primary)',
                                    textAlign: 'left',
                                    transition: 'all 0.18s',
                                }}
                            >
                                <Icon size={18} color="var(--primary-500)" />
                                {item.label}
                            </button>
                        );
                    })}
                </div>

                {/* Logout row */}
                <div style={{ padding: '0 1rem' }}>
                    <button
                        onClick={handleLogout}
                        style={{
                            display: 'flex', alignItems: 'center', gap: '0.6rem',
                            width: '100%', padding: '0.75rem 0.85rem',
                            borderRadius: 'var(--radius)',
                            background: 'var(--danger-light)',
                            border: '1px solid var(--danger)',
                            cursor: 'pointer',
                            fontSize: '0.85rem', fontWeight: 600,
                            color: 'var(--danger)',
                        }}
                    >
                        <MdLogout size={18} />Logout
                    </button>
                </div>
            </div>

            {/* ── Fixed Bottom Navigation Bar ── */}
            <nav className="bottom-nav">
                {primaryItems.map(item => {
                    const Icon = item.icon;
                    return (
                        <NavLink
                            key={item.path}
                            to={item.path}
                            className={({ isActive }) => `bottom-nav-item${isActive ? ' active' : ''}`}
                        >
                            <Icon size={22} />
                            <span>{item.label}</span>
                        </NavLink>
                    );
                })}

                {/* More button */}
                <button
                    className={`bottom-nav-item${drawerOpen ? ' active' : ''}`}
                    onClick={() => setDrawerOpen(o => !o)}
                >
                    <MdApps size={22} />
                    <span>More</span>
                </button>
            </nav>
        </>
    );
}
