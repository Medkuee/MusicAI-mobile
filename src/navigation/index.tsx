import React from 'react';
import {View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {UseGlobalStyles} from '../theme';
import {RootNavigator} from './Root.navigator';

const AppNavigation = () => {
  const styles = UseGlobalStyles();

  return (
    <View style={styles.mainContainer}>
      <NavigationContainer>
        <RootNavigator />
      </NavigationContainer>
    </View>
  );
};

export default AppNavigation;
