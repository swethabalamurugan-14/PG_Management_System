import { MdClose } from 'react-icons/md';

export default function Modal({ open, onClose, title, children, size = 'md' }) {
    if (!open) return null;
    const maxW = size === 'lg' ? 780 : size === 'sm' ? 380 : 520;
    return (
        <div className="modal-overlay" onClick={e => e.target === e.currentTarget && onClose()}>
            <div className="modal-box" style={{ maxWidth: maxW }}>
                <div className="modal-header">
                    <h4 style={{ margin: 0 }}>{title}</h4>
                    <button className="btn btn-icon btn-ghost" onClick={onClose}><MdClose size={20} /></button>
                </div>
                {children}
            </div>
        </div>
    );
}

export function ModalBody({ children }) {
    return <div className="modal-body">{children}</div>;
}

export function ModalFooter({ children }) {
    return <div className="modal-footer">{children}</div>;
}
