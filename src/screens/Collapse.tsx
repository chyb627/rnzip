import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import QnaCard from '../components/Collapse/QnaCard';

const Collapse = () => {
  return (
    <View style={style.container}>
      <FlatList
        keyExtractor={(_, index) => `collapse-${index}`}
        data={collapseData}
        renderItem={({ item }) => {
          return <QnaCard question={item.q} answer={item.a} />;
        }}
      />
    </View>
  );
};

export default Collapse;

const collapseData = [
  {
    q: '1번 안내문.',
    a: '최근 회사 직원들의 사진과 이력등을 불법으로 사용하여 카카오톡 계정을 생성한 후 상담 및 결제를 유도하는 사례가 발생하고 있습니다',
  },
  {
    q: '2번 안내문.',
    a: '최근 회사 직원들의 사진과 이력등을 불법으로 사용하여 카카오톡 계정을 생성한 후 상담 및 결제를 유도하는 사례가 발생하고 있습니다',
  },
  {
    q: '3번 안내문.',
    a: '최근 회사 직원들의 사진과 이력등을 불법으로 사용하여 카카오톡 계정을 생성한 후 상담 및 결제를 유도하는 사례가 발생하고 있습니다',
  },
  {
    q: '4번 안내문.',
    a: '최근 회사 직원들의 사진과 이력등을 불법으로 사용하여 카카오톡 계정을 생성한 후 상담 및 결제를 유도하는 사례가 발생하고 있습니다',
  },
];

const style = StyleSheet.create({
  container: {
    flex: 1,
  },
});
