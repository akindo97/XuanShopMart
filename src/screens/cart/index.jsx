import React, { useState } from 'react';
import { View, Image, Text, TouchableOpacity, ScrollView } from 'react-native';
import styles from './styles';
import Headers from '../../components/header';
import commonStyles from '../../utils/commonstyles';
import { Button, Icon, Dialog, Portal } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { fToYen } from '../../utils/utils';
import QuantitySelect from '../../components/quantityselect';
import { useCartUI } from '../../hooks/useCartOverlay';
import { useDialog } from '../../hooks/dialogcontext';
import { IMAGE_URL } from '../../config/config';
import MessengerButton from '../../components/fbmessenger';
import { useRootContext } from '../../hooks/rootcontext';

const CartScreen = () => {
    const navigation = useNavigation();

    // Lấy maxWeight từ RootContext
    const { maxWeight } = useRootContext();
    
    // Lấy thông tin giỏ hàng và các hàm từ context
    const { cartItems, changeQuantity, removeFromCart, totalQuantity, totalPrice, getbonusPoint, totalWeight } = useCartUI();
    // Lấy hàm hiển thị dialog từ context
    const { showDialog } = useDialog();

    // Hàm xử lý khi thay đổi số lượng
    // Thêm nếu hơn 0 và remove nếu == 0
    const onChangeQty = (id, quantity) => {
        if (quantity > 0) {
            changeQuantity(id, quantity);
        } else {
            removeButon(id);
        }
    }

    // Hàm hiển thị dialog xác nhận xóa sản phẩm khỏi giỏ hàng
    const removeButon = (id) => {
        showDialog({
            type: 'confirm',
            message: 'Bạn có chắc muốn xóa sản phẩm này ra khỏi giỏ hàng không?',
            onConfirm: () => removeFromCart(id),
            ok: 'Xóa',
        });
    };
    return (
        <>
            <Headers title="Giỏ hàng" />
            <View style={[commonStyles.flex1]}>
                {
                    cartItems?.length > 0 ?
                        <>
                            <ScrollView style={styles.cCartScroll}>
                                {/* Danh sách sản phẩm trong giỏ hàng */}
                                {cartItems.map((item) =>
                                (
                                    <View key={item.id} style={styles.cCartProBlock}>
                                        {/* ảnh sản phẩm */}
                                        <View style={commonStyles.pRelative}>
                                            <Image source={{ uri: `${IMAGE_URL}/${item.thumbnail_url}` }} style={styles.cCartImage} />
                                        </View>
                                        <View style={{ flex: 1, marginLeft: 10, flexDirection: 'column', justifyContent: 'space-between' }}>
                                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                                {/* Tên sản phẩm */}
                                                <Text style={{ fontSize: 16, flexShrink: 1 }} numberOfLines={2}>
                                                    {item.name}
                                                </Text>
                                                {/* Nút xóa sản phẩm khỏi giỏ hàng */}
                                                <TouchableOpacity style={styles.cCartProX}
                                                    onPress={() => removeButon(item.id)}>
                                                    <Icon source="window-close" size={23}></Icon>
                                                </TouchableOpacity>
                                            </View>
                                            <View style={styles.cCartStaBlock}>
                                                {/* nếu là sản phẩm đông lạnh thì hiển thị chữ "Đông" */}
                                                {item.is_frozen ? <Text style={[styles.cCartStaText, styles.cCartCold]}>đông</Text> : null}
                                                {/* nếu là sản phẩm giảm giá thì hiển thị chữ "Sale" */}
                                                {item.is_sale ? <Text style={[styles.cCartStaText, styles.cCartSale]}>sale</Text> : null}
                                            </View>
                                            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                                                <View style={[commonStyles.fEnd]}>
                                                    {/* Nếu có giá cũ thì hiển thị */}
                                                    {item.oldPrice && <Text style={[commonStyles.oldPrice, styles.cCartOldPrice]}>
                                                        ￥{fToYen(item.oldPrice)}
                                                    </Text>}
                                                    {/* Giá hiện tại */}
                                                    <Text style={[commonStyles.priceColor, commonStyles.fwblob, commonStyles.font20]}>
                                                        ￥{fToYen(item.price)}
                                                    </Text>
                                                </View>
                                                <View>
                                                    {/* Chọn số lượng sản phẩm */}
                                                    <QuantitySelect size={5} min={1}
                                                        defaultQlt={item.quantity}
                                                        onChange={(quantity) => onChangeQty(item.id, quantity)} />
                                                </View>
                                            </View>
                                        </View>
                                    </View>
                                ))}
                            </ScrollView>
                            {/* khu vực tổng tiền và nút đặt hàng */}
                            {
                                totalWeight > (maxWeight || 24.5) ?
                                    // Nếu tổng cân nặng quá maxWeight kg
                                    <View style={styles.cCartPointBlock}>
                                        <Text style={{ fontSize: 16, fontWeight: 'bold', color: 'red' }}>
                                            Tổng tất cả các mặt hàng đã vượt quá 25kg, hãy điều chỉnh lại giỏ hàng của bạn
                                        </Text>
                                    </View>
                                    :
                                    // Điểm và tạm tính BT
                                    <View>
                                        <View style={styles.cCartPointBlock}>
                                            <View>
                                                <Text>Tích điểm</Text>
                                            </View>
                                            <View>
                                                <Text>
                                                    Có thể nhận <Text style={[commonStyles.textColor, commonStyles.fwblob]} >+{fToYen(getbonusPoint)}</Text> điểm </Text>
                                            </View>
                                        </View>
                                        <View style={styles.cCartProvi}>
                                            <View>
                                                <View style={styles.cCartProviLeft}>
                                                    <Text style={styles.cCartProviText}>Số lượng:</Text>
                                                    <Text style={[commonStyles.font16]}>
                                                        {totalQuantity}
                                                    </Text>
                                                </View>
                                                <View style={styles.cCartProviLeft}>
                                                    <Text style={styles.cCartProviText}>Tạm tính:</Text>
                                                    <Text style={[commonStyles.priceColor, commonStyles.fwblob, commonStyles.font20]}>
                                                        ￥{fToYen(totalPrice)}
                                                    </Text>
                                                </View>
                                            </View>
                                            <View style={[commonStyles.flex1, commonStyles.fEnd]}>
                                                <Button mode="contained" style={[styles.cCartProviButton, commonStyles.buttonColor]}
                                                    onPress={() => {
                                                        navigation.navigate('CheckOut');
                                                    }}>
                                                    Đặt hàng
                                                </Button>
                                            </View>
                                        </View>
                                    </View>
                            }

                        </>
                        :
                        // Giỏ hàng trống
                        <>
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
                            {/* Messenger button */}
                            <MessengerButton />
                        </>
                }
            </View >
        </>
    );
}

export default CartScreen;