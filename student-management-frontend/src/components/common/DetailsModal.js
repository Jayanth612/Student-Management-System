// src/components/common/DetailsModal.js
import React from "react";
import "./DetailsModal.css";

export default function DetailsModal({ isOpen, onClose, title, details }) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <button onClick={onClose} className="close-btn">
          ✖
        </button>

        <h2 className="modal-title">{title}</h2>

        <div className="modal-details">
          {Object.entries(details).map(([key, value]) => (
            <div key={key} className="detail-row">
              <span className="detail-key">{key}</span>
              <span className="detail-value">{value || "—"}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
