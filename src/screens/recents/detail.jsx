import { View, Text, Image, ScrollView } from "react-native";
import { Card, Icon } from "react-native-paper";
import styles from './styles';
import CopyToClipboard from '../../components/copy';
import { fToYen, formatDate } from "../../utils/utils";
import commonStyles from "../../utils/commonstyles";
import { ORDER_STATUS, PAY_METHOD } from "../../config/config";

const DetailScreen = ({ route }) => {
    // Lấy thông tin chi tiết đơn hàng từ index
    const recent = route.params?.recent ?? [];
    
    return (
        <ScrollView style={{ backgroundColor: '#ffffff', flexGrow: 1 }}>
            <View style={{ padding: 10 }}>
                <View style={styles.cDetailTop}>
                    <View>
                        {/* Ngày giờ */}
                        <View style={styles.cRecentBlockLineLast}>
                            <Icon source="clock-time-eight-outline" size={18} />
                            <Text style={styles.cRecentBlockTextD}>Ngày giờ</Text>
                            <Text style={styles.cRecentBlockTextC}>{formatDate(recent.created_at, true)}</Text>
                        </View>
                        {/* Mã đơn */}
                        <View style={styles.cRecentBlockLineLast}>
                            <Icon source="cryengine" size={18} />
                            <Text style={styles.cRecentBlockTextD}>Mã đơn</Text>
                            <Text style={[styles.cRecentBlockTextC, { fontWeight: 'bold', color: 'orange' }]}>
                                {recent.order_code}
                            </Text>
                            <CopyToClipboard value={recent.order_code} />
                        </View>
                    </View>
                    {/* Trạng thái */}
                    <View>
                        <Text style={[styles.cRecentBlockStt, { backgroundColor: ORDER_STATUS[recent.order_status].color }]}>
                            {ORDER_STATUS[recent.order_status].label}
                        </Text>
                    </View>
                </View>

                {/* Thông tin nhận hàng */}
                <Text style={styles.cDetailTitle}>Thông tin nhận hàng</Text>
                <Card style={styles.cDetailCard}>
                    <Text style={styles.cDetailSubTitle}>Thông tin người nhận</Text>
                    {/* E-mail */}
                    <Text>
                        {recent.contact_email}
                    </Text>
                    {/* Tên */}
                    <Text>
                        {recent.shipping_first_name} {recent.shipping_last_name}
                    </Text>
                    {/* Số điện thoại nếu có */}
                    {recent.shipping_phone_number ?
                        <Text style={styles.cDetailText}>
                            {recent.shipping_phone_number}
                        </Text> : null
                    }
                    {/* Địa chỉ nhận hàng */}
                    <Text style={styles.cDetailSubTitle}>Địa chỉ nhận hàng</Text>
                    <Text style={styles.cDetailText}>
                        {recent.shipping_postal_code} {recent.shipping_address_1} {recent.shipping_address_2} {recent.shipping_address_3}
                    </Text>
                    {/* Thời gian nhận hàng */}
                    <Text style={styles.cDetailSubTitle}>Thời gian nhận hàng</Text>
                    <Text style={styles.cDetailText}>
                        {recent.shipping_delivery_time}
                    </Text>
                    {/* Ghi chú */}
                    <Text style={styles.cDetailSubTitle}>Ghi chú</Text>
                    <Text style={styles.cDetailText}>
                        {recent.shipping_message ? recent.shipping_message : 'Không có'}
                    </Text>
                </Card>

                {/* Hình thức thanh toán */}
                <Text style={styles.cDetailTitle}>Hình thức thanh toán</Text>
                <Card style={styles.cDetailCard}>
                    <Text style={styles.cDetailSubTitle}>
                        {PAY_METHOD[recent.payment_method].label}
                    </Text>
                    <Text style={styles.cDetailText}>
                        {recent.payment_guide}
                    </Text>
                </Card>

                {/* Đơn hàng */}
                <Text style={styles.cDetailTitle}>Đơn hàng</Text>
                <View style={styles.cCOTotalBlock}>
                    {
                        recent.order_items.map((item) => (
                            <View key={item.id} style={styles.cCOTotalRow}>
                                <Image source={{ uri: item.product.thumbnail_url }}
                                    style={styles.cCOTotalImage} />
                                <Text style={styles.cCOTotalName} numberOfLines={2}>
                                    {/* Tên sản phẩm lúc mua */}
                                    {item.product_name}
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
                        <Text style={styles.cCOTotalCalLeft}>Tổng hàng (số lượng {recent.quantity_total})</Text>
                        <Text style={styles.cCOTotalCalRight}>¥{fToYen(recent.subtotal)}</Text>
                    </View>
                    {/* Phí vận chuyển */}
                    <View style={styles.cCOTotalCalRow}>
                        <Text style={styles.cCOTotalCalLeft}>Phí vận chuyển</Text>
                        <Text style={styles.cCOTotalCalRight}>¥{fToYen(recent.shipping_fee)}</Text>
                    </View>
                    {/* Nếu có phí động lạnh thì hiện thị */}
                    {recent.cold_fee !== 0 && (
                        <View style={styles.cCOTotalCalRow}>
                            <Text style={styles.cCOTotalCalLeft}>Phí đông lạnh</Text>
                            <Text style={styles.cCOTotalCalRight}>¥{fToYen(recent.cold_fee)}</Text>
                        </View>
                    )}
                    {/* Nếu có phí shi COD thì hiện thị */}
                    {recent.cod_fee !== 0 && (
                        <View style={styles.cCOTotalCalRow}>
                            <Text style={styles.cCOTotalCalLeft}>Phí ship COD</Text>
                            <Text style={styles.cCOTotalCalRight}>¥{fToYen(recent.cod_fee)}</Text>
                        </View>
                    )}
                    <View style={styles.cCOTotalCalRow}>
                        <Text style={[commonStyles.font20, commonStyles.fwblob]}>Tổng cộng</Text>
                        <Text style={[styles.cCOTotalCalLeft, commonStyles.font12, commonStyles.pLeft10]}>(Đã bao gồm thuế)</Text>
                        <Text style={[styles.cCOTotalCalRight, commonStyles.font20, commonStyles.fwblob]}>
                            ¥{fToYen(recent.total_amount)}
                        </Text>
                    </View>
                    <View style={styles.cCOTotalCalRow}>
                        <Text style={[styles.cCOTotalCalLeft, commonStyles.textColor]}>Điểm nhận được</Text>
                        <Text style={[styles.cCOTotalCalRight, commonStyles.textColor]}>
                            +{recent.reward_points}
                        </Text>
                    </View>
                </View>
            </View>
        </ScrollView>
    )
}

export default DetailScreen;