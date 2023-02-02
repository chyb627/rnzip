import React, { useCallback } from 'react';
import { StyleSheet, View } from 'react-native';
import { Header } from '../../components/UI/Header/Header';
import { useRootNavigation } from '../../navigation/ScrapWeb/RootNavigation';

export const AddLinkScreen = () => {
  const navigation = useRootNavigation();
  const onPressClose = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Header>
        <Header.Group>
          <Header.Title title="ADDLINK" />
        </Header.Group>

        <Header.Icon iconName="close" onPress={onPressClose} />
      </Header>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
