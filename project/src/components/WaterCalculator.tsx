import React, { useState } from 'react';
import { Calculator } from 'lucide-react';

interface WaterCalculatorProps {
  onCalculate: (amount: number) => void;
}

export const WaterCalculator: React.FC<WaterCalculatorProps> = ({ onCalculate }) => {
  const [weight, setWeight] = useState<string>('');
  const [unit, setUnit] = useState<'kg' | 'lbs'>('kg');

  const calculateWaterIntake = () => {
    const weightNum = parseFloat(weight);
    if (isNaN(weightNum) || weightNum <= 0) return;

    const weightInKg = unit === 'lbs' ? weightNum * 0.453592 : weightNum;
    const recommendedMl = Math.round(weightInKg * 35);
    onCalculate(recommendedMl);
  };

  return (
    <div className="bg-blue-50 p-6 rounded-xl mb-6">
      <div className="flex items-center gap-2 mb-4">
        <Calculator className="h-5 w-5 text-blue-600" />
        <h3 className="text-lg font-semibold text-blue-800">Water Intake Calculator</h3>
      </div>

      <div className="space-y-4">
        <div className="flex gap-4">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Weight
            </label>
            <input
              type="number"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter your weight"
              min="0"
              step="0.1"
            />
          </div>
          <div className="w-24">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Unit
            </label>
            <select
              value={unit}
              onChange={(e) => setUnit(e.target.value as 'kg' | 'lbs')}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="kg">kg</option>
              <option value="lbs">lbs</option>
            </select>
          </div>
        </div>

        <button
          onClick={calculateWaterIntake}
          disabled={!weight || parseFloat(weight) <= 0}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          Calculate Recommended Intake
        </button>

        <p className="text-sm text-gray-600">
          Based on the recommended daily intake of 35ml per kg of body weight
        </p>
      </div>
    </div>
  );
};
