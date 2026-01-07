import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    cCOBlock: {
        backgroundColor: '#ffffff',
        paddingHorizontal: 10,
        paddingVertical: 10,
    },
    cCOLogText: {
        color: '#0000FF',
        textDecorationLine: 'underline',
        paddingHorizontal: 3,
        marginBottom: -3,
    },
    cCOTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        marginVertical: 10,
    },
    cCOInput: {
        backgroundColor: 'white',
        borderColor: '#DDDDDD',
        borderWidth: 1,
        paddingHorizontal: 10,
        marginBottom: 10,
        height: 30,
    },
    cCOInputIcon: {
        paddingTop: 15
    },
    cCOGuideText: {
        color: '#00CC66',
        fontSize: 13,
        marginTop: -5,
        marginBottom: 10,
        paddingHorizontal: 10,
    },
    cCORadioItem1: {
        borderWidth: 1,
        borderTopLeftRadius: 6,
        borderTopRightRadius: 6,
        borderColor: '#00CC6630',
    },
    cCORadioItem2: {
        borderWidth: 1,
        borderTopWidth: 0,
        borderBottomLeftRadius: 6,
        borderBottomRightRadius: 6,
        borderColor: '#00CC6630',
        backgroundColor: '#FFFAFA',
    },
    cCORadioItemSl: {
        backgroundColor: '#00CC6630'
    },
    cCOMessInput: {
        height: 80,
        backgroundColor: 'white',
        borderColor: '#DDDDDD',
        textAlignVertical: 'top',
        marginBottom: 10,
    },
    cCOGuide: {
        marginVertical: 20,
        padding: 10,
    },
    cCOTotalBlock: {
        borderWidth: 1,
        paddingHorizontal: 10,
        borderRadius: 6,
        borderColor: '#DDDDDD'
    },
    cCOTotalRow: {
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderColor: '#DDDDDD',
        paddingVertical: 5,
    },
    cCOTotalImage: {
        height: 30,
        width: 46,
        paddingHorizontal: 8,
    },
    cCOTotalName: {
        flex: 1,
        paddingHorizontal: 8,
    },
    cCOTotalQuantyti: {
        paddingHorizontal: 8,

    },
    cCOTotalPrice: {
        paddingHorizontal: 8,
        paddingLeft: 3,
        width: 70,
        textAlign: 'right'
    },
    cCOTotalCalBlock: {
        padding: 10,
        paddingRight: 18,
        marginBottom: 30
    },
    cCOTotalCalRow: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        paddingVertical: 3,
    },
    cCOTotalCalLeft: {
        flex: 1
    },
    cCOTotalCalRight: {
    },
    cCOBuyButton: {
        marginHorizontal: 18,
        paddingVertical: 3,
        marginBottom: 50,
    },
    cSussGuideBlock: {
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 8,
        padding: 10,
        marginVertical: 6
    },
        cProBotFlex: {
            marginTop: 10,
            backgroundColor: '#0084FF',
            padding: 6,
            borderRadius: 50,
    },
})

export default styles;