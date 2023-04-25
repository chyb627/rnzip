import React, { useState } from 'react';
import { PanResponder, StyleSheet, Text, View } from 'react-native';

const PanResponderInfo = () => {
  const [status, setStatus] = useState({
    dx: 0, // 터치 후 누적거리
    dy: 0,
    moveX: 0, // 제일 최근에 찍힌 좌표 (절대좌표)
    moveY: 0,
    vx: 0, // 제스쳐의 속도
    vy: 0,
    x0: 0, // 터치 시작지점
    y0: 0,
  });
  // console.log('status:::', status);

  const panResponder = PanResponder.create({
    // permission method
    onStartShouldSetPanResponder: () => true,
    onMoveShouldSetPanResponder: () => true,

    // response method
    // 터치에 대한 응답이 잘되는 물어보는 메소드
    onPanResponderGrant: () => {},
    // 터치가 잘안되었을때 response가 오는 메소드
    onPanResponderReject: () => {},

    // handler method
    // 터치 액션이 시작되었을 때 작동하는 핸들러
    onPanResponderStart: (event, gestureState) => {
      // console.log(gestureState);
      setStatus({
        dx: 0,
        dy: 0,
        vx: 0,
        vy: 0,
        moveX: gestureState.x0,
        moveY: gestureState.y0,
        x0: gestureState.x0,
        y0: gestureState.y0,
      });
    },
    // 터치가 움질일 때, 제스처로 전환이 될때 response를 주는 메소드
    onPanResponderMove: (event, gestureState) => {
      // console.log(gestureState);
      setStatus({ ...gestureState, x0: status.x0, y0: status.y0 });
    },
    // 터치가 끝났을 때
    onPanResponderEnd: () => {},
    // 터치가 끝났을 때, 항상 End가 Release보다 빨리 작동함
    onPanResponderRelease: () => {},
  });

  const moveXSize = Math.floor(status.moveX - status.x0);
  const moveYSize = Math.floor(status.moveY - status.y0);

  return (
    <View {...panResponder.panHandlers} style={styles.container}>
      <View>
        <Text>
          {moveXSize > 0 ? moveXSize : -moveXSize}
          {moveXSize > 0 ? '만큼 오른쪽으로 가는 중' : '만큼 왼쪽으로 가는 중'}
        </Text>
        <Text>
          {moveYSize > 0 ? moveYSize : -moveYSize}
          {moveYSize > 0 ? '만큼 아래로 가는 중' : '만큼 위로 가는 중'}
        </Text>
      </View>

      <View style={styles.contentsContainer}>
        <Text>dx: {status.dx}</Text>
        <Text>dy: {status.dy}</Text>
        <Text>moveX: {status.moveX}</Text>
        <Text>moveY: {status.moveY}</Text>
        <Text>vx: {status.vx}</Text>
        <Text>vy: {status.vy}</Text>
        <Text>x0: {status.x0}</Text>
        <Text>y0: {status.y0}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  contentsContainer: {
    position: 'absolute',
    bottom: 70,
    left: 10,
  },
});

export default PanResponderInfo;
