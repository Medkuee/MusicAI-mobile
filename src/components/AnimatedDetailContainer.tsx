import React, {useState} from 'react';
import {useTheme, IconButton} from 'native-base';
import {Animated, SafeAreaView, View, StatusBar, Text} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import AppIcon from './Icon';
import {UseGlobalStyles} from '../theme';
import {useStore} from '../context/app.provider';

const AnimatedIconButton = Animated.createAnimatedComponent(IconButton);

type AnimatedDetailContainerProps = {
  title?: string;
  menus?: boolean;
  backColor?: string;
  dark?: boolean;
  isBackButton?: boolean;
  isBackPress?: boolean;
  backButtonPress?: () => void;
  isLiked?: boolean;
  likeButtonPress?: () => void;
  children: any;
};
const AnimatedDetailContainer = ({
  title = undefined,
  menus = true,
  backColor = 'lightGrayColor',
  dark = false,
  isBackButton = true,
  isBackPress = false,
  backButtonPress = () => {},
  isLiked = false,
  likeButtonPress = () => {},
  children,
}: AnimatedDetailContainerProps) => {
  const {
    appState: {colorMode},
    userState: {},
  } = useStore();

  const [animationValue] = useState(new Animated.Value(0));
  const {colors}: any = useTheme();
  const style = UseGlobalStyles();

  const navigation = useNavigation();

  const backgroundInterpolate = animationValue.interpolate({
    inputRange: [0, 120, 150],
    outputRange: [
      'transparent',
      'transparent',
      dark ? colors.white : colors.primaryDarkChange,
    ],
    extrapolate: 'clamp',
  });

  const borderColorInterpolate = animationValue.interpolate({
    inputRange: [0, 120, 150],
    outputRange: ['transparent', 'transparent', colors.borderColor],
    extrapolate: 'clamp',
  });

  const textOpacity = animationValue.interpolate({
    inputRange: [0, 120, 150],
    outputRange: [0, 0, 1],
    extrapolate: 'clamp',
  });

  const backgroundStyle = {
    backgroundColor: backgroundInterpolate,
    borderColor: borderColorInterpolate,
  };

  const textOpacityStyle = {
    opacity: textOpacity,
  };

  const subMenuColor = animationValue.interpolate({
    inputRange: [0, 150],
    outputRange: ['white', colors.primaryDarkChange],
    extrapolate: 'clamp',
  });

  const subMenuTextColor = animationValue.interpolate({
    inputRange: [0, 150],
    outputRange: [colors.primary[500], 'white'],
    extrapolate: 'clamp',
  });

  return (
    <View
      style={[style.animatedContainer, {backgroundColor: colors[backColor]}]}>
      <Animated.View style={[backgroundStyle, style.animatedHeader]}>
        <SafeAreaView>
          <StatusBar
            backgroundColor={dark ? colors.white : colors.primaryDarkChange}
            barStyle={`${
              dark ? (colorMode === 'dark' ? 'light' : 'dark') : 'light'
            }-content`}
          />
          <View style={style.animatedRowContainer}>
            <View style={style.animatedBox}>
              {isBackButton && (
                <IconButton
                  zIndex={1}
                  h="40px"
                  w="40px"
                  icon={
                    <View style={style.flex1AllCenter}>
                      <AppIcon
                        size={24}
                        name="chevron-left"
                        color={dark ? colors.primaryWhiteChange : 'white'}
                      />
                    </View>
                  }
                  p={0}
                  borderRadius="full"
                  _hover={{
                    bg: 'white.600:alpha.20',
                  }}
                  _pressed={{
                    bg: 'white.600:alpha.20',
                  }}
                  onPress={() => {
                    if (isBackPress) {
                      backButtonPress();
                    } else {
                      navigation.goBack();
                    }
                  }}
                />
              )}
            </View>
            <Animated.View
              style={[
                style.animatedHeaderTitle,
                !dark && style.animatedHeaderTitleEvent,
                textOpacityStyle,
              ]}>
              <Text
                style={[
                  style.animatedHeaderTitleText,
                  {color: dark ? colors.black : colors.whiteDark},
                ]}
                numberOfLines={1}>
                {title}
              </Text>
            </Animated.View>
            {menus && (
              <View style={style.flexRow}>
                <AnimatedIconButton
                  zIndex={1}
                  mr="20px"
                  h="40px"
                  w="40px"
                  marginRight={30}
                  style={{backgroundColor: subMenuColor}}
                  icon={
                    <View style={style.flex1AllCenter}>
                      <AppIcon
                        size={22}
                        name="heart"
                        color={subMenuTextColor}
                        solid={isLiked}
                      />
                    </View>
                  }
                  p={0}
                  borderRadius="full"
                  _pressed={{
                    bg: 'light.200',
                  }}
                  onPress={likeButtonPress}
                />
                <AnimatedIconButton
                  zIndex={-1}
                  mr="5px"
                  h="40px"
                  w="40px"
                  onPress={() => navigation.navigate('CartGuestPage')}
                  style={{backgroundColor: subMenuColor}}
                  icon={
                    <View style={style.flex1AllCenter}>
                      <AppIcon
                        size={22}
                        name="shopping-cart"
                        color={subMenuTextColor}
                      />
                    </View>
                  }
                  p={0}
                  borderRadius="full"
                  _pressed={{
                    bg: 'light.200',
                  }}
                />
                <AnimatedIconButton
                  zIndex={1}
                  h="40px"
                  w="40px"
                  style={{backgroundColor: subMenuColor}}
                  icon={
                    <View style={style.flex1AllCenter}>
                      <AppIcon
                        size={22}
                        name="share-alt"
                        color={subMenuTextColor}
                      />
                    </View>
                  }
                  p={0}
                  borderRadius="full"
                  _pressed={{
                    bg: 'light.200',
                  }}
                />
              </View>
            )}
          </View>
        </SafeAreaView>
      </Animated.View>
      <View style={style.animatedContainer}>
        <KeyboardAwareScrollView
          contentContainerStyle={style.flexGrowStyle}
          scrollEventThrottle={16}
          bounces={false}
          onScroll={Animated.event(
            [{nativeEvent: {contentOffset: {y: animationValue}}}],
            {useNativeDriver: false},
          )}>
          {children}
        </KeyboardAwareScrollView>
      </View>
    </View>
  );
};

export default AnimatedDetailContainer;
