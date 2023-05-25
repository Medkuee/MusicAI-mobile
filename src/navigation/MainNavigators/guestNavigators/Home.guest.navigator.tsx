/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import {
  createStackNavigator,
  StackNavigationProp,
} from '@react-navigation/stack';
import Header from '../../../components/Header';
import {HomeGuestPage} from '../../../screens/main/guest/homeScreen/home/home.guest.page';
import NotificationPage from '../../../screens/main/guest/homeScreen/notification/notification.guest.page';
import PreviewPage from '../../../screens/main/guest/searchScreen/preview.page';
import MusicSheetPage from '../../../screens/main/guest/guestFavoriteScreen/musicSheet.page';
import MusicPlayPage from '../../../screens/main/guest/guestFavoriteScreen/musicPlay.page';

export type HomeGuestStackParams = {
  HomeGuestPage: undefined;
  NotificationPage: undefined;
  PreviewPage: undefined;
  MusicSheetPage: undefined;
  MusicPlayPage: undefined;
};

const HomeGuestStack = createStackNavigator<HomeGuestStackParams>();

export type HomeGuestStackProps = StackNavigationProp<HomeGuestStackParams>;

export const HomeGuestNavigator = () => {
  return (
    <HomeGuestStack.Navigator initialRouteName="HomeGuestPage">
      <HomeGuestStack.Screen
        name="HomeGuestPage"
        component={HomeGuestPage}
        options={{
          headerShown: false,
        }}
      />
      <HomeGuestStack.Screen
        name="NotificationPage"
        component={NotificationPage}
        options={{
          header: () => <Header title="Мэдэгдэл" />,
        }}
      />
      <HomeGuestStack.Screen
        name="PreviewPage"
        component={PreviewPage}
        options={{
          headerShown: false,
        }}
      />
      <HomeGuestStack.Screen
        name="MusicSheetPage"
        component={MusicSheetPage}
        options={
          {
            // header: () => <Header title="Мэдэгдэл" />,
            // headerShown: false,
          }
        }
      />
      <HomeGuestStack.Screen
        name="MusicPlayPage"
        component={MusicPlayPage}
        options={
          {
            // header: () => <Header title="Мэдэгдэл" />,
          }
        }
      />
    </HomeGuestStack.Navigator>
  );
};
