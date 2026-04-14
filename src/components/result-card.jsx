import React, { useEffect, useState } from 'react';
import './result-card.css';


export default function ResultCard({ result, isLoading }) {
  const [animated, setAnimated] = useState(false);

  useEffect(() => {
    if (result) {
      const t = setTimeout(() => setAnimated(true), 100);
      return () => clearTimeout(t);
    }
    setAnimated(false);
  }, [result]);

  if (isLoading) {
    return (
      <div className="result-card">
        <div className="loading-row">
          <div className="loading-pulse loading-pulse--label" />
          <div className="loading-pulse loading-pulse--pill" />
        </div>
        <div className="loading-pulse loading-pulse--title" />
        <div className="conf-bar-row conf-bar-row--loading">
          <div className="loading-pulse loading-pulse--bar" />
          <div className="loading-pulse loading-pulse--pct" />
        </div>
        <div className="result-tags result-tags--loading">
          <div className="loading-pulse loading-pulse--tag" />
          <div className="loading-pulse loading-pulse--tag" />
        </div>
      </div>
    );
  }

  if (!result) return null;

  const { disease, confidence, inference_time_ms, description, topPredictions } = result;
  const pct = Math.round(confidence * 100);

  return (
    <div className="result-card result-card--visible">
      <div className="result-header">
        <span className="result-label">Hasil deteksi</span>
        <span className="confidence-pill">{pct}% confidence</span>
      </div>

      <h2 className="result-disease-name">{disease}</h2>

      <div className="conf-bar-row">
        <div className="conf-bar-track">
          <div
            className="conf-bar-fill"
            style={{
              width: animated ? `${pct}%` : '0%',
              background: 'linear-gradient(90deg, var(--accent-400), var(--accent-300))',
            }}
          />
        </div>
        <span className="conf-bar-pct">{pct}%</span>
      </div>

      {topPredictions?.length > 1 && (
        <div className="top-predictions">
          {topPredictions.slice(0, 3).map((pred, i) => (
            <div key={i} className="pred-row">
              <span className="pred-name">{pred.label}</span>
              <div className="pred-bar-track">
                <div
                  className="pred-bar-fill"
                  style={{
                    width: animated ? `${Math.round(pred.score * 100)}%` : '0%',
                    opacity: i === 0 ? 1 : 0.5,
                  }}
                />
              </div>
              <span className="pred-pct">{Math.round(pred.score * 100)}%</span>
            </div>
          ))}
        </div>
      )}

      {description && <p className="result-description">{description}</p>}

      <div className="result-tags">
        {disease && <span className="result-tag">{disease}</span>}
        <span className="result-tag">{Math.round(inference_time_ms)} ms</span>
      </div>
    </div>
  );
}
