import React from 'react';
import {Animated} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome5';
const AnimatedIcon = Animated.createAnimatedComponent(Icon);

type IconProps = {
  name: string;
  size?: number;
  color?: any;
  style?: any;
  solid?: boolean;
};

const AppIcon = ({
  name,
  size = 24,
  color = '#fff',
  style,
  solid = true,
}: IconProps) => {
  return (
    <AnimatedIcon
      name={name}
      color={color}
      size={size}
      style={style}
      solid={solid}
    />
  );
};

export default AppIcon;
