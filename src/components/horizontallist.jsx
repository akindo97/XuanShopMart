
import React, { useState } from 'react';
import { Text, FlatList, TouchableOpacity, StyleSheet, View } from 'react-native';
import { Card, Icon } from 'react-native-paper';
import { useCartUI } from '../hooks/useCartOverlay';
import { useNavigation } from '@react-navigation/native';
import { fToYen } from '../utils/utils';
import commonStyles from '../utils/commonstyles';
import { MAX_ITEM } from '../config/config';

const HorizontalList = (props) => {
    // console.log('props', props);
    /////// hãy check các props //////
    // Các sản phẩm trong danh mục
    const products = props?.products ?? [];

    // sử dụng hook để lấy hàm show từ useCartUI
    const { addToCartShow } = useCartUI();
    const navigation = useNavigation();

    // kiểm tra xem có truyền thuộc tính isHorizontal không, nếu không thì mặc định là true
    const isHorizontal = props.isHorizontal ?? true; // mặc định là hiển thị ngang

    // Nếu isHorizontal === true thì lấy tối đa 8 item + thêm item "xem thêm"
    let renderList;
    if (isHorizontal) {
        renderList = products.slice(0, MAX_ITEM);
        // thêm item "Xem thêm" vào cuối danh sách
        renderList.push({
            isSeeMore: true,
            id: -1
        });
    } else {
        renderList = products;
    }

    // danh mục chi tiết
    const detailedProduct = ({ item }) => {
        if (item.isSeeMore) {
            // nếu là item "Xem thêm" thì hiển thị nút xem thêm
            return (
                <TouchableOpacity style={styles.cCatMore}
                    onPress={() => {
                        navigation.navigate('Store', {
                            categoryId: item.category_id
                        })
                    }}>
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
                onPress={() => {
                    navigation.navigate('Product', { product: item, categoryId: item.category_id })
                }}>
                <TouchableOpacity style={styles.cCatPlus}
                    onPress={() => addToCartShow(item)}>
                    <Icon source="cart-plus" size={25} color='#FFF' />
                </TouchableOpacity>
                <View style={commonStyles.pRelative}>
                    <Card.Cover source={{ uri: item.thumbnail_url }} style={styles.cCatImage} />
                    <View style={styles.cCatPrDeital}>
                        {/* nếu là sản phẩm đông lạnh thì hiển thị chữ "Đông" */}
                        {item.is_frozen ? <Text style={[styles.cCatTip, styles.cCatCold]}>đông</Text> : null}
                        {/* nếu là sản phẩm giảm giá thì hiển thị chữ "Sale" */}
                        {item.is_sale ? <Text style={[styles.cCatTip, styles.cCatSale]}>sale</Text> : null}
                    </View>
                </View>
                <Card.Content style={styles.cCatContent}>
                    <Text numberOfLines={2} style={styles.cCatName}>
                        {item.name}
                    </Text>
                    <View>
                        <Text style={commonStyles.priceColor}>￥{fToYen(item.price)}</Text>
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
    cCatPrDeital: {
        position: 'absolute',
        bottom: 0,
        end: 0,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
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
    cCatTip: {
        fontSize: 12,
        color: '#ffffff',
        alignSelf: 'flex-start',
        paddingHorizontal: 6,
        borderRadius: 7,
        marginTop: 3,
        marginLeft: 2,
        marginRight: 2,
    },
    cCatCold: {
        backgroundColor: '#3366CC',
    },
    cCatSale: {
        backgroundColor: '#FF0000',
    }
})

export default HorizontalList;