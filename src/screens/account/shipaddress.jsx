import { useState, useRef } from "react";
import { View, Text, ScrollView } from 'react-native';
import ShippingInfo from "../../components/shippingInfo";
import styles from "./styles";
import { Button } from "react-native-paper";
import commonStyles from "../../utils/commonstyles";
import { showMessage } from "react-native-flash-message";
import { useRootContext } from "../../hooks/rootcontext";
import { apiRequest } from "../../api";
import { useDialog } from "../../hooks/dialogcontext";
import { useNavigation } from "@react-navigation/native";

const ShipAddressScreen = () => {
const navigation = useNavigation();
    const { address, setAddress, token } = useRootContext();
    const { showFullLoading } = useDialog();

    // Họ
    const [firstName, setFirstName] = useState(address?.first_name ?? "");
    // Tên đệm & tên
    const [lastName, setLastName] = useState(address?.last_name ?? "");
    // Mã bưu điện
    const [postalCode, setPostalCode] = useState(address?.postal_code ?? "");
    // Tỉnh
    const [address1, setAddress1] = useState(address?.address_1 ?? "");
    // Thành phố/khu vực - 市区町村
    const [address2, setAddress2] = useState(address?.address_2 ?? "");
    // Địa chỉ cụ thể - 番地・建物名・部屋番号
    const [address3, setAddress3] = useState(address?.address_3 ?? "");
    // Số điện thoại
    const [phone, setPhone] = useState(address?.phone ?? "");

    // cách input ref để focus
    const inputRefs = {
        email: useRef(),
        lastName: useRef(),
        postalCode: useRef(),
        address1: useRef(),
        address2: useRef(),
        address3: useRef()
    };

    // State để lưu lỗi
    const [errors, setErrors] = useState({});

    /**
         * Kiểm tra hợp lệ các trường trong form và xử lý focus, hiển thị lỗi.
         *
         * - Kiểm tra các trường bắt buộc (lastName, postalCode, address1, address2, address3) đã nhập chưa.
         * - Gán thông báo lỗi cho các trường không hợp lệ.
         * - Focus vào input đầu tiên bị lỗi.
         * - Hiển thị thông báo lỗi đầu tiên bằng `showMessage`.
         *
         * @returns {boolean} Trả về true nếu tất cả hợp lệ, ngược lại trả về false.
         */
    const validateAndFocus = () => {
        const newErrors = {};

        if (!lastName.trim()) newErrors.lastName = "Vui lòng nhập tên";
        if (!postalCode.trim()) newErrors.postalCode = "Vui lòng mã bưu điện";
        if (postalCode.trim().length !== 7) newErrors.postalCode = "Vui lòng kiểm tra mã bưu điện";
        if (!address1.trim()) newErrors.address1 = "Vui lòng nhập địa chỉ";
        if (!address2.trim()) newErrors.address2 = "Vui lòng nhập địa chỉ";
        if (!address3.trim()) newErrors.address3 = "Vui lòng nhập địa chỉ";

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);

            // Focus vào input đầu tiên bị lỗi
            if (newErrors.lastName) inputRefs.lastName.current.focus();
            else if (newErrors.postalCode) inputRefs.postalCode.current.focus();
            else if (newErrors.address1) inputRefs.address1.current.focus();
            else if (newErrors.address2) inputRefs.address2.current.focus();
            else if (newErrors.address3) inputRefs.address3.current.focus();

            // Hiển thị cảnh báo
            showMessage({
                message: Object.values(newErrors)[0],
                type: "danger",
            });
            return false;
        }

        setErrors({});
        return true;
    };

    const updateAddress = async () => {
        // Check input
        const isValidateInput = validateAndFocus();
        if (!isValidateInput) return;

        showFullLoading(true);
        try {
            const res = await apiRequest('/update-address', {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                data: {
                    first_name: firstName,
                    last_name: lastName,
                    postal_code: postalCode,
                    address_1: address1,
                    address_2: address2,
                    address_3: address3,
                    phone: phone,
                }
            });
        console.log(res.address)
            setAddress(res.address);
            showMessage({
                message: res.message,
                type: 'info'
            })
            navigation.goBack();
        } catch (err) {
            console.log(err.message || 'Đã có lỗi xảy ra');
        } finally {
            showFullLoading(false);
        }
    }

    return (
        <ScrollView
            contentContainerStyle={{ flexGrow: 1 }}
            style={{ flex: 1, backgroundColor: '#ffffff', padding: 10 }}
        >
            <Text style={styles.cShipTitle}>Địa chỉ nhận hàng</Text>
            <ShippingInfo
                firstName={firstName} setFirstName={setFirstName}
                lastName={lastName} setLastName={setLastName}
                postalCode={postalCode} setPostalCode={setPostalCode}
                address1={address1} setAddress1={setAddress1}
                address2={address2} setAddress2={setAddress2}
                address3={address3} setAddress3={setAddress3}
                phone={phone} setPhone={setPhone}
                inputRefs={inputRefs}
                errors={errors}
            />

            {/* Các nút thao tác */}
            <View style={{ flex: 1, justifyContent: 'flex-end', paddingBottom: 20 }}>
                <Button
                    mode="contained"
                    style={[commonStyles.buttonColor, styles.cRLButton]}
                    onPress={updateAddress}
                >
                    Cập nhật địa chỉ
                </Button>
            </View>
        </ScrollView>
    )
}

export default ShipAddressScreen;