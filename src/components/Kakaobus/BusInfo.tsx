import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { DarkColor, LightClor } from '../../util/color';
import AlarmButton from './AlarmButton';
import BookmarkButton from './BookmarkButton';
import NextBusInfo from './NextBusInfo';

const BusInfo: React.FC<{
  isBookmarked: boolean;
  onPressBookmark: () => void;
  num: number;
  directionDescription: string;
  numColor: string;
  NEWCOLOR: LightClor | DarkColor;
  processedNextBusInfos: (
    | {
        hasInfo: boolean;
        remainedTimeText: string;
        numOfRemainedStops?: undefined;
        seatStatusText?: undefined;
      }
    | {
        hasInfo: boolean;
        remainedTimeText: string;
        numOfRemainedStops: number;
        seatStatusText: string;
      }
  )[];
}> = ({
  isBookmarked,
  onPressBookmark,
  num,
  directionDescription,
  numColor,
  processedNextBusInfos,
  NEWCOLOR,
}) => {
  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: NEWCOLOR.WHITE_BLACK,
        },
      ]}>
      <View style={styles.contentContainer}>
        {/* 북마크 */}
        <BookmarkButton
          size={20}
          style={styles.bookmarkButton}
          onPress={onPressBookmark}
          isBookmarked={isBookmarked}
          NEWCOLOR={NEWCOLOR}
        />

        {/* 버스번호, 방향 */}
        <View style={styles.busNumberContainer}>
          <Text style={[styles.busNumberText, { color: numColor }]}>{num}</Text>
          <Text
            style={[
              styles.busArrowText,
              {
                color: NEWCOLOR.GRAY_3_GRAY_2,
              },
            ]}>
            {directionDescription} 방향
          </Text>
        </View>
      </View>

      <View style={styles.busStateContainer}>
        {/* M분 S초 / N번째 전 / 여유 */}
        <View style={styles.subBusStateContainer}>
          {processedNextBusInfos.map((info, index) => (
            <NextBusInfo
              key={`next-bus-info-${index}`}
              hasInfo={info.hasInfo}
              remainedTimeText={info.remainedTimeText}
              numOfRemainedStops={info.numOfRemainedStops}
              seatStatusText={info.seatStatusText}
              NEWCOLOR={NEWCOLOR}
            />
          ))}
        </View>

        {/* 알람아이콘 */}
        <AlarmButton onPress={() => {}} style={styles.alarmButton} NEWCOLOR={NEWCOLOR} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: 75,
  },
  contentContainer: {
    flex: 0.85,
    flexDirection: 'row',
    alignItems: 'center',
  },
  bookmarkButton: {
    paddingHorizontal: 10,
  },
  busNumberContainer: {
    flex: 1,
  },
  busNumberText: {
    fontSize: 20,
  },
  busArrowText: {
    fontSize: 13,
    marginRight: 5,
  },
  busStateContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  subBusStateContainer: {
    flex: 1,
  },
  alarmButton: {
    paddingHorizontal: 15,
  },
});

export default BusInfo;
