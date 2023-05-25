/* eslint-disable react/no-unstable-nested-components */
import React, {useState} from 'react';
import {View, useWindowDimensions} from 'react-native';
import {Button, useTheme} from 'native-base';
import {TabView, SceneMap} from 'react-native-tab-view';

import {AppIntroContainer} from './components';
import {useStore} from '../../context/app.provider';
import {UseGlobalStyles} from '../../theme';
import {images} from '../../theme/variables';
import {AppActionTypes} from '../../context/types';
import {APP_STACK} from '../../navigation/screenTypes';

const AppIntroPage = () => {
  const [index, setIndex] = useState(0);
  const {colors}: any = useTheme();
  const {appDispatch} = useStore();
  const layout = useWindowDimensions();
  const styles = UseGlobalStyles();

  const [routes] = useState([
    {key: 'paymentWaiting'},
    {key: 'active'},
    {key: 'expired'},
  ]);

  const renderScene = SceneMap({
    paymentWaiting: () => (
      <AppIntroContainer
        bg="#FEEBEE"
        title="Welcome!"
        desc="Welcome to AI MUSIC, where you become the composer!"
        img={images.angel}
      />
    ),
    active: () => (
      <AppIntroContainer
        bg="#2B6DA2"
        title="The ultimate destination for music lovers! "
        desc="I'm passionate about music and believe that everyone should have the opportunity to experience the joy of creating and sharing their own compositions."
        img={images.sky}
      />
    ),
    expired: () => (
      <AppIntroContainer
        bg="#EAF9F5"
        title="Let's get started!"
        desc="Get ready to experience music in a whole new way!"
        img={images.app}
      />
    ),
  });

  const onSuccess = async () => {
    appDispatch({
      type: AppActionTypes.SWITCH_STACK,
      payload: APP_STACK.AUTH,
    });
  };

  const renderTabBar = (props: any) => {
    return (
      <View style={styles.appIntroSliderContainer}>
        {index !== 2 ? (
          <>
            <Button
              variant="text"
              p={0}
              _text={{
                color: colors.grayColor,
              }}
              zIndex={1}
              onPress={() => {
                setIndex(2);
              }}>
              Skip
            </Button>
            <View style={styles.appIntroDotContainer}>
              {props.navigationState.routes.map((route: any, i: number) => {
                const dotStyle = (idx: any) => [
                  styles.appIntroSliderDot,
                  idx === i && styles.appIntroSliderDotSelected,
                ];
                return <View key={`intro${i}`} style={dotStyle(index)} />;
              })}
            </View>
            <Button
              onPress={() => {
                setIndex(index + 1);
              }}>
              Next
            </Button>
          </>
        ) : (
          <Button flex={1} bg={colors.success[500]} onPress={() => onSuccess()}>
            Let's gooo!
          </Button>
        )}
      </View>
    );
  };

  return (
    <TabView
      tabBarPosition="bottom"
      navigationState={{index, routes}}
      renderScene={renderScene}
      onIndexChange={setIndex}
      renderTabBar={renderTabBar}
      style={styles.mainContainer}
      initialLayout={{width: layout.width}}
    />
  );
};

export default AppIntroPage;
