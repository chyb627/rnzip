import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Header } from '../../components/ui/Header/Header';
import { useRootStackNavigation } from '../../navigation/LoveDog/RootStackNavigation';

const HistoryListScreen = () => {
  const rootNavigation = useRootStackNavigation<'HistoryList'>();

  return (
    <View style={styles.container}>
      <Header>
        <Header.Title title="HistoryListScreen" />
        <Header.Icon iconName="close" onPress={rootNavigation.goBack} />
      </Header>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default HistoryListScreen;
