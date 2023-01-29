import React, { useCallback, useState } from 'react';
import { FlatList, Platform, StyleSheet, View } from 'react-native';
import {
  getBottomSpace,
  getStatusBarHeight,
} from 'react-native-iphone-x-helper';
import { KakaoHeader } from '../components/Kakaotalk/KakaoHeader';
import { Profile } from '../components/Kakaotalk/Profile';
import { friendProfiles, myProfile } from '../data/Kakaotalk/data';
import { Margin } from '../components/UI/Margin';
import { Division } from '../components/UI/Division';
import { FriendSection } from '../components/Kakaotalk/FriendSection';
import { TabBar } from '../components/Kakaotalk/TabBar';

const statusBarHeight = getStatusBarHeight(true);
const bottomSpace = getBottomSpace();

console.log(`${Platform.OS}: ${statusBarHeight}, ${bottomSpace}`);

export const Kakaotalk = () => {
  const [isOpened, setIsOpend] = useState(true);
  const [selectedTabIdx, setSelectedTabIdx] = useState(0);

  const onPressArrow = useCallback(() => {
    setIsOpend(!isOpened);
  }, [isOpened]);

  const ItemSeparatorComponent = () => <Margin height={13} />;

  const renderItem: React.FC<{
    item: { uri: string; name: string; introduction: string };
  }> = ({ item }) => (
    <View>
      <Profile
        uri={item.uri}
        name={item.name}
        introduction={item.introduction}
        isMe={false}
      />
    </View>
  );

  const ListHeaderComponent = () => (
    <View style={styles.headerContainer}>
      <KakaoHeader />

      <Margin height={10} />

      <Profile
        uri={myProfile.uri}
        name={myProfile.name}
        introduction={myProfile.introduction}
        isMe={true}
      />

      <Margin height={15} />

      <Division />

      <Margin height={12} />

      <FriendSection
        freindProfileLen={friendProfiles.length}
        onPressArrow={onPressArrow}
        isOpened={isOpened}
      />

      <Margin height={5} />
    </View>
  );

  const ListFooterComponent = () => <Margin height={10} />;

  return (
    <View style={styles.container}>
      <FlatList
        keyExtractor={(_, index) => `kakao-${index}`}
        data={isOpened ? friendProfiles : []}
        stickyHeaderIndices={[0]} // 고정을 할 헤더의 index
        contentContainerStyle={styles.contentContainer}
        ItemSeparatorComponent={ItemSeparatorComponent}
        renderItem={renderItem}
        ListHeaderComponent={ListHeaderComponent}
        ListFooterComponent={ListFooterComponent}
        showsVerticalScrollIndicator={false}
      />

      <TabBar
        selectedTabIdx={selectedTabIdx}
        setSelectedTabIdx={setSelectedTabIdx}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: statusBarHeight,
  },
  headerContainer: {
    backgroundColor: '#fff',
  },
  contentContainer: {
    paddingHorizontal: 15,
  },
});
