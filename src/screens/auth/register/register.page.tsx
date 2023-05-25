/* eslint-disable react-native/no-inline-styles */
// import libraries
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
import {images} from '../../../theme/variables';
import {UseGlobalStyles} from '../../../theme';
import Icon from 'react-native-vector-icons/MaterialIcons';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import axios from 'axios';
import {BACKEND_URL} from '@env';
import showToast from '../../../utils/showToast';

const RegisterPage = ({navigation}: any) => {
  const style = UseGlobalStyles();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const nameRef = useRef(null);

  const pressRegister = async () => {
    if (password && email && name) {
      axios
        .post(`${BACKEND_URL}/signup`, {
          email,
          password,
          name,
        })
        .then(() => {
          showToast('Successfully signed up!', '#5cb85c');
          setTimeout(() => {
            goToLogin();
          }, 1500);
        })
        .catch(() => {
          showToast('Something went wrong!', 'red');
        });
    } else {
      showToast('Please fill in all required fields', 'orange');
    }
  };

  const handleTapOutside = () => {
    Keyboard.dismiss();
    emailRef.current?.blur();
    passwordRef.current?.blur();
    nameRef.current?.blur();
  };

  const goToLogin = () => {
    setEmail('');
    setPassword('');
    setName('');
    navigation.navigate('LoginPage');
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
              source={images.kitty}
              style={{width: '100%', height: '100%', borderRadius: 16}}
            />
          </View>
          <View style={{width: '100%', marginBottom: 35}}>
            <Text style={{fontSize: 30, color: '#172B47', fontWeight: 'bold'}}>
              Sign Up
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
              marginBottom: 30,
            }}>
            <Icon
              name="fingerprint"
              color={'#9EA3A8'}
              size={20}
              style={{marginRight: 10, alignSelf: 'flex-start'}}
            />
            <View style={{width: '100%', paddingRight: 30}}>
              <TextInput
                ref={nameRef}
                value={name}
                onChangeText={setName}
                placeholder="Full name"
                placeholderTextColor={'#9EA3A8'}
                autoCapitalize="none"
                autoCorrect={false}
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
                onChangeText={setPassword}
                placeholder="Password"
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
              flexDirection: 'row',
              flexWrap: 'wrap',
              marginBottom: 20,
            }}>
            <Text style={{fontWeight: '500', color: '#9EA3A8', fontSize: 13}}>
              By signing up, you agree to our{' '}
            </Text>
            <Text style={{fontWeight: '500', color: '#305D99', fontSize: 13}}>
              Terms & Conditions
            </Text>
            <Text style={{fontWeight: '500', color: '#9EA3A8', fontSize: 13}}>
              and{' '}
            </Text>
            <Text style={{fontWeight: '500', color: '#305D99', fontSize: 13}}>
              Privacy Policy
            </Text>
          </View>

          <Button
            variant={'solid'}
            borderRadius={10}
            padding={3.5}
            onPress={pressRegister}>
            <Text style={{color: '#fff', fontWeight: '600'}}>Continue</Text>
          </Button>

          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              marginTop: 20,
              justifyContent: 'center',
            }}>
            <Text style={{marginRight: 5, color: '#9EA3A8', fontWeight: '500'}}>
              Joined us before?
            </Text>
            <TouchableOpacity onPress={goToLogin}>
              <Text style={{fontWeight: '600', color: '#305D99'}}>Login</Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </ScrollView>
  );
};

export default RegisterPage;
