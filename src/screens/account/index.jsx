import React, { useState } from 'react';
import { View, Image, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import Headers from '../../components/header';
import commonStyles from '../../utils/commonstyles';
import { Button, Icon, TouchableRipple } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRootContext } from '../../hooks/rootcontext';
import { useDialog } from '../../hooks/dialogcontext';
import { openMessenger, openFanpage } from '../../components/fbmessenger';

const AccountScreen = () => {
    const navigation = useNavigation();
    const { showDialog } = useDialog();
    const { auth, user } = useRootContext();

    const accList = [
        {
            id: 1, name: 'Đơn hàng', subTitle: 'Lịch sử đơn hàng', icon: 'history',
            onPress: () => {
                navigation.navigate('Recents');
            }
        },
        {
            id: 2, name: 'Địa chỉ', subTitle: 'Địa chỉ để nhận hàng', icon: 'map-marker-outline',
            onPress: () => {
                auth ?
                    navigation.navigate('ShipAddress')
                    :
                    showDialog({
                        type: 'confirm',
                        message: 'Bạn cần đăng nhâp/đăng ký thể thêm địa chỉ?',
                        onConfirm: () => navigation.navigate('RegisterLogin'),
                        ok: 'Đăng nhập/đăng ký',
                    });
            }
        },
        {
            id: 3, name: 'Tích điểm', subTitle: 'Tích điểm cho mỗi đơn hàng', icon: 'star-four-points-outline',
            onPress: () => {
                // console.log('Tích điểm');
            }
        },
        {
            id: 4, name: 'Voucher', subTitle: 'Tiết kiệm nhiều hơn với mã giảm giá', icon: 'ticket-percent-outline',
            onPress: () => {
                navigation.navigate('Voucher');
            }
        },
        {
            id: 5, name: 'Điều khoản & chính sách', subTitle: 'Bảo mật, sử dụng và hoàn trả', icon: 'shield-account-outline',
            onPress: () => {
                navigation.navigate('PolicyPrivacy');
            }
        },
        {
            id: 6, name: 'Liên hệ', subTitle: 'Liên hệ trực tiếp với chúng tôi', icon: 'chat-outline',
            onPress: () => openMessenger()
        },
        {
            id: 7, name: 'Fanpage', subTitle: 'Ghé thăm fanpage chính thức', icon: 'facebook',
            onPress: () => openFanpage()
        },
        ,
        {
            id: 8, name: 'Hướng dẫn', subTitle: 'Hướng dẫn sử dụng và chuyển khoản', icon: 'information-outline',
            onPress: () => {
                navigation.navigate('Guide');
            }
        },
    ];

    return (
        <>
            <Headers title="Tài khoản" />
            <View style={[commonStyles.bgrColor]}>
                <LinearGradient colors={['#00CC66', '#EEEEEE', '#FFFFFF']}
                    style={styles.cAccBlock}>
                    <TouchableOpacity style={styles.cAccBlockUp}
                        onPress={() => {
                            auth ?
                                // Đăng nhập rồi thì vào trang cá nhân
                                navigation.navigate('Profile')
                                :
                                // Chưa đăng nhập thì vào trang đăng ký
                                navigation.navigate('RegisterLogin')
                        }}>
                        <View>
                            <Image source={require('../../../assets/icons/edit-info.png')} style={styles.cAccAvatar} />
                        </View>
                        <View style={styles.cAccCen}>
                            <Text style={[commonStyles.font20, commonStyles.fwblob]}>
                                {auth ? user.last_name : 'Khách hàng'}
                            </Text>
                            <Text style={[commonStyles.blurredText, commonStyles.font13]}>
                                {
                                    auth ?
                                        'Tiếp tục mua sắm để tăng điểm và đổi quà ngay hôm nay!'
                                        :
                                        'Đăng nhập hoặc đăng ký để nhận tích điểm và nhận thêm nhiều ưu đãi!'
                                }
                            </Text>
                        </View>
                        <View style={{ alignSelf: 'center', paddingRight: 10 }}>
                            <Text style={commonStyles.fwblob}>＞</Text>
                        </View>
                    </TouchableOpacity>
                    {/* Khoảng trống giữa phần trên và nút đăng ký, đăng nhập */}
                    <View style={[commonStyles.bgrColor, { height: 20 }]}></View>
                    {auth ?
                        <View style={styles.cAccButCtn}>
                            <TouchableRipple borderless rippleColor={'transparent'}
                                onPress={() => console.log("Point")}>
                                <LinearGradient colors={['orange', '#FFFFFF']}
                                    style={styles.cAccButGradient} >
                                    <View style={styles.AccButContent}>
                                        <Icon source="star-four-points-outline" size={20} color="#000000" />
                                        <Text style={styles.AccButText}>Số điểm {user.points}</Text>
                                    </View>
                                </LinearGradient>
                            </TouchableRipple>
                            <TouchableRipple borderless rippleColor={'transparent'}
                                onPress={() => navigation.navigate('Profile')}>
                                <LinearGradient colors={['#00CC66', '#FFFFFF']}
                                    style={styles.cAccButGradient} >
                                    <View style={styles.AccButContent}>
                                        <Icon source="account-edit" size={20} color="#000000" />
                                        <Text style={styles.AccButText}>Tài khoản</Text>
                                    </View>
                                </LinearGradient>
                            </TouchableRipple>
                        </View>
                        :
                        // nút đăng ký và đăng nhập nếu chưa đăng nhập
                        < View style={styles.cAccButCtn}>
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
                    }

                </LinearGradient >
            </View >

            <ScrollView style={[commonStyles.bgrColor, commonStyles.flex1, commonStyles.pHorizontal10 ]}>
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