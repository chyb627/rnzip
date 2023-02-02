import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { useSelector } from 'react-redux';
import { LottoNumberView } from '../../components/Lotto/LottoNumberView';
import { Header } from '../../components/UI/Header/Header';
import { Typography } from '../../components/UI/Typography';
import { RootState } from '../../store/store';

export const HistoryListScreen = () => {
  const history = useSelector((state: RootState) => state.numbers.history);

  return (
    <View style={styles.container}>
      <Header>
        <Header.Title title="HISTORY" />
      </Header>

      <FlatList
        style={styles.itemContainer}
        data={history}
        contentContainerStyle={styles.contentContainerStyle}
        renderItem={({ item }) => {
          console.log('item', item);
          return (
            <View style={styles.date}>
              <Typography fontSize={16}>{item.date}</Typography>

              <LottoNumberView numbers={item.numbers} />
            </View>
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  itemContainer: {
    flex: 1,
  },
  contentContainerStyle: {
    paddingTop: 24,
    paddingBottom: 24,
  },
  date: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    marginHorizontal: 24,
    height: 120,
    backgroundColor: '#fff',
  },
});
