import React, { useEffect } from 'react';
import { View, Button, Alert, PermissionsAndroid } from 'react-native';
import { getApp } from '@react-native-firebase/app';
// import { getMessaging, getToken, onMessage, requestPermission, AuthorizationStatus } from '@react-native-firebase/messaging';
import messaging from '@react-native-firebase/messaging';
export default function NotificationScreen() {

	// useEffect(() => {
	// 	const init = async () => {
	// 		try {
	// 			const messaging = getMessaging(getApp());

	// 			const token = await getToken(messaging);
	// 			console.log('✅ FCM Token:', token);

	// 			onMessage(messaging, async (remoteMessage) => {
	// 				console.log('🛎️ Thông báo foreground:', remoteMessage);
	// 				Alert.alert('Tin nhắn mới', remoteMessage.notification?.body || 'Có tin nhắn mới');
	// 			});
	// 		} catch (err) {
	// 			console.error('Lỗi khi lấy token hoặc đăng ký listener:', err);
	// 		}
	// 	};

	// 	init();
	// }, []);

	const handlePermission = async () => {
		// Alert.alert('Xin cấp quyền thông báo');
		// const status = await requestPermission();

		// if (
		// 	status === AuthorizationStatus.AUTHORIZED ||
		// 	status === AuthorizationStatus.PROVISIONAL
		// ) {
		// 	Alert.alert('Đã cấp quyền thông báo');
		// } else {
		// 	Alert.alert('Từ chối quyền thông báo');
		// }


		const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS);
		if (granted === PermissionsAndroid.RESULTS.GRANTED) {
			console.log('lấy ok');
		} else {
			console.log('bị từ chối')
		}
		getToken();
	};

	const getToken = async () => {
		try {
			const token = await messaging().getToken();
			console.log('FCM Token:', token);
		} catch (error) {
			console.error(error)
		}

	}

	return (
		<View>
			<Button title="Xin quyền thông báo" onPress={handlePermission} />
		</View>
	);
}
