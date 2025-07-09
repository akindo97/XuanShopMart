// firebaseNotification.js
import { getToken, requestPermission, getMessaging, isDevice } from '@react-native-firebase/messaging';
import { Platform, PermissionsAndroid } from 'react-native';
import { getApp } from '@react-native-firebase/app';
import { apiRequest } from '../api';

export const checkAndGetFcmToken = async (userToken = null) => {
  try {
    const app = getApp(); // Lấy instance Firebase app
    const messaging = getMessaging(app); // Modular way

    if (Platform.OS === 'android' && Platform.Version >= 33) {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS
      );
      if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
        // console.log('Android: Không có quyền thông báo');
        return null;
      }
    }

    const authStatus = await requestPermission(messaging);
    if (authStatus !== 1 && authStatus !== 2) {
      // console.log('Không được cấp quyền thông báo');
      return null;
    }

    const FCMtoken = await getToken(messaging);
    // console.log('FCM Token:', FCMtoken);

    // Thêm hoặc cập nhật hoặc check token
    try {
      const res = await apiRequest('/notifica-token', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${userToken}`
        },
        data: {
          token: FCMtoken,
        }
      });
      const { data } = res;
      // console.log(data);
    } catch (err) {
      // console.log(err.message || 'Đã có lỗi xảy ra');
    } finally {

    }

    return FCMtoken;
  } catch (err) {
    console.error('Lỗi lấy FCM token:', err);
    return null;
  }
};
