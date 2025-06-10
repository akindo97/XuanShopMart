
import React, { useEffect, useState, useRef } from 'react';
import { View, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
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

    // tìm kiếm
    const [searchQuery, setSearchQuery] = useState('');

    // Lưu trữ danh mục đã chọn
    // Mặc định là 0 (Tất cả)
    const [selected, setSelected] = useState(0);

    // Tham chiếu đến ScrollView và các tab
    // Sử dụng useRef để giữ tham chiếu đến ScrollView và các tab
    const scrollRef = useRef(null);
    const tabRefs = useRef({});

    // Khi người dùng chọn một danh mục, mặc định là 0 (Tất cả)
    useEffect(() => {
        setSelected(categoryId);

        // Tìm index của categoryId trong danh sách tab
        const tabRef = tabRefs.current[categoryId];

        if (tabRef && scrollRef.current) {
            setTimeout(() => {
                tabRef.measure((fx, fy, width, height, px, py) => {
                    // `px` là vị trí X tuyệt đối trên màn hình
                    scrollRef.current.scrollTo({ x: px - 16, animated: true }); // scroll tới đó, có thể trừ thêm padding nếu cần
                });
            }, 0); // delay 0 để đảm bảo tab đã được render xong
        }
    }, [categoryId]);



    // Gom tât cả sản phẩm từ các danh mục để tạo danh sách tất cả sản phẩm
    const allProduct = category.flatMap((catalog) => catalog.products);
    // Tạo danh sách mới với mục "Tất cả" ở đầu
    let newCategory = [
        {
            id: 0,
            name: 'Tất cả',
            products: allProduct,
        },
        ...category];

    return (
        <>
            <Header searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
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

                <View style={[commonStyles.bgrWhite, commonStyles.flex1, {paddingTop: 8}]}>
                    <HorizontalList isHorizontal={false}
                        // Các sản phẩm trong danh mục
                        products={newCategory[selected].products}
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