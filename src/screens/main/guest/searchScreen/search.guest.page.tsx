/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useRef, useState} from 'react';
import {UseGlobalStyles} from '../../../../theme';
import {
  Image,
  Keyboard,
  SafeAreaView,
  ScrollView,
  TextInput,
  TouchableOpacity,
  View,
  RefreshControl,
} from 'react-native';
import {Text} from 'native-base';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {TouchableWithoutFeedback} from 'react-native';
import {images} from '../../../../theme/variables';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {BACKEND_URL} from '@env';
import axios from 'axios';
import moment from 'moment';

const SearchPage = ({navigation}: any) => {
  const styles = UseGlobalStyles();
  const searchRef = useRef(null);
  const [user, setUser] = useState(null);
  const [refreshing, setRefreshing] = useState(false);

  const handleRefresh = () => {
    setRefreshing(true);

    getUser();
  };

  const handleTapOutside = () => {
    Keyboard.dismiss();
    searchRef.current?.blur();
  };
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
          setRefreshing(false);
        }
      })
      .catch(error => {
        console.error(error);
        setRefreshing(false);
      });
  };
  console.log('USER', user);
  useEffect(() => {
    getUser();
  }, []);

  return (
    <ScrollView
      style={{backgroundColor: '#fff'}}
      bounces={true}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
      }>
      <SafeAreaView>
        <TouchableWithoutFeedback onPress={handleTapOutside}>
          <View style={{width: '100%', height: '100%', padding: 30}}>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: 10,
              }}>
              <Text
                style={{
                  color: '#132A6B',
                  fontWeight: '600',
                  fontSize: 25,
                  lineHeight: 40,
                }}>
                Music
              </Text>
              <TouchableOpacity style={{width: 40, height: 40, marginTop: 0}}>
                <Image
                  style={{width: '100%', height: '100%', borderRadius: 20}}
                  source={images.angel}
                />
              </TouchableOpacity>
            </View>

            <View
              style={{
                backgroundColor: '#EDF0F9',
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                padding: 7,
                borderRadius: 12,
                paddingHorizontal: 15,
              }}>
              <TextInput
                ref={searchRef}
                placeholder="Search"
                style={{fontWeight: '500', flex: 1, color: '#ABB1C5'}}
                autoCapitalize="none"
                autoCorrect={false}
              />
              <Icon name="search" size={20} color={'#ABB1C5'} />
            </View>
            {user?.music.length > 0 ? (
              <>
                <View style={{marginTop: 15}} />
                {user.music.map(u => {
                  return (
                    <TouchableOpacity
                      key={`${u.id}${u.createdAt}`}
                      onPress={() => {
                        navigation.navigate('PreviewPage', {name: u.id});
                      }}
                      style={{
                        display: 'flex',
                        flexDirection: 'row',
                        columnGap: 10,
                        alignItems: 'center',
                        padding: 10,
                        marginBottom: 10,
                        borderRadius: 10,
                        backgroundColor: '#FFFFFF',
                        elevation: 5,
                        shadowColor: '#000000',
                        shadowOffset: {width: 0, height: 2},
                        shadowOpacity: 0.25,
                        shadowRadius: 3,
                      }}>
                      <Image
                        source={images.beethoven}
                        style={{width: 65, height: 65, borderRadius: 10}}
                      />
                      <View style={{width: '100%', height: '100%'}}>
                        <Text
                          style={{
                            color: '#132A6B',
                            fontWeight: '500',
                            fontSize: 18,
                          }}>
                          {user.name || ''}'s music
                        </Text>
                        <Text
                          style={{
                            color: '#132A6B',
                            fontWeight: '400',
                            fontSize: 13,
                          }}>
                          Music {u.id || ''}
                        </Text>
                        <Text
                          style={{
                            color: '#CCCFD3',
                            fontWeight: '300',
                            fontSize: 12,
                          }}>
                          {moment(u.createdAt).format('MMMM Do, YYYY h:mm A') ||
                            ''}
                        </Text>
                      </View>
                    </TouchableOpacity>
                  );
                })}
              </>
            ) : (
              <View
                style={{
                  backgroundColor: '#fff',
                  borderTopLeftRadius: 30,
                  borderTopRightRadius: 30,
                  display: 'flex',
                  alignItems: 'center',
                  rowGap: 10,
                  justifyContent: 'center',
                  height: '100%',
                }}>
                <View>
                  <Image source={images.fav} />
                </View>
                <Text
                  style={{
                    fontSize: 20,
                    color: '#6393C3',
                    fontWeight: '700',
                    marginTop: 20,
                  }}>
                  Empty
                </Text>
                <Text
                  style={{fontSize: 16, color: '#6393C3', marginBottom: 25}}>
                  Currently, there is no music created
                </Text>
                <TouchableOpacity
                  style={{
                    borderWidth: 3,
                    borderStyle: 'solid',
                    borderRadius: 15,
                    borderColor: '#F39191',
                    paddingVertical: 5,
                    paddingHorizontal: 10,
                  }}>
                  <Text style={{color: '#F39191', fontWeight: '800'}}>
                    Create some
                  </Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </TouchableWithoutFeedback>
      </SafeAreaView>
    </ScrollView>
  );
};

export default SearchPage;
