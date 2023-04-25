import React, { useCallback } from 'react';
import { StyleSheet, Text, useWindowDimensions, View } from 'react-native';

import { useRootNavigation } from '../../navigation/InfinityScroll/RootNavigation';
import Button from '../ui/Button';
import RemoteImage from '../ui/RemoteImage';

interface PhotoListItemProps {
  url: string;
  author: string;
  width?: number;
}

const PhotoListItem: React.FC<PhotoListItemProps> = (props) => {
  const { width } = useWindowDimensions();
  const navigation = useRootNavigation();

  const onPressItem = useCallback(() => {
    navigation.navigate('Detail', { url: props.url, author: props.author });
  }, [navigation, props.author, props.url]);

  return (
    <Button onPress={onPressItem} paddingHorizontal={20} paddingVertical={10}>
      <RemoteImage
        url={props.url}
        width={props.width ? props.width : width - 40}
        height={width * 1.2}
      />
      <View style={styles.textContainer}>
        <Text style={styles.authorText}>{props.author}</Text>
      </View>
    </Button>
  );
};

export default PhotoListItem;

const styles = StyleSheet.create({
  textContainer: {
    position: 'absolute',
    bottom: 16,
    left: 36,
  },
  authorText: {
    color: 'white',
  },
});
