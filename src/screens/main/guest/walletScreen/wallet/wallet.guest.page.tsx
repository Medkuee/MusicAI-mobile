// import libraries
import React from 'react';
import {Text} from 'native-base';
import {ScrollView} from 'react-native';
import {useStore} from '../../../../../context/app.provider';
import {UseGlobalStyles} from '../../../../../theme';

const WalletGuestPage = () => {
  const {
    userState: {user},
  } = useStore();
  const styles = UseGlobalStyles();

  return (
    <ScrollView bounces={false}>
      <Text>HI</Text>
    </ScrollView>
  );
};

export default WalletGuestPage;
