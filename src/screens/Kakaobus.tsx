/* eslint-disable react/no-unstable-nested-components */
import dayjs from 'dayjs';
import React, { useEffect, useState } from 'react';
import {
  RefreshControl,
  SafeAreaView,
  SectionList,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import BookmarkButton from '../components/Kakaobus/BookmarkButton';
import BusInfo from '../components/Kakaobus/BusInfo';
import Spacer from '../components/ui/Spacer';
import Icon from '../components/ui/Icons';
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

const Kakaobus = () => {
  const sections = getSections(busStop.buses);
  const [now, setNow] = useState(dayjs());
  const [refreshing, setRefreshing] = useState(false);
  const { NEWCOLOR, toggleIsDark, isDark } = useTheme();

  const onPressBusStopBookMark = () => {};

  const ListHeaderComponent = () => (
    <View
      style={[
        styles.listHeaderComponent,
        {
          backgroundColor: NEWCOLOR.GRAY_3_GRAY_2,
        },
      ]}>
      {/* 정류소 번호, 이름, 방향 */}
      <Spacer space={4} />

      <Text style={[styles.font13, { color: NEWCOLOR.WHITE_BLACK }]}>{busStop.id}</Text>
      <Spacer space={4} />

      <Text style={[styles.font20, { color: NEWCOLOR.WHITE_BLACK }]}>{busStop.name}</Text>
      <Spacer space={4} />

      <Text style={[styles.font20, { color: NEWCOLOR.GRAY_1_GRAY_4 }]}>
        {busStop.directionDescription}
      </Text>
      <Spacer space={20} />

      {/* 북마크 */}
      <BookmarkButton
        NEWCOLOR={NEWCOLOR}
        size={busStopBookMarkSize} // 25 + 5 + 5
        onPress={onPressBusStopBookMark}
        isBookmarked={busStop.isBookmarked}
        style={[
          styles.bookmarkButton,
          {
            borderColor: NEWCOLOR.GRAY_1_GRAY_2,
            borderRadius: busStopBookMarkSize + (busStopBookMarkPadding * 2) / 2,
            padding: busStopBookMarkPadding,
          },
        ]}
      />

      <Spacer space={12} />

      {/* 다크모드 */}
      <Switch
        value={isDark}
        onValueChange={(v) => {
          console.log('changed switch value', v);
          toggleIsDark();
        }}
      />

      <Spacer space={25} />
    </View>
  );

  const renderSectionHeader = ({ section: { title } }: { section: { title: string } }) => {
    return (
      <View
        style={[
          styles.renderSectionHeader,
          {
            backgroundColor: NEWCOLOR.GRAY_1_GRAY_4,
            borderTopColor: NEWCOLOR.GRAY_2_GRAY_3,
            borderBottomColor: NEWCOLOR.GRAY_2_GRAY_3,
          },
        ]}>
        <Text style={[styles.font12, { color: NEWCOLOR.GRAY_4_GRAY_1 }]}>{title}</Text>
      </View>
    );
  };

  const renderItem = ({ item: bus }: { item: Buses }) => {
    const numColor = getBusNumColorByType(bus.type);

    const firstNextBusInfo = bus.nextBusInfos?.[0] ?? null; // undefined 인경우 null로 통일
    const secondNextBusInfo = bus.nextBusInfos?.[1] ?? null;
    const newNextBusInfos =
      !firstNextBusInfo && !secondNextBusInfo ? [null] : [firstNextBusInfo, secondNextBusInfo];

    const processedNextBusInfos = newNextBusInfos.map((info) => {
      if (!info) {
        return {
          hasInfo: false,
          remainedTimeText: '도착 정보 없음',
        };
      }

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
      style={[
        styles.itemSeparatorComponent,
        {
          backgroundColor: NEWCOLOR.GRAY_1_GRAY_4,
        },
      ]}
    />
  );

  const ListFooterComponent = () => <Spacer space={30} />;

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
      style={[
        styles.container,
        {
          backgroundColor: NEWCOLOR.WHITE_BLACK,
        },
      ]}>
      {/* 뒤로가기, 홈 아이콘 */}
      <View style={[styles.subContainer, { backgroundColor: NEWCOLOR.GRAY_3_GRAY_2 }]}>
        <SafeAreaView style={styles.headerButtonContainer}>
          <TouchableOpacity style={styles.headerButton}>
            <Icon name="chevron-back" size={24} color={NEWCOLOR.WHITE_BLACK} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.headerButton}>
            <Icon name="home-outline" size={24} color={NEWCOLOR.WHITE_BLACK} />
          </TouchableOpacity>
        </SafeAreaView>

        <View
          style={[
            styles.dragBackground,
            {
              backgroundColor: NEWCOLOR.GRAY_3_GRAY_2,
            },
          ]}
        />
      </View>

      <SectionList
        style={styles.sectionList}
        ListHeaderComponent={ListHeaderComponent}
        renderSectionHeader={renderSectionHeader}
        sections={sections}
        renderItem={renderItem}
        ItemSeparatorComponent={ItemSeparatorComponent}
        ListFooterComponent={ListFooterComponent}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  subContainer: {
    width: '100%',
  },
  headerButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  headerButton: {
    padding: 10,
  },
  dragBackground: {
    position: 'absolute',
    width: '100%',
    height: 500,
    zIndex: -1,
  },
  sectionList: {
    flex: 1,
    width: '100%',
  },
  listHeaderComponent: {
    height: 190,
    justifyContent: 'center',
    alignItems: 'center',
  },
  font13: {
    fontSize: 13,
  },
  font20: {
    fontSize: 20,
  },
  bookmarkButton: {
    borderWidth: 0.3,
  },
  renderSectionHeader: {
    paddingLeft: 13,
    paddingVertical: 3,
    borderTopWidth: 1,
    borderBottomWidth: 1,
  },
  font12: {
    fontSize: 12,
  },
  itemSeparatorComponent: {
    width: '100%',
    height: 10,
  },
});

export default Kakaobus;
