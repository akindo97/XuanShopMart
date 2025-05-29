import { PaperProvider, DefaultTheme, useTheme } from 'react-native-paper';
import Footer from './src/screens/Home/footer';
import { AddToCart } from './src/components/addtocart';
import { CartUIProvider, useCartUI } from './src/hooks/useCartOverlay';

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
        <MainContent />
      </PaperProvider>
    </CartUIProvider>
  );
}

