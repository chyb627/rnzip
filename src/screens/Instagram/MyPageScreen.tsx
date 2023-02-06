import React, { useEffect, useMemo } from 'react';
import { FlatList, useWindowDimensions, View } from 'react-native';
import { useDispatch } from 'react-redux';
import { getMyFeedList, TypeUserDispatch } from '../../actions/user';
import { Button } from '../../components/UI/Button';
import { Header } from '../../components/UI/Header/Header';
import { RemoteImage } from '../../components/UI/RemoteImage';
import { useRootNavigation } from '../../navigation/Instagram/RootStackNavigation';
import { useMyFeedList } from '../../selectors/user';
import { FeedInfo } from '../../types/FeedInfo';

export const MyPageScreen: React.FC = () => {
  const data = useMyFeedList();
  const rootNavigation = useRootNavigation();
  const { width } = useWindowDimensions();
  const dispatch = useDispatch<TypeUserDispatch>();

  const photoSize = useMemo(() => {
    return width / 3;
  }, []);

  useEffect(() => {
    dispatch(getMyFeedList());
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <Header>
        <Header.Title title="MY PAGE" />
      </Header>

      <FlatList<FeedInfo>
        data={data}
        numColumns={3}
        renderItem={({ item }) => {
          return (
            <Button
              onPress={() => {
                rootNavigation.navigate('FeedList', { list: data });
              }}>
              <RemoteImage
                url={item.imageUrl}
                width={photoSize}
                height={photoSize}
              />
            </Button>
          );
        }}
      />
    </View>
  );
};
