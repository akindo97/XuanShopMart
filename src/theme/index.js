import { DefaultTheme as PaperDefaultTheme } from 'react-native-paper';
import { DefaultTheme as NavigationDefaultTheme } from '@react-navigation/native';

const baseColor = '#f0f0f0'; // màu nền xám

const CustomTheme = {
  ...PaperDefaultTheme,
  ...NavigationDefaultTheme,
  colors: {
    ...PaperDefaultTheme.colors,
    ...NavigationDefaultTheme.colors,
    background: baseColor,
    surface: baseColor,
    primary: '#6200ee',
    accent: '#03dac4',
    text: '#000000',
  },
};

export default CustomTheme;
