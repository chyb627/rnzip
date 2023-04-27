import React, { useCallback, useMemo, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Header } from '../../components/ui/Header/Header';
import Button from '../../components/ui/Button';
import { useSignupNavigation, useSignupRoute } from '../../navigation/LoveDog/SignupNavigation';
import Typography from '../../components/ui/Typography';
import Spacer from '../../components/ui/Spacer';
import SingleLineInput from '../../components/ui/SingleLineInput';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import EmailValidator from 'email-validator';

const InputEmailScreen = () => {
  const navigation = useSignupNavigation<'InputEmail'>();
  const routes = useSignupRoute<'InputEmail'>();
  const safeArea = useSafeAreaInsets();

  const [inputEmail, setInputEmail] = useState<string>(routes.params.preInput.email);

  const isValid = useMemo(() => {
    if (inputEmail.length === 0) {
      return false;
    }

    return EmailValidator.validate(inputEmail);
  }, [inputEmail]);
  const validStyle = isValid ? styles : notValidStyle;

  const onPressSubmit = useCallback(() => {
    if (!isValid) {
      return;
    }

    navigation.push('InputName', {
      preInput: routes.params.preInput,
      uid: routes.params.uid,
      inputEmail: inputEmail,
    });
  }, [inputEmail, isValid, navigation, routes.params.preInput, routes.params.uid]);

  return (
    <View style={styles.container}>
      <Header>
        <Header.Group>
          <Header.Title title="InputEmailScreen" />
        </Header.Group>

        <Header.Icon iconName="close" onPress={navigation.goBack} />
      </Header>

      <View style={styles.contentsContainer}>
        <SingleLineInput
          value={inputEmail}
          onChangeText={setInputEmail}
          placeholder="Email을 입력해 주세요"
          onSubmitEditing={onPressSubmit}
          keyboardType="email-address"
        />
      </View>

      <Button onPress={onPressSubmit}>
        <View style={validStyle.nextButtonContainer}>
          <Spacer space={16} />

          <View style={styles.nextTextContainer}>
            <Typography fontSize={20} color="white">
              다음
            </Typography>
          </View>

          <Spacer space={safeArea.bottom + 12} />
        </View>
      </Button>
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
    paddingHorizontal: 24,
  },
  nextButtonContainer: {
    backgroundColor: 'black',
  },
  nextTextContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const notValidStyle = {
  nextButtonContainer: [styles.nextButtonContainer, { backgroundColor: 'lightgray' as const }],
};

export default InputEmailScreen;
