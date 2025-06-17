import { View, Text } from "react-native";
import { ActivityIndicator } from "react-native-paper";

export const Loading = (props) => {
    const loadText = props?.text ?? "Đang tải dữ liệu...";
    const loadSize = props?.size ?? 80;
    const loadTop = props?.top ?? 20;

    return (
            <View style={{ justifyContent: 'center', alignItems: 'center', paddingTop: loadTop }}>
                <ActivityIndicator size={loadSize} animating={true} color="#00CC66" />
                <Text style={{fontSize: 16}}>{loadText}</Text>
            </View>
        );
}

// Hiển thị loading toàn màn hình
export const FullLoading = (props) => {
  const loadText = props?.text ?? "Đang xử lý...";
  const loadSize = props?.size ?? 80;

  return (
    <View
      style={{
        position: 'absolute',
        top: 0, left: 0, right: 0, bottom: 0,
        backgroundColor: 'rgba(0,0,0,0.3)', // làm mờ nền
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 9999, // đảm bảo trên tất cả
      }}
      pointerEvents="auto" // chặn thao tác touch bên dưới
    >
      <ActivityIndicator size={loadSize} color="#00CC66" />
      <Text style={{ marginTop: 20, fontSize: 16, color: 'white' }}>{loadText}</Text>
    </View>
  );
};