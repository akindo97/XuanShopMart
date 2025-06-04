import React, { useState } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, View, Text, StyleSheet } from 'react-native';
import { Button, Icon, TextInput, TouchableRipple } from 'react-native-paper';
import commonStyles from '../../utils/commonstyles';

const RegisterLoginScreen = ({ route }) => {
    // Nếu có tham số isLoginScreen thì sử dụng, nếu không thì mặc định là true (đăng nhập)
    const isLoginScreen = route.params?.isLoginScreen ?? true;
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


    return (
        <ScrollView
            contentContainerStyle={{ flexGrow: 1 }}
            keyboardShouldPersistTaps="handled">
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
                                        onPress={() => console.log("Đăng nhập")}>
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
                                        onPress={() => console.log("Đăng ký")}>
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

const styles = StyleSheet.create({
    cRLContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    cRLBlock: {
        width: '90%',
        backgroundColor: '#FFFFFF',
        padding: 20,
        borderRadius: 10,
        alignItems: 'center'
    },
    cRLTitle: {
        width: '100%',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderColor: '#DDDDDD',
    },
    cRLTitleText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333333',
        paddingBottom: 10
    },
    cRLInput: {
        backgroundColor: 'white',
        borderColor: '#DDDDDD',
        borderWidth: 1,
        borderRadius: 6,
        paddingHorizontal: 10,
        marginBottom: 10,
    },
    xRLForgotBlock: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        width: '100%'
    },
    xRLForgot: {
        color: '#007BFF',
        textAlign: 'right',
        marginBottom: 10,
        paddingTop: 5,
    },
    cRLButton: {
        paddingVertical: 6,
        borderRadius: 6,
        marginTop: 30,
    },
    cRLOrText: {
        textAlign: 'center',
        marginVertical: 26,
        color: '#888888'
    },
    cRLResgisBlock: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    xRLRegisNow: {
        color: '#007BFF',
        marginLeft: 5,
        fontWeight: 'bold',
    }
})

export default RegisterLoginScreen;