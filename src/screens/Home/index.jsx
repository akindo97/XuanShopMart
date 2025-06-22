import React, { useState, useEffect, useRef } from 'react';
import { Text, Image, View, FlatList, TouchableOpacity, Dimensions } from 'react-native';
import { TouchableRipple, Surface, Icon, ActivityIndicator } from 'react-native-paper';
import Header from '../../components/header';
import { useNavigation } from '@react-navigation/native';
import HorizontalList from '../../components/horizontallist';
import styles from './styles';
import commonStyles from '../../utils/commonstyles';
import { apiRequest } from '../../api';
import { useRootContext } from '../../hooks/rootcontext';
import { Loading } from '../../components/loading';
import MessengerButton from '../../components/fbmessenger';
import { IMAGE_URL } from '../../config/config';

const { width } = Dimensions.get('window');
const images = [
    { id: '1', uri: 'images/mega-sale.jpg' },
    { id: '2', uri: 'images/salepromax.jpg' },
    { id: '3', uri: 'images/discount.jpg' },
];

const HomeScreens = () => {
    const navigation = useNavigation();

    const { category, banner, setCategory, setBanner } = useRootContext();

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);



    const [index, setIndex] = useState(0);
    const flatListRef = useRef();

    useEffect(() => {
        const interval = setInterval(() => {
            let nextIndex = index + 1;
            if (nextIndex >= images.length) nextIndex = 0;
            setIndex(nextIndex);
            flatListRef.current?.scrollToIndex({ index: nextIndex, animated: true });
        }, 5000);

        return () => clearInterval(interval);
    }, [index]);

    useEffect(() => {

        // Nếu đã tải rồi thì thôi không tải nữa
        if (category.length && banner.length) return;

        const loadProducts = async () => {
            setLoading(true);
            try {
                const res = await apiRequest('/category');
                console.log(res.data);
                setCategory(res.data);
            } catch (err) {
                setError(err.message || 'Đã có lỗi xảy ra');
            } finally {
                setLoading(false);
            }
        };

        // tải banner
        const loadBanners = async () => {
            try {
                const res = await apiRequest('/banner');
                setBanner(res.data);
            } catch (err) {
                setError(err.message || 'Đã có lỗi xảy ra');
            } finally {
                setLoading(false);
            }
        }

        loadProducts();
        loadBanners();
    }, []);

    // danh mục sản phẩm
    const catalogItem = ({ item }) => (
        <TouchableRipple onPress={() => navigation.navigate('Store', { categoryId: item.id })}>
            <View style={styles.item}>
                <Surface style={styles.card} elevation={2}>
                    <Image source={{ uri: `${IMAGE_URL}/${item.thumbnail_url}` }}
                        style={styles.icon}
                        resizeMode="cover" />
                </Surface>
                <Text style={styles.text}>{item.name}</Text>
            </View>
        </TouchableRipple>
    );

    // Loading khi tải dữ liệu
    if (loading) {
        return (<Loading />);
    }

    return (
        <>
            <Header />
            <FlatList
                data={category}
                keyExtractor={(item, index) => index.toString()}
                ListHeaderComponent={
                    <View>
                        {/* Các baner */}
                        <View style={styles.cBannerBlock}>
                            <FlatList
                                style={styles.cBannerImage}
                                ref={flatListRef}
                                data={banner}
                                keyExtractor={(item) => item.id}
                                horizontal
                                pagingEnabled
                                showsHorizontalScrollIndicator={false}
                                renderItem={({ item }) => (
                                    <Image
                                        source={{ uri: `${IMAGE_URL}/${item.image_url}` }}
                                        style={[{ width, height: 160 }]}
                                        resizeMode="cover"
                                    />
                                )}
                                onMomentumScrollEnd={(event) => {
                                    const newIndex = Math.round(event.nativeEvent.contentOffset.x / width);
                                    setIndex(newIndex);
                                }}
                            />

                            {/* Indicator chấm tròn */}
                            <View style={styles.dotContainer}>
                                {images.map((_, i) => (
                                    <View
                                        key={i}
                                        style={[
                                            styles.dot,
                                            { opacity: i === index ? 1 : 0.3 }
                                        ]}
                                    />
                                ))}
                            </View>
                        </View>
                        <FlatList
                            style={{ backgroundColor: '#FFF' }}
                            data={category}
                            renderItem={catalogItem}
                            keyExtractor={(item, index) => 'cat' + index}
                            numColumns={4}
                            contentContainerStyle={styles.listContainer}
                        />
                    </View>
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
                                    onPress={() =>
                                        navigation.navigate('Store', { categoryId: item.id })
                                    }>
                                    <Text style={[styles.cCatShowTex, commonStyles.textColor]}>Xem tất cả</Text>
                                    <Icon source="chevron-right" size={23} color="#00CC66" />
                                </TouchableOpacity>
                            </View>
                            <HorizontalList products={item.products} categoryId={item.id} random={false} />
                        </View>
                    </View>

                )}
            />
            {/* Messenger button */}
            <MessengerButton />
        </>
    );
}

export default HomeScreens;