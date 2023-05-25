import React from 'react';

import {
  createStackNavigator,
  StackNavigationProp,
  TransitionPresets,
} from '@react-navigation/stack';
import LoginPage from '../screens/auth/login/login.page';
import RegisterPage from '../screens/auth/register/register.page';

export type AuthStackParams = {
  LoginPage: undefined;
  RegisterPage: undefined;
};

const AuthStack = createStackNavigator<AuthStackParams>();

export type AuthStackProps = StackNavigationProp<AuthStackParams>;

const AuthNavigator = () => {
  return (
    <AuthStack.Navigator
      initialRouteName="LoginPage"
      screenOptions={{presentation: 'card'}}>
      <AuthStack.Screen
        name="LoginPage"
        component={LoginPage}
        options={{
          headerShown: false,
        }}
      />
      <AuthStack.Screen
        name="RegisterPage"
        component={RegisterPage}
        options={{
          headerShown: false,
        }}
      />
    </AuthStack.Navigator>
  );
};

export default AuthNavigator;
