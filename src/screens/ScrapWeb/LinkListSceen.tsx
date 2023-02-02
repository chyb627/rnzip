import React, { useCallback } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button } from '../../components/UI/Button';
import { Header } from '../../components/UI/Header/Header';
import { Spacer } from '../../components/UI/Spacer';
import { Typography } from '../../components/UI/Typography';
import { useStackNavigation } from '../../navigation/ScrapWeb/LinkStackNavigation';
import { useRootNavigation } from '../../navigation/ScrapWeb/RootNavigation';

export const LinkListSceen = () => {
  const navigation = useRootNavigation();
  const stackNavigation = useStackNavigation();

  const onPressButton = useCallback(() => {
    stackNavigation.navigate('LinkDetail');
  }, [stackNavigation]);

  const onPressAddButton = useCallback(() => {
    navigation.navigate('AddLink');
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Header>
        <Header.Group>
          <Header.Title title="LINK LIST" />
        </Header.Group>
      </Header>

      <View style={styles.buttonContainer}>
        <Button onPress={onPressButton}>
          <Typography fontSize={24}>LINK DETAIL로 이동 하기</Typography>
        </Button>

        <Spacer space={24} />

        <Button onPress={onPressAddButton}>
          <Typography fontSize={24}>링크 등록하기로 이동하기</Typography>
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
  },
});
