import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Colors } from '@theme/colors';

interface RestaurantCardProps {
  restaurant: {
    id: string;
    name: string;
    location: string;
    rating: number;
    reviews: number;
    cuisine: string;
    image: string;
    priceRange: string;
    deliveryTime: string;
  };
  onPress?: () => void;
}

const RestaurantCard = ({ restaurant, onPress }: RestaurantCardProps) => {

  /**
   * 
   * Restaurant Card Component
   */


  return (
    <TouchableOpacity activeOpacity={0.9} style={styles.card} onPress={onPress}>
      <Image source={{ uri: restaurant.image }} style={styles.image} />
      <View style={styles.badge}>
        <Text style={styles.badgeText}>{restaurant.rating} ★</Text>
      </View>

      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.name}>{restaurant.name}</Text>
          <Text style={styles.price}>{restaurant.priceRange}</Text>
        </View>

        <Text style={styles.cuisine}>{restaurant.cuisine} • {restaurant.location}</Text>

        <View style={styles.infoRow}>
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Delivery:</Text>
            <Text style={styles.infoValue}>{restaurant.deliveryTime}</Text>
          </View>
          <View style={[styles.infoItem, { borderLeftWidth: 1, borderColor: Colors.borderLight, paddingLeft: 10 }]}>
            <Text style={styles.infoLabel}>Reviews:</Text>
            <Text style={styles.infoValue}>{restaurant.reviews}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.surface,
    borderRadius: 20,
    marginBottom: 20,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: Colors.border,
  },
  image: {
    width: '100%',
    height: 180,
  },
  badge: {
    position: 'absolute',
    top: 15,
    right: 15,
    backgroundColor: Colors.primary,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  badgeText: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 12,
  },
  content: {
    padding: 15,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
  },
  name: {
    color: Colors.text,
    fontSize: 18,
    fontWeight: 'bold',
  },
  price: {
    color: Colors.primary,
    fontWeight: 'bold',
    fontSize: 14,
  },
  cuisine: {
    color: Colors.textSecondary,
    fontSize: 13,
    marginBottom: 12,
  },
  infoRow: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: Colors.borderLight,
    paddingTop: 12,
    marginTop: 5,
  },
  infoItem: {
    flexDirection: 'row',
    marginRight: 15,
    alignItems: 'center',
  },
  infoLabel: {
    color: Colors.textMuted,
    fontSize: 12,
    marginRight: 5,
  },
  infoValue: {
    color: Colors.text,
    fontSize: 12,
    fontWeight: '600',
  },
});

export default RestaurantCard;
