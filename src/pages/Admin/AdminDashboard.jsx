import { useState } from 'react';
import DashboardLayout from '../../components/DashboardLayout';
import { mockRooms, mockTenants, mockStaff, mockPayments, mockVisitors } from '../../data/mockData';
import {
    MdMeetingRoom,
    MdCheckCircle,
    MdBed,
    MdSupervisorAccount,
    MdPayment,
    MdWarning,
    MdPeople,
    MdKeyboardArrowDown,
    MdKeyboardArrowRight,
} from 'react-icons/md';

export default function AdminDashboard() {
    const [expanded, setExpanded] = useState(null);

    const totalRooms = mockRooms.length;
    const availRooms = mockRooms.filter(r => r.status === 'Available').length;
    const occupiedRooms = mockRooms.filter(r => r.status === 'Occupied').length;
    const totalBeds = mockRooms.reduce((a, r) => a + r.capacity, 0);
    const occupiedBeds = mockRooms.reduce((a, r) => a + r.beds.filter(b => b.status === 'Occupied').length, 0);
    const monthlyIncome = mockPayments.reduce((a, p) => a + p.paid, 0);
    const pending = mockPayments.reduce((a, p) => a + p.pending, 0);
    const todayVisitors = mockVisitors.filter(v => v.status !== 'Rejected').length;

    const dashCards = [
        {
            key: 'rooms',
            label: 'Rooms',
            icon: MdMeetingRoom,
            color: '#6366f1',
            gradient: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
            description: 'Room & Bed Overview',
            overview: [
                { label: 'Total Rooms', value: totalRooms, icon: MdMeetingRoom, color: '#6366f1' },
                { label: 'Available Rooms', value: availRooms, icon: MdCheckCircle, color: '#10b981' },
                { label: 'Occupied Beds', value: occupiedBeds, icon: MdBed, color: '#ef4444' },
                { label: 'Total Beds', value: totalBeds, icon: MdBed, color: '#8b5cf6' },
            ],
        },
        {
            key: 'staff',
            label: 'Staff',
            icon: MdSupervisorAccount,
            color: '#10b981',
            gradient: 'linear-gradient(135deg, #10b981, #06b6d4)',
            description: 'Staff Overview',
            overview: [
                { label: 'Total Staff', value: mockStaff.length, icon: MdSupervisorAccount, color: '#10b981' },
            ],
        },
        {
            key: 'payments',
            label: 'Payments',
            icon: MdPayment,
            color: '#f59e0b',
            gradient: 'linear-gradient(135deg, #f59e0b, #ef4444)',
            description: 'Payment Overview',
            overview: [
                { label: 'Monthly Income', value: `₹${(monthlyIncome / 1000).toFixed(0)}k`, icon: MdPayment, color: '#10b981' },
                { label: 'Pending Payments', value: `₹${(pending / 1000).toFixed(1)}k`, icon: MdWarning, color: '#ef4444' },
            ],
        },
        {
            key: 'tenants',
            label: 'Tenants',
            icon: MdPeople,
            color: '#ec4899',
            gradient: 'linear-gradient(135deg, #ec4899, #8b5cf6)',
            description: 'Tenant Overview',
            overview: [
                { label: 'Total Tenants', value: mockTenants.length, icon: MdPeople, color: '#ec4899' },
                { label: 'Visitors Today', value: todayVisitors, icon: MdPeople, color: '#6366f1' },
            ],
        },
    ];

    const toggle = (key) => setExpanded(prev => prev === key ? null : key);

    return (
        <DashboardLayout title="Dashboard">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>

                {/* Welcome Banner */}
                <div style={{
                    background: 'var(--gradient-primary)',
                    borderRadius: 'var(--radius-md)',
                    padding: '1.75rem 2rem',
                    color: '#fff',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    flexWrap: 'wrap',
                    gap: '1rem',
                }}>
                    <div>
                        <h3 style={{ color: '#fff', marginBottom: '0.35rem' }}>Good Day, Admin! 👋</h3>
                        <p style={{ color: 'rgba(255,255,255,0.8)', margin: 0, fontSize: '0.9rem' }}>
                            Here's your PG at a glance — {new Date().toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                        </p>
                    </div>
                    <div style={{ textAlign: 'center' }}>
                        <div style={{ fontSize: '1.75rem', fontWeight: 800 }}>{Math.round((occupiedRooms / totalRooms) * 100)}%</div>
                        <div style={{ fontSize: '0.75rem', opacity: 0.8 }}>Occupancy Rate</div>
                    </div>
                </div>

                {/* 4 Dashboard Cards */}
                <div>
                    <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '1rem', letterSpacing: '0.04em', textTransform: 'uppercase', fontWeight: 600 }}>
                        Click a card to view summary
                    </p>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.25rem' }}>
                        {dashCards.map(card => {
                            const Icon = card.icon;
                            const isOpen = expanded === card.key;
                            return (
                                <div
                                    key={card.key}
                                    className="card"
                                    onClick={() => toggle(card.key)}
                                    style={{
                                        padding: '1.5rem',
                                        cursor: 'pointer',
                                        transition: 'transform 0.18s, box-shadow 0.18s',
                                        borderTop: `3px solid ${card.color}`,
                                        position: 'relative',
                                        overflow: 'hidden',
                                        outline: isOpen ? `2px solid ${card.color}40` : 'none',
                                        outlineOffset: '2px',
                                    }}
                                    onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = `0 8px 28px ${card.color}25`; }}
                                    onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = ''; }}
                                >
                                    {/* Background circle accent */}
                                    <div style={{ position: 'absolute', top: -20, right: -20, width: 80, height: 80, borderRadius: '50%', background: `${card.color}10`, pointerEvents: 'none' }} />

                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                                        <div style={{ width: 48, height: 48, borderRadius: 'var(--radius)', background: card.gradient, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                            <Icon size={24} color="#fff" />
                                        </div>
                                        <div style={{ color: isOpen ? card.color : 'var(--text-muted)', transition: 'color 0.2s' }}>
                                            {isOpen ? <MdKeyboardArrowDown size={22} /> : <MdKeyboardArrowRight size={22} />}
                                        </div>
                                    </div>

                                    <div style={{ fontWeight: 800, fontSize: '1.1rem', marginBottom: '0.2rem', color: 'var(--text-primary)' }}>{card.label}</div>
                                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{card.description}</div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Expanded Overview Panel */}
                {expanded && (() => {
                    const card = dashCards.find(c => c.key === expanded);
                    return (
                        <div
                            className="card"
                            style={{
                                padding: '1.75rem',
                                borderLeft: `4px solid ${card.color}`,
                                animation: 'fadeInDown 0.22s ease',
                            }}
                        >
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
                                <div style={{ width: 40, height: 40, borderRadius: 'var(--radius)', background: card.gradient, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                                    <card.icon size={20} color="#fff" />
                                </div>
                                <div>
                                    <h4 style={{ margin: 0, fontSize: '1rem', fontWeight: 700 }}>{card.label} Summary</h4>
                                    <p style={{ margin: 0, fontSize: '0.75rem', color: 'var(--text-muted)' }}>{card.description}</p>
                                </div>
                            </div>

                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '1rem' }}>
                                {card.overview.map(item => {
                                    const ItemIcon = item.icon;
                                    return (
                                        <div
                                            key={item.label}
                                            style={{
                                                padding: '1.25rem',
                                                borderRadius: 'var(--radius)',
                                                background: 'var(--bg-secondary)',
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '0.875rem',
                                                border: '1px solid var(--border)',
                                            }}
                                        >
                                            <div style={{ width: 42, height: 42, borderRadius: 'var(--radius)', background: `${item.color}18`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                                                <ItemIcon size={20} color={item.color} />
                                            </div>
                                            <div>
                                                <div style={{ fontSize: '1.6rem', fontWeight: 800, color: item.color, lineHeight: 1 }}>{item.value}</div>
                                                <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>{item.label}</div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    );
                })()}

            </div>

            <style>{`
                @keyframes fadeInDown {
                    from { opacity: 0; transform: translateY(-10px); }
                    to   { opacity: 1; transform: translateY(0); }
                }
            `}</style>
        </DashboardLayout>
    );
}
