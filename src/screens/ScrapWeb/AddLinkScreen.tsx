import React, { useCallback, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useSetRecoilState } from 'recoil';
import { Button } from '../../components/UI/Button';
import { Header } from '../../components/UI/Header/Header';
import { Icon } from '../../components/UI/Icons';
import { SingleLineInput } from '../../components/UI/SingleLineInput';
import { Spacer } from '../../components/UI/Spacer';
import { Typography } from '../../components/UI/Typography';
import { useRootNavigation } from '../../navigation/ScrapWeb/RootNavigation';
import { atomLinkList } from '../../states/atomLinkList';

export const AddLinkScreen = () => {
  const navigation = useRootNavigation();
  const safeAreaInset = useSafeAreaInsets();
  const updateList = useSetRecoilState(atomLinkList);

  const [url, setUrl] = useState('');

  const onPressClose = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const onPressSave = useCallback(() => {
    if (url === '') return;

    updateList((prevState) => {
      const list = [
        {
          title: '',
          image: '',
          link: url,
          createdAt: new Date().toISOString(),
        },
      ];

      return {
        list: list.concat(prevState.list),
      };
    });

    setUrl('');
  }, [url]);

  return (
    <View style={styles.container}>
      <Header>
        <Header.Group>
          <Header.Title title="ADDLINK" />
        </Header.Group>

        <Header.Icon iconName="close" onPress={onPressClose} />
      </Header>

      <View
        style={{
          flex: 1,
          justifyContent: 'flex-start',
          paddingTop: 32,
          paddingHorizontal: 24,
        }}>
        <View>
          <SingleLineInput
            value={url}
            onChangeText={setUrl}
            placeholder="https://example.com"
            onSubmitEditing={() => {}}
          />

          <View
            style={{
              position: 'absolute',
              top: 0,
              bottom: 0,
              right: 0,
              borderWidth: 1,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Button onPress={() => setUrl('')}>
              <Icon name="close" color="#000" size={20} />
            </Button>
          </View>
        </View>
      </View>

      <Button onPress={onPressSave}>
        <View style={{ backgroundColor: url === '' ? 'gray' : 'black' }}>
          <View
            style={{
              height: 52,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Typography fontSize={20} color="#fff">
              저장하기
            </Typography>
          </View>

          <Spacer space={safeAreaInset.bottom} />
        </View>
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
