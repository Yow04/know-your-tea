import React from 'react';
import './history-sect.css';

export default function HistorySect({ history, onClose, onClear }) {
  // tutup modal saat klik backdrop
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <div className="modal-backdrop" onClick={handleBackdropClick}>
      <div className="modal">
        <div className="modal-header">
          <h2 className="modal-title">Riwayat Analisis</h2>
          <button className="modal-close" onClick={onClose} aria-label="Tutup">✕</button>
        </div>

        <div className="modal-body">
          {history.length === 0 ? (
            <p className="modal-empty">Belum ada riwayat analisis.</p>
          ) : (
            <ul className="history-list">
              {history.map((item) => (
                <li key={item.id} className="history-item">
                  <img
                    src={item.preview}
                    alt={item.disease}
                    className="history-thumb"
                  />
                  <div className="history-info">
                    <span className="history-label">Prediksi</span>
                    <span className="history-disease">{item.disease}</span>
                    <span className="history-confidence">
                      {Math.round(item.confidence * 100)}% confidence
                    </span>
                  </div>
                  <span className="history-time">{item.time}</span>
                </li>
              ))}
            </ul>
          )}
        </div>

        {history.length > 0 && (
          <div className="modal-footer">
            <button className="btn-clear" onClick={onClear}>
              Hapus semua riwayat
            </button>
          </div>
        )}
      </div>
    </div>
  );
}