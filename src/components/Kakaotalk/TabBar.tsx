/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { getBottomSpace } from 'react-native-iphone-x-helper';
import { Icon } from '../UI/Icons';

const bottomSpace = getBottomSpace();

const TabButton: React.FC<{
  isSelected: boolean;
  onPress: () => void;
  activeIconName: string;
  inactiveIconName: string;
}> = ({ isSelected, onPress, activeIconName, inactiveIconName }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{ flex: 1, justifyContent: 'center', alignItems: 'center', paddingVertical: 10 }}>
      <Icon name={isSelected ? activeIconName : inactiveIconName} size={24} color="#000" />
    </TouchableOpacity>
  );
};

export const TabBar: React.FC<{
  selectedTabIdx: number;
  setSelectedTabIdx: React.Dispatch<React.SetStateAction<number>>;
}> = (props) => {
  return (
    <View
      style={{
        width: '100%',
        flexDirection: 'row',
        paddingBottom: bottomSpace,
        borderTopWidth: 0.5,
        borderTopColor: 'grey',
      }}>
      <TabButton
        isSelected={props.selectedTabIdx === 0}
        onPress={() => props.setSelectedTabIdx(0)}
        activeIconName={'person'}
        inactiveIconName={'person-outline'}
      />
      <TabButton
        isSelected={props.selectedTabIdx === 1}
        onPress={() => props.setSelectedTabIdx(1)}
        activeIconName={'ios-chatbox'}
        inactiveIconName={'ios-chatbox-outline'}
      />
      <TabButton
        isSelected={props.selectedTabIdx === 2}
        onPress={() => props.setSelectedTabIdx(2)}
        activeIconName={'pricetag'}
        inactiveIconName={'pricetag-outline'}
      />
      <TabButton
        isSelected={props.selectedTabIdx === 3}
        onPress={() => props.setSelectedTabIdx(3)}
        activeIconName={'ios-add-circle'}
        inactiveIconName={'ios-add-circle-outline'}
      />
    </View>
  );
};
