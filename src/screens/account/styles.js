import { StyleSheet } from "react-native";


const styles = StyleSheet.create({
    cRLContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    cRLBlock: {
        width: '90%',
        backgroundColor: '#FFFFFF',
        padding: 20,
        borderRadius: 10,
        alignItems: 'center'
    },
    cRLTitle: {
        width: '100%',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderColor: '#DDDDDD',
    },
    cRLTitleText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333333',
        paddingBottom: 10
    },
    cRLInput: {
        backgroundColor: 'white',
        borderColor: '#DDDDDD',
        borderWidth: 1,
        borderRadius: 6,
        paddingHorizontal: 10,
        marginBottom: 10,
    },
    xRLForgotBlock: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        width: '100%'
    },
    xRLForgot: {
        color: '#007BFF',
        textAlign: 'right',
        marginBottom: 10,
        paddingTop: 5,
    },
    cRLButton: {
        paddingVertical: 6,
        borderRadius: 6,
        marginTop: 30,
    },
    cRLOrText: {
        textAlign: 'center',
        marginVertical: 26,
        color: '#888888'
    },
    cRLResgisBlock: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    xRLRegisNow: {
        color: '#007BFF',
        marginLeft: 5,
        fontWeight: 'bold',
    },
    cShipTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        marginVertical: 10,
    },
    cRPLabel: {
        marginBottom: 20
    }
})

export default styles;