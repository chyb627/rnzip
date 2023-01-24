/* eslint-disable react-native/no-inline-styles */
import dayjs, { Dayjs } from 'dayjs';
import React from 'react';
import { FlatList, Text, TouchableOpacity, View } from 'react-native';
import { getDayColor, getDayText } from '../../util/util';
import { Icon } from '../UI/Icons';

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
  return (
    <TouchableOpacity
      disabled={disabled}
      onPress={onPress}
      style={{
        width: columnSize,
        height: columnSize,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: isSelected ? '#c2c2c2' : 'transparent',
        borderRadius: columnSize / 2,
      }}>
      <Text style={{ color, opacity, fontWeight: hasTodo ? 'bold' : 'normal' }}>
        {text}
      </Text>
    </TouchableOpacity>
  );
};

const ArrowButton: React.FC<{
  onPress: () => void;
  iconName: string;
}> = ({ onPress, iconName }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{ paddingHorizontal: 20, paddingVertical: 15 }}>
      <Icon name={iconName} size={20} color="#404040" />
    </TouchableOpacity>
  );
};

export const Calendar = ({
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
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <ArrowButton onPress={onPressLeftArrow} iconName="chevron-back" />

          <TouchableOpacity onPress={onPressHeaderDate}>
            <Text style={{ fontSize: 20, color: '#404040' }}>
              {currentDateText}
            </Text>
          </TouchableOpacity>

          <ArrowButton onPress={onPressRightArrow} iconName="chevron-forward" />
        </View>

        {/* 일 ~ 토 */}
        <View style={{ flexDirection: 'row' }}>
          {[0, 1, 2, 3, 4, 5, 6].map((day) => {
            const dayText = getDayText(day);
            const color = getDayColor(day);

            return (
              <Column
                key={`day-${day}`}
                text={dayText}
                color={color}
                opacity={1}
                disabled={true}
              />
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
    const hasTodo = todoList.find((todo) =>
      dayjs(todo.date).isSame(dayjs(date), 'date'),
    );

    return (
      <Column
        onPress={onPress}
        text={dateText}
        color={color}
        opacity={isCurrentMonth ? 1 : 0.4}
        isSelected={isSelected}
        hasTodo={hasTodo}
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
