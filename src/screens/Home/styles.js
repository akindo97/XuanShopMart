import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    header: {
        elevation: 4,
        backgroundColor: '#00CC66',
    },
    logo: {
        marginLeft: 8,
    },
    searchContainer: {
        flex: 1,
        marginLeft: 50,
        marginRight: 2
    },
    searchbar: {
        height: 36,
        borderRadius: 20,
        elevation: 0,
        justifyContent: 'center',
    },
    inputStyle: {
        fontSize: 14,
        marginTop: -10,
        paddingVertical: 0,       // giảm khoảng cách trên/dưới
        textAlignVertical: 'center', // hiệu quả trên Android
    },
});