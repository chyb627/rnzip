import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Header } from '../../components/ui/Header/Header';
import Button from '../../components/ui/Button';
import Typography from '../../components/ui/Typography';
import { useRootStackNavigation } from '../../navigation/LoveDog/RootStackNavigation';
import { useSignupNavigation } from '../../navigation/LoveDog/SignupNavigation';

const InputNameScreen = () => {
  const rootNavigation = useRootStackNavigation<'Signup'>();
  const navigation = useSignupNavigation<'InputName'>();

  return (
    <View style={styles.container}>
      <Header>
        <Header.Group>
          <Header.Title title="InputNameScreen" />
        </Header.Group>

        <Header.Icon iconName="arrow-back" onPress={navigation.goBack} />
      </Header>

      <View style={styles.contentsContainer}>
        <Button
          onPress={() => {
            rootNavigation.replace('Main');
          }}>
          <Typography fontSize={16}>회원가입 완료</Typography>
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

export default InputNameScreen;
