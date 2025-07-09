import React, { useEffect, useState } from 'react';
import { View, FlatList, StyleSheet, Text, Image } from 'react-native';
import { Card, Button } from 'react-native-paper';

const mockVouchers = [
    {
        id: '1',
        title: 'Giảm 20% cho đơn hàng đầu tiên',
        description: 'Áp dụng cho đơn hàng từ 1000 yên trở lên',
        code: 'WELCOME20',
    },
    {
        id: '2',
        title: 'Miễn phí vận chuyển',
        description: 'Cho mọi đơn hàng trong tháng 6',
        code: 'FREESHIP6',
    },
    {
        id: '3',
        title: 'Giảm 500 yên',
        description: 'Khi mua trên 3000 yên',
        code: 'SAVE500',
    },
];

export default function VoucherScreen({ navigation }) {
    const [vouchers, setVouchers] = useState([]);

    useEffect(() => {
        // Nếu là API thật thì dùng fetch ở đây
        setVouchers(mockVouchers);
    }, []);

    const renderVoucher = ({ item }) => (
        <Card style={styles.card} onPress={() => applyVoucher(item)}>
            <Card.Content>
                <Card.Title><Text>{item.title}</Text></Card.Title>
                <Card.Content><Text>{item.description}</Text></Card.Content>
                <Card.Content style={styles.code}><Text>Mã: {item.code}</Text></Card.Content>
            </Card.Content>
            <Card.Actions>
                <Button onPress={() => applyVoucher(item)}>Dùng ngay</Button>
            </Card.Actions>
        </Card>
    );

    const applyVoucher = (voucher) => {
        // Tuỳ logic, có thể chuyển qua màn hình thanh toán hoặc gọi hàm setVoucher
        // console.log('Voucher đã chọn:', voucher);
        // navigation.goBack(); hoặc navigation.navigate('Checkout', { voucher })
    };

    return (
        <View>
            <Image
                source={require('../../../assets/icons/black-friday.png')}
                style={{
                    width: 200,
                    height: 200,
                    alignSelf: 'center',
                    marginTop: 50
                }} />
            <Text style={{
                fontSize: 20,
                color: '#000',
                width: '100%',
                textAlign: 'center',
                marginTop: 20,
            }}>
                Bạn chưa có voucher nào
            </Text>
        </View>
        // <View style={styles.container}>
        //   <FlatList
        //     data={vouchers}
        //     keyExtractor={(item) => item.id}
        //     renderItem={renderVoucher}
        //     contentContainerStyle={{ paddingBottom: 20 }}
        //   />
        // </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
    },
    card: {
        marginBottom: 10,
    },
    code: {
        marginTop: 8,
        fontWeight: 'bold',
        color: '#00CC66',
    },
});
