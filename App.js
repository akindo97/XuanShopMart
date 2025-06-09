import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { PaperProvider, DefaultTheme } from 'react-native-paper';
import Footer from './src/components/footer';
import AddToCartModal from './src/components/addtocart';
import { CartUIProvider, useCartUI } from './src/hooks/useCartOverlay';
import { DialogProvider } from './src/hooks/dialogcontext';
import NotificationScreen from './src/screens/notification';
import ProductScreen from './src/screens/product'
import RegisterLoginScreen from './src/screens/account/registerlogin';
import { RootProvider } from './src/hooks/rootcontext';
import CheckOutScreen from './src/screens/checkout';
import SuccessfulScreen from './src/screens/checkout/successful';
import DetailScreen from './src/screens/recents/detail';
import SearchScreen from './src/screens/search';
import ProfileScreen from './src/screens/account/profile';
import ShipAddressScreen from './src/screens/account/shipaddress';
import ResetPasswordScreen from './src/screens/account/resetpassword';
import VoucherScreen from './src/screens/account/voucher';
import MessengerButton from './src/components/fbmessenger';
import FlashMessage from "react-native-flash-message";

const Stack = createNativeStackNavigator();

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: '#FFF', // 🎨 màu xám nền toàn app
  },
};

const MainContent = () => {
  // sử dụng hook để lấy giá trị visible từ CartUIProvider
  const { visible } = useCartUI();

  return (
    <>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerStyle: {
              backgroundColor: '#00CC66',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontSize: 22,
              fontWeight: 'bold',
            },
          }}>
          <Stack.Screen name="Main" component={Footer} options={{ headerShown: false }} />
          <Stack.Screen name="Notifications" component={NotificationScreen} options={{ title: 'Thông báo' }} />
          <Stack.Screen name="Product" component={ProductScreen} options={{ title: 'Sản phẩm' }} />
          <Stack.Screen name="RegisterLogin" component={RegisterLoginScreen} options={{ title: 'Đăng ký/Đăng nhập' }} />
          <Stack.Screen name="CheckOut" component={CheckOutScreen} options={{ title: 'Đặt hàng' }} />
          <Stack.Screen name="Successful" component={SuccessfulScreen} options={{ title: 'Đặt hàng thành công', gestureEnabled: false, headerLeft: () => null }} />
          <Stack.Screen name="Detail" component={DetailScreen} options={{ title: 'Chi tiết đơn hàng' }} />
          <Stack.Screen name="Search" component={SearchScreen} />
          <Stack.Screen name="Profile" component={ProfileScreen} options={{ title: 'Profile' }} />
          <Stack.Screen name="ShipAddress" component={ShipAddressScreen} options={{ title: 'Shipping Info' }} />
          <Stack.Screen name="ResetPassword" component={ResetPasswordScreen} options={{ title: 'Đặt lại mật khẩu' }} />
          <Stack.Screen name="Voucher" component={VoucherScreen} options={{ title: 'Voucher của tôi' }} />
        </Stack.Navigator>
      </NavigationContainer>
      {visible && <AddToCartModal />}
      <FlashMessage position="top" />
      <MessengerButton />
    </>
  );
};

export default function App() {
  return (
    <PaperProvider theme={theme}>
      <DialogProvider>
        <RootProvider>
        <CartUIProvider>
          <MainContent />
        </CartUIProvider>
        </RootProvider>
      </DialogProvider>
    </PaperProvider>
  );
}

