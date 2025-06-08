import React, { useEffect, useState, useRef } from "react";
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from "react-native";
import commonStyles from "../../utils/commonstyles";
import { Button, Card, RadioButton, TextInput } from 'react-native-paper';
import { Dropdown } from 'react-native-paper-dropdown';
import { DELIVERY_TIME, PAY_METHOD } from '../../config/config';
import { useNavigation } from '@react-navigation/native';
import { useCartUI } from '../../hooks/useCartOverlay';
import { fToYen, isEmail, codeToAddress } from "../../utils/utils";
import { apiRequest } from "../../api";
import styles from "./styles";
import { showMessage } from "react-native-flash-message";
import { useRootContext } from "../../hooks/rootcontext";
import { useDialog } from "../../hooks/dialogcontext";

const CheckOutScreen = ({ params }) => {
    const navigation = useNavigation();
    const { auth, user, token } = useRootContext();
    const { showFullLoading } = useDialog();
    

    // Lấy thông tin giỏ hàng và các hàm từ context
    const { cartItems, clearCart } = useCartUI();

    // Thông tin tính toán nhận được từ API
    const [calculate, setCalculate] = useState([]);

    // Trạng thái loading
    const [loading, setLoading] = useState(false);

    // E-mail
    const [email, setEmail] = useState(user?.email ?? "");
    // Họ
    const [firstName, setFirstName] = useState(user?.first_name ?? "");
    // Tên đệm & tên
    const [lastName, setLastName] = useState(user?.last_name ?? "");
    // Mã bưu điện
    const [postalCode, setPostalCode] = useState("");
    // Tỉnh
    const [address1, setAddress1] = useState("");
    // Thành phố/khu vực - 市区町村
    const [address2, setAddress2] = useState("");
    // Địa chỉ cụ thể - 番地・建物名・部屋番号
    const [address3, setAddress3] = useState("");
    // Số điện thoại
    const [phone, setPhone] = useState(user?.phone ?? '');
    // Giờ nhận
    const [deliveryTime, setDeliveryTime] = useState("Không yêu cầu");
    // Lời nhắn
    const [message, setMessage] = useState('');
    // Hình thức thanh toán
    const [paymentMethod, setPaymentMethod] = useState('transfer');

    // Hiển thị guide hướng dẫn
    const [isGuideShow, setIsGuideShow] = useState(false);

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

    useEffect(() => {
        codeToAddress(postalCode,
            (address1) => setAddress1(address1),
            (address2) => setAddress2(address2),
        )
    }, [postalCode]);

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

        console.log(newErrors);

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

        let result;
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
                        device_id: "999999999",
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
                result = res.data;
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
                <View style={{ flexDirection: 'row' }}>
                    <TextInput mode="flat" underlineColor="transparent"
                        label="Họ"
                        value={firstName}
                        onChangeText={setFirstName}
                        style={[styles.cCOInput, { width: '36%' }]}
                        activeUnderlineColor="#00CC66"
                    />
                    <TextInput mode="flat" underlineColor="transparent"
                        ref={inputRefs.lastName}
                        error={!!errors.lastName}
                        label="Tên đệm & tên"
                        value={lastName}
                        onChangeText={setLastName}
                        right={<TextInput.Icon style={styles.cCOInputIcon} icon="card-account-details-outline" color="#AAAAAA" />}
                        style={[styles.cCOInput, commonStyles.mLeft10, commonStyles.flex1]}
                        activeUnderlineColor="#00CC66"
                    />
                </View>
                {/* Mã bưu điện */}
                <TextInput mode="flat" underlineColor="transparent"
                    keyboardType="numeric"
                    ref={inputRefs.postalCode}
                    error={!!errors.postalCode}
                    label="Mã bưu điện - 郵便番号 (vd:1235678)"
                    value={postalCode}
                    onChangeText={(text) => setPostalCode(text.replace(/[^0-9]/g, ''))}
                    right={<TextInput.Icon style={styles.cCOInputIcon} icon="office-building-marker-outline" color="#AAAAAA" />}
                    style={styles.cCOInput}
                    activeUnderlineColor="#00CC66"
                    maxLength={7}
                />
                {/* Tỉnh - 都道府県 */}
                <TextInput mode="flat" underlineColor="transparent"
                    ref={inputRefs.address1}
                    error={!!errors.address1}
                    label="Tỉnh - 都道府県"
                    value={address1}
                    onChangeText={setAddress1}
                    right={<TextInput.Icon style={styles.cCOInputIcon} icon="map-marker-outline" color="#AAAAAA" />}
                    style={styles.cCOInput}
                    activeUnderlineColor="#00CC66"
                />
                {/* Thành phố/khu vực - 市区町村 */}
                <TextInput mode="flat" underlineColor="transparent"
                    ref={inputRefs.address2}
                    error={!!errors.address2}
                    label="Thành phố/khu vực - 市区町村"
                    value={address2}
                    onChangeText={setAddress2}
                    right={<TextInput.Icon style={styles.cCOInputIcon} icon="map-marker-outline" color="#AAAAAA" />}
                    style={styles.cCOInput}
                    activeUnderlineColor="#00CC66"
                />
                {/* Địa chỉ cụ thể - 番地・建物名・部屋番号 */}
                <TextInput mode="flat" underlineColor="transparent"
                    ref={inputRefs.address3}
                    error={!!errors.address3}
                    label="Địa chỉ cụ thể - 番地・建物名・部屋番号"
                    value={address3}
                    onChangeText={setAddress3}
                    right={<TextInput.Icon style={styles.cCOInputIcon} icon="map-marker-outline" color="#AAAAAA" />}
                    style={styles.cCOInput}
                    activeUnderlineColor="#00CC66"

                    onFocus={() => setIsGuideShow(true)}
                    onBlur={() => setIsGuideShow(false)}
                />
                {/* Hướng dẫn */}
                {isGuideShow &&
                    <Text style={styles.cCOGuideText}>Lưu ý: Nhập cụ thể BANCHI, tên toà nhà và số phòng nếu có (vd: 地数 18-2 マンショウ 101号)</Text>
                }
                {/* Số điện thoại */}
                <TextInput mode="flat" underlineColor="transparent"
                    label="Số điện thoại (nếu có)"
                    keyboardType="phone-pad"
                    value={phone}
                    onChangeText={setPhone}
                    right={<TextInput.Icon style={styles.cCOInputIcon} icon="cellphone" color="#AAAAAA" />}
                    style={styles.cCOInput}
                    activeUnderlineColor="#00CC66"
                />
                {/* Thời gian nhận hàng */}
                <View style={{ marginBottom: 10 }}>
                    <Dropdown
                        label="Thời gian nhận hàng"
                        placeholder="Thời gian nhận hàng"
                        options={DELIVERY_TIME}
                        value={deliveryTime}
                        onSelect={setDeliveryTime}
                        mode="outlined"
                    />
                </View>
                {/* Lời nhắn */}
                <TextInput underlineColor="transparent"
                    label="Lời nhắn"
                    value={message}
                    onChangeText={setMessage}
                    multiline={true}
                    mode="outlined"
                    style={styles.cCOMessInput}
                    activeOutlineColor="#00CC66"
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
                                <Image source={{ uri: item.thumbnail_url }}
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