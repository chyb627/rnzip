import React from 'react';
import { View } from 'react-native';
import { Header } from '../../components/UI/Header/Header';

export const NewsListScreen = () => {
  return (
    <View>
      <Header>
        <Header.Title title="NEWS_LIST" />
      </Header>
    </View>
  );
};
