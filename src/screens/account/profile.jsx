import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { TextInput, Button, TouchableRipple, RadioButton } from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';
import styles from './styles';
import commonStyles from '../../utils/commonstyles';
import { useRootContext } from '../../hooks/rootcontext';
import { formatDate, isEmail, toMySQLDate } from '../../utils/utils';
import { apiRequest } from '../../api';
import { FullLoading } from '../../components/loading';
import { showMessage } from 'react-native-flash-message';
import { useDialog } from '../../hooks/dialogcontext';
import { useNavigation } from '@react-navigation/native';

export default function ProfileScreen() {
    const navigation = useNavigation();
    const { user, token, setUser, logoutAccount } = useRootContext();
    const { showDialog } = useDialog();

    // Trạng thái loading
    const [loading, setLoading] = useState(false);

    const [isEdit, setIsEdit] = useState(false);
    const [email, setEmail] = useState(user?.email ?? '');
    const [firstName, setFirstName] = useState(user?.first_name ?? '');
    const [lastName, setLastName] = useState(user?.last_name ?? '');
    const [phone, setPhone] = useState(user?.phone ?? '');
    const [gender, setGender] = useState(user?.gender ?? '');
    const [birthDate, setBirthDate] = useState(user?.birth_date ? new Date(user.birth_date) : null);
    const [showDatePicker, setShowDatePicker] = useState(false);

    const [backup, setBackup] = useState({});

    // Xử lý khi nhấn nút "Chỉnh sửa"
    const handleEdit = () => {
        setBackup({ email, firstName, lastName, phone, gender, birthDate });
        setIsEdit(true);
    };

    // Xử lý khi nhấn nút "Huỷ" (khôi phục dữ liệu cũ)
    const handleCancel = () => {
        const { email, firstName, lastName, phone, gender, birthDate } = backup;
        setEmail(email);
        setFirstName(firstName);
        setLastName(lastName);
        setPhone(phone);
        setGender(gender);
        setBirthDate(birthDate);
        setIsEdit(false);
    };

    // Xử lý khi nhấn nút "Lưu" (lưu thông tin chỉnh sửa)
    const handleSave = async () => {
        if (!email || !isEmail(email)) {
            showMessage({
                message: 'email chưa đúng hoặc chưa nhập',
                type: 'danger',
            });
            return;
        }
        if (!lastName) {
            showMessage({
                message: 'Vui lòng nhập tên đệm & tên',
                type: 'danger',
            });
            return;
        }
        setLoading(true);
        try {
            const res = await apiRequest('/edit-profile', {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`
                },
                data: {
                    email: email,
                    first_name: firstName,
                    last_name: lastName,
                    phone: phone,
                    birth_date: (birthDate ? toMySQLDate(birthDate) : null),
                    gender: gender,
                }
            });
            // console.log(res);
            setUser(res.user)
            setIsEdit(false);
            showMessage({
                message: 'Đã thay đổi thông tin',
                type: "info",
            });
        } catch (err) {
            // console.log(err.message || 'Đã có lỗi xảy ra');
        } finally {
            setLoading(false);
        }
    };

    // Gọi API đăng xuất
    // Gọi API để đăng xuất tài khoản
    const logoutApi = async () => {
        try {
            setLoading(true); // Hiển thị loading
            // Gửi request logout lên server
            const res = await apiRequest('/logout', {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`
                },
            });
            // console.log(res);
            logoutAccount(); // Xoá thông tin user ở local
            navigation.replace('Main'); // Điều hướng về trang chủ
            showMessage({
                message: 'Đăng xuất thành công',
                type: "info",
            });
        } catch (err) {
            // Xử lý lỗi nếu có
            // console.log(err.message || 'Đã có lỗi xảy ra');
        } finally {
            setLoading(false); // Ẩn loading
        }
    }

    // Xử lý khi nhấn nút "Đăng xuất" (hiện dialog xác nhận)
    const handleLogout = () => {
        showDialog({
            type: 'confirm',
            message: 'Bạn có chắc muốn đăng xuất không?',
            onConfirm: logoutApi,
            ok: 'Đăng xuất',
        });
    };

    // Xử lý khi nhấn nút "Xoá tài khoản" (hiện dialog xác nhận)
    const handleDeleteAccount = () => {
        showDialog({
            type: 'confirm',
            message: 'Bạn có chắc muốn xoá tài khoản không? Hành động này sẽ xoá vĩnh viễn tài khoản của bạn và không thể khôi phục lại.',
            onConfirm: async () => {
                try {
                    setLoading(true); // Hiển thị loading
                    // Gửi request logout lên server
                    const res = await apiRequest('/delete-account', {
                        method: "POST",
                        headers: {
                            Authorization: `Bearer ${token}`
                        },
                    });
                    console.log(res);
                    logoutAccount(); // Xoá thông tin user ở local
                    navigation.replace('Main'); // Điều hướng về trang chủ
                    showMessage({
                        message: 'Xoá tài khoản thành công',
                        type: "info",
                    });
                } catch (err) {
                    // Xử lý lỗi nếu có
                    console.log(err.message || 'Đã có lỗi xảy ra');
                } finally {
                    setLoading(false); // Ẩn loading
                }
            },
            ok: 'Xoá tài khoản',
            cancel: 'Huỷ',
        });
    };

    return (
        <ScrollView
            contentContainerStyle={{ flexGrow: 1 }}
            style={{ flex: 1, backgroundColor: '#ffffff' }}
        >
            {loading ? <FullLoading /> : null}
            <View style={{ padding: 20, flex: 1 }}>
                <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 10 }}>
                    Thông tin cá nhân
                </Text>

                <TextInput
                    mode="flat"
                    underlineColor="transparent"
                    label="E-mail"
                    value={email}
                    onChangeText={setEmail}
                    editable={isEdit}
                    right={<TextInput.Icon icon="email" color="#AAAAAA" />}
                    style={styles.cRLInput}
                    activeUnderlineColor="#00CC66"
                    disabled
                />

                <View style={{ flexDirection: 'row' }}>
                    <TextInput
                        mode="flat"
                        underlineColor="transparent"
                        label="Họ"
                        value={firstName}
                        onChangeText={setFirstName}
                        editable={isEdit}
                        style={[styles.cRLInput, !isEdit ? styles.cNoInput : null, { width: '36%' }]}
                        activeUnderlineColor="#00CC66"
                    />
                    <TextInput
                        mode="flat"
                        underlineColor="transparent"
                        label="Tên đệm & tên"
                        value={lastName}
                        onChangeText={setLastName}
                        editable={isEdit}
                        right={<TextInput.Icon icon="card-account-details-outline" color="#AAAAAA" />}
                        style={[styles.cRLInput, !isEdit ? styles.cNoInput : null, commonStyles.mLeft10, commonStyles.flex1]}
                        activeUnderlineColor="#00CC66"
                    />
                </View>

                <TextInput
                    mode="flat"
                    underlineColor="transparent"
                    label="Số điện thoại"
                    keyboardType="phone-pad"
                    value={phone}
                    onChangeText={setPhone}
                    editable={isEdit}
                    right={<TextInput.Icon icon="cellphone" color="#AAAAAA" />}
                    style={[styles.cRLInput, !isEdit ? styles.cNoInput : null]}
                    activeUnderlineColor="#00CC66"
                />

                {/* Ngày sinh */}
                <TouchableRipple
                    onPress={() => isEdit && setShowDatePicker(true)}
                    style={{ marginBottom: 10 }}
                >
                    <View pointerEvents="none">
                        <TextInput
                            mode="flat"
                            label="Ngày sinh"
                            value={birthDate ? formatDate(birthDate) : ''}
                            placeholder="Chọn ngày sinh"
                            right={<TextInput.Icon icon="calendar-account-outline" color="#AAAAAA" />}
                            style={[styles.cRLInput, !isEdit ? styles.cNoInput : null]}
                            editable={false}
                        />
                    </View>
                </TouchableRipple>
                {showDatePicker && (
                    <DateTimePicker
                        value={birthDate || new Date('2000-01-01')}
                        mode="date"
                        display="default"
                        onChange={(event, date) => {
                            // console.log(date)
                            if (date) setBirthDate(date);
                            setShowDatePicker(false);
                        }}
                    />
                )}

                {/* Giới tính */}
                <View style={{ marginBottom: 10 }}>
                    <Text style={{ marginBottom: 5 }}>Giới tính</Text>
                    <RadioButton.Group
                        onValueChange={(value) => setGender(value)}
                        value={gender}
                    >
                        <View style={[!isEdit ? styles.cNoInput : null, { flexDirection: 'row', alignItems: 'center', }]}>
                            <RadioButton value="male" disabled={!isEdit} />
                            <Text>Nam</Text>
                            <RadioButton value="female" disabled={!isEdit} style={{ marginLeft: 20 }} />
                            <Text>Nữ</Text>
                            <RadioButton value="other" disabled={!isEdit} style={{ marginLeft: 20 }} />
                            <Text>Khác</Text>
                        </View>
                    </RadioButton.Group>
                </View>

                {!isEdit ?
                    <View style={{ marginTop: 20 }}>
                        <Text>Ấn vào nút chỉnh sửa nếu muốn thay đổi thông tin</Text>
                    </View> : null
                }

                {/* Các nút thao tác */}
                <View style={{ flex: 1, justifyContent: 'flex-end' }}>
                    {!isEdit ? (
                        <View>
                            <Button
                                mode="contained"
                                style={{ width: 200, alignSelf: 'flex-end' }}
                                onPress={handleDeleteAccount}
                            >
                                Xoá tài khoản
                            </Button>
                            <Button
                                mode="contained"
                                style={[commonStyles.buttonColor, styles.cRLButton]}
                                onPress={handleEdit}
                            >
                                Chỉnh sửa
                            </Button>
                            <Button
                                mode="outlined"
                                style={[styles.cRLButton, { marginTop: 10 }]}
                                onPress={handleLogout}
                            >
                                Đăng xuất
                            </Button>
                        </View>
                    ) : (
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <Button
                                mode="contained"
                                style={[commonStyles.buttonColor, styles.cRLButton, { flex: 1, marginRight: 10 }]}
                                onPress={handleSave}
                            >
                                Lưu
                            </Button>
                            <Button
                                mode="outlined"
                                style={[styles.cRLButton, { flex: 1 }]}
                                onPress={handleCancel}
                            >
                                Huỷ
                            </Button>
                        </View>
                    )}
                </View>
            </View>
        </ScrollView>
    );
}
