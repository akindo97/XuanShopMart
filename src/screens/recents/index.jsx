import React, { useEffect, useState, useCallback } from 'react';
import { View, Image, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import Headers from '../../components/header';
import commonStyles from '../../utils/commonstyles';
import { Button, DataTable, Icon, ActivityIndicator } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { ORDER_STATUS, PAY_METHOD } from '../../config/config';
import styles from './styles';
import { apiRequest } from '../../api';
import { fToYen, formatDate } from '../../utils/utils';
import { Loading } from '../../components/loading';
import { useRootContext } from '../../hooks/rootcontext';
import { useFocusEffect } from '@react-navigation/native';
import MessengerButton from '../../components/fbmessenger';

const RecentsScreen = () => {
    const navigation = useNavigation();

    // Lấy deviceId và token từ Root
    const { deviceId, token } = useRootContext();

    // Thanh trang thái trên top
    const [selected, setSelected] = useState(0);

    // Trạng thái loading
    const [loading, setLoading] = useState(true);

    // Lưu trữ data từ API
    const [recents, setRecents] = useState([]);

    // Show list
    const [showRecents, setShowRecents] = useState([]);

    useFocusEffect(
        useCallback(() => {
            const recentsApi = async () => {
                try {
                    setLoading(true);
                    const res = await apiRequest('/recents', {
                        method: 'POST',
                        headers: {
                            Authorization: `Bearer ${token}`,
                        }
                    });
                    setRecents(res.data);
                } catch (err) {
                    console.log(err.message || 'Đã có lỗi xảy ra');
                } finally {
                    setLoading(false);
                }
            };

            recentsApi();
        }, [token, deviceId])
    );

    useEffect(() => {
        const filterRecents = recents.filter((recent) => selected == 0 || recent.order_status == selected);
        setShowRecents(filterRecents);
    }, [recents, selected]);

    return (
        <>
            <Headers title="Đơn hàng" />
            <View>
                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                >
                    {
                        Object.keys(ORDER_STATUS).map((statu, index) => {
                            return (
                                (
                                    <TouchableOpacity key={index}
                                        onPress={() => setSelected(statu)} style={[
                                            styles.tab,
                                            selected == statu && recents.length && styles.selectedTab,
                                        ]}
                                    >
                                        <Text
                                            style={[
                                                styles.text,
                                                selected == statu && recents.length && styles.selectedText,
                                            ]}
                                        >
                                            {ORDER_STATUS[statu].label}
                                        </Text>
                                        {selected == statu && <View style={styles.underline} />}
                                    </TouchableOpacity>
                                )
                            )
                        })
                    }
                </ScrollView>

                {/* Loading khi tải dữ liệu */}
                {loading ? (<Loading />) :
                    (
                        <>
                            {/* Nếu đơn hàng hàng trống */}
                            {
                                !recents.length ?
                                    <View>
                                        <Image
                                            source={require('../../../assets/icons/empty-box.png')}
                                            style={styles.cRencentEmpty} />
                                        <Text style={styles.cRencentEmptyText}>
                                            Bạn chưa có đơn hàng nào
                                        </Text>
                                        <Button mode="contained" style={styles.cRencentEmptyButton}
                                            onPress={() => navigation.navigate('Home')}>
                                            Shop now
                                        </Button>
                                    </View> :
                                    <ScrollView contentContainerStyle={{ paddingBottom: 180 }}>
                                        {/* Nếu có đơn hàng */}
                                        <View style={{ backgroundColor: "#ffffff", height: 10 }}></View>
                                        <View style={{ padding: 10 }}>
                                            {
                                                showRecents.map((recent, index) => (
                                                    <TouchableOpacity key={index} onPress={() => {
                                                        navigation.navigate('Detail', { recent: recent })
                                                    }}>
                                                        <View style={styles.cRecentBlock}>
                                                            <View style={styles.cRecentBlockLeft}>
                                                                <View style={styles.cRecentBlockLine}>
                                                                    <Icon source="clock-time-eight-outline" size={18} />
                                                                    <Text style={styles.cRecentBlockTextT}>Ngày đặt</Text>
                                                                    <Text style={styles.cRecentBlockTextC}>{formatDate(recent.created_at)}</Text>
                                                                </View>
                                                                <View style={styles.cRecentBlockLine}>
                                                                    <Icon source="cryengine" size={18} />
                                                                    <Text style={styles.cRecentBlockTextT}>Mã đơn</Text>
                                                                    <Text style={[styles.cRecentBlockTextC, { fontWeight: 'bold', color: 'orange' }]}>
                                                                        {recent.order_code}
                                                                    </Text>
                                                                </View>
                                                                <View style={styles.cRecentBlockLine}>
                                                                    <Icon source="credit-card-settings-outline" size={18} />
                                                                    <Text style={styles.cRecentBlockTextT}>Phương thức</Text>
                                                                    <Text style={styles.cRecentBlockTextC}>
                                                                        {PAY_METHOD[recent.payment_method].shorten}
                                                                    </Text>
                                                                </View>
                                                                <View style={styles.cRecentBlockLineLast}>
                                                                    <Icon source="currency-jpy" size={18} />
                                                                    <Text style={styles.cRecentBlockTextT}>Tổng tiền</Text>
                                                                    <Text style={[styles.cRecentBlockTextC, { fontWeight: 'bold', fontSize: 15 }]}>
                                                                        ￥{fToYen(recent.total_amount)}
                                                                    </Text>
                                                                </View>
                                                            </View>
                                                            <View style={styles.cRecentBlockRight}>
                                                                {/* Trạng thái */}
                                                                <Text style={[styles.cRecentBlockStt, { backgroundColor: ORDER_STATUS[recent.order_status].color }]}>
                                                                    {ORDER_STATUS[recent.order_status].label}
                                                                </Text>
                                                                <View>
                                                                    <Button mode='contained' style={commonStyles.buttonColor}>
                                                                        Chi tiết
                                                                    </Button>
                                                                </View>
                                                            </View>
                                                        </View>
                                                    </TouchableOpacity>
                                                ))
                                            }
                                            {showRecents.length ?
                                                <Text style={styles.cRecentBlockGuide}>Chạm để xem chi tiết và cách thanh toán </Text> : null
                                            }
                                        </View>
                                    </ScrollView>
                            }
                        </>
                    )
                }
            </View >
            {/* Messenger button */}
            <MessengerButton />
        </>
    );
}

export default RecentsScreen;