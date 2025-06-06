import React, { useState } from 'react';
import { View, Image, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import Headers from '../../components/header';
import commonStyles from '../../utils/commonstyles';
import { Button, Icon, TouchableRipple } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';

const AccountScreen = () => {
    const navigation = useNavigation();

    const accList = [
        {
            id: 1, name: 'Đơn hàng', subTitle: 'Bạn chưa có đơn hàng nào', icon: 'history',
            onPress: () => {
                navigation.navigate('Recents');
            }
        },
        { id: 2, name: 'Địa chỉ', subTitle: 'Địa chỉ để nhận hàng', icon: 'map-marker-outline' },
        { id: 3, name: 'Tích điểm', subTitle: 'Đăng nhập để tích điểm', icon: 'star-four-points-outline' },
        { id: 4, name: 'Voucher', subTitle: 'Tiết kiệm nhiều hơn với mã giảm giá', icon: 'ticket-percent-outline' },
        { id: 5, name: 'Điều khoản sử dụng', subTitle: 'Chính sách sử sụng dịch vụ', icon: 'shield-account-outline' },
        { id: 6, name: 'Liên hệ', subTitle: 'Liên hệ trực tiếp với chúng tôi', icon: 'chat-outline' },
        { id: 7, name: 'Fanpage', subTitle: 'Ghé thăm fanpage chính thức', icon: 'facebook' },
    ];

    return (
        <>
            <Headers title="Tài khoản" />
            <View style={[commonStyles.bgrColor]}>
                <LinearGradient colors={['#00CC66', '#EEEEEE', '#FFFFFF']}
                    style={styles.cAccBlock}>
                    <View style={styles.cAccBlockUp}>
                        <View>
                            <Image source={require('../../../assets/icons/edit-info.png')} style={styles.cAccAvatar} />
                        </View>
                        <View style={styles.cAccCen}>
                            <Text style={[commonStyles.font20, commonStyles.fwblob]}>
                                Khách hàng
                            </Text>
                            <Text style={[commonStyles.blurredText, commonStyles.font13]}>
                                Đăng nhập hoặc đăng ký để nhận tích điểm và nhận thêm nhiều ưu đãi!
                            </Text>
                        </View>
                        <View style={{ alignSelf: 'center', paddingRight: 10 }}>
                            <Text style={commonStyles.fwblob}>＞</Text>
                        </View>
                    </View>
                    {/* Khoảng trống giữa phần trên và nút đăng ký, đăng nhập */}
                    <View style={[commonStyles.bgrColor, { height: 20 }]}></View>

                    {/* nút đăng ký và đăng nhập */}
                    <View style={styles.cAccButCtn}>
                        <TouchableRipple borderless rippleColor={'transparent'}
                            onPress={() => navigation.navigate('RegisterLogin', { isLoginScreen: false })}>
                            <LinearGradient colors={['#00CC66', '#FFFFFF']}
                                style={styles.cAccButGradient} >
                                <View style={styles.AccButContent}>
                                    <Icon source="account-plus" size={20} color="#000000" />
                                    <Text style={styles.AccButText}>Đăng ký</Text>
                                </View>
                            </LinearGradient>
                        </TouchableRipple>
                        <TouchableRipple borderless rippleColor={'transparent'}
                            onPress={() => navigation.navigate('RegisterLogin', { isLoginScreen: true })}>
                            <LinearGradient colors={['#00CC66', '#FFFFFF']}
                                style={styles.cAccButGradient} >
                                <View style={styles.AccButContent}>
                                    <Icon source="login" size={20} color="#000000" />
                                    <Text style={styles.AccButText}>Đăng nhập</Text>
                                </View>
                            </LinearGradient>
                        </TouchableRipple>
                    </View>
                </LinearGradient>
            </View>

            <ScrollView style={[commonStyles.bgrColor, commonStyles.flex1, commonStyles.pHorizontal10]}>
                {accList.map((item) => (
                    <TouchableOpacity key={item.id} onPress={item.onPress}>
                        <View style={styles.cAccItemBblock}>
                            <Icon source={item.icon} size={46} />
                            <View style={[commonStyles.flex1, commonStyles.pHorizontal10]}>
                                <Text style={styles.cAccItemTitle}>{item.name}</Text>
                                <Text style={styles.cAccItemSubTitle}>{item.subTitle}</Text>
                            </View>
                            <View style={{ alignSelf: 'center' }}>
                                <Text style={commonStyles.fwblob}>＞</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                ))}
            </ScrollView>
        </>
    );
}

const styles = StyleSheet.create({
    cAccBlock: {
        flexDirection: 'column',
        position: 'relative',
    },
    cAccBlockUp: {
        flexDirection: 'row',
        paddingHorizontal: 10,
    },
    cAccAvatar: {
        width: 80,
        height: 80,
        borderRadius: 50,
        marginBottom: 20,
    },
    cAccCen: {
        flex: 1,
        paddingHorizontal: 10,
    },
    cAccButCtn: {
        position: 'absolute',
        end: 10,
        bottom: 0,
        flexDirection: 'row',
    },
    cAccButGradient: {
        borderRadius: 25,
        overflow: 'hidden',
        padding: 10,
        paddingHorizontal: 16,
        marginLeft: 10,
    },
    AccButContent: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    AccButText: {
        color: '#000000',
        marginLeft: 8,
    },
    cAccItemBblock: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
        paddingVertical: 10,
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#E0E0E0',
        marginTop: 10,
        borderRadius: 8,
    },
    cAccItemTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 3,
    },
    cAccItemSubTitle: {
        fontSize: 14,
        color: '#757575',
    },
});

export default AccountScreen;