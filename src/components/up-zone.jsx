import React, { useCallback, useState } from 'react';
import './up-zone.css';

export default function UploadZone({ onFileSelect, preview }) {
  const [isDragging, setIsDragging] = useState(false);

  const handleDragOver = useCallback((e) => { e.preventDefault(); setIsDragging(true); }, []);
  const handleDragLeave = useCallback(() => setIsDragging(false), []);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith('image/')) onFileSelect(file);
  }, [onFileSelect]);

  const handleInputChange = useCallback((e) => {
    const file = e.target.files?.[0];
    if (file) onFileSelect(file);
  }, [onFileSelect]);

  const openDialog = () => document.getElementById('file-input').click();

  return (
    <div
      className={`upload-zone ${isDragging ? 'dragging' : ''} ${preview ? 'has-preview' : ''}`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onClick={() => !preview && openDialog()}
      role="button"
      tabIndex={0}
      aria-label="Area upload gambar daun teh"
      onKeyDown={(e) => e.key === 'Enter' && openDialog()}
    >
      <input
        id="file-input"
        type="file"
        accept="image/jpeg,image/png,image/webp"
        style={{ display: 'none' }}
        onChange={handleInputChange}
      />

      {preview ? (
        <div className="preview-container">
          <img src={preview} alt="Preview daun teh" className="preview-img" />
          <button className="change-btn" onClick={(e) => { e.stopPropagation(); openDialog(); }}>
            <UploadIcon size={13} /> Ganti gambar
          </button>
        </div>
      ) : (
        <div className="upload-placeholder">
          <div className="upload-icon-ring"><UploadIcon size={22} /></div>
          <p className="upload-label">{isDragging ? 'Lepaskan di sini' : 'Seret foto ke sini'}</p>
          <p className="upload-hint">atau klik untuk pilih file · JPG, PNG hingga 10MB</p>
        </div>
      )}
    </div>
  );
}

function UploadIcon({ size = 22 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
      <polyline points="17 8 12 3 7 8" />
      <line x1="12" y1="3" x2="12" y2="15" />
    </svg>
  );
}