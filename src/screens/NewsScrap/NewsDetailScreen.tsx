import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useCallback } from 'react';
import { View } from 'react-native';
import WebView from 'react-native-webview';
import { useDispatch, useSelector } from 'react-redux';
import { clipNewsItem } from '../../actions/news';
import { Header } from '../../components/UI/Header/Header';
import { Spacer } from '../../components/UI/Spacer';

export const NewsDetailScreen = () => {
  const navigation = useNavigation();
  const routes = useRoute();
  const dispatch = useDispatch();

  const onPressBack = useCallback(() => {
    navigation.goBack();
  }, []);

  // console.log('routes.params:::', routes.params);

  const onPressFavorite = useCallback(() => {
    dispatch(clipNewsItem(routes.params.newsItem));
  }, []);

  const isClipped =
    useSelector((state) =>
      state.news.favoriteNews.filter(
        (item) => item.link === routes.params.newsItem.link,
      ),
    ).length > 0;

  return (
    <View style={{ flex: 1 }}>
      <Header>
        <Header.Group>
          <Header.Icon iconName="arrow-back" onPress={onPressBack} />

          <Spacer space={12} />

          <View style={{ maxWidth: 200 }}>
            <Header.Title title="NEWS_DETAIL" />
          </View>
        </Header.Group>

        <Header.Icon
          iconName={isClipped ? 'heart' : 'heart-outline'}
          onPress={onPressFavorite}
        />
      </Header>

      <WebView
        style={{ flex: 1 }}
        source={{ uri: routes.params.newsItem.link }}
      />
    </View>
  );
};
