import { useState } from 'react';
import DashboardLayout from '../../components/DashboardLayout';
import { mockBookings } from '../../data/mockData';
import { MdSearch } from 'react-icons/md';

export default function BookingManagement() {
    const [bookings] = useState(mockBookings);
    const [search, setSearch] = useState('');
    const [filterStatus, setFilterStatus] = useState('All');

    const filtered = bookings.filter(b => {
        const matchSearch = b.tenantName.toLowerCase().includes(search.toLowerCase()) || b.id.includes(search);
        const matchStatus = filterStatus === 'All' || b.status === filterStatus;
        return matchSearch && matchStatus;
    });

    return (
        <DashboardLayout title="Booking Management">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <div className="page-header">
                    <div><h2 className="page-title">Booking Management</h2><p className="page-subtitle">{bookings.length} total bookings</p></div>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(150px,1fr))', gap: '1rem' }}>
                    {[
                        { label: 'Confirmed', val: bookings.filter(b => b.status === 'Confirmed').length, color: '#10b981' },
                        { label: 'Pending', val: bookings.filter(b => b.status === 'Pending').length, color: '#f59e0b' },
                        { label: 'Cancelled', val: bookings.filter(b => b.status === 'Cancelled').length, color: '#ef4444' },
                        { label: 'Total Advance', val: `₹${bookings.reduce((a, b) => a + b.advance, 0).toLocaleString()}`, color: '#6366f1' },
                    ].map(s => (
                        <div key={s.label} className="card" style={{ padding: '1.2rem', borderLeft: `4px solid ${s.color}` }}>
                            <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 600 }}>{s.label}</div>
                            <div style={{ fontSize: '1.5rem', fontWeight: 800, color: s.color }}>{s.val}</div>
                        </div>
                    ))}
                </div>
                <div className="card" style={{ padding: '1rem 1.5rem' }}>
                    <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center' }}>
                        <div className="search-bar"><MdSearch size={18} /><input placeholder="Search booking..." value={search} onChange={e => setSearch(e.target.value)} /></div>
                        <select className="form-control" style={{ width: 160 }} value={filterStatus} onChange={e => setFilterStatus(e.target.value)}>
                            <option>All</option><option>Confirmed</option><option>Pending</option><option>Cancelled</option>
                        </select>
                    </div>
                </div>
                <div className="rounded-table-wrap overflow-x-auto">
                    <table className="data-table">
                        <thead><tr><th>Booking ID</th><th>Tenant</th><th>Room</th><th>Booking Date</th><th>Advance</th><th>Booking Status</th><th>Payment Status</th></tr></thead>
                        <tbody>
                            {filtered.map(b => (
                                <tr key={b.id}>
                                    <td><strong>{b.id}</strong></td>
                                    <td>{b.tenantName}</td>
                                    <td>{b.room}</td>
                                    <td>{b.bookingDate}</td>
                                    <td>₹{b.advance.toLocaleString()}</td>
                                    <td><span className={`badge ${b.status === 'Confirmed' ? 'badge-success' : b.status === 'Pending' ? 'badge-warning' : 'badge-danger'}`}>{b.status}</span></td>
                                    <td><span className={`badge ${b.payment === 'Paid' ? 'badge-success' : 'badge-danger'}`}>{b.payment}</span></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </DashboardLayout>
    );
}
