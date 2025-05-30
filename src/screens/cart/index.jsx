import React, { useState } from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';
import Headers from '../../components/header';
import { commonStyles } from '../../utils/commonstyles';
import { Button } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

const CartScreen = () => {
  const navigation = useNavigation();

    return (
        <>
            <Headers title="Giỏ hàng" />
            <View style={[commonStyles.bgrColor, commonStyles.flex1]}>
                <Image
                    source={require('../../../assets/icons/bag.png')}
                    style={styles.cCartEmpty} />
                <Text style={styles.cCartEmptyText}>
                    Giỏ hàng của bạn hiện tại đang trống
                </Text>
                <Button mode="contained" style={styles.cCartEmptyButton}
                    onPress={() => navigation.navigate('Home')}>
                    Shop now
                </Button>
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    cCartEmpty: {
        width: 200,
        height: 200,
        alignSelf: 'center',
        marginTop: 50
    },
    cCartEmptyText: {
        fontSize: 20,
        color: '#000',
        width: '100%',
        textAlign: 'center',
        marginTop: 20,
    },
    cCartEmptyButton: {
        backgroundColor: '#000',
        fontSize: 18,
        marginTop: 30,
        width: '80%',
        alignSelf: 'center',
    }   
});

export default CartScreen;