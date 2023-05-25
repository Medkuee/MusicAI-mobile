/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import {
  createStackNavigator,
  StackNavigationProp,
} from '@react-navigation/stack';
import WalletGuestPage from '../../../screens/main/guest/walletScreen/wallet/wallet.guest.page';
import Header from '../../../components/Header';

type RootStackParamList = {
  WalletGuestPage: undefined;
};

export type WalletGuestScreenProp = StackNavigationProp<
  RootStackParamList,
  'WalletGuestPage'
>;

const WalletGuestStack = createStackNavigator<RootStackParamList>();

export type WalletGuestNavigationProps =
  StackNavigationProp<RootStackParamList>;

export const WalletGuestNavigator = () => {
  return (
    <WalletGuestStack.Navigator initialRouteName="WalletGuestPage">
      <WalletGuestStack.Screen
        name="WalletGuestPage"
        component={WalletGuestPage}
        options={{
          header: () => <Header home title="Хэтэвч" />,
        }}
      />
    </WalletGuestStack.Navigator>
  );
};
