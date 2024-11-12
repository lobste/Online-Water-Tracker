import React from 'react';
import { Wave } from './Wave';

interface WaterProgressProps {
  progress: number;
}

export const WaterProgress: React.FC<WaterProgressProps> = ({ progress }) => {
  return (
    <div className="relative w-48 h-48 mx-auto">
      <div className="absolute inset-0 rounded-full border-4 border-blue-200">
        <div className="absolute inset-0 rounded-full overflow-hidden">
          <Wave progress={progress} />
        </div>
      </div>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-3xl font-bold text-blue-600">{Math.round(progress)}%</span>
      </div>
    </div>
  );
};