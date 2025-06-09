import React from 'react';
import { View, TouchableOpacity, Text, Linking, Alert } from 'react-native';

const MessengerButton = () => {
  const openMessenger = async () => {
    const messengerUrl = 'fb-messenger://user-thread/118002461221056'; // thay bằng ID của bạn

    const supported = await Linking.canOpenURL(messengerUrl);

    if (supported) {
      Linking.openURL(messengerUrl);
    } else {
      Alert.alert(
        'Messenger chưa được cài đặt',
        'Vui lòng cài đặt Facebook Messenger để sử dụng chức năng này.'
      );
    }
  };

  return (
    <View style={{ position: 'absolute', bottom: 120 }}>
      <TouchableOpacity
        onPress={openMessenger}
        style={{
          backgroundColor: '#0084FF',
          paddingVertical: 12,
          paddingHorizontal: 20,
          borderRadius: 8,
        }}
      >
        <Text style={{ color: 'white', fontSize: 16 }}>Nhắn tin Messenger</Text>
      </TouchableOpacity>
    </View>
  );
};

export default MessengerButton;
