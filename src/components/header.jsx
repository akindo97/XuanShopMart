import { View, Text, StyleSheet } from 'react-native';
import { Appbar, Searchbar, Avatar, useTheme, Icon } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

import { apiRequest } from '../api';

const Header = ({ searchQuery, setSearchQuery, title }) => {
  const navigation = useNavigation();

  return (
    <Appbar.Header style={styles.cHeader}>
      {title ?
        // nếu title được truyền vào thì hiển thị tiêu đề
        <Text style={styles.cHeaderTitle}>{title}</Text> :
        
        // nếu không thì hiển thị logo, thanh tìm kiếm và icon thông báo
        <>
          {/* Logo bên trái */}
          <View style={styles.cHeaLogo}>
            <Icon
              size={58}
              source={require('../../assets/icons/logoxshrv.png')} // Thay bằng logo thật
            />
          </View>

          {/* Thanh tìm kiếm */}
          <View style={styles.cHeaSearchCtn}>
            <Searchbar
              placeholder="Tìm kiếm sản phẩm..."
              onChangeText={setSearchQuery}
              value={searchQuery}
              style={styles.cSearchBar}
              inputStyle={styles.inputStyle}
            />
          </View>

          {/* Icon thông báo */}
          <Appbar.Action
            icon="bell-outline"
            onPress={async() => { 
              // navigation.navigate('Notifications')
              const users = await apiRequest('/category');
              console.log(users);
             }}
          />
        </>
      }

    </Appbar.Header>
  );
};

const styles = StyleSheet.create({
  cHeader: {
    elevation: 4,
    backgroundColor: '#00CC66',
  },
  cHeaderTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#FFFFFF',
    width: '100%',
  },
  cHeaLogo: {
    paddingLeft: 8,
    backgroundColor: 'transparent',
  },
  cHeaSearchCtn: {
    flex: 1,
    marginLeft: 50,
    marginRight: 2
  },
  cSearchBar: {
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

export default Header;
