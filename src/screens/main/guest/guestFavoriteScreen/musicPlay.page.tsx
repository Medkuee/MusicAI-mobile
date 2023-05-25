/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useRef} from 'react';
import WebView from 'react-native-webview';

const htmlFile = require('./pianoPlayer.html');

const MusicPlayPage = ({navigation, route}: any) => {
  const {name} = route.params;
  console.log('name', name);

  const messageRef = useRef(null);
  useEffect(() => {
    const timer = setTimeout(() => {
      messageRef.current?.postMessage(`./music-output/${name}.mid`);
    }, 2000);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  return <WebView source={htmlFile} style={{flex: 1}} ref={messageRef} />;
};

export default MusicPlayPage;
