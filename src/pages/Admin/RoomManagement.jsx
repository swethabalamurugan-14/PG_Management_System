import { useState } from 'react';
import DashboardLayout from '../../components/DashboardLayout';
import Modal, { ModalBody, ModalFooter } from '../../components/Modal';
import ConfirmDialog from '../../components/ConfirmDialog';
import { mockRooms } from '../../data/mockData';
import { MdAdd, MdEdit, MdDelete, MdSearch, MdMeetingRoom, MdBed, MdPerson } from 'react-icons/md';
import toast from 'react-hot-toast';

const statusColor = { Available: 'badge-success', Occupied: 'badge-danger', Partial: 'badge-warning', Full: 'badge-danger' };

export default function RoomManagement() {
    const [rooms, setRooms] = useState(mockRooms);
    const [search, setSearch] = useState('');
    const [filterType, setFilterType] = useState('All');
    const [filterStatus, setFilterStatus] = useState('All');
    const [modal, setModal] = useState(false);
    const [editRoom, setEditRoom] = useState(null);
    const [deleteId, setDeleteId] = useState(null);
    const [form, setForm] = useState({ number: '', floor: '', type: 'Single', capacity: 1, rent: '', facilities: '' });
    const [selectedRoom, setSelectedRoom] = useState(null);

    const filtered = rooms.filter(r => {
        const matchSearch = r.number.includes(search) || r.floor.toLowerCase().includes(search.toLowerCase());
        const matchType = filterType === 'All' || r.type === filterType;
        const matchStatus = filterStatus === 'All' || r.status === filterStatus;
        return matchSearch && matchType && matchStatus;
    });

    const openAdd = () => { setEditRoom(null); setForm({ number: '', floor: '', type: 'Single', capacity: 1, rent: '', facilities: '' }); setModal(true); };
    const openEdit = (r) => { setEditRoom(r); setForm({ number: r.number, floor: r.floor, type: r.type, capacity: r.capacity, rent: r.rent, facilities: r.facilities.join(', ') }); setModal(true); };

    const handleSave = () => {
        if (!form.number || !form.rent) { toast.error('Room number and rent are required'); return; }
        if (editRoom) {
            setRooms(rooms.map(r => r.id === editRoom.id ? { ...r, ...form, facilities: form.facilities.split(',').map(s => s.trim()) } : r));
            toast.success('Room updated successfully');
        } else {
            const newRoom = { id: `R${form.number}`, ...form, status: 'Available', beds: Array.from({ length: +form.capacity }, (_, i) => ({ id: `B${form.number}-${i + 1}`, status: 'Available', tenant: null })), images: [], facilities: form.facilities.split(',').map(s => s.trim()) };
            setRooms([...rooms, newRoom]);
            toast.success('Room added successfully');
        }
        setModal(false);
    };

    const handleDelete = () => {
        setRooms(rooms.filter(r => r.id !== deleteId));
        toast.success('Room deleted');
        setDeleteId(null);
    };

    // Bed Management derived data
    const allBeds = rooms.flatMap(r => r.beds.map(b => ({ ...b, roomNumber: r.number, floor: r.floor, type: r.type })));
    const occupiedBeds = allBeds.filter(b => b.status === 'Occupied').length;
    const availableBeds = allBeds.filter(b => b.status === 'Available').length;

    return (
        <DashboardLayout title="Room Management">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                {/* Page Header */}
                <div className="page-header">
                    <div>
                        <h2 className="page-title">Room Management</h2>
                        <p className="page-subtitle">{rooms.length} total rooms</p>
                    </div>
                    <button className="btn btn-primary" onClick={openAdd}><MdAdd size={18} />Add Room</button>
                </div>

                {/* Summary — Rooms + Beds */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px,1fr))', gap: '1rem' }}>
                    {[
                        { label: 'Total Rooms', val: rooms.length, color: '#6366f1', icon: MdMeetingRoom },
                        { label: 'Available Rooms', val: rooms.filter(r => r.status === 'Available').length, color: '#10b981', icon: MdMeetingRoom },
                        { label: 'Occupied Beds', val: occupiedBeds, color: '#ef4444', icon: MdBed },
                        { label: 'Total Beds', val: allBeds.length, color: '#8b5cf6', icon: MdBed },
                    ].map(s => {
                        const Icon = s.icon;
                        return (
                            <div key={s.label} className="card" style={{ padding: '1rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                <div style={{ width: 40, height: 40, borderRadius: 'var(--radius)', background: `${s.color}18`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <Icon size={20} color={s.color} />
                                </div>
                                <div>
                                    <div style={{ fontSize: '1.5rem', fontWeight: 800, color: s.color }}>{s.val}</div>
                                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{s.label}</div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Filters */}
                <div className="card" style={{ padding: '1rem 1.5rem' }}>
                    <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center' }}>
                        <div className="search-bar">
                            <MdSearch size={18} /><input placeholder="Search room..." value={search} onChange={e => setSearch(e.target.value)} />
                        </div>
                        <select className="form-control" style={{ width: 140 }} value={filterType} onChange={e => setFilterType(e.target.value)}>
                            <option>All</option><option>Single</option><option>Double</option><option>Triple</option>
                        </select>
                        <select className="form-control" style={{ width: 140 }} value={filterStatus} onChange={e => setFilterStatus(e.target.value)}>
                            <option>All</option><option>Available</option><option>Occupied</option><option>Partial</option>
                        </select>
                    </div>
                </div>

                {/* Table */}
                <div className="rounded-table-wrap overflow-x-auto">
                    <table className="data-table">
                        <thead>
                            <tr>
                                <th>Room No.</th><th>Floor</th><th>Type</th><th>Capacity</th>
                                <th>Rent/Month</th><th>Available Beds</th><th>Status</th><th>Facilities</th><th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filtered.length === 0 ? (
                                <tr><td colSpan={9} style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-muted)' }}>No rooms found</td></tr>
                            ) : filtered.map(r => (
                                <tr key={r.id}>
                                    <td><strong>#{r.number}</strong></td>
                                    <td>{r.floor}</td>
                                    <td><span className="badge badge-primary">{r.type}</span></td>
                                    <td>{r.capacity}</td>
                                    <td>₹{r.rent.toLocaleString()}</td>
                                    <td>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                                            <MdBed size={16} color="var(--text-muted)" />
                                            {r.beds.filter(b => b.status === 'Available').length}/{r.capacity}
                                        </div>
                                    </td>
                                    <td><span className={`badge ${statusColor[r.status] || 'badge-muted'}`}>{r.status}</span></td>
                                    <td><div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.3rem' }}>{r.facilities.slice(0, 2).map(f => <span key={f} style={{ fontSize: '0.72rem', background: 'var(--bg-secondary)', padding: '2px 8px', borderRadius: 20 }}>{f}</span>)}{r.facilities.length > 2 && <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>+{r.facilities.length - 2}</span>}</div></td>
                                    <td>
                                        <div style={{ display: 'flex', gap: '0.4rem' }}>
                                            <button className="btn btn-icon btn-ghost" onClick={() => openEdit(r)} title="Edit"><MdEdit size={18} color="var(--primary-500)" /></button>
                                            <button className="btn btn-icon btn-ghost" onClick={() => setDeleteId(r.id)} title="Delete"><MdDelete size={18} color="var(--danger)" /></button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* ─── Bed Management Section ─── */}
                <div style={{ marginTop: '1rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '1.25rem' }}>
                        <div style={{ width: 36, height: 36, borderRadius: 'var(--radius)', background: 'var(--primary-100, #ede9fe)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <MdBed size={20} color="var(--primary-500)" />
                        </div>
                        <div>
                            <h4 style={{ margin: 0, fontSize: '1.05rem', fontWeight: 700 }}>Bed Management</h4>
                            <p style={{ margin: 0, fontSize: '0.78rem', color: 'var(--text-muted)' }}>Track bed occupancy across all rooms</p>
                        </div>
                    </div>

                    {/* Bed Summary */}
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px,1fr))', gap: '1rem', marginBottom: '1.25rem' }}>
                        {[
                            { label: 'Total Beds', val: allBeds.length, color: '#6366f1' },
                            { label: 'Occupied Beds', val: occupiedBeds, color: '#ef4444' },
                            { label: 'Available Beds', val: availableBeds, color: '#10b981' },
                        ].map(s => (
                            <div key={s.label} className="card" style={{ padding: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                <div style={{ width: 44, height: 44, borderRadius: 'var(--radius)', background: `${s.color}18`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <MdBed size={22} color={s.color} />
                                </div>
                                <div>
                                    <div style={{ fontSize: '1.5rem', fontWeight: 800 }}>{s.val}</div>
                                    <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>{s.label}</div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Room Selector */}
                    <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', marginBottom: '1.25rem' }}>
                        <button className={`btn btn-sm ${!selectedRoom ? 'btn-primary' : 'btn-ghost'}`} onClick={() => setSelectedRoom(null)}>All Rooms</button>
                        {rooms.map(r => (
                            <button key={r.id} className={`btn btn-sm ${selectedRoom === r.id ? 'btn-primary' : 'btn-ghost'}`} onClick={() => setSelectedRoom(r.id)}>Room {r.number}</button>
                        ))}
                    </div>

                    {/* Bed Cards per Room */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginBottom: '1.5rem' }}>
                        {rooms.filter(r => !selectedRoom || r.id === selectedRoom).map(room => (
                            <div key={room.id} className="card" style={{ padding: '1.5rem' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
                                    <div>
                                        <h4>Room {room.number} — {room.type} Room</h4>
                                        <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', margin: 0 }}>{room.floor} Floor • Capacity: {room.capacity} • ₹{room.rent}/mo</p>
                                    </div>
                                    <span className={`badge ${room.status === 'Available' ? 'badge-success' : room.status === 'Occupied' ? 'badge-danger' : 'badge-warning'}`}>{room.status}</span>
                                </div>
                                <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                                    {room.beds.map(bed => (
                                        <div key={bed.id} style={{ flex: '1 1 160px', minWidth: 140, padding: '1rem', borderRadius: 'var(--radius)', border: `2px solid ${bed.status === 'Available' ? 'var(--success)' : 'var(--danger)'}`, background: bed.status === 'Available' ? 'var(--success-light)' : 'var(--danger-light)', textAlign: 'center' }}>
                                            <MdBed size={28} color={bed.status === 'Available' ? 'var(--success)' : 'var(--danger)'} />
                                            <div style={{ fontWeight: 700, fontSize: '0.875rem', marginTop: '0.5rem' }}>Bed {bed.id.split('-').pop()}</div>
                                            <span className={`badge ${bed.status === 'Available' ? 'badge-success' : 'badge-danger'}`} style={{ marginTop: '0.35rem' }}>{bed.status}</span>
                                            {bed.tenant && <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: '0.35rem' }}>Tenant: {bed.tenant}</div>}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Bed Table */}
                    <div className="rounded-table-wrap overflow-x-auto">
                        <table className="data-table">
                            <thead><tr><th>Bed ID</th><th>Room No.</th><th>Floor</th><th>Room Type</th><th>Status</th><th>Occupied By</th></tr></thead>
                            <tbody>
                                {allBeds.filter(b => !selectedRoom || rooms.find(r => r.id === selectedRoom)?.beds.some(rb => rb.id === b.id)).map(b => (
                                    <tr key={b.id}>
                                        <td><strong>{b.id}</strong></td>
                                        <td>Room {b.roomNumber}</td>
                                        <td>{b.floor}</td>
                                        <td><span className="badge badge-primary">{b.type}</span></td>
                                        <td><span className={`badge ${b.status === 'Available' ? 'badge-success' : 'badge-danger'}`}>{b.status}</span></td>
                                        <td>{b.tenant ? <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}><MdPerson size={16} />{b.tenant}</div> : <span style={{ color: 'var(--text-muted)' }}>—</span>}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* Add/Edit Modal */}
            <Modal open={modal} onClose={() => setModal(false)} title={editRoom ? 'Edit Room' : 'Add New Room'}>
                <ModalBody>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                            <div className="form-group"><label className="form-label">Room Number *</label><input className="form-control" placeholder="e.g. 101" value={form.number} onChange={e => setForm({ ...form, number: e.target.value })} /></div>
                            <div className="form-group"><label className="form-label">Floor</label><input className="form-control" placeholder="e.g. 1st" value={form.floor} onChange={e => setForm({ ...form, floor: e.target.value })} /></div>
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                            <div className="form-group"><label className="form-label">Room Type</label>
                                <select className="form-control" value={form.type} onChange={e => setForm({ ...form, type: e.target.value })}><option>Single</option><option>Double</option><option>Triple</option></select>
                            </div>
                            <div className="form-group"><label className="form-label">Capacity</label><input type="number" className="form-control" min={1} max={6} value={form.capacity} onChange={e => setForm({ ...form, capacity: +e.target.value })} /></div>
                        </div>
                        <div className="form-group"><label className="form-label">Monthly Rent (₹) *</label><input type="number" className="form-control" placeholder="e.g. 8000" value={form.rent} onChange={e => setForm({ ...form, rent: e.target.value })} /></div>
                        <div className="form-group"><label className="form-label">Facilities (comma-separated)</label><input className="form-control" placeholder="Wi-Fi, AC, Attached Bath" value={form.facilities} onChange={e => setForm({ ...form, facilities: e.target.value })} /></div>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <button className="btn btn-ghost btn-sm" onClick={() => setModal(false)}>Cancel</button>
                    <button className="btn btn-primary btn-sm" onClick={handleSave}>{editRoom ? 'Update' : 'Add Room'}</button>
                </ModalFooter>
            </Modal>

            <ConfirmDialog open={!!deleteId} onClose={() => setDeleteId(null)} onConfirm={handleDelete} title="Delete Room" message="Are you sure you want to delete this room? This action cannot be undone." />
        </DashboardLayout>
    );
}
