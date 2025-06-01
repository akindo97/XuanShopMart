import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { PaperProvider, DefaultTheme } from 'react-native-paper';
import Footer from './src/components/footer';
import AddToCartModal from './src/components/addtocart';
import { CartUIProvider, useCartUI } from './src/hooks/useCartOverlay';
import { DialogProvider } from './src/hooks/dialogcontext';
import NotificationScreen from './src/screens/notification';
import ProductScreen from './src/screens/product';

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
        <Stack.Navigator>
          <Stack.Screen name="Main" component={Footer} options={{ headerShown: false }} />
          <Stack.Screen name="Notifications" component={NotificationScreen}
            options={{
              title: 'Thông báo',
              headerStyle: {
                backgroundColor: '#00CC66', // màu nền
              },
              headerTintColor: '#fff',
              headerTitleStyle: {
                fontSize: 26,
                fontWeight: 'bold',
              },
            }} />
          <Stack.Screen name="Product" component={ProductScreen}
            options={{
              title: 'Sản phẩm',
              headerStyle: {
                backgroundColor: '#00CC66', // màu nền
              },
              headerTintColor: '#fff',
              headerTitleStyle: {
                fontSize: 26,
                fontWeight: 'bold',
              },
            }} />
        </Stack.Navigator>
      </NavigationContainer>
      {visible && <AddToCartModal />}
    </>
  );
};

export default function App() {
  return (
    <PaperProvider theme={theme}>
      <DialogProvider>
        <CartUIProvider>
          <MainContent />
        </CartUIProvider>
      </DialogProvider>
    </PaperProvider>
  );
}

