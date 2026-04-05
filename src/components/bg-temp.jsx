import React from 'react';
import './bg-temp.css';

export default function LeafBackground() {
  return (
    <div className="leaf-bg" aria-hidden="true">
      <svg className="leaf-svg" viewBox="0 0 900 700" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="blobGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#4ade80" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#166534" stopOpacity="0.2" />
          </linearGradient>
          <linearGradient id="blobGrad2" x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#86efac" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#14532d" stopOpacity="0.15" />
          </linearGradient>
        </defs>
        <g className="leaf-blobs" aria-hidden="true">
          <ellipse cx="140" cy="320" rx="200" ry="260" fill="url(#blobGrad1)" opacity="0.35" />
          <ellipse cx="320" cy="520" rx="240" ry="200" fill="url(#blobGrad2)" opacity="0.28" />
          <ellipse cx="80" cy="120" rx="120" ry="100" fill="#4ade80" opacity="0.12" />
          <rect x="-20" y="380" width="340" height="280" rx="120" fill="#22c55e" opacity="0.08" transform="rotate(-8 150 520)" />
        </g>
        <g className="leaf leaf-1">
          <path d="M-80,600 Q120,100 380,80 Q460,70 500,160 Q420,320 200,450 Q80,520 -80,600Z" fill="#1e3d24" />
          <path d="M-80,600 Q200,350 380,80" fill="none" stroke="#2a5c35" strokeWidth="2" opacity="0.6" />
          <path d="M100,480 Q220,340 340,180" fill="none" stroke="#2a5c35" strokeWidth="1" opacity="0.4" />
          <path d="M60,520 Q180,380 300,220" fill="none" stroke="#2a5c35" strokeWidth="1" opacity="0.3" />
        </g>
        <g className="leaf leaf-2">
          <path d="M100,700 Q300,400 520,320 Q600,290 640,360 Q580,500 400,600 Q280,660 100,700Z" fill="#245230" />
          <path d="M100,700 Q370,510 520,320" fill="none" stroke="#2e6b3e" strokeWidth="1.5" opacity="0.5" />
        </g>
        <g className="leaf leaf-3">
          <path d="M-40,420 Q60,280 200,260 Q250,255 260,300 Q220,380 120,420 Q60,445 -40,420Z" fill="#1a3a1e" />
          <path d="M-40,420 Q130,340 200,260" fill="none" stroke="#245230" strokeWidth="1" opacity="0.5" />
        </g>
        <g className="leaf leaf-4">
          <path d="M200,700 Q280,500 360,380 Q400,320 460,280 Q500,250 540,240" fill="none" stroke="#2a5c35" strokeWidth="3" strokeLinecap="round" opacity="0.7" />
          <path d="M360,380 Q320,360 260,370" fill="none" stroke="#2a5c35" strokeWidth="1.5" strokeLinecap="round" opacity="0.4" />
          <path d="M410,330 Q370,310 320,325" fill="none" stroke="#2a5c35" strokeWidth="1.5" strokeLinecap="round" opacity="0.4" />
        </g>
        <g className="leaf leaf-5">
          <ellipse cx="540" cy="235" rx="22" ry="34" fill="#1e3d24" transform="rotate(-30 540 235)" />
          <ellipse cx="528" cy="228" rx="14" ry="24" fill="#245230" transform="rotate(-20 528 228)" />
        </g>
      </svg>
      <div className="leaf-overlay" />
    </div>
  );
}