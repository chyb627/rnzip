import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Header } from '../../components/ui/Header/Header';
import Button from '../../components/ui/Button';
import { useSignupNavigation, useSignupRoute } from '../../navigation/LoveDog/SignupNavigation';
import Typography from '../../components/ui/Typography';

const InputEmailScreen = () => {
  const navigation = useSignupNavigation<'InputEmail'>();
  const routes = useSignupRoute<'InputEmail'>();

  return (
    <View style={styles.container}>
      <Header>
        <Header.Group>
          <Header.Title title="InputEmailScreen" />
        </Header.Group>

        <Header.Icon iconName="close" onPress={navigation.goBack} />
      </Header>

      <View style={styles.contentsContainer}>
        <Button
          onPress={() => {
            navigation.push('InputName', {
              uid: '',
              preInput: routes.params.preInput,
              inputEmail: '',
            });
          }}>
          <Typography fontSize={16}>회원가입 화면으로 이동하기</Typography>
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

export default InputEmailScreen;
