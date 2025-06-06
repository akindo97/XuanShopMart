import { Button, Icon, TouchableRipple } from 'react-native-paper';
import * as Clipboard from 'expo-clipboard';
import { ToastAndroid, View, Text } from 'react-native';
import { showMessage } from 'react-native-flash-message';
import { Platform } from 'react-native';

const CopyToClipboard = (props) => {
    // Lấy giá trị cần sao chép từ props, mặc định là chuỗi rỗng nếu không có
    const copyValue = props?.value ?? "";

    // Hàm sao chép giá trị vào clipboard và hiển thị thông báo
    const copyToClipboard = async (value) => {
        await Clipboard.setStringAsync(value.toString());
        if (Platform.OS === 'android') {
            // Hiển thị Toast trên Android
            ToastAndroid.show('Đã sao chép', ToastAndroid.SHORT);
        } else {
            // Hiển thị thông báo trên các nền tảng khác
            showMessage({
                message: 'Đã sao chép',
                type: "info",
            });
        }
    }

    return (
        <TouchableRipple
            onPress={() => copyToClipboard(copyValue)}
            rippleColor="rgba(0, 0, 0, 0)"
            style={{ marginLeft: 5 }}
        >
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Icon source="content-copy" size={10} />
                <Text style={{ marginLeft: 1 }}>Copy</Text>
            </View>
        </TouchableRipple>
    )
};

export default CopyToClipboard;