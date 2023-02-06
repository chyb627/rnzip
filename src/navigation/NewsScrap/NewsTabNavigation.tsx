import {
  BottomTabNavigationProp,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import React from 'react';
import { TabIcon } from '../../components/UI/TabIcon';
import { FavoriteNewsListScreen } from '../../screens/NewsScrap/FavoriteNewsListScreen';
import { NewsListScreen } from '../../screens/NewsScrap/NewsListScreen';

export type TypeBottomTabsScreenParams = {
  NewsList: undefined;
  FavoriteNewsList: undefined;
};

const BottomTab = createBottomTabNavigator<TypeBottomTabsScreenParams>();

export const NewsTabNavigation = () => {
  return (
    <BottomTab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ color }) => {
          const getIconName = () => {
            if (route.name === 'FavoriteNewsList') {
              return 'star';
            }

            return 'home';
          };

          const iconName = getIconName();

          return <TabIcon iconName={iconName} iconColor={color} />;
        },
      })}>
      <BottomTab.Screen name="NewsList" component={NewsListScreen} />
      <BottomTab.Screen
        name="FavoriteNewsList"
        component={FavoriteNewsListScreen}
      />
    </BottomTab.Navigator>
  );
};

export const useBotomTabNavigation = <
  RouteName extends keyof TypeBottomTabsScreenParams,
>() =>
  useNavigation<
    BottomTabNavigationProp<TypeBottomTabsScreenParams, RouteName>
  >();

export const useBottomTabRoute = <
  RouteName extends keyof TypeBottomTabsScreenParams,
>() => useRoute<RouteProp<TypeBottomTabsScreenParams, RouteName>>();
