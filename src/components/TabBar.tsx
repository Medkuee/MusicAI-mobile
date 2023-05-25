/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Text, View} from 'react-native';
import {useTheme} from 'native-base';
import {UseGlobalStyles} from '../theme';
import Icon from './Icon';

type TabBarPropsType = {
  focused: boolean;
  icon: string;
  name: string;
};

const TabBar = ({focused = false, icon = '', name = ''}: TabBarPropsType) => {
  const {colors} = useTheme();
  const styles = UseGlobalStyles();
  return icon === 'wallet' ? (
    <View style={styles.flex1AllCenter}>
      <View style={[styles.walletStyle]}>
        <Icon size={22} color="#fff" name="wallet" />
      </View>
    </View>
  ) : (
    <View style={styles.flex1AllCenter}>
      <View style={styles.tabIconContainer}>
        <Icon size={24} name={icon} color={focused ? '#132A6B' : '#BFBFBF'} />
        <Text
          style={{
            fontSize: 12,
            marginTop: 3,
            color: focused ? '#132A6B' : '#BFBFBF',
          }}>
          {name || ''}
        </Text>
      </View>
    </View>
  );
};

export default TabBar;
