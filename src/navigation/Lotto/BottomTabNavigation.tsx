import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import { TabIcon } from '../../components/UI/TabIcon';
import { HistoryListScreen } from '../../screens/Lotto/HistoryListScreen';
import { HomeScreen } from '../../screens/Lotto/HomeScreen';

const Tab = createBottomTabNavigator();

export const BottomTabNavigation = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => {
        return {
          headerShown: false,
          tabBarIcon: ({ color }) => {
            const getIconName = () => {
              if (route.name === 'History') {
                return 'time';
              }
              return 'home';
            };
            const iconName = getIconName();

            return <TabIcon iconName={iconName} iconColor={color} />;
          },
        };
      }}>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="History" component={HistoryListScreen} />
    </Tab.Navigator>
  );
};
