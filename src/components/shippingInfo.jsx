import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import { TextInput } from 'react-native-paper';
import { Dropdown } from 'react-native-paper-dropdown';
import styles from '../screens/checkout/styles';
import commonStyles from '../utils/commonstyles';
import { DELIVERY_TIME } from '../config/config';
import { codeToAddress } from '../utils/utils';

const ShippingInfo = ({
    firstName, setFirstName,
    lastName, setLastName,
    postalCode, setPostalCode,
    address1, setAddress1,
    address2, setAddress2,
    address3, setAddress3,
    phone, setPhone,
    deliveryTime, setDeliveryTime,
    message, setMessage,
    inputRefs, errors
}) => {

    // Hiển thị guide hướng dẫn
    const [isGuideShow, setIsGuideShow] = useState(false);

    // Tự động điền địa chỉ từ postal code
    useEffect(() => {
        codeToAddress(postalCode,
            (addr1) => setAddress1(addr1),
            (addr2) => setAddress2(addr2)
        );
    }, [postalCode]);
    return (
        <>
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
                    label="Tên đệm & tên *"
                    value={lastName}
                    onChangeText={setLastName}
                    right={<TextInput.Icon style={styles.cCOInputIcon} icon="card-account-details-outline" color="#AAAAAA" />}
                    style={[styles.cCOInput, commonStyles.mLeft10, commonStyles.flex1]}
                    activeUnderlineColor="#00CC66"
                />
            </View>

            <TextInput mode="flat" underlineColor="transparent"
                keyboardType="numeric"
                ref={inputRefs.postalCode}
                error={!!errors.postalCode}
                label="Mã bưu điện - 郵便番号 (vd:1235678) *"
                value={postalCode}
                onChangeText={(text) => setPostalCode(text.replace(/[^0-9]/g, ''))}
                right={<TextInput.Icon style={styles.cCOInputIcon} icon="office-building-marker-outline" color="#AAAAAA" />}
                style={styles.cCOInput}
                activeUnderlineColor="#00CC66"
                maxLength={7}
            />

            <TextInput mode="flat" underlineColor="transparent"
                ref={inputRefs.address1}
                error={!!errors.address1}
                label="Tỉnh - 都道府県 *"
                value={address1}
                onChangeText={setAddress1}
                right={<TextInput.Icon style={styles.cCOInputIcon} icon="map-marker-outline" color="#AAAAAA" />}
                style={styles.cCOInput}
                activeUnderlineColor="#00CC66"
            />

            <TextInput mode="flat" underlineColor="transparent"
                ref={inputRefs.address2}
                error={!!errors.address2}
                label="Thành phố/khu vực - 市区町村 *"
                value={address2}
                onChangeText={setAddress2}
                right={<TextInput.Icon style={styles.cCOInputIcon} icon="map-marker-outline" color="#AAAAAA" />}
                style={styles.cCOInput}
                activeUnderlineColor="#00CC66"
            />

            <TextInput mode="flat" underlineColor="transparent"
                ref={inputRefs.address3}
                error={!!errors.address3}
                label="Địa chỉ cụ thể - 番地・建物名・部屋番号 *"
                value={address3}
                onChangeText={setAddress3}
                right={<TextInput.Icon style={styles.cCOInputIcon} icon="map-marker-outline" color="#AAAAAA" />}
                style={styles.cCOInput}
                activeUnderlineColor="#00CC66"
                onFocus={() => setIsGuideShow(true)}
                onBlur={() => setIsGuideShow(false)}
            />
            {isGuideShow &&
                <Text style={styles.cCOGuideText}>Lưu ý: Nhập cụ thể BANCHI, tên toà nhà và số phòng nếu có (vd: 地数 18-2 マンショウ 101号)</Text>
            }

            <TextInput mode="flat" underlineColor="transparent"
                label="Số điện thoại (nếu có)"
                keyboardType="phone-pad"
                value={phone}
                onChangeText={setPhone}
                right={<TextInput.Icon style={styles.cCOInputIcon} icon="cellphone" color="#AAAAAA" />}
                style={styles.cCOInput}
                activeUnderlineColor="#00CC66"
            />

            {
                setDeliveryTime ?
                    <View style={{ marginBottom: 10 }}>
                        <Dropdown
                            label="Thời gian nhận hàng"
                            placeholder="Thời gian nhận hàng"
                            options={DELIVERY_TIME}
                            value={deliveryTime}
                            onSelect={setDeliveryTime}
                            mode="outlined"
                        />
                    </View> : null
            }

            {setMessage ?
                <TextInput underlineColor="transparent"
                    label="Lời nhắn"
                    value={message}
                    onChangeText={setMessage}
                    multiline={true}
                    mode="outlined"
                    style={styles.cCOMessInput}
                    activeOutlineColor="#00CC66"
                    maxLength={255}
                /> : null
            }
        </>
    );
};

export default ShippingInfo;
