import { useState } from 'react';
import DashboardLayout from '../../components/DashboardLayout';
import { mockPayments } from '../../data/mockData';
import { MdDownload, MdSearch } from 'react-icons/md';
import jsPDF from 'jspdf';
import toast from 'react-hot-toast';

export default function PaymentManagement() {
    const [payments] = useState(mockPayments);
    const [search, setSearch] = useState('');
    const [filterStatus, setFilterStatus] = useState('All');

    const filtered = payments.filter(p => {
        const matchSearch = p.tenantName.toLowerCase().includes(search.toLowerCase()) || p.id.includes(search);
        const matchStatus = filterStatus === 'All' || p.status === filterStatus;
        return matchSearch && matchStatus;
    });

    const totalCollected = payments.reduce((a, p) => a + p.paid, 0);
    const totalPending = payments.reduce((a, p) => a + p.pending, 0);

    const downloadReceipt = (p) => {
        const doc = new jsPDF();
        doc.setFontSize(20);
        doc.setTextColor(99, 102, 241);
        doc.text('PG Manager', 105, 20, { align: 'center' });
        doc.setFontSize(12);
        doc.setTextColor(0, 0, 0);
        doc.text('Payment Receipt', 105, 30, { align: 'center' });
        doc.line(15, 35, 195, 35);

        const data = [
            ['Receipt No.', p.id],
            ['Tenant Name', p.tenantName],
            ['Room', p.room],
            ['Month', p.month],
            ['Rent', `Rs. ${p.rent}`],
            ['Electricity', `Rs. ${p.electricity}`],
            ['Water', `Rs. ${p.water}`],
            ['Late Fine', `Rs. ${p.fine}`],
            ['Total Amount', `Rs. ${p.total}`],
            ['Amount Paid', `Rs. ${p.paid}`],
            ['Status', p.status],
            ['Date', p.date || 'Pending'],
        ];

        data.forEach(([key, val], i) => {
            const y = 50 + i * 12;
            doc.setFont(undefined, 'bold');
            doc.text(key + ':', 20, y);
            doc.setFont(undefined, 'normal');
            doc.text(String(val), 80, y);
        });

        doc.line(15, 220, 195, 220);
        doc.setFontSize(10);
        doc.setTextColor(100, 100, 100);
        doc.text('Thank you for your payment! | PG Manager | info@pgmanager.com', 105, 228, { align: 'center' });

        doc.save(`receipt_${p.id}.pdf`);
        toast.success('Receipt downloaded!');
    };

    return (
        <DashboardLayout title="Payment Management">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <div className="page-header">
                    <div><h2 className="page-title">Payment Management</h2><p className="page-subtitle">Track and manage all payments</p></div>
                </div>

                {/* Summary */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px,1fr))', gap: '1rem' }}>
                    {[
                        { label: 'Total Collected', val: `₹${totalCollected.toLocaleString()}`, color: '#10b981' },
                        { label: 'Total Pending', val: `₹${totalPending.toLocaleString()}`, color: '#ef4444' },
                        { label: 'Paid Tenants', val: payments.filter(p => p.status === 'Paid').length, color: '#6366f1' },
                        { label: 'Pending Tenants', val: payments.filter(p => p.status === 'Pending').length, color: '#f59e0b' },
                    ].map(s => (
                        <div key={s.label} className="card" style={{ padding: '1.2rem', borderLeft: `4px solid ${s.color}` }}>
                            <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 600 }}>{s.label}</div>
                            <div style={{ fontSize: '1.5rem', fontWeight: 800, color: s.color, marginTop: '0.3rem' }}>{s.val}</div>
                        </div>
                    ))}
                </div>

                <div className="card" style={{ padding: '1rem 1.5rem' }}>
                    <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center' }}>
                        <div className="search-bar"><MdSearch size={18} /><input placeholder="Search payment..." value={search} onChange={e => setSearch(e.target.value)} /></div>
                        <select className="form-control" style={{ width: 140 }} value={filterStatus} onChange={e => setFilterStatus(e.target.value)}>
                            <option>All</option><option>Paid</option><option>Pending</option>
                        </select>
                    </div>
                </div>

                <div className="rounded-table-wrap overflow-x-auto">
                    <table className="data-table">
                        <thead>
                            <tr><th>Receipt ID</th><th>Tenant</th><th>Room</th><th>Month</th><th>Rent</th><th>Electricity</th><th>Water</th><th>Fine</th><th>Total</th><th>Paid</th><th>Pending</th><th>Status</th><th>Receipt</th></tr>
                        </thead>
                        <tbody>
                            {filtered.map(p => (
                                <tr key={p.id}>
                                    <td><strong>{p.id}</strong></td>
                                    <td>{p.tenantName}</td>
                                    <td>{p.room}</td>
                                    <td>{p.month}</td>
                                    <td>₹{p.rent}</td>
                                    <td>₹{p.electricity}</td>
                                    <td>₹{p.water}</td>
                                    <td>₹{p.fine}</td>
                                    <td><strong>₹{p.total}</strong></td>
                                    <td style={{ color: 'var(--success)', fontWeight: 600 }}>₹{p.paid}</td>
                                    <td style={{ color: 'var(--danger)', fontWeight: 600 }}>₹{p.pending}</td>
                                    <td><span className={`badge ${p.status === 'Paid' ? 'badge-success' : 'badge-danger'}`}>{p.status}</span></td>
                                    <td>
                                        <button className="btn btn-icon btn-ghost" onClick={() => downloadReceipt(p)} title="Download Receipt">
                                            <MdDownload size={19} color="var(--primary-500)" />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </DashboardLayout>
    );
}
