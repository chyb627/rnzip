import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';
import React from 'react';
import { LinkDetailScreen } from '../../screens/ScrapWeb/LinkDetailScreen';
import { LinkListSceen } from '../../screens/ScrapWeb/LinkListSceen';

export type TypeStackScreenParams = {
  LinkList: undefined;
  LinkDetail: undefined;
};

const Stack = createNativeStackNavigator<TypeStackScreenParams>();

export const LinkStackNavigation = () => {
  return (
    <Stack.Navigator
      initialRouteName="LinkList"
      screenOptions={{
        presentation: 'card',
        headerShown: false,
      }}>
      <Stack.Screen name="LinkList" component={LinkListSceen} />
      <Stack.Screen name="LinkDetail" component={LinkDetailScreen} />
    </Stack.Navigator>
  );
};

export const useStackNavigation = <
  RouteName extends keyof TypeStackScreenParams,
>() =>
  useNavigation<NativeStackNavigationProp<TypeStackScreenParams, RouteName>>();

export const useStackRoute = <
  RouteName extends keyof TypeStackScreenParams,
>() => useRoute<RouteProp<TypeStackScreenParams, RouteName>>();
