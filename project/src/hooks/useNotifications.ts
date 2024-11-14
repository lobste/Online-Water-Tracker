import { useEffect, useCallback, useRef } from 'react';

interface NotificationOptions {
  enabled: boolean;
  interval: number;
  sound: boolean;
}

export const useNotifications = ({ enabled, interval, sound }: NotificationOptions) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const playNotificationSound = useCallback(() => {
    if (sound && audioRef.current) {
      audioRef.current.play().catch(() => {
        console.warn('Failed to play notification sound');
      });
    }
  }, [sound]);

  const showNotification = useCallback(() => {
    if (!enabled || Notification.permission !== 'granted') return;

    const messages = [
      'Time to hydrate! 💧',
      'Water break! 🌊',
      'Stay healthy, drink water! 💪',
      'Hydration reminder! 🚰'
    ];

    const randomMessage = messages[Math.floor(Math.random() * messages.length)];

    const notification = new Notification(randomMessage, {
      body: 'Remember to drink water and stay healthy!',
      icon: '/water-drop.png',
      badge: '/water-drop.png',
      silent: !sound
    });

    if (sound) {
      playNotificationSound();
    }

    notification.onclick = () => {
      window.focus();
      notification.close();
    };
  }, [enabled, sound, playNotificationSound]);

  useEffect(() => {
    // Initialize audio
    audioRef.current = new Audio('/sounds/water-drop.mp3');
    audioRef.current.volume = 0.8;

    return () => {
      if (audioRef.current) {
        audioRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    // Clear existing timer
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }

    // Set up new timer if enabled
    if (enabled && Notification.permission === 'granted') {
      timerRef.current = setInterval(showNotification, interval * 60 * 1000);
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [enabled, interval, showNotification]);

  // Request notification permission when enabled changes to true
  useEffect(() => {
    if (enabled && Notification.permission === 'default') {
      Notification.requestPermission().then((permission) => {
        if (permission === 'denied') {
          console.warn('Notification permission denied');
        }
      });
    }
  }, [enabled]);
};
