import React, { useCallback, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useSetRecoilState } from 'recoil';
import { useRootNavigation } from '../../navigation/ScrapWeb/RootNavigation';
import { atomLinkList } from '../../states/atomLinkList';
import { Header } from '../../components/ui/Header/Header';
import SingleLineInput from '../../components/ui/SingleLineInput';
import Button from '../../components/ui/Button';
import Typography from '../../components/ui/Typography';
import Spacer from '../../components/ui/Spacer';
import Icon from '../../components/ui/Icons';

const AddLinkScreen = () => {
  const navigation = useRootNavigation();
  const safeAreaInset = useSafeAreaInsets();
  const updateList = useSetRecoilState(atomLinkList);

  const [url, setUrl] = useState('');
  const hasUrlStyle = url === '' ? styles : hasUrl;

  const onPressClose = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const onPressSave = useCallback(() => {
    if (url === '') {
      return;
    }

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
  }, [updateList, url]);

  return (
    <View style={styles.container}>
      <Header>
        <Header.Group>
          <Header.Title title="ADDLINK" />
        </Header.Group>

        <Header.Icon iconName="close" onPress={onPressClose} />
      </Header>

      <View style={styles.addUrlContainer}>
        <View>
          <SingleLineInput
            value={url}
            onChangeText={setUrl}
            placeholder="https://example.com"
            onSubmitEditing={() => {}}
          />

          <View style={styles.closeIconButton}>
            <Button onPress={() => setUrl('')}>
              <Icon name="close" color="#000" size={20} />
            </Button>
          </View>
        </View>
      </View>

      <Button onPress={onPressSave}>
        <View style={hasUrlStyle.saveButtonContainer}>
          <View style={styles.subSaveButtonContainer}>
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
  addUrlContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    paddingTop: 32,
    paddingHorizontal: 24,
  },
  closeIconButton: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  saveButtonContainer: {
    backgroundColor: 'gray',
  },
  subSaveButtonContainer: {
    height: 52,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const hasUrl = {
  saveButtonContainer: [styles.saveButtonContainer, { backgroundColor: 'black' }],
};

export default AddLinkScreen;
