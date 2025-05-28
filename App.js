import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { PaperProvider } from 'react-native-paper';

import HomeScreens from './src/screens/Home';

export default function App() {
  return (
    <PaperProvider>
      <HomeScreens />
      <View style={styles.container}>
        <Text>Open up App.js to start working on your app! 12312</Text>
        <StatusBar style="auto" />
      </View>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
