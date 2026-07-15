import { useNavigate } from 'react-router-dom';
import DashboardLayout from '../../components/DashboardLayout';
import { mockRooms, mockTenants, mockStaff, mockPayments, mockComplaints, mockVisitors, revenueData, occupancyData, complaintData } from '../../data/mockData';
import { AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { MdMeetingRoom, MdBed, MdPeople, MdSupervisorAccount, MdPayment, MdReport, MdArrowForward, MdWarning } from 'react-icons/md';

const COLORS = ['#6366f1', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];

export default function AdminDashboard() {
    const navigate = useNavigate();

    const totalRooms = mockRooms.length;
    const availRooms = mockRooms.filter(r => r.status === 'Available').length;
    const occupiedRooms = mockRooms.filter(r => r.status === 'Occupied').length;
    const monthlyIncome = mockPayments.reduce((a, p) => a + p.paid, 0);
    const pending = mockPayments.reduce((a, p) => a + p.pending, 0);
    const todayVisitors = mockVisitors.filter(v => v.status !== 'Rejected').length;

    const dashCards = [
        {
            label: 'Rooms',
            icon: MdMeetingRoom,
            color: '#6366f1',
            gradient: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
            path: '/admin/rooms',
            stats: [
                { label: 'Total', value: totalRooms },
                { label: 'Available', value: availRooms },
            ],
            description: 'Room & Bed Management',
        },
        {
            label: 'Staff',
            icon: MdSupervisorAccount,
            color: '#10b981',
            gradient: 'linear-gradient(135deg, #10b981, #06b6d4)',
            path: '/admin/staff',
            stats: [
                { label: 'Total Staff', value: mockStaff.length },
            ],
            description: 'Staff Management',
        },
        {
            label: 'Payments',
            icon: MdPayment,
            color: '#f59e0b',
            gradient: 'linear-gradient(135deg, #f59e0b, #ef4444)',
            path: '/admin/payments',
            stats: [
                { label: 'Collected', value: `₹${(monthlyIncome / 1000).toFixed(0)}k` },
                { label: 'Pending', value: `₹${(pending / 1000).toFixed(1)}k` },
            ],
            description: 'Payment Management',
        },
        {
            label: 'Tenants',
            icon: MdPeople,
            color: '#ec4899',
            gradient: 'linear-gradient(135deg, #ec4899, #8b5cf6)',
            path: '/admin/tenants',
            stats: [
                { label: 'Total', value: mockTenants.length },
                { label: 'Visitors Today', value: todayVisitors },
            ],
            description: 'Tenant Management',
        },
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

                {/* 4 Dashboard Cards */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.25rem' }}>
                    {dashCards.map(card => {
                        const Icon = card.icon;
                        return (
                            <div
                                key={card.label}
                                className="card"
                                onClick={() => navigate(card.path)}
                                style={{
                                    padding: '1.5rem',
                                    cursor: 'pointer',
                                    transition: 'transform 0.18s, box-shadow 0.18s',
                                    borderTop: `3px solid ${card.color}`,
                                    position: 'relative',
                                    overflow: 'hidden',
                                }}
                                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = `0 8px 28px ${card.color}25`; }}
                                onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = ''; }}
                            >
                                {/* Background accent */}
                                <div style={{ position: 'absolute', top: -20, right: -20, width: 80, height: 80, borderRadius: '50%', background: `${card.color}10`, pointerEvents: 'none' }} />

                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                                    <div style={{ width: 48, height: 48, borderRadius: 'var(--radius)', background: card.gradient, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        <Icon size={24} color="#fff" />
                                    </div>
                                    <MdArrowForward size={18} color="var(--text-muted)" />
                                </div>

                                <div style={{ fontWeight: 800, fontSize: '1.15rem', marginBottom: '0.25rem', color: 'var(--text-primary)' }}>{card.label}</div>
                                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>{card.description}</div>

                                <div style={{ display: 'flex', gap: '1.25rem', flexWrap: 'wrap' }}>
                                    {card.stats.map(stat => (
                                        <div key={stat.label}>
                                            <div style={{ fontSize: '1.4rem', fontWeight: 800, color: card.color, lineHeight: 1 }}>{stat.value}</div>
                                            <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>{stat.label}</div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        );
                    })}
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
