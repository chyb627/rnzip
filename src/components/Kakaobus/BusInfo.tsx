/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { Text, View } from 'react-native';
import { DarkColor, LightClor } from '../../util/color';
import { AlarmButton } from './AlarmButton';
import { BookmarkButton } from './BookmarkButton';
import { NextBusInfo } from './NextBusInfo';

export const BusInfo: React.FC<{
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
      style={{
        flexDirection: 'row',
        height: 75,
        backgroundColor: NEWCOLOR.WHITE_BLACK,
      }}>
      <View style={{ flex: 0.85, flexDirection: 'row', alignItems: 'center' }}>
        {/* 북마크 */}
        <BookmarkButton
          size={20}
          style={{ paddingHorizontal: 10 }}
          onPress={onPressBookmark}
          isBookmarked={isBookmarked}
          NEWCOLOR={NEWCOLOR}
        />

        {/* 버스번호, 방향 */}
        <View style={{ flex: 1 }}>
          <Text style={{ color: numColor, fontSize: 20 }}>{num}</Text>
          <Text
            style={{
              fontSize: 13,
              color: NEWCOLOR.GRAY_3_GRAY_2,
              marginRight: 5,
            }}>
            {directionDescription} 방향
          </Text>
        </View>
      </View>

      <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
        {/* M분 S초 / N번째 전 / 여유 */}
        <View style={{ flex: 1 }}>
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
        <AlarmButton
          onPress={() => {}}
          style={{ paddingHorizontal: 15 }}
          NEWCOLOR={NEWCOLOR}
        />
      </View>
    </View>
  );
};
