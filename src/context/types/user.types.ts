export enum UserActionTypes {
  SET_USER,
  SET_CART_COUNT,
}

export type UserInitialType = {
  user?: any;
  cartCount?: number | null | undefined;
};

export const UserInitialState = {
  user: undefined,
  cartCount: undefined,
};
