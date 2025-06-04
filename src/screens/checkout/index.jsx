import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import commonStyles from "../../utils/commonstyles";

import { Button, Card, RadioButton, TextInput, TouchableRipple } from 'react-native-paper';
import RNPickerSelect from 'react-native-picker-select';

const CheckOutScreen = () => {
    // E-mail
    const [email, setEmail] = useState("");
    // Họ
    const [firstName, setFirstName] = useState("");
    // Tên đệm & tên
    const [lastName, setLastName] = useState("");
    // Mã bưu điện
    const [postalCode, setPostalCode] = useState("");
    // Tỉnh
    const [address1, setAddress1] = useState("");
    // Thành phố/khu vực - 市区町村
    const [address2, setAddress2] = useState("");
    // Địa chỉ cụ thể - 番地・建物名・部屋番号
    const [address3, setAddress3] = useState("");
    // Số điện thoại
    const [phone, setPhone] = useState("");
    // Hình thức vần chuyển
    const [value, setValue] = React.useState('first');

    // Hiển thị guide hướng dẫn
    const [isGuideShow, setIsGuideShow] = useState(false);

    return (
        <ScrollView style={commonStyles.bgrColor}>
            <View style={styles.cCOBlock}>
                {/* Thông tin liên hệ */}
                <Text style={styles.cCOTitle}>Thông tin liên hệ</Text>
                <TextInput mode="flat" underlineColor="transparent"
                    label="E-mail"
                    value={email}
                    onChangeText={setEmail}
                    right={<TextInput.Icon style={styles.cCOInputIcon} icon="email" color="#AAAAAA" />}
                    style={styles.cCOInput}
                    outlineStyle={{ borderRadius: 20 }}
                    activeUnderlineColor="#00CC66"
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
                    label="Mã bưu điện - 郵便番号 (vd:1235678)"
                    value={postalCode}
                    onChangeText={setPostalCode}
                    right={<TextInput.Icon style={styles.cCOInputIcon} icon="office-building-marker-outline" color="#AAAAAA" />}
                    style={styles.cCOInput}
                    activeUnderlineColor="#00CC66"
                />
                {/* Tỉnh - 都道府県 */}
                <TextInput mode="flat" underlineColor="transparent"
                    label="Tỉnh - 都道府県"
                    value={address1}
                    onChangeText={setAddress1}
                    right={<TextInput.Icon style={styles.cCOInputIcon} icon="map-marker-outline" color="#AAAAAA" />}
                    style={styles.cCOInput}
                    activeUnderlineColor="#00CC66"
                />
                {/* Thành phố/khu vực - 市区町村 */}
                <TextInput mode="flat" underlineColor="transparent"
                    label="Thành phố/khu vực - 市区町村"
                    value={address2}
                    onChangeText={setAddress2}
                    right={<TextInput.Icon style={styles.cCOInputIcon} icon="map-marker-outline" color="#AAAAAA" />}
                    style={styles.cCOInput}
                    activeUnderlineColor="#00CC66"
                />
                {/* Địa chỉ cụ thể - 番地・建物名・部屋番号 */}
                <TextInput mode="flat" underlineColor="transparent"
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
                <Text>a</Text>
                <RNPickerSelect
                    onValueChange={(value) => console.log(value)}
                    items={[
                        { label: 'Football', value: 'football' },
                        { label: 'Baseball', value: 'baseball' },
                        { label: 'Hockey', value: 'hockey' },
                    ]}
                />

                <Text style={styles.cCOTitle}>Hình thức thanh toán</Text>
                <RadioButton.Group onValueChange={value => setValue(value)} value={value}>
                    <View style={styles.cCORadioItem1}>
                        <RadioButton.Item label="Chuyển khoản ngân hàng" value="first"
                            style={value === 'first' && styles.cCORadioItemSl} />
                        {value === 'first' && (
                            <View style={{ padding: 10, paddingHorizontal: 20, marginTop: 5 }}>
                                <Text style={{ fontFamily: 'monospace' }}>
                                    {
                                        `👉 Quý khách vui lòng chuyển khoản vào tài khoản sau để thanh toán:

Ngân hàng Momiji ( Momiji 銀行)
Chủ tài khoản/口座名: セーソ（カ
Loại tài khoản/預金項目：普通
Tên chi nhánh/支店番号 : ビジネス営業部（００５)
Số tài khoản/口座番号: ９９９９９９９

※Lưu ý: phí chuyển khoản sẽ do khách hàng chi trả.
※Chuyển đúng số tiền của đơn hàng để hệ thống xác nhận.
※Sau khi chuyển khoản phiền quý khách gửi hình hoá đơn chuyển khoản và gửi qua email ( info@xuanshopmart.com ) hoặc fanpage Facebook ( @xuanshopmart)
để chúng tôi xác nhận và xử lý đơn hàng nhanh nhất.`}
                                </Text>
                            </View>
                        )}
                    </View>
                    <View style={styles.cCORadioItem2}>
                        <RadioButton.Item label="Thanh toán khi nhận hàng (COD) +￥500" value="second"
                            style={value === 'second' && styles.cCORadioItemSl} />
                        {value === 'second' && (
                            <View style={{ padding: 10, paddingHorizontal: 20, marginTop: 5 }}>
                                <Text style={{ fontFamily: 'monospace' }}>
                                    {
                                        `👉 Khi chọn hình thức thanh toán này, quý khách CHI TRẢ THÊM CHI PHÍ DAIBIKI (THU HỘ) +500yen được cộng vào đơn hàng sau khi đặt thành công.

Quý khách vui lòng xác nhận chi tiết thông tin đơn hàng và chi phí khi nhận hàng, sau đó thanh toán trực tiếp cho nhân viên vận chuyển.
`}
                                </Text>
                            </View>
                        )}
                    </View>
                </RadioButton.Group>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    cCOBlock: {
        backgroundColor: '#ffffff',
        paddingHorizontal: 10,
        paddingVertical: 10,
    },
    cCOTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        marginVertical: 10,
    },
    cCOInput: {
        backgroundColor: 'white',
        borderColor: '#DDDDDD',
        borderWidth: 1,
        paddingHorizontal: 10,
        marginBottom: 10,
        height: 30,
    },
    cCOInputIcon: {
        paddingTop: 15
    },
    cCOGuideText: {
        color: '#00CC66',
        fontSize: 13,
        marginTop: -5,
        marginBottom: 10,
        paddingHorizontal: 10,
    },
    cCORadioItem1: {
        borderWidth: 1,
        borderTopLeftRadius: 6,
        borderTopRightRadius: 6,
        borderColor: '#00CC6630',
    },
    cCORadioItem2: {
        borderWidth: 1,
        borderTopWidth: 0,
        borderBottomLeftRadius: 6,
        borderBottomRightRadius: 6,
        borderColor: '#00CC6630',
        backgroundColor: '#FFFAFA',
    },
    cCORadioItemSl: {
        backgroundColor: '#00CC6630'
    }
})

export default CheckOutScreen;