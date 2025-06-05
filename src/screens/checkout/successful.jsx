import { View, ScrollView, Image, Text } from "react-native"
import commonStyles from "../../utils/commonstyles"

const SuccessfulScreen = () => {

    return (
        <ScrollView style={commonStyles.bgrColor}>
            <View style={{backgroundColor: '#ffffff', paddingVertical: 20, paddingHorizontal: 10}}>
                <Image source={require('../../../assets/icons/checked.png')} 
                style={{width: 120, height: 120, alignSelf: 'center'}}/>
                <Text style={{ fontWeight: 'bold', fontSize: 22, paddingVertical: 20, alignSelf: 'center' }}>
                    Đặt hàng thành công
                </Text>
                <View style={{ flexDirection: 'row', alignItems: 'center', paddingBottom: 10 }}>
                    <Text style={{ fontWeight: 'bold', fontSize: 18 }}>
                        Mã đơn hàng: 
                    </Text>
                    <Text style={{ fontWeight: 'bold', fontSize: 18, color: 'orange', marginLeft: 5 }}>
                        #123456
                    </Text>
                </View>
            </View>
        </ScrollView>
    )
}

export default SuccessfulScreen;