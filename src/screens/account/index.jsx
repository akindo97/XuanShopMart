import React, { useState } from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';
import Headers from '../../components/header';
import commonStyles from '../../utils/commonstyles';
import { Button } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

const AccountScreen = () => {
  const navigation = useNavigation();

    return (
        <>
            <Headers title="Tài khoản" />
            <View style={[commonStyles.bgrColor, commonStyles.flex1]}>
            </View>
        </>
    );
}

const styles = StyleSheet.create({
});

export default AccountScreen;