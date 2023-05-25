/* eslint-disable react-native/no-inline-styles */
import React, {useRef, useState} from 'react';
import {
  Image,
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';
import {Button, Divider} from 'native-base';

import {UseGlobalStyles} from '../../../theme';
import {images} from '../../../theme/variables';
import {useStore} from '../../../context/app.provider';
import Icon from 'react-native-vector-icons/MaterialIcons';
import axios from 'axios';
import {BACKEND_URL} from '@env';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {AppActionTypes} from '../../../context/types';
import {APP_STACK} from '../../../navigation/screenTypes';
import showToast from '../../../utils/showToast';

const LoginPage = ({navigation}: any) => {
  const style = UseGlobalStyles();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const {appDispatch} = useStore();

  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const pressLogin = async () => {
    if (password && email) {
      axios
        .post(`${BACKEND_URL}/login`, {
          email,
          password,
        })
        .then(async response => {
          console.log(response.data);
          await AsyncStorage.setItem('token', response.data.token);
          appDispatch({
            type: AppActionTypes.SWITCH_STACK,
            payload: APP_STACK.SPLASH,
          });
        })
        .catch(() => {
          showToast('Invalid email or password', 'red');
        });
    } else {
      showToast('Please fill in all required fields', 'orange');
    }
  };

  const handleTapOutside = () => {
    Keyboard.dismiss();
    emailRef.current?.blur();
    passwordRef.current?.blur();
  };

  return (
    <ScrollView style={{backgroundColor: '#fff'}}>
      <TouchableWithoutFeedback onPress={handleTapOutside}>
        <View style={style.authContainer}>
          <View
            style={{
              width: '100%',
              height: 250,
              paddingTop: 40,
              marginBottom: 20,
            }}>
            <Image
              source={images.sky}
              style={{width: '100%', height: '100%', borderRadius: 16}}
            />
          </View>
          <View style={{width: '100%', marginBottom: 35}}>
            <Text style={{fontSize: 30, color: '#172B47', fontWeight: 'bold'}}>
              Login
            </Text>
          </View>

          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              marginBottom: 30,
            }}>
            <Icon
              name="alternate-email"
              color={'#9EA3A8'}
              size={20}
              style={{marginRight: 10, alignSelf: 'flex-start'}}
            />
            <View style={{width: '100%', paddingRight: 30}}>
              <TextInput
                ref={emailRef}
                value={email}
                onChangeText={setEmail}
                placeholder="Email ID"
                placeholderTextColor={'#9EA3A8'}
                autoCorrect={false}
                autoCapitalize="none"
                style={{
                  borderTopWidth: 0,
                  color: '#9EA3A8',
                  marginBottom: 8,
                  fontWeight: '600',
                }}
              />
              <Divider />
            </View>
          </View>

          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              marginBottom: 20,
            }}>
            <Icon
              name="lock-outline"
              color={'#9EA3A8'}
              size={20}
              style={{marginRight: 10, alignSelf: 'flex-start'}}
            />
            <View style={{width: '100%', paddingRight: 30}}>
              <TextInput
                ref={passwordRef}
                value={password}
                placeholder="Password"
                onChangeText={setPassword}
                secureTextEntry={true}
                placeholderTextColor={'#9EA3A8'}
                autoCapitalize="none"
                style={{
                  borderTopWidth: 0,
                  color: '#9EA3A8',
                  marginBottom: 8,
                  fontWeight: '600',
                }}
              />
              <Divider />
            </View>
          </View>

          <View
            style={{
              display: 'flex',
              width: '100%',
              justifyContent: 'flex-end',
              flexDirection: 'row',
              marginBottom: 20,
            }}>
            <TouchableOpacity>
              <Text style={{fontWeight: '600', color: '#305D99'}}>
                Forgot Password?
              </Text>
            </TouchableOpacity>
          </View>

          <Button
            variant={'solid'}
            borderRadius={10}
            padding={3.5}
            onPress={pressLogin}>
            <Text style={{color: '#fff', fontWeight: '600'}}>Login</Text>
          </Button>

          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              marginTop: 90,
              justifyContent: 'center',
            }}>
            <Text style={{marginRight: 5, color: '#9EA3A8', fontWeight: '500'}}>
              New to AI MUSIC?
            </Text>
            <TouchableOpacity
              onPress={() => {
                setEmail('');
                setPassword('');
                navigation.navigate('RegisterPage');
              }}>
              <Text style={{fontWeight: '600', color: '#305D99'}}>
                Register
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </ScrollView>
  );
};

export default LoginPage;
