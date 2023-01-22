/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { Text, View } from 'react-native';
import { Margin } from '../UI/Margin';
import { RemoteImage } from '../UI/RemoteImage';

export const Profile: React.FC<{
  uri: string;
  name: string;
  introduction: string;
  isMe: boolean;
}> = (props) => {
  const size = props.isMe ? 50 : 40;

  return (
    <View style={{ flexDirection: 'row' }}>
      <RemoteImage
        style={{ borderRadius: size * 0.4 }}
        url={props.uri}
        width={size}
        height={size}
      />

      <View style={{ justifyContent: 'center', marginLeft: 10 }}>
        <Text
          style={{ fontWeight: props.isMe ? 'bold' : undefined, fontSize: props.isMe ? 16 : 15 }}>
          {props.name}
        </Text>

        {!!props.introduction && (
          <View>
            <Margin height={props.isMe ? 6 : 2} />
            <Text style={{ fontSize: props.isMe ? 12 : 11, color: 'grey' }}>
              {props.introduction}
            </Text>
          </View>
        )}
      </View>
    </View>
  );
};
