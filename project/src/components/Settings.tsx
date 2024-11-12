import React from 'react';

interface SettingsProps {
  dailyGoal: number;
  setDailyGoal: (goal: number) => void;
  cupSize: number;
  setCupSize: (size: number) => void;
  onClose: () => void;
}

export const Settings: React.FC<SettingsProps> = ({
  dailyGoal,
  setDailyGoal,
  cupSize,
  setCupSize,
  onClose,
}) => {
  return (
    <div className="mb-8 p-6 bg-blue-50 rounded-xl">
      <h2 className="text-xl font-semibold text-blue-800 mb-4">Settings</h2>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Daily Goal (ml)
          </label>
          <input
            type="number"
            value={dailyGoal}
            onChange={(e) => setDailyGoal(Math.max(0, parseInt(e.target.value) || 0))}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            step="100"
            min="0"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Cup Size (ml)
          </label>
          <input
            type="number"
            value={cupSize}
            onChange={(e) => setCupSize(Math.max(0, parseInt(e.target.value) || 0))}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            step="50"
            min="0"
          />
        </div>
      </div>
    </div>
  );
};