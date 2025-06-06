import { View, Text } from "react-native";
import { ActivityIndicator } from "react-native-paper";

export const Loading = (props) => {
    const loadText = props?.text ?? "Đang tải dữ liệu...";
    const loadSize = props?.size ?? 80;

    return (
            <View style={{ justifyContent: 'center', alignItems: 'center', paddingTop: 100 }}>
                <ActivityIndicator size={loadSize} animating={true} color="#00CC66" />
                <Text style={{marginTop: 20, fontSize: 16}}>{loadText}</Text>
            </View>
        );
}