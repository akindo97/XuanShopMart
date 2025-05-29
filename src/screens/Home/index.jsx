import React, { useState } from 'react';
import { StyleSheet, Text, Image, View, FlatList, Dimensions, ScrollView, TouchableOpacity } from 'react-native';
import { TouchableRipple, Surface, useTheme, Card, Icon } from 'react-native-paper';
import Header from './header';
import { CartUIProvider, useCartUI } from '../../hooks/useCartOverlay';

export default function HomeScreens() {

    const { show } = useCartUI();

    // tìm kiếm
    const [searchQuery, setSearchQuery] = useState('');

    // giả lập data
    const productCatalog = [
        {
            name: "Sale",
            icon: require("../../../assets/icons/sale.png"),
            item: [
                {
                    id: 1,
                    name: 'Sản phẩm A Sản phẩm B',
                    price: 1000,
                    image: require('../../../assets/images/bapbo.jpg'),
                },
                {
                    id: 2,
                    name: 'Sản phẩm A',
                    price: 1000,
                    image: require('../../../assets/images/bapbo.jpg'),
                },
                {
                    id: 3,
                    name: 'Sản phẩm A',
                    price: 1000,
                    image: require('../../../assets/images/bapbo.jpg'),
                },
                {
                    id: 4,
                    name: 'Sản phẩm A',
                    price: 1000,
                    image: require('../../../assets/images/bapbo.jpg'),
                },
                {
                    id: 5,
                    name: 'Sản phẩm A',
                    price: 1000,
                    image: require('../../../assets/images/bapbo.jpg'),
                }
            ]
        },
        {
            name: "Thịt bò, lợn",
            icon: require("../../../assets/icons/meat.png"),
            item: [
                {
                    id: '1',
                    name: 'Sản phẩm A',
                    price: 1000,
                    image: require('../../../assets/images/bapbo.jpg'),
                }
            ]
        },
        {
            name: "Thịt gà, vịt",
            icon: require("../../../assets/icons/poultry.png"),
            item: [
                {
                    id: '1',
                    name: 'Sản phẩm A',
                    price: 1000,
                    image: require('../../../assets/images/bapbo.jpg'),
                }
            ]
        },
        {
            name: "Thủy hải sản",
            icon: require("../../../assets/icons/fish.png"),
            item: [
                {
                    id: '1',
                    name: 'Sản phẩm A',
                    price: 1000,
                    image: require('../../../assets/images/bapbo.jpg'),
                }
            ]
        },
        {
            name: "Bún, mì, miến",
            icon: require("../../../assets/icons/noodles.png"),
            item: [
                {
                    id: '1',
                    name: 'Sản phẩm A',
                    price: 1000,
                    image: require('../../../assets/images/bapbo.jpg'),
                }
            ]
        },
        {
            name: "Gia vị, nguyên liệu",
            icon: require("../../../assets/icons/spice.png"),
            item: [
                {
                    id: '1',
                    name: 'Sản phẩm A',
                    price: 1000,
                    image: require('../../../assets/images/bapbo.jpg'),
                }
            ]
        },
        {
            name: "Bánh kẹo, ăn vặt",
            icon: require("../../../assets/icons/snacks.png"),
            item: [
                {
                    id: '1',
                    name: 'Sản phẩm A',
                    price: 1000,
                    image: require('../../../assets/images/bapbo.jpg'),
                }
            ]
        },
        {
            name: "Giò chả, chế biến sẵn",
            icon: require("../../../assets/icons/ham.png"),
            item: [
                {
                    id: '1',
                    name: 'Sản phẩm A',
                    price: 1000,
                    image: require('../../../assets/images/bapbo.jpg'),
                }
            ]
        },
        {
            name: "Rau, củ, quả",
            icon: require("../../../assets/icons/vegetable.png"),
            item: [
                {
                    id: '1',
                    name: 'Sản phẩm A',
                    price: 1000,
                    image: require('../../../assets/images/bapbo.jpg'),
                }
            ]
        }, {
            name: "Drink",
            icon: require("../../../assets/icons/drink.png"),
            item: [
                {
                    id: '1',
                    name: 'Sản phẩm A',
                    price: 1000,
                    image: require('../../../assets/images/bapbo.jpg'),
                }
            ]
        },
        {
            name: "Khác",
            icon: require("../../../assets/icons/other.png"),
            item: [
                {
                    id: '1',
                    name: 'Sản phẩm A',
                    price: 1000,
                    image: require('../../../assets/images/bapbo.jpg'),
                }
            ]
        }
    ];

    // danh mục sản phẩm
    const catalogItem = ({ item }) => (
        <TouchableRipple onPress={() => console.log(item.name)}>
            <View style={styles.item}>
                <Surface style={styles.card} elevation={2}>
                    <Image source={item.icon} style={styles.icon} />
                </Surface>
                <Text style={styles.text}>{item.name}</Text>
            </View>
        </TouchableRipple>
    );

    // danh mục chi tiết
    const detailedItem = ({ item }) => (
        <Card style={styles.cCatCard} onPress={() => alert(item.name)}>
            <TouchableOpacity style={styles.cCatPlus}
                onPress={() => show()}>
                <Icon source="plus-thick" size={30} color='#FFF' />
            </TouchableOpacity>
            <Card.Cover source={item.image} style={styles.image} />
            <Card.Content style={styles.cCatContent}>
                <Text numberOfLines={2} style={styles.cCatName}>
                    {item.name}
                </Text>
                <Text style={styles.price}>￥{item.price}</Text>
            </Card.Content>
        </Card>
    );

    return (
        <>
            <Header searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
            <FlatList
                data={productCatalog}
                keyExtractor={(item, index) => index.toString()}
                ListHeaderComponent={
                    <>

                        <FlatList
                            data={productCatalog}
                            renderItem={catalogItem}
                            keyExtractor={(item, index) => 'cat' + index}
                            numColumns={5}
                            contentContainerStyle={styles.listContainer}
                        />
                    </>
                }
                renderItem={({ item }) => (
                    <View style={styles.container}>
                        <View style={styles.cCatBlock}>
                            <View style={styles.cCatTitle}>
                                <View style={{ flex: 1 }}>
                                    <Text style={[styles.cCatTitTex, styles.fwbold]}>
                                        {item.name}
                                    </Text>
                                </View>
                                <View style={{ flexDirection: 'row' }}>
                                    <Text style={styles.cCatShowTex}>Xem tất cả</Text>
                                    <Icon source="chevron-right" size={26} color="#0a68ff" />
                                </View>
                            </View>
                            <FlatList
                                horizontal
                                data={item.item}
                                renderItem={detailedItem}
                                keyExtractor={(i) => i.id.toString()}
                                showsHorizontalScrollIndicator={false}
                                contentContainerStyle={{ paddingHorizontal: 8 }}
                            />
                        </View>
                    </View>
                )}
            />
        </>
    );
}

