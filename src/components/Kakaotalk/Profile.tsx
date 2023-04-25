import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Spacer from '../ui/Spacer';
import RemoteImage from '../ui/RemoteImage';

const Profile: React.FC<{
  uri: string;
  name: string;
  introduction: string;
  isMe: boolean;
}> = (props) => {
  const size = props.isMe ? 50 : 40;
  const isMeStyle = props.isMe ? isMeStyles : styles;

  return (
    <View style={styles.container}>
      <RemoteImage
        style={{ borderRadius: size * 0.4 }}
        url={props.uri}
        width={size}
        height={size}
      />

      <View style={styles.itemContaier}>
        <Text style={isMeStyle.nameText}>{props.name}</Text>

        {!!props.introduction && (
          <View>
            <Spacer space={props.isMe ? 6 : 2} />
            <Text style={isMeStyle.introText}>{props.introduction}</Text>
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  itemContaier: {
    justifyContent: 'center',
    marginLeft: 10,
  },
  nameText: {
    fontWeight: 'normal',
    fontSize: 15,
  },
  introText: {
    fontSize: 11,
    color: 'grey',
  },
});

const isMeStyles = {
  nameText: [styles.nameText, { fontWeight: 'bold' as const, fontSize: 16 }],
  introText: [styles.introText, { fontSize: 12 }],
};

export default Profile;
