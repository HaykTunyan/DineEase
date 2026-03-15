import React from 'react';
import { AppNavigator } from './src/navigation/AppNavigator';
import { CartProvider } from './src/context/CartContext';

/**
 * Entry point of the DineEase application.
 * We've migrated from manual state-based navigation to React Navigation
 * using the AppNavigator for better performance, deep linking support, 
 * and standard mobile navigation patterns.
 */
const App = () => {
  return (
    <CartProvider>
      <AppNavigator />
    </CartProvider>
  );
};

export default App;
