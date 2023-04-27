import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Header } from '../../components/ui/Header/Header';
import Button from '../../components/ui/Button';
import Typography from '../../components/ui/Typography';
import { useRootStackNavigation } from '../../navigation/LoveDog/RootStackNavigation';

const MyScreen = () => {
  const rootNavigation = useRootStackNavigation<'Main'>();

  return (
    <View style={styles.container}>
      <Header>
        <Header.Title title="MyScreen" />
      </Header>

      <View style={styles.contentsContainer}>
        <Button
          onPress={() => {
            rootNavigation.push('HistoryList');
          }}>
          <Typography fontSize={16}>히스토리 화면으로 이동</Typography>
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentsContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default MyScreen;
