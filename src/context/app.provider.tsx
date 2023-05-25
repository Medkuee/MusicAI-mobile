import React, {createContext, useReducer, FC, Dispatch} from 'react';
import {
  AppInitialState,
  AppInitialType,
  UserInitialState,
  UserInitialType,
} from './types';
import {AppActions} from './actions/app.action';
import {UserActions} from './actions/user.action';
import {AppReducer} from './reducers/app.reducer';
import {UserReducer} from './reducers/user.reducer';

const AppContext = createContext<{
  appState: AppInitialType;
  appDispatch: Dispatch<AppActions>;
  userState: UserInitialType;
  userDispatch: Dispatch<UserActions>;
}>({
  appState: AppInitialState,
  appDispatch: () => undefined,
  userState: UserInitialState,
  userDispatch: () => undefined,
});

const StateProvider: FC = ({children}: any) => {
  const [appState, appDispatch] = useReducer(AppReducer, AppInitialState);
  const [userState, userDispatch] = useReducer(UserReducer, UserInitialState);

  return (
    <AppContext.Provider
      value={{
        appState,
        appDispatch,
        userState,
        userDispatch,
      }}>
      {children}
    </AppContext.Provider>
  );
};

const withStore = (Component: any) =>
  function MyComponent(props: any) {
    return (
      <AppContext.Consumer>
        {({appState, appDispatch}) => (
          <Component {...props} appState={appState} appDispatch={appDispatch} />
        )}
      </AppContext.Consumer>
    );
  };

const useStore = () => React.useContext(AppContext);

export {AppContext, StateProvider, withStore, useStore};
