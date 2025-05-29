import { View, Image } from 'react-native';
import { Appbar, Searchbar, Avatar, useTheme } from 'react-native-paper';
import styles from './styles';
import { useNavigation } from '@react-navigation/native';

const Header = ({ searchQuery, setSearchQuery }) => {
  const theme = useTheme();
  const navigation = useNavigation();

  return (
    <Appbar.Header style={styles.header}>
      {/* Logo bên trái */}
      <Avatar.Image
        size={42}
        source={require('../../../assets/icons/logo.png')} // Thay bằng logo thật
        style={styles.logo}
      />

      {/* Thanh tìm kiếm */}
      <View style={styles.searchContainer}>
        <Searchbar
          placeholder="Tìm kiếm sản phẩm..."
          onChangeText={setSearchQuery}
          value={searchQuery}
          style={styles.searchbar}
          inputStyle={styles.inputStyle}
        />
      </View>

      {/* Icon thông báo */}
      <Appbar.Action
        icon="bell-outline"
        onPress={() => { navigation.navigate('Notifications') }}
      />
    </Appbar.Header>
  );
};

export default Header;
