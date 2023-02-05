import dayjs, { Dayjs } from 'dayjs';
import React, { useCallback, useMemo } from 'react';
import { FlatList, SectionList, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRecoilValue } from 'recoil';
import { Button } from '../../components/UI/Button';
import { Header } from '../../components/UI/Header/Header';
import { Icon } from '../../components/UI/Icons';
import { Spacer } from '../../components/UI/Spacer';
import { Typography } from '../../components/UI/Typography';
import { useStackNavigation } from '../../navigation/ScrapWeb/LinkStackNavigation';
import { useRootNavigation } from '../../navigation/ScrapWeb/RootNavigation';
import { atomLinkList } from '../../states/atomLinkList';

export const LinkListSceen = () => {
  const navigation = useRootNavigation();
  const stackNavigation = useStackNavigation();
  const safeAreaInset = useSafeAreaInsets();
  const data = useRecoilValue(atomLinkList);

  const onPressListItem = useCallback(
    (item: {
      title: string;
      image: string;
      link: string;
      createdAt: string;
    }) => {
      stackNavigation.navigate('LinkDetail', { item });
    },
    [stackNavigation],
  );

  const onPressAddButton = useCallback(() => {
    navigation.navigate('AddLink');
  }, [navigation]);

  const sectionData: {
    title: string;
    data: {
      title: string;
      image: string;
      link: string;
      createdAt: string;
    }[];
  }[] = useMemo(() => {
    const dateList: any = {};

    const makeDateString = (createdAt: string): string => {
      const dateItem = new Date(createdAt);
      return dayjs(dateItem).format('YYYY.MM.DD hh:mm');
    };

    if (!data.list) return [];

    data.list.forEach((item) => {
      const keyName = makeDateString(item.createdAt);

      if (!dateList[keyName]) {
        dateList[keyName] = [item];
      } else {
        dateList[keyName].push(item);
      }
    });

    return Object.keys(dateList).map((item) => {
      return {
        title: item,
        data: dateList[item],
      };
    });
  }, [data.list]);

  return (
    <View style={styles.container}>
      <Header>
        <Header.Group>
          <Header.Title title="LINK LIST" />
        </Header.Group>
      </Header>

      <SectionList
        style={{ flex: 1 }}
        sections={sectionData}
        renderItem={({ item }) => {
          return (
            <Button
              onPress={() => onPressListItem(item)}
              paddingHorizontal={24}
              paddingVertical={24}>
              <View>
                <Typography fontSize={20}>{item.link}</Typography>

                <Spacer space={4} />

                <Typography fontSize={16} color="gray">
                  {item.title !== '' ? `${item.title.slice(0, 20)} | ` : ''}
                  {new Date(item.createdAt).toLocaleString()}
                </Typography>
              </View>
            </Button>
          );
        }}
        renderSectionHeader={({ section }) => {
          // console.log('section::', section);
          return (
            <View
              style={{
                paddingHorizontal: 12,
                paddingVertical: 4,
                backgroundColor: '#fff',
              }}>
              <Typography color="gray" fontSize={12}>
                {section.title}
              </Typography>
            </View>
          );
        }}
      />

      <View
        style={{
          position: 'absolute',
          right: 24,
          bottom: 24 + safeAreaInset.bottom,
        }}>
        <Button onPress={onPressAddButton}>
          <View
            style={{
              width: 52,
              height: 52,
              borderRadius: 26,
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: '#000',
            }}>
            <Icon name="add" color="#fff" size={32} />
          </View>
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
