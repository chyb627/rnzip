import React, { useCallback } from 'react';
import { StyleSheet, View } from 'react-native';
import { Header } from '../../components/ui/Header/Header';
import { useRootStackNavigation } from '../../navigation/LoveDog/RootStackNavigation';
import { GoogleSignin, GoogleSigninButton } from '@react-native-google-signin/google-signin';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import auth from '@react-native-firebase/auth';

const IntroScreen = () => {
  const rootNavigation = useRootStackNavigation<'Intro'>();
  const safeArea = useSafeAreaInsets();
  const onPressGoogleSignin = useCallback(async () => {
    try {
      const inSignIn = await GoogleSignin.isSignedIn();

      if (inSignIn) {
        await GoogleSignin.signOut();
      }

      const result = await GoogleSignin.signIn({});
      const googleCredential = auth.GoogleAuthProvider.credential(result.idToken);
      const authResult = await auth().signInWithCredential(googleCredential);

      rootNavigation.push('Signup', {
        screen: 'InputEmail',
        params: {
          preInput: {
            email: result.user.email,
            name: result.user.name ?? 'Unknown',
            profileImage: result.user.photo ?? '',
          },
          uid: authResult.user.uid,
        },
      });
    } catch (error) {
      console.log(error);
    }
  }, [rootNavigation]);

  return (
    <View style={styles.container}>
      <Header>
        <Header.Title title="IntroScreen" />
      </Header>

      <View style={[styles.contentsContainer, { paddingBottom: 32 + safeArea.bottom }]}>
        <GoogleSigninButton onPress={onPressGoogleSignin} />
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
    justifyContent: 'flex-end',
  },
});

export default IntroScreen;
