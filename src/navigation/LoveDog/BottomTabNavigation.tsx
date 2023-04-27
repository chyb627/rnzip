/* eslint-disable react/no-unstable-nested-components */
import { BottomTabNavigationProp, createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import MainScreen from '../../screens/LoveDog/MainScreen';
import MyScreen from '../../screens/LoveDog/MyScreen';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import TabIcon from '../../components/ui/TabIcon';

export type TypeBottomTabNavigation = {
  Main: undefined;
  My: undefined;
};

const BottomTab = createBottomTabNavigator<TypeBottomTabNavigation>();

const BottomTabNavigation = () => {
  return (
    <BottomTab.Navigator
      screenOptions={({ route }) => {
        const getIconName = (): string => {
          if (route.name === 'My') {
            return 'person';
          }
          return 'home';
        };

        const routeIconName = getIconName();
        return {
          headerShown: false,
          tabBarIcon: ({ color }) => {
            return <TabIcon visibleBadge={false} iconName={routeIconName} iconColor={color} />;
          },
        };
      }}>
      <BottomTab.Screen name="Main" component={MainScreen} />
      <BottomTab.Screen name="My" component={MyScreen} />
    </BottomTab.Navigator>
  );
};

export default BottomTabNavigation;

export const useBottomTabNavigation = <RouteName extends keyof TypeBottomTabNavigation>() =>
  useNavigation<BottomTabNavigationProp<TypeBottomTabNavigation, RouteName>>();

export const useBottomTabRoute = <RouteName extends keyof TypeBottomTabNavigation>() =>
  useRoute<RouteProp<TypeBottomTabNavigation, RouteName>>();
