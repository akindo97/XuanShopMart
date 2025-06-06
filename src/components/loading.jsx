import { View, Text } from "react-native";
import { ActivityIndicator } from "react-native-paper";

export const Loading = (props) => {
    const loadText = props?.text ?? "Đang tải dữ liệu...";

    return (
            <View style={{ justifyContent: 'center', alignItems: 'center', paddingTop: 100 }}>
                <ActivityIndicator size={80} animating={true} color="#00CC66" />
                <Text style={{marginTop: 20, fontSize: 16}}>{loadText}</Text>
            </View>
        );
}