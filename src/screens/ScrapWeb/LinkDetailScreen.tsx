import React, { useCallback } from 'react';
import { StyleSheet, View } from 'react-native';
import { Header } from '../../components/UI/Header/Header';
import { Spacer } from '../../components/UI/Spacer';
import { useRootNavigation } from '../../navigation/ScrapWeb/RootNavigation';

export const LinkDetailScreen = () => {
  const navigation = useRootNavigation();

  const onPressBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Header>
        <Header.Group>
          <Header.Icon iconName="arrow-back" onPress={onPressBack} />

          <Spacer space={12} horizontal />

          <Header.Title title="LINK DETAIL" />
        </Header.Group>
      </Header>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
