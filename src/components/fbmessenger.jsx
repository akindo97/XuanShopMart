import React from 'react';
import { View, TouchableOpacity, Text, Linking, Alert, Platform } from 'react-native';
import { Icon } from 'react-native-paper';
import { FB_ID } from '../config/config';

export const openMessenger = async () => {
  const appUrl = `fb-messenger://user-thread/${FB_ID}`;
  const webUrl = `https://m.me/${FB_ID}`;

  try {
    const supported = await Linking.canOpenURL(appUrl);

    if (supported) {
      await Linking.openURL(appUrl);
    } else {
      await Linking.openURL(webUrl);
    }
  } catch (error) {
    // nếu mở app và web đều lỗi
    Alert.alert(
      'Không thể mở Messenger',
      'Vui lòng kiểm tra kết nối mạng hoặc cài đặt Messenger.'
    );
  }
};

export const openFanpage = async () => {
  const appUrl = Platform.select({
    ios: `fb://profile/${FB_ID}`,         // hoặc fb://page/?id=...
    android: `fb://page/${FB_ID}`,
  });

  const webUrl = `https://www.facebook.com/${FB_ID}`;

  try {
    const supported = await Linking.canOpenURL(appUrl);

    console.log('supported', supported)
    if (supported) {
      await Linking.openURL(appUrl);
    } else {
      await Linking.openURL(webUrl);
    }
  } catch (error) {
    console.log(error)
    Alert.alert(
      'Không thể mở Facebook',
      'Vui lòng kiểm tra kết nối mạng hoặc cài đặt Facebook.'
    );
  }
};

const MessengerButton = (props) => {
  const start = props?.start ?? 10;
  const bottom = props?.bottom ?? 10;

  return (
    <View style={{ position: 'absolute', start: start, bottom: bottom }}>
      <TouchableOpacity
        onPress={openMessenger}
        style={{
          backgroundColor: '#00CC66',
          padding: 10,
          borderRadius: 50,
        }}
      >
        <Icon source="facebook-messenger" size={38} color='#ffffff' />
      </TouchableOpacity>
    </View>
  );
};

export default MessengerButton;
