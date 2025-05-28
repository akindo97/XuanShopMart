import React, { useState } from 'react';
import { StyleSheet, Text, Image, View, FlatList, Dimensions } from 'react-native';
import { TouchableRipple, Surface } from 'react-native-paper';

import Header from './header';

export default function HomeScreens() {
    // tìm kiếm
    const [searchQuery, setSearchQuery] = useState('');

    // giả lập data
    const ProductCatalog = [
        {
            Name: "Sale",
            Icon: require("../../../assets/icons/sale.png"),
        },
        {
            Name: "Sale2",
            Icon: require("../../../assets/icons/sale.png"),
        },
        {
            Name: "Sale2",
            Icon: require("../../../assets/icons/sale.png"),
        },
        {
            Name: "Sale2",
            Icon: require("../../../assets/icons/sale.png"),
        },
        {
            Name: "Sale2",
            Icon: require("../../../assets/icons/sale.png"),
        },
        {
            Name: "Sale2",
            Icon: require("../../../assets/icons/sale.png"),
        },
        {
            Name: "Sale2",
            Icon: require("../../../assets/icons/sale.png"),
        },
        {
            Name: "Sale2",
            Icon: require("../../../assets/icons/sale.png"),
        },
    ];

    //
    const renderItem = ({ item }) => (
        <TouchableRipple onPress={() => console.log(item.Name)} style={styles.item}>
            <Surface style={styles.card} elevation={2}>
                <Image source={item.Icon} style={styles.icon} />
                <Text style={styles.text}>{item.Name}</Text>
            </Surface>
        </TouchableRipple>
    );

    return (
        <View style={{ flex: 1 }}>
            <Header searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
            <FlatList
                data={ProductCatalog}
                renderItem={renderItem}
                keyExtractor={(item, index) => index.toString()}
                numColumns={5}
                contentContainerStyle={styles.listContainer}
            />
        </View>
    );
}

const screenWidth = Dimensions.get('window').width;
const itemWidth = screenWidth / 5;
const styles = StyleSheet.create({
  listContainer: {
    paddingVertical: 10,
  },
  item: {
    width: itemWidth,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 8,
  },
  card: {
    width: "80%",
    height: "80%",
    borderRadius: "30%",
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
    marginTop: 4,
    textAlign: 'center',
  },
});