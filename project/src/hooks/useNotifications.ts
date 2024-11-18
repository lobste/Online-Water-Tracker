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
    if (!enabled) return;

    const messages = [
      'Time to hydrate! 💧',
      'Water break! 🌊',
      'Stay healthy, drink water! 💪',
      'Hydration reminder! 🚰'
    ];

    const randomMessage = messages[Math.floor(Math.random() * messages.length)];

    // Check if the browser supports the Notification API
    if ('Notification' in window) {
      if (Notification.permission === 'granted') {
        // MacOS-specific options
        const options: NotificationOptions & { requireInteraction?: boolean } = {
          body: 'Remember to drink water and stay healthy!',
          icon: '/water-drop.png',
          badge: '/water-drop.png',
          silent: !sound,
          // MacOS notifications work better without requireInteraction
          requireInteraction: false,
          // Add tag to prevent notification stacking on MacOS
          tag: 'water-reminder'
        };

        // Create and show the notification
        const notification = new Notification(randomMessage, options);

        if (sound) {
          playNotificationSound();
        }

        // Handle notification click
        notification.onclick = () => {
          window.focus();
          notification.close();
        };

        // Auto-close notification after 5 seconds on MacOS
        // This helps with notification persistence issues
        setTimeout(() => {
          notification.close();
        }, 5000);
      }
    } else {
      // Fallback for browsers without Notification API
      const fallbackNotification = document.createElement('div');
      fallbackNotification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 16px;
        background: white;
        border-radius: 8px;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        z-index: 9999;
        max-width: 300px;
      `;
      fallbackNotification.innerHTML = `
        <h4 style="margin: 0 0 8px; font-weight: 600;">${randomMessage}</h4>
        <p style="margin: 0; color: #666;">Remember to drink water and stay healthy!</p>
      `;

      document.body.appendChild(fallbackNotification);

      if (sound) {
        playNotificationSound();
      }

      setTimeout(() => {
        if (fallbackNotification.parentNode) {
          fallbackNotification.parentNode.removeChild(fallbackNotification);
        }
      }, 5000);
    }
  }, [enabled, sound, playNotificationSound]);

  useEffect(() => {
    // Initialize audio
    audioRef.current = new Audio('/notification.mp3');
    audioRef.current.volume = 0.5;

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
    if (enabled) {
      // Request permission immediately for better MacOS compatibility
      if ('Notification' in window && Notification.permission === 'default') {
        // Use user interaction to request permission (better for MacOS)
        const requestPermission = async () => {
          try {
            const permission = await Notification.requestPermission();
            if (permission === 'denied') {
              console.warn('Notification permission denied');
            }
          } catch (error) {
            console.error('Error requesting notification permission:', error);
          }
        };
        requestPermission();
      }
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
    if (enabled && 'Notification' in window && Notification.permission === 'default') {
      const requestPermission = async () => {
        try {
          const permission = await Notification.requestPermission();
          if (permission === 'denied') {
            console.warn('Notification permission denied');
          }
        } catch (error) {
          console.error('Error requesting notification permission:', error);
        }
      };
      requestPermission();
    }
  }, [enabled]);
};
