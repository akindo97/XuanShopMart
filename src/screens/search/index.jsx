import React, { useEffect, useLayoutEffect, useState, useRef } from 'react';
import { TextInput, Searchbar, Button } from 'react-native-paper';
import { View, StyleSheet, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { RecentKeywords, PopularKeywords } from '../../components/recentkeywords';
import { apiRequest } from '../../api';
import HorizontalList from '../../components/horizontallist';
import { Loading } from '../../components/loading';

const SearchScreen = () => {
    const navigation = useNavigation();
    const [keyword, setKeyword] = useState('');
    // Trạng thái loading
    const [loading, setLoading] = useState(false);
    const [keywordToAdd, setKeywordToAdd] = useState('');

    const searchRef = useRef(null);

    // các từ khoá phổ biến
    const popular = [
        'bún khô',
        'phở khô',
        'gà ủ muối',
        'xúc xích',
        'bánh tráng',
        'miến dong',
        'mộc nhĩ khô',
        'nấm hương',
        'gạo'
    ];

    const handleSearch = () => {
        if (!keyword) return;
        setKeywordToAdd(keyword.trim());
        handleKeywordSelect(keyword.trim());
        // setKeyword('');
    };

    const handleKeywordSelect = (keyword) => {
        if (!keyword) return;
        searchRef.current?.blur();
        // Thực hiện tìm kiếm lại với từ khoá được chọn
        // console.log('Selected:', keyword);
        searchProducts(keyword);
        setKeyword(keyword);
    };

    useLayoutEffect(() => {
        // let inputRef = null;
        navigation.setOptions({
            headerTitle: () => (
                <View style={{ flex: 1, paddingTop: 3 }}>
                    <Searchbar
                        ref={searchRef}
                        placeholder="Tìm kiếm sản phẩm..."
                        value={keyword}
                        onChangeText={setKeyword}
                        style={styles.cSearchBar}
                        inputStyle={styles.inputStyle}
                        onSubmitEditing={() => {
                            handleSearch();
                        }}
                    />
                </View>
            ),
        });
        // Focus vào input khi component mount
        setTimeout(() => {
            if (searchRef && !keyword) {
                searchRef.current.focus();
            }
        }, 300);
    }, [navigation, keyword]);

    const [products, setProducts] = useState([]);

    // Tìm kiếm
    const searchProducts = async (keyword) => {
        setLoading(true);
        try {
            const res = await apiRequest('/search', {
                method: 'POST',
                data: {
                    keyword: keyword
                }
            });
            const result = res.data;
            // console.log(res);
            setProducts(result);
        } catch (err) {
            // console.log(err.message || 'Đã có lỗi xảy ra');
        } finally {
            setLoading(false);
        }
    }

    return (
        <View style={{ flex: 1 }}>
            <View style={{ height: 10, backgroundColor: '#00CC66' }}></View>
            {/* Loading khi tải dữ liệu */}
            {loading ? (<Loading text='Đang tìm kiếm...' size={60} />) : null}
            {products.length && !loading ?
                <View style={{ flex: 1 }}>
                    <Text style={{ backgroundColor: '#ffffff', marginBottom: 10, padding: 10, fontSize: 16, fontWeight: 'bold' }} >
                        Kết quả tìm kiếm {keyword}
                    </Text>
                    <View style={{ backgroundColor: '#ffffff', paddingBottom: 60 }}>
                        <HorizontalList products={products} isHorizontal={false} random={false} />
                    </View>
                </View>
                :
                null}
            <View style={{ display: !products.length && !loading ? 'flex' : 'none' }}>
                <View style={{ backgroundColor: '#ffffff', marginBottom: 10 }}>
                    <View style={[styles.cSearchBlock, { height: 100 }]}>
                        <Text style={styles.cSearchTitle}>Lịch sử tìm kiếm</Text>
                        <RecentKeywords
                            addKeyword={keywordToAdd}
                            onSelect={handleKeywordSelect}
                        />
                    </View>
                </View>
                <View style={{ backgroundColor: '#ffffff' }}>
                    <View style={[styles.cSearchBlock]}>
                        <Text style={styles.cSearchTitle}>Tìm kiếm phố biến</Text>
                        {/* <Button onPress={handleSearch}>add</Button> */}
                        <Button onPress={handleSearch} >Search</Button>
                        <PopularKeywords keywords={popular} onSelect={handleKeywordSelect} />
                    </View>
                </View>
            </View>
        </View>
    );
}


const styles = StyleSheet.create({
    cHeaSearchCtn: {
        flex: 1,
        marginLeft: 50,
        marginRight: 2
    },
    cSearchBar: {
        height: 36,
        borderRadius: 20,
        elevation: 0,
        justifyContent: 'center',
    },
    inputStyle: {
        fontSize: 14,
        marginTop: -10,
        paddingVertical: 0,       // giảm khoảng cách trên/dưới
        textAlignVertical: 'center', // hiệu quả trên Android
    },
    cSearchBlock: {
        margin: 10
    },
    cSearchTitle: {
        fontSize: 16,
        fontWeight: 'bold'
    }
});

export default SearchScreen;