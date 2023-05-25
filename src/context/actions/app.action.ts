import {APP_STACK} from '../../navigation/screenTypes';
import {AppActionTypes} from '../types';

type ActionMap<M extends {[index: string]: any}> = {
  [Key in keyof M]: M[Key] extends undefined
    ? {
        type: Key;
      }
    : {
        type: Key;
        payload: M[Key];
      };
};

type AppPayload = {
  [AppActionTypes.COLOR_MODE]: string;
  [AppActionTypes.DYNAMIC_LINK]: null;
  [AppActionTypes.SWITCH_HOST]: boolean;
  [AppActionTypes.SWITCH_STACK]: APP_STACK;
};

export type AppActions = ActionMap<AppPayload>[keyof ActionMap<AppPayload>];
