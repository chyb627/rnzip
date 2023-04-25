/* eslint-disable react/no-unstable-nested-components */
import React, { useCallback, useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import KakaoHeader from '../components/Kakaotalk/KakaoHeader';
import Spacer from '../components/ui/Spacer';
import Profile from '../components/Kakaotalk/Profile';
import Division from '../components/ui/Division';
import FriendSection from '../components/Kakaotalk/FriendSection';
import TabBar from '../components/Kakaotalk/TabBar';
import { friendProfiles, myProfile } from '../data/Kakaotalk/data';

const Kakaotalk = () => {
  const insets = useSafeAreaInsets();
  const [isOpened, setIsOpend] = useState(true);
  const [selectedTabIdx, setSelectedTabIdx] = useState(0);

  const onPressArrow = useCallback(() => {
    setIsOpend(!isOpened);
  }, [isOpened]);

  const ItemSeparatorComponent = () => <Spacer space={13} />;

  const renderItem: React.FC<{
    item: { uri: string; name: string; introduction: string };
  }> = ({ item }) => (
    <View>
      <Profile uri={item.uri} name={item.name} introduction={item.introduction} isMe={false} />
    </View>
  );

  const ListHeaderComponent = () => (
    <View style={styles.headerContainer}>
      <KakaoHeader />

      <Spacer space={10} />

      <Profile
        uri={myProfile.uri}
        name={myProfile.name}
        introduction={myProfile.introduction}
        isMe={true}
      />

      <Spacer space={15} />

      <Division />

      <Spacer space={12} />

      <FriendSection
        freindProfileLen={friendProfiles.length}
        onPressArrow={onPressArrow}
        isOpened={isOpened}
      />

      <Spacer space={5} />
    </View>
  );

  const ListFooterComponent = () => <Spacer space={10} />;

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
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

      <TabBar selectedTabIdx={selectedTabIdx} setSelectedTabIdx={setSelectedTabIdx} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  headerContainer: {
    backgroundColor: '#fff',
  },
  contentContainer: {
    paddingHorizontal: 15,
  },
});

export default Kakaotalk;
