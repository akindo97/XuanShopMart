import React, { useState, useEffect } from 'react';
import { Text, Image, View, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';
import { TouchableRipple, Surface, Icon } from 'react-native-paper';
import Header from '../../components/header';
import { useNavigation } from '@react-navigation/native';
import HorizontalList from '../../components/horizontallist';
import { XproductCatalog } from '../../utils/fakeapi';
import styles from './styles';
import commonStyles from '../../utils/commonstyles';
import { apiRequest } from '../../api';

const HomeScreens = () => {
    const navigation = useNavigation();

    const [loading, setLoading] = useState(true);
    const [category, setCategory] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadProducts = async () => {
            try {
                const res = await apiRequest('/category');
                setCategory(res);
                setError(null);
            } catch (err) {
                setError(err.message || 'Đã có lỗi xảy ra');
            } finally {
                setLoading(false);
            }
        };

        loadProducts();
    }, []);

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

    if (loading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" color="#00CC66" />
                <Text>Đang tải dữ liệu...</Text>
            </View>
        );
    }

    if (error) { 
        return (
            <View>
                <Text>Lỗi: {error}</Text>
            </View>
        );
    }

    return (
        <>
            <Header />
            <FlatList
                data={XproductCatalog}
                keyExtractor={(item, index) => index.toString()}
                ListHeaderComponent={
                    <FlatList
                        style={{ backgroundColor: '#FFF' }}
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
                                    <Text style={[styles.cCatShowTex, commonStyles.textColor]}>Xem tất cả</Text>
                                    <Icon source="chevron-right" size={23} color="#00CC66" />
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

export default HomeScreens;