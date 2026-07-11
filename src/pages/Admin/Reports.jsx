import DashboardLayout from '../../components/DashboardLayout';
import { mockPayments, mockTenants, mockComplaints } from '../../data/mockData';
import { MdDownload } from 'react-icons/md';
import toast from 'react-hot-toast';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const reportTypes = [
    { id: 'income', label: 'Monthly Income Report', icon: '💰' },
    { id: 'yearly', label: 'Yearly Income Report', icon: '📊' },
    { id: 'occupancy', label: 'Occupancy Report', icon: '🏠' },
    { id: 'complaint', label: 'Complaint Report', icon: '📋' },
    { id: 'payment', label: 'Payment Report', icon: '💳' },
    { id: 'tenant', label: 'Tenant Report', icon: '👥' },
    { id: 'staff', label: 'Staff Report', icon: '👤' },
];

const monthlyData = [
    { month: 'Jan', amount: 68000 }, { month: 'Feb', amount: 72000 }, { month: 'Mar', amount: 75000 },
    { month: 'Apr', amount: 80000 }, { month: 'May', amount: 78000 }, { month: 'Jun', amount: 85000 },
];

export default function Reports() {
    const handleDownload = (type) => {
        toast.success(`${type} report downloaded!`);
    };

    return (
        <DashboardLayout title="Reports">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                <div className="page-header">
                    <div><h2 className="page-title">Reports & Analytics</h2><p className="page-subtitle">Generate and download comprehensive reports</p></div>
                </div>

                {/* Report Cards */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '1.25rem' }}>
                    {reportTypes.map(r => (
                        <div key={r.id} className="card" style={{ padding: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
                                <div style={{ fontSize: '1.75rem' }}>{r.icon}</div>
                                <div>
                                    <div style={{ fontWeight: 700, fontSize: '0.875rem' }}>{r.label}</div>
                                    <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: 2 }}>Click to download PDF/CSV</div>
                                </div>
                            </div>
                            <button className="btn btn-icon btn-ghost" onClick={() => handleDownload(r.label)} title="Download">
                                <MdDownload size={20} color="var(--primary-500)" />
                            </button>
                        </div>
                    ))}
                </div>

                {/* Charts */}
                <div className="chart-card">
                    <h5 className="chart-title">📈 Monthly Income Trend</h5>
                    <ResponsiveContainer width="100%" height={280}>
                        <BarChart data={monthlyData}>
                            <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                            <XAxis dataKey="month" tick={{ fontSize: 12, fill: 'var(--text-muted)' }} axisLine={false} tickLine={false} />
                            <YAxis tick={{ fontSize: 12, fill: 'var(--text-muted)' }} axisLine={false} tickLine={false} tickFormatter={v => `₹${v / 1000}k`} />
                            <Tooltip formatter={(v) => [`₹${v.toLocaleString()}`, 'Income']} contentStyle={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 8 }} />
                            <Bar dataKey="amount" fill="#6366f1" radius={[6, 6, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>

                {/* Quick Stats */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px,1fr))', gap: '1rem' }}>
                    {[
                        { label: 'Total Revenue (2025)', val: `₹${monthlyData.reduce((a, b) => a + b.amount, 0).toLocaleString()}`, color: '#10b981' },
                        { label: 'Active Tenants', val: mockTenants.length, color: '#6366f1' },
                        { label: 'Total Payments', val: mockPayments.length, color: '#f59e0b' },
                        { label: 'Resolved Complaints', val: mockComplaints.filter(c => c.status === 'Resolved').length, color: '#8b5cf6' },
                    ].map(s => (
                        <div key={s.label} className="card" style={{ padding: '1.25rem', textAlign: 'center' }}>
                            <div style={{ fontSize: '1.75rem', fontWeight: 800, color: s.color }}>{s.val}</div>
                            <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '0.3rem' }}>{s.label}</div>
                        </div>
                    ))}
                </div>
            </div>
        </DashboardLayout>
    );
}
