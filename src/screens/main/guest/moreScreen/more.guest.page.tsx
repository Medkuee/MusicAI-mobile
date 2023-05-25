/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {
  Image,
  ImageBackground,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
} from 'react-native';
import {useStore} from '../../../../context/app.provider';
import {images} from '../../../../theme/variables';
import {Button, Divider, useTheme} from 'native-base';
import Icon from 'react-native-vector-icons/MaterialIcons';
import axios from 'axios';
import {BACKEND_URL} from '@env';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {AppActionTypes} from '../../../../context/types';
import {APP_STACK} from '../../../../navigation/screenTypes';
import showToast from '../../../../utils/showToast';

const {width, height} = Dimensions.get('window');

const menu = [
  {name: 'Settings', icon: 'settings'},
  {name: 'Song List', icon: 'music-note'},
  {name: 'User Management', icon: 'verified-user'},
];
const menu2 = [
  {name: 'Information', icon: 'info-outline'},
  {name: 'Logout', icon: 'logout'},
];

const MoreGuestPage = () => {
  const {appDispatch} = useStore();
  const [user, setUser] = useState(null);
  const {colors} = useTheme();

  const getUser = async () => {
    const token = await AsyncStorage.getItem('token');
    axios
      .get(`${BACKEND_URL}/profile`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(response => {
        if (response.data) {
          setUser(response.data);
        }
      })
      .catch(error => {
        console.error(error);
      });
  };

  const logOutPress = async () => {
    await AsyncStorage.removeItem('token');
    appDispatch({
      type: AppActionTypes.SWITCH_STACK,
      payload: APP_STACK.SPLASH,
    });
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <ScrollView
      style={{
        backgroundColor: '#fff',
      }}
      bounces={true}>
      <View
        style={{
          flex: 1,
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: 40,
        }}>
        <View
          style={{
            width: width / 2,
            height: height / 2,
            position: 'absolute',
            top: 110,
            right: 0,
          }}>
          <ImageBackground
            style={{width: '100%', height: '100%'}}
            source={images.strokePiano}
          />
        </View>
        <View style={{width: 100, height: 100}}>
          <Image
            source={images.cute}
            style={{width: '100%', height: '100%', borderRadius: 75}}
          />
        </View>
        <Text style={{marginVertical: 5, fontWeight: '600', fontSize: 18}}>
          {user?.name || 'Username'}
        </Text>
        <Text style={{marginBottom: 20}}>{user?.email || 'Email'}</Text>
        <Button
          style={{borderRadius: 16, width: 150, marginBottom: 25}}
          onPress={() => {
            showToast('Success!', 'green');
          }}>
          Edit Profile
        </Button>
        <View style={{width: '100%', marginVertical: 15, marginBottom: 5}}>
          {menu.map(m => {
            return (
              <TouchableOpacity
                key={`name${m.name}`}
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: 15,
                }}>
                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}>
                  <View
                    style={{
                      backgroundColor: '#E3E8FC',
                      padding: 5,
                      borderRadius: 50,
                      marginRight: 15,
                    }}>
                    <Icon
                      name={m.icon}
                      color={'#6497e8' || colors.primary[500]}
                      size={23}
                    />
                  </View>
                  <Text>{m.name}</Text>
                </View>

                <View
                  style={{
                    backgroundColor: '#E3E8FC',
                    padding: 5,
                    borderRadius: 50,
                    alignSelf: 'flex-end',
                  }}>
                  <Icon
                    name="chevron-right"
                    size={23}
                    color={'#6497e8' || colors.primary[500]}
                  />
                </View>
              </TouchableOpacity>
            );
          })}
        </View>
        <Divider />
        <View style={{width: '100%', marginVertical: 15}}>
          {menu2.map(m => {
            return (
              <TouchableOpacity
                key={`name${m.name}`}
                onPress={() => {
                  if (m.name === 'Logout') {
                    logOutPress();
                  }
                }}
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: 15,
                }}>
                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}>
                  <View
                    style={{
                      backgroundColor: '#E3E8FC',
                      padding: 5,
                      borderRadius: 50,
                      marginRight: 15,
                    }}>
                    <Icon
                      name={m.icon}
                      color={'#6497e8' || colors.primary[500]}
                      size={23}
                    />
                  </View>
                  <Text>{m.name}</Text>
                </View>

                <View
                  style={{
                    backgroundColor: '#E3E8FC',
                    padding: 5,
                    borderRadius: 50,
                    alignSelf: 'flex-end',
                  }}>
                  <Icon
                    name="chevron-right"
                    size={23}
                    color={'#6497e8' || colors.primary[500]}
                  />
                </View>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
    </ScrollView>
  );
};

export default MoreGuestPage;
