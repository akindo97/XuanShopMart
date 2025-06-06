import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    tab: {
        alignItems: 'center',
        paddingHorizontal: 15,
        paddingTop: 16,
        paddingBottom: 3,
    },
    selectedTab: {
        backgroundColor: "#fff",
        borderTopLeftRadius: 6,
        borderTopRightRadius: 6,
    },
    text: {
        fontSize: 16,
        color: '#888',
    },
    selectedText: {
        fontWeight: 'bold',
        color: '#000',
    },
    underline: {
        marginTop: 4,
        height: 4,
        width: '100%',
        backgroundColor: '#A2DC26',
        borderRadius: 2,
    },
    cRecentBlock: {
        backgroundColor: '#ffffff',
        padding: 10,
        borderWidth: 1,
        borderColor: '#DDDDDD',
        borderRadius: 8,
        flexDirection: 'row',
        marginBottom: 10,
    },
    cRecentBlockLeft: {
        flex: 1,
        borderRightWidth: 1,
        borderColor: '#DDDDDD',
    },
    cRecentBlockRight: {
        paddingLeft: 10,
        flexDirection: 'column',
        justifyContent: 'space-between'
    },
    cRecentBlockLine: {
        flexDirection: 'row',
        alignItems: 'center',
        borderColor: '#DDDDDD',
        borderBottomWidth: 1,
        marginRight: 10,
        paddingBottom: 5,
        marginBottom: 5,
    },
    cRecentBlockLineLast: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 10,
    },
    cRecentBlockTextT: {
        marginLeft: 10,
        width: 82
    },
    cRecentBlockTextC: {
        marginLeft: 10,
        color: '#666666'
    },
    cRecentBlockTextD: {
        marginLeft: 10,
        width: 60
    },
    cRecentBlockStt: {
        backgroundColor: 'red',
        color: '#fff',
        padding: 8,
        paddingHorizontal: 0,
        width: 100,
        textAlign: 'center',
        borderRadius: 6,
    },
    cRecentBlockGuide: {
        fontSize: 13,
        alignSelf: 'flex-end'
    },
    cDetailTop: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    cDetailTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        marginVertical: 10,
    },
    cDetailCard: {
        padding: 10
    },
    cDetailSubTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 2,
    },
    cDetailText: {
        marginBottom: 6
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
    cRencentEmpty: {
        width: 200,
        height: 200,
        alignSelf: 'center',
        marginTop: 50
    },
    cRencentEmptyText: {
        fontSize: 20,
        color: '#000',
        width: '100%',
        textAlign: 'center',
        marginTop: 20,
    },
    cRencentEmptyButton: {
        backgroundColor: '#000',
        fontSize: 18,
        marginTop: 30,
        width: '80%',
        alignSelf: 'center',
    },
});

export default styles;