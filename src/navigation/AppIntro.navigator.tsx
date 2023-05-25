import React from 'react';

import {createNativeStackNavigator} from '@react-navigation/native-stack';
import AppIntroPage from '../screens/appIntro/appIntro.page';

const AppIntroStack = createNativeStackNavigator();

const AppIntroNavigator = () => {
  return (
    <AppIntroStack.Navigator initialRouteName="AppIntroPage">
      <AppIntroStack.Screen
        name="AppIntroPage"
        component={AppIntroPage}
        options={{
          headerShown: false,
        }}
      />
    </AppIntroStack.Navigator>
  );
};

export default AppIntroNavigator;
