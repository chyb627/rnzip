import React from 'react';
import { StyleSheet, View } from 'react-native';
import Button from '../ui/Button';
import Icon, { TypeIconName } from '../ui/Icons';
import Typography from '../ui/Typography';

const ContectButton: React.FC<{
  content: string;
  backgroundColor: string;
  iconName?: TypeIconName;
  contentColor?: string;
}> = ({ content, backgroundColor, iconName, contentColor }) => {
  return (
    <Button
      onPress={() => {
        console.log(`clicked button ${content}`);
      }}>
      <View
        style={[
          styles.ContectButtonContainer,
          {
            backgroundColor,
          },
        ]}>
        {iconName && (
          <View style={styles.ContectButtonIconContainer}>
            <Icon name={iconName} size={16} color={contentColor ?? '#fff'} />
          </View>
        )}

        <Typography fontSize={16} color={contentColor ?? '#fff'}>
          {content}
        </Typography>
      </View>
    </Button>
  );
};

export default ContectButton;

const styles = StyleSheet.create({
  ContectButtonContainer: {
    marginHorizontal: 24,
    marginBottom: 12,
    paddingVertical: 12,
    borderRadius: 24 / 3,
    justifyContent: 'center',
    flexDirection: 'row',
  },
  ContectButtonIconContainer: {
    marginRight: 8,
  },
});
