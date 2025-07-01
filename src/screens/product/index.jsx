import React, { useEffect, useState, useCallback, useMemo } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, Dimensions, ScrollView } from 'react-native';
import { Icon, Button } from 'react-native-paper';
import { useCartUI } from '../../hooks/useCartOverlay';
import HorizontalList from '../../components/horizontallist';
import commonStyles from '../../utils/commonstyles';
import { useNavigation } from '@react-navigation/native';
import { fToYen } from '../../utils/utils';
import { useRootContext } from '../../hooks/rootcontext';
import { apiRequest } from '../../api';
import { IMAGE_URL } from '../../config/config';
import { Loading } from '../../components/loading';
import noImage from '../../../assets/icons/picture.png';
import QuantitySelect from '../../components/quantityselect';
import styles from './styles';
import { openMessenger } from '../../components/fbmessenger';
import { shuffleArray } from '../../utils/utils';

const { width } = Dimensions.get('window');

export default function ProductScreen({ route }) {
    const navigation = useNavigation();
    const [loading, setLoading] = useState(true);

    // lấy toàn bộ danh sách sản phẩm
    const { category } = useRootContext();

    // lấy thông tin sản phẩm từ params của route
    const { product } = route.params;

    // sử dụng hook để lấy các hàm từ useCartUI
    const { cartItems, totalQuantity, addToCart, changeQuantity, removeFromCart } = useCartUI();

    // State để quản lý chỉ mục hiện tại của ảnh
    const [currentIndex, setCurrentIndex] = useState(0);

    // Danh sách liên quan
    const [relatedProducts, setRelatedProducts] = useState([]);

    // State lưu mô tả
    const [description, setDescription] = useState();
    // State lưu ảnh
    const [productImages, setProductImages] = useState([]);

    // Lấy số lượng sản phẩm hiện tại trong giỏ hàng
    const quantity = useMemo(() => {
        const item = cartItems.find((item) => item.id === product.id);
        return item?.quantity ?? 0;
    }, [cartItems]);

    // Lấy mô tả và hình ảnh chi tiết sản phẩm từ api
    useEffect(() => {
        const productDetail = async () => {
            try {
                setLoading(true);
                const res = await apiRequest('/product-detail', {
                    method: 'POST',
                    data: {
                        id: product.id,
                    },
                });
                const { data } = res;
                console.log(data);
                setDescription(data.description);
                setProductImages(data.images);

            } catch (err) {
                console.log(err.message || 'Đã có lỗi xảy ra');
            } finally {
                setLoading(false);
            }
        }

        productDetail();
    }, []);

    // Xử lý khi thay đổi số lượng sản phẩm
    const handleChangeQuantity = useCallback((id, newQty) => {
        // Thêm nếu hơn 0 và remove nếu == 0
        if (newQty > 0) {
            changeQuantity(id, newQty);
        } else {
            removeFromCart(id)
        }
    }, [changeQuantity]);

    // Xử lý khi nhấn nút thêm vào giỏ hàng
    const increase = (product) => {
        addToCart(1, product);
    };

    // Lấy danh sách liên quan
    useState(() => {
        const related = category.find((item) => item.id === product.category_id);
        // Xáo trộn thứ tự các sản phẩm
        const shuffle = shuffleArray(related.products);
        setRelatedProducts(shuffle);
    }, [])

    // Hàm xử lý sự kiện cuộn để cập nhật chỉ mục hiện tại
    const onScroll = (event) => {
        const index = Math.round(event.nativeEvent.contentOffset.x / width);
        setCurrentIndex(index);
    };

    return (
        <View style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                {/* Slide các ảnh sản phẩm */}
                <View style={styles.cProImageBlock}>
                    {loading ?
                        <Loading text={''} top={60} />
                        :
                        productImages.length ?
                            <FlatList
                                data={productImages}
                                horizontal
                                pagingEnabled
                                showsHorizontalScrollIndicator={false}
                                keyExtractor={(item) => item.id}
                                renderItem={({ item }) => (
                                    <Image source={{ uri: `${IMAGE_URL}/${item.image_url}` }} style={styles.cProImage} />
                                )}
                                onScroll={onScroll}
                                scrollEventThrottle={16}
                            /> :
                            <Image source={noImage} style={styles.cProImage} />
                    }

                    <View style={styles.cProCounter}>
                        <Text style={styles.cProCounText}>{currentIndex + 1}/{productImages.length}</Text>
                    </View>
                </View>
                <View style={styles.CproDelBlock}>
                    <View style={styles.cProHov}>
                        <View style={{ flexDirection: 'row', alignItems: 'flex-end' }}>
                            {/* Giá */}
                            <Text style={styles.cProPrice}>
                                ￥{fToYen(product.price)}
                            </Text>
                            {/* Giá gốc */}
                            <Text style={[commonStyles.oldPrice, commonStyles.pLeft10]}>
                                {product.old_price ? '￥' + fToYen(product.old_price) : null}
                            </Text>
                            {product.is_sale ?
                                <Text style={styles.cProSale}>　|　Sale</Text> : null
                            }
                        </View>
                        {/* Còn hàng / hết hàng */}
                        {
                            product.is_active ?
                                <Text style={[styles.cProStatus, styles.cInStock]}>còn hàng</Text>
                                :
                                <Text style={[styles.cProStatus, styles.cOutStock]}>Hết hàng</Text>

                        }
                    </View>
                    {/* Tên sản phẩm */}
                    <Text style={styles.cProName}>
                        {product.name}
                    </Text>
                    {/* Mã sản phẩm */}
                    <Text style={styles.cProId}>
                        ID: {product.sku}
                    </Text>
                </View>
                <View style={[styles.cProDesBlock, { minHeight: 100 }]}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text style={styles.CProDesTit}>Mô tả</Text>
                        <Text style={{ fontWeight: 'bold', marginTop: 8 }}>
                            {product.is_frozen ? 'Hàng đông lạnh' : null}
                        </Text>
                    </View>

                    <View>
                        {
                            loading ?
                                <Loading text={''} top={0} size={30} />
                                :
                                <Text>
                                    {
                                        description ?
                                            description
                                            :
                                            'Chưa cập nhật'
                                    }
                                </Text>
                        }
                    </View>
                </View>

                <View style={styles.cProDesBlock}>
                    <View style={styles.cCatTitle}>
                        <View style={{ flex: 1 }}>
                            <Text style={[styles.cCatTitTex, styles.fwbold]}>
                                Sản phẩm liên quan
                            </Text>
                        </View>
                        <TouchableOpacity style={{ flexDirection: 'row', paddingTop: 3 }}
                            onPress={() =>
                                navigation.navigate('Main', {
                                    screen: 'Store',
                                })
                            }>
                            <Text style={[styles.cCatShowTex, commonStyles.textColor]}>Xem tất cả</Text>
                            <Icon source="chevron-right" size={23} color="#00CC66" />
                        </TouchableOpacity>
                    </View>
                    <HorizontalList
                        // Các sản phẩm trong danh mục
                        products={relatedProducts}
                        // id của category
                        categoryId={product.category_id}
                        // Ẩn sản phẩm hiện tại
                        hideId={product.id}
                    />
                </View>

                <View style={{ height: 60 }}>
                    {/* Khoảng trống để tránh footer bị che mất */}
                </View>
            </ScrollView>

            <View style={styles.cProBotBlocck}>
                {/* nút chat */}
                <TouchableOpacity style={styles.cProBotFlex} onPress={openMessenger}>
                    <Icon source="facebook-messenger" size={23} />
                    <Text style={styles.cProBotText}>Liên hệ</Text>
                </TouchableOpacity>
                {/* Nút giỏ hàng */}
                <TouchableOpacity style={styles.cProBotFlex}
                    // Chuyển hướng tới giỏ hàng khi nhấn nút
                    onPress={() => navigation.navigate('Main', {
                        screen: 'Cart',
                    })}>
                    <View style={commonStyles.pRelative}>
                        <Icon source="cart-outline" size={23} />
                        {/* Hiển thị số lượng sản phẩm trong giỏ hàng nếu có */}
                        {totalQuantity !== 0 && <Text style={styles.cProBadge}>{totalQuantity}</Text>}
                    </View>
                    <Text style={styles.cProBotText}>Giỏ hàng</Text>
                </TouchableOpacity>
                {
                    product.is_active ?
                        // nút thêm vào giỏ hàng
                        <View style={styles.cProBotBtn}>
                            {quantity === 0 ?
                                <Button mode="contained" style={{ backgroundColor: '#000' }}
                                    onPress={() => increase(product)}>
                                    <Text style={styles.cProButText}>Thêm vào giỏ hàng</Text>
                                </Button>
                                :
                                <QuantitySelect size={5}
                                    defaultQlt={quantity}
                                    onChange={(newQty) => handleChangeQuantity(product.id, newQty)}
                                />
                            }
                        </View>
                        :
                        // Nếu hết hàng
                        <View style={styles.cProBotBtn}>
                            <Button mode="contained" style={{ backgroundColor: '#666666' }}>
                                <Text style={styles.cProButText}>Hết hàng</Text>
                            </Button>
                        </View>
                }


            </View>
        </View>
    );
}
