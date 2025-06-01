
import React, { useEffect, useState, useRef } from 'react';
import { View, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import Header from '../../components/header';
import { Text } from 'react-native-paper';
import { XproductCatalog } from '../../utils/fakeapi';
import commonStyles from '../../utils/commonstyles';
import HorizontalList from '../../components/horizontallist';

const StoreScreen = ({ route }) => {
    const catalogId = route?.params?.catalogId ?? 0;

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
        setSelected(catalogId);

        // Tìm index của catalogId trong danh sách tab
        const tabRef = tabRefs.current[catalogId];

        if (tabRef && scrollRef.current) {
            setTimeout(() => {
                tabRef.measure((fx, fy, width, height, px, py) => {
                    // `px` là vị trí X tuyệt đối trên màn hình
                    scrollRef.current.scrollTo({ x: px - 16, animated: true }); // scroll tới đó, có thể trừ thêm padding nếu cần
                });
            }, 0); // delay 0 để đảm bảo tab đã được render xong
        }
    }, [catalogId]);



    // Gom tât cả sản phẩm từ các danh mục để tạo danh sách tất cả sản phẩm
    const XproductCatalogAll = XproductCatalog.flatMap((catalog) => catalog.item);
    // Tạo danh sách mới với mục "Tất cả" ở đầu
    const newProductCatalog = [
        {
            id: 0,
            name: 'Tất cả',
            item: XproductCatalogAll,
        },
        ...XproductCatalog]



    return (
        <>
            <Header searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
            <View style={[commonStyles.bgrColor, commonStyles.flex1]}>
                <View style={{ paddingBottom: 3 }}>
                    <ScrollView
                        ref={scrollRef}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={styles.container}
                    >
                        {newProductCatalog.map((catalog, index) => (
                            <TouchableOpacity
                                key={catalog.id}
                                ref={(ref) => {
                                    if (ref) tabRefs.current[catalog.id] = ref;
                                }}
                                onPress={() => setSelected(catalog.id)} style={styles.tab}>
                                <Text
                                    style={[
                                        styles.text,
                                        selected === catalog.id && styles.selectedText,
                                    ]}
                                >
                                    {catalog.name}
                                </Text>
                                {selected === catalog.id && <View style={styles.underline} />}
                            </TouchableOpacity>
                        ))}
                    </ScrollView>
                </View>

                <View style={[commonStyles.bgrWhite, commonStyles.flex1]}>
                    <HorizontalList isHorizontal={false}
                        item={newProductCatalog[selected].item}
                        productList={newProductCatalog[selected]} />
                </View>
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 10,
        paddingTop: 16,
    },
    tab: {
        marginRight: 20,
        alignItems: 'center',
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