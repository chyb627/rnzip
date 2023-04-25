import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Icon from '../ui/Icons';

const IconButton: React.FC<{ name: string }> = (props) => {
  return (
    <TouchableOpacity hitSlop={{ top: 15, bottom: 15 }} style={styles.iconButtonContainer}>
      <Icon name={props.name} size={24} color="#000" />
    </TouchableOpacity>
  );
};

const KakaoHeader = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>친구</Text>

      <View style={styles.buttonContainer}>
        <IconButton name="search" />
        <IconButton name="ios-person-add-outline" />
        <IconButton name="md-musical-notes-outline" />
        <IconButton name="settings-outline" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  buttonContainer: {
    flexDirection: 'row',
  },
  iconButtonContainer: {
    paddingHorizontal: 6,
  },
});

export default KakaoHeader;
