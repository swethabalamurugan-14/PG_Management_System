import { useState } from 'react';
import DashboardLayout from '../../components/DashboardLayout';
import { useAuth } from '../../context/AuthContext';
import { mockTenants, mockPayments, mockComplaints, mockNotices } from '../../data/mockData';
import Modal, { ModalBody, ModalFooter } from '../../components/Modal';
import { MdAdd, MdBed, MdPayment, MdReport, MdSpeakerNotes, MdQrCode } from 'react-icons/md';
import QRCode from 'react-qr-code';
import toast from 'react-hot-toast';

export default function TenantDashboard() {
    const { user } = useAuth();
    const tenant = mockTenants.find(t => t.id === user?.tenantId) || mockTenants[0];
    const myPayments = mockPayments.filter(p => p.tenantName === tenant?.name);
    const myComplaints = mockComplaints.filter(c => c.tenantName === tenant?.name);
    const [complaintModal, setComplaintModal] = useState(false);
    const [qrModal, setQrModal] = useState(false);
    const [form, setForm] = useState({ type: 'Electrical', description: '' });

    const submitComplaint = () => {
        if (!form.description) { toast.error('Please describe the issue'); return; }
        toast.success('Complaint submitted! We\'ll look into it shortly.');
        setComplaintModal(false);
        setForm({ type: 'Electrical', description: '' });
    };

    const categories = [
        { icon: <MdBed size={22} />, label: 'My Room', val: `Room ${tenant?.room?.replace('R', '')}`, color: '#6366f1' },
        { icon: <MdBed size={22} />, label: 'Bed', val: tenant?.bed, color: '#8b5cf6' },
        { icon: <MdPayment size={22} />, label: 'Monthly Rent', val: `₹${tenant?.rent?.toLocaleString()}`, color: '#10b981' },
        { icon: <MdReport size={22} />, label: 'Open Complaints', val: myComplaints.filter(c => c.status !== 'Resolved').length, color: '#ef4444' },
    ];

    return (
        <DashboardLayout title="My Dashboard">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
                {/* Welcome */}
                <div style={{ background: 'var(--gradient-primary)', borderRadius: 'var(--radius-md)', padding: '1.75rem 2rem', color: '#fff', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
                    <div>
                        <h3 style={{ color: '#fff', marginBottom: '0.3rem' }}>Hello, {tenant?.name || user?.name}! 👋</h3>
                        <p style={{ opacity: 0.85, margin: 0 }}>Welcome to your PG dashboard</p>
                    </div>
                    <button className="btn btn-sm" style={{ background: 'rgba(255,255,255,0.2)', color: '#fff', border: '1.5px solid rgba(255,255,255,0.4)' }} onClick={() => setQrModal(true)}>
                        <MdQrCode size={16} />My QR
                    </button>
                </div>

                {/* Stat Cards */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(170px,1fr))', gap: '1.25rem' }}>
                    {categories.map(c => (
                        <div key={c.label} className="card" style={{ padding: '1.5rem', display: 'flex', gap: '0.85rem', alignItems: 'center' }}>
                            <div style={{ width: 44, height: 44, borderRadius: 'var(--radius)', background: `${c.color}18`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: c.color }}>{c.icon}</div>
                            <div>
                                <div style={{ fontSize: '1.3rem', fontWeight: 800 }}>{c.val}</div>
                                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{c.label}</div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Payment History */}
                <div className="chart-card">
                    <h5 className="chart-title">💳 My Payment History</h5>
                    <div className="rounded-table-wrap overflow-x-auto">
                        <table className="data-table">
                            <thead><tr><th>Month</th><th>Rent</th><th>Electricity</th><th>Water</th><th>Total</th><th>Status</th></tr></thead>
                            <tbody>
                                {myPayments.length === 0 ? (
                                    <tr><td colSpan={6} style={{ textAlign: 'center', color: 'var(--text-muted)' }}>No payments found</td></tr>
                                ) : myPayments.map(p => (
                                    <tr key={p.id}>
                                        <td>{p.month}</td>
                                        <td>₹{p.rent}</td>
                                        <td>₹{p.electricity}</td>
                                        <td>₹{p.water}</td>
                                        <td><strong>₹{p.total}</strong></td>
                                        <td><span className={`badge ${p.status === 'Paid' ? 'badge-success' : 'badge-danger'}`}>{p.status}</span></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Complaints + CTA */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', flexWrap: 'wrap' }}>
                    <div className="chart-card">
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                            <h5 className="chart-title" style={{ margin: 0 }}>📋 My Complaints</h5>
                            <button className="btn btn-sm btn-primary" onClick={() => setComplaintModal(true)}><MdAdd size={16} />New</button>
                        </div>
                        {myComplaints.length === 0 ? (
                            <div style={{ color: 'var(--text-muted)', textAlign: 'center', padding: '2rem' }}>No complaints registered</div>
                        ) : myComplaints.map(c => (
                            <div key={c.id} style={{ padding: '0.75rem', background: 'var(--bg-secondary)', borderRadius: 'var(--radius)', marginBottom: '0.75rem' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <span style={{ fontWeight: 600, fontSize: '0.875rem' }}>{c.type} Issue</span>
                                    <span className={`badge ${c.status === 'Resolved' ? 'badge-success' : 'badge-warning'}`}>{c.status}</span>
                                </div>
                                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>{c.date}</div>
                            </div>
                        ))}
                    </div>

                    {/* Notices */}
                    <div className="chart-card">
                        <h5 className="chart-title">📢 Notice Board</h5>
                        {mockNotices.slice(0, 3).map(n => (
                            <div key={n.id} style={{ padding: '0.75rem', background: 'var(--bg-secondary)', borderRadius: 'var(--radius)', borderLeft: '3px solid var(--primary-500)', marginBottom: '0.75rem' }}>
                                <div style={{ fontWeight: 700, fontSize: '0.875rem' }}>{n.title}</div>
                                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>{n.date}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Complaint Modal */}
            <Modal open={complaintModal} onClose={() => setComplaintModal(false)} title="Raise a Complaint" size="sm">
                <ModalBody>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        <div className="form-group"><label className="form-label">Issue Type</label>
                            <select className="form-control" value={form.type} onChange={e => setForm({ ...form, type: e.target.value })}>
                                <option>Electrical</option><option>Plumbing</option><option>Furniture</option><option>Cleanliness</option><option>Other</option>
                            </select>
                        </div>
                        <div className="form-group"><label className="form-label">Description</label><textarea className="form-control" rows={4} placeholder="Describe your issue..." value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} /></div>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <button className="btn btn-ghost btn-sm" onClick={() => setComplaintModal(false)}>Cancel</button>
                    <button className="btn btn-primary btn-sm" onClick={submitComplaint}>Submit</button>
                </ModalFooter>
            </Modal>

            {/* QR Modal */}
            <Modal open={qrModal} onClose={() => setQrModal(false)} title="My Tenant QR Code" size="sm">
                <ModalBody>
                    <div style={{ textAlign: 'center', padding: '1.5rem 1rem' }}>
                        <QRCode value={`TENANT:${tenant?.id}|NAME:${tenant?.name}|ROOM:${tenant?.room}|BED:${tenant?.bed}`} size={180} style={{ margin: '0 auto' }} />
                        <p style={{ fontWeight: 700, marginTop: '1rem' }}>{tenant?.name}</p>
                        <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', margin: 0 }}>Room {tenant?.room?.replace('R', '')} • Bed {tenant?.bed}</p>
                    </div>
                </ModalBody>
            </Modal>
        </DashboardLayout>
    );
}
