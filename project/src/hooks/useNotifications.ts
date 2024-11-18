import { useEffect, useCallback, useRef } from 'react';

interface NotificationOptions {
  enabled: boolean;
  interval: number;
  sound: boolean;
}

export const useNotifications = ({ enabled, interval, sound }: NotificationOptions) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const notificationActiveRef = useRef<boolean>(false); // Bildirimin aktif olup olmadığını izleyin

  const playNotificationSound = useCallback(() => {
    if (sound && audioRef.current) {
      audioRef.current.play().catch(() => {
        console.warn('Failed to play notification sound');
      });
    }
  }, [sound]);

  const showNotification = useCallback(() => {
    if (!enabled || notificationActiveRef.current) return;

    notificationActiveRef.current = true; // Bildirimin aktif olduğunu işaretle

    const messages = [
      'Time to hydrate! 💧',
      'Water break! 🌊',
      'Stay healthy, drink water! 💪',
      'Hydration reminder! 🚰',
    ];
    const randomMessage = messages[Math.floor(Math.random() * messages.length)];

    if ('Notification' in window && Notification.permission === 'granted') {
      const notification = new Notification(randomMessage, {
        body: 'Remember to drink water and stay healthy!',
        icon: '/water-drop.png',
        badge: '/water-drop.png',
        silent: !sound,
      });

      if (sound) playNotificationSound();

      notification.onclick = () => {
        window.focus();
        notification.close();
      };

      // Bildirimin bitişini takip et
      notification.onclose = () => {
        notificationActiveRef.current = false; // Bildirimi pasif hale getir
      };
    } else {
      notificationActiveRef.current = false; // Bildirim desteklenmiyorsa pasif yap
    }
  }, [enabled, sound, playNotificationSound]);

  useEffect(() => {
    audioRef.current = new Audio('/notification.mp3');
    audioRef.current.volume = 0.5;

    return () => {
      if (audioRef.current) {
        audioRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (timerRef.current) clearInterval(timerRef.current);

    if (enabled) {
      if ('Notification' in window && Notification.permission === 'default') {
        Notification.requestPermission();
      }

      timerRef.current = setInterval(() => {
        notificationActiveRef.current = false; // Yeni bildirimden önce durumu sıfırla
        showNotification();
      }, interval * 60 * 1000);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [enabled, interval, showNotification]);

  return null;
};
