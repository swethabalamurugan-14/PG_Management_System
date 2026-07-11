import { useState } from 'react';
import DashboardLayout from '../../components/DashboardLayout';
import { useAuth } from '../../context/AuthContext';
import toast from 'react-hot-toast';
import { MdEdit, MdSave } from 'react-icons/md';

export default function Profile() {
    const { user } = useAuth();
    const [editing, setEditing] = useState(false);
    const [form, setForm] = useState({
        name: user?.name || 'Admin User',
        email: user?.email || 'admin@pgmanager.com',
        phone: user?.phone || '+91 98765 43210',
        address: user?.address || 'Mumbai, Maharashtra',
        bio: 'Managing the PG with care and dedication since 2020.',
    });

    const handleSave = () => { setEditing(false); toast.success('Profile updated!'); };

    return (
        <DashboardLayout title="Profile">
            <div style={{ maxWidth: 700, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <div className="page-header">
                    <div><h2 className="page-title">My Profile</h2></div>
                    <button className="btn btn-primary" onClick={() => editing ? handleSave() : setEditing(true)}>
                        {editing ? <><MdSave size={18} />Save Changes</> : <><MdEdit size={18} />Edit Profile</>}
                    </button>
                </div>

                {/* Profile Card */}
                <div className="card" style={{ padding: '2rem', textAlign: 'center' }}>
                    <div className="avatar" style={{ width: 88, height: 88, fontSize: '2rem', margin: '0 auto 1rem', background: 'var(--gradient-primary)' }}>{(user?.name?.[0] || 'A')}</div>
                    <h3>{form.name}</h3>
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
                                    value={form[f.key]}
                                    onChange={e => setForm({ ...form, [f.key]: e.target.value })}
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
                            value={form.bio}
                            onChange={e => setForm({ ...form, bio: e.target.value })}
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
            </div>
        </DashboardLayout>
    );
}
