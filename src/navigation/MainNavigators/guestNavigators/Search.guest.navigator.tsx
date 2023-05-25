/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import {
  createStackNavigator,
  StackNavigationProp,
} from '@react-navigation/stack';
import SearchPage from '../../../screens/main/guest/searchScreen/search.guest.page';
import Header from '../../../components/Header';
import NotificationPage from '../../../screens/main/guest/homeScreen/notification/notification.guest.page';
import MusicSheetPage from '../../../screens/main/guest/guestFavoriteScreen/musicSheet.page';
import MusicPlayPage from '../../../screens/main/guest/guestFavoriteScreen/musicPlay.page';
import PreviewPage from '../../../screens/main/guest/searchScreen/preview.page';

export type SearchGuestStackParams = {
  SearchPage: undefined;
  NotificationPage: undefined;
};

const SearchGuestStack = createStackNavigator();

export type HomeGuestStackProps = StackNavigationProp<SearchGuestStackParams>;

export const SearchGuestNavigator = () => {
  return (
    <SearchGuestStack.Navigator initialRouteName="GuestSearchPage">
      <SearchGuestStack.Screen
        name="GuestSearchPage"
        component={SearchPage}
        options={{
          headerShown: false,
        }}
      />
      <SearchGuestStack.Screen
        name="NotificationPage"
        component={NotificationPage}
        options={{
          header: () => <Header title="Мэдэгдэл" />,
        }}
      />
      <SearchGuestStack.Screen
        name="MusicSheetPage"
        component={MusicSheetPage}
        options={
          {
            // header: () => <Header title="Мэдэгдэл" />,
            // headerShown: false,
          }
        }
      />
      <SearchGuestStack.Screen
        name="MusicPlayPage"
        component={MusicPlayPage}
        options={
          {
            // header: () => <Header title="Мэдэгдэл" />,
          }
        }
      />
      <SearchGuestStack.Screen
        name="PreviewPage"
        component={PreviewPage}
        options={{
          headerShown: false,
        }}
      />
    </SearchGuestStack.Navigator>
  );
};
