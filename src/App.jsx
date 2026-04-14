import React, { useState, useCallback, useEffect } from 'react';
import LeafBackground from './components/bg-temp';
import UploadZone from './components/up-zone';
import ResultCard from './components/result-card';
import { predictDisease, healthCheck } from './Api';
import './App.css';

const DISEASE_INFO = {
  'Tea algal leaf spot': 'Disebabkan oleh alga Cephaleuros virescens. Ditandai dengan bercak oranye-kemerahan pada permukaan daun.',
  'Brown Blight'       : 'Disebabkan oleh jamur Colletotrichum camelliae. Bercak coklat dengan tepi kuning yang meluas cepat.',
  'Gray Blight'        : 'Disebabkan oleh jamur Pestalotiopsis theae. Bercak abu-abu dengan tepi coklat pada daun.',
  'Helopeltis'         : 'Kerusakan akibat serangan hama Helopeltis. Bercak coklat kehitaman dengan titik di tengah.',
  'Red spider'         : 'Serangan tungau Oligonychus coffeae. Daun tampak kemerahan dan kusam akibat hisapan tungau.',
  'Green mirid bug'    : 'Kerusakan akibat hama Helopeltis bradyi. Bercak nekrotik coklat pada pucuk dan daun muda.',
  'Healthy leaf'       : 'Daun teh dalam kondisi sehat. Tidak ditemukan tanda-tanda penyakit.',
};
export default function App() {
  const [preview, setPreview] = useState(null);
  const [file, setFile] = useState(null);
  const [result, setResult]   = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError]     = useState(null);

  useEffect(() => {
    healthCheck()
      .then(res => console.log('Backend terhubung:', res))
      .catch(err => console.error('Backend gagal:', err.message))
  }, [])

  const handleFileSelect = useCallback((selectedFile) => {
    setFile(selectedFile);
    setPreview(URL.createObjectURL(selectedFile));
    setResult(null);
    setError(null);
  }, []);

  const handleAnalyze = useCallback(async () => {
    if (!file) return;
    setIsLoading(true);
    setError(null);
    setResult(null);
    try {
      const data = await predictDisease(file);
      console.log('Response backend:', data);
      setResult({
        disease : data.predicted_class.replace(/^\d+\.\s*/, ''),
        confidence: data.confidence,
        inference_time_ms: data.inference_time_ms,
        topPredictions: data.top_k.map(item => ({
          label: item.class_name.replace(/^\d+\.\s*/, ''),
          score: item.confidence,})),
          description: DISEASE_INFO[data.predicted_class.replace(/^\d+\.\s*/, '')] || 'Deskripsi tidak tersedia.'
      })
    } catch {
      setError('Gagal menghubungi server. Pastikan backend berjalan.');
    } finally {
      setIsLoading(false);
    }
  }, [file]);

  const handleReset = useCallback(() => {
    setPreview(null);
    setFile(null);
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