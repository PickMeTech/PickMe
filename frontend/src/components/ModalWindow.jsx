import React from "react";
import "@/styles/ModalWindow.css";

const ModalWindow = ({ open, onClose, title, children }) => {
    if (!open) return null;

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-window" onClick={e => e.stopPropagation()}>
                <div className="modal-header">
                    <h5 className="modal-title">{title}</h5>
                    <button className="btn-close" onClick={onClose} aria-label="Close" />
                </div>
                <div className="modal-body">{children}</div>
            </div>
        </div>
    );
};

export default ModalWindow;