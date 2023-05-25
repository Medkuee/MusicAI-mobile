import React from 'react';
import {StatusBar} from 'react-native';
import {NativeBaseProvider, Stack} from 'native-base';
import AppNavigation from './src/navigation/index';
import {StateProvider} from './src/context/app.provider';

function App() {
  return (
    <StateProvider>
      <NativeBaseProvider
        config={{
          suppressColorAccessibilityWarning: true,
        }}>
        <Stack flex={1} bg="white">
          <StatusBar backgroundColor="#eee" barStyle="dark-content" />
          <AppNavigation />
        </Stack>
      </NativeBaseProvider>
    </StateProvider>
  );
}

export default App;
