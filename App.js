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
        </Stack.Navigator>
      </NavigationContainer>
      {visible && <AddToCartModal />}
      <FlashMessage position="top" />
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

