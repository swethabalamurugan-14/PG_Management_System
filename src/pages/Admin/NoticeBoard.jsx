import { useState } from 'react';
import DashboardLayout from '../../components/DashboardLayout';
import { mockNotices } from '../../data/mockData';
import { MdAdd, MdEdit, MdDelete } from 'react-icons/md';
import Modal, { ModalBody, ModalFooter } from '../../components/Modal';
import ConfirmDialog from '../../components/ConfirmDialog';
import toast from 'react-hot-toast';

const categoryColors = { Rent: '#6366f1', Maintenance: '#f59e0b', Event: '#10b981', Rules: '#ef4444', Holiday: '#8b5cf6' };

export default function NoticeBoard() {
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
        <DashboardLayout title="Notice Board">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <div className="page-header">
                    <div><h2 className="page-title">Notice Board</h2><p className="page-subtitle">{notices.length} active notices</p></div>
                    <button className="btn btn-primary" onClick={openAdd}><MdAdd size={18} />Post Notice</button>
                </div>
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
            </div>
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
            <ConfirmDialog open={!!deleteId} onClose={() => setDeleteId(null)} onConfirm={() => { setNotices(notices.filter(n => n.id !== deleteId)); toast.success('Notice deleted'); }} title="Delete Notice" message="Delete this notice permanently?" />
        </DashboardLayout>
    );
}
