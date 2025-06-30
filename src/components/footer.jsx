import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { useCartUI } from '../hooks/useCartOverlay';

import HomeScreens from '../screens/home';
import StoreScreen from '../screens/store';
import CartScreen from '../screens/cart';
import RecentsScreen from '../screens/recents';
import AccountScreen from '../screens/account';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const Tab = createBottomTabNavigator();

const Footer = () => {
    const { totalQuantity } = useCartUI();
    const insets = useSafeAreaInsets(); // ✅ lấy thông tin vùng an toàn
    console.log('Footer rendered with insets:', insets);

    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                headerShown: false,
                tabBarActiveTintColor: '#00CC66',
                tabBarInactiveTintColor: 'gray',
                tabBarStyle: {
                    height: 56 + insets.bottom, // chiều cao động
                    paddingTop: 3,
                    paddingBottom: insets.bottom, // thêm padding đáy đúng chuẩn
                },
                tabBarLabelStyle: {
                    paddingTop: 5,
                    fontSize: 12,
                },
                tabBarIcon: ({ focused, color }) => {
                    let iconName;

                    switch (route.name) {
                        case 'Home':
                            iconName = focused ? 'home' : 'home-outline';
                            break;
                        case 'Store':
                            iconName = focused ? 'store' : 'store-outline';
                            break;
                        case 'Cart':
                            iconName = focused ? 'cart' : 'cart-outline';
                            break;
                        case 'Recents':
                            iconName = 'history';
                            break;
                        case 'Account':
                            iconName = focused ? 'account' : 'account-outline';
                            break;
                        default:
                            iconName = 'circle';
                    }

                    return <Icon name={iconName} size={35} color={color} height={35} width={35} />;
                },
                tabBarBadge: route.name === 'Cart' && totalQuantity !== 0 ? totalQuantity : undefined,
            })}
        >
            <Tab.Screen name="Home" component={HomeScreens} options={{ tabBarLabel: 'Trang chủ' }} />
            <Tab.Screen name="Store" component={StoreScreen} options={{ tabBarLabel: 'Cửa hàng' }} />
            <Tab.Screen name="Cart" component={CartScreen} options={{ tabBarLabel: 'Giỏ hàng' }} />
            <Tab.Screen name="Recents" component={RecentsScreen} options={{ tabBarLabel: 'Đơn hàng' }} />
            <Tab.Screen name="Account" component={AccountScreen} options={{ tabBarLabel: 'Tài khoản' }} />
        </Tab.Navigator>
    );
};

export default Footer;
