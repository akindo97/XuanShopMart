import { StyleSheet, Dimensions } from "react-native";

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#DDDDDD',
        flex: 1,
        position: 'relative',
    },
    CproTopBlock: {
        backgroundColor: '#fff',
    },
    cProImageBlock: {
        height: 280
    },
    cProImage: {
        width: width,
        height: '100%',
        resizeMode: 'cover',
    },
    cProCounter: {
        position: 'absolute',
        bottom: 10,
        right: 10,
        backgroundColor: 'rgba(0,0,0,0.5)',
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 12,
    },
    cProCounText: {
        color: '#fff',
        fontSize: 14,
    },
    CproDelBlock: {
        backgroundColor: '#fff',
        padding: 10
    },
    cProName: {
        fontSize: 18,
        paddingTop: 10,
    },
    cProHov: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    cProPrice: {
        fontSize: 23,
        color: 'red',
        fontWeight: 'bold',
    },
    // cProOldPrice: {
    //     fontSize: 13,
    //     textDecorationLine: 'line-through',
    //     color: '#666',
    //     paddingLeft: 10,
    //     paddingBottom: 2,
    // },
    cProSale: {
        fontSize: 13,
        color: '#00CC66',
        paddingLeft: 10,
        paddingBottom: 2,
    },
    cProStatus: {
        fontSize: 13,
        alignSelf: 'flex-start',
        paddingHorizontal: 6,
        borderRadius: 7,
        padding: 2,
        marginTop: 6,
    },
    cInStock: {
        backgroundColor: '#00CC6699',
        color: '#fff',
    },
    cOutStock: {
        backgroundColor: '#66666699',
        color: '#fff',
    },
    cProId: {
        marginTop: 3,
        fontSize: 10,
        color: '#666',
    },
    cProDesBlock: {
        backgroundColor: '#fff',
        marginTop: 10,
        padding: 10,
    },
    CProDesTit: {
        fontSize: 16,
        paddingBottom: 3,
        fontWeight: 'bold',
    },
    cCatTitle: {
        flexDirection: 'row',
    },
    cLoadCenter: {
        flexDirection: 'row',
    },
    cCatTitTex: {
        fontSize: 16,
    },
    cCatShowTex: {
        fontSize: 16,
    },
    cProBotBlocck: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        paddingVertical: 6,
        paddingHorizontal: 10,
        backgroundColor: '#fff',
        borderColor: '#BEBEBE',
        borderTopWidth: 1,
        flexDirection: 'row',
        paddingBottom: 20,
    },
    cProBotFlex: {
        alignItems: 'center',
        borderRightWidth: 1,
        borderRightColor: '#BEBEBE',
        marginRight: 10,
        paddingRight: 10,
    },
    cProBadge: {
        position: 'absolute',
        top: -3,
        right: -10,
        backgroundColor: '#FF0000',
        borderRadius: 10,
        paddingHorizontal: 5,
        color: '#fff',
        fontSize: 12,
    },
    cProBotText: {
        fontSize: 12,
    },
    cProBotBtn: {
        flex: 1,
    },
    fwbold: {
        fontWeight: 'bold'
    },
    cProButIcon: {
        flexDirection: 'row',
        alignItems: 'center',
        alignContent: 'center',
        justifyContent: 'center'
    },
    cProButText: {
        fontSize: 15
    }
});

export default styles;