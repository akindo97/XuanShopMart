import { View, ScrollView, Image, Text, TouchableOpacity } from "react-native"
import commonStyles from "../../utils/commonstyles"
import styles from "./styles"
import { PAY_METHOD } from '../../config/config';
import { Icon, Button } from "react-native-paper"
import { useNavigation } from '@react-navigation/native';
import CopyToClipboard from "../../components/copy";
import { useRootContext } from "../../hooks/rootcontext";
import { openMessenger } from "../../components/fbmessenger";

const SuccessfulScreen = ({ route }) => {
    const { result, settings } = route.params;
    const { auth } = useRootContext();

    const navigation = useNavigation();

    return (
        <ScrollView style={commonStyles.bgrColor} contentContainerStyle={{ flexGrow: 1 }}>
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <View style={{ backgroundColor: '#ffffff', paddingVertical: 20, paddingHorizontal: 10, marginHorizontal: 16, borderRadius: 6 }}>
                    {/* <Image source={require('../../../assets/icons/checked.png')}
                        style={{ width: 100, height: 100, alignSelf: 'center' }} />
                    <Text style={{ fontWeight: 'bold', fontSize: 22, paddingVertical: 20, alignSelf: 'center' }}>
                        Đặt hàng thành công
                    </Text> */}
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
                    <View style={{ flexDirection: 'col', paddingBottom: 12 }}>
                        <Text style={{ fontSize: 16, fontWeight: 'bold', color: 'red', textAlign: 'center', paddingBottom: 6 }}>
                            Đơn hàng của quý khách hàng sẽ được xử lý qua Facebook. Quý khách hãy nhấn vào biểu tượng messenger để xác nhận đơn hàng nhanh nhất có thể và để tránh Facebook giả mạo.
                        </Text>
                        {/* <Text style={{ fontSize: 16, fontWeight: 'bold', textAlign: 'center' }}>
                            Nhấn biểu tượng Messenger bên dưới để liên hệ với trang Facebook chính thức của Xuân Shop, tránh bị lừa bởi trang giả mạo.
                        </Text> */}
                        {/* nút chat */}
                        <TouchableOpacity
                            style={{ alignSelf: 'center' }}
                            onPress={openMessenger}
                        >
                            <View style={styles.cProBotFlex}>
                                <Icon source="facebook-messenger" size={50} />
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.cSussGuideBlock}>
                        <Text>
                            {/* Thông tin hướng dẫn */}
                            {settings[PAY_METHOD[result.purchased_product.payment_method].key]}
                        </Text>

                        {/* Hiển thị hướng dẫn chuyển khoản nếu phương thức là chuyển khoản */}
                        {result.purchased_product.payment_method === 'transfer' ?
                            <Button mode="outlined" style={{ marginTop: 10, width: '100%' }}
                                onPress={() => {
                                    navigation.navigate('Guide');
                                }}>
                                Xem hướng dẫn chuyển khoản
                            </Button>
                            : null}
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