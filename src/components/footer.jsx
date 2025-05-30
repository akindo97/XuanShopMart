// import * as React from 'react';
// import { BottomNavigation, Text } from 'react-native-paper';
// import { View } from 'react-native';
// import HomeScreens from '../screens/home';
// import StoreScreen from '../screens/store';

// const Cart = () => <Text>Cart</Text>;

// const RecentsRoute = () => <Text>Recents</Text>;

// const Account = () => <Text>Notifications</Text>;

// const Footer = () => {
//   const [index, setIndex] = React.useState(0);
//   const [routes] = React.useState([
//     { key: 'home', title: 'Trang chủ', focusedIcon: 'home', unfocusedIcon: 'home-outline'},
//     { key: 'store', title: 'Cửa hàng', focusedIcon: 'store', unfocusedIcon: 'store-outline'},
//     { key: 'cart', title: 'Giỏ hàng', focusedIcon: 'cart', unfocusedIcon: 'cart-outline' },
//     { key: 'recents', title: 'Đơn hàng', focusedIcon: 'history' },
//     { key: 'account', title: 'Tài khoản', focusedIcon: 'account', unfocusedIcon: 'account-outline' },
//   ]);

//   const renderScene = BottomNavigation.SceneMap({
//     home: HomeScreens,
//     store: StoreScreen,
//     cart: Cart,
//     recents: RecentsRoute,
//     account: Account,
//   });

//   return (
//     <BottomNavigation
//       navigationState={{ index, routes }}
//       onIndexChange={setIndex}
//       renderScene={renderScene}
//       activeColor='#00CC66'
//     />
//   );
// };

// export default Footer;



import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import HomeScreens from '../screens/home';
import StoreScreen from '../screens/store';
import CartScreen from '../screens/cart';
import RecentsScreen from '../screens/recents';
import AccountScreen from '../screens/account';
import { Text } from 'react-native-paper';

const Tab = createBottomTabNavigator();

const Footer = () => {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                headerShown: false,
                tabBarActiveTintColor: '#00CC66',
                tabBarInactiveTintColor: 'gray',
                tabBarStyle: {
                    height: 92,
                    paddingTop: 3,
                },
                tabBarLabelStyle: {
                    paddingTop: 6,
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
