import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import { TabIcon } from '../../components/UI/TabIcon';
import { HomeScreen } from '../../screens/Instagram/HomeScreen';
import { MyPageScreen } from '../../screens/Instagram/MyPageScreen';

export type BottomTabParamList = {
  Home: undefined;
  MyPage: undefined;
};

const BottomTab = createBottomTabNavigator<BottomTabParamList>();

export const BottomTabNavigation = () => {
  return (
    <BottomTab.Navigator
      screenOptions={({ route }) => {
        const getIconName = (): IconName => {
          if (route.name === 'MyPage') {
            return 'person';
          }

          return 'home';
        };

        const routeIconName = getIconName();

        return {
          headerShown: false,
          tabBarIcon: ({ color }) => {
            return (
              <TabIcon
                visibleBadge={false}
                iconName={routeIconName}
                iconColor={color}
              />
            );
          },
        };
      }}>
      <BottomTab.Screen name="Home" component={HomeScreen} />
      <BottomTab.Screen name="MyPage" component={MyPageScreen} />
    </BottomTab.Navigator>
  );
};
