import {
  NavigatorScreenParams,
  RouteProp,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';
import React from 'react';
import { NewsDetailScreen } from '../../screens/NewsScrap/NewsDetailScreen';
import {
  NewsTabNavigation,
  TypeBottomTabsScreenParams,
} from './NewsTabNavigation';

type ScreenParams = {
  NewsTab: NavigatorScreenParams<TypeBottomTabsScreenParams>;
  NewsDetail: {
    newsItem: {
      description: string;
      link: string;
      originallink: string;
      pubDate: string;
      title: string;
    };
  };
};

const Stack = createNativeStackNavigator<ScreenParams>();

export const RootNavigation = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="NewsTab" component={NewsTabNavigation} />
      <Stack.Screen name="NewsDetail" component={NewsDetailScreen} />
    </Stack.Navigator>
  );
};

export const useRootNavigation = <RouteName extends keyof ScreenParams>() =>
  useNavigation<NativeStackNavigationProp<ScreenParams, RouteName>>();

export const useRootRoute = <RouteName extends keyof ScreenParams>() =>
  useRoute<RouteProp<ScreenParams, RouteName>>();
