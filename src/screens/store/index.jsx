
import React, { useEffect, useState, useRef, useMemo } from 'react';
import { View, ScrollView, StyleSheet, TouchableOpacity, InteractionManager } from 'react-native';
import Header from '../../components/header';
import { Text } from 'react-native-paper';
import commonStyles from '../../utils/commonstyles';
import HorizontalList from '../../components/horizontallist';
import { useRootContext } from '../../hooks/rootcontext';
import { Loading } from '../../components/loading';
import MessengerButton from '../../components/fbmessenger';
import { shuffleArray } from '../../utils/utils';

const StoreScreen = ({ route }) => {
    const categoryId = route?.params?.categoryId ?? 0;

    const { category } = useRootContext();

    const [loading, setLoading] = useState(false);

    // Kiểm tra load lần đầu
    const is_first = useRef(true);
    // Tất cả sản phẩm trong 1 danh mục
    const [allProductInCa, setAllProductInCa] = useState([]);

    // Các sản phẩm đang hiển thị
    const [displayProducts, setDisplayProducts] = useState([]);
    const [page, setPage] = useState(1);
    const itemsPerPage = 20;

    // Danh sách mới
    const newCategory = useMemo(() => {
        // Gom tât cả sản phẩm từ các danh mục để tạo danh sách tất cả sản phẩm
        // Loại bỏ sale để tránh trùng lặp
        const allProduct = category.filter((catalog) => catalog.name !== 'Sale').flatMap((catalog) => catalog.products);
        // Xáo trộn thứ tự các sản phẩm
        const shuffle = shuffleArray(allProduct);
        // Tạo danh sách mới với mục "Tất cả" ở đầu
        return (
            [
                {
                    id: 0,
                    name: 'Tất cả',
                    products: shuffle,
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
            // Đưa các sản phẩm hiển thị lại trang 1
            setPage(1);
            // Xáo trộn thứ tự các sản phẩm
            // const shuffle = shuffleArray(showNow.products);
            // Lưu để hiển thị thêm khi cuộn
            // setAllProductInCa(shuffle);
            setAllProductInCa(showNow.products);
            // Hiển thị số sản phẩm đầu tiên
            // const firstPage = shuffle.slice(0, itemsPerPage);
            const firstPage = showNow.products.slice(0, itemsPerPage);
            setDisplayProducts(firstPage);
        }
    }, [selected, newCategory]);

    const handleLoadMore = () => {
        // console.log('handleLoadMore');
        // console.log('is_first.current', is_first.current);
        // console.log('loading', loading);

        // Tránh gọi đúp khi chạy
        if (is_first.current) {
            is_first.current = false;
            return;
        };
        // tránh gọi liên tục
        if (loading) return;

        InteractionManager.runAfterInteractions(() => {
            const nextPage = page + 1; // Thêm page
            // Cắt thêm các item mới
            const nextItems = allProductInCa.slice(0, nextPage * itemsPerPage);
            // console.log('nextPage * itemsPerPage', nextPage * itemsPerPage)

            if (nextItems.length === displayProducts.length) return;

            setLoading(true);

            // Giả lập delay tải (giống fetch API)
            setTimeout(() => {
                setDisplayProducts(nextItems); // Thêm các sản phẩm mới
                setPage(nextPage); // Thêm trang
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