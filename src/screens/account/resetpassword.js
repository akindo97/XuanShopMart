import React, { useState } from 'react';
import { ScrollView, KeyboardAvoidingView, Platform, View } from 'react-native';
import { TextInput, Button, Text, TouchableRipple } from 'react-native-paper';
import styles from './styles';
import commonStyles from '../../utils/commonstyles';
import { useNavigation } from '@react-navigation/native';
import { apiRequest } from '../../api';
import { useDialog } from '../../hooks/dialogcontext';
import { isEmail } from '../../utils/utils';

const ResetPasswordScreen = () => {
    const navigation = useNavigation();
    const { showDialog } = useDialog();

    const [stage, setStage] = useState(1);
    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    // Gửi mã OTP
    const sendOtp = async () => {
        if (!isEmail(email)) {
            setError("Email chưa đúng hoặc chưa nhập.");
            return;
        }
        try {
            setLoading(true);
            setError("");
            const res = await apiRequest('/send-otp', {
                method: 'POST',
                data: {
                    email: email,
                }
            });
            setStage(2);
        } catch (err) {
            setError(err.message || 'Đã có lỗi xảy ra');
        } finally {
            setLoading(false);
        }
    };

    // Xác nhận mã OTP
    const verifyOtp = async () => {
        if (!otp) {
            setError("Chưa nhập otp.");
            return;
        }
        try {
            setLoading(true);
            setError("");
            const res = await apiRequest('/verify-otp', {
                method: 'POST',
                data: {
                    email: email,
                    otp: otp,
                }
            });
            console.log(res);
            setStage(3);
        } catch (err) {
            setError(err.message || 'Đã có lỗi xảy ra');
        } finally {
            setLoading(false);
        }
    }

    // Đặt lại mật khẩu
    const verifyOtpAndReset = async () => {
        if (!password || !confirmPassword || (password !== confirmPassword)) {
            setError("Hãy kiểm tra lại mật khẩu");
            return;
        }
        if (password.length < 6) {
            setError("Mật khẩu phải có trên 6 ký tự");
            return;
        }

        try {
            setLoading(true);
            setError("");
            const res = await apiRequest('/verify-otp-and-reset', {
                method: 'POST',
                data: {
                    email: email,
                    otp: otp,
                    password: password,
                    password_confirmation: confirmPassword
                }
            });
            console.log(res);
            showDialog({
                type: 'alert',
                message: 'Mật khẩu của bạn đã được đặt lại thành công.',
                onConfirm: () => navigation.navigate('RegisterLogin'),
            });
        } catch (err) {
            setError(err.message || 'Đã có lỗi xảy ra');
        } finally {
            setLoading(false);
        }
    }

    return (
        <ScrollView contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps="handled">
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={[commonStyles.bgrColor, styles.cRLContainer]}>
                <View style={styles.cRLBlock}>
                    <View style={styles.cRLTitle}>
                        <Text style={styles.cRLTitleText}>Đặt lại mật khẩu</Text>
                    </View>
                    {error ?
                        <Text style={{ color: 'red', fontWeight: 'bold', alignSelf: 'flex-start' }}>
                            {error}
                        </Text> : null
                    }
                    <View style={{ width: '100%', paddingVertical: 10 }}>
                        {stage === 1 ?
                            <View>
                                <Text style={styles.cRPLabel}>
                                    Nhập địa chỉ email để khôi phục tài khoản của bạn.
                                </Text>
                                <TextInput
                                    label="Email"
                                    value={email}
                                    onChangeText={setEmail}
                                    right={<TextInput.Icon icon="email" color="#AAAAAA" />}
                                    style={styles.cRLInput}
                                    activeUnderlineColor="#00CC66"
                                />

                                <Button
                                    mode="contained"
                                    style={[commonStyles.buttonColor, styles.cRLButton]}
                                    loading={loading}
                                    disabled={loading}
                                    onPress={sendOtp}>
                                    Gửi mã OPT
                                </Button>
                            </View> : null
                        }
                        {stage === 2 ?
                            <View>
                                <Text style={styles.cRPLabel}>
                                    Nhập mã OPT đã nhận.
                                </Text>
                                <TextInput
                                    label="Mã OTP"
                                    value={otp}
                                    onChangeText={setOtp}
                                    right={<TextInput.Icon icon="lock" color="#AAAAAA" />}
                                    style={styles.cRLInput}
                                    activeUnderlineColor="#00CC66"
                                    maxLength={6}
                                />
                                <Text style={{ fontSize: 13, color: "#888888" }}>
                                    Nếu bạn không thấy email trong hộp thư đến, vui lòng kiểm tra thư mục spam (hoặc thư rác)
                                </Text>
                                <Button
                                    mode="contained"
                                    style={[commonStyles.buttonColor, styles.cRLButton]}
                                    loading={loading}
                                    disabled={loading}
                                    onPress={verifyOtp}>
                                    Xác nhận
                                </Button>
                            </View> : null
                        }
                        {stage === 3 ?
                            <View>
                                <Text style={styles.cRPLabel}>
                                    Nhập mật khẩu mới của bạn.
                                </Text>
                                <TextInput
                                    label="Mật khẩu mới"
                                    secureTextEntry={!showPassword}
                                    value={password}
                                    onChangeText={setPassword}
                                    right={<TextInput.Icon icon="eye" color="#AAAAAA"
                                        onPress={() => setShowPassword(!showPassword)} />}
                                    style={styles.cRLInput}
                                    activeUnderlineColor="#00CC66"
                                />

                                <TextInput
                                    label="Nhập lại mật khẩu"
                                    secureTextEntry={!showPassword}
                                    value={confirmPassword}
                                    onChangeText={setConfirmPassword}
                                    right={<TextInput.Icon icon="eye" color="#AAAAAA"
                                        onPress={() => setShowPassword(!showPassword)} />}
                                    style={styles.cRLInput}
                                    activeUnderlineColor="#00CC66"
                                />
                                <Button
                                    mode="contained"
                                    style={[commonStyles.buttonColor, styles.cRLButton]}
                                    loading={loading}
                                    disabled={loading}
                                    onPress={verifyOtpAndReset}>
                                    Đặt lại mật khẩu
                                </Button>
                            </View> : null
                        }

                        <View style={[styles.cRLResgisBlock, { marginTop: 30 }]}>
                            <Text>Đã nhớ mật khẩu?</Text>
                            <TouchableRipple onPress={() => navigation.goBack()}>
                                <Text style={styles.xRLRegisNow}>Đăng nhập ngay</Text>
                            </TouchableRipple>
                        </View>
                    </View>
                </View>
            </KeyboardAvoidingView>
        </ScrollView>
    );
};

export default ResetPasswordScreen;
