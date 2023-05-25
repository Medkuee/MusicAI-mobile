import {APP_STACK} from '../../navigation/screenTypes';

const enum AppActionTypes {
  COLOR_MODE,
  DYNAMIC_LINK,
  SWITCH_HOST,
  SWITCH_STACK,
}

const AppInitialState = {
  newStack: APP_STACK.SPLASH,
  isHost: false,
  colorMode: 'light',
  dynamicLink: null,
};

type AppInitialType = typeof AppInitialState;

export {AppActionTypes, AppInitialState};
export type {AppInitialType};
