import React, { useState, useRef } from 'react';
import { View, Text, FlatList, Image, Dimensions, StyleSheet, TouchableOpacity} from 'react-native';
import { fToYen } from '../../utils/utils';

import { Card, Icon, Button } from 'react-native-paper';
import { useCartUI } from '../../hooks/useCartOverlay';

import HorizontalList from '../../components/horizontallist';

const { width } = Dimensions.get('window');

const images = [
    { id: '1', uri: 'https://cdn-media.sforum.vn/storage/app/media/anh-dep-16.jpg' },
    { id: '2', uri: 'https://cdn-media.sforum.vn/storage/app/media/anh-dep-15.jpg' },
    { id: '3', uri: 'https://cdn-media.sforum.vn/storage/app/media/anh-dep-14.jpg' },
];

export default function ProductScreen({ route }) {
    console.log('route.params', route.params)
    // lấy sản phẩm từ params của route
    const { product, productList } = route.params;
    console.log('product:', product);

    // sử dụng hook để lấy hàm show từ useCartUI
    const { show } = useCartUI();

    const [currentIndex, setCurrentIndex] = useState(0);
    const flatListRef = useRef(null);

    const onScroll = (event) => {
        const index = Math.round(event.nativeEvent.contentOffset.x / width);
        setCurrentIndex(index);
    };

    return (
        <View style={styles.container}>
            <View>
                <FlatList
                    data={images}
                    horizontal
                    pagingEnabled
                    showsHorizontalScrollIndicator={false}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <Image source={{ uri: item.uri }} style={styles.cProImage} />
                    )}
                    onScroll={onScroll}
                    scrollEventThrottle={16}
                />
                <View style={styles.cProCounter}>
                    <Text style={styles.cProCounText}>{currentIndex + 1}/{images.length}</Text>
                </View>
            </View>
            <View style={styles.CproDelBlock}>
                <View style={styles.cProHov}>
                    <View style={{ flexDirection: 'row', alignItems: 'flex-end' }}>
                        <Text style={styles.cProPrice}>￥{fToYen(product.price)}</Text>
                        <Text style={styles.cProOldPrice}>￥{fToYen(1200)}</Text>
                        <Text style={styles.cProSale}>　|　Sale</Text>
                    </View>
                    <Text style={styles.cProStatus}>còn hàng</Text>
                </View>
                <Text style={styles.cProName}>{product.name}</Text>
                <Text style={styles.cProId}>ID: 12356</Text>
            </View>
            <View style={styles.cProDesBlock}>
                <Text style={styles.CProDesTit}>Mô tả</Text>
                <Text>Sản phẩm này là 1 sản phẩm ngon siêu cấp vip pro</Text>
            </View>

            <View style={styles.cProDesBlock}>
                <View style={styles.cCatTitle}>
                    <View style={{ flex: 1 }}>
                        <Text style={[styles.cCatTitTex, styles.fwbold]}>
                            Sản phẩm liên quan
                        </Text>
                    </View>
                    <TouchableOpacity style={{ flexDirection: 'row', paddingTop: 3 }}>
                        <Text style={styles.cCatShowTex}>Xem tất cả</Text>
                        <Icon source="chevron-right" size={23} color="#0a68ff" />
                    </TouchableOpacity>
                </View>
                <HorizontalList item={productList || []} />
            </View>

            <View style={styles.cProBotBlocck}>
                <View style={styles.cProBotFlex}>
                    <Icon source="facebook-messenger" size={23} />
                    <Text style={styles.CproBotText}>Liên hệ</Text>
                </View>
                <View style={styles.cProBotFlex}>
                    <Icon source="cart-outline" size={23} />
                    <Text style={styles.CproBotText}>Giỏ hàng</Text>
                </View>
                <View style={styles.cProBotBtn}>
                    <Button mode="contained" style={{ backgroundColor: '#000' }}
                        onPress={() => show(product)}>
                        Thêm vào giỏ hàng
                    </Button>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#DDDDDD',
        flex: 1,
        position: 'relative',
    },
    CproTopBlock: {
        backgroundColor: '#fff',
    },
    cProImage: {
        width: width,
        height: 300,
        resizeMode: 'cover',
    },
    cProCounter: {
        position: 'absolute',
        bottom: 10,
        right: 10,
        backgroundColor: 'rgba(0,0,0,0.5)',
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 12,
    },
    cProCounText: {
        color: '#fff',
        fontSize: 14,
    },
    CproDelBlock: {
        backgroundColor: '#fff',
        padding: 10
    },
    cProName: {
        fontSize: 18,
        paddingTop: 10,
    },
    cProHov: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    cProPrice: {
        fontSize: 23,
        color: 'red',
        fontWeight: 'bold',
    },
    cProOldPrice: {
        fontSize: 13,
        textDecorationLine: 'line-through',
        color: '#666',
        paddingLeft: 10,
        paddingBottom: 2,
    },
    cProSale: {
        fontSize: 13,
        color: '#00CC66',
        paddingLeft: 10,
        paddingBottom: 2,
    },
    cProStatus: {
        fontSize: 13,
        backgroundColor: '#00CC6699',
        color: '#fff',
        alignSelf: 'flex-start',
        paddingHorizontal: 6,
        borderRadius: 7,
        padding: 2,
        marginTop: 6,
    },
    cProId: {
        fontSize: 12,
        color: '#666',
    },
    cProDesBlock: {
        backgroundColor: '#fff',
        marginTop: 10,
        padding: 10,
    },
    CProDesTit: {
        fontSize: 16,
        paddingBottom: 3,
        fontWeight: 'bold',
    },
    cCatTitle: {
        flexDirection: 'row',
    },
    cCatTitTex: {
        fontSize: 16,
    },
    cCatShowTex: {
        fontSize: 16,
        color: '#0a68ff'
    },
    cProBotBlocck: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        paddingVertical: 6,
        paddingHorizontal: 10,
        backgroundColor: '#fff',
        borderColor: '#BEBEBE',
        borderTopWidth: 1,
        flexDirection: 'row',
        paddingBottom: 20,
    },
    cProBotFlex: {
        alignItems: 'center',
        borderRightWidth: 1,
        borderRightColor: '#BEBEBE',
        marginRight: 10,
        paddingRight: 10,
    },
    CproBotText: {
        fontSize: 12,
    },
    cProBotBtn: {
        flex: 1,
    },
    fwbold: {
        fontWeight: 'bold'
    }
});