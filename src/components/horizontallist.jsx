
import React, { useState } from 'react';
import { Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { Card, Icon } from 'react-native-paper';
import { useCartUI } from '../hooks/useCartOverlay';
import { useNavigation } from '@react-navigation/native';
import { fToYen } from '../utils/utils';

const HorizontalList = (props) => {
    // sử dụng hook để lấy hàm show từ useCartUI
    const { show } = useCartUI();
    const navigation = useNavigation();

    const isHorizontal = props.isHorizontal ?? true; // mặc định là hiển thị ngang

    // danh mục chi tiết
    const detailedProduct = ({ item }) => {
        return (
            <Card style={isHorizontal ? styles.cCatCardHor : styles.cCatCardVer}
                // khi ấn vào sẽ chuyển đến trang sản phẩm
                onPress={() => { navigation.navigate('Product', { product: item, productList: props.item }) }}>
                <TouchableOpacity style={styles.cCatPlus}
                    onPress={() => show(item)}>
                    <Icon source="plus-thick" size={30} color='#FFF' />
                </TouchableOpacity>
                <Card.Cover source={item.image} style={styles.cCatImage} />
                <Card.Content style={styles.cCatContent}>
                    <Text numberOfLines={2} style={styles.cCatName}>
                        {item.name}
                    </Text>
                    <Text style={styles.cCatPrice}>￥{fToYen(item.price)}</Text>
                </Card.Content>
            </Card>
        );
    }

    return (
        <FlatList
            data={props.item}
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
        backgroundColor: '#00CC6699',
        padding: 2,
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
    cCatPrice: {
        fontSize: 16,
        color: 'red',
    },
})

export default HorizontalList;