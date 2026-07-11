import { useState } from 'react';
import DashboardLayout from '../../components/DashboardLayout';
import { mockMaintenance, mockStaff } from '../../data/mockData';
import { MdAdd, MdSearch } from 'react-icons/md';
import Modal, { ModalBody, ModalFooter } from '../../components/Modal';
import toast from 'react-hot-toast';

const priorityColor = { High: 'badge-danger', Medium: 'badge-warning', Low: 'badge-success' };
const statusColor = { Pending: 'badge-warning', Assigned: 'badge-info', Completed: 'badge-success' };

export default function Maintenance() {
    const [items, setItems] = useState(mockMaintenance);
    const [modal, setModal] = useState(false);
    const [search, setSearch] = useState('');
    const [form, setForm] = useState({ type: 'Electrical', description: '', priority: 'Medium' });

    const filtered = items.filter(i => i.description.toLowerCase().includes(search.toLowerCase()) || i.type.toLowerCase().includes(search.toLowerCase()));

    const updateStatus = (id, status) => {
        setItems(items.map(i => i.id === id ? { ...i, status, completedDate: status === 'Completed' ? new Date().toISOString().split('T')[0] : i.completedDate } : i));
        toast.success(`Status updated to ${status}`);
    };

    const handleAdd = () => {
        if (!form.description) { toast.error('Description is required'); return; }
        const newId = `M${String(items.length + 1).padStart(3, '0')}`;
        setItems([...items, { id: newId, ...form, status: 'Pending', assignedTo: null, date: new Date().toISOString().split('T')[0], completedDate: null }]);
        toast.success('Maintenance request added');
        setModal(false);
    };

    return (
        <DashboardLayout title="Maintenance">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <div className="page-header">
                    <div><h2 className="page-title">Maintenance Module</h2><p className="page-subtitle">Manage all maintenance requests</p></div>
                    <button className="btn btn-primary" onClick={() => setModal(true)}><MdAdd size={18} />Add Request</button>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(150px,1fr))', gap: '1rem' }}>
                    {[
                        { label: 'Pending', val: items.filter(i => i.status === 'Pending').length, color: '#f59e0b' },
                        { label: 'Assigned', val: items.filter(i => i.status === 'Assigned').length, color: '#3b82f6' },
                        { label: 'Completed', val: items.filter(i => i.status === 'Completed').length, color: '#10b981' },
                    ].map(s => (
                        <div key={s.label} className="card" style={{ padding: '1.2rem', borderLeft: `4px solid ${s.color}` }}>
                            <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 600 }}>{s.label}</div>
                            <div style={{ fontSize: '1.75rem', fontWeight: 800, color: s.color }}>{s.val}</div>
                        </div>
                    ))}
                </div>
                <div className="card" style={{ padding: '1rem 1.5rem' }}>
                    <div className="search-bar"><MdSearch size={18} /><input placeholder="Search maintenance..." value={search} onChange={e => setSearch(e.target.value)} /></div>
                </div>
                <div className="rounded-table-wrap overflow-x-auto">
                    <table className="data-table">
                        <thead><tr><th>ID</th><th>Type</th><th>Description</th><th>Priority</th><th>Status</th><th>Assigned To</th><th>Date</th><th>Actions</th></tr></thead>
                        <tbody>
                            {filtered.map(i => (
                                <tr key={i.id}>
                                    <td><strong>{i.id}</strong></td>
                                    <td><span className="badge badge-primary">{i.type}</span></td>
                                    <td style={{ maxWidth: 200, fontSize: '0.82rem' }}>{i.description}</td>
                                    <td><span className={`badge ${priorityColor[i.priority]}`}>{i.priority}</span></td>
                                    <td><span className={`badge ${statusColor[i.status]}`}>{i.status}</span></td>
                                    <td>{i.assignedTo || <span style={{ color: 'var(--text-muted)' }}>Unassigned</span>}</td>
                                    <td>{i.date}</td>
                                    <td>
                                        <div style={{ display: 'flex', gap: '0.35rem' }}>
                                            {i.status === 'Pending' && <button className="btn btn-sm btn-ghost" style={{ fontSize: '0.75rem' }} onClick={() => updateStatus(i.id, 'Assigned')}>Assign</button>}
                                            {i.status === 'Assigned' && <button className="btn btn-success btn-sm" style={{ fontSize: '0.75rem' }} onClick={() => updateStatus(i.id, 'Completed')}>Complete</button>}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            <Modal open={modal} onClose={() => setModal(false)} title="Add Maintenance Request" size="sm">
                <ModalBody>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        <div className="form-group"><label className="form-label">Type</label>
                            <select className="form-control" value={form.type} onChange={e => setForm({ ...form, type: e.target.value })}><option>Electrical</option><option>Plumbing</option><option>Furniture</option><option>Cleaning</option><option>Other</option></select>
                        </div>
                        <div className="form-group"><label className="form-label">Description *</label><textarea className="form-control" rows={3} placeholder="Describe the issue..." value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} /></div>
                        <div className="form-group"><label className="form-label">Priority</label>
                            <select className="form-control" value={form.priority} onChange={e => setForm({ ...form, priority: e.target.value })}><option>High</option><option>Medium</option><option>Low</option></select>
                        </div>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <button className="btn btn-ghost btn-sm" onClick={() => setModal(false)}>Cancel</button>
                    <button className="btn btn-primary btn-sm" onClick={handleAdd}>Add Request</button>
                </ModalFooter>
            </Modal>
        </DashboardLayout>
    );
}
