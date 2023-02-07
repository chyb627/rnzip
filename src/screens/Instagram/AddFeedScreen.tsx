import React, { useCallback, useMemo, useState } from 'react';
import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';

import { Button } from '../../components/UI/Button';
import { Header } from '../../components/UI/Header/Header';
import { Icon } from '../../components/UI/Icons';
import { MultiLineInput } from '../../components/UI/MultiLineInput';
import { RemoteImage } from '../../components/UI/RemoteImage';
import { Spacer } from '../../components/UI/Spacer';
import { Typography } from '../../components/UI/Typography';
import { useRootNavigation } from '../../navigation/Instagram/RootStackNavigation';
import { useDispatch } from 'react-redux';
import { createFeed, TypeFeedListDispatch } from '../../actions/feed';

export const AddFeedScreen: React.FC = () => {
  const rootNavigation = useRootNavigation();
  const SafeAreaInsets = useSafeAreaInsets();
  const dispatch = useDispatch<TypeFeedListDispatch>();

  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);
  const [inputMessage, setInputMessage] = useState('');

  const canSave = useMemo(() => {
    if (selectedPhoto === null) return false;

    if (inputMessage === '') return false;

    return true;
  }, [selectedPhoto, inputMessage]);

  const onPressBack = useCallback(() => {
    rootNavigation.goBack();
  }, []);

  const onPressGetPhoto = useCallback(async () => {
    console.log('onPressGetPhoto');
    const result = await launchImageLibrary({
      mediaType: 'photo',
      quality: 1,
    });

    if (result.didCancel) {
      return;
    }

    setSelectedPhoto(result.assets[0].uri);
  }, []);

  const onPressSave = useCallback(async () => {
    if (!canSave) return;

    if (selectedPhoto === null) return;

    await dispatch(
      createFeed({
        imageUrl: selectedPhoto,
        content: inputMessage,
      }),
    );
  }, [canSave, selectedPhoto, inputMessage]);

  return (
    <View style={{ flex: 1 }}>
      <Header>
        <Header.Title title="ADD FEED" />
        <Header.Icon iconName="close" onPress={onPressBack} />
      </Header>

      <View
        style={{
          flex: 1,
          flexDirection: 'column',
          paddingHorizontal: 20,
          paddingTop: 32,
        }}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Button onPress={onPressGetPhoto}>
            {selectedPhoto !== null ? (
              <RemoteImage
                url={selectedPhoto}
                width={100}
                height={100}
                style={{ borderRadius: 4 }}
              />
            ) : (
              <View
                style={{
                  width: 100,
                  height: 100,
                  backgroundColor: 'lightgray',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 4,
                }}>
                <Icon name="add" color="gray" size={32} />
              </View>
            )}
          </Button>

          <View style={{ flex: 1, marginLeft: 8 }}>
            <MultiLineInput
              value={inputMessage}
              onChangeText={setInputMessage}
              onSubmitEditing={onPressSave}
              placeholder="입력해주세요"
              height={80}
              fontSize={16}
            />
          </View>
        </View>
      </View>

      <Button onPress={onPressSave}>
        <View style={{ backgroundColor: canSave ? 'black' : 'lightgray' }}>
          <View
            style={{
              height: 52,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Typography fontSize={18} color={canSave ? '#fff' : 'gray'}>
              저장하기
            </Typography>
          </View>

          <Spacer space={SafeAreaInsets.bottom} />
        </View>
      </Button>
    </View>
  );
};
