import React, { useCallback, useEffect, useState } from 'react';
import { FlatList, StyleSheet, useWindowDimensions, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { getPhotoInfo } from '../../actions/photo';
import { AppDispatch, RootState } from '../../store';
import { resetGetPhotoInfo } from '../../slices/photo';
import PhotoListItem from '../../components/InfinityScroll/PhotoListItem';
import { Header } from '../../components/ui/Header/Header';
import Spacer from '../../components/ui/Spacer';
import SkeletonUi from '../SkeletonUi';
import { useRootNavigation } from '../../navigation/InfinityScroll/RootNavigation';

const HomeScreen = () => {
  const { width } = useWindowDimensions();
  const dispatch = useDispatch<AppDispatch>();
  const navigation = useRootNavigation();
  const { getPhotoInfoData, getPhotoInfoLoading } = useSelector((state: RootState) => state.photo);
  const [page, setPage] = useState(2);

  const loadMoreData = useCallback(() => {
    dispatch(getPhotoInfo(page));
    setPage(page + 1);
  }, [dispatch, page]);

  const ListHeaderComponent = useCallback(() => {
    return (
      <FlatList
        horizontal={true}
        keyExtractor={(_, index) => `infinity-scroll-x-${index}`}
        data={getPhotoInfoData}
        renderItem={({ item }) => {
          return (
            <PhotoListItem url={item?.download_url} author={item?.author} width={width - 90} />
          );
        }}
        showsHorizontalScrollIndicator={false}
      />
    );
  }, [getPhotoInfoData, width]);

  useEffect(() => {
    dispatch(getPhotoInfo());

    return () => {
      dispatch(resetGetPhotoInfo());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // 스켈레톤 UI
  if (getPhotoInfoLoading && getPhotoInfoData.length < 1) {
    return (
      <>
        <Header>
          <Header.Title title="Home" />
        </Header>

        <SkeletonUi />
        <Spacer space={24} />
        <SkeletonUi />
      </>
    );
  }

  return (
    <View style={styles.container}>
      <Header>
        <View style={styles.iconContaier}>
          <Header.Icon
            iconName="ios-chevron-back"
            onPress={() => {
              navigation.goBack();
            }}
          />
        </View>

        <Header.Title title="Home" />
      </Header>

      <FlatList
        keyExtractor={(_, index) => `infinity-scroll-y-${index}`}
        data={getPhotoInfoData}
        renderItem={({ item }) => {
          return <PhotoListItem url={item?.download_url} author={item?.author} />;
        }}
        ListHeaderComponent={ListHeaderComponent}
        onEndReached={loadMoreData}
        onEndReachedThreshold={0.1}
      />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  iconContaier: {
    position: 'absolute',
    zIndex: 1,
  },
});
