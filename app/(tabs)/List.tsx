import React from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Image } from 'react-native';
const foodData = [
    { id: '1', title: 'Pantry', image: require('../../assets/images/pantry_moji.png'), locked: false },

    { id: '2', title: 'Beverages', image: require('../../assets/images/drink_moji.png'), locked: false },
    { id: '3', title: 'Breakfast', image: require('../../assets/images/waffle_moji.png'), locked: false },
    { id: '4', title: 'Prepared Foods', image: require('../../assets/images/takeout_moji.png'), locked: false },
    { id: '7', title: 'Protein & supplements', image: require('../../assets/images/pill_moji.png'), locked: true },
    { id: '5', title: 'Snacks', image: require('../../assets/images/sweets_moji.png'), locked: true },
    { id: '6', title: 'Frozen', image: require('../../assets/images/frozen_moji.png'),locked: true },
    // { id: '7', title: 'Sweets', image: require('../../assets/images/drink_moji.png'), locked: true },

    { id: '8', title: 'Meat', image: require('../../assets/images/meat_moji.png'), locked: true },
    { id: '9', title: 'Chicken', image: require('../../assets/images/chicken_moji.png'), locked: true },
    { id: '10', title: 'Seafood', image: require('../../assets/images/seafood_moji.png'),locked: true },
    { id: '11', title: 'Plant-based', image: require('../../assets/images/plant_moji.png'), locked: true },
    { id: '12', title: 'Coffee', image: require('../../assets/images/coffee_moji.png'), locked: true },

    // { id: '13', title: 'Candy', image: require('../../assets/images/drink_moji.png'), locked: true },
  ];

const List = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Halal Products</Text>
     

      <FlatList
        data={foodData}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}

        renderItem={({ item }) => (
          <TouchableOpacity
            style={[styles.listItem, item.locked && styles.lockedItem]}
            activeOpacity={0.7}
            onPress={() => console.log(`Clicked on ${item.title}`)}
          >
        <View style={styles.rowLeft}>
        <Image
            source={item.image}
            style={[styles.imageIcon, item.locked && styles.lockedImage]}
            resizeMode="contain"
        />
        <Text
            style={[
            styles.itemText,
            item.locked && styles.lockedText,
            ]}
        >
            {item.title}
        </Text>
        </View>

            <View style={styles.rowRight}>
              {item.locked ? (
                <Ionicons name="lock-closed-outline" size={18} color="#bbb" /> )
                :       ( <Ionicons
                name="chevron-forward"
                size={20}
                color={item.locked ? '#bbb' : '#999'}
                style={{ marginLeft: 10 }}
              />
              )}
       
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default List;

const styles = StyleSheet.create({
  // container: {
  //   backgroundColor: '#f5f5f5',
  //   flex: 1,
  //   paddingTop: 60,
  //   paddingHorizontal: 16,
  // },
  container: {
    backgroundColor: '#f5f5f5',
    flex: 1,
    paddingTop: 80, // already good for now
    paddingHorizontal: 16,
    
  },
  // header: {
  //   fontSize: 25,
  //   fontWeight: '600',
  //   marginBottom: 16,
  // },
  header: {
    fontSize: 34,        // Matches iOS-style display title
    fontWeight: '800',   //
    marginBottom:30
  },

  listItem: {
    backgroundColor: '#fff',
    paddingVertical: 14,
    paddingHorizontal: 12,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  lockedItem: {
    backgroundColor:'#eee'
    
  },
  rowLeft: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  rowRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  emoji: {
    fontSize: 20,
    marginRight: 10,
    color: '#000',
  },
  lockedEmoji: {
    textShadowColor: '#666666',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 4,
    opacity: 0.5,
  },
  itemText: {
    fontSize: 15,
    fontWeight: '500',
    color: '#000',
  },
  lockedText: {
    color: '#bbbbbb',
  },
  imageIcon: {
    width: 24,
    height: 24,
    marginRight: 10,
  },
  lockedImage: {
    opacity: 0.5,
  },
  
});

























