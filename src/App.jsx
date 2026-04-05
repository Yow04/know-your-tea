import React, { useState, useCallback } from 'react';
import LeafBackground from './components/bg-temp';
import UploadZone from './components/up-zone';
import ResultCard from './components/result-card';
import { mockPredictDisease } from './Api';
import './App.css';

export default function App() {
  const [preview, setPreview] = useState(null);
  const [result, setResult]   = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError]     = useState(null);

  const handleFileSelect = useCallback((file) => {
    setPreview(URL.createObjectURL(file));
    setResult(null);
    setError(null);
  }, []);

  const handleAnalyze = useCallback(async () => {
    if (!preview) return;
    setIsLoading(true);
    setError(null);
    setResult(null);
    try {
      // Ganti mockPredictDisease dengan predictDisease(file) saat backend siap
      const data = await mockPredictDisease();
      setResult(data);
    } catch {
      setError('Gagal menghubungi server. Pastikan backend berjalan.');
    } finally {
      setIsLoading(false);
    }
  }, [preview]);

  const handleReset = useCallback(() => {
    setPreview(null);
    setResult(null);
    setError(null);
    setIsLoading(false);
  }, []);

  return (
    <div className="app">
      <LeafBackground />

      <div className="app-content">
        <div className="badge">
          <span className="badge-dot" />
          <span className="badge-text">ConvNeXt-T powered</span>
        </div>

        <div className="heading-block">
          <h1 className="heading-main">
            Deteksi penyakit
            <br />
            <span className="heading-accent">daun teh</span>{' '}
            <span className="heading-tail">dini</span>
          </h1>
          <p className="heading-sub">
            Upload foto daun teh Anda dan sistem akan menganalisis potensi penyakit secara otomatis dalam hitungan detik.
          </p>
        </div>

        <div className="upload-zone-wrap">
          <UploadZone onFileSelect={handleFileSelect} preview={preview} />
          {error && <p className="error-msg">{error}</p>}
          <button
            type="button"
            className={`btn-analyze ${isLoading ? 'loading' : ''}`}
            onClick={handleAnalyze}
            disabled={!preview || isLoading}
          >
            {isLoading ? (
              <>
                <span className="spinner" />
                Menganalisis...
              </>
            ) : (
              'Analisis gambar'
            )}
          </button>
          {(preview || result) && !isLoading && (
            <button type="button" className="btn-reset" onClick={handleReset}>
              Mulai ulang
            </button>
          )}
        </div>

        <ResultCard result={result} isLoading={isLoading} />
      </div>
    </div>
  );
}