
import React, { useEffect, useState, useRef, useMemo } from 'react';
import { View, ScrollView, StyleSheet, TouchableOpacity, InteractionManager } from 'react-native';
import Header from '../../components/header';
import { Text } from 'react-native-paper';
import { XproductCatalog } from '../../utils/fakeapi';
import commonStyles from '../../utils/commonstyles';
import HorizontalList from '../../components/horizontallist';
import { useRootContext } from '../../hooks/rootcontext';
import MessengerButton from '../../components/fbmessenger';

const StoreScreen = ({ route }) => {
    const categoryId = route?.params?.categoryId ?? 0;

    const { category } = useRootContext();

    const [loading, setLoading] = useState(false);

    // Các sản phẩm đang hiển thị
    const [displayProducts, setDisplayProducts] = useState([]);
    const [page, setPage] = useState(1);
    const itemsPerPage = 30;

    // Danh sách mới
    const newCategory = useMemo(() => {
        // Gom tât cả sản phẩm từ các danh mục để tạo danh sách tất cả sản phẩm
        const allProduct = category.flatMap((catalog) => catalog.products);
        // Tạo danh sách mới với mục "Tất cả" ở đầu
        return (
            [
                {
                    id: 0,
                    name: 'Tất cả',
                    products: allProduct,
                },
                ...category]
        );
    }, [category])

    // Lưu trữ danh mục đã chọn
    // Mặc định là 0 (Tất cả)
    const [selected, setSelected] = useState(0);

    // Tham chiếu đến ScrollView và các tab
    // Sử dụng useRef để giữ tham chiếu đến ScrollView và các tab
    const scrollRef = useRef(null);
    const tabRefs = useRef({});

    // Khi người dùng chọn một danh mục, mặc định là 0 (Tất cả)
    useEffect(() => {
        setPage(1); // Reset page
        setSelected(categoryId);

        // Tìm index của categoryId trong danh sách tab
        const tabRef = tabRefs.current[categoryId];

        if (tabRef && scrollRef.current) {
            setTimeout(() => {
                tabRef.measure((fx, fy, width, height, px, py) => {
                    // `px` là vị trí X tuyệt đối trên màn hình
                    scrollRef.current.scrollTo({ x: px - 16, animated: true }); // scroll tới đó, có thể trừ thêm padding nếu cần
                });
            }, 100); // delay 100 để đảm bảo tab đã được render xong
        }
    }, [categoryId]);


    useEffect(() => {
        const showNow = newCategory.find((item) => item.id === selected);

        if (showNow) {
            const firstPage = showNow.products.slice(0, itemsPerPage);
            setDisplayProducts(firstPage);
            setPage(1);
        }
    }, [selected, newCategory]);

    const handleLoadMore = () => {
        if (loading) return; // tránh gọi liên tục

        InteractionManager.runAfterInteractions(() => {
            const currentCategory = newCategory.find((item) => item.id === selected);
            const totalProducts = currentCategory.products;
            const nextPage = page + 1;
            const nextItems = totalProducts.slice(0, nextPage * itemsPerPage);

            if (nextItems.length === displayProducts.length) return;

            setLoading(true);

            // Giả lập delay tải (giống fetch API)
            setTimeout(() => {
                setDisplayProducts(nextItems);
                setPage(nextPage);
                setLoading(false);
            }, 300); // 300ms delay cho mượt
        });
    };

    return (
        <>
            <Header />
            <View style={[commonStyles.bgrColor, commonStyles.flex1]}>
                {/* danh sách menu category trượt ngang */}
                <View>
                    <ScrollView
                        ref={scrollRef}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={styles.container}
                    >
                        {newCategory.map((category) => (
                            <TouchableOpacity key={category.id}
                                ref={(ref) => {
                                    if (ref) tabRefs.current[category.id] = ref;
                                }}
                                onPress={() => setSelected(category.id)} style={[
                                    styles.tab,
                                    selected === category.id && styles.selectedTab,
                                ]}
                            >
                                <Text
                                    style={[
                                        styles.text,
                                        selected === category.id && styles.selectedText,
                                    ]}
                                >
                                    {category.name}
                                </Text>
                                {selected === category.id && <View style={styles.underline} />}
                            </TouchableOpacity>
                        ))}
                    </ScrollView>
                </View>

                <View style={[commonStyles.bgrWhite, commonStyles.flex1, { paddingTop: 8 }]}>
                    <HorizontalList isHorizontal={false}
                        // Các sản phẩm trong danh mục
                        products={displayProducts}
                        // Khi cuộn tới gần cuối
                        onEndReached={() => handleLoadMore()}
                        loading={loading}
                    />
                </View>
            </View>
            {/* Messenger button */}
            <MessengerButton />
        </>
    )
}

const styles = StyleSheet.create({
    container: {

    },
    tab: {
        alignItems: 'center',
        paddingHorizontal: 15,
        paddingTop: 16,
        paddingBottom: 3,
    },
    selectedTab: {
        backgroundColor: "#fff",
        borderTopLeftRadius: 6,
        borderTopRightRadius: 6,
    },
    text: {
        fontSize: 16,
        color: '#888',
    },
    selectedText: {
        fontWeight: 'bold',
        color: '#000',
    },
    underline: {
        marginTop: 4,
        height: 4,
        width: '100%',
        backgroundColor: '#A2DC26',
        borderRadius: 2,
    },
});

export default StoreScreen;