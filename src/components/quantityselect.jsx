import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import commonStyles from '../utils/commonstyles';

const QuantitySelect = ({ valueQuantity = 1, size = 18, min = 1, max = 100, onChange = () => { } }) => {
    // Sử dụng state để quản lý số lượng
    const [quantity, setQuantity] = useState(valueQuantity);

    // Cập nhật số lượng khi giá trị quantity thay đổi
    useEffect(() => {
        onChange(quantity);
    }, [quantity]);
    return (
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
            <TouchableOpacity onPress={() => setQuantity(quantity > min ? quantity - min : min)} style={quantity <= min ? commonStyles.disableCss : {}}>
                <Text style={[styles.cAddQtyInput, commonStyles.buttonColor, commonStyles.fwblob, { fontSize: size }]}>
                    ー
                </Text>
            </TouchableOpacity>
            <Text style={[styles.cAddQtyInput, commonStyles.fwblob, { fontSize: size }]}>{quantity}</Text>
            <TouchableOpacity onPress={() => setQuantity(quantity + 1)} style={quantity >= max ? commonStyles.disableCss : {}}>
                <Text style={[styles.cAddQtyInput, commonStyles.buttonColor, commonStyles.fwblob, { fontSize: size }]}>
                    ＋
                </Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    cAddQtyInput: {
        padding: 5,
        width: 50,
        textAlign: 'center',
        marginRight: 3,
        borderWidth: 1,
        borderRadius: 6,
        borderColor: '#BEBEBE'
    },
});

export default QuantitySelect;