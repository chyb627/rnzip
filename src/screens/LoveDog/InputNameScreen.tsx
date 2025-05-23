import React, { useCallback, useMemo, useRef, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import ImageCropPicker from 'react-native-image-crop-picker';

import { Header } from '../../components/ui/Header/Header';
import Button from '../../components/ui/Button';
import Typography from '../../components/ui/Typography';
import { useRootStackNavigation } from '../../navigation/LoveDog/RootStackNavigation';
import { useSignupNavigation, useSignupRoute } from '../../navigation/LoveDog/SignupNavigation';
import SingleLineInput from '../../components/ui/SingleLineInput';
import Spacer from '../../components/ui/Spacer';
import RemoteImage from '../../components/ui/RemoteImage';
import Icon from '../../components/ui/Icons';
import ActionSheet from 'react-native-actionsheet';

const InputNameScreen = () => {
  const rootNavigation = useRootStackNavigation<'Signup'>();
  const navigation = useSignupNavigation<'InputName'>();
  const routes = useSignupRoute<'InputName'>();
  const safeArea = useSafeAreaInsets();
  const actionSheetRef = useRef<ActionSheet>(null);

  const [selectedPhoto, setSelectedPhoto] = useState<{ uri: string } | null>(null);
  const [profileImage] = useState(routes.params.preInput.profileImage);
  const [inputName, setInputName] = useState<string>(routes.params.preInput.name);
  const isValid = useMemo(() => {
    return true;
  }, []);
  const validStyle = isValid ? styles : notValidStyle;

  const onPressSubmit = useCallback(() => {
    rootNavigation.replace('Main');
  }, [rootNavigation]);

  const onPressProfileImage = useCallback(async () => {
    actionSheetRef.current?.show();
  }, []);

  return (
    <View style={styles.container}>
      <Header>
        <Header.Group>
          <Header.Title title="InputNameScreen" />
        </Header.Group>

        <Header.Icon iconName="arrow-back" onPress={navigation.goBack} />
      </Header>

      <View style={styles.contentsContainer}>
        <Button onPress={onPressProfileImage}>
          <View style={styles.profileContainer}>
            {profileImage !== '' ? (
              <>
                <RemoteImage
                  width={100}
                  height={100}
                  url={selectedPhoto !== null ? selectedPhoto.uri : profileImage}
                  style={styles.remoteImage}
                />

                <View style={styles.smallIconContainer}>
                  <View style={styles.subSmallIconContainer}>
                    <Icon name="add" size={16} color="white" />
                  </View>
                </View>
              </>
            ) : (
              <View style={styles.largeIconContainer}>
                <Icon name="add" size={32} color="black" />
              </View>
            )}
          </View>
        </Button>

        <Spacer space={24} />

        <SingleLineInput
          value={inputName}
          onChangeText={setInputName}
          placeholder="이름을 입력해 주세요"
          onSubmitEditing={onPressSubmit}
        />
      </View>

      <Button onPress={onPressSubmit}>
        <View style={validStyle.nextButtonContainer}>
          <Spacer space={16} />

          <View style={styles.nextTextContainer}>
            <Typography fontSize={20} color="white">
              회원가입
            </Typography>
          </View>

          <Spacer space={safeArea.bottom + 12} />
        </View>
      </Button>

      <ActionSheet
        ref={actionSheetRef}
        options={['사진 촬영하여 선택', '갤러리에서 선택', '취소']}
        cancelButtonIndex={2}
        onPress={async (index) => {
          if (index === 0) {
            console.log('사진 촬영하여 선택');
          }
          if (index === 1) {
            const photoResult = await ImageCropPicker.openPicker({
              width: 300,
              height: 300,
              cropping: true,
            });
            setSelectedPhoto({ uri: photoResult.path });
          }
        }}
      />
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
  nextButtonContainer: {
    backgroundColor: 'black',
  },
  nextTextContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileContainer: {
    width: 100,
    height: 100,
  },
  remoteImage: {
    borderRadius: 50,
  },
  smallIconContainer: {
    position: 'absolute',
    right: 0,
    bottom: 0,
  },
  subSmallIconContainer: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: 'gray',
    alignItems: 'center',
    justifyContent: 'center',
  },
  largeIconContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: 'gray',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const notValidStyle = {
  nextButtonContainer: [styles.nextButtonContainer, { backgroundColor: 'lightgray' as const }],
};

export default InputNameScreen;
