/* eslint-disable react-native/no-inline-styles */
import React, {useEffect} from 'react';
import {View, StatusBar, ImageBackground} from 'react-native';
import {UseGlobalStyles} from '../../theme';
import {useStore} from '../../context/app.provider';
import {AppActionTypes} from '../../context/types';
import {APP_STACK} from '../../navigation/screenTypes';
import {images} from '../../theme/variables';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SplashPage = () => {
  const styles = UseGlobalStyles();
  const {appDispatch} = useStore();

  useEffect(() => {
    const timer = setTimeout(async () => {
      const token = await AsyncStorage.getItem('token');
      if (token) {
        appDispatch({
          type: AppActionTypes.SWITCH_STACK,
          payload: APP_STACK.GUEST,
        });
      } else {
        appDispatch({
          type: AppActionTypes.SWITCH_STACK,
          payload: APP_STACK.APP_INTRO,
        });
      }
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.splashContainer}>
      <StatusBar backgroundColor="#eee" barStyle="dark-content" />
      <ImageBackground
        source={images.music}
        style={{
          height: '100%',
          width: '100%',
          flex: 1,
          position: 'absolute',
          zIndex: -1,
          elevation: -1,
        }}
      />
      {/* <View style={styles.flex1AllCenter}>
        <FastImage source={images.shi} style={styles.splashPageImage} />
      </View> */}
    </View>
  );
};

export default SplashPage;
