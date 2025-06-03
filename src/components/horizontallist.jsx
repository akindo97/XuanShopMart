
import React, { useState } from 'react';
import { Text, FlatList, TouchableOpacity, StyleSheet, View } from 'react-native';
import { Card, Icon } from 'react-native-paper';
import { useCartUI } from '../hooks/useCartOverlay';
import { useNavigation } from '@react-navigation/native';
import { fToYen } from '../utils/utils';
import commonStyles from '../utils/commonstyles';

const HorizontalList = (props) => {
    /////// hãy check các props //////

    // sử dụng hook để lấy hàm show từ useCartUI
    const { addToCartShow } = useCartUI();
    const navigation = useNavigation();

    // Hiển thị tối đa ... sản phẩm trong danh sách
    const maxItems = 10;

    // kiểm tra xem có truyền thuộc tính isHorizontal không, nếu không thì mặc định là true
    const isHorizontal = props.isHorizontal ?? true; // mặc định là hiển thị ngang

    // Nếu isHorizontal === true thì lấy tối đa 8 item + thêm item "xem thêm"
    let renderList;
    if (isHorizontal) {
        renderList = props.item.slice(0, maxItems);
        // thêm item "Xem thêm" vào cuối danh sách
        renderList.push({
            isSeeMore: true,
            id: -1
        });
    } else {
        renderList = props.item;
    }

    // danh mục chi tiết
    const detailedProduct = ({ item }) => {
        if (item.isSeeMore) {
            // nếu là item "Xem thêm" thì hiển thị nút xem thêm
            return (
                <TouchableOpacity style={styles.cCatMore}
                    onPress={() => { navigation.navigate('Store', { catalogId: props.productList.id }) }}>
                    <View style={styles.cCatMoreIcon}>
                        <Icon source="arrow-right-thick" size={30} color='#000' />
                    </View>
                    <Text>Xem tất</Text>
                </TouchableOpacity>
            );
        }
        return (
            <Card style={isHorizontal ? styles.cCatCardHor : styles.cCatCardVer}
                // khi ấn vào sẽ chuyển đến trang sản phẩm
                onPress={() => { navigation.navigate('Product', { product: item, productList: props.item }) }}>
                <TouchableOpacity style={styles.cCatPlus}
                    onPress={() => addToCartShow(item)}>
                    <Icon source="cart-plus" size={25} color='#FFF' />
                </TouchableOpacity>
                <Card.Cover source={item.image} style={styles.cCatImage} />
                <Card.Content style={styles.cCatContent}>
                    <Text numberOfLines={2} style={styles.cCatName}>
                        {item.name}
                    </Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                        <Text style={commonStyles.priceColor}>￥{fToYen(item.price)}</Text>
                        {/* nếu là sản phẩm đông lạnh thì hiển thị chữ "Đông" */}
                        {item.frozen && <Text style={styles.cCatCold}>đông</Text>}
                    </View>
                </Card.Content>
            </Card>
        );
    }

    return (
        <FlatList
            data={renderList}
            renderItem={detailedProduct}
            keyExtractor={(i) => i.id.toString()}
            horizontal={isHorizontal}
            numColumns={isHorizontal ? 1 : 2}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: 8 }}
        />
    );
}

const styles = StyleSheet.create({
    cCatCardHor: {
        position: 'relative',
        width: 140,
        marginRight: 12,
        marginVertical: 10,
        backgroundColor: '#FFFFFF',
    },
    cCatMore: {
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 12,
        marginRight: 12,
        marginVertical: 10,
        padding: 6,
    },
    cCatMoreIcon: {
        backgroundColor: '#EEEEEE',
        borderRadius: '50%',
        padding: 8,
    },
    cCatCardVer: {
        position: 'relative',
        width: '48%',
        marginRight: 12,
        marginVertical: 10,
        backgroundColor: '#FFFFFF',
    },
    cCatPlus: {
        position: 'absolute',
        end: 0,
        zIndex: 1,
        borderRadius: 12,
        backgroundColor: '#00CC66ff',
        padding: 3,
    },
    cCatImage: {
        height: 100,
    },
    cCatContent: {
        paddingHorizontal: 6,
        paddingBottom: 2,
    },
    cCatName: {
        marginTop: 4,
        fontSize: 13,
        lineHeight: 17,
        minHeight: 32,
    },
    // cCatPrice: {
    //     fontSize: 16,
    //     color: 'red',
    // },
    cCatCold: {
        fontSize: 12,
        backgroundColor: '#3366CC',
        color: '#fff',
        alignSelf: 'flex-start',
        paddingHorizontal: 6,
        borderRadius: 7,
        marginTop: 3,
    },
})

export default HorizontalList;