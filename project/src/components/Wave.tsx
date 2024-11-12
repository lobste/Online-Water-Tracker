import React from 'react';

interface WaveProps {
  progress: number;
}

export const Wave: React.FC<WaveProps> = ({ progress }) => {
  const height = 100 - progress;

  return (
    <div
      className="absolute inset-0 bg-blue-400 transition-all duration-500 ease-in-out"
      style={{
        top: `${height}%`,
        background: `linear-gradient(180deg, 
          rgba(96, 165, 250, 0.7) 0%,
          rgba(59, 130, 246, 0.8) 100%)`,
      }}
    >
      <div className="absolute inset-0 opacity-50">
        <div className="relative w-[200%] h-full left-[-50%] animate-wave">
          <svg
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            className="absolute w-[50%] h-full"
            style={{ animation: 'moveWave 3s ease-in-out infinite' }}
          >
            <path
              d="M0 50 Q 15 40, 30 50 T 60 50 T 90 50 T 120 50 V 100 H 0 Z"
              fill="currentColor"
            />
          </svg>
        </div>
      </div>
    </div>
  );
};