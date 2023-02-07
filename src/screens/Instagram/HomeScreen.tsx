import React, { useCallback, useEffect } from 'react';
import { FlatList, View } from 'react-native';
import { useDispatch } from 'react-redux';
import { favoriteFeed, getFeedList, TypeFeedListDispatch } from '../../actions/feed';
import { Header } from '../../components/UI/Header/Header';
import { Spacer } from '../../components/UI/Spacer';
import { useRootNavigation } from '../../navigation/Instagram/RootStackNavigation';
import { useTotalFeedList } from '../../selectors/feed';
import { FeedListItem } from './FeedListItem';

export const HomeScreen: React.FC = () => {
  const feedList = useTotalFeedList();
  const dispatch = useDispatch<TypeFeedListDispatch>();
  const rootNavigation = useRootNavigation();

  const onPressHome = useCallback(() => {
    rootNavigation.navigate('AddFeed');
  }, []);

  useEffect(() => {
    dispatch(getFeedList());
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <Header>
        <Header.Title title="HOME" />
        <Header.Icon iconName="add" onPress={onPressHome} />
      </Header>

      <FlatList
        data={feedList}
        renderItem={({ item }) => {
          console.log(item);

          return (
            <FeedListItem
              image={item.imageUrl}
              comment={item.content}
              isLiked={false}
              likeCount={item.likeHistory.length}
              writer={item.writer.name}
              createdAt={item.createdAt}
              onPressFeed={() => {
                console.log('onPressFeed');
              }}
              onPressFavorite={() => {
                console.log('onPressFavrite');
                dispatch(favoriteFeed(item));
              }}
            />
          );
        }}
        ItemSeparatorComponent={() => <Spacer space={24} />}
      />
    </View>
  );
};
