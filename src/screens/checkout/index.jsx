import React, { useEffect, useState, useRef } from "react";
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from "react-native";
import commonStyles from "../../utils/commonstyles";
import { Button, Card, RadioButton, TextInput } from 'react-native-paper';
import { Dropdown } from 'react-native-paper-dropdown';
import { DELIVERY_TIME, PAY_METHOD, IMAGE_URL } from '../../config/config';
import { useNavigation } from '@react-navigation/native';
import { useCartUI } from '../../hooks/useCartOverlay';
import { fToYen, isEmail, codeToAddress } from "../../utils/utils";
import { apiRequest } from "../../api";
import styles from "./styles";
import { showMessage } from "react-native-flash-message";
import { useRootContext } from "../../hooks/rootcontext";
import { useDialog } from "../../hooks/dialogcontext";
import ShippingInfo from "../../components/shippingInfo";

const CheckOutScreen = ({ params }) => {
    const navigation = useNavigation();
    const { auth, user, token, address, deviceId } = useRootContext();
    const { showFullLoading } = useDialog();


    // Lấy thông tin giỏ hàng và các hàm từ context
    const { cartItems, clearCart } = useCartUI();

    // Thông tin tính toán nhận được từ API
    const [calculate, setCalculate] = useState({});

    // E-mail
    const [email, setEmail] = useState(user?.email ?? "");
    // Họ (ưu tiên thông tin từ user_address)
    const [firstName, setFirstName] = useState(address ? address.first_name : (user?.first_name ?? ""));
    // Tên đệm & tên (ưu tiên thông tin từ user_address)
    const [lastName, setLastName] = useState(address ? address.last_name : (user?.last_name ?? ""));
    // Mã bưu điện
    const [postalCode, setPostalCode] = useState(address?.postal_code ?? "");
    // Tỉnh
    const [address1, setAddress1] = useState(address?.address_1 ?? "");
    // Thành phố/khu vực - 市区町村
    const [address2, setAddress2] = useState(address?.address_2 ?? "");
    // Địa chỉ cụ thể - 番地・建物名・部屋番号
    const [address3, setAddress3] = useState(address?.address_3 ?? "");
    // Số điện thoại
    const [phone, setPhone] = useState(address ? address.phone : (user?.phone ?? ""));
    // Giờ nhận
    const [deliveryTime, setDeliveryTime] = useState("Không yêu cầu");
    // Lời nhắn
    const [message, setMessage] = useState('');
    // Hình thức thanh toán
    const [paymentMethod, setPaymentMethod] = useState('transfer');

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

    // useEffect(() => {
    //     codeToAddress(postalCode,
    //         (address1) => setAddress1(address1),
    //         (address2) => setAddress2(address2),
    //     )
    // }, [postalCode]);

    // Chuẩn bị item để gửi lên API tính toán
    const postItems = cartItems.map((item) => (
        { id: item.id, quantity: item.quantity }
    ));

    // lấy phần tổng kết và các cài đặt từ API
    useEffect(() => {
        // gửi
        const calculate = async () => {
            showFullLoading(true);
            try {
                const res = await apiRequest('/calculate-order', {
                    method: 'POST',
                    data: {
                        items: postItems,
                        shipping_method: 'standard', // chưa có
                        payment_method: paymentMethod
                    }
                });
                setCalculate(res.data);
                console.log(res.data);
            } catch (err) {
                console.log(err.message || 'Đã có lỗi xảy ra');
            } finally {
                showFullLoading(false);
            }
        }
        calculate();
    }, [paymentMethod]);

    // 
    /**
     * Kiểm tra hợp lệ các trường trong form và xử lý focus, hiển thị lỗi.
     *
     * - Kiểm tra các trường bắt buộc (email, lastName, postalCode, address1, address2, address3) đã nhập chưa.
     * - Kiểm tra định dạng email.
     * - Gán thông báo lỗi cho các trường không hợp lệ.
     * - Focus vào input đầu tiên bị lỗi.
     * - Hiển thị thông báo lỗi đầu tiên bằng `showMessage`.
     *
     * @returns {boolean} Trả về true nếu tất cả hợp lệ, ngược lại trả về false.
     */
    const validateAndFocus = () => {
        const newErrors = {};
        if (!email.trim()) {
            newErrors.email = "Vui lòng nhập email";
        } else if (!isEmail(email)) {
            newErrors.email = "Email không hợp lệ";
        }

        if (!lastName.trim()) newErrors.lastName = "Vui lòng nhập tên";
        if (!postalCode.trim()) newErrors.postalCode = "Vui lòng mã bưu điện";
        if (!address1.trim()) newErrors.address1 = "Vui lòng nhập địa chỉ";
        if (!address2.trim()) newErrors.address2 = "Vui lòng nhập địa chỉ";
        if (!address3.trim()) newErrors.address3 = "Vui lòng nhập địa chỉ";
        
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);

            // Focus vào input đầu tiên bị lỗi
            if (newErrors.email) inputRefs.email.current.focus();
            else if (newErrors.lastName) inputRefs.lastName.current.focus();
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

    // CheckOut
    const checkOut = async () => {
        // Kiểm tra các INPUT cần
        const isValidateInput = validateAndFocus();


        if (isValidateInput) {
            try {
                showFullLoading(true);
                const res = await apiRequest('/checkout', {
                    method: 'POST',
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                    data: {
                        items: postItems,
                        shipping_method: 'standard',
                        payment_method: paymentMethod,
                        device_id: deviceId,
                        contact_email: email,
                        shipping_first_name: firstName,
                        shipping_last_name: lastName,
                        shipping_postal_code: postalCode,
                        shipping_address_1: address1,
                        shipping_address_2: address2,
                        shipping_address_3: address3,
                        shipping_phone_number: phone,
                        shipping_delivery_time: deliveryTime,
                        shipping_message: message,
                    }
                });
                console.log(res);
                const result = res.data;
                // Xóa toàn bộ sản phẩm nếu đặt hàng thành công
                clearCart();
                // Sang trang báo thành công
                navigation.replace('Successful', { result: result, settings: calculate.settings });
            } catch (err) {
                console.log(err.message || 'Đã có lỗi xảy ra');
            } finally {
                showFullLoading(false);
            }
        }


    }

    return (
        <ScrollView style={commonStyles.bgrColor}>
            <View style={styles.cCOBlock}>
                {/* Khuều đăng nhập */}
                {!auth ?
                    <View>
                        <Card style={{ padding: 10 }}>
                            <Text style={{ fontFamily: 'monospace', color: '#696969' }}>
                                Hãy
                                <TouchableOpacity onPress={() => {
                                    navigation.navigate('RegisterLogin');
                                }}>
                                    <Text style={styles.cCOLogText}>đăng nhập</Text>
                                </TouchableOpacity>
                                để có thể theo dõi đơn hàng, tích điểm và hưởng nhiều ưu đãi nhé.
                            </Text>
                        </Card>
                    </View> : null
                }

                {/* Thông tin liên hệ */}
                <Text style={styles.cCOTitle}>Thông tin liên hệ</Text>
                <TextInput mode="flat" underlineColor="transparent"
                    ref={inputRefs.email}
                    error={!!errors.email}
                    label="E-mail"
                    value={email}
                    onChangeText={setEmail}
                    right={<TextInput.Icon style={styles.cCOInputIcon} icon="email" color="#AAAAAA" />}
                    style={styles.cCOInput}
                    activeUnderlineColor="#00CC66"
                    autoCapitalize="none"
                />

                {/* Thông tin giao hàng */}
                <Text style={styles.cCOTitle}>Thông tin giao hàng</Text>
                <ShippingInfo
                    firstName={firstName} setFirstName={setFirstName}
                    lastName={lastName} setLastName={setLastName}
                    postalCode={postalCode} setPostalCode={setPostalCode}
                    address1={address1} setAddress1={setAddress1}
                    address2={address2} setAddress2={setAddress2}
                    address3={address3} setAddress3={setAddress3}
                    phone={phone} setPhone={setPhone}
                    deliveryTime={deliveryTime} setDeliveryTime={setDeliveryTime}
                    message={message} setMessage={setMessage}
                    inputRefs={inputRefs}
                    errors={errors}
                />

                {/* Hình thức thanh toán */}
                <Text style={styles.cCOTitle}>Hình thức thanh toán</Text>
                <RadioButton.Group onValueChange={value => setPaymentMethod(value)} value={paymentMethod}>
                    {/* Chuyển khoản ngân hàng */}
                    <View style={styles.cCORadioItem1}>
                        <RadioButton.Item label={PAY_METHOD.transfer.label} value="transfer"
                            style={paymentMethod === 'transfer' && styles.cCORadioItemSl} />
                        {paymentMethod === 'transfer' && (
                            <View style={{ padding: 10, paddingHorizontal: 20, marginTop: 5 }}>
                                <Text style={{ fontFamily: 'monospace' }}>
                                    {calculate.settings?.bank_info ?? ''}
                                </Text>
                            </View>
                        )}
                    </View>
                    {/* Thanh toán khi nhận hàng */}
                    <View style={styles.cCORadioItem2}>
                        <RadioButton.Item label={PAY_METHOD.cod.label} value="cod"
                            style={paymentMethod === 'cod' && styles.cCORadioItemSl} />
                        {paymentMethod === 'cod' && (
                            <View style={{ padding: 10, paddingHorizontal: 20, marginTop: 5 }}>
                                <Text style={{ fontFamily: 'monospace' }}>
                                    {calculate.settings?.cod_info ?? ''}
                                </Text>
                            </View>
                        )}
                    </View>
                </RadioButton.Group>

                {/* Guide */}
                <Card style={styles.cCOGuide}>
                    <Text style={{ fontFamily: 'monospace', color: '#696969' }}>
                        {calculate.settings?.delivery_policy ?? ''}
                    </Text>
                </Card>

                {/* Tổng kết đơn hàng */}
                <Text style={styles.cCOTitle}>Đơn hàng</Text>
                <View style={styles.cCOTotalBlock}>
                    {
                        cartItems.map((item) => (
                            <View key={item.id} style={styles.cCOTotalRow}>
                                <Image source={{ uri: `${IMAGE_URL}/${item.thumbnail_url}` }}
                                    style={styles.cCOTotalImage} />
                                <Text style={styles.cCOTotalName} numberOfLines={2}>
                                    {item.name}
                                </Text>
                                <Text style={styles.cCOTotalQuantyti}>
                                    x{item.quantity}
                                </Text>
                                <Text style={styles.cCOTotalPrice}>
                                    ¥{fToYen(item.quantity * item.price)}
                                </Text>
                            </View>
                        ))
                    }
                </View>

                <View style={styles.cCOTotalCalBlock}>
                    {/* Tạm tính */}
                    <View style={styles.cCOTotalCalRow}>
                        <Text style={styles.cCOTotalCalLeft}>Tổng hàng (số lượng {calculate.quantity_total})</Text>
                        <Text style={styles.cCOTotalCalRight}>¥{fToYen(calculate.subtotal)}</Text>
                    </View>
                    {/* Phí vận chuyển */}
                    <View style={styles.cCOTotalCalRow}>
                        <Text style={styles.cCOTotalCalLeft}>Phí vận chuyển</Text>
                        <Text style={styles.cCOTotalCalRight}>¥{fToYen(calculate.shipping_fee)}</Text>
                    </View>
                    {/* Nếu có phí động lạnh thì hiện thị */}
                    {calculate.cold_fee !== 0 && (
                        <View style={styles.cCOTotalCalRow}>
                            <Text style={styles.cCOTotalCalLeft}>Phí đông lạnh</Text>
                            <Text style={styles.cCOTotalCalRight}>¥{fToYen(calculate.cold_fee)}</Text>
                        </View>
                    )}
                    {/* Nếu có phí shi COD thì hiện thị */}
                    {calculate.cod_fee !== 0 && (
                        <View style={styles.cCOTotalCalRow}>
                            <Text style={styles.cCOTotalCalLeft}>Phí ship COD</Text>
                            <Text style={styles.cCOTotalCalRight}>¥{fToYen(calculate.cod_fee)}</Text>
                        </View>
                    )}
                    <View style={styles.cCOTotalCalRow}>
                        <Text style={[commonStyles.font20, commonStyles.fwblob]}>Tổng cộng</Text>
                        <Text style={[styles.cCOTotalCalLeft, commonStyles.font12, commonStyles.pLeft10]}>(Đã bao gồm thuế)</Text>
                        <Text style={[styles.cCOTotalCalRight, commonStyles.font20, commonStyles.fwblob]}>
                            ¥{fToYen(calculate.total)}
                        </Text>
                    </View>
                    <View style={styles.cCOTotalCalRow}>
                        <Text style={[styles.cCOTotalCalLeft, commonStyles.textColor]}>Điểm nhận được</Text>
                        <Text style={[styles.cCOTotalCalRight, commonStyles.textColor]}>
                            +{calculate.get_point}
                        </Text>
                    </View>
                </View>
                <Button mode="contained" style={[commonStyles.buttonColor, styles.cCOBuyButton]}
                    onPress={checkOut}>
                    Xác nhận đặt hàng
                </Button>
            </View>
        </ScrollView>
    )
}

export default CheckOutScreen;