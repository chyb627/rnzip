import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Header } from '../../components/ui/Header/Header';
import Button from '../../components/ui/Button';
import Typography from '../../components/ui/Typography';
import { useRootStackNavigation } from '../../navigation/LoveDog/RootStackNavigation';

const IntroScreen = () => {
  const rootNavigation = useRootStackNavigation<'Intro'>();

  return (
    <View style={styles.container}>
      <Header>
        <Header.Title title="IntroScreen" />
      </Header>

      <View style={styles.contentsContainer}>
        <Button
          onPress={() => {
            rootNavigation.push('Signup', {
              screen: 'InputEmail',
              params: {
                uid: '',
                preInput: {
                  email: 'test@test.com',
                  name: 'test',
                  profileImage: '',
                },
              },
            });
          }}>
          <Typography fontSize={16}>회원가입 화면으로 이동하기</Typography>
        </Button>

        <Button
          onPress={() => {
            rootNavigation.replace('Main');
          }}>
          <Typography fontSize={16}>메인 화면으로 이동하기</Typography>
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

export default IntroScreen;
