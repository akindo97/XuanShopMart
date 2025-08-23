import React, { useState, useEffect, useRef } from 'react';
import { Text, Image, View, FlatList, TouchableOpacity, Dimensions, Platform, Alert, Linking } from 'react-native';
import { TouchableRipple, Surface, Icon, ActivityIndicator, Button } from 'react-native-paper';
import Header from '../../components/header';
import { useNavigation } from '@react-navigation/native';
import HorizontalList from '../../components/horizontallist';
import styles from './styles';
import commonStyles from '../../utils/commonstyles';
import { apiRequest } from '../../api';
import { useRootContext } from '../../hooks/rootcontext';
import { Loading } from '../../components/loading';
import MessengerButton from '../../components/fbmessenger';
import { IMAGE_URL, AppStore, CHPlay } from '../../config/config';
import Constants from 'expo-constants';
import { compareVersion } from '../../utils/utils';
import stepsImg from '../../../assets/images/steps.png';

const { width } = Dimensions.get('window');

const HomeScreens = () => {
    const navigation = useNavigation();

    const { category, banner, setCategory, setBanner } = useRootContext();

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);



    const [index, setIndex] = useState(0);
    const flatListRef = useRef();

    useEffect(() => {
        const interval = setInterval(() => {
            if (!banner.length) return;
            let nextIndex = index + 1;
            if (nextIndex >= banner.length) nextIndex = 0;
            setIndex(nextIndex);
            flatListRef.current?.scrollToIndex({ index: nextIndex, animated: true });
        }, 5000);

        return () => clearInterval(interval);
    }, [index, banner]);

    useEffect(() => {
        // Nếu đã tải rồi thì thôi không tải nữa
        if (category.length && banner.length) return;

        const loadProducts = async () => {
            setLoading(true);
            try {
                const res = await apiRequest('/category');
                const { settings, banners, categories } = res;
                // console.log(res);

                // Banner
                setBanner(banners);
                // Check cập nhật
                const checkUpdate = await checkForUpdate(settings);
                if (checkUpdate) return; // nếu cần update thì khỏi tải sản phẩm
                // Danh mục và sản phẩm
                setCategory(categories);


            } catch (err) {
                Alert.alert('Không thể tải danh sách sản phẩm, vui lòng kiểm tra kết nối mạng hoặc cập nhật phiên bản mới.');
            } finally {
                setLoading(false);
            }
        };

        loadProducts();
    }, []);

    // check cập nhật, bắt cập nhật nếu phiên bản quá cũ
    const checkForUpdate = async (versions) => {
        const currentVersion = Constants.expoConfig.version;

        if (!versions || !currentVersion) return false;

        const platform = Platform.OS;
        const lowestVersion = platform === 'android'
            ? versions.lowest_android_version
            : versions.lowest_ios_version;

        const result = compareVersion(currentVersion, lowestVersion);

        if (result === -1) {
            Alert.alert(
                'Yêu cầu cập nhật',
                'Vui lòng cập nhật phiên bản mới để sử dụng ứng dụng.',
                [
                    {
                        text: 'Cập nhật ngay',
                        onPress: () => {
                            const url = platform === 'android'
                                ? CHPlay
                                : AppStore;
                            Linking.openURL(url);
                        },
                    },
                ],
                { cancelable: false }
            );

            return true;
        }

        return false;
    };

    // Lấy tỷ lệ ảnh dưới footer
    // const aspectRatio = useMemo(() => {
    //     const { width, height } = Image.resolveAssetSource(stepsImg);
    //     return width / height;
    // }, []);

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
        return (<Loading top={100}/>);
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
                                {banner.map((_, i) => (
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
                ListFooterComponent={
                    <View style={styles.cFooterWidth}>
                        <Image
                            source={stepsImg}
                            style={{ width: '100%', height: 520 }}
                            resizeMode="conver"
                        />
                        <View style={{ padding: 10, paddingTop: 20 }}>
                            <Text style={styles.cInfoText}><Icon source='domain' size={20} />　Công ty FAT株式会社</Text>
                            <Text style={styles.cInfoText}><Icon source='map-marker-outline' size={20} />　Chi nhánh Hiroshima 広島県広島市西区三篠町1-7-26-1F</Text>
                            <Text style={styles.cInfoText}><Icon source='email-outline' size={20} />　E-mail info@fatjpgroup.com</Text>
                            <Text style={styles.cInfoText}><Icon source='phone-outline' size={20} />　Hotline: +817022285999</Text>
                        </View>
                        <View style={{ padding: 10, paddingTop: 20 }}>
                            <Text style={{ alignSelf: 'center' }}>Copyright © 2025 Xuan Shop HRS Co. all rights reserved.</Text>
                            <Text style={{ alignSelf: 'center' }}>Powered by FAT-AK Inc.</Text>
                        </View>
                    </View>
                }
            />
            {/* Messenger button */}
            <MessengerButton />
        </>
    );
}

export default HomeScreens;