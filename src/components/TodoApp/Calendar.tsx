/* eslint-disable react/no-unstable-nested-components */
import dayjs, { Dayjs } from 'dayjs';
import React, { Dispatch, SetStateAction } from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { TodoList } from '../../hooks/TodoApp/use-todo-list';
import { getDayColor, getDayText } from '../../util/util';
import Icon from '../ui/Icons';

const columnSize = 35;

const Column: React.FC<{
  text: string | number;
  color: string;
  opacity: number;
  disabled?: boolean;
  onPress?: () => void;
  isSelected?: boolean;
  hasTodo?: boolean;
}> = ({ text, color, opacity, disabled, onPress, isSelected, hasTodo }) => {
  const isSelectedStyle = isSelected ? isSelectedStyles : styles;
  const hasTodoStyle = hasTodo ? hasTodoStyles : styles;

  return (
    <TouchableOpacity disabled={disabled} onPress={onPress} style={isSelectedStyle.buttonContainer}>
      <Text style={[hasTodoStyle.buttonText, { color, opacity }]}>{text}</Text>
    </TouchableOpacity>
  );
};

const ArrowButton: React.FC<{
  onPress: () => void;
  iconName: string;
}> = ({ onPress, iconName }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.arrowButtonContainer}>
      <Icon name={iconName} size={20} color="#404040" />
    </TouchableOpacity>
  );
};

const Calendar: React.FC<{
  columns: Dayjs[];
  selectedDate: Dayjs;
  onPressLeftArrow: () => void;
  onPressRightArrow: () => void;
  onPressHeaderDate: () => void;
  onPressDate: Dispatch<SetStateAction<Dayjs>>;
  todoList: TodoList[];
}> = ({
  columns,
  selectedDate,
  onPressLeftArrow,
  onPressRightArrow,
  onPressHeaderDate,
  onPressDate,
  todoList,
}) => {
  const ListHeaderComponent = () => {
    const currentDateText = dayjs(selectedDate).format('YYYY.MM.DD');

    return (
      <View>
        {/* YYYY.MM.DD */}
        <View style={styles.container}>
          <ArrowButton onPress={onPressLeftArrow} iconName="chevron-back" />

          <TouchableOpacity onPress={onPressHeaderDate}>
            <Text style={styles.currentDateText}>{currentDateText}</Text>
          </TouchableOpacity>

          <ArrowButton onPress={onPressRightArrow} iconName="chevron-forward" />
        </View>

        {/* 일 ~ 토 */}
        <View style={styles.row}>
          {[0, 1, 2, 3, 4, 5, 6].map((day) => {
            const dayText = getDayText(day);
            const color = getDayColor(day);

            return (
              <Column key={`day-${day}`} text={dayText} color={color} opacity={1} disabled={true} />
            );
          })}
        </View>
      </View>
    );
  };

  const renderItem = ({ item: date }: { item: Dayjs }) => {
    const dateText = dayjs(date).get('date');
    const day = dayjs(date).get('day');
    const color = getDayColor(day);
    const isCurrentMonth = dayjs(date).isSame(selectedDate, 'month');
    const onPress = () => onPressDate(date);
    const isSelected = dayjs(date).isSame(selectedDate, 'date');
    const hasTodo = todoList.find((todo) => dayjs(todo.date).isSame(dayjs(date), 'date'));

    return (
      <Column
        onPress={onPress}
        text={dateText}
        color={color}
        opacity={isCurrentMonth ? 1 : 0.4}
        isSelected={isSelected}
        hasTodo={!!hasTodo}
      />
    );
  };

  return (
    <FlatList
      keyExtractor={(_, index) => `colunm-${index}`}
      scrollEnabled={false}
      data={columns}
      renderItem={renderItem}
      numColumns={7}
      ListHeaderComponent={ListHeaderComponent}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  currentDateText: {
    fontSize: 20,
    color: '#404040',
  },
  row: {
    flexDirection: 'row',
  },
  buttonContainer: {
    width: columnSize,
    height: columnSize,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    borderRadius: columnSize / 2,
  },
  buttonText: {
    fontWeight: 'normal',
  },
  arrowButtonContainer: {
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
});

const isSelectedStyles = {
  buttonContainer: [styles.buttonContainer, { backgroundColor: '#c2c2c2' }],
};
const hasTodoStyles = {
  buttonText: [styles.buttonText, { fontWeight: 'bold' as const }],
};

export default Calendar;
