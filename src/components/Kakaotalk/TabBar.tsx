import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import Icon from '../ui/Icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const TabButton: React.FC<{
  isSelected: boolean;
  onPress: () => void;
  activeIconName: string;
  inactiveIconName: string;
}> = ({ isSelected, onPress, activeIconName, inactiveIconName }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.tabButtonContainer}>
      <Icon name={isSelected ? activeIconName : inactiveIconName} size={24} color="#000" />
    </TouchableOpacity>
  );
};

const TabBar: React.FC<{
  selectedTabIdx: number;
  setSelectedTabIdx: React.Dispatch<React.SetStateAction<number>>;
}> = (props) => {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingBottom: insets.bottom }]}>
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

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    borderTopWidth: 0.5,
    borderTopColor: 'grey',
  },
  tabButtonContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
  },
});

export default TabBar;
