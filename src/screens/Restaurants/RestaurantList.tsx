import React, { useState } from 'react';
import { 
  View, 
  FlatList, 
  StyleSheet, 
  TextInput, 
  RefreshControl, 
  TouchableOpacity, 
  Text,
  Modal,
  ScrollView,
} from 'react-native';
import Header from '@components/common/Header';
import RestaurantCard from '@components/specific/RestaurantCard';
import { Colors } from '@theme/colors';
import { RESTAURANTS } from '@utils/mockData';
import { useRoute } from '@react-navigation/native';

interface Props {
  navigation?: any;
}

const RestaurantList = ({ navigation }: Props) => {
  const route = useRoute<any>();
  const [searchQuery, setSearchQuery] = useState(route.params?.query || '');
  const [refreshing, setRefreshing] = useState(false);
  const [filterVisible, setFilterVisible] = useState(false);
  const [selectedCuisine, setSelectedCuisine] = useState('All');

  const cuisines = ['All', 'Italian', 'Japanese', 'Mexican', 'French', 'Vegan', 'Seafood', 'Indian'];

  const handleRestaurantPress = (restaurantId: string) => {
    navigation?.navigate('Menu', { restaurantId });
  };

  const filteredRestaurants = RESTAURANTS.filter(r => {
    const matchesSearch = r.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.cuisine.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.location.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCuisine = selectedCuisine === 'All' || r.cuisine === selectedCuisine;
    
    return matchesSearch && matchesCuisine;
  });

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1500);
  }, []);

  return (
    <View style={styles.container}>
      <Header title="Restaurants" />
      
      <View style={styles.searchSection}>
        <View style={styles.searchBarContainer}>
          <Text style={styles.searchIcon}>🔍</Text>
          <TextInput
            placeholder="Search cuisine or restaurant..."
            placeholderTextColor={Colors.textSecondary}
            style={styles.searchInput}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
        <TouchableOpacity 
          style={styles.filterButton} 
          activeOpacity={0.7}
          onPress={() => setFilterVisible(true)}
        >
          <Text style={styles.filterIcon}>⚙️</Text>
        </TouchableOpacity>
      </View>

      <Modal
        visible={filterVisible}
        animationType="slide"
        transparent={true}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Filters</Text>
              <TouchableOpacity onPress={() => setFilterVisible(false)}>
                <Text style={styles.closeIcon}>✕</Text>
              </TouchableOpacity>
            </View>

            <Text style={styles.filterSectionLabel}>Cuisine Type</Text>
            <View style={styles.filterTags}>
              {cuisines.map(cuisine => (
                <TouchableOpacity
                  key={cuisine}
                  style={[
                    styles.filterTag,
                    selectedCuisine === cuisine && styles.filterTagActive
                  ]}
                  onPress={() => setSelectedCuisine(cuisine)}
                >
                  <Text style={[
                    styles.filterTagText,
                    selectedCuisine === cuisine && styles.filterTagTextActive
                  ]}>{cuisine}</Text>
                </TouchableOpacity>
              ))}
            </View>

            <TouchableOpacity 
              style={styles.applyBtn}
              onPress={() => setFilterVisible(false)}
            >
              <Text style={styles.applyBtnText}>Apply Filters</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <FlatList
        data={filteredRestaurants}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <RestaurantCard 
            restaurant={item} 
            onPress={() => handleRestaurantPress(item.id)} 
          />
        )}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl 
            refreshing={refreshing} 
            onRefresh={onRefresh} 
            tintColor={Colors.primary} 
          />
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  searchSection: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 12,
    backgroundColor: Colors.background,
  },
  searchBarContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surface,
    height: 50,
    borderRadius: 15,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  searchIcon: {
    fontSize: 16,
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    color: Colors.text,
    fontSize: 14,
  },
  filterButton: {
    width: 50,
    height: 50,
    backgroundColor: Colors.primary,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
    elevation: 4,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  filterIcon: {
    fontSize: 20,
    color: '#000',
  },
  listContent: {
    padding: 15,
    paddingBottom: 100, // Extra space for tabBar
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: Colors.surface,
    padding: 25,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  modalTitle: {
    color: Colors.text,
    fontSize: 20,
    fontWeight: 'bold',
  },
  closeIcon: {
    color: Colors.textSecondary,
    fontSize: 24,
  },
  filterSectionLabel: {
    color: Colors.primary,
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 15,
    textTransform: 'uppercase',
  },
  filterTags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginBottom: 30,
  },
  filterTag: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Colors.border,
    backgroundColor: Colors.surfaceLight,
  },
  filterTagActive: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  filterTagText: {
    color: Colors.textSecondary,
    fontSize: 14,
  },
  filterTagTextActive: {
    color: '#000',
    fontWeight: 'bold',
  },
  applyBtn: {
    backgroundColor: Colors.primary,
    height: 55,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  applyBtnText: {
    color: '#000',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default RestaurantList;
