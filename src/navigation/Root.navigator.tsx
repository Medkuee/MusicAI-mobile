import React from 'react';

import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {APP_STACK, RootStackParamList} from './screenTypes';

import AppIntroNavigator from './AppIntro.navigator';
import AuthNavigator from './Auth.navigator';
import {TabGuestNavigator} from './MainNavigators/Tab.guest.navigator';
import SplashPage from '../screens/splashScreen/splash.page';
import {useStore} from '../context/app.provider';

const RootStack = createNativeStackNavigator<RootStackParamList>();

export const RootNavigator = () => {
  const {
    appState: {newStack},
  } = useStore();

  switch (newStack) {
    case APP_STACK.SPLASH:
      return (
        <RootStack.Navigator>
          <RootStack.Screen
            name={APP_STACK.SPLASH}
            component={SplashPage}
            options={{headerShown: false, animation: 'fade'}}
          />
        </RootStack.Navigator>
      );
    case APP_STACK.APP_INTRO:
      return (
        <RootStack.Navigator>
          <RootStack.Screen
            name={APP_STACK.APP_INTRO}
            component={AppIntroNavigator}
            options={{headerShown: false, animation: 'fade'}}
          />
        </RootStack.Navigator>
      );
    case APP_STACK.AUTH:
      return (
        <RootStack.Navigator>
          <RootStack.Screen
            name={APP_STACK.AUTH}
            component={AuthNavigator}
            options={{headerShown: false, animation: 'fade'}}
          />
        </RootStack.Navigator>
      );
    case APP_STACK.GUEST:
      return (
        <RootStack.Navigator>
          <RootStack.Screen
            name={APP_STACK.GUEST}
            component={TabGuestNavigator}
            options={{headerShown: false, animation: 'fade'}}
          />
        </RootStack.Navigator>
      );
    default:
      return <></>;
  }
};
