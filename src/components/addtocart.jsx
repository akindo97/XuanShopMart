import React from 'react';
import { StyleSheet, Text, Image, View, FlatList, Dimensions, ScrollView, TouchableOpacity } from 'react-native';
import { Card, Icon } from 'react-native-paper';
import { Button } from 'react-native-paper';
import { useCartUI } from '../hooks/useCartOverlay';


export const AddToCart = ({ onAdd }) => {
    const { hide } = useCartUI();

    return (
        <View style={styles.container}>

            <View style={{ flex: 1 }}>
                <TouchableOpacity onPress={hide} style={{ flex: 1 }}></TouchableOpacity>
            </View>
            <View style={styles.cAddBlock}>
                <View style={styles.cAddUp}>
                    <Card.Cover source={require('../../assets/images/bapbo.jpg')} style={styles.cAddImage} />
                    <Card.Content style={styles.cAddContent}>
                        <Text style={styles.cAddName}>Bắp bò ngon VKL luôn (1kg)</Text>
                        <Text style={styles.cAddPrice}>￥1,000</Text>
                    </Card.Content>
                    <TouchableOpacity onPress={hide}>
                        <Icon source="close" size={30} />
                    </TouchableOpacity>
                </View>
                <View style={[styles.cAddUp, styles.cAddCenter]}>
                    <Text style={styles.cAddQty}>Số lượng</Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1, justifyContent: 'flex-end' }}>
                        {/* Các nút tăng/giảm số lượng */}
                        <TouchableOpacity onPress={() => alert("-")}>
                            <Text style={styles.cAddQtyInput}>ー</Text>
                        </TouchableOpacity>
                        <Text style={styles.cAddQtyInput}>1</Text>
                        <TouchableOpacity onPress={() => alert("+")}>
                            <Text style={styles.cAddQtyInput}>＋</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <Button
                    mode="contained"
                    // onPress={onAdd}
                    style={{ backgroundColor: '#00CC66' }}
                >
                    Thêm vào giỏ hàng
                </Button>
            </View>
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
        zIndex: 10,
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
        alignItems: 'center'
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