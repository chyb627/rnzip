import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

import { RootStckParamList } from '../types/movieReminderType';
import MoviesScreen from './MovieReminder/MoviesScreen';
import Config from 'react-native-config';

const Stack = createNativeStackNavigator<RootStckParamList>();

const MovieReminder = () => {
  console.log('!!#!@$!@$', Config.MOVIE_API_KEY);
  return (
    <>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Movies" component={MoviesScreen} />
      </Stack.Navigator>
    </>
  );
};

export default MovieReminder;
