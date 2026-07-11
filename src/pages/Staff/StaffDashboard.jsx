import DashboardLayout from '../../components/DashboardLayout';
import { mockRooms, mockComplaints, mockNotices, mockMaintenance } from '../../data/mockData';
import { useAuth } from '../../context/AuthContext';
import { MdMeetingRoom, MdBed, MdWifi, MdReport, MdSpeakerNotes } from 'react-icons/md';

export default function StaffDashboard() {
    const { user } = useAuth();
    const stats = [
        { label: 'Total Rooms', val: mockRooms.length, color: '#6366f1', icon: <MdMeetingRoom size={22} /> },
        { label: 'Available Beds', val: mockRooms.reduce((a, r) => a + r.beds.filter(b => b.status === 'Available').length, 0), color: '#10b981', icon: <MdBed size={22} /> },
        { label: 'Open Complaints', val: mockComplaints.filter(c => c.status !== 'Resolved').length, color: '#ef4444', icon: <MdReport size={22} /> },
        { label: 'Pending Maintenance', val: mockMaintenance.filter(m => m.status === 'Pending').length, color: '#f59e0b', icon: <MdWifi size={22} /> },
    ];

    return (
        <DashboardLayout title="Staff Dashboard">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
                <div style={{ background: 'var(--gradient-primary)', borderRadius: 'var(--radius-md)', padding: '1.75rem', color: '#fff' }}>
                    <h3 style={{ color: '#fff', marginBottom: '0.3rem' }}>Welcome, {user?.name || 'Staff'}! 👋</h3>
                    <p style={{ opacity: 0.85, margin: 0 }}>Here's your shift overview for today</p>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px,1fr))', gap: '1.25rem' }}>
                    {stats.map(s => (
                        <div key={s.label} className="card" style={{ padding: '1.5rem', display: 'flex', gap: '1rem', alignItems: 'center' }}>
                            <div style={{ width: 48, height: 48, borderRadius: 'var(--radius)', background: `${s.color}18`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: s.color }}>{s.icon}</div>
                            <div>
                                <div style={{ fontSize: '1.75rem', fontWeight: 800 }}>{s.val}</div>
                                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{s.label}</div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Assigned Tasks */}
                <div className="chart-card">
                    <h5 className="chart-title">🛠️ My Assigned Tasks</h5>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.7rem' }}>
                        {mockComplaints.filter(c => c.status === 'In Progress').map(c => (
                            <div key={c.id} style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', padding: '0.75rem', background: 'var(--bg-secondary)', borderRadius: 'var(--radius)' }}>
                                <MdReport size={20} color="var(--warning)" />
                                <div style={{ flex: 1 }}>
                                    <div style={{ fontWeight: 600, fontSize: '0.875rem' }}>{c.type} Complaint</div>
                                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>From: {c.tenantName} • {c.date}</div>
                                </div>
                                <span className="badge badge-warning">In Progress</span>
                            </div>
                        ))}
                        {mockMaintenance.filter(m => m.status === 'Assigned').map(m => (
                            <div key={m.id} style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', padding: '0.75rem', background: 'var(--bg-secondary)', borderRadius: 'var(--radius)' }}>
                                <MdWifi size={20} color="var(--info)" />
                                <div style={{ flex: 1 }}>
                                    <div style={{ fontWeight: 600, fontSize: '0.875rem' }}>{m.type} Maintenance</div>
                                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{m.description}</div>
                                </div>
                                <span className="badge badge-info">Assigned</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Recent Notices */}
                <div className="chart-card">
                    <h5 className="chart-title">📢 Recent Notices</h5>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.7rem' }}>
                        {mockNotices.slice(0, 3).map(n => (
                            <div key={n.id} style={{ padding: '0.85rem', background: 'var(--bg-secondary)', borderRadius: 'var(--radius)', borderLeft: '4px solid var(--primary-500)' }}>
                                <div style={{ fontWeight: 700, fontSize: '0.875rem' }}>{n.title}</div>
                                <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>{n.date}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}
