import { useState } from 'react';
import DashboardLayout from '../../components/DashboardLayout';
import { useTheme } from '../../context/ThemeContext';
import { useAuth } from '../../context/AuthContext';
import { mockAuditLogs } from '../../data/mockData';
import { MdLogin, MdMeetingRoom, MdPayment, MdReport, MdEdit, MdSave, MdSettings, MdPerson, MdHistory } from 'react-icons/md';
import toast from 'react-hot-toast';

// ── Audit Log icons ──────────────────────────────────────────────────────────
const typeIcon = { Auth: MdLogin, Room: MdMeetingRoom, Payment: MdPayment, Complaint: MdReport };
const typeColor = { Auth: '#6366f1', Room: '#10b981', Payment: '#f59e0b', Complaint: '#ef4444' };

// ── Tab Config ───────────────────────────────────────────────────────────────
const TABS = [
    { key: 'settings', label: 'Settings', icon: MdSettings },
    { key: 'profile', label: 'Profile', icon: MdPerson },
    { key: 'audit', label: 'Audit Log', icon: MdHistory },
];

export default function Settings() {
    const { theme, toggleTheme } = useTheme();
    const { user } = useAuth();
    const [activeTab, setActiveTab] = useState('settings');

    // ── Settings state ───────────────────────────────────────────────────────
    const [settings, setSettings] = useState({
        pgName: 'PG Manager',
        pgPhone: '+91 98765 43210',
        pgEmail: 'admin@pgmanager.com',
        pgAddress: 'Mumbai, Maharashtra, India',
        currency: 'INR',
        rentDueDay: 5,
        lateFinePerDay: 50,
        advanceMonths: 2,
        notifyPayment: true,
        notifyComplaint: true,
        notifyVisitor: true,
        notifyMaintenance: false,
        emailReceipts: true,
        autoAllocate: true,
        allowSelfCheckout: false,
    });

    // ── Profile state ────────────────────────────────────────────────────────
    const [editing, setEditing] = useState(false);
    const [profileForm, setProfileForm] = useState({
        name: user?.name || 'Admin User',
        email: user?.email || 'admin@pgmanager.com',
        phone: user?.phone || '+91 98765 43210',
        address: user?.address || 'Mumbai, Maharashtra',
        bio: 'Managing the PG with care and dedication since 2020.',
    });

    const toggle = (key) => setSettings(s => ({ ...s, [key]: !s[key] }));
    const handleSaveSettings = () => toast.success('Settings saved successfully!');
    const handleSaveProfile = () => { setEditing(false); toast.success('Profile updated!'); };

    const ToggleRow = ({ label, desc, settingKey }) => (
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.85rem 0', borderBottom: '1px solid var(--border)' }}>
            <div>
                <div style={{ fontWeight: 600, fontSize: '0.9rem' }}>{label}</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{desc}</div>
            </div>
            <div className={`toggle-switch ${settings[settingKey] ? 'on' : ''}`} onClick={() => toggle(settingKey)} />
        </div>
    );

    return (
        <DashboardLayout title="Settings">
            <div style={{ maxWidth: 780, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>

                {/* Tab Header */}
                <div className="page-header">
                    <div>
                        <h2 className="page-title">
                            {activeTab === 'settings' && 'System Settings'}
                            {activeTab === 'profile' && 'My Profile'}
                            {activeTab === 'audit' && 'Audit Log'}
                        </h2>
                        <p className="page-subtitle">
                            {activeTab === 'settings' && 'Configure your PG management preferences'}
                            {activeTab === 'profile' && 'View and update your profile information'}
                            {activeTab === 'audit' && 'Track all system activities'}
                        </p>
                    </div>
                    {activeTab === 'settings' && (
                        <button className="btn btn-primary" onClick={handleSaveSettings}>Save All Settings</button>
                    )}
                    {activeTab === 'profile' && (
                        <button className="btn btn-primary" onClick={() => editing ? handleSaveProfile() : setEditing(true)}>
                            {editing ? <><MdSave size={18} />Save Changes</> : <><MdEdit size={18} />Edit Profile</>}
                        </button>
                    )}
                </div>

                {/* Tabs */}
                <div style={{ display: 'flex', gap: '0.25rem', background: 'var(--bg-secondary)', borderRadius: 'var(--radius)', padding: '0.3rem' }}>
                    {TABS.map(tab => {
                        const Icon = tab.icon;
                        return (
                            <button
                                key={tab.key}
                                onClick={() => setActiveTab(tab.key)}
                                style={{
                                    flex: 1,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    gap: '0.45rem',
                                    padding: '0.6rem 1rem',
                                    borderRadius: 'calc(var(--radius) - 2px)',
                                    border: 'none',
                                    cursor: 'pointer',
                                    fontWeight: 600,
                                    fontSize: '0.875rem',
                                    transition: 'all 0.2s',
                                    background: activeTab === tab.key ? 'var(--surface)' : 'transparent',
                                    color: activeTab === tab.key ? 'var(--primary-500)' : 'var(--text-muted)',
                                    boxShadow: activeTab === tab.key ? 'var(--shadow-sm)' : 'none',
                                }}
                            >
                                <Icon size={17} />
                                {tab.label}
                            </button>
                        );
                    })}
                </div>

                {/* ── SETTINGS TAB ── */}
                {activeTab === 'settings' && (
                    <>
                        {/* PG Info */}
                        <div className="card" style={{ padding: '1.75rem' }}>
                            <h4 style={{ marginBottom: '1.5rem' }}>🏠 PG Information</h4>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                                {[
                                    { label: 'PG Name', key: 'pgName' },
                                    { label: 'Phone', key: 'pgPhone' },
                                    { label: 'Email', key: 'pgEmail' },
                                    { label: 'Address', key: 'pgAddress' },
                                ].map(f => (
                                    <div key={f.key} className="form-group">
                                        <label className="form-label">{f.label}</label>
                                        <input className="form-control" value={settings[f.key]} onChange={e => setSettings({ ...settings, [f.key]: e.target.value })} />
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Financial Settings */}
                        <div className="card" style={{ padding: '1.75rem' }}>
                            <h4 style={{ marginBottom: '1.5rem' }}>💰 Financial Settings</h4>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem' }}>
                                <div className="form-group">
                                    <label className="form-label">Currency</label>
                                    <select className="form-control" value={settings.currency} onChange={e => setSettings({ ...settings, currency: e.target.value })}>
                                        <option value="INR">₹ INR</option><option value="USD">$ USD</option>
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label className="form-label">Rent Due Day</label>
                                    <input type="number" className="form-control" min={1} max={28} value={settings.rentDueDay} onChange={e => setSettings({ ...settings, rentDueDay: +e.target.value })} />
                                </div>
                                <div className="form-group">
                                    <label className="form-label">Late Fine/Day (₹)</label>
                                    <input type="number" className="form-control" value={settings.lateFinePerDay} onChange={e => setSettings({ ...settings, lateFinePerDay: +e.target.value })} />
                                </div>
                                <div className="form-group">
                                    <label className="form-label">Advance Months</label>
                                    <input type="number" className="form-control" min={0} max={6} value={settings.advanceMonths} onChange={e => setSettings({ ...settings, advanceMonths: +e.target.value })} />
                                </div>
                            </div>
                        </div>

                        {/* Notifications */}
                        <div className="card" style={{ padding: '1.75rem' }}>
                            <h4 style={{ marginBottom: '1rem' }}>🔔 Notification Settings</h4>
                            <ToggleRow label="Payment Reminders" desc="Send notifications for pending payments" settingKey="notifyPayment" />
                            <ToggleRow label="Complaint Alerts" desc="Notify on new complaints" settingKey="notifyComplaint" />
                            <ToggleRow label="Visitor Alerts" desc="Get alerts for visitor approvals" settingKey="notifyVisitor" />
                            <ToggleRow label="Maintenance Updates" desc="Receive maintenance request updates" settingKey="notifyMaintenance" />
                            <ToggleRow label="Email Receipts" desc="Auto-send payment receipts via email" settingKey="emailReceipts" />
                        </div>

                        {/* System */}
                        <div className="card" style={{ padding: '1.75rem' }}>
                            <h4 style={{ marginBottom: '1rem' }}>⚙️ System Preferences</h4>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.85rem 0', borderBottom: '1px solid var(--border)' }}>
                                <div>
                                    <div style={{ fontWeight: 600, fontSize: '0.9rem' }}>Dark Mode</div>
                                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Toggle between light and dark theme</div>
                                </div>
                                <div className={`toggle-switch ${theme === 'dark' ? 'on' : ''}`} onClick={toggleTheme} />
                            </div>
                            <ToggleRow label="Smart Room Allocation" desc="Auto-assign beds when adding a tenant" settingKey="autoAllocate" />
                            <ToggleRow label="Allow Self Checkout" desc="Tenants can initiate their own checkout" settingKey="allowSelfCheckout" />
                        </div>
                    </>
                )}

                {/* ── PROFILE TAB ── */}
                {activeTab === 'profile' && (
                    <>
                        {/* Profile Card */}
                        <div className="card" style={{ padding: '2rem', textAlign: 'center' }}>
                            <div className="avatar" style={{ width: 88, height: 88, fontSize: '2rem', margin: '0 auto 1rem', background: 'var(--gradient-primary)' }}>{(user?.name?.[0] || 'A')}</div>
                            <h3>{profileForm.name}</h3>
                            <span className="badge badge-primary" style={{ marginTop: '0.4rem', textTransform: 'capitalize' }}>{user?.role || 'Admin'}</span>
                        </div>

                        {/* Info Form */}
                        <div className="card" style={{ padding: '2rem' }}>
                            <h4 style={{ marginBottom: '1.5rem' }}>Personal Information</h4>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }}>
                                {[
                                    { label: 'Full Name', key: 'name', placeholder: 'Your name' },
                                    { label: 'Email', key: 'email', placeholder: 'your@email.com', type: 'email' },
                                    { label: 'Phone', key: 'phone', placeholder: '+91 ...' },
                                    { label: 'Address', key: 'address', placeholder: 'Your address' },
                                ].map(f => (
                                    <div key={f.key} className="form-group">
                                        <label className="form-label">{f.label}</label>
                                        <input
                                            type={f.type || 'text'}
                                            className="form-control"
                                            value={profileForm[f.key]}
                                            onChange={e => setProfileForm({ ...profileForm, [f.key]: e.target.value })}
                                            disabled={!editing}
                                            placeholder={f.placeholder}
                                            style={{ cursor: editing ? 'text' : 'default' }}
                                        />
                                    </div>
                                ))}
                            </div>
                            <div className="form-group" style={{ marginTop: '1rem' }}>
                                <label className="form-label">Bio</label>
                                <textarea
                                    className="form-control"
                                    rows={3}
                                    value={profileForm.bio}
                                    onChange={e => setProfileForm({ ...profileForm, bio: e.target.value })}
                                    disabled={!editing}
                                    style={{ cursor: editing ? 'text' : 'default' }}
                                />
                            </div>
                        </div>

                        {/* Change Password */}
                        <div className="card" style={{ padding: '2rem' }}>
                            <h4 style={{ marginBottom: '1.25rem' }}>Change Password</h4>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: 380 }}>
                                {['Current Password', 'New Password', 'Confirm Password'].map(lbl => (
                                    <div key={lbl} className="form-group">
                                        <label className="form-label">{lbl}</label>
                                        <input type="password" className="form-control" placeholder="••••••••" />
                                    </div>
                                ))}
                                <button className="btn btn-primary" style={{ width: 'fit-content' }} onClick={() => toast.success('Password changed!')}>Update Password</button>
                            </div>
                        </div>
                    </>
                )}

                {/* ── AUDIT LOG TAB ── */}
                {activeTab === 'audit' && (
                    <div className="rounded-table-wrap overflow-x-auto">
                        <table className="data-table">
                            <thead><tr><th>Log ID</th><th>Type</th><th>Action</th><th>User</th><th>Details</th><th>Timestamp</th></tr></thead>
                            <tbody>
                                {mockAuditLogs.map(l => {
                                    const Icon = typeIcon[l.type] || MdLogin;
                                    const color = typeColor[l.type] || '#6366f1';
                                    return (
                                        <tr key={l.id}>
                                            <td><strong>{l.id}</strong></td>
                                            <td>
                                                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                                                    <div style={{ width: 28, height: 28, borderRadius: 6, background: `${color}18`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                        <Icon size={15} color={color} />
                                                    </div>
                                                    <span className="badge" style={{ background: `${color}18`, color }}>{l.type}</span>
                                                </div>
                                            </td>
                                            <td><strong>{l.action}</strong></td>
                                            <td>{l.user}</td>
                                            <td style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', maxWidth: 260 }}>{l.details}</td>
                                            <td style={{ fontSize: '0.8rem', color: 'var(--text-muted)', whiteSpace: 'nowrap' }}>{l.timestamp}</td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </DashboardLayout>
    );
}
