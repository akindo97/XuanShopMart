import { StyleSheet } from "react-native";


const styles = StyleSheet.create({
    cCartScroll: {
        flex: 1,
    },
    cCartProBlock: {
        backgroundColor: '#FFF',
        flexDirection: 'row',
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#DCDCDC',
    },
    cCartImage: {
        width: 110,
        height: 100,
        borderRadius: 10
    },
    cCartStaBlock: {
        flexDirection: 'row',
        paddingBottom: 6,
    },
    cCartStaText: {
        fontSize: 11,
        color: '#fff',
        alignSelf: 'flex-end',
        paddingHorizontal: 6,
        borderRadius: 8,
        marginRight: 6,
    },
    cCartCold: {
        backgroundColor: '#3366CC',
    },
    cCartSale: {
        backgroundColor: '#FF0000',
    },
    cCartProX: {
        backgroundColor: 'gainsboro',
        borderRadius: 50,
        padding: 2,
        marginLeft: 30,
    },
    cCartOldPrice: {
        marginBottom: -6,
    },
    cCartProvi: {
        backgroundColor: '#fff',
        borderTopWidth: 1,
        borderColor: '#DCDCDC',
        paddingHorizontal: 10,
        paddingVertical: 8,
        flexDirection: 'row',
        alignItems: 'center',
    },
    cCartProviLeft: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
    },
    cCartProviText: {
        color: 'grey',
        paddingRight: 10,
    },
    cCartProviButton: {
        paddingVertical: 3,
        paddingHorizontal: 30,
    },

    cCartEmpty: {
        width: 200,
        height: 200,
        alignSelf: 'center',
        marginTop: 50
    },
    cCartEmptyText: {
        fontSize: 20,
        color: '#000',
        width: '100%',
        textAlign: 'center',
        marginTop: 20,
    },
    cCartEmptyButton: {
        backgroundColor: '#000',
        fontSize: 18,
        marginTop: 30,
        width: '80%',
        alignSelf: 'center',
    },
});

export default styles;