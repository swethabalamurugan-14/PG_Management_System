import { useState } from 'react';
import DashboardLayout from '../../components/DashboardLayout';
import { mockRooms } from '../../data/mockData';
import { MdBed, MdPerson, MdCheckCircle } from 'react-icons/md';

export default function BedManagement() {
    const [rooms] = useState(mockRooms);
    const [selectedRoom, setSelectedRoom] = useState(null);

    const allBeds = rooms.flatMap(r => r.beds.map(b => ({ ...b, roomNumber: r.number, floor: r.floor, type: r.type })));
    const occupied = allBeds.filter(b => b.status === 'Occupied').length;
    const available = allBeds.filter(b => b.status === 'Available').length;

    return (
        <DashboardLayout title="Bed Management">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <div className="page-header">
                    <div>
                        <h2 className="page-title">Bed Management</h2>
                        <p className="page-subtitle">Track bed occupancy across all rooms</p>
                    </div>
                </div>

                {/* Summary cards */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px,1fr))', gap: '1rem' }}>
                    {[
                        { label: 'Total Beds', val: allBeds.length, color: '#6366f1' },
                        { label: 'Occupied Beds', val: occupied, color: '#ef4444' },
                        { label: 'Available Beds', val: available, color: '#10b981' },
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
                <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                    <button className={`btn btn-sm ${!selectedRoom ? 'btn-primary' : 'btn-ghost'}`} onClick={() => setSelectedRoom(null)}>All Rooms</button>
                    {rooms.map(r => (
                        <button key={r.id} className={`btn btn-sm ${selectedRoom === r.id ? 'btn-primary' : 'btn-ghost'}`} onClick={() => setSelectedRoom(r.id)}>Room {r.number}</button>
                    ))}
                </div>

                {/* Room Bed Grid */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
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
        </DashboardLayout>
    );
}
