import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { PaperProvider, DefaultTheme } from 'react-native-paper';
import Footer from './src/components/footer';
import { AddToCart } from './src/components/addtocart';
import { CartUIProvider, useCartUI } from './src/hooks/useCartOverlay';
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
  // sử dụng hook để lấy giá trị visible và hàm onAdd từ CartUIProvider
  const { visible, onAdd } = useCartUI();

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
      {visible && <AddToCart onAdd={onAdd} />}
    </>
  );
};

export default function App() {
  return (
    <CartUIProvider>
      <PaperProvider theme={theme}>
        <MainContent />
      </PaperProvider>
    </CartUIProvider>
  );
}

