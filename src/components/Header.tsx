/* eslint-disable react-native/no-inline-styles */
// import libraries
import React from 'react';
import {Image, SafeAreaView, View, Text, StatusBar} from 'react-native';
import {IconButton, useTheme} from 'native-base';
import {useNavigation} from '@react-navigation/native';
import {useStore} from '../context/app.provider';
import {UseGlobalStyles} from '../theme';
import Icon from './Icon';
import {images} from '../theme/variables';

const Header = ({home = false, title = '', noBack = false, doMore = false}) => {
  const {colors}: any = useTheme();
  const navigation: any = useNavigation();
  const {
    appState: {colorMode},
    userState: {user},
  } = useStore();
  const style = UseGlobalStyles();

  return (
    <SafeAreaView
      style={[
        {
          backgroundColor: '#9D75EA',
        },
        !home && style.headerShadow,
      ]}>
      <StatusBar backgroundColor={'#fff'} />
      <View style={style.headerContainer}>
        {!home && !noBack && (
          <IconButton
            h="40px"
            w="40px"
            icon={
              <View style={style.flex1AllCenter}>
                <Icon
                  size={22}
                  name={home ? 'bars' : 'chevron-left'}
                  color={home ? '#fff' : colors.primaryWhiteChange}
                />
              </View>
            }
            borderRadius="full"
            _pressed={{
              bg: 'white.500:alpha.20',
            }}
            onPress={() => navigation.goBack()}
            zIndex={1}
          />
        )}
        {home ? (
          <View style={style.headerHomeContainer}>
            <Image
              source={images.sky}
              style={style.headerLogo}
              resizeMode="contain"
            />
            <Text style={style.headerHomeTitle}>{title}</Text>
          </View>
        ) : (
          <View style={style.headerTitle}>
            <Text numberOfLines={1} style={style.headerTitleText}>
              {title}
            </Text>
          </View>
        )}

        {home && (
          <View style={style.flexRowCenter}>
            <IconButton
              h="40px"
              w="40px"
              icon={
                <View style={{flex: 1}}>
                  <View style={style.flex1AllCenter}>
                    <Icon size={22} name="bell" color="white" />
                  </View>
                  <View style={style.statusBadge} />
                </View>
              }
              borderRadius="full"
              _hover={{
                bg: 'white.600:alpha.20',
              }}
              _pressed={{
                bg: 'white.600:alpha.20',
              }}
              onPress={() => navigation.navigate('NotificationPage')}
            />
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

export default Header;
