import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  FlatList,
  Image,
  StyleSheet,
  StatusBar,
} from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import Header from '@components/common/Header';
import { Colors } from '@theme/colors';
import { RESTAURANTS, MENU_ITEMS } from '@utils/mockData';
import { useCart } from '@hooks/index';
import CartOverlay from '@components/specific/CartOverlay';

const MenuScreen: React.FC = () => {
  const route = useRoute<any>();
  const navigation = useNavigation<any>();
  const { restaurantId } = route.params || {};
  const { addToCart, cartItems } = useCart();

  const restaurant = useMemo(() => {
    return RESTAURANTS.find(r => r.id === restaurantId);
  }, [restaurantId]);

  const [selectedCategory, setSelectedCategory] = useState('All');
  const categories = ['All', 'Starters', 'Mains', 'Desserts', 'Drinks'];

  const filteredMenu = useMemo(() => {
    if (selectedCategory === 'All') return MENU_ITEMS;
    return MENU_ITEMS.filter(item => item.category === selectedCategory);
  }, [selectedCategory]);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <Header 
        title={restaurant ? restaurant.name : "Our Menu"} 
        onBack={() => navigation.goBack()} 
      />
      
      {restaurant && (
        <View style={styles.restaurantInfo}>
          <Image source={{ uri: restaurant.image }} style={styles.bannerImage} />
          <View style={styles.infoOverlay}>
            <Text style={styles.ratingText}>⭐ {restaurant.rating} ({restaurant.reviews} reviews)</Text>
            <Text style={styles.cuisineText}>{restaurant.cuisine} • {restaurant.priceRange} • {restaurant.deliveryTime}</Text>
          </View>
        </View>
      )}

      <View style={styles.categoryBar}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingRight: 20 }}>
          {categories.map(cat => (
            <TouchableOpacity
              key={cat}
              style={[styles.categoryPill, selectedCategory === cat && styles.categoryPillActive]}
              onPress={() => setSelectedCategory(cat)}
            >
              <Text style={[styles.categoryPillText, selectedCategory === cat && styles.categoryPillTextActive]}>{cat}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <FlatList
        data={filteredMenu}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.menuItem}>
            <Image source={{ uri: item.image }} style={styles.menuItemImage} />
            <View style={styles.menuItemContent}>
              <View style={styles.menuItemHeader}>
                <Text style={styles.menuItemName}>{item.name}</Text>
                <Text style={styles.menuItemPrice}>{item.price}</Text>
              </View>
              <Text style={styles.menuItemDesc} numberOfLines={2}>{item.description}</Text>
              <TouchableOpacity 
                style={[
                  styles.addBtn, 
                  cartItems.find(i => i.id === item.id) && styles.addBtnActive
                ]} 
                onPress={() => addToCart(item)}
              >
                <Text style={[
                  styles.addBtnText,
                  cartItems.find(i => i.id === item.id) && styles.addBtnTextActive
                ]}>
                  {cartItems.find(i => i.id === item.id) ? '✓ Added' : '+ Add to Order'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
      <CartOverlay />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  restaurantInfo: {
    height: 150,
    width: '100%',
    position: 'relative',
  },
  bannerImage: {
    width: '100%',
    height: '100%',
  },
  infoOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.6)',
    padding: 15,
  },
  ratingText: {
    color: Colors.primary,
    fontSize: 14,
    fontWeight: 'bold',
  },
  cuisineText: {
    color: '#fff',
    fontSize: 12,
    marginTop: 4,
  },
  categoryBar: {
    paddingVertical: 15,
    paddingLeft: 20,
    backgroundColor: Colors.background,
  },
  categoryPill: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: Colors.border,
    marginRight: 10,
    backgroundColor: Colors.surface,
  },
  categoryPillActive: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  categoryPillText: {
    color: Colors.textSecondary,
    fontSize: 14,
  },
  categoryPillTextActive: {
    color: '#000',
    fontWeight: 'bold',
  },
  listContent: {
    padding: 20,
    paddingBottom: 100,
  },
  menuItem: {
    flexDirection: 'row',
    marginBottom: 20,
    backgroundColor: Colors.surface,
    borderRadius: 15,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: Colors.border,
  },
  menuItemImage: {
    width: 100,
    height: '100%',
  },
  menuItemContent: {
    flex: 1,
    padding: 15,
  },
  menuItemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  menuItemName: {
    color: Colors.text,
    fontSize: 16,
    fontWeight: 'bold',
  },
  menuItemPrice: {
    color: Colors.primary,
    fontSize: 14,
    fontWeight: 'bold',
  },
  menuItemDesc: {
    color: Colors.textSecondary,
    fontSize: 12,
    marginTop: 5,
    lineHeight: 18,
  },
  addBtn: {
    marginTop: 10,
    alignSelf: 'flex-start',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Colors.primary,
  },
  addBtnActive: {
    backgroundColor: Colors.primary,
  },
  addBtnText: {
    color: Colors.primary,
    fontSize: 13,
    fontWeight: '700',
  },
  addBtnTextActive: {
    color: '#000',
  },
});

export default MenuScreen;
