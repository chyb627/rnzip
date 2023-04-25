import React from 'react';
import Badge from './Badge';
import Icon, { TypeIconName } from './Icons';

const TabIcon: React.FC<{
  visibleBadge?: boolean;
  iconName: TypeIconName;
  iconColor: string;
}> = (props) => {
  if (props.visibleBadge) {
    return (
      <Badge>
        <Icon name={props.iconName} size={20} color={props.iconColor} />
      </Badge>
    );
  }

  return <Icon name={props.iconName} size={20} color={props.iconColor} />;
};

export default TabIcon;
