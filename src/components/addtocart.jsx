import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, Image, View, FlatList, Dimensions, ScrollView, TouchableOpacity } from 'react-native';
import { Card, Icon, Button } from 'react-native-paper';
import { useCartUI } from '../hooks/useCartOverlay';
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';
import { fToYen } from '../utils/utils';
import QuantitySelect from './quantityselect';
import commonStyles from '../utils/commonstyles';

const AddToCartModal = ({ }) => {
    // Lấy thông tin sản phẩm và các hàm từ context
    const { addToCartHide, productDetail, addToCart } = useCartUI();

    // Sử dụng state để quản lý số lượng
    const [quantity, setQuantity] = useState(0);

    // Khởi tạo giá trị chia sẻ cho hiệu ứng trượt
    const translateY = useSharedValue(200); // bắt đầu dưới màn hình
    useEffect(() => {
        translateY.value = withTiming(0, { duration: 200 }); // trượt lên
    }, []);
    const animatedStyle = useAnimatedStyle(() => ({
        transform: [{ translateY: translateY.value }],
    }));

    return (
        <View style={styles.container}>

            <View style={{ flex: 1 }}>
                <TouchableOpacity onPress={addToCartHide} style={{ flex: 1 }}></TouchableOpacity>
            </View>
            <Animated.View style={[styles.cAddBlock, animatedStyle]}>
                <View style={styles.cAddUp}>
                    <Card.Cover source={productDetail.image} style={styles.cAddImage} />
                    <Card.Content style={styles.cAddContent}>
                        <Text style={styles.cAddName}>{productDetail.name}</Text>
                        <Text style={styles.cAddPrice}>￥{fToYen(productDetail.price)}</Text>
                    </Card.Content>
                    <TouchableOpacity onPress={addToCartHide}>
                        <Icon source="close" size={30} />
                    </TouchableOpacity>
                </View>
                <View style={[styles.cAddUp, styles.cAddCenter]}>
                    <Text style={styles.cAddQty}>Số lượng</Text>
                    <View>
                        {/* Các nút tăng/giảm số lượng */}
                        <QuantitySelect onChange={(quantity) => setQuantity(quantity)} />
                    </View>
                </View>
                <Button mode="contained" style={commonStyles.buttonColor}
                    onPress={() => addToCart(quantity, productDetail)}>
                    Thêm vào giỏ hàng
                </Button>
            </Animated.View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 0,
        start: 0,
        end: 0,
        bottom: 0,
        zIndex: 100,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        flexDirection: 'column',
    },
    cAddBlock: {
        backgroundColor: '#fff',
        paddingHorizontal: 10,
        paddingTop: 10,
        paddingBottom: 36,
        borderTopRightRadius: 10,
        borderTopLeftRadius: 10,
    },
    cAddUp: {
        flexDirection: 'row',
        borderBottomColor: '#DCDCDC',
        borderBottomWidth: 2,
        paddingBottom: 10,
        marginBottom: 10,
    },
    cAddImage: {
        width: 120,
        height: 100,
        borderRadius: 10,
    },
    cAddContent: {
        flex: 1,
        flexDirection: 'column',
    },
    cAddName: {
        flex: 1,
        fontSize: 16,
    },
    cAddPrice: {
        color: 'red',
        fontWeight: 'bold',
        fontSize: 20,
    },
    cAddCenter: {
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    cAddQty: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    cAddQtyInput: {
        fontSize: 18,
        padding: 5,
        width: 50,
        textAlign: 'center',
        marginRight: 6,
        borderWidth: 1,
        borderRadius: 6,
        borderColor: '#BEBEBE'
    },
})

export default AddToCartModal;