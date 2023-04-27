import {
  NativeStackNavigationProp,
  createNativeStackNavigator,
} from '@react-navigation/native-stack';
import React from 'react';
import InputEmailScreen from '../../screens/LoveDog/InputEmailScreen';
import InputNameScreen from '../../screens/LoveDog/InputNameScreen';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';

export type TypeSignupNavigation = {
  InputEmail: {
    uid: string;
    preInput: {
      email: string;
      name: string;
      profileImage: string;
    };
  };
  InputName: {
    uid: string;
    preInput: {
      email: string;
      name: string;
      profileImage: string;
    };
    inputEmail: string;
  };
};

const Stack = createNativeStackNavigator<TypeSignupNavigation>();

const SignupNavigation = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="InputEmail" component={InputEmailScreen} />
      <Stack.Screen name="InputName" component={InputNameScreen} />
    </Stack.Navigator>
  );
};

export default SignupNavigation;

export const useSignupNavigation = <RouteName extends keyof TypeSignupNavigation>() =>
  useNavigation<NativeStackNavigationProp<TypeSignupNavigation, RouteName>>();

export const useSignupRoute = <RouteName extends keyof TypeSignupNavigation>() =>
  useRoute<RouteProp<TypeSignupNavigation, RouteName>>();
