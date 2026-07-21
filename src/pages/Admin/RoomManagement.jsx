import { useState } from 'react';
import DashboardLayout from '../../components/DashboardLayout';
import Modal, { ModalBody, ModalFooter } from '../../components/Modal';
import ConfirmDialog from '../../components/ConfirmDialog';
import { mockRooms } from '../../data/mockData';
import { MdAdd, MdEdit, MdDelete, MdSearch, MdMeetingRoom, MdBed, MdPerson, MdExpandMore, MdExpandLess, MdAssignment } from 'react-icons/md';
import toast from 'react-hot-toast';

const statusColor = { Available: 'badge-success', Occupied: 'badge-danger', Partial: 'badge-warning', Full: 'badge-danger' };

export default function RoomManagement() {
    const [rooms, setRooms] = useState(mockRooms);
    const [search, setSearch] = useState('');
    const [filterType, setFilterType] = useState('All');
    const [filterStatus, setFilterStatus] = useState('All');
    const [filterAC, setFilterAC] = useState('All');
    const [modal, setModal] = useState(false);
    const [editRoom, setEditRoom] = useState(null);
    const [deleteId, setDeleteId] = useState(null);
    const [form, setForm] = useState({ number: '', floor: '', type: 'Single', capacity: 1, rent: '', facilities: '' });

    // Expandable bed row
    const [expandedRoom, setExpandedRoom] = useState(null);

    // Bed management modal state
    const [bedModal, setBedModal] = useState(false);
    const [editBed, setEditBed] = useState(null);
    const [bedForm, setBedForm] = useState({ status: 'Available', tenant: '' });
    const [bedRoomId, setBedRoomId] = useState(null);
    const [deleteBedId, setDeleteBedId] = useState(null);
    const [assignModal, setAssignModal] = useState(false);
    const [assignBed, setAssignBed] = useState(null);
    const [assignTenant, setAssignTenant] = useState('');

    const filtered = rooms.filter(r => {
        const matchSearch = r.number.includes(search) || r.floor.toLowerCase().includes(search.toLowerCase());
        const matchType = filterType === 'All' || r.type === filterType;
        const matchStatus = filterStatus === 'All' || r.status === filterStatus;
        const matchAC = filterAC === 'All'
            || (filterAC === 'AC' && r.facilities.some(f => f.toLowerCase() === 'ac'))
            || (filterAC === 'Non-AC' && !r.facilities.some(f => f.toLowerCase() === 'ac'));
        return matchSearch && matchType && matchStatus && matchAC;
    });

    // Room CRUD
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
        if (expandedRoom === deleteId) setExpandedRoom(null);
    };

    // Toggle bed expansion
    const toggleBeds = (roomId) => {
        setExpandedRoom(prev => prev === roomId ? null : roomId);
    };

    // Bed CRUD helpers
    const openAddBed = (roomId) => {
        setBedRoomId(roomId);
        setEditBed(null);
        setBedForm({ status: 'Available', tenant: '' });
        setBedModal(true);
    };

    const openEditBed = (roomId, bed) => {
        setBedRoomId(roomId);
        setEditBed(bed);
        setBedForm({ status: bed.status, tenant: bed.tenant || '' });
        setBedModal(true);
    };

    const handleSaveBed = () => {
        setRooms(prev => prev.map(r => {
            if (r.id !== bedRoomId) return r;
            let newBeds;
            if (editBed) {
                newBeds = r.beds.map(b => b.id === editBed.id ? { ...b, status: bedForm.status, tenant: bedForm.tenant || null } : b);
                toast.success('Bed updated successfully');
            } else {
                const nextNum = r.beds.length + 1;
                newBeds = [...r.beds, { id: `B${r.number}-${nextNum}`, status: bedForm.status, tenant: bedForm.tenant || null }];
                toast.success('Bed added successfully');
            }
            const occupied = newBeds.filter(b => b.status === 'Occupied').length;
            const newStatus = occupied === 0 ? 'Available' : occupied === newBeds.length ? 'Occupied' : 'Partial';
            return { ...r, beds: newBeds, status: newStatus };
        }));
        setBedModal(false);
    };

    const confirmDeleteBed = (roomId, bedId) => {
        setBedRoomId(roomId);
        setDeleteBedId(bedId);
    };

    const handleDeleteBed = () => {
        setRooms(prev => prev.map(r => {
            if (r.id !== bedRoomId) return r;
            const newBeds = r.beds.filter(b => b.id !== deleteBedId);
            const occupied = newBeds.filter(b => b.status === 'Occupied').length;
            const newStatus = newBeds.length === 0 ? 'Available' : occupied === 0 ? 'Available' : occupied === newBeds.length ? 'Occupied' : 'Partial';
            return { ...r, beds: newBeds, status: newStatus };
        }));
        toast.success('Bed deleted');
        setDeleteBedId(null);
        setBedRoomId(null);
    };

    const openAssign = (roomId, bed) => {
        setBedRoomId(roomId);
        setAssignBed(bed);
        setAssignTenant(bed.tenant || '');
        setAssignModal(true);
    };

    const handleAssign = () => {
        if (!assignTenant.trim()) { toast.error('Enter a tenant ID or name'); return; }
        setRooms(prev => prev.map(r => {
            if (r.id !== bedRoomId) return r;
            const newBeds = r.beds.map(b => b.id === assignBed.id ? { ...b, status: 'Occupied', tenant: assignTenant.trim() } : b);
            const occupied = newBeds.filter(b => b.status === 'Occupied').length;
            const newStatus = occupied === 0 ? 'Available' : occupied === newBeds.length ? 'Occupied' : 'Partial';
            return { ...r, beds: newBeds, status: newStatus };
        }));
        toast.success('Tenant assigned successfully');
        setAssignModal(false);
    };

    // Derived stats
    const allBeds = rooms.flatMap(r => r.beds.map(b => ({ ...b, roomNumber: r.number, floor: r.floor, type: r.type })));
    const occupiedBeds = allBeds.filter(b => b.status === 'Occupied').length;

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

                {/* Summary */}
                <div className="mobile-stats-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px,1fr))', gap: '1rem' }}>
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
                        <select className="form-control" style={{ width: 140 }} value={filterAC} onChange={e => setFilterAC(e.target.value)}>
                            <option value="All">All</option>
                            <option value="AC">AC</option>
                            <option value="Non-AC">Non-AC</option>
                        </select>
                    </div>
                </div>

                {/* Room Table with Inline Bed Management */}
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
                            ) : filtered.map(r => {
                                const availCount = r.beds.filter(b => b.status === 'Available').length;
                                const isExpanded = expandedRoom === r.id;
                                return (
                                    <>
                                        <tr key={r.id}>
                                            <td><strong>#{r.number}</strong></td>
                                            <td>{r.floor}</td>
                                            <td><span className="badge badge-primary">{r.type}</span></td>
                                            <td>{r.capacity}</td>
                                            <td>₹{r.rent.toLocaleString()}</td>
                                            <td>
                                                <button
                                                    onClick={() => toggleBeds(r.id)}
                                                    title="Click to view bed details"
                                                    style={{
                                                        display: 'inline-flex',
                                                        alignItems: 'center',
                                                        gap: '4px',
                                                        padding: '4px 10px',
                                                        borderRadius: 'var(--radius)',
                                                        border: `1.5px solid ${isExpanded ? 'var(--primary-500)' : 'var(--border)'}`,
                                                        background: isExpanded ? 'var(--primary-50, #ede9fe)' : 'transparent',
                                                        color: isExpanded ? 'var(--primary-500)' : 'inherit',
                                                        cursor: 'pointer',
                                                        fontWeight: 600,
                                                        fontSize: '0.85rem',
                                                        transition: 'all 0.2s',
                                                    }}
                                                >
                                                    <MdBed size={16} color={isExpanded ? 'var(--primary-500)' : 'var(--text-muted)'} />
                                                    {availCount}/{r.capacity}
                                                    {isExpanded ? <MdExpandLess size={15} /> : <MdExpandMore size={15} />}
                                                </button>
                                            </td>
                                            <td><span className={`badge ${statusColor[r.status] || 'badge-muted'}`}>{r.status}</span></td>
                                            <td>
                                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.3rem' }}>
                                                    {r.facilities.slice(0, 2).map(f => <span key={f} style={{ fontSize: '0.72rem', background: 'var(--bg-secondary)', padding: '2px 8px', borderRadius: 20 }}>{f}</span>)}
                                                    {r.facilities.length > 2 && <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>+{r.facilities.length - 2}</span>}
                                                </div>
                                            </td>
                                            <td>
                                                <div style={{ display: 'flex', gap: '0.4rem' }}>
                                                    <button className="btn btn-icon btn-ghost" onClick={() => openEdit(r)} title="Edit"><MdEdit size={18} color="var(--primary-500)" /></button>
                                                    <button className="btn btn-icon btn-ghost" onClick={() => setDeleteId(r.id)} title="Delete"><MdDelete size={18} color="var(--danger)" /></button>
                                                </div>
                                            </td>
                                        </tr>

                                        {/* ── Inline Bed Management Panel ── */}
                                        {isExpanded && (
                                            <tr key={`${r.id}-beds`}>
                                                <td colSpan={9} style={{ padding: 0, background: 'var(--bg-secondary, #f8fafc)', borderBottom: '2px solid var(--primary-500)' }}>
                                                    <div style={{ padding: '1.25rem 1.5rem', animation: 'fadeIn 0.2s ease' }}>

                                                        {/* Panel Header */}
                                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                                                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                                                                <div style={{ width: 32, height: 32, borderRadius: 'var(--radius)', background: 'var(--primary-100, #ede9fe)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                                    <MdBed size={18} color="var(--primary-500)" />
                                                                </div>
                                                                <div>
                                                                    <h4 style={{ margin: 0, fontSize: '0.95rem', fontWeight: 700 }}>Bed Management — Room {r.number}</h4>
                                                                    <p style={{ margin: 0, fontSize: '0.75rem', color: 'var(--text-muted)' }}>{r.floor} Floor • {r.type} • ₹{r.rent.toLocaleString()}/mo</p>
                                                                </div>
                                                            </div>
                                                            <button className="btn btn-primary btn-sm" onClick={() => openAddBed(r.id)}>
                                                                <MdAdd size={15} /> Add Bed
                                                            </button>
                                                        </div>

                                                        {/* Bed Cards */}
                                                        <div style={{ display: 'flex', gap: '0.85rem', flexWrap: 'wrap', marginBottom: '1.25rem' }}>
                                                            {r.beds.length === 0 ? (
                                                                <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>No beds in this room. Add one above.</p>
                                                            ) : r.beds.map(bed => (
                                                                <div key={bed.id} style={{
                                                                    flex: '1 1 150px',
                                                                    minWidth: 130,
                                                                    padding: '0.85rem',
                                                                    borderRadius: 'var(--radius)',
                                                                    border: `2px solid ${bed.status === 'Available' ? 'var(--success)' : 'var(--danger)'}`,
                                                                    background: bed.status === 'Available' ? 'var(--success-light, #d1fae5)' : 'var(--danger-light, #fee2e2)',
                                                                    textAlign: 'center',
                                                                }}>
                                                                    <MdBed size={26} color={bed.status === 'Available' ? 'var(--success)' : 'var(--danger)'} />
                                                                    <div style={{ fontWeight: 700, fontSize: '0.82rem', marginTop: '0.4rem' }}>Bed {bed.id.split('-').pop()}</div>
                                                                    <span className={`badge ${bed.status === 'Available' ? 'badge-success' : 'badge-danger'}`} style={{ marginTop: '0.3rem', display: 'inline-block' }}>{bed.status}</span>
                                                                    {bed.tenant && (
                                                                        <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)', marginTop: '0.3rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 2 }}>
                                                                            <MdPerson size={13} />{bed.tenant}
                                                                        </div>
                                                                    )}
                                                                    {/* Bed Actions */}
                                                                    <div style={{ display: 'flex', justifyContent: 'center', gap: '0.3rem', marginTop: '0.5rem' }}>
                                                                        {bed.status === 'Available' && (
                                                                            <button
                                                                                className="btn btn-icon btn-ghost"
                                                                                title="Assign Tenant"
                                                                                onClick={() => openAssign(r.id, bed)}
                                                                                style={{ padding: '3px' }}
                                                                            >
                                                                                <MdAssignment size={15} color="var(--primary-500)" />
                                                                            </button>
                                                                        )}
                                                                        <button className="btn btn-icon btn-ghost" title="Edit Bed" onClick={() => openEditBed(r.id, bed)} style={{ padding: '3px' }}>
                                                                            <MdEdit size={15} color="var(--primary-500)" />
                                                                        </button>
                                                                        <button className="btn btn-icon btn-ghost" title="Delete Bed" onClick={() => confirmDeleteBed(r.id, bed.id)} style={{ padding: '3px' }}>
                                                                            <MdDelete size={15} color="var(--danger)" />
                                                                        </button>
                                                                    </div>
                                                                </div>
                                                            ))}
                                                        </div>

                                                        {/* Bed Details Table */}
                                                        {r.beds.length > 0 && (
                                                            <div className="rounded-table-wrap overflow-x-auto">
                                                                <table className="data-table" style={{ fontSize: '0.82rem' }}>
                                                                    <thead>
                                                                        <tr>
                                                                            <th>Bed No.</th>
                                                                            <th>Bed ID</th>
                                                                            <th>Bed Status</th>
                                                                            <th>Tenant Assigned</th>
                                                                            <th>Bed Details</th>
                                                                            <th>Actions</th>
                                                                        </tr>
                                                                    </thead>
                                                                    <tbody>
                                                                        {r.beds.map(bed => (
                                                                            <tr key={bed.id}>
                                                                                <td><strong>Bed {bed.id.split('-').pop()}</strong></td>
                                                                                <td style={{ color: 'var(--text-muted)' }}>{bed.id}</td>
                                                                                <td>
                                                                                    <span className={`badge ${bed.status === 'Available' ? 'badge-success' : 'badge-danger'}`}>
                                                                                        {bed.status}
                                                                                    </span>
                                                                                </td>
                                                                                <td>
                                                                                    {bed.tenant
                                                                                        ? <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}><MdPerson size={14} />{bed.tenant}</div>
                                                                                        : <span style={{ color: 'var(--text-muted)' }}>—</span>}
                                                                                </td>
                                                                                <td style={{ color: 'var(--text-muted)', fontSize: '0.78rem' }}>
                                                                                    {r.type} Room • {r.floor} Floor
                                                                                </td>
                                                                                <td>
                                                                                    <div style={{ display: 'flex', gap: '0.3rem' }}>
                                                                                        {bed.status === 'Available' && (
                                                                                            <button className="btn btn-icon btn-ghost" title="Assign Tenant" onClick={() => openAssign(r.id, bed)}>
                                                                                                <MdAssignment size={16} color="var(--primary-500)" />
                                                                                            </button>
                                                                                        )}
                                                                                        <button className="btn btn-icon btn-ghost" title="Edit" onClick={() => openEditBed(r.id, bed)}>
                                                                                            <MdEdit size={16} color="var(--primary-500)" />
                                                                                        </button>
                                                                                        <button className="btn btn-icon btn-ghost" title="Delete" onClick={() => confirmDeleteBed(r.id, bed.id)}>
                                                                                            <MdDelete size={16} color="var(--danger)" />
                                                                                        </button>
                                                                                    </div>
                                                                                </td>
                                                                            </tr>
                                                                        ))}
                                                                    </tbody>
                                                                </table>
                                                            </div>
                                                        )}
                                                    </div>
                                                </td>
                                            </tr>
                                        )}
                                    </>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Add/Edit Room Modal */}
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

            {/* Add/Edit Bed Modal */}
            <Modal open={bedModal} onClose={() => setBedModal(false)} title={editBed ? 'Edit Bed' : 'Add New Bed'}>
                <ModalBody>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        <div className="form-group">
                            <label className="form-label">Bed Status</label>
                            <select className="form-control" value={bedForm.status} onChange={e => setBedForm({ ...bedForm, status: e.target.value })}>
                                <option>Available</option>
                                <option>Occupied</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label className="form-label">Tenant (ID or Name)</label>
                            <input className="form-control" placeholder="e.g. T001 or Arjun Sharma" value={bedForm.tenant} onChange={e => setBedForm({ ...bedForm, tenant: e.target.value })} />
                        </div>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <button className="btn btn-ghost btn-sm" onClick={() => setBedModal(false)}>Cancel</button>
                    <button className="btn btn-primary btn-sm" onClick={handleSaveBed}>{editBed ? 'Update' : 'Add Bed'}</button>
                </ModalFooter>
            </Modal>

            {/* Assign Tenant Modal */}
            <Modal open={assignModal} onClose={() => setAssignModal(false)} title={`Assign Tenant — Bed ${assignBed?.id ?? ''}`}>
                <ModalBody>
                    <div className="form-group">
                        <label className="form-label">Tenant ID / Name</label>
                        <input className="form-control" placeholder="e.g. T001 or Arjun Sharma" value={assignTenant} onChange={e => setAssignTenant(e.target.value)} />
                    </div>
                </ModalBody>
                <ModalFooter>
                    <button className="btn btn-ghost btn-sm" onClick={() => setAssignModal(false)}>Cancel</button>
                    <button className="btn btn-primary btn-sm" onClick={handleAssign}>Assign</button>
                </ModalFooter>
            </Modal>

            {/* Delete Room Confirm */}
            <ConfirmDialog open={!!deleteId} onClose={() => setDeleteId(null)} onConfirm={handleDelete} title="Delete Room" message="Are you sure you want to delete this room? This action cannot be undone." />

            {/* Delete Bed Confirm */}
            <ConfirmDialog open={!!deleteBedId} onClose={() => { setDeleteBedId(null); setBedRoomId(null); }} onConfirm={handleDeleteBed} title="Delete Bed" message="Are you sure you want to delete this bed? This action cannot be undone." />
        </DashboardLayout>
    );
}
