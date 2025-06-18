
import React, { useState, memo, useEffect } from 'react';
import { Text, FlatList, TouchableOpacity, StyleSheet, View } from 'react-native';
import { Card, Icon } from 'react-native-paper';
import { useCartUI } from '../hooks/useCartOverlay';
import { useNavigation } from '@react-navigation/native';
import { fToYen, shuffleArray } from '../utils/utils';
import commonStyles from '../utils/commonstyles';
import { MAX_ITEM } from '../config/config';
import AddToCartButton from './addtocart';
import { ActivityIndicator } from 'react-native-paper';

const HorizontalList = ({ 
    products = [], isHorizontal = true, random = true, hideId = null, onEndReached, loading = false 
}) => {
    // Có random hay không - random
    // Các sản phẩm trong danh mục - products
    // Sản phẩm muốn ẩn - hideId
    // kiểm tra xem có truyền thuộc tính isHorizontal không, nếu không thì mặc định là true

    const navigation = useNavigation();

    // State lưu trữ list sản phẩm hiển thị
    const [renderList, setRenderList] = useState([]);

    // Nếu isHorizontal === true thì lấy tối đa 8 item + thêm item "xem thêm"
    useEffect(() => {
        let handelList = random ? shuffleArray(products) : products; // Xáo trộn
        if (hideId) {
            handelList = handelList.filter(item => item.id !== hideId)
        }
        if (isHorizontal) {
            handelList = handelList.slice(0, MAX_ITEM);
            // thêm item "Xem thêm" vào cuối danh sách
            handelList.push({
                isSeeMore: true,
                id: -1
            });
        }
        setRenderList(handelList);
    }, [isHorizontal, products])

    // danh mục chi tiết
    const ProductCard = React.memo(({ item }) => {
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
                    navigation.push('Product', { product: item, categoryId: item.category_id })
                }}>
                {/* Nếu hết hàng thì không cho phép thêm vào giỏ hàng */}
                {item.is_active ?
                    // <TouchableOpacity style={styles.cCatPlus}
                    //     onPress={() => addToCartShow(item)}>
                    //     <Icon source="cart-plus" size={25} color='#FFF' />
                    // </TouchableOpacity>
                    <View style={styles.cCatPlus}>
                        <AddToCartButton id={item.id} product={item} />
                    </View>
                    :
                    <Text style={styles.cCatOut}>Hết hàng</Text>
                }
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
    });

    return (
        <FlatList
            data={renderList}
            renderItem={({ item }) => <ProductCard item={item} />}
            keyExtractor={(item, index) => `${item.id}_${index}`}
            horizontal={isHorizontal}
            numColumns={isHorizontal ? 1 : 2}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: 8, paddingBottom: isHorizontal ? 0 : 16 }}
            onEndReached={onEndReached}
            onEndReachedThreshold={0.2}
            showsVerticalScrollIndicator={false}
            ListFooterComponent={loading && <ActivityIndicator size="large" />}

            // Tối ưu performance
            initialNumToRender={10}               // Số item render ban đầu
            maxToRenderPerBatch={10}             // Số item tối đa mỗi lần batch render
            windowSize={5}                       // Vùng render trước và sau màn hình

            removeClippedSubviews={true}         // Tự động remove item đã cuộn khỏi view
            updateCellsBatchingPeriod={500}       // Delay thời gian render batch tiếp theo
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
        borderRadius: 50,
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
        end: 3,
        top: 3,
        zIndex: 1,
        // borderRadius: 12,
        // backgroundColor: '#00CC66ff',
        // padding: 3,
    },
    cCatOut: {
        position: 'absolute',
        end: 0,
        zIndex: 1,
        borderRadius: 12,
        backgroundColor: '#666666ff',
        padding: 2,
        paddingHorizontal: 3,
        color: '#ffffff'
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

export default memo(HorizontalList);