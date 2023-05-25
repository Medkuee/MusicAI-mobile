/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useRef, useState} from 'react';
import {
  ImageBackground,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import {Text} from 'native-base';
import {View} from 'react-native';
import {Image} from 'react-native';
import {images} from '../../../../theme/variables';
import Icon from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {BACKEND_URL} from '@env';
import axios from 'axios';
import Sound from 'react-native-sound';

const {width, height} = Dimensions.get('window');

const PreviewPage = ({navigation, route}: any) => {
  const {name} = route.params;
  const [music, setMusic] = useState(null);
  const [loading, setLoading] = useState(false);
  const _loading = useRef(false);

  const playSound = (note: any) => {
    const sound = new Sound(`mp3/${note}.mp3`, Sound.MAIN_BUNDLE, error => {
      if (error) {
        console.log('Error loading sound:', error);
        return;
      }
      sound.play(success => {
        if (!success) {
          console.log('Playback failed');
        }
        sound.release();
      });
    });
  };

  const playFunc = () => {
    try {
      setTimeout(() => {
        _loading.current = false;
      }, music.notes[music.notes.length - 1].startTime);

      const _timer = setTimeout(() => {
        music.notes.map((note: any) => {
          const timer = setTimeout(() => {
            if (_loading.current === true) {
              playSound(note.note);
            }
          }, note.startTime);

          return () => {
            clearTimeout(timer);
          };
        });
      }, 1000);

      return () => {
        clearTimeout(_timer);
      };
    } catch (error) {
      console.log('PLAYING SOUND ERROR', error);
    }
  };

  const getMusic = async () => {
    const token = await AsyncStorage.getItem('token');
    axios
      .get(`${BACKEND_URL}/music/${name}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(response => {
        if (response.data) {
          setMusic(response.data);
        }
      })
      .catch(error => {
        console.error(error);
      });
  };
  console.log('music', music);
  useEffect(() => {
    getMusic();
  }, [name]);

  return (
    <ScrollView style={{backgroundColor: '#fff'}} bounces={true}>
      <SafeAreaView>
        <View style={{display: 'flex', alignItems: 'center', padding: 10}}>
          <TouchableOpacity
            style={{
              position: 'absolute',
              top: 10,
              left: 20,
              elevation: 1,
              zIndex: 1,
            }}
            onPress={() => {
              _loading.current = false;
              navigation.goBack();
            }}>
            <Icon name="keyboard-arrow-left" size={30} color={'black'} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              if (_loading.current === false) {
                _loading.current = true;
              }
              playFunc();
            }}
            disabled={_loading.current}
            style={{
              width: width,
              height: height,
              position: 'absolute',
              top: 470,
              left: 55,
            }}>
            <ImageBackground
              style={{width: 250, height: 150}}
              source={images.strokePiano}
            />
          </TouchableOpacity>

          <Text style={{fontSize: 12, color: '#BEC2C6', marginBottom: 40}}>
            For Kaori
          </Text>
          <View style={{width: 200, height: 200, marginBottom: 20}}>
            <Image
              style={{width: '100%', height: '100%'}}
              source={images.pls1}
            />
          </View>

          <Text
            style={{
              color: '#040607',
              fontWeight: '600',
              fontSize: 23,
              marginBottom: 10,
              lineHeight: 30,
            }}>
            Your music is ready
          </Text>
          <Text style={{color: '#999A9F', fontSize: 14, fontWeight: '500'}}>
            Thank you for using my app,
          </Text>
          <Text
            style={{
              color: '#999A9F',
              fontSize: 14,
              fontWeight: '500',
              marginBottom: 30,
            }}>
            hope you enjoy it!
          </Text>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              columnGap: 10,
              alignItems: 'center',
            }}>
            <TouchableOpacity
              style={{
                paddingVertical: 10,
                width: 100,
                backgroundColor: 'black',
                borderRadius: 10,
              }}
              onPress={() => {
                _loading.current = false;
                navigation.navigate('MusicPlayPage', {name: name});
              }}>
              <Text
                style={{color: '#fff', fontWeight: '500', textAlign: 'center'}}>
                Play
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                paddingVertical: 10,
                width: 100,
                backgroundColor: 'black',
                borderRadius: 10,
              }}
              onPress={() => {
                _loading.current = false;
                navigation.navigate('MusicSheetPage', {name: name});
              }}>
              <Text
                style={{color: '#fff', fontWeight: '500', textAlign: 'center'}}>
                Sheet music
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
};

export default PreviewPage;
