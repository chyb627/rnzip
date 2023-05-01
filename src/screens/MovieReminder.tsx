import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

import { RootStackParamList } from '../types/movieReminderType';
import MoviesScreen from './MovieReminder/MoviesScreen';
import MovieScreen from './MovieReminder/MovieScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

const MovieReminder = () => {
  return (
    <>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Movies" component={MoviesScreen} />
        <Stack.Screen name="Movie" component={MovieScreen} />
      </Stack.Navigator>
    </>
  );
};

export default MovieReminder;
