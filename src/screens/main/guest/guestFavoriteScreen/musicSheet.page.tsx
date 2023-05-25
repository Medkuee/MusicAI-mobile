/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useRef} from 'react';
import WebView from 'react-native-webview';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {TouchableOpacity} from 'react-native';
import {View} from 'react-native';

const htmlFile = require('./musicSheet.html');

const MusicSheetPage = ({navigation, route}: any) => {
  const {name} = route.params;

  const messageRef = useRef(null);
  useEffect(() => {
    const timer = setTimeout(() => {
      // Code to be executed after 2 seconds
      // messageRef.current?.postMessage('yellow.mxl');
      messageRef.current?.postMessage(`./music-output/${name}.mxl`);
    }, 2000);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <WebView source={htmlFile} style={{flex: 1}} ref={messageRef}>
      {/* <TouchableOpacity
        style={{
          position: 'absolute',
          top: 33,
          left: 20,
          elevation: 1,
          zIndex: 1,
        }}
        onPress={() => navigation.goBack()}>
        <Icon name="keyboard-arrow-left" size={35} color={'#132A6B'} />
      </TouchableOpacity> */}
    </WebView>
  );
};

export default MusicSheetPage;
