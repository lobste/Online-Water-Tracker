import React, { useState, useEffect } from 'react';
import { Droplet, Plus, Minus, RotateCcw, Settings, Trophy, ChevronUp, ChevronDown, Bell } from 'lucide-react';
import { WaterProgress } from './components/WaterProgress';
import { Settings as SettingsPanel } from './components/Settings';
import { Stats } from './components/Stats';
import { NotificationSettings } from './components/NotificationSettings';
import { useNotifications } from './hooks/useNotifications';
import { Helmet } from 'react-helmet'; // Helmet'ı import et
import { Footer } from './components/Footer';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { About } from './pages/About';
import { HowToUse } from './pages/HowToUse';
import { Benefits } from './pages/Benefits';

function App() {

  const [waterAmount, setWaterAmount] = useState(0);
  const [dailyGoal, setDailyGoal] = useState(2000);
  const [cupSize, setCupSize] = useState(200);
  const [showSettings, setShowSettings] = useState(false);
  const [showStats, setShowStats] = useState(false);
  
  // Notification settings
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);
  const [notificationInterval, setNotificationInterval] = useState(30);
  const [notificationSound, setNotificationSound] = useState(true);

  useNotifications({
    enabled: notificationsEnabled,
    interval: notificationInterval,
    sound: notificationSound,
  });

  

  const progress = (waterAmount / dailyGoal) * 100;
  const remainingMl = dailyGoal - waterAmount;
  const remainingCups = Math.ceil(remainingMl / cupSize);

  const addWater = () => {
    const newAmount = Math.min(waterAmount + cupSize, dailyGoal);
    setWaterAmount(newAmount);
  };

  const removeWater = () => {
    const newAmount = Math.max(waterAmount - cupSize, 0);
    setWaterAmount(newAmount);
  };

  const reset = () => {
    setWaterAmount(0);
  };

  const getMessage = () => {
    if (waterAmount >= dailyGoal) return "🎉 Congratulations! You've reached your daily goal!";
    if (progress >= 75) return "Almost there! Keep going! 💪";
    if (progress >= 50) return "Halfway there! You're doing great! 🌊";
    if (progress >= 25) return "Good start! Keep drinking! 💧";
    return "Time to hydrate! 💦";
  };

  useEffect(() => {
    if (Notification.permission === 'default') {
      Notification.requestPermission();
    }
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 p-6">
      <div className="max-w-md mx-auto bg-white rounded-2xl shadow-xl p-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-blue-600 flex items-center gap-2">
            <Droplet className="h-8 w-8" />
            WaterTrack
          </h1>
          <div className="flex gap-2">
            <button
              onClick={() => setShowStats(!showStats)}
              className="p-2 rounded-lg hover:bg-blue-50 transition-colors"
              title="Statistics"
            >
              {showStats ? <ChevronUp /> : <ChevronDown />}
            </button>
            <button
              onClick={() => setShowSettings(!showSettings)}
              className="p-2 rounded-lg hover:bg-blue-50 transition-colors"
              title="Settings"
            >
              <Settings className="h-5 w-5" />
            </button>
          </div>
        </div>

        {showSettings && (
          <div className="space-y-8">
            <SettingsPanel
              dailyGoal={dailyGoal}
              setDailyGoal={setDailyGoal}
              cupSize={cupSize}
              setCupSize={setCupSize}
              onClose={() => setShowSettings(false)}
            />
            <div className="border-t pt-6">
              <h2 className="text-xl font-semibold text-blue-800 mb-4 flex items-center gap-2">
                <Bell className="h-5 w-5" />
                Notification Settings
              </h2>
              <NotificationSettings
                enabled={notificationsEnabled}
                setEnabled={setNotificationsEnabled}
                interval={notificationInterval}
                setInterval={setNotificationInterval}
                sound={notificationSound}
                setSound={setNotificationSound}
              />
            </div>
          </div>
        )}

        {showStats && <Stats waterAmount={waterAmount} dailyGoal={dailyGoal} />}

        <div className="mb-8">
          <WaterProgress progress={progress} />
          <div className="text-center mt-4">
            <p className="text-lg font-medium text-gray-600">{getMessage()}</p>
            <p className="text-sm text-gray-500 mt-2">
              {remainingMl > 0
                ? `${remainingMl}ml to go (about ${remainingCups} cups)`
                : "Daily goal achieved!"}
            </p>
          </div>
        </div>

        <div className="flex justify-center gap-4 mb-8">
          <button
            onClick={removeWater}
            className="p-3 rounded-full bg-red-100 text-red-600 hover:bg-red-200 transition-colors"
            disabled={waterAmount === 0}
          >
            <Minus className="h-6 w-6" />
          </button>
          <button
            onClick={addWater}
            className="p-3 rounded-full bg-blue-100 text-blue-600 hover:bg-blue-200 transition-colors"
            disabled={waterAmount >= dailyGoal}
          >
            <Plus className="h-6 w-6" />
          </button>
        </div>

        <div className="flex justify-center">
          <button
            onClick={reset}
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors"
          >
            <RotateCcw className="h-4 w-4" />
            Reset
          </button>
        </div>

        {waterAmount >= dailyGoal && (
          <div className="mt-6 text-center">
            <Trophy className="h-8 w-8 text-yellow-500 mx-auto mb-2" />
            <p className="text-lg font-medium text-gray-700">Daily Goal Achieved!</p>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}

function Footer() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<WaterTracker />} />
        <Route path="/about" element={<About />} />
        <Route path="/how-to-use" element={<HowToUse />} />
        <Route path="/benefits-of-water" element={<Benefits />} />
      </Routes>
    </Router>
  );
}


export default App;
