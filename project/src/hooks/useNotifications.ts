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
      audioRef.current.play().catch((error) => {
        console.warn('Failed to play notification sound:', error);
      });
    }
  }, [sound]);

  const showNotification = useCallback(() => {
    if (!enabled) return;

    const messages = [
      'Time to hydrate! 💧',
      'Water break! 🌊',
      'Stay healthy, drink water! 💪',
      'Hydration reminder! 🚰'
    ];

    const randomMessage = messages[Math.floor(Math.random() * messages.length)];

    // Check if the Notification API is supported
    if (!('Notification' in window)) {
      console.warn('This browser does not support notifications');
      return;
    }

    // Handle MacOS specific behavior
    const isMacOS = /Mac|iPhone|iPad|iPod/.test(navigator.platform);
    const createNotification = () => {
      try {
        const notification = new Notification(randomMessage, {
          body: 'Remember to drink water and stay healthy!',
          icon: '/water-drop.png',
          badge: '/water-drop.png',
          // MacOS works better with requireInteraction set to true
          requireInteraction: isMacOS,
          silent: !sound
        });

        if (sound) {
          playNotificationSound();
        }

        notification.onclick = () => {
          window.focus();
          notification.close();
        };

        // Auto-close notification after 5 seconds on MacOS
        if (isMacOS) {
          setTimeout(() => notification.close(), 5000);
        }
      } catch (error) {
        console.error('Error creating notification:', error);
      }
    };

    // Handle permission states
    if (Notification.permission === 'granted') {
      createNotification();
    } else if (Notification.permission !== 'denied') {
      // Request permission and show notification if granted
      Notification.requestPermission().then(permission => {
        if (permission === 'granted') {
          createNotification();
        }
      }).catch(error => {
        console.error('Error requesting notification permission:', error);
      });
    }
  }, [enabled, sound, playNotificationSound]);

  useEffect(() => {
    // Initialize audio with error handling
    try {
      audioRef.current = new Audio('/notification.mp3');
      audioRef.current.volume = 0.5;
    } catch (error) {
      console.warn('Failed to initialize audio:', error);
    }

    return () => {
      if (audioRef.current) {
        audioRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }

    if (enabled) {
      // Initial notification after a short delay
      const initialTimeout = setTimeout(showNotification, 1000);

      // Set up recurring notifications
      timerRef.current = setInterval(showNotification, interval * 60 * 1000);

      return () => {
        clearTimeout(initialTimeout);
        if (timerRef.current) {
          clearInterval(timerRef.current);
        }
      };
    }
  }, [enabled, interval, showNotification]);

  // Request permission when enabled changes to true
  useEffect(() => {
    if (enabled && ('Notification' in window)) {
      Notification.requestPermission().catch(error => {
        console.error('Error requesting notification permission:', error);
      });
    }
  }, [enabled]);
};
