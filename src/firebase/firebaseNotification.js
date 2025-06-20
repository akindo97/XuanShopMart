// firebaseNotification.js
import { getToken, requestPermission, getMessaging, isDevice } from '@react-native-firebase/messaging';
import { Platform, PermissionsAndroid } from 'react-native';
import { getApp } from '@react-native-firebase/app';

export const checkAndGetFcmToken = async () => {
  try {
    const app = getApp(); // Lấy instance Firebase app
    const messaging = getMessaging(app); // Modular way

    if (Platform.OS === 'android' && Platform.Version >= 33) {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS
      );
      if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
        console.log('Android: Không có quyền thông báo');
        return null;
      }
    }

    const authStatus = await requestPermission(messaging);
    if (authStatus !== 1 && authStatus !== 2) {
      console.log('Không được cấp quyền thông báo');
      return null;
    }

    const token = await getToken(messaging);
    console.log('FCM Token:', token);
    return token;
  } catch (err) {
    console.error('Lỗi lấy FCM token:', err);
    return null;
  }
};
