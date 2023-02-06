import React, { useCallback, useState } from 'react';
import { FlatList, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { getNewsList } from '../../actions/news';
import { Button } from '../../components/UI/Button';
import { Header } from '../../components/UI/Header/Header';
import { SingleLineInput } from '../../components/UI/SingleLineInput';
import { Typography } from '../../components/UI/Typography';
import { useRootNavigation } from '../../navigation/NewsScrap/RootNavigation';
import { RootState } from '../../store/store';

export const NewsListScreen = () => {
  const dispatch = useDispatch();
  const navigation = useRootNavigation();
  const [query, setQuery] = useState('');

  const onSubmitEditing = useCallback(() => {
    if (query === '') {
      return;
    }

    dispatch(getNewsList(query));
  }, [query]);

  const newsList = useSelector((state) => state.news.newsList);

  const onPressListItem = useCallback((newsItem) => {
    navigation.navigate('NewsDetail', { newsItem });
  });

  return (
    <View style={{ flex: 1 }}>
      <Header>
        <Header.Title title="NEWS_LIST" />
      </Header>

      <View style={{ flex: 1 }}>
        <View style={{ paddingHorizontal: 24, paddingVertical: 12 }}>
          <SingleLineInput
            value={query}
            onChangeText={setQuery}
            placeholder="뉴스 검색어를 입력해 주세요"
            onSubmitEditing={onSubmitEditing}
          />
        </View>

        <FlatList
          style={{ flex: 1 }}
          data={newsList}
          renderItem={({ item }) => {
            return (
              <Button onPress={() => onPressListItem(item)}>
                <View
                  style={{
                    flex: 1,
                    paddingHorizontal: 20,
                    paddingVertical: 8,
                  }}>
                  <Typography fontSize={24} numberOfLines={1}>
                    {item.title}
                  </Typography>
                  <Typography fontSize={16} numberOfLines={2} color="gray">
                    {item.description}
                  </Typography>
                </View>
              </Button>
            );
          }}
        />
      </View>
    </View>
  );
};
