import React, { useState } from 'react';
import { StyleProp, TouchableOpacity, ViewStyle } from 'react-native';
import { COLOR, DarkColor, LightClor } from '../../util/color';
import Icon from '../ui/Icons';

const useBookmark = (initialIsBookMarked: boolean) => {
  const [isBookMarked, setIsBookMarked] = useState(initialIsBookMarked);
  const toggleIsBookMarked = () => setIsBookMarked(!isBookMarked);

  return {
    isBookMarked,
    toggleIsBookMarked,
  };
};

const BookmarkButton: React.FC<{
  isBookmarked: boolean;
  size: number;
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
  NEWCOLOR: LightClor | DarkColor;
}> = ({ onPress, isBookmarked: isBookmarkedProp, style, size, NEWCOLOR }) => {
  const { isBookMarked, toggleIsBookMarked } = useBookmark(isBookmarkedProp);

  return (
    <TouchableOpacity
      style={style}
      onPress={() => {
        toggleIsBookMarked();
        onPress();
      }}>
      <Icon name="star" size={size} color={isBookMarked ? COLOR.YELLOW : NEWCOLOR.GRAY_1_GRAY_4} />
    </TouchableOpacity>
  );
};

export default BookmarkButton;
