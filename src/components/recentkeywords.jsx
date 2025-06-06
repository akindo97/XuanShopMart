import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = 'recent_keywords';

// Component hiển thị và quản lý từ khóa gần đây
export const RecentKeywords = ({ addKeyword, onSelect }) => {
    const [keywords, setKeywords] = useState([]);

    // Tải từ khóa từ AsyncStorage khi component được mount
    useEffect(() => {
        loadKeywords();
    }, []);

    // Lưu từ khóa mới mỗi khi addKeyword thay đổi
    useEffect(() => {
        if (addKeyword) {
            saveKeyword(addKeyword);
        }
    }, [addKeyword]);

    // Hàm tải từ khóa từ AsyncStorage
    const loadKeywords = async () => {
        const stored = await AsyncStorage.getItem(STORAGE_KEY);
        setKeywords(stored ? JSON.parse(stored) : []);
    };

    // Hàm lưu từ khóa mới vào AsyncStorage
    const saveKeyword = async (keyword) => {
        if (!keyword.trim()) return; // Bỏ qua từ khóa rỗng hoặc chỉ chứa khoảng trắng
        let newKeywords = keywords.filter(k => k !== keyword); // Loại bỏ từ khóa trùng lặp
        newKeywords.unshift(keyword); // Thêm từ khóa mới vào đầu danh sách
        if (newKeywords.length > 10) newKeywords = newKeywords.slice(0, 10); // Giới hạn danh sách tối đa 10 từ khóa
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(newKeywords));
        setKeywords(newKeywords);
    };

    // Hàm xóa từ khóa khỏi AsyncStorage
    const deleteKeyword = async (keyword) => {
        const newKeywords = keywords.filter(k => k !== keyword); // Loại bỏ từ khóa
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(newKeywords));
        setKeywords(newKeywords);
    };

    return (
        <View style={{
            flexDirection: 'row',
            flexWrap: 'wrap',
            gap: 8,
            marginTop: 10,
        }}>
            {keywords.map((k, i) => (
                <View
                    key={i}
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        backgroundColor: '#eee',
                        paddingHorizontal: 10,
                        paddingVertical: 6,
                        borderRadius: 20,
                        marginRight: 6,
                        marginBottom: 6,
                    }}
                >
                    {/* Văn bản từ khóa với handler onSelect */}
                    <TouchableOpacity onPress={() => onSelect && onSelect(k)}>
                        <Text>{k}</Text>
                    </TouchableOpacity>
                    {/* Nút xóa từ khóa */}
                    <TouchableOpacity onPress={() => deleteKeyword(k)}>
                        <Text style={{ color: 'red', marginLeft: 8 }}>×</Text>
                    </TouchableOpacity>
                </View>
            ))}
        </View>
    );
};

// Component hiển thị các từ khoá phổ biến
export const PopularKeywords = ({ keywords = [], onSelect }) => {
    return (
        <View
            style={{
                flexDirection: 'row',
                flexWrap: 'wrap',
                gap: 8,
                marginTop: 10,
            }}
        >
            {keywords.map((k, i) => (
                <TouchableOpacity
                    key={i}
                    onPress={() => onSelect && onSelect(k)}
                    style={{
                        backgroundColor: '#eee',
                        paddingHorizontal: 12,
                        paddingVertical: 6,
                        borderRadius: 20,
                        marginRight: 6,
                        marginBottom: 6,
                    }}
                >
                    <Text>{k}</Text>
                </TouchableOpacity>
            ))}
        </View>
    );
};

