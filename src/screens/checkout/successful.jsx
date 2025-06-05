import { View, ScrollView, Image, Text } from "react-native"
import commonStyles from "../../utils/commonstyles"
import styles from "./styles"
import { Button } from "react-native-paper"

const SuccessfulScreen = () => {

    return (
        <ScrollView style={commonStyles.bgrColor} contentContainerStyle={{ flexGrow: 1 }}>
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <View style={{ backgroundColor: '#ffffff', paddingVertical: 20, paddingHorizontal: 10, marginHorizontal: 16, borderRadius: 6 }}>
                    <Image source={require('../../../assets/icons/checked.png')}
                        style={{ width: 100, height: 100, alignSelf: 'center' }} />
                    <Text style={{ fontWeight: 'bold', fontSize: 22, paddingVertical: 20, alignSelf: 'center' }}>
                        Đặt hàng thành công
                    </Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center', paddingBottom: 12 }}>
                        <Text style={{ fontWeight: 'bold', fontSize: 18 }}>
                            Mã đơn hàng:
                        </Text>
                        <Text style={{ fontWeight: 'bold', fontSize: 18, color: 'orange', marginLeft: 5 }}>
                            123456
                        </Text>
                    </View>
                    <View style={styles.cSussGuideBlock}>
                        <Text>
                            👉 Quý khách vui lòng chuyển khoản vào tài khoản sau để thanh toán:

                            Ngân hàng Pay pay ( Pay pay 銀行)
                            Chủ tài khoản/口座名: セーソ（カ
                            Loại tài khoản/預金項目：普通
                            Tên chi nhánh/支店番号 : ビジネス営業部（００５)
                            Số tài khoản/口座番号: ６６８２１７３

                            ※Lưu ý: phí chuyển khoản sẽ do khách hàng chi trả.
                            ※Chuyển đúng số tiền của đơn hàng để hệ thống xác nhận.
                            ※Sau khi chuyển khoản phiền quý khách gửi hình hoá đơn chuyển khoản và gửi qua email ( info@sesofoods.com ) hoặc fanpage Facebook ( @sesofoods)
                            để chúng tôi xác nhận và xử lý đơn hàng nhanh nhất.
                        </Text>
                    </View>
                    <View style={styles.cSussGuideBlock}>
                        <Text>
                            Đăng nhập / đăng ký để nhận nhiều ưu đã nhé.
                        </Text>
                        <Button onPress={() => console.log(1)}>Đăng nhập/Đăng ký</Button>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingTop: 15 }}>
                        <Button mode="contained" style={commonStyles.buttonColor}>Đơn hàng</Button>
                        <Button mode="contained" style={commonStyles.buttonColor}>Trang chủ</Button>
                    </View>
                </View>
            </View>
        </ScrollView>
    )
}

export default SuccessfulScreen;