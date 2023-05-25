export enum APP_STACK {
  SPLASH = 'SPLASH',
  UPDATE = 'UPDATE',
  APP_INTRO = 'APP_INTRO',
  AUTH = 'AUTH',
  QUESTIONS = 'QUESTIONS',
  GUEST = 'GUEST',
  HOST = 'HOST',
}

export type RootStackParamList = {
  [APP_STACK.SPLASH]: undefined;
  [APP_STACK.UPDATE]: undefined;
  [APP_STACK.APP_INTRO]: undefined;
  [APP_STACK.AUTH]: undefined;
  [APP_STACK.QUESTIONS]: undefined;
  [APP_STACK.GUEST]: undefined;
  [APP_STACK.HOST]: undefined;
};

export type RootStackParamListType = keyof RootStackParamList;
