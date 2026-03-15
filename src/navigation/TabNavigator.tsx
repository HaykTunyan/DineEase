import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MainTabParamList } from './types';
import { Colors } from '@theme/colors';

// Importing screens
import HomeScreen from '../screens/Home/HomeScreen';
import MenuScreen from '../screens/Menu/MenuScreen';
import RestaurantList from '../screens/Restaurants/RestaurantList';
import NotificationScreen from '../screens/Notification/NotificationScreen';
import ReservationScreen from '../screens/Reservation/ReservationScreen';

const Tab = createBottomTabNavigator<MainTabParamList>();

const TabIcon = ({ name, color, focused }: { name: string, color: string, focused: boolean }) => {
  const icons: any = {
    Home: '🏠',
    Menu: '🍽️',
    Restaurants: '🏪',
    Notification: '🔔',
    Reservation: '📅',
  };

  return (
    <View style={styles.tabIconContainer}>
      <Text style={[styles.tabIcon, { color }]}>{icons[name] || '•'}</Text>
      {focused && <View style={styles.activeIndicator} />}
    </View>
  );
};

export const MainTabNavigator = () => {
  return (
    <Tab.Navigator 
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ color, focused }) => <TabIcon name={route.name} color={color} focused={focused} />,
        tabBarActiveTintColor: Colors.primary,
        tabBarInactiveTintColor: Colors.textMuted,
        tabBarStyle: styles.tabBar,
        tabBarLabelStyle: styles.tabBarLabel,
        tabBarItemStyle: styles.tabBarItem,
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Restaurants" component={RestaurantList} />
      <Tab.Screen name="Menu" component={MenuScreen} />
      <Tab.Screen name="Reservation" component={ReservationScreen} />
      <Tab.Screen name="Notification" component={NotificationScreen} />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: Colors.surface,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
    height: 70,
    position: 'absolute',
    bottom: 25,
    marginHorizontal: 20,
    borderRadius: 25,
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    paddingBottom: 10,
    paddingTop: 10,
  },
  tabBarLabel: {
    fontSize: 10,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  tabBarItem: {
    paddingVertical: 5,
  },
  tabIconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 30,
  },
  tabIcon: {
    fontSize: 20,
  },
  activeIndicator: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: Colors.primary,
    marginTop: 4,
  }
});
