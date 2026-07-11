import DashboardLayout from '../../components/DashboardLayout';
import { mockNotifications } from '../../data/mockData';
import { MdNotifications, MdPayment, MdReport, MdPersonPin, MdSpeakerNotes } from 'react-icons/md';

const typeIcon = { payment: MdPayment, complaint: MdReport, visitor: MdPersonPin, notice: MdSpeakerNotes };
const typeColor = { payment: '#6366f1', complaint: '#ef4444', visitor: '#10b981', notice: '#f59e0b' };

export default function Notifications() {
    return (
        <DashboardLayout title="Notifications">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <div className="page-header">
                    <div><h2 className="page-title">Notifications</h2><p className="page-subtitle">{mockNotifications.filter(n => !n.read).length} unread</p></div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                    {mockNotifications.map(n => {
                        const Icon = typeIcon[n.type] || MdNotifications;
                        const color = typeColor[n.type] || '#6366f1';
                        return (
                            <div key={n.id} className="card" style={{ padding: '1.25rem', display: 'flex', gap: '1rem', alignItems: 'flex-start', opacity: n.read ? 0.7 : 1, borderLeft: `4px solid ${n.read ? 'var(--border)' : color}` }}>
                                <div style={{ width: 44, height: 44, borderRadius: 'var(--radius)', background: `${color}18`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                                    <Icon size={22} color={color} />
                                </div>
                                <div style={{ flex: 1 }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                        <h5 style={{ marginBottom: '0.25rem' }}>{n.title}</h5>
                                        {!n.read && <span className="badge badge-primary" style={{ fontSize: '0.68rem' }}>New</span>}
                                    </div>
                                    <p style={{ fontSize: '0.875rem', margin: 0 }}>{n.message}</p>
                                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.5rem' }}>📅 {n.date}</div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </DashboardLayout>
    );
}
