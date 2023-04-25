import { useNavigation } from '@react-navigation/native';
import React, { useCallback, useState } from 'react';
import {
  LayoutAnimation,
  View,
  Text,
  ScrollView,
  StatusBar,
  SafeAreaView,
  Platform,
  UIManager,
  NativeSyntheticEvent,
  NativeScrollEvent,
  StyleSheet,
} from 'react-native';
import Icon from '../components/ui/Icons';
import Button from '../components/ui/Button';
import Typography from '../components/ui/Typography';

if (Platform.OS === 'android') {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

const PageHeader = () => {
  const [expanded, setExpanded] = useState(true);
  const navigation = useNavigation();

  const onScroll = useCallback((e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const y = e.nativeEvent.contentOffset.y;
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    if (y > 10) {
      setExpanded(false);
    } else {
      setExpanded(true);
    }
  }, []);

  return (
    <>
      <StatusBar barStyle={'light-content'} />

      <ScrollView
        contentContainerStyle={styles.contentContainerStyle}
        onScroll={(e) => onScroll(e)}
        scrollEventThrottle={1}>
        {expanded ? (
          <View style={styles.expandedScreenContaier}>
            <SafeAreaView style={styles.expandedScreenSubContaier}>
              <View style={styles.expandedScreenIconContainer}>
                <Icon name="person" size={40} color="#333" />
              </View>
              <View>
                <Text style={styles.expandedScreenText}>개발자 영빈</Text>
                <Text style={styles.expandedScreenSecondText}>Hellow World!</Text>
              </View>
            </SafeAreaView>
          </View>
        ) : (
          <View style={styles.notExpandedScreenContaier}>
            <View style={styles.notExpandedScreenSubContaier}>
              <View style={styles.notExpandedScreenIconContainer}>
                <Icon name="person" size={100} color="#333" />
              </View>
              <Text style={styles.notExpandedScreenText}>개발자 영빈</Text>
              <Text style={styles.notExpandedScreenSecondText}>Hellow World!</Text>
            </View>
          </View>
        )}

        <View style={styles.buttonContainer}>
          <Button
            onPress={() => {
              navigation.goBack();
            }}>
            <Typography fontSize={24}>뒤로가기</Typography>
          </Button>
        </View>
      </ScrollView>
    </>
  );
};

export default PageHeader;

const styles = StyleSheet.create({
  contentContainerStyle: {
    height: 1000,
  },
  expandedScreenContaier: {
    backgroundColor: '#0B5345',
  },
  expandedScreenSubContaier: {
    flexDirection: 'row',
  },
  expandedScreenIconContainer: {
    backgroundColor: '#239B56',
    marginLeft: 20,
    marginRight: 16,
    marginBottom: -10,
    width: 60,
    height: 60,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  expandedScreenText: {
    color: 'white',
    fontWeight: 'bold',
    marginBottom: 2,
    marginTop: 8,
  },
  expandedScreenSecondText: {
    color: 'white',
    fontSize: 13,
  },
  notExpandedScreenContaier: {
    backgroundColor: '#0B5345',
    height: 250,
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },
  notExpandedScreenSubContaier: {
    position: 'absolute',
    bottom: -100,
    alignItems: 'center',
  },
  notExpandedScreenIconContainer: {
    backgroundColor: '#239B56',
    width: 160,
    height: 160,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  notExpandedScreenText: {
    fontSize: 20,
    marginTop: 20,
    fontWeight: 'bold',
  },
  notExpandedScreenSecondText: {
    fontSize: 14,
    marginTop: 10,
  },
  buttonContainer: {
    padding: 24,
  },
});
