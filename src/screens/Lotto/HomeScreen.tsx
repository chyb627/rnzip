import React, { useCallback } from 'react';
import { StyleSheet, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { createNewNumbers } from '../../actions/lottoNumbers';
import { LottoNumberView } from '../../components/Lotto/LottoNumberView';
import { Button } from '../../components/UI/Button';
import { Header } from '../../components/UI/Header/Header';
import { Spacer } from '../../components/UI/Spacer';
import { Typography } from '../../components/UI/Typography';
import { RootState } from '../../store/store';

export const HomeScreen = () => {
  const numbers = useSelector(
    (state: RootState) => state.numbers.currentNumber,
  );

  const dispatch = useDispatch();

  const onPressGetNumber = useCallback(() => {
    dispatch(createNewNumbers());
  }, [dispatch]);

  return (
    <View style={styles.container}>
      <Header>
        <Header.Title title="HOME" />
      </Header>

      <View style={styles.lottoContainer}>
        <View style={styles.lottoItems}>
          {numbers.length === 6 && <LottoNumberView numbers={numbers} />}
        </View>

        <Spacer space={20} />

        <Button onPress={onPressGetNumber}>
          <View style={styles.button}>
            <Typography color="#fff">로또 번호 추출하기</Typography>
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
  lottoContainer: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 12,
  },
  lottoItems: {
    height: 250,
    flexDirection: 'column',
    paddingHorizontal: 24,
    backgroundColor: 'white',
    borderColor: 'gray',
  },
  button: {
    backgroundColor: '#000',
    paddingVertical: 24,
    alignItems: 'center',
  },
});
