import {extendTheme} from 'native-base';

const defaultColors = {
  // Default
  black: '#000',
  white: '#fff',
  whiteOpacity: '#ffffff24',
  whiteDark: '#fff',
  whiteSecond: '#fff',
  // App
  primaryDarkChange: '#F54141',
  primaryWhiteChange: '#F54141',
  lightGrayColor: '#FBFBFB',
  lightGrayColorDark: '#FBFBFB',
  borderColor: '#DEDEDE',
  borderDarkColor: '#DEDEDE',
  grayColor: '#747688',
  redBackColor: '#FFF9F9',
  shadowColor: '#ADAFBB',
  /// Global
  primary: {
    50: '#fef2f2',
    100: '#fee2e2',
    200: '#fecaca',
    300: '#fca5a5',
    400: '#f87171',
    500: '#F54141',
    600: '#dc2626',
    700: '#b91c1c',
    800: '#991b1b',
    900: '#7f1d1d',
  },
  secondary: {
    50: '#FACFFF',
    100: '#E0B7FF',
    200: '#C79FFF',
    300: '#AE88FA',
    400: '#9572E1',
    500: '#050261',
    600: '#6547B1',
    700: '#4D3299',
    800: '#351F82',
    900: '#190B6C',
  },
  success: {
    50: '#EAF9F5',
    100: '#7EFFDD',
    200: '#6CF5CD',
    300: '#59E4BD',
    400: '#45D3AD',
    500: '#2FC39E',
    600: '#0CB28E',
    700: '#00A27F',
    800: '#009270',
    900: '#008362',
  },
  warning: {
    50: '#FFD772',
    100: '#FFC763',
    200: '#FFB754',
    300: '#FFA744',
    400: '#FF9834',
    500: '#F38823',
    600: '#E27A0F',
    700: '#CF6A00',
    800: '#BE5D00',
    900: '#AC4E00',
  },
};

const darkColors = {
  // Default
  black: '#fff',
  white: '#26292b',
  whiteOpacity: '#ffffff1A',
  whiteDark: '#fff',
  whiteSecond: '#2e3239',
  // App
  primaryDarkChange: '#26292b',
  primaryWhiteChange: '#fff',
  lightGrayColor: '#2e3239',
  lightGrayColorDark: '#1F2227',
  borderColor: '#2e3239',
  borderDarkColor: '#26292b',
  grayColor: '#f8f8f8',
  redBackColor: '#FFF9F9',
  shadowColor: 'transparent',
  /// Global
  primary: {
    50: '#fef2f2',
    100: '#fee2e21F',
    200: '#fecaca',
    300: '#fca5a5',
    400: '#f87171',
    500: '#F54141',
    600: '#dc2626',
    700: '#b91c1c',
    800: '#991b1b',
    900: '#7f1d1d',
  },
  secondary: {
    50: '#FACFFF',
    100: '#E0B7FF',
    200: '#C79FFF',
    300: '#AE88FA',
    400: '#9572E1',
    500: '#050261',
    600: '#6547B1',
    700: '#4D3299',
    800: '#351F82',
    900: '#190B6C',
  },
  success: {
    50: '#99ffef',
    100: '#7EFFDD',
    200: '#6CF5CD',
    300: '#59E4BD',
    400: '#45D3AD',
    500: '#2FC39E',
    600: '#0CB28E',
    700: '#00A27F',
    800: '#009270',
    900: '#008362',
  },
  warning: {
    50: '#FFD772',
    100: '#FFC763',
    200: '#FFB754',
    300: '#FFA744',
    400: '#FF9834',
    500: '#F38823',
    600: '#E27A0F',
    700: '#CF6A00',
    800: '#BE5D00',
    900: '#AC4E00',
  },
};

const defaultShadow = {
  main: {
    shadowColor: '#ADAFBB',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 5,
  },
  mainTop: {
    shadowColor: '#ADAFBB',
    shadowOffset: {
      width: 0,
      height: -1,
    },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 5,
  },
  green: {
    shadowColor: '#29D697',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
};

const darkShadows = {
  main: {
    shadowColor: 'transparent',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 5,
  },
  mainTop: {
    shadowColor: 'transparent',
    shadowOffset: {
      width: 0,
      height: -1,
    },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 5,
  },
  green: {
    shadowColor: '#29D697',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.4,
    shadowRadius: 3,
    elevation: 5,
  },
};

const images = {
  inviteUser: require('./../images/invite_user.png'),
  alertSuccess: require('./../images/alert_success.png'),
  alertError: require('./../images/alert_error.png'),
  alertWarning: require('./../images/alert_warning.png'),
  noData: require('./../images/no-data.png'),
  gift: require('./../images/gift.png'),
  logo: require('./../images/logo.png'),
  app: require('./../images/app.png'),
  shi: require('./../images/shi.gif'),
  music: require('./../images/music.jpeg'),
  cool: require('./../images/cool.jpeg'),
  kaori: require('./../images/kaori.jpeg'),
  kitty: require('./../images/kitty.jpeg'),
  angel: require('./../images/angel.jpeg'),
  piano: require('./../images/piano.jpeg'),
  sky: require('./../images/sky.webp'),
  cute: require('./../images/cute.gif'),
  dance: require('./../images/dance-music.gif'),
  fav: require('./../images/fav.gif'),
  chopin: require('./../images/chopin.jpeg'),
  mozart: require('./../images/mozart.jpeg'),
  beethoven: require('./../images/beethoven.jpeg'),
  liszt: require('./../images/liszt.jpeg'),
  rach: require('./../images/rach.webp'),
  playingPiano: require('./../images/playingPiano.gif'),
  angelKaori: require('./../images/angel-kaori.jpeg'),
  friends: require('./../images/friends.jpeg'),
  glowingSky: require('./../images/glowing-sky.jpeg'),
  playingViolin: require('./../images/playing-violin.jpeg'),
  strokePiano: require('./../images/stroke-piano.jpeg'),
  top: require('./../images/top.jpeg'),
  top1: require('./../images/top1.jpeg'),
  top2: require('./../images/top2.webp'),
  pink: require('./../images/pink.jpeg'),
  white: require('./../images/white.png'),
  pls: require('./../images/pls.png'),
  pls1: require('./../images/pls1.jpeg'),
};

const defaultTheme = (colorMode: any) => {
  const _colors = colorMode === 'dark' ? darkColors : defaultColors;
  const _shadows = colorMode === 'dark' ? darkShadows : defaultShadow;

  const defaultThemes = extendTheme({
    // Colors
    colors: _colors,
    // Shadows
    shadows: _shadows,
    //Component
    components: {
      Button: {
        // baseStyle: {},
        defaultProps: {
          variant: 'solid',
          size: 'md',
          h: 42,
          borderRadius: 8,
        },
        variants: {
          outline: {
            _pressed: {
              bg: 'transparent',
            },
          },
        },
      },
      // FORM
      Input: {
        defaultProps: {
          borderColor: colorMode === 'dark' ? '#2e3239' : '#DEDEDE',
          backgroundColor: colorMode === 'dark' ? '#2e3239' : '#fff',
          borderRadius: 8,
          color: colorMode === 'dark' ? '#fff' : '#000',
        },
      },
      Pressable: {
        defaultProps: {
          _pressed: {
            opacity: 0.7,
          },
        },
      },
    },
    // Configs
    config: {
      useSystemColorMode: false,
      initialColorMode: 'light',
    },
  });

  return defaultThemes;
};

export {defaultTheme, images};
