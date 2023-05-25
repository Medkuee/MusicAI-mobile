/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import {
  createStackNavigator,
  StackNavigationProp,
} from '@react-navigation/stack';
import Header from '../../../components/Header';
import GuestFavoriteGuestPage from '../../../screens/main/guest/guestFavoriteScreen/guestFavorite.guest.page';
import NotificationPage from '../../../screens/main/guest/homeScreen/notification/notification.guest.page';
import MusicSheetPage from '../../../screens/main/guest/guestFavoriteScreen/musicSheet.page';
import MusicPlayPage from '../../../screens/main/guest/guestFavoriteScreen/musicPlay.page';

export type GuestFavoriteStackParams = {
  GuestFavoritePage: undefined;
  NotificationPage: undefined;
};

const GuestFavoriteStack = createStackNavigator();

export type GuestFavoriteStackProps =
  StackNavigationProp<GuestFavoriteStackParams>;

export const FavoriteGuestNavigator = () => {
  return (
    <GuestFavoriteStack.Navigator initialRouteName="GuestFavoritePage">
      <GuestFavoriteStack.Screen
        name="GuestFavoritePage"
        component={GuestFavoriteGuestPage}
        options={{
          headerShown: false,
        }}
      />

      <GuestFavoriteStack.Screen
        name="MusicSheetPage"
        component={MusicSheetPage}
        options={{
          // header: () => <Header title="Мэдэгдэл" />,
          headerShown: false,
        }}
      />
      <GuestFavoriteStack.Screen
        name="MusicPlayPage"
        component={MusicPlayPage}
        options={
          {
            // header: () => <Header title="Мэдэгдэл" />,
          }
        }
      />
      <GuestFavoriteStack.Screen
        name="NotificationPage"
        component={NotificationPage}
        options={{
          header: () => <Header title="Мэдэгдэл" />,
        }}
      />
    </GuestFavoriteStack.Navigator>
  );
};
