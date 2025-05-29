import * as React from 'react';
import { BottomNavigation, Text } from 'react-native-paper';
import { View } from 'react-native';
import HomeScreens from '.';

const Cart = () => <Text>Cart</Text>;

const RecentsRoute = () => <Text>Recents</Text>;

const Account = () => <Text>Notifications</Text>;

const Footer = () => {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'home', title: 'Trang chủ', focusedIcon: 'home', unfocusedIcon: 'home-outline'},
    { key: 'cart', title: 'Giỏ hàng', focusedIcon: 'cart', unfocusedIcon: 'cart-outline' },
    { key: 'recents', title: 'Đơn hàng', focusedIcon: 'history' },
    { key: 'account', title: 'Tài khoản', focusedIcon: 'account', unfocusedIcon: 'account-outline' },
  ]);

  const renderScene = BottomNavigation.SceneMap({
    home: HomeScreens,
    cart: Cart,
    recents: RecentsRoute,
    account: Account,
  });

  return (
    <BottomNavigation
      navigationState={{ index, routes }}
      onIndexChange={setIndex}
      renderScene={renderScene}
      activeColor='#00CC66'
    />
  );
};

export default Footer;