import {UserActionTypes, UserInitialType} from '../types';

export const UserReducer = (state: UserInitialType, action: any) => {
  switch (action.type) {
    case UserActionTypes.SET_USER: {
      return {...state, user: action.payload};
    }
    case UserActionTypes.SET_CART_COUNT: {
      return {...state, cartCount: action.payload};
    }
    default:
      return {user: undefined, cartCount: undefined};
  }
};
