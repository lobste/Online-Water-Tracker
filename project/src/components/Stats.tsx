import React from 'react';
import { Trophy, Droplet } from 'lucide-react';

interface StatsProps {
  waterAmount: number;
  dailyGoal: number;
}

export const Stats: React.FC<StatsProps> = ({ waterAmount, dailyGoal }) => {
  const cupsCount = Math.floor(waterAmount / 200);
  const progress = (waterAmount / dailyGoal) * 100;

  return (
    <div className="mb-8 p-6 bg-blue-50 rounded-xl">
      <h2 className="text-xl font-semibold text-blue-800 mb-4">Today's Progress</h2>
      
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white p-4 rounded-lg">
          <div className="flex items-center gap-2 text-blue-600 mb-2">
            <Droplet className="h-5 w-5" />
            <span className="font-medium">Water Intake</span>
          </div>
          <p className="text-2xl font-bold text-gray-800">{waterAmount}ml</p>
        </div>

        <div className="bg-white p-4 rounded-lg">
          <div className="flex items-center gap-2 text-blue-600 mb-2">
            <Trophy className="h-5 w-5" />
            <span className="font-medium">Goal Progress</span>
          </div>
          <p className="text-2xl font-bold text-gray-800">{Math.round(progress)}%</p>
        </div>
      </div>

      <div className="mt-4 text-center">
        <p className="text-sm text-gray-600">
          You've had {cupsCount} cup{cupsCount !== 1 ? 's' : ''} of water today
        </p>
      </div>
    </div>
  );
};