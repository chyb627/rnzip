import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useCallback } from 'react';
import { View } from 'react-native';
import WebView from 'react-native-webview';
import { Header } from '../../components/UI/Header/Header';
import { Spacer } from '../../components/UI/Spacer';

export const NewsDetailScreen = () => {
  const navigation = useNavigation();
  const routes = useRoute();

  const onPressBack = useCallback(() => {
    navigation.goBack();
  }, []);

  // console.log('routes.params:::', routes.params);

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
      </Header>

      <WebView
        style={{ flex: 1 }}
        source={{ uri: routes.params.newsItem.link }}
      />
    </View>
  );
};
