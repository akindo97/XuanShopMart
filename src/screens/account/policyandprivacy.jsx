import React from 'react';
import { View, StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';

const PolicyPrivacyScreen = () => {
  return (
    <View style={styles.container}>
      <WebView 
        source={{ uri: 'https://xuanshopvietnhatmart.com/HomePage/PolicyAndPrivacy.html' }} 
        style={styles.webview}
        startInLoadingState={true}
        javaScriptEnabled={true}
        domStorageEnabled={true}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  webview: { flex: 1 },
});

export default PolicyPrivacyScreen;
