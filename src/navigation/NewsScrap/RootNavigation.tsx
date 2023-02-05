import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { NewsDetailScreen } from '../../screens/NewsScrap/NewsDetailScreen';
import { NewsTabNavigation } from './NewsTabNavigation';

const Stack = createNativeStackNavigator();

export const RootNavigation = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="NewsTab" component={NewsTabNavigation} />
      <Stack.Screen name="NewsDetail" component={NewsDetailScreen} />
    </Stack.Navigator>
  );
};
