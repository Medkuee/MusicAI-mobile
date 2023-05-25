import {UserActionTypes} from '../types';

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

type UserPayload = {
  [UserActionTypes.SET_USER]: any | undefined;
  [UserActionTypes.SET_CART_COUNT]: number | undefined;
};

export type UserActions = ActionMap<UserPayload>[keyof ActionMap<UserPayload>];
