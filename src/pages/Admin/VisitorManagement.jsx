import { useState } from 'react';
import DashboardLayout from '../../components/DashboardLayout';
import { mockVisitors, mockTenants } from '../../data/mockData';
import { MdAdd, MdSearch, MdCheck, MdClose } from 'react-icons/md';
import Modal, { ModalBody, ModalFooter } from '../../components/Modal';
import toast from 'react-hot-toast';

export default function VisitorManagement() {
    const [visitors, setVisitors] = useState(mockVisitors);
    const [modal, setModal] = useState(false);
    const [search, setSearch] = useState('');
    const [form, setForm] = useState({ name: '', phone: '', tenantId: '', relation: '', purpose: '', checkin: '', checkout: '' });

    const filtered = visitors.filter(v => v.name.toLowerCase().includes(search.toLowerCase()) || v.tenantName.toLowerCase().includes(search.toLowerCase()));

    const approve = (id) => { setVisitors(visitors.map(v => v.id === id ? { ...v, status: 'Approved' } : v)); toast.success('Visitor approved'); };
    const reject = (id) => { setVisitors(visitors.map(v => v.id === id ? { ...v, status: 'Rejected' } : v)); toast.error('Visitor rejected'); };

    const handleAdd = () => {
        if (!form.name || !form.tenantId) { toast.error('Required fields missing'); return; }
        const tenant = mockTenants.find(t => t.id === form.tenantId);
        const newId = `V${String(visitors.length + 1).padStart(3, '0')}`;
        setVisitors([...visitors, { id: newId, ...form, tenantName: tenant?.name || '', status: 'Pending' }]);
        toast.success('Visitor registered');
        setModal(false);
    };

    return (
        <DashboardLayout title="Visitor Management">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <div className="page-header">
                    <div><h2 className="page-title">Visitor Management</h2><p className="page-subtitle">Track all visitor entries</p></div>
                    <button className="btn btn-primary" onClick={() => setModal(true)}><MdAdd size={18} />Register Visitor</button>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(150px,1fr))', gap: '1rem' }}>
                    {[
                        { label: 'Total Visitors', val: visitors.length, color: '#6366f1' },
                        { label: 'Approved', val: visitors.filter(v => v.status === 'Approved').length, color: '#10b981' },
                        { label: 'Pending', val: visitors.filter(v => v.status === 'Pending').length, color: '#f59e0b' },
                        { label: 'Rejected', val: visitors.filter(v => v.status === 'Rejected').length, color: '#ef4444' },
                    ].map(s => (
                        <div key={s.label} className="card" style={{ padding: '1.2rem', borderLeft: `4px solid ${s.color}` }}>
                            <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 600 }}>{s.label}</div>
                            <div style={{ fontSize: '1.75rem', fontWeight: 800, color: s.color }}>{s.val}</div>
                        </div>
                    ))}
                </div>
                <div className="card" style={{ padding: '1rem 1.5rem' }}>
                    <div className="search-bar"><MdSearch size={18} /><input placeholder="Search visitor..." value={search} onChange={e => setSearch(e.target.value)} /></div>
                </div>
                <div className="rounded-table-wrap overflow-x-auto">
                    <table className="data-table">
                        <thead><tr><th>ID</th><th>Visitor Name</th><th>Phone</th><th>Tenant</th><th>Relation</th><th>Purpose</th><th>Check-in</th><th>Check-out</th><th>Status</th><th>Actions</th></tr></thead>
                        <tbody>
                            {filtered.map(v => (
                                <tr key={v.id}>
                                    <td><strong>{v.id}</strong></td>
                                    <td>{v.name}</td>
                                    <td>{v.phone}</td>
                                    <td>{v.tenantName}</td>
                                    <td>{v.relation}</td>
                                    <td>{v.purpose}</td>
                                    <td>{v.checkin}</td>
                                    <td>{v.checkout || '—'}</td>
                                    <td><span className={`badge ${v.status === 'Approved' ? 'badge-success' : v.status === 'Pending' ? 'badge-warning' : 'badge-danger'}`}>{v.status}</span></td>
                                    <td>
                                        {v.status === 'Pending' && (
                                            <div style={{ display: 'flex', gap: '0.3rem' }}>
                                                <button className="btn btn-icon btn-ghost" onClick={() => approve(v.id)} title="Approve"><MdCheck size={18} color="var(--success)" /></button>
                                                <button className="btn btn-icon btn-ghost" onClick={() => reject(v.id)} title="Reject"><MdClose size={18} color="var(--danger)" /></button>
                                            </div>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            <Modal open={modal} onClose={() => setModal(false)} title="Register Visitor">
                <ModalBody>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                            <div className="form-group"><label className="form-label">Visitor Name *</label><input className="form-control" placeholder="Name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} /></div>
                            <div className="form-group"><label className="form-label">Phone</label><input className="form-control" placeholder="Phone" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} /></div>
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                            <div className="form-group"><label className="form-label">Visiting Tenant *</label>
                                <select className="form-control" value={form.tenantId} onChange={e => setForm({ ...form, tenantId: e.target.value })}>
                                    <option value="">— Select Tenant —</option>
                                    {mockTenants.map(t => <option key={t.id} value={t.id}>{t.name}</option>)}
                                </select>
                            </div>
                            <div className="form-group"><label className="form-label">Relation</label><input className="form-control" placeholder="e.g. Brother" value={form.relation} onChange={e => setForm({ ...form, relation: e.target.value })} /></div>
                        </div>
                        <div className="form-group"><label className="form-label">Purpose</label><input className="form-control" placeholder="Purpose of visit" value={form.purpose} onChange={e => setForm({ ...form, purpose: e.target.value })} /></div>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                            <div className="form-group"><label className="form-label">Check-in</label><input type="datetime-local" className="form-control" value={form.checkin} onChange={e => setForm({ ...form, checkin: e.target.value })} /></div>
                            <div className="form-group"><label className="form-label">Check-out</label><input type="datetime-local" className="form-control" value={form.checkout} onChange={e => setForm({ ...form, checkout: e.target.value })} /></div>
                        </div>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <button className="btn btn-ghost btn-sm" onClick={() => setModal(false)}>Cancel</button>
                    <button className="btn btn-primary btn-sm" onClick={handleAdd}>Register</button>
                </ModalFooter>
            </Modal>
        </DashboardLayout>
    );
}
