/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import {
  createStackNavigator,
  StackNavigationProp,
} from '@react-navigation/stack';
import MoreGuestPage from '../../../screens/main/guest/moreScreen/more.guest.page';
import Header from '../../../components/Header';
import NotificationPage from '../../../screens/main/guest/homeScreen/notification/notification.guest.page';

export type MoreGuestStackParams = {
  NotificationPage: undefined;
  GuestMorePage: undefined;
};

const GuestMoreStack = createStackNavigator<MoreGuestStackParams>();

export type MoreGuestStackProps = StackNavigationProp<MoreGuestStackParams>;

export const MoreGuestNavigator = () => {
  return (
    <GuestMoreStack.Navigator initialRouteName="GuestMorePage">
      <GuestMoreStack.Screen
        name="GuestMorePage"
        component={MoreGuestPage}
        options={{
          headerShown: false,
        }}
      />

      <GuestMoreStack.Screen
        name="NotificationPage"
        component={NotificationPage}
        options={{
          header: () => <Header title="Мэдэгдэл" />,
        }}
      />
    </GuestMoreStack.Navigator>
  );
};
