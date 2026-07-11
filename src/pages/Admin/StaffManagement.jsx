import { useState } from 'react';
import DashboardLayout from '../../components/DashboardLayout';
import Modal, { ModalBody, ModalFooter } from '../../components/Modal';
import ConfirmDialog from '../../components/ConfirmDialog';
import { mockStaff } from '../../data/mockData';
import { MdAdd, MdEdit, MdDelete, MdSearch } from 'react-icons/md';
import toast from 'react-hot-toast';

const roleColors = { Security: '#ef4444', Cleaner: '#10b981', Cook: '#f59e0b', Manager: '#6366f1', Maintenance: '#8b5cf6' };

export default function StaffManagement() {
    const [staff, setStaff] = useState(mockStaff);
    const [search, setSearch] = useState('');
    const [filterRole, setFilterRole] = useState('All');
    const [modal, setModal] = useState(false);
    const [editStaff, setEditStaff] = useState(null);
    const [deleteId, setDeleteId] = useState(null);
    const [form, setForm] = useState({ name: '', role: 'Security', phone: '', email: '', salary: '', shift: 'Morning', attendance: 0 });

    const filtered = staff.filter(s => {
        const matchSearch = s.name.toLowerCase().includes(search.toLowerCase()) || s.phone.includes(search);
        const matchRole = filterRole === 'All' || s.role === filterRole;
        return matchSearch && matchRole;
    });

    const openAdd = () => { setEditStaff(null); setForm({ name: '', role: 'Security', phone: '', email: '', salary: '', shift: 'Morning', attendance: 0 }); setModal(true); };
    const openEdit = (s) => { setEditStaff(s); setForm({ name: s.name, role: s.role, phone: s.phone, email: s.email || '', salary: s.salary, shift: s.shift, attendance: s.attendance }); setModal(true); };

    const handleSave = () => {
        if (!form.name || !form.phone) { toast.error('Name and phone are required'); return; }
        if (editStaff) {
            setStaff(staff.map(s => s.id === editStaff.id ? { ...s, ...form } : s));
            toast.success('Staff updated');
        } else {
            const newId = `S${String(staff.length + 1).padStart(3, '0')}`;
            setStaff([...staff, { id: newId, ...form, photo: null }]);
            toast.success('Staff member added');
        }
        setModal(false);
    };

    return (
        <DashboardLayout title="Staff Management">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <div className="page-header">
                    <div><h2 className="page-title">Staff Management</h2><p className="page-subtitle">{staff.length} staff members</p></div>
                    <button className="btn btn-primary" onClick={openAdd}><MdAdd size={18} />Add Staff</button>
                </div>

                <div className="card" style={{ padding: '1rem 1.5rem' }}>
                    <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center' }}>
                        <div className="search-bar"><MdSearch size={18} /><input placeholder="Search staff..." value={search} onChange={e => setSearch(e.target.value)} /></div>
                        <select className="form-control" style={{ width: 160 }} value={filterRole} onChange={e => setFilterRole(e.target.value)}>
                            <option>All</option><option>Security</option><option>Cleaner</option><option>Cook</option><option>Manager</option><option>Maintenance</option>
                        </select>
                    </div>
                </div>

                {/* Staff Cards */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '1.25rem' }}>
                    {filtered.map(s => (
                        <div key={s.id} className="card" style={{ padding: '1.5rem' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                    <div className="avatar" style={{ width: 48, height: 48, fontSize: '1.1rem', background: `linear-gradient(135deg, ${roleColors[s.role] || '#6366f1'}, #8b5cf6)` }}>{s.name[0]}</div>
                                    <div>
                                        <div style={{ fontWeight: 700 }}>{s.name}</div>
                                        <span className="badge" style={{ background: `${roleColors[s.role]}20`, color: roleColors[s.role], marginTop: '0.2rem' }}>{s.role}</span>
                                    </div>
                                </div>
                                <div style={{ display: 'flex', gap: '0.3rem' }}>
                                    <button className="btn btn-icon btn-ghost" onClick={() => openEdit(s)}><MdEdit size={17} color="var(--primary-500)" /></button>
                                    <button className="btn btn-icon btn-ghost" onClick={() => setDeleteId(s.id)}><MdDelete size={17} color="var(--danger)" /></button>
                                </div>
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
                                <div>📞 {s.phone}</div>
                                <div>💰 Salary: ₹{s.salary?.toLocaleString()}/mo</div>
                                <div>🕐 Shift: {s.shift}</div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.5rem' }}>
                                    <span>Attendance:</span>
                                    <div style={{ flex: 1, height: 6, background: 'var(--bg-tertiary)', borderRadius: 4 }}>
                                        <div style={{ height: '100%', width: `${(s.attendance / 30) * 100}%`, background: 'var(--success)', borderRadius: 4 }} />
                                    </div>
                                    <span style={{ fontWeight: 700, color: 'var(--success)' }}>{s.attendance}/30</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <Modal open={modal} onClose={() => setModal(false)} title={editStaff ? 'Edit Staff' : 'Add Staff Member'}>
                <ModalBody>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                            <div className="form-group"><label className="form-label">Full Name *</label><input className="form-control" placeholder="Name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} /></div>
                            <div className="form-group"><label className="form-label">Role</label>
                                <select className="form-control" value={form.role} onChange={e => setForm({ ...form, role: e.target.value })}><option>Security</option><option>Cleaner</option><option>Cook</option><option>Manager</option><option>Maintenance</option></select>
                            </div>
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                            <div className="form-group"><label className="form-label">Phone *</label><input className="form-control" placeholder="Phone" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} /></div>
                            <div className="form-group"><label className="form-label">Email</label><input type="email" className="form-control" placeholder="Email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} /></div>
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                            <div className="form-group"><label className="form-label">Salary (₹)</label><input type="number" className="form-control" placeholder="Monthly salary" value={form.salary} onChange={e => setForm({ ...form, salary: e.target.value })} /></div>
                            <div className="form-group"><label className="form-label">Shift</label>
                                <select className="form-control" value={form.shift} onChange={e => setForm({ ...form, shift: e.target.value })}><option>Morning</option><option>Day</option><option>Night</option></select>
                            </div>
                        </div>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <button className="btn btn-ghost btn-sm" onClick={() => setModal(false)}>Cancel</button>
                    <button className="btn btn-primary btn-sm" onClick={handleSave}>{editStaff ? 'Update' : 'Add Staff'}</button>
                </ModalFooter>
            </Modal>
            <ConfirmDialog open={!!deleteId} onClose={() => setDeleteId(null)} onConfirm={() => { setStaff(staff.filter(s => s.id !== deleteId)); toast.success('Staff removed'); }} title="Remove Staff" message="Remove this staff member from the system?" />
        </DashboardLayout>
    );
}
