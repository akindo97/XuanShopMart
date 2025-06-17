import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Pressable } from 'react-native';
import commonStyles from '../utils/commonstyles';
import { Icon } from 'react-native-paper';

const QuantitySelect = ({ defaultQlt = 1, size = 18, min = 0, max = 100, onChange = () => { } }) => {
    
    // Sử dụng state để quản lý số lượng
    const [quantity, setQuantity] = useState(defaultQlt);

    // Cập nhật số lượng khi giá trị quantity thay đổi
    useEffect(() => {
        onChange(quantity);
    }, [quantity]);
    return (
        <Pressable style={styles.cAddBlock} onPress={(e) => {
            e.stopPropagation();
        }}>
            <TouchableOpacity onPress={() => setQuantity(quantity > min ? quantity - 1 : min)} style={quantity <= min ? commonStyles.disableCss : {}}>
                <Text style={[styles.cAddQtyInput, commonStyles.buttonColor, commonStyles.fwblob, { fontSize: size }]}>
                    {quantity !== 1 ?
                        'ー'
                        :
                        <Icon size={20} source={'trash-can-outline'} color='#ffffff' />
                    }
                </Text>
            </TouchableOpacity>
            <Text style={[styles.cAddQtyValue, commonStyles.fwblob, { fontSize: size }]}>{quantity}</Text>
            <TouchableOpacity onPress={() => setQuantity(quantity + 1)} style={quantity >= max ? commonStyles.disableCss : {}}>
                <Text style={[styles.cAddQtyInput, commonStyles.buttonColor, commonStyles.fwblob, { fontSize: size }]}>
                    ＋
                </Text>
            </TouchableOpacity>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    cAddBlock: {
        backgroundColor: '#c8dcd2',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 2,
        paddingHorizontal: 2,
        borderTopRightRadius: 16,
        borderBottomRightRadius: 16,
        borderTopLeftRadius: 16,
        borderBottomLeftRadius: 16,
    },
    cAddQtyValue: {
        width: 60,
        textAlign: 'center',
    },
    cAddQtyInput: {
        padding: 5,
        width: 30,
        textAlign: 'center',
        borderRadius: '50%',
        borderColor: '#BEBEBE'
    },
});

export default QuantitySelect;