import React, { useLayoutEffect, useState } from 'react';
import { TextInput, Searchbar } from 'react-native-paper';
import { View, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const SearchScreen = () => {
    const [keyword, setKeyword] = useState('');
    const navigation = useNavigation();

    useLayoutEffect(() => {
        navigation.setOptions({
            headerTitle: () => (
                <View style={{ flex: 1, paddingTop: 8 }}>
                    <Searchbar
                        placeholder="Tìm kiếm sản phẩm..."
                        value={keyword}
                        onChangeText={setKeyword}
                        style={styles.cSearchBar}
                        inputStyle={styles.inputStyle}
                    />
                </View>
            ),
        });
    }, [navigation, keyword]);

    // Bạn có thể xử lý tìm kiếm tại đây
    // useEffect(() => { ... gọi API với keyword ... }, [keyword]);

    return (
        <View>
            {/* Nội dung khác của màn hình */}
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
});

export default SearchScreen;