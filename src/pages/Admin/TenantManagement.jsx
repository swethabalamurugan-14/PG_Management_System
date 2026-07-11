import { useState } from 'react';
import DashboardLayout from '../../components/DashboardLayout';
import Modal, { ModalBody, ModalFooter } from '../../components/Modal';
import ConfirmDialog from '../../components/ConfirmDialog';
import { mockTenants, mockRooms } from '../../data/mockData';
import { MdAdd, MdEdit, MdDelete, MdSearch, MdPerson, MdQrCode, MdVisibility } from 'react-icons/md';
import QRCode from 'react-qr-code';
import toast from 'react-hot-toast';

export default function TenantManagement() {
    const [tenants, setTenants] = useState(mockTenants);
    const [rooms, setRooms] = useState(mockRooms);
    const [search, setSearch] = useState('');
    const [filterStatus, setFilterStatus] = useState('All');
    const [modal, setModal] = useState(false);
    const [editTenant, setEditTenant] = useState(null);
    const [deleteId, setDeleteId] = useState(null);
    const [viewTenant, setViewTenant] = useState(null);
    const [qrTenant, setQrTenant] = useState(null);
    const [form, setForm] = useState({ name: '', gender: 'Male', age: '', phone: '', email: '', address: '', emergency: '', aadhaar: '', occupation: '', checkin: '', room: '', });

    const availableRooms = rooms.filter(r => r.beds.some(b => b.status === 'Available'));

    const filtered = tenants.filter(t => {
        const matchSearch = t.name.toLowerCase().includes(search.toLowerCase()) || t.phone.includes(search) || t.email.toLowerCase().includes(search.toLowerCase());
        const matchStatus = filterStatus === 'All' || t.status === filterStatus;
        return matchSearch && matchStatus;
    });

    const openAdd = () => { setEditTenant(null); setForm({ name: '', gender: 'Male', age: '', phone: '', email: '', address: '', emergency: '', aadhaar: '', occupation: '', checkin: new Date().toISOString().split('T')[0], room: '' }); setModal(true); };
    const openEdit = (t) => { setEditTenant(t); setForm({ name: t.name, gender: t.gender, age: t.age, phone: t.phone, email: t.email, address: t.address, emergency: t.emergency, aadhaar: t.aadhaar, occupation: t.occupation, checkin: t.checkin, room: t.room }); setModal(true); };

    const handleSave = () => {
        if (!form.name || !form.phone) { toast.error('Name and phone are required'); return; }
        if (editTenant) {
            setTenants(tenants.map(t => t.id === editTenant.id ? { ...t, ...form } : t));
            toast.success('Tenant updated');
        } else {
            // Smart room allocation
            const selectedRoom = rooms.find(r => r.id === form.room);
            if (!selectedRoom) { toast.error('Please select a room'); return; }
            const freeBed = selectedRoom.beds.find(b => b.status === 'Available');
            if (!freeBed) { toast.error('No beds available in this room'); return; }
            const newId = `T${String(tenants.length + 1).padStart(3, '0')}`;
            const newTenant = { id: newId, ...form, bed: freeBed.id, rent: selectedRoom.rent, advance: selectedRoom.rent * 2, photo: null, documents: [], status: 'Active', checkout: null };
            setTenants([...tenants, newTenant]);
            // Update room beds
            const updatedRooms = rooms.map(r => {
                if (r.id === form.room) {
                    const newBeds = r.beds.map(b => b.id === freeBed.id ? { ...b, status: 'Occupied', tenant: newId } : b);
                    const allOccupied = newBeds.every(b => b.status === 'Occupied');
                    return { ...r, beds: newBeds, status: allOccupied ? 'Occupied' : 'Partial' };
                }
                return r;
            });
            setRooms(updatedRooms);
            toast.success(`Tenant added! Auto-assigned to Bed ${freeBed.id}`);
        }
        setModal(false);
    };

    const handleDelete = () => {
        const t = tenants.find(t => t.id === deleteId);
        // Release bed on checkout
        if (t?.bed) {
            setRooms(rooms.map(r => {
                if (r.id === t.room) {
                    const newBeds = r.beds.map(b => b.id === t.bed ? { ...b, status: 'Available', tenant: null } : b);
                    return { ...r, beds: newBeds, status: 'Available' };
                }
                return r;
            }));
        }
        setTenants(tenants.filter(t => t.id !== deleteId));
        toast.success('Tenant checked out and bed released');
        setDeleteId(null);
    };

    return (
        <DashboardLayout title="Tenant Management">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <div className="page-header">
                    <div><h2 className="page-title">Tenant Management</h2><p className="page-subtitle">{tenants.length} registered tenants</p></div>
                    <button className="btn btn-primary" onClick={openAdd}><MdAdd size={18} />Add Tenant</button>
                </div>

                <div className="card" style={{ padding: '1rem 1.5rem' }}>
                    <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center' }}>
                        <div className="search-bar"><MdSearch size={18} /><input placeholder="Search tenant..." value={search} onChange={e => setSearch(e.target.value)} /></div>
                        <select className="form-control" style={{ width: 140 }} value={filterStatus} onChange={e => setFilterStatus(e.target.value)}>
                            <option>All</option><option>Active</option><option>Inactive</option>
                        </select>
                    </div>
                </div>

                <div className="rounded-table-wrap overflow-x-auto">
                    <table className="data-table">
                        <thead><tr><th>Tenant</th><th>Phone</th><th>Room/Bed</th><th>Check-in</th><th>Rent</th><th>Occupation</th><th>Status</th><th>Actions</th></tr></thead>
                        <tbody>
                            {filtered.length === 0 ? (
                                <tr><td colSpan={8} style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-muted)' }}>No tenants found</td></tr>
                            ) : filtered.map(t => (
                                <tr key={t.id}>
                                    <td>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                            <div className="avatar" style={{ width: 36, height: 36, fontSize: '0.875rem' }}>{t.name[0]}</div>
                                            <div>
                                                <div style={{ fontWeight: 600, fontSize: '0.875rem' }}>{t.name}</div>
                                                <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>{t.email}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td>{t.phone}</td>
                                    <td><div style={{ fontWeight: 600 }}>Room {t.room?.replace('R', '')}</div><div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Bed {t.bed}</div></td>
                                    <td>{t.checkin}</td>
                                    <td>₹{t.rent?.toLocaleString()}/mo</td>
                                    <td>{t.occupation}</td>
                                    <td><span className={`badge ${t.status === 'Active' ? 'badge-success' : 'badge-muted'}`}>{t.status}</span></td>
                                    <td>
                                        <div style={{ display: 'flex', gap: '0.3rem' }}>
                                            <button className="btn btn-icon btn-ghost" onClick={() => setViewTenant(t)} title="View"><MdVisibility size={18} color="var(--info)" /></button>
                                            <button className="btn btn-icon btn-ghost" onClick={() => openEdit(t)} title="Edit"><MdEdit size={18} color="var(--primary-500)" /></button>
                                            <button className="btn btn-icon btn-ghost" onClick={() => setQrTenant(t)} title="QR"><MdQrCode size={18} color="var(--success)" /></button>
                                            <button className="btn btn-icon btn-ghost" onClick={() => setDeleteId(t.id)} title="Delete"><MdDelete size={18} color="var(--danger)" /></button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Add/Edit Modal */}
            <Modal open={modal} onClose={() => setModal(false)} title={editTenant ? 'Edit Tenant' : 'Add New Tenant'} size="lg">
                <ModalBody>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                            <div className="form-group"><label className="form-label">Full Name *</label><input className="form-control" placeholder="Full Name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} /></div>
                            <div className="form-group"><label className="form-label">Gender</label><select className="form-control" value={form.gender} onChange={e => setForm({ ...form, gender: e.target.value })}><option>Male</option><option>Female</option><option>Other</option></select></div>
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                            <div className="form-group"><label className="form-label">Phone *</label><input className="form-control" placeholder="Phone" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} /></div>
                            <div className="form-group"><label className="form-label">Age</label><input type="number" className="form-control" placeholder="Age" value={form.age} onChange={e => setForm({ ...form, age: e.target.value })} /></div>
                        </div>
                        <div className="form-group"><label className="form-label">Email</label><input type="email" className="form-control" placeholder="Email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} /></div>
                        <div className="form-group"><label className="form-label">Address</label><textarea className="form-control" rows={2} placeholder="Address" value={form.address} onChange={e => setForm({ ...form, address: e.target.value })} /></div>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                            <div className="form-group"><label className="form-label">Emergency Contact</label><input className="form-control" placeholder="Emergency Phone" value={form.emergency} onChange={e => setForm({ ...form, emergency: e.target.value })} /></div>
                            <div className="form-group"><label className="form-label">Aadhaar Number</label><input className="form-control" placeholder="XXXX-XXXX-XXXX" value={form.aadhaar} onChange={e => setForm({ ...form, aadhaar: e.target.value })} /></div>
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                            <div className="form-group"><label className="form-label">Occupation</label><input className="form-control" placeholder="Occupation" value={form.occupation} onChange={e => setForm({ ...form, occupation: e.target.value })} /></div>
                            <div className="form-group"><label className="form-label">Check-in Date</label><input type="date" className="form-control" value={form.checkin} onChange={e => setForm({ ...form, checkin: e.target.value })} /></div>
                        </div>
                        {!editTenant && (
                            <div className="form-group">
                                <label className="form-label">Assign Room (Smart Allocation)</label>
                                <select className="form-control" value={form.room} onChange={e => setForm({ ...form, room: e.target.value })}>
                                    <option value="">— Select available room —</option>
                                    {availableRooms.map(r => (
                                        <option key={r.id} value={r.id}>Room {r.number} ({r.type}) — {r.beds.filter(b => b.status === 'Available').length} bed(s) free — ₹{r.rent}/mo</option>
                                    ))}
                                </select>
                                <small style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>🤖 System will auto-assign the first available bed</small>
                            </div>
                        )}
                    </div>
                </ModalBody>
                <ModalFooter>
                    <button className="btn btn-ghost btn-sm" onClick={() => setModal(false)}>Cancel</button>
                    <button className="btn btn-primary btn-sm" onClick={handleSave}>{editTenant ? 'Update' : 'Add & Allocate'}</button>
                </ModalFooter>
            </Modal>

            {/* View Profile Modal */}
            <Modal open={!!viewTenant} onClose={() => setViewTenant(null)} title="Tenant Profile" size="lg">
                <ModalBody>
                    {viewTenant && (
                        <div>
                            <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap', marginBottom: '1.5rem', alignItems: 'center' }}>
                                <div className="avatar" style={{ width: 72, height: 72, fontSize: '1.75rem' }}>{viewTenant.name[0]}</div>
                                <div>
                                    <h3 style={{ marginBottom: '0.25rem' }}>{viewTenant.name}</h3>
                                    <p style={{ margin: 0 }}>{viewTenant.occupation}</p>
                                    <span className="badge badge-success" style={{ marginTop: '0.4rem' }}>{viewTenant.status}</span>
                                </div>
                            </div>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                                {[
                                    ['Phone', viewTenant.phone], ['Email', viewTenant.email], ['Gender', viewTenant.gender],
                                    ['Age', viewTenant.age], ['Room', `Room ${viewTenant.room?.replace('R', '')}`],
                                    ['Bed', viewTenant.bed], ['Check-in', viewTenant.checkin], ['Rent', `₹${viewTenant.rent?.toLocaleString()}/mo`],
                                    ['Advance Paid', `₹${viewTenant.advance?.toLocaleString()}`], ['Aadhaar', viewTenant.aadhaar],
                                    ['Emergency', viewTenant.emergency], ['Address', viewTenant.address],
                                ].map(([k, v]) => (
                                    <div key={k} style={{ padding: '0.6rem 0.75rem', background: 'var(--bg-secondary)', borderRadius: 'var(--radius)', fontSize: '0.875rem' }}>
                                        <div style={{ color: 'var(--text-muted)', fontSize: '0.72rem', fontWeight: 600 }}>{k}</div>
                                        <div style={{ fontWeight: 600, marginTop: '0.15rem' }}>{v || '—'}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </ModalBody>
            </Modal>

            {/* QR Modal */}
            <Modal open={!!qrTenant} onClose={() => setQrTenant(null)} title="Tenant QR Code" size="sm">
                <ModalBody>
                    {qrTenant && (
                        <div style={{ textAlign: 'center', padding: '1rem' }}>
                            <QRCode value={`TENANT:${qrTenant.id}|NAME:${qrTenant.name}|ROOM:${qrTenant.room}|BED:${qrTenant.bed}`} size={200} style={{ margin: '0 auto' }} />
                            <p style={{ marginTop: '1rem', fontWeight: 600 }}>{qrTenant.name}</p>
                            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Room {qrTenant.room?.replace('R', '')} • Bed {qrTenant.bed}</p>
                        </div>
                    )}
                </ModalBody>
            </Modal>

            <ConfirmDialog open={!!deleteId} onClose={() => setDeleteId(null)} onConfirm={handleDelete} title="Checkout Tenant" message="Are you sure you want to checkout this tenant? Their bed will be released automatically." />
        </DashboardLayout>
    );
}
