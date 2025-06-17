import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, Dimensions, StyleSheet, TouchableOpacity } from 'react-native';
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

const { width } = Dimensions.get('window');

export default function ProductScreen({ route }) {
    const navigation = useNavigation();
    const [loading, setLoading] = useState(true);

    // lấy toàn bộ danh sách sản phẩm
    const { category } = useRootContext();

    // lấy thông tin sản phẩm từ params của route
    const { product } = route.params;

    // sử dụng hook để lấy hàm addToCartShow từ useCartUI
    const { addToCartShow, totalQuantity } = useCartUI();
    // State để quản lý chỉ mục hiện tại của ảnh
    const [currentIndex, setCurrentIndex] = useState(0);

    // Danh sách liên quan
    const [relatedProducts, setRelatedProducts] = useState([]);

    // State lưu mô tả
    const [description, setDescription] = useState();
    // State lưu ảnh
    const [productImages, setProductImages] = useState([]);

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

    // Lấy danh sách liên quan
    useState(() => {
        const related = category.find((item) => item.id === product.category_id);
        setRelatedProducts(related);
    }, [])

    // Hàm xử lý sự kiện cuộn để cập nhật chỉ mục hiện tại
    const onScroll = (event) => {
        const index = Math.round(event.nativeEvent.contentOffset.x / width);
        setCurrentIndex(index);
    };

    return (
        <View style={styles.container}>
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
                    <Image source={ noImage } style={styles.cProImage} />
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
                            {product.old_price != 0 ? '￥' + fToYen(product.old_price) : null}
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
                    products={relatedProducts.products}
                />
            </View>

            <View style={styles.cProBotBlocck}>
                {/* nút chat */}
                <View style={styles.cProBotFlex}>
                    <Icon source="facebook-messenger" size={23} />
                    <Text style={styles.cProBotText}>Liên hệ</Text>
                </View>
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
                            <Button mode="contained" style={{ backgroundColor: '#000' }}
                                onPress={() => addToCartShow(product)}>
                                Thêm vào giỏ hàng
                            </Button>
                        </View>
                        :
                        // Nếu hết hàng
                        <View style={styles.cProBotBtn}>
                            <Button mode="contained" style={{ backgroundColor: '#666666' }}>
                                Hết hàng
                            </Button>
                        </View>
                }


            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#DDDDDD',
        flex: 1,
        position: 'relative',
    },
    CproTopBlock: {
        backgroundColor: '#fff',
    },
    cProImageBlock: {
        height: 230
    },
    cProImage: {
        width: width,
        height: '100%',
        resizeMode: 'cover',
    },
    cProCounter: {
        position: 'absolute',
        bottom: 10,
        right: 10,
        backgroundColor: 'rgba(0,0,0,0.5)',
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 12,
    },
    cProCounText: {
        color: '#fff',
        fontSize: 14,
    },
    CproDelBlock: {
        backgroundColor: '#fff',
        padding: 10
    },
    cProName: {
        fontSize: 18,
        paddingTop: 10,
    },
    cProHov: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    cProPrice: {
        fontSize: 23,
        color: 'red',
        fontWeight: 'bold',
    },
    // cProOldPrice: {
    //     fontSize: 13,
    //     textDecorationLine: 'line-through',
    //     color: '#666',
    //     paddingLeft: 10,
    //     paddingBottom: 2,
    // },
    cProSale: {
        fontSize: 13,
        color: '#00CC66',
        paddingLeft: 10,
        paddingBottom: 2,
    },
    cProStatus: {
        fontSize: 13,
        alignSelf: 'flex-start',
        paddingHorizontal: 6,
        borderRadius: 7,
        padding: 2,
        marginTop: 6,
    },
    cInStock: {
        backgroundColor: '#00CC6699',
        color: '#fff',
    },
    cOutStock: {
        backgroundColor: '#66666699',
        color: '#fff',
    },
    cProId: {
        marginTop: 3,
        fontSize: 10,
        color: '#666',
    },
    cProDesBlock: {
        backgroundColor: '#fff',
        marginTop: 10,
        padding: 10,
    },
    CProDesTit: {
        fontSize: 16,
        paddingBottom: 3,
        fontWeight: 'bold',
    },
    cCatTitle: {
        flexDirection: 'row',
    },
    cLoadCenter: {
        flexDirection: 'row',
    },
    cCatTitTex: {
        fontSize: 16,
    },
    cCatShowTex: {
        fontSize: 16,
    },
    cProBotBlocck: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        paddingVertical: 6,
        paddingHorizontal: 10,
        backgroundColor: '#fff',
        borderColor: '#BEBEBE',
        borderTopWidth: 1,
        flexDirection: 'row',
        paddingBottom: 20,
    },
    cProBotFlex: {
        alignItems: 'center',
        borderRightWidth: 1,
        borderRightColor: '#BEBEBE',
        marginRight: 10,
        paddingRight: 10,
    },
    cProBadge: {
        position: 'absolute',
        top: -3,
        right: -10,
        backgroundColor: '#FF0000',
        borderRadius: 10,
        paddingHorizontal: 5,
        color: '#fff',
        fontSize: 12,
    },
    cProBotText: {
        fontSize: 12,
    },
    cProBotBtn: {
        flex: 1,
    },
    fwbold: {
        fontWeight: 'bold'
    }
});