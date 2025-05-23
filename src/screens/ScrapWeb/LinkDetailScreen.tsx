import React, { useCallback } from 'react';
import { StyleSheet, View } from 'react-native';
import WebView from 'react-native-webview';
import Spacer from '../../components/ui/Spacer';
import { Header } from '../../components/ui/Header/Header';
import { useStackRoute } from '../../navigation/ScrapWeb/LinkStackNavigation';
import { useRootNavigation } from '../../navigation/ScrapWeb/RootNavigation';

const LinkDetailScreen = () => {
  const routes = useStackRoute();
  const navigation = useRootNavigation();

  const onPressBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Header>
        <Header.Group>
          <Header.Icon iconName="arrow-back" onPress={onPressBack} />

          <Spacer space={12} horizontal />

          <Header.Title title="LINK DETAIL" />
        </Header.Group>
      </Header>
      {routes.params && (
        <WebView style={styles.webView} source={{ uri: routes.params.item.link }} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  webView: {
    flex: 1,
  },
});

export default LinkDetailScreen;
