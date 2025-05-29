import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { PaperProvider, DefaultTheme, useTheme } from 'react-native-paper';
import Footer from './src/screens/Home/footer';
import { AddToCart } from './src/components/addtocart';
import { CartUIProvider, useCartUI } from './src/hooks/useCartOverlay';
import NotificationScreen from './src/screens/notification';

const Stack = createNativeStackNavigator();

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: '#FFF', // 🎨 màu xám nền toàn app
  },
};

const MainContent = () => {
  const { visible, onAdd } = useCartUI();

  return (
    <>
      <Footer />
      {visible && <AddToCart onAdd={onAdd} />}
    </>
  );
};

export default function App() {
  return (
    <CartUIProvider>
      <PaperProvider theme={theme}>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="Home" component={MainContent} options={{ headerShown: false }} />
            <Stack.Screen name="Notifications" component={NotificationScreen}
              options={{
                title: 'Thông báo',
                headerStyle: {
                  backgroundColor: '#00CC66', // màu nền
                },
                headerTintColor: '#fff',
                headerTitleStyle: {
                  fontSize: 26, // 👈 tăng cỡ chữ tại đây
                  fontWeight: 'bold',
                },
              }} />
          </Stack.Navigator>
        </NavigationContainer>
      </PaperProvider>
    </CartUIProvider>
  );
}

