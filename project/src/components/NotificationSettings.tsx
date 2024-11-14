import React from 'react';
import { Bell, BellOff, Volume2, VolumeX, AlertTriangle } from 'lucide-react';

interface NotificationSettingsProps {
  enabled: boolean;
  setEnabled: (enabled: boolean) => void;
  interval: number;
  setInterval: (interval: number) => void;
  sound: boolean;
  setSound: (sound: boolean) => void;
}

export const NotificationSettings: React.FC<NotificationSettingsProps> = ({
  enabled,
  setEnabled,
  interval,
  setInterval,
  sound,
  setSound,
}) => {
  const [permission, setPermission] = React.useState(Notification.permission);

  React.useEffect(() => {
    const checkPermission = () => {
      setPermission(Notification.permission);
    };

    checkPermission();
    if (enabled && permission === 'default') {
      Notification.requestPermission().then(checkPermission);
    }
  }, [enabled]);

  return (
    <div className="space-y-4">
      {permission === 'denied' && (
        <div className="flex items-center gap-2 p-3 bg-yellow-50 text-yellow-800 rounded-lg mb-4">
          <AlertTriangle className="h-5 w-5 text-yellow-600" />
          <p className="text-sm">
            Please enable notifications in your browser settings to receive reminders.
          </p>
        </div>
      )}

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          {enabled ? (
            <Bell className="h-5 w-5 text-blue-600" />
          ) : (
            <BellOff className="h-5 w-5 text-gray-400" />
          )}
          <span className="font-medium">Notifications</span>
        </div>
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            checked={enabled}
            onChange={(e) => setEnabled(e.target.checked)}
            className="sr-only peer"
            disabled={permission === 'denied'}
          />
          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600 disabled:opacity-50"></div>
        </label>
      </div>

      {enabled && permission === 'granted' && (
        <>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Reminder Interval
            </label>
            <select
              value={interval}
              onChange={(e) => setInterval(Number(e.target.value))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            >
              <option value={15}>Every 15 minutes</option>
              <option value={30}>Every 30 minutes</option>
              <option value={60}>Every hour</option>
              <option value={120}>Every 2 hours</option>
            </select>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              {sound ? (
                <Volume2 className="h-5 w-5 text-blue-600" />
              ) : (
                <VolumeX className="h-5 w-5 text-gray-400" />
              )}
              <span className="text-sm font-medium text-gray-700">Sound notification</span>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={sound}
                onChange={(e) => setSound(e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>

          <p className="text-sm text-gray-500 mt-2">
            You'll receive {sound ? 'audio and visual' : 'visual'} notifications every{' '}
            {interval === 60 ? 'hour' : `${interval} minutes`} to remind you to drink water.
          </p>
        </>
      )}
    </div>
  );
};
