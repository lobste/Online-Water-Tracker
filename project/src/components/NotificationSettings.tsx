import React, { useState } from 'react';
import { Switch } from './ui/Switch';
import { Bell, Volume2, Play } from 'lucide-react';

const NOTIFICATION_SOUNDS = [
  { id: 'default', name: 'Water Drop', url: '/public/sounds/water-drop.mp3' }
];

export function NotificationSettings() {
  const [notifications, setNotifications] = useState(true);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [selectedSound, setSelectedSound] = useState('default');

  const playSound = (soundUrl: string) => {
    const audio = new Audio(soundUrl);
    audio.play().catch(error => {
      console.error('Error playing sound:', error);
    });
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold flex items-center gap-2">
        <Bell className="w-5 h-5" /> Notification Settings
      </h2>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <label className="flex items-center gap-2">
            <Bell className="w-5 h-5" /> Notifications
          </label>
          <Switch 
            checked={notifications} 
            onCheckedChange={setNotifications} 
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium">Reminder Interval</label>
          <select 
            className="w-full rounded-md border border-gray-300 p-2"
            defaultValue="1800000"
          >
            <option value="6000">Every 1 minutes</option>
            <option value="1800000">Every 30 minutes</option>
            <option value="3600000">Every hour</option>
          </select>
        </div>

        <div className="flex items-center justify-between">
          <label className="flex items-center gap-2">
            <Volume2 className="w-5 h-5" /> Sound notification
          </label>
          <Switch 
            checked={soundEnabled} 
            onCheckedChange={setSoundEnabled}
          />
        </div>

        {soundEnabled && (
          <div className="space-y-2">
            <label className="block text-sm font-medium">Notification Sound</label>
            <div className="space-y-2">
              {NOTIFICATION_SOUNDS.map((sound) => (
                <div 
                  key={sound.id}
                  className="flex items-center gap-2 p-2 rounded-md hover:bg-gray-100"
                >
                  <input
                    type="radio"
                    name="notificationSound"
                    id={sound.id}
                    value={sound.id}
                    checked={selectedSound === sound.id}
                    onChange={(e) => setSelectedSound(e.target.value)}
                    className="w-4 h-4"
                  />
                  <label htmlFor={sound.id} className="flex-1">{sound.name}</label>
                  <button
                    onClick={() => playSound(sound.url)}
                    className="p-2 text-blue-600 hover:text-blue-700"
                    aria-label="Preview sound"
                  >
                    <Play className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
