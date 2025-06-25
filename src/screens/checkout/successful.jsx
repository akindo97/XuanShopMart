import { View, ScrollView, Image, Text } from "react-native"
import commonStyles from "../../utils/commonstyles"
import styles from "./styles"

import { PAY_METHOD } from '../../config/config';
import { Button } from "react-native-paper"
import { useNavigation } from '@react-navigation/native';
import CopyToClipboard from "../../components/copy";
import { useRootContext } from "../../hooks/rootcontext";

const SuccessfulScreen = ({ route }) => {
    const { result, settings } = route.params;
    const { auth } = useRootContext();

    const navigation = useNavigation();

    return (
        <ScrollView style={commonStyles.bgrColor} contentContainerStyle={{ flexGrow: 1 }}>
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <View style={{ backgroundColor: '#ffffff', paddingVertical: 20, paddingHorizontal: 10, marginHorizontal: 16, borderRadius: 6 }}>
                    <Image source={require('../../../assets/icons/checked.png')}
                        style={{ width: 100, height: 100, alignSelf: 'center' }} />
                    <Text style={{ fontWeight: 'bold', fontSize: 22, paddingVertical: 20, alignSelf: 'center' }}>
                        Đặt hàng thành công
                    </Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center', paddingBottom: 6 }}>
                        <Text style={{ fontSize: 18 }}>
                            Mã đơn hàng:
                        </Text>
                        <Text style={{ fontWeight: 'bold', fontSize: 18, color: 'orange', marginLeft: 5 }}>
                            {/* Mã đơn hàng */}
                            {result.purchased_product.order_code}
                        </Text>
                        <CopyToClipboard value={"MA DON: " + result.purchased_product.order_code} />
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', paddingBottom: 12 }}>
                        <Text style={{ fontSize: 15 }}>
                            Hình thức thanh toán:
                        </Text>
                        <Text style={{ fontSize: 15, fontWeight: 'bold', marginLeft: 5 }}>
                            {/* Hình thức thanh toán */}
                            {PAY_METHOD[result.purchased_product.payment_method].value}
                        </Text>
                    </View>
                    <View style={styles.cSussGuideBlock}>
                        <Text>
                            {/* Thông tin hướng dẫn */}
                            {settings[PAY_METHOD[result.purchased_product.payment_method].key]}
                        </Text>
                    </View>
                    {/* Nếu chưa đăng nhập */}
                    {!auth ?
                        <View style={styles.cSussGuideBlock}>
                            <Text>
                                Đăng nhập / đăng ký để nhận nhiều ưu đã nhé.
                            </Text>
                            <Button onPress={() => {
                                navigation.navigate('RegisterLogin');
                            }}>
                                Đăng nhập/Đăng ký
                            </Button>
                        </View>
                        : null
                    }
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingTop: 15 }}>
                        <Button mode="contained" style={commonStyles.buttonColor}
                            onPress={() => navigation.navigate('Main', {
                                screen: 'Recents',
                            })} >Đơn hàng
                        </Button>
                        <Button mode="contained" style={commonStyles.buttonColor}
                            onPress={() => navigation.navigate('Main', {
                                screen: 'Home',
                            })} >
                            Trang chủ
                        </Button>
                    </View>
                </View>
            </View>
        </ScrollView>
    )
}

export default SuccessfulScreen;