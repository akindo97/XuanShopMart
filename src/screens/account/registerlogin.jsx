import React, { useState } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, View, Text, StyleSheet } from 'react-native';
import { Button, Icon, TextInput, TouchableRipple } from 'react-native-paper';
import commonStyles from '../../utils/commonstyles';
import { apiRequest } from '../../api';
import { useRootContext } from '../../hooks/rootcontext';
import styles from './styles';
import { useNavigation } from '@react-navigation/native';
import { showMessage } from 'react-native-flash-message';
import { FullLoading } from '../../components/loading';
import { useDialog } from '../../hooks/dialogcontext';

const RegisterLoginScreen = ({ route }) => {
    const navigation = useNavigation();
    const { showDialog } = useDialog();

    // Nếu có tham số isLoginScreen thì sử dụng, nếu không thì mặc định là true (đăng nhập)
    const isLoginScreen = route.params?.isLoginScreen ?? true;

    // Trạng thái loading
    const [loading, setLoading] = useState(false);

    // 
    const { deviceId, setUserInfo } = useRootContext();

    // State phân biệt đăng nhập và đăng ký
    const [isLogin, setIsLogin] = useState(isLoginScreen);
    // E-mail
    const [email, setEmail] = useState("");
    // Mật khẩu
    const [password, setPassword] = useState("");
    // Hiển thị mật khẩu
    const [showPassword, setShowPassword] = useState(false);
    // Nhập lại mật khẩu
    const [rePassword, setRePassword] = useState("");
    // Hiển thị nhập lại mật khẩu
    const [showRePassword, setShowRePassword] = useState(false);
    // Họ
    const [firstName, setFirstName] = useState("");
    // Tên đệm & tên
    const [lastName, setLastName] = useState("");
    // Số điện thoại
    const [phone, setPhone] = useState("");

    // Hàm đăng nhập
    const loginApi = async () => {
        setLoading(true);
        try {
            const res = await apiRequest('/login', {
                method: 'POST',
                data: {
                    device_id: deviceId,
                    email: email,
                    password: password
                }
            });
            console.log(res);
            const { token, user } = res;
            setUserInfo({
                user: user,
                token: token
            });

            // Nếu có đơn hàng trong thiết bị
            if (res.has_purchases) {
                showDialog({
                    type: 'confirm',
                    message: 'Bạn có đơn hàng đã đặt trên thiết bị này, bạn có muốn đồng bộ với tài khoản không? Nếu bạn không đồng bộ thì đơn hàng sẽ không hiển thị khi đăng nhập.',
                    onConfirm: () => assignOrder(token),
                    onCancel: () => goHome('Đăng nhập thành công'),
                    ok: 'Đồng bộ',
                });
            } else {
                goHome('Đăng nhập thành công');
            }
        } catch (err) {
            console.log(err.message || 'Đã có lỗi xảy ra');
        } finally {
            setLoading(false);
        }
    }

    // Hàm đăng ký
    const registerApi = async () => {
        setLoading(true);
        try {
            const res = await apiRequest('/register', {
                method: 'POST',
                data: {
                    device_id: deviceId,
                    email: email,
                    password: password,
                    first_name: firstName,
                    last_name: lastName,
                    phone: phone
                }
            });
            const { token, user } = res;
            setUserInfo({
                user: user,
                token: token
            });

            // Nếu có đơn hàng trong thiết bị
            if (res.has_purchases) {
                showDialog({
                    type: 'confirm',
                    message: 'Bạn có đơn hàng đã đặt trên thiết bị này, bạn có muốn đồng bộ với tài khoản không? Nếu bạn không đồng bộ thì đơn hàng sẽ không hiển thị khi đăng nhập.',
                    onConfirm: () => assignOrder(token),
                    onCancel: () => goHome('Đăng ký thành công'),
                    ok: 'Đồng bộ',
                });
            } else {
                goHome('Đăng ký thành công');
            }

        } catch (err) {
            console.log(err.message || 'Đã có lỗi xảy ra');
        } finally {
            setLoading(false);
        }
    }

    // Hàm đưa về màn hình chính và thông báo
    const goHome = (message) => {
        navigation.replace('Main');
        showMessage({
            message: message,
            type: 'info'
        });
    }

    // Hàm đồng bộ đơn hàng nếu có
    const assignOrder = async (token) => {
        setLoading(true);
        try {
            const res = await apiRequest('/assign-order', {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token}`
                },
                data: {
                    device_id: deviceId
                }
            });
            console.log(res);
            navigation.replace('Main');
            showMessage({
                message: res.message,
                type: 'info'
            })
        } catch (err) {
            console.log(err.message || 'Đã có lỗi xảy ra');
        } finally {
            setLoading(false);
        }
    }

    return (
        <ScrollView
            contentContainerStyle={{ flexGrow: 1 }}
            keyboardShouldPersistTaps="handled">
            {loading ? <FullLoading /> : null}
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={[commonStyles.bgrColor, styles.cRLContainer]}>
                <View style={styles.cRLBlock}>
                    <View style={styles.cRLTitle}>
                        <Text style={styles.cRLTitleText}>
                            {isLogin ? "Đăng nhập" : "Đăng ký"}
                        </Text>
                    </View>
                    {/* logo */}
                    <View>
                        <Icon size={86}
                            source={require('../../../assets/icons/logoxshrv.png')} />
                    </View>
                    <View style={{ width: '100%', paddingVertical: 10 }}>
                        {/* vùng đăng nhập */}
                        <View>
                            <TextInput mode="flat" underlineColor="transparent"
                                label="E-mail"
                                value={email}
                                onChangeText={setEmail}
                                right={<TextInput.Icon icon="email" color="#AAAAAA" />}
                                style={styles.cRLInput}
                                activeUnderlineColor="#00CC66"
                            />
                            <TextInput mode="flat" underlineColor="transparent"
                                label="Mật khẩu"
                                secureTextEntry={!showPassword}
                                value={password}
                                onChangeText={setPassword}
                                right={<TextInput.Icon icon="eye" color="#AAAAAA"
                                    onPress={() => setShowPassword(!showPassword)} />}
                                style={styles.cRLInput}
                                activeUnderlineColor="#00CC66"
                            />
                        </View>
                        {/* Quên mật khẩu, chỉ hiển thị đăng nhập */}
                        {
                            isLogin &&
                            (<View style={styles.xRLForgotBlock}>
                                <TouchableRipple onPress={() => console.log("Quên mật khẩu")}>
                                    <Text style={styles.xRLForgot}>
                                        Quên mật khẩu?
                                    </Text>
                                </TouchableRipple>
                            </View>)
                        }
                        {/* vùng đăng ký, chỉ hiển thị khi đăng ký */}
                        {!isLogin &&
                            (<View>
                                <TextInput mode="flat" underlineColor="transparent"
                                    label="Nhập lại mật khẩu"
                                    secureTextEntry={!showPassword}
                                    value={rePassword}
                                    onChangeText={setRePassword}
                                    right={<TextInput.Icon icon="eye" color="#AAAAAA"
                                        onPress={() => setShowRePassword(!showRePassword)} />}
                                    style={styles.cRLInput}
                                    activeUnderlineColor="#00CC66"
                                />
                                <View style={{ flexDirection: 'row' }}>
                                    <TextInput mode="flat" underlineColor="transparent"
                                        label="Họ"
                                        value={firstName}
                                        onChangeText={setFirstName}
                                        style={[styles.cRLInput, { width: '36%' }]}
                                        activeUnderlineColor="#00CC66"
                                    />
                                    <TextInput mode="flat" underlineColor="transparent"
                                        label="Tên đệm & tên"
                                        value={lastName}
                                        onChangeText={setLastName}
                                        right={<TextInput.Icon icon="card-account-details-outline" color="#AAAAAA" />}
                                        style={[styles.cRLInput, commonStyles.mLeft10, commonStyles.flex1]}
                                        activeUnderlineColor="#00CC66"
                                    />
                                </View>
                                <TextInput mode="flat" underlineColor="transparent"
                                    label="Số điện thoại (nếu có)"
                                    keyboardType="phone-pad"
                                    value={phone}
                                    onChangeText={setPhone}
                                    right={<TextInput.Icon icon="cellphone" color="#AAAAAA" />}
                                    style={styles.cRLInput}
                                    activeUnderlineColor="#00CC66"
                                />
                            </View>)
                        }
                        {
                            isLogin ?
                                // nếu là đăng nhập thì hiển thị nút đăng nhập và đăng ký
                                (<View>
                                    <Button mode="contained" style={[commonStyles.buttonColor, styles.cRLButton]}
                                        onPress={loginApi}>
                                        Đăng nhập
                                    </Button>
                                    <Text style={styles.cRLOrText}>hoặc</Text>
                                    <View style={styles.cRLResgisBlock}>
                                        <Text>Bạn chưa có tài khoản?</Text>
                                        <TouchableRipple onPress={() => setIsLogin(false)}>
                                            <Text style={styles.xRLRegisNow}>
                                                Đăng ký ngay
                                            </Text>
                                        </TouchableRipple>

                                    </View>
                                </View>)
                                :
                                // nếu là đăng ký thì hiển thị nút đăng ký và đăng nhập
                                (<View>
                                    <Button mode="contained" style={[commonStyles.buttonColor, styles.cRLButton]}
                                        onPress={registerApi}>
                                        Đăng ký
                                    </Button>
                                    <Text style={styles.cRLOrText}>hoặc</Text>
                                    <View style={styles.cRLResgisBlock}>
                                        <Text>Bạn đã có tài khoản?</Text>
                                        <TouchableRipple onPress={() => setIsLogin(true)}>
                                            <Text style={styles.xRLRegisNow}>
                                                Đăng nhập ngay
                                            </Text>
                                        </TouchableRipple>

                                    </View>
                                </View>)
                        }
                    </View>
                </View>
            </KeyboardAvoidingView>
        </ScrollView>
    );
}

export default RegisterLoginScreen;