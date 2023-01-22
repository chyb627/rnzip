/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Icon } from '../UI/Icons';

const IconButton: React.FC<{ name: string }> = (props) => {
  return (
    <TouchableOpacity hitSlop={{ top: 15, bottom: 15 }} style={{ paddingHorizontal: 6 }}>
      <Icon name={props.name} size={24} color="#000" />
    </TouchableOpacity>
  );
};

export const KakaoHeader = () => {
  return (
    <View style={styles.headerContainer}>
      <Text style={styles.title}>친구</Text>

      <View style={{ flexDirection: 'row' }}>
        <IconButton name="search" />
        <IconButton name="ios-person-add-outline" />
        <IconButton name="md-musical-notes-outline" />
        <IconButton name="settings-outline" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
  },
});
