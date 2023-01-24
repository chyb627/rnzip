/* eslint-disable curly */
/* eslint-disable react-native/no-inline-styles */
import dayjs from 'dayjs';
import React, { useEffect, useState } from 'react';
import {
  RefreshControl,
  SafeAreaView,
  SectionList,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { BookmarkButton } from '../components/Kakaobus/BookmarkButton';
import { BusInfo } from '../components/Kakaobus/BusInfo';
import { Icon } from '../components/UI/Icons';
import { Margin } from '../components/UI/Margin';
import {
  Buses,
  busStop,
  getBusNumColorByType,
  getRemainedTimeText,
  getSeatStatusText,
  getSections,
} from '../data/Kakaobus/data';
import { useTheme } from '../hooks/Kakaobus/use-theme';

const busStopBookMarkSize = 20;
const busStopBookMarkPadding = 6;

export const Kakaobus = () => {
  const sections = getSections(busStop.buses);
  const [now, setNow] = useState(dayjs());
  const [refreshing, setRefreshing] = useState(false);
  const { NEWCOLOR, toggleIsDark, isDark } = useTheme();

  const onPressBusStopBookMark = () => {};

  const ListHeaderComponent = () => (
    <View
      style={{
        backgroundColor: NEWCOLOR.GRAY_3_GRAY_2,
        height: 190,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      {/* 정류소 번호, 이름, 방향 */}
      <Margin height={4} />

      <Text style={{ color: NEWCOLOR.WHITE_BLACK, fontSize: 13 }}>
        {busStop.id}
      </Text>
      <Margin height={4} />

      <Text style={{ color: NEWCOLOR.WHITE_BLACK, fontSize: 20 }}>
        {busStop.name}
      </Text>
      <Margin height={4} />

      <Text style={{ color: NEWCOLOR.GRAY_1_GRAY_4, fontSize: 20 }}>
        {busStop.directionDescription}
      </Text>
      <Margin height={20} />

      {/* 북마크 */}
      <BookmarkButton
        NEWCOLOR={NEWCOLOR}
        size={busStopBookMarkSize} // 25 + 5 + 5
        onPress={onPressBusStopBookMark}
        isBookmarked={busStop.isBookmarked}
        style={{
          borderWidth: 0.3,
          borderColor: NEWCOLOR.GRAY_1_GRAY_2,
          borderRadius: busStopBookMarkSize + (busStopBookMarkPadding * 2) / 2,
          padding: busStopBookMarkPadding,
        }}
      />

      <Margin height={12} />

      {/* 다크모드 */}
      <Switch
        value={isDark}
        onValueChange={(v) => {
          console.log('changed switch value', v);
          toggleIsDark();
        }}
      />

      <Margin height={25} />
    </View>
  );

  const renderSectionHeader = ({
    section: { title },
  }: {
    section: { title: string };
  }) => {
    return (
      <View
        style={{
          paddingLeft: 13,
          paddingVertical: 3,
          backgroundColor: NEWCOLOR.GRAY_1_GRAY_4,
          borderTopWidth: 1,
          borderBottomWidth: 1,
          borderTopColor: NEWCOLOR.GRAY_2_GRAY_3,
          borderBottomColor: NEWCOLOR.GRAY_2_GRAY_3,
        }}>
        <Text style={{ fontSize: 12, color: NEWCOLOR.GRAY_4_GRAY_1 }}>
          {title}
        </Text>
      </View>
    );
  };

  const renderItem = ({ item: bus }: { item: Buses }) => {
    const numColor = getBusNumColorByType(bus.type);

    const firstNextBusInfo = bus.nextBusInfos?.[0] ?? null; // undefined 인경우 null로 통일
    const secondNextBusInfo = bus.nextBusInfos?.[1] ?? null;
    const newNextBusInfos =
      !firstNextBusInfo && !secondNextBusInfo
        ? [null]
        : [firstNextBusInfo, secondNextBusInfo];

    const processedNextBusInfos = newNextBusInfos.map((info) => {
      if (!info)
        return {
          hasInfo: false,
          remainedTimeText: '도착 정보 없음',
        };

      const { arrivalTime, numOfRemainedStops, numOfPassengers } = info;
      const remainedTimeText = getRemainedTimeText(now, arrivalTime);
      const seatStatusText = getSeatStatusText(bus.type, numOfPassengers);
      return {
        hasInfo: true,
        remainedTimeText,
        numOfRemainedStops,
        seatStatusText,
      };
    });

    return (
      <BusInfo
        onPressBookmark={() => {}}
        isBookmarked={bus.isBookmarked}
        num={bus.num}
        directionDescription={bus.directionDescription}
        numColor={numColor}
        processedNextBusInfos={processedNextBusInfos}
        NEWCOLOR={NEWCOLOR}
      />
    );
  };

  const ItemSeparatorComponent = () => (
    <View
      style={{
        width: '100%',
        height: 10,
        backgroundColor: NEWCOLOR.GRAY_1_GRAY_4,
      }}
    />
  );

  const ListFooterComponent = () => <Margin height={30} />;

  const onRefresh = () => {
    console.log('call onRefresh');
    setRefreshing(true);
  };

  useEffect(() => {
    if (refreshing) {
      setNow(dayjs());

      const timer = setTimeout(() => {
        // API refetch 완료시
        setRefreshing(false);
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [refreshing]);

  useEffect(() => {
    const interval = setInterval(() => {
      const newNow = dayjs();
      setNow(newNow);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        backgroundColor: NEWCOLOR.WHITE_BLACK,
      }}>
      {/* 뒤로가기, 홈 아이콘 */}
      <View style={{ backgroundColor: NEWCOLOR.GRAY_3_GRAY_2, width: '100%' }}>
        <SafeAreaView
          style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <TouchableOpacity style={{ padding: 10 }}>
            <Icon name="chevron-back" size={24} color={NEWCOLOR.WHITE_BLACK} />
          </TouchableOpacity>

          <TouchableOpacity style={{ padding: 10 }}>
            <Icon name="home-outline" size={24} color={NEWCOLOR.WHITE_BLACK} />
          </TouchableOpacity>
        </SafeAreaView>

        <View
          style={{
            position: 'absolute',
            width: '100%',
            height: 500,
            backgroundColor: NEWCOLOR.GRAY_3_GRAY_2,
            zIndex: -1,
          }}
        />
      </View>

      <SectionList
        style={{ flex: 1, width: '100%' }}
        ListHeaderComponent={ListHeaderComponent}
        renderSectionHeader={renderSectionHeader}
        sections={sections}
        renderItem={renderItem}
        ItemSeparatorComponent={ItemSeparatorComponent}
        ListFooterComponent={ListFooterComponent}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    </View>
  );
};
