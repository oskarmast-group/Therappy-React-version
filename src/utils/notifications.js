import { notificationsAPI } from 'resources/api';
import { PUBLIC_VAPID_KEY } from 'resources/constants/config';

const isPushNotificationSupported = () => {
  return 'serviceWorker' in navigator && 'PushManager' in window && 'Notification' in window;
};

const getNotificationsSubscription = async () => {
  const registration = await navigator.serviceWorker.ready;
  console.log('sw registration', registration);
  const subscription = await registration.pushManager.getSubscription();
  return subscription;
};

const checkSubscriptionStatus = async () => {
  try {
    const subscription = await getNotificationsSubscription();

    if (!!subscription) return true;
    return false;
  } catch (e) {
    console.error('Check subscription status');
    console.error(e);
    return null;
  }
};

const subscribeUser = async () => {
  try {
    const permission = await Notification.requestPermission();
    if (permission === 'granted') {
      const registration = await navigator.serviceWorker.ready;

      let subscription = await registration.pushManager.getSubscription();

      if (subscription === null) {
        subscription = await registration.pushManager.subscribe({
          userVisibleOnly: true,
          applicationServerKey: urlBase64ToUint8Array(PUBLIC_VAPID_KEY),
        });
      }

      await notificationsAPI.register(subscription);
    }
  } catch (e) {
    console.error(e);
  }
};

// Helper function to convert the VAPID key
const urlBase64ToUint8Array = (base64String) => {
  const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
};

export const subscribeNotificationsIfNotAlready = async () => {
  const alreadySubscribed = await checkSubscriptionStatus();
  if(!!alreadySubscribed || alreadySubscribed === null || !isPushNotificationSupported()) return;

  subscribeUser();
}