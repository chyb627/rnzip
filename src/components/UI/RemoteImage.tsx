import React from 'react';
import { Image as RNImage, StyleProp, ImageStyle } from 'react-native';

const RemoteImage: React.FC<{
  url: string;
  width: number;
  height: number;
  style?: StyleProp<ImageStyle>;
}> = (props) => (
  <RNImage
    source={{ uri: props.url }}
    style={[props.style, { width: props.width, height: props.height }]}
  />
);

export default RemoteImage;
