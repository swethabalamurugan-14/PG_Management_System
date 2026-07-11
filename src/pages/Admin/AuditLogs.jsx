import DashboardLayout from '../../components/DashboardLayout';
import { mockAuditLogs } from '../../data/mockData';
import { MdLogin, MdMeetingRoom, MdPayment, MdReport } from 'react-icons/md';

const typeIcon = { Auth: MdLogin, Room: MdMeetingRoom, Payment: MdPayment, Complaint: MdReport };
const typeColor = { Auth: '#6366f1', Room: '#10b981', Payment: '#f59e0b', Complaint: '#ef4444' };

export default function AuditLogs() {
    return (
        <DashboardLayout title="Audit Logs">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <div className="page-header">
                    <div><h2 className="page-title">Audit Logs</h2><p className="page-subtitle">Track all system activities</p></div>
                </div>
                <div className="rounded-table-wrap overflow-x-auto">
                    <table className="data-table">
                        <thead><tr><th>Log ID</th><th>Type</th><th>Action</th><th>User</th><th>Details</th><th>Timestamp</th></tr></thead>
                        <tbody>
                            {mockAuditLogs.map(l => {
                                const Icon = typeIcon[l.type] || MdLogin;
                                const color = typeColor[l.type] || '#6366f1';
                                return (
                                    <tr key={l.id}>
                                        <td><strong>{l.id}</strong></td>
                                        <td>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                                                <div style={{ width: 28, height: 28, borderRadius: 6, background: `${color}18`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                    <Icon size={15} color={color} />
                                                </div>
                                                <span className="badge" style={{ background: `${color}18`, color }}>{l.type}</span>
                                            </div>
                                        </td>
                                        <td><strong>{l.action}</strong></td>
                                        <td>{l.user}</td>
                                        <td style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', maxWidth: 260 }}>{l.details}</td>
                                        <td style={{ fontSize: '0.8rem', color: 'var(--text-muted)', whiteSpace: 'nowrap' }}>{l.timestamp}</td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </DashboardLayout>
    );
}
