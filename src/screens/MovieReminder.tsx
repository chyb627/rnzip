import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

import { RootStckParamList } from '../types/movieReminderType';
import MoviesScreen from './MovieReminder/MoviesScreen';

const Stack = createNativeStackNavigator<RootStckParamList>();

const MovieReminder = () => {
  return (
    <>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Movies" component={MoviesScreen} />
      </Stack.Navigator>
    </>
  );
};

export default MovieReminder;
