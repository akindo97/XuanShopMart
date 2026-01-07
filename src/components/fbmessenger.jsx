import React, { useEffect, useRef } from 'react';
import { View, TouchableOpacity, Text, Linking, Alert, Platform, Animated } from 'react-native';
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

    // console.log('supported', supported)
    if (supported) {
      await Linking.openURL(appUrl);
    } else {
      await Linking.openURL(webUrl);
    }
  } catch (error) {
    // console.log(error)
    Alert.alert(
      'Không thể mở Facebook',
      'Vui lòng kiểm tra kết nối mạng hoặc cài đặt Facebook.'
    );
  }
};

const MessengerButton = (props) => {
  const start = props?.start ?? 10;
  const bottom = props?.bottom ?? 10;

  // Animation values for ripple effect
  const ripple1 = useRef(new Animated.Value(0)).current;
  const ripple2 = useRef(new Animated.Value(0)).current;
  const ripple3 = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Create ripple animation
    const createRippleAnimation = (animValue, delay) => {
      return Animated.loop(
        Animated.sequence([
          Animated.delay(delay),
          Animated.parallel([
            Animated.timing(animValue, {
              toValue: 1,
              duration: 1000,
              useNativeDriver: true,
            }),
          ]),
          Animated.timing(animValue, {
            toValue: 0,
            duration: 0,
            useNativeDriver: true,
          }),
        ])
      );
    };

    // Start animations with different delays
    const anim1 = createRippleAnimation(ripple1, 0);
    const anim2 = createRippleAnimation(ripple2, 666);
    const anim3 = createRippleAnimation(ripple3, 1333);

    anim1.start();
    anim2.start();
    anim3.start();

    return () => {
      anim1.stop();
      anim2.stop();
      anim3.stop();
    };
  }, []);

  const createRippleStyle = (animValue) => ({
    position: 'absolute',
    width: 58,
    height: 58,
    borderRadius: 29,
    borderWidth: 2,
    borderColor: '#0084FF',
    opacity: animValue.interpolate({
      inputRange: [0, 1],
      outputRange: [0.7, 0],
    }),
    transform: [
      {
        scale: animValue.interpolate({
          inputRange: [0, 1],
          outputRange: [1, 1.8],
        }),
      },
    ],
  });

  return (
    <View style={{ position: 'absolute', start: start, bottom: bottom }} pointerEvents="box-none">
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }} pointerEvents="box-none">
        <View style={{ position: 'relative', alignItems: 'center', justifyContent: 'center' }}>
          {/* Text label - positioned behind */}
          <Text 
            pointerEvents="none"
            style={{ 
              position: 'absolute',
              left: 60,
              bottom: 6,
              fontSize: 8, 
              color: '#0084FF',
              fontWeight: '600',
              backgroundColor: '#ffffff',
              paddingHorizontal: 8,
              paddingVertical: 4,
              borderRadius: 12,
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 1 },
              shadowOpacity: 0.1,
              shadowRadius: 2,
              elevation: 2,
              width: 106,
            }}>
            Xác nhận đơn tại đây
          </Text>
          
          {/* Ripple effects */}
          <Animated.View style={createRippleStyle(ripple1)} pointerEvents="none" />
          <Animated.View style={createRippleStyle(ripple2)} pointerEvents="none" />
          <Animated.View style={createRippleStyle(ripple3)} pointerEvents="none" />
          
          {/* Main button */}
          <TouchableOpacity
            onPress={openMessenger}
            style={{
              backgroundColor: '#0084FF',
              padding: 10,
              borderRadius: 50,
            }}
          >
            <Icon source="facebook-messenger" size={38} color='#ffffff' />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default MessengerButton;
