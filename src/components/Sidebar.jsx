import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
    MdDashboard, MdMeetingRoom, MdBed, MdPeople, MdSupervisorAccount,
    MdBookOnline, MdPayment, MdReport, MdEvent, MdBuild,
    MdSpeakerNotes, MdAssessment, MdHistory, MdNotifications,
    MdPerson, MdSettings, MdLogout, MdClose, MdMenu,
    MdAssignment, MdPersonPin, MdCheckCircle
} from 'react-icons/md';

const adminMenu = [
    { section: 'Overview' },
    { label: 'Dashboard', icon: MdDashboard, path: '/admin/dashboard' },
    { section: 'Management' },
    { label: 'Room Management', icon: MdMeetingRoom, path: '/admin/rooms' },
    { label: 'Bed Management', icon: MdBed, path: '/admin/beds' },
    { label: 'Tenant Management', icon: MdPeople, path: '/admin/tenants' },
    { label: 'Staff Management', icon: MdSupervisorAccount, path: '/admin/staff' },
    { section: 'Operations' },
    { label: 'Booking Management', icon: MdBookOnline, path: '/admin/bookings' },
    { label: 'Payment Management', icon: MdPayment, path: '/admin/payments' },
    { label: 'Complaint Management', icon: MdReport, path: '/admin/complaints' },
    { label: 'Visitor Management', icon: MdPersonPin, path: '/admin/visitors' },
    { label: 'Maintenance', icon: MdBuild, path: '/admin/maintenance' },
    { section: 'Communication' },
    { label: 'Notice Board', icon: MdSpeakerNotes, path: '/admin/notices' },
    { label: 'Notifications', icon: MdNotifications, path: '/admin/notifications' },
    { section: 'Reports & Logs' },
    { label: 'Reports', icon: MdAssessment, path: '/admin/reports' },
    { label: 'Audit Logs', icon: MdHistory, path: '/admin/audit' },
    { section: 'Account' },
    { label: 'Profile', icon: MdPerson, path: '/admin/profile' },
    { label: 'Settings', icon: MdSettings, path: '/admin/settings' },
];

const staffMenu = [
    { section: 'Overview' },
    { label: 'Dashboard', icon: MdDashboard, path: '/staff/dashboard' },
    { section: 'Tasks' },
    { label: 'Complaints', icon: MdAssignment, path: '/staff/complaints' },
    { label: 'Attendance', icon: MdCheckCircle, path: '/staff/attendance' },
    { label: 'Visitor Entry', icon: MdPersonPin, path: '/staff/visitors' },
    { label: 'Maintenance', icon: MdBuild, path: '/staff/maintenance' },
    { section: 'Account' },
    { label: 'Notifications', icon: MdNotifications, path: '/staff/notifications' },
    { label: 'Profile', icon: MdPerson, path: '/staff/profile' },
];

const tenantMenu = [
    { section: 'Overview' },
    { label: 'Dashboard', icon: MdDashboard, path: '/tenant/dashboard' },
    { section: 'My Space' },
    { label: 'My Room', icon: MdMeetingRoom, path: '/tenant/room' },
    { label: 'Payments', icon: MdPayment, path: '/tenant/payments' },
    { section: 'Services' },
    { label: 'Complaint', icon: MdReport, path: '/tenant/complaint' },
    { label: 'Visitor Request', icon: MdPersonPin, path: '/tenant/visitor' },
    { label: 'Notice Board', icon: MdSpeakerNotes, path: '/tenant/notices' },
    { section: 'Account' },
    { label: 'Notifications', icon: MdNotifications, path: '/tenant/notifications' },
    { label: 'Profile', icon: MdPerson, path: '/tenant/profile' },
];

const menuMap = { admin: adminMenu, staff: staffMenu, tenant: tenantMenu };
const roleColors = { admin: '#6366f1', staff: '#10b981', tenant: '#f59e0b' };
const roleLabels = { admin: 'Administrator', staff: 'Staff Member', tenant: 'Tenant' };

export default function Sidebar({ collapsed, setCollapsed, mobileOpen, setMobileOpen }) {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const menu = menuMap[user?.role] || adminMenu;
    const color = roleColors[user?.role] || '#6366f1';

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const sidebarClass = `sidebar${collapsed ? ' collapsed' : ''}${mobileOpen ? ' mobile-open' : ''}`;

    return (
        <>
            {mobileOpen && <div className="sidebar-backdrop" onClick={() => setMobileOpen(false)} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 199 }} />}
            <nav className={sidebarClass}>
                {/* Logo */}
                <div className="sidebar-logo">
                    <div style={{ width: 36, height: 36, borderRadius: 10, background: `linear-gradient(135deg, ${color}, #8b5cf6)`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 800, fontSize: 18, flexShrink: 0 }}>P</div>
                    {!collapsed && <span className="sidebar-logo-text">PG Manager</span>}
                </div>

                {/* Menu Items */}
                <div className="sidebar-nav">
                    {menu.map((item, i) => {
                        if (item.section) {
                            return !collapsed ? (
                                <div key={i} className="sidebar-section-label">{item.section}</div>
                            ) : <div key={i} style={{ height: 8 }} />;
                        }
                        const Icon = item.icon;
                        return (
                            <NavLink
                                key={item.path}
                                to={item.path}
                                className={({ isActive }) => `sidebar-item${isActive ? ' active' : ''}`}
                                onClick={() => setMobileOpen && setMobileOpen(false)}
                                title={collapsed ? item.label : ''}
                            >
                                <Icon size={20} style={{ flexShrink: 0 }} />
                                {!collapsed && <span>{item.label}</span>}
                            </NavLink>
                        );
                    })}
                </div>

                {/* User Footer */}
                <div className="sidebar-footer">
                    {!collapsed && (
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.75rem 0.5rem', marginBottom: '0.5rem' }}>
                            <div className="avatar" style={{ width: 36, height: 36, fontSize: '0.9rem', background: `linear-gradient(135deg, ${color}, #8b5cf6)` }}>{user?.avatar}</div>
                            <div style={{ overflow: 'hidden' }}>
                                <div style={{ fontSize: '0.85rem', fontWeight: 700, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{user?.name}</div>
                                <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>{roleLabels[user?.role]}</div>
                            </div>
                        </div>
                    )}
                    <button className="sidebar-item" onClick={handleLogout} style={{ width: '100%', color: 'var(--danger)' }}>
                        <MdLogout size={20} style={{ flexShrink: 0 }} />
                        {!collapsed && <span>Logout</span>}
                    </button>
                </div>
            </nav>
        </>
    );
}
