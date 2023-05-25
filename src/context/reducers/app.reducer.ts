import {AppActionTypes, AppInitialType} from '../types';

export const AppReducer = (state: AppInitialType, action: any) => {
  switch (action.type) {
    case AppActionTypes.SWITCH_STACK: {
      return {...state, newStack: action.payload};
    }
    case AppActionTypes.SWITCH_HOST: {
      return {...state, isHost: action.payload};
    }
    case AppActionTypes.COLOR_MODE: {
      return {...state, colorMode: action.payload};
    }
    case AppActionTypes.DYNAMIC_LINK: {
      return {
        ...state,
        dynamicLink: action.payload,
      };
    }
    default:
      return state;
  }
};
