import React from 'react';
import { Animated, ScrollView, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import LottieBike from '../assets/animations/bike.json';
import LottieKoreaFlag from '../assets/animations/korea-flag.json';
import LottieDiscount from '../assets/animations/gift-discount.json';
import { Header } from '../components/ui/Header/Header';
import { useNavigation } from '@react-navigation/native';
import Typography from '../components/ui/Typography';
import TextItem from '../components/Graffiti/TextItem';
import ContectButton from '../components/Graffiti/ContectButton';
import BannerCard from '../components/Graffiti/BannerCard';
import Lottie from './Lottie';
import LocalImage from '../components/ui/LocalImage';
import TagBox from '../components/Graffiti/TagBox';
import Spacer from '../components/ui/Spacer';
import { useAnimation } from '../hooks/Graffiti/useAnimation';

const Graffiti = () => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
  const { styleOpacityAnim, styleTranslateYAnim, styleTranslateXAnim } = useAnimation();

  return (
    <>
      {/* 헤더 */}
      <Header>
        <View style={styles.iconContaier}>
          <Header.Icon
            iconName="ios-chevron-back"
            onPress={() => {
              navigation.goBack();
            }}
          />
        </View>

        <Header.Title title="Header" />
      </Header>

      <ScrollView style={styles.container}>
        <Typography fontSize={12}>안녕하세요.</Typography>
        <Typography fontSize={24}>안녕하세요.</Typography>
        <Typography fontSize={36}>안녕하세요.</Typography>

        <Typography fontSize={24} fontWeight="100">
          안녕하세요.
        </Typography>
        <Typography fontSize={24} fontWeight="normal">
          안녕하세요.
        </Typography>
        <Typography fontSize={24} fontWeight="bold">
          안녕하세요.
        </Typography>

        <Typography fontSize={24} color="#D7BDE2">
          안녕하세요.
        </Typography>
        <Typography fontSize={24} color="#AED6F1">
          안녕하세요.
        </Typography>
        <Typography fontSize={24} color="#58D68D">
          안녕하세요.
        </Typography>

        <Typography fontSize={24} color="#D7BDE2" numberOfLines={3}>
          Hex code byte values range from 00, which is the lowest intensity of a color, to FF which
          represents the highest intensity. The color white, for example, is made by mixing each of
          the three primary colors at their full intensity, resulting in the Hex color code of
          #FFFFFF.
        </Typography>
        <Typography fontSize={24} color="#AED6F1" numberOfLines={2}>
          Hex code byte values range from 00, which is the lowest intensity of a color, to FF which
          represents the highest intensity. The color white, for example, is made by mixing each of
          the three primary colors at their full intensity, resulting in the Hex color code of
          #FFFFFF.
        </Typography>
        <Typography fontSize={24} color="#58D68D" numberOfLines={1}>
          Hex code byte values range from 00, which is the lowest intensity of a color, to FF which
          represents the highest intensity. The color white, for example, is made by mixing each of
          the three primary colors at their full intensity, resulting in the Hex color code of
          #FFFFFF.
        </Typography>

        <Typography fontSize={24} fontWeight="bold" lineHeight={40}>
          안녕하세요.
        </Typography>
        <Typography fontSize={24} fontWeight="bold" lineHeight={60}>
          안녕하세요.
        </Typography>
        <Typography fontSize={24} fontWeight="bold" lineHeight={80}>
          안녕하세요.
        </Typography>

        <View style={styles.textItemsContainer}>
          <TextItem title="20만" subTitle1="하루평균" subTitle2="라이딩 수" />
          <TextItem title="아시아 1위" subTitle1="영빈지식" subTitle2="매출액" />
          <TextItem title="150만" subTitle1="2022년 누적" subTitle2="영빈자전거 운영대수" />
          <TextItem title="직관적 UI/UX" subTitle1="홈 화면의" subTitle2="직관적임" />
          <TextItem
            title="소통하는 앱"
            subTitle1="유저의 피드백 수용"
            subTitle2="서비스 즉각 반영"
          />
        </View>

        <ContectButton
          content="채팅 상담하기"
          backgroundColor="#2E86C1"
          iconName="ios-chatbubbles"
        />
        <ContectButton content="전화 상담하기" backgroundColor="#138D75" iconName="call" />
        <ContectButton content="보험사 문의" backgroundColor="#212F3D" iconName="call" />
        <ContectButton
          content="카카오톡 문의"
          backgroundColor="#F4D03F"
          iconName="chatbox-sharp"
          contentColor="#000"
        />
        <ContectButton content="로그아웃" backgroundColor="#aaa" />

        {/* ================== Banner Card ================== */}
        <BannerCard backgroundColor="#ABEBC6" justifyContent="space-between">
          <View style={styles.textContentContainer}>
            <Typography fontSize={18}>
              영빈자전거가{' '}
              <Typography fontSize={20} fontWeight="bold" color="#196F3D">
                영빈라이딩
              </Typography>
              으로
            </Typography>
            <Typography fontSize={18}>새롭게 리브랜딩됩니다.</Typography>
          </View>

          <Lottie lottieSource={LottieBike} height={60} />
        </BannerCard>

        <BannerCard backgroundColor="#F0B27A" justifyContent="space-between">
          <Lottie lottieSource={LottieKoreaFlag} height={60} />

          <View style={styles.textContentContainer}>
            <Typography fontSize={14} fontWeight="bold" color="#922B21">
              영빈라이딩과 함께 달리고, 함께 기억해요
            </Typography>
            <Typography fontSize={14} fontWeight="bold" color="#1F618D">
              3월 이벤트가 곧 종료돼요!
            </Typography>
          </View>
        </BannerCard>

        <BannerCard backgroundColor="#8E44AD" justifyContent="center">
          <Lottie lottieSource={LottieDiscount} height={60} />

          <View style={styles.textContentContainer}>
            <Animated.View style={styleOpacityAnim}>
              <Typography fontSize={20} color="#3498DB" fontWeight="bold">
                영빈라이딩을 추천하면
              </Typography>
            </Animated.View>

            <Typography fontSize={18} fontWeight="bold" color="#fff">
              많은 선물을 드려요!
            </Typography>
          </View>
        </BannerCard>

        <BannerCard backgroundColor="#F2D7D5" justifyContent="center">
          <Animated.View style={styleTranslateYAnim}>
            <LocalImage
              localAsset={require('../assets/images/student.png')}
              width={48}
              height={48}
            />
          </Animated.View>

          <View style={styles.textContentContainer}>
            <Animated.View style={styleTranslateYAnim}>
              <Typography fontSize={18} fontWeight="bold" color="#000" lineHeight={30}>
                학생 누구나
              </Typography>
            </Animated.View>

            <Typography fontSize={18} fontWeight="bold" color="#E74C3C">
              1,000원 할인
            </Typography>
          </View>
        </BannerCard>

        <Animated.View style={styleTranslateYAnim}>
          <BannerCard backgroundColor="#73C6B6" justifyContent="space-between">
            <Animated.View style={styleTranslateXAnim}>
              <Lottie lottieSource={LottieBike} height={60} />
            </Animated.View>

            <View style={styles.textContentContainer}>
              <Typography fontSize={20} fontWeight="bold" lineHeight={32}>
                오늘도 😎
              </Typography>

              <Typography fontSize={18}>즐거운 라이딩!!</Typography>
            </View>
          </BannerCard>
        </Animated.View>

        <BannerCard
          backgroundColor="#B5EFE4"
          bgImage={require('../assets/images/background.png')}
          justifyContent="space-between">
          <Animated.View style={styleTranslateXAnim}>
            <Lottie lottieSource={LottieBike} height={60} />
          </Animated.View>

          <View style={styles.textContentContainer}>
            <Typography fontSize={20} fontWeight="bold" lineHeight={32}>
              오늘도 😎
            </Typography>

            <Typography fontSize={18}>즐거운 라이딩!!</Typography>
          </View>
        </BannerCard>

        {/* ================== TagBox ================== */}

        <View style={styles.tagBoxContainer}>
          <TagBox text="텍스트아이콘입니다" iconName="phone-portrait" backgroundColor="green" />
          <TagBox
            text="텍스트"
            iconName="phone-portrait"
            backgroundColor="blue"
            fontColor="white"
            iconColor="#fff"
          />
          <TagBox
            text="텍스트"
            iconName="paw"
            backgroundColor="orange"
            fontColor="#000"
            iconColor="#000"
          />
          <TagBox
            text="호호호"
            iconName="radio-sharp"
            backgroundColor="yellow"
            fontColor="#000"
            iconColor="#000"
          />
          <TagBox
            text="텍스트"
            iconName="planet-sharp"
            backgroundColor="gray"
            fontColor="white"
            iconColor="#fff"
          />
          <TagBox text="하하하" backgroundColor="red" fontColor="white" />
        </View>

        <Spacer space={insets.bottom} />
      </ScrollView>
    </>
  );
};

export default Graffiti;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  textItemsContainer: {
    flex: 1,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  iconContaier: {
    position: 'absolute',
    zIndex: 1,
  },
  textContentContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  tagBoxContainer: {
    marginHorizontal: 24,
  },
});