const screenWidth = Dimensions.get('window').width;
const itemWidth = screenWidth / 5;
const styles = StyleSheet.create({
    listContainer: {
        paddingVertical: 10,
    },
    container: {
        backgroundColor: '#DDDDDD',
    },
    block: {
        backgroundColor: '#FFF',
        marginTop: 10,
        borderRadius: 2
    },
    item: {
        width: itemWidth,
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 8,
    },
    card: {
        width: "80%",
        height: 70,
        borderRadius: "20%",
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f5f5f5',
        overflow: 'hidden',
    },
    icon: {
        width: "100%",
        height: "100%",
        resizeMode: 'contain',
    },
    text: {
        fontSize: 12,
        marginTop: 10,
        textAlign: 'center',
    },
    cCatBlock: {
        backgroundColor: '#FFF',
        marginTop: 10,
        borderRadius: 2,
        paddingRight: 8,
    },
    cCatTitle: {
        flexDirection: 'row',
        paddingLeft: 8,
        paddingTop: 5,
    },
    cCatTitTex: {
        fontSize: 20,
    },
    cCatShowTex: {
        fontSize: 18,
        color: '#0a68ff'
    },
    cCatCard: {
        position: 'relative',
        width: 140,
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
    image: {
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
    price: {
        fontSize: 14,
        color: 'red',
    },
    fwbold: {
        fontWeight: 600
    }
});