import React from 'react';
import { View } from 'react-native';
import { Header } from '../../components/ui/Header/Header';

const MainScreen = () => {
  return (
    <View>
      <Header>
        <Header.Title title="MainScreen" />
      </Header>
    </View>
  );
};

export default MainScreen;
