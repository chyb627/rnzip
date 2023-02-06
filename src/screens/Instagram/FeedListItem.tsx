import React from 'react';
import { useWindowDimensions, View } from 'react-native';
import { Button } from '../../components/UI/Button';
import { Icon } from '../../components/UI/Icons';
import { RemoteImage } from '../../components/UI/RemoteImage';
import { Spacer } from '../../components/UI/Spacer';
import { Typography } from '../../components/UI/Typography';

export const FeedListItem: React.FC<{
  image: string;
  isLiked: boolean;
  likeCount: number;
  writer: string;
  comment: string;
  onPressFeed: () => void;
}> = (props) => {
  const { width } = useWindowDimensions();

  return (
    <Button onPress={props.onPressFeed}>
      <View>
        <RemoteImage url={props.image} width={width} height={width} />

        <View style={{ paddingHorizontal: 12, paddingVertical: 6 }}>
          <Icon
            name={props.isLiked ? 'heart' : 'heart-outline'}
            size={20}
            color={props.isLiked ? 'red' : '#000'}
          />
        </View>

        <View style={{ paddingHorizontal: 12 }}>
          <Typography fontSize={16}>{`좋아요 ${props.likeCount}개`}</Typography>

          <Spacer space={4} />

          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Typography fontSize={16}>{props.writer}</Typography>

            <Spacer space={8} />

            <Typography fontSize={16}>{props.comment}</Typography>
          </View>
        </View>
      </View>
    </Button>
  );
};
