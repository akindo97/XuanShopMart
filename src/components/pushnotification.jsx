import React, { useEffect } from 'react';
import { View, Button, Alert } from 'react-native';
import { getApp } from '@react-native-firebase/app';
import { getMessaging, getToken, onMessage, requestPermission, AuthorizationStatus } from '@react-native-firebase/messaging';

export default function NotificationScreen() {

	useEffect(() => {
		const init = async () => {
			try {
				const messaging = getMessaging(getApp());

				const token = await getToken(messaging);
				console.log('✅ FCM Token:', token);

				onMessage(messaging, async (remoteMessage) => {
					console.log('🛎️ Thông báo foreground:', remoteMessage);
					Alert.alert('Tin nhắn mới', remoteMessage.notification?.body || 'Có tin nhắn mới');
				});
			} catch (err) {
				console.error('Lỗi khi lấy token hoặc đăng ký listener:', err);
			}
		};

		init();
	}, []);

	const handlePermission = async () => {
        Alert.alert('Xin cấp quyền thông báo');
		const status = await requestPermission();

		if (
			status === AuthorizationStatus.AUTHORIZED ||
			status === AuthorizationStatus.PROVISIONAL
		) {
			Alert.alert('Đã cấp quyền thông báo');
		} else {
			Alert.alert('Từ chối quyền thông báo');
		}
	};

	return (
		<View>
			<Button title="Xin quyền thông báo" onPress={handlePermission} />
		</View>
	);
}
