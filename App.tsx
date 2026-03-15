import React, { useState } from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Platform,
} from 'react-native';

import HomeScreen from './src/screens/Home/HomeScreen';
import MenuScreen from './src/screens/Menu/MenuScreen';
import ReservationScreen from './src/screens/Reservation/ReservationScreen';
import RestaurantList from './src/screens/Restaurants/RestaurantList';
import AboutScreen from './src/screens/About/AboutScreen';
import NotificationScreen from './src/screens/Notification/NotificationScreen';

const App = () => {
  const [activeTab, setActiveTab] = useState('Home');

  return (
    <SafeAreaView style={styles.mainContainer}>
      <StatusBar barStyle="light-content" />
      
      {activeTab === 'Home' && <HomeScreen setActiveTab={setActiveTab} />}
      {activeTab === 'Menu' && <MenuScreen />}
      {activeTab === 'Reservation' && <ReservationScreen setActiveTab={setActiveTab} />}
      {activeTab === 'Restaurants' && <RestaurantList />}
      {activeTab === 'About' && <AboutScreen />}
      {activeTab === 'Alerts' && <NotificationScreen />}

      <View style={styles.tabBar}>
        <TouchableOpacity style={styles.tabItem} onPress={() => setActiveTab('Home')}>
          <Text style={[styles.tabText, activeTab === 'Home' && styles.tabTextActive]}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabItem} onPress={() => setActiveTab('Restaurants')}>
          <Text style={[styles.tabText, activeTab === 'Restaurants' && styles.tabTextActive]}>Explore</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabItem} onPress={() => setActiveTab('Menu')}>
          <Text style={[styles.tabText, activeTab === 'Menu' && styles.tabTextActive]}>Menu</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabItem} onPress={() => setActiveTab('Reservation')}>
          <Text style={[styles.tabText, activeTab === 'Reservation' && styles.tabTextActive]}>Book</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabItem} onPress={() => setActiveTab('Alerts')}>
          <Text style={[styles.tabText, activeTab === 'Alerts' && styles.tabTextActive]}>Alerts</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabItem} onPress={() => setActiveTab('About')}>
          <Text style={[styles.tabText, activeTab === 'About' && styles.tabTextActive]}>About</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#000',
  },
  tabBar: {
    flexDirection: 'row',
    height: 60,
    backgroundColor: '#111',
    borderTopWidth: 1,
    borderTopColor: '#222',
    paddingBottom: Platform.OS === 'ios' ? 20 : 0,
  },
  tabItem: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabText: {
    color: '#666',
    fontSize: 12,
    fontWeight: '500',
  },
  tabTextActive: {
    color: '#C9A07D',
    fontWeight: 'bold',
  },
});

export default App;
