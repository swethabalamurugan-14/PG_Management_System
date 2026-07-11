import DashboardLayout from '../../components/DashboardLayout';
import StatCard from '../../components/StatCard';
import { mockRooms, mockTenants, mockStaff, mockPayments, mockComplaints, mockVisitors, revenueData, occupancyData, complaintData } from '../../data/mockData';
import { AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { MdMeetingRoom, MdBed, MdPeople, MdSupervisorAccount, MdPayment, MdReport, MdPersonPin, MdCheckCircle, MdWarning, MdTrendingUp } from 'react-icons/md';

const COLORS = ['#6366f1', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];

export default function AdminDashboard() {
    const totalRooms = mockRooms.length;
    const availRooms = mockRooms.filter(r => r.status === 'Available').length;
    const occupiedRooms = mockRooms.filter(r => r.status === 'Occupied').length;
    const totalBeds = mockRooms.reduce((a, r) => a + r.capacity, 0);
    const availBeds = mockRooms.reduce((a, r) => a + r.beds.filter(b => b.status === 'Available').length, 0);
    const monthlyIncome = mockPayments.reduce((a, p) => a + p.paid, 0);
    const pending = mockPayments.reduce((a, p) => a + p.pending, 0);
    const openComplaints = mockComplaints.filter(c => c.status !== 'Resolved').length;
    const todayVisitors = mockVisitors.filter(v => v.status !== 'Rejected').length;

    const stats = [
        { icon: <MdMeetingRoom size={24} />, label: 'Total Rooms', value: totalRooms, color: '#6366f1' },
        { icon: <MdCheckCircle size={24} />, label: 'Available Rooms', value: availRooms, color: '#10b981' },
        { icon: <MdMeetingRoom size={24} />, label: 'Occupied Rooms', value: occupiedRooms, color: '#f59e0b' },
        { icon: <MdBed size={24} />, label: 'Total Beds', value: totalBeds, color: '#8b5cf6' },
        { icon: <MdBed size={24} />, label: 'Available Beds', value: availBeds, color: '#06b6d4' },
        { icon: <MdPeople size={24} />, label: 'Total Tenants', value: mockTenants.length, color: '#ec4899' },
        { icon: <MdSupervisorAccount size={24} />, label: 'Total Staff', value: mockStaff.length, color: '#14b8a6' },
        { icon: <MdPayment size={24} />, label: 'Monthly Income', value: `₹${(monthlyIncome / 1000).toFixed(0)}k`, color: '#10b981', trend: 8 },
        { icon: <MdWarning size={24} />, label: 'Pending Payments', value: `₹${(pending / 1000).toFixed(1)}k`, color: '#ef4444' },
        { icon: <MdReport size={24} />, label: 'Open Complaints', value: openComplaints, color: '#f59e0b' },
        { icon: <MdPersonPin size={24} />, label: 'Visitors Today', value: todayVisitors, color: '#6366f1' },
    ];

    return (
        <DashboardLayout title="Dashboard">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                {/* Welcome Banner */}
                <div style={{ background: 'var(--gradient-primary)', borderRadius: 'var(--radius-md)', padding: '1.75rem 2rem', color: '#fff', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
                    <div>
                        <h3 style={{ color: '#fff', marginBottom: '0.35rem' }}>Good Day, Admin! 👋</h3>
                        <p style={{ color: 'rgba(255,255,255,0.8)', margin: 0, fontSize: '0.9rem' }}>Here's your PG at a glance — {new Date().toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
                    </div>
                    <div style={{ display: 'flex', gap: '1.5rem' }}>
                        <div style={{ textAlign: 'center' }}>
                            <div style={{ fontSize: '1.75rem', fontWeight: 800 }}>{Math.round((occupiedRooms / totalRooms) * 100)}%</div>
                            <div style={{ fontSize: '0.75rem', opacity: 0.8 }}>Occupancy Rate</div>
                        </div>
                    </div>
                </div>

                {/* Stat Cards */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.25rem' }}>
                    {stats.map(s => (
                        <StatCard key={s.label} {...s} />
                    ))}
                </div>

                {/* Charts Row 1 */}
                <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '1.5rem', flexWrap: 'wrap' }}>
                    <div className="chart-card">
                        <h5 className="chart-title">📈 Monthly Revenue vs Expenses</h5>
                        <ResponsiveContainer width="100%" height={260}>
                            <AreaChart data={revenueData}>
                                <defs>
                                    <linearGradient id="revenue" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />
                                        <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                                    </linearGradient>
                                    <linearGradient id="expenses" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3} />
                                        <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                                <XAxis dataKey="month" tick={{ fontSize: 12, fill: 'var(--text-muted)' }} axisLine={false} tickLine={false} />
                                <YAxis tick={{ fontSize: 12, fill: 'var(--text-muted)' }} axisLine={false} tickLine={false} tickFormatter={v => `₹${v / 1000}k`} />
                                <Tooltip formatter={(v, name) => [`₹${v.toLocaleString()}`, name === 'revenue' ? 'Revenue' : 'Expenses']} contentStyle={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 8 }} />
                                <Legend />
                                <Area type="monotone" dataKey="revenue" stroke="#6366f1" fill="url(#revenue)" strokeWidth={2} />
                                <Area type="monotone" dataKey="expenses" stroke="#ef4444" fill="url(#expenses)" strokeWidth={2} />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>

                    <div className="chart-card">
                        <h5 className="chart-title">🏠 Room Occupancy</h5>
                        <ResponsiveContainer width="100%" height={260}>
                            <PieChart>
                                <Pie data={occupancyData} cx="50%" cy="45%" innerRadius={60} outerRadius={90} paddingAngle={4} dataKey="value">
                                    {occupancyData.map((entry, i) => <Cell key={i} fill={entry.color} />)}
                                </Pie>
                                <Tooltip formatter={(v, name) => [v + ' rooms', name]} contentStyle={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 8 }} />
                                <Legend />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Charts Row 2 */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                    <div className="chart-card">
                        <h5 className="chart-title">📋 Complaint Statistics</h5>
                        <ResponsiveContainer width="100%" height={220}>
                            <BarChart data={complaintData}>
                                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                                <XAxis dataKey="month" tick={{ fontSize: 12, fill: 'var(--text-muted)' }} axisLine={false} tickLine={false} />
                                <YAxis tick={{ fontSize: 12, fill: 'var(--text-muted)' }} axisLine={false} tickLine={false} />
                                <Tooltip contentStyle={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 8 }} />
                                <Legend />
                                <Bar dataKey="open" fill="#ef4444" radius={[4, 4, 0, 0]} name="Open" />
                                <Bar dataKey="resolved" fill="#10b981" radius={[4, 4, 0, 0]} name="Resolved" />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>

                    <div className="chart-card">
                        <h5 className="chart-title">💳 Payment Overview</h5>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.875rem', marginTop: '0.5rem' }}>
                            {[
                                { label: 'Total Collected', val: `₹${monthlyIncome.toLocaleString()}`, color: '#6366f1', pct: 75 },
                                { label: 'Pending Amount', val: `₹${pending.toLocaleString()}`, color: '#ef4444', pct: 25 },
                                { label: 'Collection Rate', val: '75%', color: '#10b981', pct: 75 },
                            ].map(item => (
                                <div key={item.label}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.35rem' }}>
                                        <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>{item.label}</span>
                                        <span style={{ fontWeight: 700, fontSize: '0.9rem' }}>{item.val}</span>
                                    </div>
                                    <div style={{ height: 8, borderRadius: 8, background: 'var(--bg-tertiary)', overflow: 'hidden' }}>
                                        <div style={{ height: '100%', width: `${item.pct}%`, background: item.color, borderRadius: 8 }} />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Recent Activity */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                    <div className="chart-card">
                        <h5 className="chart-title">👥 Recent Tenants</h5>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                            {mockTenants.slice(0, 4).map(t => (
                                <div key={t.id} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.5rem 0', borderBottom: '1px solid var(--border)' }}>
                                    <div className="avatar" style={{ width: 36, height: 36, fontSize: '0.9rem' }}>{t.name[0]}</div>
                                    <div style={{ flex: 1 }}>
                                        <div style={{ fontWeight: 600, fontSize: '0.875rem' }}>{t.name}</div>
                                        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Room {t.room.replace('R', '')} • {t.occupation}</div>
                                    </div>
                                    <span className="badge badge-success">Active</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="chart-card">
                        <h5 className="chart-title">🔔 Open Complaints</h5>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                            {mockComplaints.filter(c => c.status !== 'Resolved').map(c => (
                                <div key={c.id} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.5rem 0', borderBottom: '1px solid var(--border)' }}>
                                    <div style={{ width: 36, height: 36, borderRadius: 'var(--radius)', background: c.status === 'In Progress' ? 'var(--warning-light)' : 'var(--danger-light)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        <MdReport size={18} color={c.status === 'In Progress' ? 'var(--warning)' : 'var(--danger)'} />
                                    </div>
                                    <div style={{ flex: 1 }}>
                                        <div style={{ fontWeight: 600, fontSize: '0.875rem' }}>{c.type} Issue</div>
                                        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{c.tenantName} • {c.date}</div>
                                    </div>
                                    <span className={`badge badge-${c.status === 'In Progress' ? 'warning' : 'danger'}`}>{c.status}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}
