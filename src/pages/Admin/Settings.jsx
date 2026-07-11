import { useState } from 'react';
import DashboardLayout from '../../components/DashboardLayout';
import { useTheme } from '../../context/ThemeContext';
import toast from 'react-hot-toast';

export default function Settings() {
    const { theme, toggleTheme } = useTheme();
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

    const toggle = (key) => setSettings(s => ({ ...s, [key]: !s[key] }));
    const handleSave = () => toast.success('Settings saved successfully!');

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
            <div style={{ maxWidth: 740, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <div className="page-header">
                    <div><h2 className="page-title">System Settings</h2><p className="page-subtitle">Configure your PG management preferences</p></div>
                    <button className="btn btn-primary" onClick={handleSave}>Save All Settings</button>
                </div>

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
            </div>
        </DashboardLayout>
    );
}
