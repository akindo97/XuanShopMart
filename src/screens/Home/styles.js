import { StyleSheet, Dimensions } from 'react-native';

// tính toán kích thước của item dựa trên chiều rộng
const screenWidth = Dimensions.get('window').width;
const itemWidth = screenWidth / 5;

export default StyleSheet.create({
    listContainer: {
        paddingVertical: 10,
    },
    container: {
        backgroundColor: '#EEEEEE',
    },
    block: {
        backgroundColor: '#FFF',
        marginTop: 10,
        borderRadius: 2
    },
    item: {
        width: itemWidth,
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 8,
        overflow: 'hidden',
    },
    card: {
        width: "80%",
        height: 70,
        borderRadius: "20%",
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f5f5f5',
    },
    icon: {
        width: "100%",
        height: "100%",
        resizeMode: 'contain',
    },
    text: {
        fontSize: 12,
        marginTop: 10,
        textAlign: 'center',
    },
    cCatBlock: {
        backgroundColor: '#FFF',
        marginTop: 10,
        borderRadius: 2,
        paddingRight: 8,
    },
    cCatTitle: {
        flexDirection: 'row',
        paddingLeft: 8,
        paddingTop: 5,
    },
    cCatTitTex: {
        fontSize: 20,
    },
    cCatShowTex: {
        fontSize: 16,
        color: '#00CC66'
    },
    fwbold: {
        fontWeight: 'bold'
    }
});