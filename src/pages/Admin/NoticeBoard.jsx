import { useState } from 'react';
import DashboardLayout from '../../components/DashboardLayout';
import { mockNotices, mockNotifications } from '../../data/mockData';
import { MdAdd, MdEdit, MdDelete, MdNotifications, MdPayment, MdReport, MdPersonPin, MdSpeakerNotes, MdForum } from 'react-icons/md';
import Modal, { ModalBody, ModalFooter } from '../../components/Modal';
import ConfirmDialog from '../../components/ConfirmDialog';
import toast from 'react-hot-toast';

const categoryColors = { Rent: '#6366f1', Maintenance: '#f59e0b', Event: '#10b981', Rules: '#ef4444', Holiday: '#8b5cf6' };
const notifTypeIcon = { payment: MdPayment, complaint: MdReport, visitor: MdPersonPin, notice: MdSpeakerNotes };
const notifTypeColor = { payment: '#6366f1', complaint: '#ef4444', visitor: '#10b981', notice: '#f59e0b' };

const TABS = [
    { key: 'notifications', label: 'Notifications', icon: MdNotifications },
    { key: 'notices', label: 'Notice Board', icon: MdSpeakerNotes },
];

export default function Communication() {
    const [activeTab, setActiveTab] = useState('notifications');

    // Notice Board state
    const [notices, setNotices] = useState(mockNotices);
    const [modal, setModal] = useState(false);
    const [editNotice, setEditNotice] = useState(null);
    const [deleteId, setDeleteId] = useState(null);
    const [form, setForm] = useState({ title: '', category: 'Rent', content: '', priority: 'Medium' });

    const openAdd = () => { setEditNotice(null); setForm({ title: '', category: 'Rent', content: '', priority: 'Medium' }); setModal(true); };
    const openEdit = (n) => { setEditNotice(n); setForm({ title: n.title, category: n.category, content: n.content, priority: n.priority }); setModal(true); };

    const handleSave = () => {
        if (!form.title || !form.content) { toast.error('Title and content required'); return; }
        if (editNotice) {
            setNotices(notices.map(n => n.id === editNotice.id ? { ...n, ...form } : n));
            toast.success('Notice updated');
        } else {
            const newId = `N${String(notices.length + 1).padStart(3, '0')}`;
            setNotices([{ id: newId, ...form, date: new Date().toISOString().split('T')[0], author: 'Admin' }, ...notices]);
            toast.success('Notice posted');
        }
        setModal(false);
    };

    return (
        <DashboardLayout title="Communication">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>

                {/* Page Header */}
                <div className="page-header">
                    <div>
                        <h2 className="page-title">Communication</h2>
                        <p className="page-subtitle">Manage notifications and notice board</p>
                    </div>
                    {activeTab === 'notices' && (
                        <button className="btn btn-primary" onClick={openAdd}><MdAdd size={18} />Post Notice</button>
                    )}
                </div>

                {/* Tabs */}
                <div style={{ display: 'flex', gap: '0.25rem', background: 'var(--bg-secondary)', borderRadius: 'var(--radius)', padding: '0.3rem', maxWidth: 400 }}>
                    {TABS.map(tab => {
                        const Icon = tab.icon;
                        return (
                            <button
                                key={tab.key}
                                onClick={() => setActiveTab(tab.key)}
                                style={{
                                    flex: 1,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    gap: '0.45rem',
                                    padding: '0.6rem 1rem',
                                    borderRadius: 'calc(var(--radius) - 2px)',
                                    border: 'none',
                                    cursor: 'pointer',
                                    fontWeight: 600,
                                    fontSize: '0.875rem',
                                    transition: 'all 0.2s',
                                    background: activeTab === tab.key ? 'var(--surface)' : 'transparent',
                                    color: activeTab === tab.key ? 'var(--primary-500)' : 'var(--text-muted)',
                                    boxShadow: activeTab === tab.key ? 'var(--shadow-sm)' : 'none',
                                }}
                            >
                                <Icon size={17} />
                                {tab.label}
                                {tab.key === 'notifications' && (
                                    <span style={{
                                        background: 'var(--primary-500)',
                                        color: '#fff',
                                        borderRadius: 99,
                                        fontSize: '0.65rem',
                                        fontWeight: 700,
                                        padding: '1px 6px',
                                        minWidth: 18,
                                        textAlign: 'center',
                                    }}>
                                        {mockNotifications.filter(n => !n.read).length}
                                    </span>
                                )}
                            </button>
                        );
                    })}
                </div>

                {/* ── NOTIFICATIONS TAB ── */}
                {activeTab === 'notifications' && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                        {mockNotifications.map(n => {
                            const Icon = notifTypeIcon[n.type] || MdNotifications;
                            const color = notifTypeColor[n.type] || '#6366f1';
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
                )}

                {/* ── NOTICE BOARD TAB ── */}
                {activeTab === 'notices' && (
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.25rem' }}>
                        {notices.map(n => (
                            <div key={n.id} className="card" style={{ padding: '1.5rem', borderTop: `4px solid ${categoryColors[n.category] || '#6366f1'}` }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.75rem' }}>
                                    <div>
                                        <span className="badge" style={{ background: `${categoryColors[n.category]}20`, color: categoryColors[n.category], marginBottom: '0.5rem' }}>{n.category}</span>
                                        <h5>{n.title}</h5>
                                    </div>
                                    <div style={{ display: 'flex', gap: '0.3rem', flexShrink: 0 }}>
                                        <button className="btn btn-icon btn-ghost" onClick={() => openEdit(n)}><MdEdit size={17} color="var(--primary-500)" /></button>
                                        <button className="btn btn-icon btn-ghost" onClick={() => setDeleteId(n.id)}><MdDelete size={17} color="var(--danger)" /></button>
                                    </div>
                                </div>
                                <p style={{ fontSize: '0.875rem', lineHeight: 1.65, marginBottom: '1rem' }}>{n.content}</p>
                                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                                    <span>📅 {n.date}</span><span>👤 {n.author}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Notice Board Modal */}
            <Modal open={modal} onClose={() => setModal(false)} title={editNotice ? 'Edit Notice' : 'Post New Notice'}>
                <ModalBody>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        <div className="form-group"><label className="form-label">Title *</label><input className="form-control" placeholder="Notice title" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} /></div>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                            <div className="form-group"><label className="form-label">Category</label>
                                <select className="form-control" value={form.category} onChange={e => setForm({ ...form, category: e.target.value })}><option>Rent</option><option>Maintenance</option><option>Event</option><option>Rules</option><option>Holiday</option></select>
                            </div>
                            <div className="form-group"><label className="form-label">Priority</label>
                                <select className="form-control" value={form.priority} onChange={e => setForm({ ...form, priority: e.target.value })}><option>High</option><option>Medium</option><option>Low</option></select>
                            </div>
                        </div>
                        <div className="form-group"><label className="form-label">Content *</label><textarea className="form-control" rows={4} placeholder="Notice content..." value={form.content} onChange={e => setForm({ ...form, content: e.target.value })} /></div>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <button className="btn btn-ghost btn-sm" onClick={() => setModal(false)}>Cancel</button>
                    <button className="btn btn-primary btn-sm" onClick={handleSave}>{editNotice ? 'Update' : 'Post Notice'}</button>
                </ModalFooter>
            </Modal>

            <ConfirmDialog open={!!deleteId} onClose={() => setDeleteId(null)} onConfirm={() => { setNotices(notices.filter(n => n.id !== deleteId)); toast.success('Notice deleted'); setDeleteId(null); }} title="Delete Notice" message="Delete this notice permanently?" />
        </DashboardLayout>
    );
}
