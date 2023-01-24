/* eslint-disable react-native/no-inline-styles */
import dayjs from 'dayjs';
import React, { useRef } from 'react';
import {
  FlatList,
  Image,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  View,
  Platform,
  Pressable,
  Keyboard,
  Alert,
} from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { Calendar } from '../components/TodoApp/Calendar';

import { useCalendar } from '../hooks/TodoApp/use-calendar';
import { useTodoList } from '../hooks/TodoApp/use-todo-list';
import {
  getCalendarColumns,
  ITEM_WIDTH,
  statusBarHeight,
  bottomSpace,
} from '../util/util';
import { Icon } from '../components/UI/Icons';
import { Margin } from '../components/UI/Margin';
import { AddTodoInput } from '../components/TodoApp/AddTodoInput';

export const TodoApp = () => {
  const now = dayjs();

  const {
    selectedDate,
    setSelectedDate,
    isDatePickerVisible,
    showDatePicker,
    hideDatePicker,
    handleConfirm,
    subtract1Month,
    add1Month,
  } = useCalendar(now);

  const {
    todoList,
    filteredTodoList,
    input,
    setInput,
    addTodo,
    removeTodo,
    toggleTodo,
    resetInput,
  } = useTodoList(selectedDate);

  const columns = getCalendarColumns(selectedDate);
  const flatListRef = useRef(null);

  const onPressLeftArrow = subtract1Month;
  const onPressHeaderDate = showDatePicker;
  const onPressRightArrow = add1Month;
  const onPressDate = setSelectedDate;

  const ListHeaderComponent = () => (
    <View>
      <Calendar
        todoList={todoList}
        columns={columns}
        selectedDate={selectedDate}
        onPressLeftArrow={onPressLeftArrow}
        onPressRightArrow={onPressRightArrow}
        onPressHeaderDate={onPressHeaderDate}
        onPressDate={onPressDate}
      />

      <Margin height={15} />

      <View
        style={{
          width: 4,
          height: 4,
          borderRadius: 4 / 2,
          backgroundColor: '#a3a3a3',
          alignSelf: 'center',
        }}
      />

      <Margin height={15} />
    </View>
  );

  const renderItem = ({ item: todo }) => {
    const isSuccess = todo.isSuccess;
    const onPress = () => toggleTodo(todo.id);
    const onLongPress = () => {
      Alert.alert('삭제하시겠어요?', '', [
        {
          style: 'cancel',
          text: '아니요',
        },
        {
          text: '네',
          onPress: () => removeTodo(todo.id),
        },
      ]);
    };
    return (
      <Pressable
        onPress={onPress}
        onLongPress={onLongPress}
        style={{
          width: ITEM_WIDTH,
          // backgroundColor: todo.id % 2 === 0 ? 'pink' : 'lightblue',
          flexDirection: 'row',
          alignSelf: 'center',
          paddingVertical: 10,
          paddingHorizontal: 5,
          borderBottomWidth: 0.2,
          borderColor: '#a6a6a6',
        }}>
        <Text style={{ flex: 1, fontSize: 14, color: '#595959' }}>
          {todo.content}
        </Text>

        <Icon
          name="checkmark"
          size={16}
          color={isSuccess ? '#595959' : '#bfbfbf'}
        />
      </Pressable>
    );
  };

  const onPressAdd = () => {
    addTodo();
    resetInput();
  };

  const onSubmitEditing = () => {
    addTodo();
    resetInput();
  };

  // const onFocus = () => {
  //   setTimeout(() => {
  //     flatListRef.current?.scrollToEnd({ animated: true });
  //   }, 300);
  // };

  return (
    <Pressable style={styles.container} onPress={Keyboard.dismiss}>
      {/* <TouchableOpacity activeOpacity={1}>

      </TouchableOpacity> */}

      <Image
        source={{
          uri: 'https://img.freepik.com/free-photo/white-crumpled-paper-texture-for-background_1373-159.jpg?w=1060&t=st=1667524235~exp=1667524835~hmac=8a3d988d6c33a32017e280768e1aa4037b1ec8078c98fe21f0ea2ef361aebf2c',
        }}
        style={{
          width: '100%',
          height: '100%',
          position: 'absolute',
        }}
      />

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <>
          <FlatList
            style={{ flex: 1 }}
            ref={flatListRef}
            data={filteredTodoList}
            contentContainerStyle={{ paddingTop: statusBarHeight + 30 }}
            ListHeaderComponent={ListHeaderComponent}
            renderItem={renderItem}
          />

          <AddTodoInput
            value={input}
            onChangeText={setInput}
            placeholder={`${dayjs(selectedDate).format('MM.D')}에 추가할 투두`}
            onPressAdd={onPressAdd}
            onSubmitEditing={onSubmitEditing}
            // onFocus={onFocus}
          />
        </>
      </KeyboardAvoidingView>

      <Margin height={bottomSpace} />

      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
