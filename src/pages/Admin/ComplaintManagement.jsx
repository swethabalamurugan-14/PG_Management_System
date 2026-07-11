import { useState } from 'react';
import DashboardLayout from '../../components/DashboardLayout';
import { mockComplaints, mockStaff } from '../../data/mockData';
import { MdReport, MdSearch, MdAssignmentInd } from 'react-icons/md';
import Modal, { ModalBody, ModalFooter } from '../../components/Modal';
import toast from 'react-hot-toast';

const statusColors = { Open: 'badge-danger', 'In Progress': 'badge-warning', Resolved: 'badge-success' };

export default function ComplaintManagement() {
    const [complaints, setComplaints] = useState(mockComplaints);
    const [search, setSearch] = useState('');
    const [filterStatus, setFilterStatus] = useState('All');
    const [assignModal, setAssignModal] = useState(null);
    const [selectedStaff, setSelectedStaff] = useState('');

    const filtered = complaints.filter(c => {
        const matchSearch = c.tenantName.toLowerCase().includes(search.toLowerCase()) || c.type.toLowerCase().includes(search.toLowerCase());
        const matchStatus = filterStatus === 'All' || c.status === filterStatus;
        return matchSearch && matchStatus;
    });

    const updateStatus = (id, status) => {
        setComplaints(complaints.map(c => c.id === id ? { ...c, status, resolvedDate: status === 'Resolved' ? new Date().toISOString().split('T')[0] : c.resolvedDate } : c));
        toast.success(`Complaint marked as ${status}`);
    };

    const handleAssign = () => {
        if (!selectedStaff) { toast.error('Select a staff member'); return; }
        setComplaints(complaints.map(c => c.id === assignModal.id ? { ...c, assignedTo: selectedStaff, status: 'In Progress' } : c));
        toast.success('Staff assigned and status updated to In Progress');
        setAssignModal(null);
        setSelectedStaff('');
    };

    return (
        <DashboardLayout title="Complaint Management">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <div className="page-header">
                    <div><h2 className="page-title">Complaint Management</h2><p className="page-subtitle">{complaints.length} total complaints</p></div>
                </div>

                {/* Summary */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px,1fr))', gap: '1rem' }}>
                    {[
                        { label: 'Open', val: complaints.filter(c => c.status === 'Open').length, color: '#ef4444' },
                        { label: 'In Progress', val: complaints.filter(c => c.status === 'In Progress').length, color: '#f59e0b' },
                        { label: 'Resolved', val: complaints.filter(c => c.status === 'Resolved').length, color: '#10b981' },
                    ].map(s => (
                        <div key={s.label} className="card" style={{ padding: '1.2rem', borderLeft: `4px solid ${s.color}` }}>
                            <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 600 }}>{s.label}</div>
                            <div style={{ fontSize: '1.75rem', fontWeight: 800, color: s.color }}>{s.val}</div>
                        </div>
                    ))}
                </div>

                <div className="card" style={{ padding: '1rem 1.5rem' }}>
                    <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center' }}>
                        <div className="search-bar"><MdSearch size={18} /><input placeholder="Search complaint..." value={search} onChange={e => setSearch(e.target.value)} /></div>
                        <select className="form-control" style={{ width: 160 }} value={filterStatus} onChange={e => setFilterStatus(e.target.value)}>
                            <option>All</option><option>Open</option><option>In Progress</option><option>Resolved</option>
                        </select>
                    </div>
                </div>

                <div className="rounded-table-wrap overflow-x-auto">
                    <table className="data-table">
                        <thead><tr><th>ID</th><th>Tenant</th><th>Type</th><th>Description</th><th>Date</th><th>Assigned To</th><th>Status</th><th>Actions</th></tr></thead>
                        <tbody>
                            {filtered.map(c => (
                                <tr key={c.id}>
                                    <td><strong>{c.id}</strong></td>
                                    <td>{c.tenantName}</td>
                                    <td><span className="badge badge-primary">{c.type}</span></td>
                                    <td style={{ maxWidth: 200 }}><span style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>{c.description}</span></td>
                                    <td>{c.date}</td>
                                    <td>{c.assignedTo || <span style={{ color: 'var(--text-muted)' }}>Unassigned</span>}</td>
                                    <td><span className={`badge ${statusColors[c.status] || 'badge-muted'}`}>{c.status}</span></td>
                                    <td>
                                        <div style={{ display: 'flex', gap: '0.35rem', flexWrap: 'wrap' }}>
                                            {c.status === 'Open' && <button className="btn btn-sm" style={{ background: 'var(--warning-light)', color: 'var(--warning)', fontSize: '0.75rem', borderRadius: 6, padding: '0.3rem 0.6rem' }} onClick={() => setAssignModal(c)}>Assign</button>}
                                            {c.status === 'In Progress' && <button className="btn btn-success btn-sm" style={{ fontSize: '0.75rem' }} onClick={() => updateStatus(c.id, 'Resolved')}>Resolve</button>}
                                            {c.status !== 'Resolved' && <button className="btn btn-ghost btn-sm" style={{ fontSize: '0.75rem' }} onClick={() => updateStatus(c.id, 'Resolved')}>Close</button>}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <Modal open={!!assignModal} onClose={() => setAssignModal(null)} title="Assign Staff to Complaint" size="sm">
                <ModalBody>
                    <p style={{ marginBottom: '1rem', fontSize: '0.875rem' }}>Complaint: <strong>{assignModal?.description}</strong></p>
                    <div className="form-group">
                        <label className="form-label">Select Staff Member</label>
                        <select className="form-control" value={selectedStaff} onChange={e => setSelectedStaff(e.target.value)}>
                            <option value="">— Select Staff —</option>
                            {mockStaff.map(s => <option key={s.id} value={s.id}>{s.name} ({s.role})</option>)}
                        </select>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <button className="btn btn-ghost btn-sm" onClick={() => setAssignModal(null)}>Cancel</button>
                    <button className="btn btn-primary btn-sm" onClick={handleAssign}>Assign</button>
                </ModalFooter>
            </Modal>
        </DashboardLayout>
    );
}
