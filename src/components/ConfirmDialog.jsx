import Modal, { ModalBody, ModalFooter } from './Modal';
import { MdWarning } from 'react-icons/md';

export default function ConfirmDialog({ open, onClose, onConfirm, title = 'Confirm Action', message = 'Are you sure?', variant = 'danger' }) {
    return (
        <Modal open={open} onClose={onClose} title={title} size="sm">
            <ModalBody>
                <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                    <div style={{ width: 44, height: 44, borderRadius: 'var(--radius)', background: variant === 'danger' ? 'var(--danger-light)' : 'var(--warning-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                        <MdWarning size={22} color={variant === 'danger' ? 'var(--danger)' : 'var(--warning)'} />
                    </div>
                    <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6 }}>{message}</p>
                </div>
            </ModalBody>
            <ModalFooter>
                <button className="btn btn-ghost btn-sm" onClick={onClose}>Cancel</button>
                <button className={`btn btn-${variant} btn-sm`} onClick={() => { onConfirm(); onClose(); }}>Confirm</button>
            </ModalFooter>
        </Modal>
    );
}
