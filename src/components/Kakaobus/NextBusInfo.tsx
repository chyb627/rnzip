import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { COLOR, DarkColor, LightClor } from '../../util/color';

const NextBusInfo: React.FC<{
  remainedTimeText: string;
  hasInfo: boolean;
  numOfRemainedStops?: number;
  seatStatusText?: string;
  NEWCOLOR: LightClor | DarkColor;
}> = ({
  remainedTimeText, // 8분 0초, 곧 도착, 도착 정보 없음
  hasInfo, // remainedTimeText="도착 정보 없음일 때" && true
  numOfRemainedStops, // 1, 2, 15
  seatStatusText, // 1석, 여유, 보통
  NEWCOLOR,
}) => {
  if (!hasInfo) {
    return <Text style={{ color: NEWCOLOR.GRAY_2_GRAY_3 }}>도착 정보 없음</Text>;
  }

  return (
    <View style={styles.container}>
      <Text style={[styles.remainedTimeText, { color: NEWCOLOR.BLACK_WHITE }]}>
        {remainedTimeText}
      </Text>

      <View
        style={[
          styles.contentContainer,
          {
            borderColor: NEWCOLOR.GRAY_1_GRAY_4,
          },
        ]}>
        <Text style={[styles.contentText, { color: NEWCOLOR.GRAY_3_GRAY_2 }]}>
          {numOfRemainedStops}번째 전
        </Text>
        <Text style={{ color: COLOR.CORAL }}>{seatStatusText}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  remainedTimeText: {
    marginRight: 10,
  },
  contentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 0.5,
    borderRadius: 3,
    padding: 2,
  },
  contentText: {
    marginRight: 3,
  },
});

export default NextBusInfo;
