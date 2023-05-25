/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import {SafeAreaView, View} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {getFocusedRouteNameFromRoute} from '@react-navigation/native';

import {HomeGuestNavigator} from './guestNavigators/Home.guest.navigator';
import {FavoriteGuestNavigator} from './guestNavigators/Favorite.guest.navigator';
import {SearchGuestNavigator} from './guestNavigators/Search.guest.navigator';
import {MoreGuestNavigator} from './guestNavigators/More.guest.navigator';
import {WalletGuestNavigator} from './guestNavigators/Wallet.guest.navigator';
import TabBar from '../../components/TabBar';
import {UseGlobalStyles} from '../../theme';

const Tab = createBottomTabNavigator();

const getTabBarVisible = (route: any) => {
  const routeName = getFocusedRouteNameFromRoute(route) || 'HomeGuestPage';
  if (
    routeName !== 'HomeGuestPage' &&
    routeName !== 'GuestSearchPage' &&
    routeName !== 'GuestFavoritePage' &&
    routeName !== 'WalletGuestPage' &&
    routeName !== 'GuestMorePage'
  ) {
    return 'none';
  }
  return 'flex';
};

export const TabGuestNavigator = () => {
  const styles = UseGlobalStyles();

  return (
    <View style={styles.mainContainer}>
      <View style={styles.overflowHiddenContainer}>
        <Tab.Navigator
          initialRouteName="GuestHome"
          screenOptions={({route}) => ({
            tabBarShowLabel: false,
            tabBarStyle: [
              {
                display: getTabBarVisible(route),
              },
              styles.tabBarContainerStyle,
            ],
          })}>
          <Tab.Screen
            name="HomeGuestNavigator"
            component={HomeGuestNavigator}
            options={() => ({
              title: 'Нүүр',
              headerShown: false,
              tabBarIcon: ({focused}) => (
                <TabBar icon="home" name="Home" focused={focused} />
              ),
            })}
          />
          <Tab.Screen
            name="SearchGuestNavigator"
            component={SearchGuestNavigator}
            options={() => ({
              title: 'Хайх',
              headerShown: false,
              tabBarIcon: ({focused}) => (
                <TabBar icon="search" name="Search" focused={focused} />
              ),
            })}
          />
          <Tab.Screen
            name="FavoriteGuestNavigator"
            component={FavoriteGuestNavigator}
            options={() => ({
              title: 'Миний',
              headerShown: false,
              tabBarIcon: ({focused}) => (
                <TabBar icon="heart" name="Fav" focused={focused} />
              ),
            })}
          />
          <Tab.Screen
            name="MoreGuestNavigator"
            component={MoreGuestNavigator}
            options={() => ({
              title: 'Профайл',
              headerShown: false,
              tabBarIcon: ({focused}) => (
                <TabBar icon="user" name="Profile" focused={focused} />
              ),
            })}
          />
        </Tab.Navigator>
      </View>
      <SafeAreaView />
    </View>
  );
};
