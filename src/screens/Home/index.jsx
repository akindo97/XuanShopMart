import React, { useState } from 'react';
import { StyleSheet, Text, Image, View, FlatList, Dimensions, ScrollView, TouchableOpacity } from 'react-native';
import { TouchableRipple, Surface, useTheme, Card, Icon } from 'react-native-paper';
import Header from '../../components/header';
import { CartUIProvider, useCartUI } from '../../hooks/useCartOverlay';
import { useNavigation } from '@react-navigation/native';
import { fToYen } from '../../utils/utils';
import HorizontalList from '../../components/horizontallist';
import { XproductCatalog } from '../../utils/fakeapi';
import styles from './styles';
import StoreScreen from '../store';

const HomeScreens = () => {
    const navigation = useNavigation();

    // tìm kiếm
    const [searchQuery, setSearchQuery] = useState('');

    // danh mục sản phẩm
    const catalogItem = ({ item }) => (
        <TouchableRipple onPress={() => navigation.navigate('Store', { catalogId: item.id })}>
            <View style={styles.item}>
                <Surface style={styles.card} elevation={2}>
                    <Image source={item.icon} style={styles.icon} />
                </Surface>
                <Text style={styles.text}>{item.name}</Text>
            </View>
        </TouchableRipple>
    );

    return (
        <>
            <Header searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
            <FlatList
                data={XproductCatalog}
                keyExtractor={(item, index) => index.toString()}
                ListHeaderComponent={
                    <FlatList
                        data={XproductCatalog}
                        renderItem={catalogItem}
                        keyExtractor={(item, index) => 'cat' + index}
                        numColumns={5}
                        contentContainerStyle={styles.listContainer}
                    />
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
                                <TouchableOpacity style={{ flexDirection: 'row' }}
                                    onPress={() => navigation.navigate('Store', { catalogId: item.id })}>
                                    <Text style={styles.cCatShowTex}>Xem tất cả</Text>
                                    <Icon source="chevron-right" size={23} color="#0a68ff" />
                                </TouchableOpacity>
                            </View>
                            <HorizontalList item={item.item} productList={item} />
                        </View>
                    </View>

                )}
            />
        </>
    );
}

// const screenWidth = Dimensions.get('window').width;
// const itemWidth = screenWidth / 5;
// const styles = StyleSheet.create({
//     listContainer: {
//         paddingVertical: 10,
//     },
//     container: {
//         backgroundColor: '#DDDDDD',
//     },
//     block: {
//         backgroundColor: '#FFF',
//         marginTop: 10,
//         borderRadius: 2
//     },
//     item: {
//         width: itemWidth,
//         alignItems: 'center',
//         justifyContent: 'center',
//         marginVertical: 8,
//     },
//     card: {
//         width: "80%",
//         height: 70,
//         borderRadius: "20%",
//         alignItems: 'center',
//         justifyContent: 'center',
//         backgroundColor: '#f5f5f5',
//         overflow: 'hidden',
//     },
//     icon: {
//         width: "100%",
//         height: "100%",
//         resizeMode: 'contain',
//     },
//     text: {
//         fontSize: 12,
//         marginTop: 10,
//         textAlign: 'center',
//     },
//     cCatBlock: {
//         backgroundColor: '#FFF',
//         marginTop: 10,
//         borderRadius: 2,
//         paddingRight: 8,
//     },
//     cCatTitle: {
//         flexDirection: 'row',
//         paddingLeft: 8,
//         paddingTop: 5,
//     },
//     cCatTitTex: {
//         fontSize: 20,
//     },
//     cCatShowTex: {
//         fontSize: 18,
//         color: '#0a68ff'
//     },
//     fwbold: {
//         fontWeight: 'bold'
//     }
// });

export default HomeScreens;