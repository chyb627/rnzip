import {
  NativeStackNavigationProp,
  createNativeStackNavigator,
} from '@react-navigation/native-stack';
import React from 'react';

import IntroScreen from '../../screens/LoveDog/IntroSceen';
import SignupNavigation, { TypeSignupNavigation } from './SignupNavigation';
import BottomTabNavigation from './BottomTabNavigation';
import HistoryListScreen from '../../screens/LoveDog/HistoryListScreen';
import {
  NavigatorScreenParams,
  RouteProp,
  useNavigation,
  useRoute,
} from '@react-navigation/native';

export type TypeRootStackNavigationParams = {
  Intro: undefined;
  Signup: NavigatorScreenParams<TypeSignupNavigation>;
  Main: undefined;
  HistoryList: undefined;
};

const Stack = createNativeStackNavigator<TypeRootStackNavigationParams>();

const RootStackNavigation = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Intro" component={IntroScreen} />
      <Stack.Screen name="Signup" component={SignupNavigation} />
      <Stack.Screen name="Main" component={BottomTabNavigation} />
      <Stack.Screen name="HistoryList" component={HistoryListScreen} />
    </Stack.Navigator>
  );
};

export default RootStackNavigation;

export const useRootStackNavigation = <RouteName extends keyof TypeRootStackNavigationParams>() =>
  useNavigation<NativeStackNavigationProp<TypeRootStackNavigationParams, RouteName>>();

export const useRootStackRoute = <RouteName extends keyof TypeRootStackNavigationParams>() =>
  useRoute<RouteProp<TypeRootStackNavigationParams, RouteName>>();
