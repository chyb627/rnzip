import React, { useRef, useState } from 'react';
import {
  Animated,
  Easing,
  PanResponder,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Button from '../components/ui/Button';
import Typography from '../components/ui/Typography';
import Icon from '../components/ui/Icons';

const ModalScreen = () => {
  const insets = useSafeAreaInsets();
  const interpolateAnimation = useRef(new Animated.Value(0)).current;
  const [show, setShow] = useState(false);
  const panResponder = PanResponder.create({
    onMoveShouldSetPanResponder: () => true,
    onPanResponderMove: (evt, gestureState) => {
      // console.log(gestureState.dy);
      if (gestureState.dy > 100) {
        hideModal();
      }
    },
  });

  const showModal = () => {
    setShow(true);
    Animated.timing(interpolateAnimation, {
      toValue: 1,
      duration: 500,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: false,
    }).start();
  };
  const hideModal = () => {
    Animated.timing(interpolateAnimation, {
      toValue: 0,
      duration: 500,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: false,
    }).start(({ finished }) => {
      if (finished) {
        setShow(false);
      }
    });
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <Button onPress={showModal}>
        <Typography fontSize={24}>show Modal</Typography>
      </Button>
      <>
        {/* Menu Background */}
        {show && (
          <TouchableWithoutFeedback onPress={hideModal}>
            <Animated.View
              style={[
                styles.background,
                {
                  opacity: interpolateAnimation.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, 1],
                  }),
                },
              ]}
            />
          </TouchableWithoutFeedback>
        )}

        {/* Menu Contents */}
        <Animated.View
          {...panResponder.panHandlers}
          style={[
            styles.listItemsContainer,
            {
              bottom: interpolateAnimation.interpolate({
                inputRange: [0, 1],
                outputRange: [-500, 0],
              }),
              paddingBottom: 20 + insets.bottom,
            },
          ]}>
          <ListItem onPress={() => {}} iconName="person" title="저장하기" />
          <ListItem onPress={() => {}} iconName="person" title="좋아요" />
          <ListItem onPress={() => {}} iconName="person" title="삭제하기" />
          <ListItem onPress={() => {}} iconName="person" title="닫기" color="#999" />
        </Animated.View>
      </>
    </View>
  );
};

export default ModalScreen;

const ListItem: React.FC<{
  iconName: string;
  title: string;
  color?: string;
  onPress: () => void;
}> = ({ iconName, title, color = '#333', onPress }) => {
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={styles.listItemContainer}>
        <Icon name={iconName} size={20} color={color} />
        <Text style={[styles.ListItemText, { color }]}>{title}</Text>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listItemsContainer: {
    position: 'absolute',
    bottom: 0,
    backgroundColor: '#fff',
    width: '100%',
    padding: 20,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  listItemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomColor: '#f2f2f2',
    borderBottomWidth: 1,
    height: 60,
  },
  ListItemText: {
    fontSize: 15,
    marginLeft: 20,
  },
  background: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    flex: 1,
    backgroundColor: '#00000090',
  },
});
