import React, { useEffect, useState, useRef } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Pressable } from 'react-native';
import commonStyles from '../utils/commonstyles';
import { Icon } from 'react-native-paper';

const QuantitySelect = ({ defaultQlt = 1, size = 0, min = 0, max = 100, onChange = () => { } }) => {

    // Sử dụng state để quản lý số lượng
    const [quantity, setQuantity] = useState(defaultQlt);

    const didMount = useRef(false); // dùng để kiểm tra mount

    // Cập nhật giá trị khi defaultQlt thay đổi từ bên ngoài
    useEffect(() => {
        setQuantity(defaultQlt);
    }, [defaultQlt]);

    // Cập nhật số lượng khi giá trị quantity thay đổi
    useEffect(() => {
        if (didMount.current) {
            onChange(quantity);
        } else {
            didMount.current = true; // lần đầu mount thì không gọi onChange
        }
    }, [quantity]);
    return (
        <Pressable style={styles.cAddBlock} onPress={(e) => {
            e.stopPropagation();
        }}>
            <TouchableOpacity onPress={() => setQuantity(quantity > min ? quantity - 1 : min)} style={quantity <= min ? commonStyles.disableCss : {}}>
                <Text
                    style={[styles.cAddQtyInput, commonStyles.buttonColor,
                    { fontSize: 19 + size, width: 30 + size, height: 30 + size, lineHeight: 30 + size }
                    ]}>
                    {quantity !== 1 || min === 1 ?
                        'ー'
                        :
                        <Icon size={27 + size} source={'trash-can-outline'} color='#ffffff' />
                    }
                </Text>
            </TouchableOpacity>
            <Text
                style={[styles.cAddQtyValue, { fontSize: 19 + size, width: 62 + size }]}>
                {quantity}
            </Text>
            <TouchableOpacity onPress={() => setQuantity(quantity + 1)} style={quantity >= max ? commonStyles.disableCss : {}}>
                <Text
                    style={[styles.cAddQtyInput, commonStyles.buttonColor,
                    { fontSize: 19 + size, width: 30 + size, height: 30 + size, lineHeight: 30 + size }
                    ]}>
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
        borderTopRightRadius: 20,
        borderBottomRightRadius: 20,
        borderTopLeftRadius: 20,
        borderBottomLeftRadius: 20,
    },
    cAddQtyValue: {
        fontWeight: 'bold',
        textAlign: 'center',
    },
    cAddQtyInput: {
        fontWeight: 'bold',
        textAlign: 'center',
        borderRadius: 20,
        borderColor: '#BEBEBE',
    },
});

export default QuantitySelect;