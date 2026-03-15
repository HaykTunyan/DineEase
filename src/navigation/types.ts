import { NavigatorScreenParams } from '@react-navigation/native';

export type RootStackParamList = {
  MainTabs: NavigatorScreenParams<MainTabParamList>;
  About: undefined;
  // Make sure to add other stack screens here like Authentication screens, Settings, Modal screens etc.
};

export type MainTabParamList = {
  Home: undefined;
  Menu: { restaurantId?: string } | undefined;
  Restaurants: undefined;
  Reservation: undefined;
  Notification: undefined;
};
