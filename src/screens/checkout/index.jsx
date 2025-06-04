import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from "react-native";
import commonStyles from "../../utils/commonstyles";

import { Button, Card, RadioButton, TextInput } from 'react-native-paper';
import { Dropdown } from 'react-native-paper-dropdown';
import { DELIVERY_TIME } from '../../config/config';
import { useNavigation } from '@react-navigation/native';

const CheckOutScreen = () => {
    const navigation = useNavigation();

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
    // Giờ nhận
    const [gender, setGender] = useState();
    // Lời nhắn
    const [message, setMessage] = React.useState('');
    // Hình thức vận chuyển
    const [value, setValue] = React.useState('first');

    // Hiển thị guide hướng dẫn
    const [isGuideShow, setIsGuideShow] = useState(false);

    return (
        <ScrollView style={commonStyles.bgrColor}>
            <View style={styles.cCOBlock}>
                {/* Khuều đăng nhập */}
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
                </View>
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
                <View style={{ marginBottom: 10 }}>
                    <Dropdown
                        label="Thời gian nhận hàng"
                        placeholder="Select Gender"
                        options={DELIVERY_TIME}
                        value={gender}
                        onSelect={setGender}
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
                                        `👉 Khi chọn hình thức thanh toán này, quý khách CHI TRẢ THÊM CHI PHÍ DAIBIKI (THU HỘ) +500yen được cộng vào đơn hàng sau khi đặt thành công.\n\nQuý khách vui lòng xác nhận chi tiết thông tin đơn hàng và chi phí khi nhận hàng, sau đó thanh toán trực tiếp cho nhân viên vận chuyển.
`}
                                </Text>
                            </View>
                        )}
                    </View>
                </RadioButton.Group>

                {/* Guide */}
                <Card style={styles.cCOGuide}>
                    <Text style={{ fontFamily: 'monospace', color: '#696969' }}>
                        {`Hoá đơn dưới ￥10,000 phí ship sẽ là ¥800.\nNếu có hàng động lạnh sẽ +¥500 phí lạnh.\nMiễn ship thường với đơn hàng có giá trị trên ￥10,000`}
                    </Text>
                </Card>

                {/* Tổng kết đơn hàng */}
                <Text style={styles.cCOTitle}>Đơn hàng</Text>
                <View style={styles.cCOTotalBlock}>
                    <View style={styles.cCOTotalRow}>
                        <Image source={{ uri: 'https://sesofoods.com/cdn/shop/products/284192998_593983938933429_3711222004035908430_n_240x.jpg?v=1653720216' }}
                            style={styles.cCOTotalImage} />
                        <Text style={styles.cCOTotalName} numberOfLines={2}>
                            Lương khô Hải Châu 5 sao (ngon đặc biệt)
                        </Text>
                        <Text style={styles.cCOTotalQuantyti}>
                            x2
                        </Text>
                        <Text style={styles.cCOTotalPrice}>
                            ¥500
                        </Text>
                    </View>
                    <View style={styles.cCOTotalRow}>
                        <Image source={{ uri: 'https://sesofoods.com/cdn/shop/products/284192998_593983938933429_3711222004035908430_n_240x.jpg?v=1653720216' }}
                            style={styles.cCOTotalImage} />
                        <Text style={styles.cCOTotalName} numberOfLines={2}>
                            Lương khô Hải Châu 5 sao
                        </Text>
                        <Text style={styles.cCOTotalQuantyti}>
                            x2
                        </Text>
                        <Text style={styles.cCOTotalPrice}>
                            ¥500
                        </Text>
                    </View>
                </View>

                <View style={styles.cCOTotalCalBlock}>
                    <View style={styles.cCOTotalCalRow}>
                        <Text style={styles.cCOTotalCalLeft}>Tạm tính (số lượng 2)</Text>
                        <Text style={styles.cCOTotalCalRight}>¥1,2000</Text>
                    </View>
                    <View style={styles.cCOTotalCalRow}>
                        <Text style={styles.cCOTotalCalLeft}>Phí vận chuyển</Text>
                        <Text style={styles.cCOTotalCalRight}>¥800</Text>
                    </View>
                    <View style={styles.cCOTotalCalRow}>
                        <Text style={styles.cCOTotalCalLeft}>Phí đông lạnh</Text>
                        <Text style={styles.cCOTotalCalRight}>¥400</Text>
                    </View>
                    <View style={styles.cCOTotalCalRow}>
                        <Text style={styles.cCOTotalCalLeft}>Phí ship COD</Text>
                        <Text style={styles.cCOTotalCalRight}>¥500</Text>
                    </View>
                    <View style={styles.cCOTotalCalRow}>
                        <Text style={[commonStyles.font20, commonStyles.fwblob]}>Tổng cộng</Text>
                        <Text style={[styles.cCOTotalCalLeft, commonStyles.font12, commonStyles.pLeft10]}>(Đã bao gồm thuế)</Text>
                        <Text style={[styles.cCOTotalCalRight, commonStyles.font20, commonStyles.fwblob]}>¥15,000</Text>
                    </View>
                    <View style={styles.cCOTotalCalRow}>
                        <Text style={[styles.cCOTotalCalLeft, commonStyles.textColor]}>Điểm nhận được</Text>
                        <Text style={[styles.cCOTotalCalRight, commonStyles.textColor]}>+120</Text>
                    </View>
                </View>
                <Button mode="contained" style={[commonStyles.buttonColor, styles.cCOBuyButton]}
                    onPress={() => { }}>
                    Xác nhận đặt hàng
                </Button>
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
    cCOLogText: {
        color: '#0000FF',
        textDecorationLine: 'underline',
        paddingHorizontal: 3,
        marginBottom: -3,
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
    },
    cCOMessInput: {
        height: 80,
        backgroundColor: 'white',
        borderColor: '#DDDDDD',
        textAlignVertical: 'top',
        marginBottom: 10,
    },
    cCOGuide: {
        marginVertical: 20,
        padding: 10,
    },
    cCOTotalBlock: {
        borderWidth: 1,
        paddingHorizontal: 10,
        borderRadius: 6,
        borderColor: '#DDDDDD'
    },
    cCOTotalRow: {
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderColor: '#DDDDDD',
        paddingVertical: 5,
    },
    cCOTotalImage: {
        height: 30,
        width: 46,
        paddingHorizontal: 8,
    },
    cCOTotalName: {
        flex: 1,
        paddingHorizontal: 8,
    },
    cCOTotalQuantyti: {
        paddingHorizontal: 8,

    },
    cCOTotalPrice: {
        paddingHorizontal: 8,
    },
    cCOTotalCalBlock: {
        padding: 10,
        paddingRight: 18,
        marginBottom: 30
    },
    cCOTotalCalRow: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        paddingVertical: 3,
    },
    cCOTotalCalLeft: {
        flex: 1
    },
    cCOTotalCalRight: {
    },
    cCOBuyButton: {
        marginHorizontal: 18,
        paddingVertical: 3,
        marginBottom: 50,
    }
})

export default CheckOutScreen;