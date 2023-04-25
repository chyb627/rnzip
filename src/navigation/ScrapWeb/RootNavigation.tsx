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
import LinkStackNavigation, { TypeStackScreenParams } from './LinkStackNavigation';
import AddLinkScreen from '../../screens/ScrapWeb/AddLinkScreen';

type ScreenParams = {
  LinkStack: NavigatorScreenParams<TypeStackScreenParams>;
  AddLink: undefined;
};

const Stack = createNativeStackNavigator<ScreenParams>();

const RootNavigation: React.FC = () => {
  return (
    <Stack.Navigator
      initialRouteName="LinkStack"
      screenOptions={{
        presentation: 'containedModal',
        headerShown: false,
      }}>
      <Stack.Screen name="LinkStack" component={LinkStackNavigation} />
      <Stack.Screen name="AddLink" component={AddLinkScreen} />
    </Stack.Navigator>
  );
};

export const useRootNavigation = <RouteName extends keyof ScreenParams>() =>
  useNavigation<NativeStackNavigationProp<ScreenParams, RouteName>>();

export const useRootRoute = <RouteName extends keyof ScreenParams>() =>
  useRoute<RouteProp<ScreenParams, RouteName>>();

export default RootNavigation;
