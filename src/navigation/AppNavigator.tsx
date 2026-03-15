import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from './types';

import { MainTabNavigator } from './TabNavigator';
import AboutScreen from '../screens/About/AboutScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

/**
 * The Root App Navigator wrapper.
 * This is the central piece of navigation for your entire app!
 * Stacks allow you to push screens on top of each other (like opening a Details screen from the Home screen).
 */
export const AppNavigator = () => {
  return (
    <NavigationContainer>
      {/* 
        We use a Stack Navigator at the root because it allows us to show Modal screens,
        Authentication screens, and Push standard screens over the MainTabNavigator.
      */}
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {/* The Tabs handles primary bottom navigation, nested inside the stack as the initial route */}
        <Stack.Screen name="MainTabs" component={MainTabNavigator} />
        
        {/* We can define global stack screens here that don't have bottom tabs */}
        <Stack.Screen name="About" component={AboutScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
