import React, { useCallback, useRef } from 'react';
import {
  StyleSheet,
  View,
  Animated,
  TouchableOpacity,
  useWindowDimensions,
  Platform,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import Typography from '../../components/ui/Typography';
import Spacer from '../../components/ui/Spacer';
import Lottie from '../Lottie';
import Rocket from '../Rocket';
import Icon from '../../components/ui/Icons';
import { useRootNavigation, useRootRoute } from '../../navigation/InfinityScroll/RootNavigation';

const TextItem: React.FC<{
  title: string;
  subTitle1: string;
  subTitle2: string;
}> = ({ title, subTitle1, subTitle2 }) => {
  return (
    <View style={styles.textItemContainer}>
      <Typography color="#000" fontSize={24}>
        {title}
      </Typography>

      <View style={styles.textItemSubTitle}>
        <Typography color="#aaa" fontSize={12}>
          {subTitle1}
        </Typography>
        <Typography color="#aaa" fontSize={12}>
          {subTitle2}
        </Typography>
      </View>
    </View>
  );
};

const DetailScreen: React.FC = () => {
  const navigation = useRootNavigation<'Detail'>();
  const route = useRootRoute<'Detail'>();
  const scrollY = useRef(new Animated.Value(0)).current;
  const { width } = useWindowDimensions();
  const insets = useSafeAreaInsets();

  // 뒤로가기
  const onPressBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const HEADER_MAX_HEIGHT = width;
  const HEADER_MIN_HEIGHT = Platform.OS === 'ios' ? width / 4 : width / 8;
  const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;

  const headerTranslateY = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE],
    outputRange: [0, -HEADER_SCROLL_DISTANCE],
    extrapolate: 'clamp',
  });

  const imageOpacity = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
    outputRange: [1, 1, 0],
    extrapolate: 'clamp',
  });
  const imageTranslateY = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE],
    outputRange: [0, 100],
    extrapolate: 'clamp',
  });

  const titleScale = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
    outputRange: [0, 1, 0.9],
    extrapolate: 'clamp',
  });
  const titleTranslateY = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
    outputRange: [0, 0, -8],
    extrapolate: 'clamp',
  });

  return (
    <View style={styles.container}>
      <Animated.ScrollView
        contentContainerStyle={{ paddingTop: HEADER_MAX_HEIGHT - 32 }}
        scrollEventThrottle={16}
        onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: scrollY } } }], {
          useNativeDriver: true,
        })}>
        {/* Dummy Text Contents */}
        <View style={styles.contentsContainer}>
          <Typography color="#000" fontSize={24} fontWeight="bold">
            Mobility Evolution for All
          </Typography>

          <Spacer space={24} />

          <View style={styles.textContents}>
            <TextItem title="20만" subTitle1="하루평균" subTitle2="라이딩 수" />
            <TextItem title="아시아 1위" subTitle1="공유킥보드" subTitle2="매출액" />
            <TextItem title="150만" subTitle1="2022년 누적" subTitle2="지쿠터 운영대수" />
            <TextItem title="직관적 UI/UX" subTitle1="홈 화면의" subTitle2="직관적임" />
            <TextItem
              title="소통하는 앱"
              subTitle1="유저의 피드백 수용"
              subTitle2="서비스 즉각 반영"
            />
          </View>
        </View>

        {/* Lottie */}
        <Lottie />

        {/* Rocket */}
        <Rocket />
      </Animated.ScrollView>

      {/* Image */}
      <Animated.View
        style={[
          styles.header,
          { height: HEADER_MAX_HEIGHT, transform: [{ translateY: headerTranslateY }] },
        ]}>
        <Animated.Image
          style={[
            styles.headerBackground,
            {
              height: HEADER_MAX_HEIGHT,
              opacity: imageOpacity,
              transform: [{ translateY: imageTranslateY }],
            },
          ]}
          source={{ uri: route.params.url }}
        />

        <Animated.View
          style={[styles.container, { transform: [{ translateY: headerTranslateY }] }]}>
          <View style={[styles.arrowIconContainer, { top: insets.top }]}>
            <TouchableOpacity
              onPress={onPressBack}
              hitSlop={{ top: 10, right: 10, bottom: 10, left: 10 }}>
              <Icon name="ios-chevron-back" size={28} color="#fff" />
            </TouchableOpacity>
          </View>

          <View style={styles.textOnImageContainer}>
            <Typography fontSize={14} color="#fff">
              {route.params.author}
            </Typography>
          </View>
        </Animated.View>
      </Animated.View>

      {/* Header */}
      <Animated.View
        style={[
          styles.topBar,
          {
            transform: [{ scale: titleScale }, { translateY: titleTranslateY }],
            top: insets.top + 16,
          },
        ]}>
        <TouchableOpacity
          onPress={onPressBack}
          hitSlop={{ top: 10, right: 10, bottom: 10, left: 10 }}>
          <Icon name="ios-chevron-back" size={28} color="#000" />
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
};

export default DetailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    position: 'absolute',
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    overflow: 'hidden',
    borderBottomColor: '#c9c7c7',
    borderBottomWidth: 1,
  },
  headerBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    resizeMode: 'cover',
  },
  topBar: {
    justifyContent: 'center',
    position: 'absolute',
    left: 0,
    right: 0,
  },
  contentsContainer: {
    flex: 1,
    alignItems: 'center',
    marginTop: 32,
    padding: 20,
  },
  textContents: {
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  textItemContainer: {
    flexDirection: 'row',
    marginVertical: 12,
  },
  textItemSubTitle: {
    marginLeft: 8,
  },
  textOnImageContainer: {
    position: 'absolute',
    bottom: 16,
    left: 16,
  },
  arrowIconContainer: {
    left: 14,
  },
});
